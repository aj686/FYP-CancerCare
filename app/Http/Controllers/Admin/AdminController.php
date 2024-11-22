<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Products;
use App\Models\User;
use App\Models\Events;
use App\Models\Order;
use App\Models\Payment;
use App\Models\Blogs;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB; // Add this import
use Illuminate\Support\Facades\Storage; // Add this import

class AdminController extends Controller
{
    // DASHBOARD 
    public function index() {
        $products = Products::all();
        $productCount = $products->count();

        $events = Events::all();
        $eventCount = $events->count();

        $users = User::all();
        $userCount = $users->count();

        return Inertia::render('Admin/AdminDashboard' ,[
            'products' => $products,
            'productCount' => $productCount,
            'events' => $events,
            'eventCount' => $eventCount,
            'users' => $users,
            'userCount' => $userCount,
        ]);
    }

    // PRODUCT - SHOW 
    public function products() {
        $products = Products::all(); // or Product::paginate(10) for pagination
        $count = $products->count();

        return Inertia::render('Admin/Product', [
            'products' => $products,
            'count' => $count,
        ]);
    }

    // ----------------------------------------------------------------------------------------------

    // PRODUCT - CREATE
    public function create(Request $request, Products $products) {

        $validated = $request->validate([
            'name' => 'required|max:255|min:2',
            'slug' => 'required|max:255|unique:products,slug',
            'description' => 'required|min:10',
            'price' => 'required|numeric|min:0',
            'stock_quantity' => 'required|integer|min:0',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);
    
        // Handle image upload
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('storage/products'), $imageName);
            $validated['image'] = 'products/' . $imageName;
        }
    
        // Generate slug if not provided
        if (!$validated['slug']) {
            $validated['slug'] = Str::slug($validated['name']);
        }
    
        $products->create($validated);
    
        return back()->with('message', 'Product created successfully');
        // return Inertia::render('Admin/ProductAdd');
    }

    // PRODUCT - UPDATE
    public function update(Request $request, $product_id)
    {
        Log::info('Update request received for product ID: ' . $product_id);
        Log::info('Request Data:', $request->all());

        $product = Products::findOrFail($product_id);

        $validated = $request->validate([
            'name' => 'required|max:255|min:2',
            'slug' => 'required|max:255|unique:products,slug,' . $product_id,
            'description' => 'required|min:10',
            'price' => 'required|numeric|min:0',
            'stock_quantity' => 'required|integer|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // show instantly previous image and new image after upload
        if ($request->hasFile('image')) {
            if ($product->image) {
                $oldImagePath = public_path('storage/' . $product->image);
                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath);
                }
            }
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('storage/products'), $imageName);
            $validated['image'] = 'products/' . $imageName;
        }

        $product->update($validated);

        return back()->with('message', 'Product updated successfully');
    }

 
    // PRODUCT - DELETE 
    public function destroy(Products $products ,$product_id) {
        $product = $products->findOrFail($product_id);
        $product->delete();
        return back()->with('message', 'Student deleted successfully');
    }

    // ----------------------------------------------------------------------------------------------

    // PROGRAM 
    public function programs() {
        $events = Events::all(); // or Product::paginate(10) for pagination
        $count = $events->count();

        return Inertia::render('Admin/Program', [
            'events' => $events,
            'count' => $count,
        ]);
    }

    // PROGRAM - CREATE
    public function createEvent(Request $request, Events $events) {
        $validated = $request->validate([
            'title' => 'required|max:255',
            'description' => 'required|min:10',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'event_time' => 'required|date_format:H:i',
            'price' => 'required|numeric|min:0',
            'location' => 'required|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'participant_count' => 'required|integer|min:1',
            'status' => 'required|in:active,inactive',
        ]);

        // Convert the event_time string to a time object
        $validated['event_time'] = date('H:i:s', strtotime($validated['event_time']));

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('storage/events'), $imageName);
            $validated['image'] = 'events/' . $imageName;
        }
    
        // Create a new event with the validated data
        $events->create($validated);
    
        // Redirect back with a success message
        return back()->with('message', 'Event created successfully!');
    }

    // PROGRAM - UPDATE
    public function updateEvent(Request $request, $event_id) {
        Log::info('Update request received for event ID: ' . $event_id);
        Log::info('Request Data:', $request->all());

        $event = Events::findOrFail($event_id);

        $validated = $request->validate([
            'title' => 'required|max:255',
            'description' => 'required|min:10',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'event_time' => 'required', // Removed date_format validation temporarily for debugging
            'price' => 'required|numeric|min:0',
            'location' => 'required|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'participant_count' => 'required|integer|min:1',
            'status' => 'required|in:active,inactive',
        ]);

        try {
            DB::beginTransaction();

            // Handle image upload
            if ($request->hasFile('image')) {
                // Delete old image
                if ($event->image) {
                    Storage::disk('public')->delete($event->image);
                }
                
                // Store new image
                $imagePath = $request->file('image')->store('events', 'public');
                $validated['image'] = $imagePath;
            }

            // Format event time
            if (isset($validated['event_time'])) {
                $validated['event_time'] = date('H:i:s', strtotime($validated['event_time']));
            }

            $event->update($validated);
            
            DB::commit();
            
            return back()->with('message', 'Event updated successfully');
            } catch (\Exception $e) {
                DB::rollBack();
                Log::error('Error updating event: ' . $e->getMessage());
                return back()->withErrors(['error' => 'Failed to update event. ' . $e->getMessage()]);
            }   
        
    }

    // PROGRAM - DELETE
    public function destroyEvent(Events $events, $event_id) {
        $event = $events->findOrFail($event_id);
        $event->delete();
        return back()->with('message', 'Student deleted successfully');
    }

     // PROGRAM - VIEW 
     public function viewEvent($id) {
        $event = Events::findOrFail($id);

        return Inertia::render('AdminComp/EventView', [
            'event' => $event,
        ]);
    }

    // ----------------------------------------------------------------------------------------------

    // USER 
    public function users() {

        $users = User::all(); // or Product::paginate(10) for pagination
        $count = $users->count();

        return Inertia::render('Admin/User', [
            'users' => $users,
            'count' => $count,
        ]);
    }

    public function createUser(Request $request, User $user) {
        $validated = $request->validate([
            'name' => 'required|max:255|min:2',
            'email' => 'required|email|max:255',
        ]);

        $user->create($validated);
        return back()->with('message', 'Product created successfully');
    }

    public function updateUser(Request $request, User $user, $user_id) {
        // You need this for encountering Log the incoming request data
        // And you can view this logs at storage/logs/laravel.log
        Log::info('Update request received for user ID: ' . $user_id);
        Log::info('Update request data: ', $request->all());

        $validated = $request->validate([
            'name' => 'required|max:255|min:2',
            'email' => 'required|email|max:255',
        ]);

        $userId = $user->findOrFail($user_id);
    
        $userId->update($validated);
    }

    public function destroyUser(User $user, $user_id) {
        $userId = $user->findOrFail($user_id);
        $userId->delete();
        return back()->with('message', 'Student deleted successfully');
    }

    // -------------------------------------------------------------------------------

    // ORDER 
    // ORDER - READ
    public function orders() {
        $orders = Order::all();
        $count = $orders->count();

        return Inertia::render('Admin/Order', [
            'orders' => $orders,
            'count' => $count,
        ]);
    }
    // ORDER - VIEW DETAIL
    public function orderView($id) {
        $order = Order::findOrFail($id);

        return Inertia::render('AdminComp/Order/OrderView', [
            'order' => $order,
        ]);
    }

    // --------------------------------------------------------------------------------

    // PAYMENT
    // PAYMENT - READ
    public function payments() {
        $payments = Payment::all();
        $count = $payments->count();

        return Inertia::render('Admin/Payment', [
            'payments' => $payments,
            'count' => $count,
        ]);
    }

    // PAYMENT - VIEW DETAIL
    public function paymentView($id) {
        $payment = Payment::findOrFail($id);

        return Inertia::render('AdminComp/Payment/PaymentView', [
            'payment' => $payment,
        ]);
    }

    // --------------------------------------------------------------------------------

    // RESEARCH BLOG 
    // RESEARCH BLOG - READ
    public function blogs() {
        $blogs = Blogs::all();
        $count = $blogs->count();

        return Inertia::render('Admin/Blog', [
            'blogs' => $blogs,
            'count' => $count,
        ]);
    }
    // RESEARCH BLOG - ADD 
    public function createBlogs(Request $request, Blogs $blogs) {

        Log::info('Blog creation request received', [
            'request_data' => $request->except('thumbnail')
        ]);

        $validated = $request->validate([
            'title' => 'required|max:255|unique:blogs',
            'slug' => 'required|unique:blogs',
            'header' => 'required',
            'content' => 'required',
            'author' => 'required',
            'date' => 'required|date',
            'tags' => 'nullable|string',
            'active' => 'required|in:0,1',
            'thumbnail' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        try {
            // Handle thumbnail upload
            if ($request->hasFile('thumbnail')) {
                $image = $request->file('thumbnail');
                $imageName = time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('storage/thumbnail'), $imageName);
                $validated['thumbnail'] = 'thumbnail/' . $imageName;
            }

            $blogs->create($validated);

            return back()->with('message', 'Blog created successfully!');

        } catch (\Exception $e) {
            Log::error('Error creating blog', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return back()->withErrors(['error' => 'Failed to create blog'])->withInput();
        }
        
    }
    // RESEARCH BLOG - UPDATE
    public function updateBlogs(Request $request, $blog_id) {

        $blog = Blogs::findOrFail($blog_id);Log::info('Blog update request received', [
            'blog_id' => $blog_id,
            'request_data' => $request->except('thumbnail')
        ]);

        try {
            $blog = Blogs::findOrFail($blog_id);

            $validated = $request->validate([
                'title' => 'required|max:255|unique:blogs,title,' . $blog_id,
                'slug' => 'required|unique:blogs,slug,' . $blog_id,
                'header' => 'required',
                'content' => 'required',
                'author' => 'required',
                'date' => 'required|date',
                'tags' => 'nullable|string',
                'active' => 'required|in:0,1',
                'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
            ]);

            // Handle thumbnail upload if new file is provided
            if ($request->hasFile('thumbnail')) {
                // Delete old thumbnail
                if ($blog->thumbnail) {
                    $oldImagePath = public_path('storage/' . $blog->thumbnail);
                    if (file_exists($oldImagePath)) {
                        unlink($oldImagePath);
                    }
                }
                
                // Store new thumbnail
                $image = $request->file('thumbnail');
                $imageName = time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('storage/thumbnail'), $imageName);
                $validated['thumbnail'] = 'thumbnail/' . $imageName;
            }

            $blog->update($validated);

            Log::info('Blog updated successfully', [
                'blog_id' => $blog_id
            ]);

            return back()->with('message', 'Blog updated successfully!');

        } catch (\Exception $e) {
            Log::error('Error updating blog', [
                'blog_id' => $blog_id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return back()->withErrors(['error' => 'Failed to update blog'])->withInput();
        }

        
        
    }
    // RESEARCH BLOG - DELETE
    public function destroyBlogs(Blogs $blog, $blog_id) {
        $blogId = $blog->findOrFail($blog_id);
        $blogId->delete();
        return back()->with('message', 'Blog deleted successfully');
    }

    

    
}
