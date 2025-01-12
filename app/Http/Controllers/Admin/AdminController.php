<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Inertia\Inertia;
use App\Models\Products;
use App\Models\User;
use App\Models\Events;
use App\Models\Order;
use App\Models\Payment;
use App\Models\Blogs;
use App\Models\Donation;
use App\Models\EventDonation;
use App\Models\EventRegistration;
use App\Models\Membership;
use App\Models\Plan;
use App\Models\UserStory;
use App\Models\EventFeedback;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB; // Add this import
use Illuminate\Support\Facades\Storage; // Add this import
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password as PasswordRule;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

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

        // Add this to get orders with their items
        $orders = Order::with('orderItems')->get();

        return Inertia::render('Admin/AdminDashboard', [
            'products' => $products,
            'productCount' => $productCount,
            'events' => $events,
            'eventCount' => $eventCount,
            'users' => $users,
            'userCount' => $userCount,
            'orders' => $orders, // Add this
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
    // public function programs() {
    //     $events = Events::all(); // or Product::paginate(10) for pagination
    //     $count = $events->count();

    //     return Inertia::render('Admin/Program', [
    //         'events' => $events,
    //         'count' => $count,
    //     ]);
    // }

    // // PROGRAM - CREATE
    // public function createEvent(Request $request, Events $events) {
    //     $validated = $request->validate([
    //         'title' => 'required|max:255',
    //         'description' => 'required|min:10',
    //         'start_date' => 'required|date',
    //         'end_date' => 'required|date|after_or_equal:start_date',
    //         'event_time' => 'required|date_format:H:i',
    //         'price' => 'required|numeric|min:0',
    //         'location' => 'required|max:255',
    //         'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
    //         'participant_count' => 'required|integer|min:1',
    //         'status' => 'required|in:active,canceled,completed',
    //     ]);

    //     // Convert the event_time string to a time object
    //     $validated['event_time'] = date('H:i:s', strtotime($validated['event_time']));

    //     if ($request->hasFile('image')) {
    //         $image = $request->file('image');
    //         $imageName = time() . '.' . $image->getClientOriginalExtension();
    //         $image->move(public_path('storage/events'), $imageName);
    //         $validated['image'] = 'events/' . $imageName;
    //     }
    
    //     // Create a new event with the validated data
    //     $events->create($validated);
    
    //     // Redirect back with a success message
    //     return back()->with('message', 'Event created successfully!');
    // }

    // // PROGRAM - UPDATE
    // public function updateEvent(Request $request, $event_id) {
    //     Log::info('Update request received for event ID: ' . $event_id);
    //     Log::info('Request Data:', $request->all());

    //     $event = Events::findOrFail($event_id);

    //     $validated = $request->validate([
    //         'title' => 'required|max:255',
    //         'description' => 'required|min:10',
    //         'start_date' => 'required|date',
    //         'end_date' => 'required|date|after_or_equal:start_date',
    //         'event_time' => 'required', // Removed date_format validation temporarily for debugging
    //         'price' => 'required|numeric|min:0',
    //         'location' => 'required|max:255',
    //         'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
    //         'participant_count' => 'required|integer|min:1',
    //         'status' => 'required|in:active,canceled,completed',
    //     ]);

    //     try {
    //         DB::beginTransaction();

    //         // Handle image upload
    //         if ($request->hasFile('image')) {
    //             // Delete old image
    //             if ($event->image) {
    //                 Storage::disk('public')->delete($event->image);
    //             }
                
    //             // Store new image
    //             $imagePath = $request->file('image')->store('events', 'public');
    //             $validated['image'] = $imagePath;
    //         }

    //         // Format event time
    //         if (isset($validated['event_time'])) {
    //             $validated['event_time'] = date('H:i:s', strtotime($validated['event_time']));
    //         }

    //         $event->update($validated);
            
    //         DB::commit();
            
    //         return back()->with('message', 'Event updated successfully');
    //         } catch (\Exception $e) {
    //             DB::rollBack();
    //             Log::error('Error updating event: ' . $e->getMessage());
    //             return back()->withErrors(['error' => 'Failed to update event. ' . $e->getMessage()]);
    //         }   
        
    // }

    // // PROGRAM - DELETE
    // public function destroyEvent(Events $events, $event_id) {
    //     $event = $events->findOrFail($event_id);
    //     $event->delete();
    //     return back()->with('message', 'Student deleted successfully');
    // }

    //  // PROGRAM - VIEW 
    //  public function viewEvent($id) {
    //     $event = Events::findOrFail($id);

    //     return Inertia::render('AdminComp/EventView', [
    //         'event' => $event,
    //     ]);
    // }

    public function programs()
    {
        // Fetch all events and count
        $events = Events::all(); // or Events::paginate(10) for pagination
        $count = $events->count();

        // Automatically update status for events where end_date has passed
        $today = now()->toDateString();
        Events::where('end_date', '<', $today)
            ->where('status', 'active')
            ->update(['status' => 'completed']);

        return Inertia::render('Admin/Program', [
            'events' => $events,
            'count' => $count,
        ]);
    }

    // PROGRAM - CREATE
    public function createEvent(Request $request, Events $events)
    {
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
            'status' => 'required|in:active,canceled,completed',
        ]);

        // Convert the event_time string to a time object
        $validated['event_time'] = date('H:i:s', strtotime($validated['event_time']));

        // Handle image upload
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
    public function updateEvent(Request $request, $event_id)
    {
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
            'status' => 'required|in:active,canceled,completed',
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

            // Automatically update status if end_date has passed
            $today = now()->toDateString();
            if ($event->end_date < $today && $validated['status'] !== 'completed') {
                $validated['status'] = 'completed';
            }

            // Update the event
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
    public function destroyEvent(Events $events, $event_id)
    {
        $event = $events->findOrFail($event_id);

        try {
            // Delete the event image if it exists
            if ($event->image) {
                Storage::disk('public')->delete($event->image);
            }

            // Delete the event
            $event->delete();

            return back()->with('message', 'Event deleted successfully');
        } catch (\Exception $e) {
            Log::error('Error deleting event: ' . $e->getMessage());
            return back()->withErrors(['error' => 'Failed to delete event. Please try again.']);
        }
    }

    // PROGRAM - VIEW
    public function viewEvent($id)
    {
        $event = Events::findOrFail($id);

        // Automatically update status if end_date has passed
        $today = now()->toDateString();
        if ($event->end_date < $today && $event->status !== 'completed') {
            $event->update(['status' => 'completed']);
        }

        return Inertia::render('AdminComp/EventView', [
            'event' => $event,
        ]);
    }

    // ----------------------------------------------------------------------------------------------

    // USER 
    public function users() {
        // Get users with their active memberships
        $users = User::with(['memberships' => function($query) {
            $query->where('status', 'active')
                  ->where('end_date', '>', now());
        }])->get();
    
        // Add hasActiveMembership flag to each user
        $users = $users->map(function($user) {
            $user->hasActiveMembership = $user->memberships->isNotEmpty();
            return $user;
        });
    
        $count = $users->count();
        $subscribedCount = $users->filter->hasActiveMembership->count();
    
        return Inertia::render('Admin/User', [
            'users' => $users,
            'count' => $count,
            'subscribedCount' => $subscribedCount
        ]);
    }

    public function createUser(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed', PasswordRule::defaults()],
            'usertype' => ['required', 'string', 'in:admin,user'],
            'age' => ['nullable', 'integer', 'min:0', 'max:150'],
            'phone' => ['nullable', 'string', 'max:20'],
            'address_1' => ['nullable', 'string', 'max:255'],
            'address_2' => ['nullable', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:100'],
            'state' => ['nullable', 'string', 'max:100'],
            'postcode' => ['nullable', 'string', 'max:10'],
            'country' => ['nullable', 'string', 'max:100'],
        ]);

        // Set default country
        $validated['country'] = 'Malaysia';
        
        // Hash password
        $validated['password'] = Hash::make($validated['password']);

        try {
            User::create($validated);
            return back()->with('success', 'User created successfully');
        } catch (\Exception $e) {
            Log::error('Error creating user: ' . $e->getMessage());
            return back()->with('error', 'Failed to create user. Please try again.');
        }
    }

    public function updateUser(Request $request, $id)
    {
        Log::info('Update request received for user ID: ' . $id);
        Log::info('Update request data: ', $request->all());

        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,' . $id],
            'usertype' => ['required', 'string', 'in:admin,user,doctor,patient,parent'],
            'age' => ['nullable', 'integer', 'min:0', 'max:150'],
            'cancer_type' => ['nullable', 'string', 'max:255'],
            'survivorship_status' => ['nullable', 'string', 'in:newly_diagnosed,in_treatment,post_treatment,survivor'],
            'phone' => ['nullable', 'string', 'max:20'],
            'address' => ['nullable', 'string', 'max:500'],
        ]);

        try {
            $user->update($validated);
            return back()->with('success', 'User updated successfully');
        } catch (\Exception $e) {
            Log::error('Error updating user: ' . $e->getMessage());
            return back()->with('error', 'Failed to update user. Please try again.');
        }
    }

    public function destroyUser($id)
    {
        try {
            $user = User::findOrFail($id);
            
            // Prevent deletion of the last admin user
            if ($user->usertype === 'admin') {
                $adminCount = User::where('usertype', 'admin')->count();
                if ($adminCount <= 1) {
                    return back()->with('error', 'Cannot delete the last admin user.');
                }
            }

            $user->delete();
            return back()->with('success', 'User deleted successfully');
        } catch (\Exception $e) {
            Log::error('Error deleting user: ' . $e->getMessage());
            return back()->with('error', 'Failed to delete user. Please try again.');
        }
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
        
        Log::info('Blogs data:', ['count' => $count, 'blogs' => $blogs->toArray()]);

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
    public function updateBlogs(Request $request, $blog_id)
    {
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

            if ($request->hasFile('thumbnail')) {
                // Delete old thumbnail if it exists
                if ($blog->thumbnail) {
                    $oldPath = public_path('storage/' . $blog->thumbnail);
                    if (file_exists($oldPath)) {
                        unlink($oldPath);
                    }
                }
                
                // Store new thumbnail consistently with create method
                $image = $request->file('thumbnail');
                $imageName = time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('storage/thumbnail'), $imageName);
                $validated['thumbnail'] = 'thumbnail/' . $imageName;
            }

            $blog->update($validated);
            
            return redirect()->back()->with('success', 'Blog updated successfully!');

        } catch (\Exception $e) {
            Log::error('Error updating blog', [
                'blog_id' => $blog_id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return redirect()->back()
                ->withErrors(['error' => 'Failed to update blog: ' . $e->getMessage()])
                ->withInput();
        }
    }
    
    // RESEARCH BLOG - DELETE
    public function destroyBlogs($id) {  // Simplify parameter
        $blog = Blogs::findOrFail($id);  // Find blog directly
        
        // Delete the blog's thumbnail if it exists
        if ($blog->thumbnail) {
            Storage::delete('public/' . $blog->thumbnail);
        }
        
        $blog->delete();
        
        return redirect()->back()->with('message', 'Blog deleted successfully');
    }

    // Event Registrations
    public function eventRegistration() {
        // Get event registrations with relationships
        $eventRegistrations = EventRegistration::with(['event', 'user'])
        ->latest()
        ->get();

        // Get all events with proper registration counts
        $events = Events::all()->map(function ($event) {
            $registeredCount = EventRegistration::where('events_id', $event->id)
                ->where('status', 'registered')
                ->count();
                
            return [
                'id' => $event->id,
                'title' => $event->title,
                'total_spots' => $event->participant_count,
                'registered_count' => $registeredCount,
                'available_spots' => $event->participant_count - $registeredCount,
                'registration_percentage' => ($registeredCount / $event->participant_count) * 100
            ];
        });

        // Calculate overall statistics
        $statistics = [
            'total_events' => $events->count(),
            'total_registrations' => EventRegistration::where('status', 'registered')->count(),
            'total_cancelled' => EventRegistration::where('status', 'cancelled')->count(),
            'active_events' => $events->where('available_spots', '>', 0)->count(),
        ];

        return Inertia::render('Admin/EventRegister', [
            'events_register' => $eventRegistrations,
            'events_analytics' => $events,
            'statistics' => $statistics,
            'count' => $eventRegistrations->count(),
        ]);
    }
    public function updateEventRegistration(Request $request) {}
    public function destroyEventRegistration(Request $request) {}

    // Memberships
    public function membership() {
        $membership = Membership::all();
        $count = $membership->count();
        return Inertia::render('Admin/Membership',[
            'members' => $membership,
            'count' => $count,
        ]);
    }
    public function updateMembership(Request $request) {}
    public function destroyMembership(Request $request) {}
    
    // Plans
    public function plans() {
        $plans = Plan::all();
        $count = $plans->count();
        return Inertia::render('Admin/Plan',[
            'plans' => $plans,
            'count' => $count,
        ]);
    }
    public function createPlans(Request $request, Plan $plan) {

        $validated = $request->validate([
            'name' => 'required|max:255',
            'slug' => 'required|unique:plans,slug',
            'stripe_plan' => 'required|unique:plans,stripe_plan',
            'price' => 'required|numeric|min:0',
            'description' => 'required|min:10',
            'can_comment' => 'boolean',
            'can_access_forum' => 'boolean',
            'can_access_events' => 'boolean',
            'can_share_stories' => 'boolean',
            'billing_interval' => 'required|in:month,year'
        ]);
        
        // Handle boolean fields explicitly
        $validated['can_comment'] = $request->boolean('can_comment');
        $validated['can_access_forum'] = $request->boolean('can_access_forum');
        $validated['can_access_events'] = $request->boolean('can_access_events');
        $validated['can_share_stories'] = $request->boolean('can_share_stories');
        
        $plan->create($validated);
        
        return back()->with('message', 'Plan created successfully!');
        
    }   
    public function updatePlans(Request $request, $plan_id) {
        $plan = Plan::findOrFail($plan_id);

        $validated = $request->validate([
            'name' => 'required|max:255',
            'slug' => 'required|unique:plans,slug,' . $plan_id,
            'stripe_plan' => 'required|unique:plans,stripe_plan,' . $plan_id,
            'price' => 'required|numeric|min:0',
            'description' => 'required|min:10',
            'can_comment' => 'boolean',
            'can_access_forum' => 'boolean',
            'can_access_events' => 'boolean',
            'can_share_stories' => 'boolean',
            'billing_interval' => 'required|in:month,year'
        ]);

        try {
            DB::beginTransaction();
            
            // Handle boolean fields explicitly
            $validated['can_comment'] = $request->boolean('can_comment');
            $validated['can_access_forum'] = $request->boolean('can_access_forum');
            $validated['can_access_events'] = $request->boolean('can_access_events');
            $validated['can_share_stories'] = $request->boolean('can_share_stories');
            
            $plan->update($validated);
            
            DB::commit();
            
            return back()->with('message', 'Plan updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error updating plan: ' . $e->getMessage());
            return back()->withErrors(['error' => 'Failed to update plan. ' . $e->getMessage()]);
        }
    }
    public function destroyPlans($plan_id) 
    {
        try {
            DB::beginTransaction();
            
            // Find the plan
            $plan = Plan::findOrFail($plan_id);
            
            // Optional: Check for active subscriptions
            if ($plan->memberships()->where('status', 'active')->exists()) {
                return back()->withErrors([
                    'error' => 'Cannot delete plan with active subscriptions.'
                ]);
            }
            
            // Delete the plan
            $plan->delete();
            
            DB::commit();
            
            return back()->with('message', 'Plan deleted successfully');
            
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error deleting plan: ' . $e->getMessage());
            return back()->withErrors([
                'error' => 'Failed to delete plan. ' . $e->getMessage()
            ]);
        }
    }

    // User Story for membership user
    public function stories() 
    {
        $stories = UserStory::with('user')
            ->latest()
            ->get();
        $count = $stories->count();
        
        return Inertia::render('Admin/Story', [
            'stories' => $stories,
            'count' => $count,
        ]);
    }

    public function viewStory($id) 
    {
        $story = UserStory::with('user')->findOrFail($id);
        
        return Inertia::render('Admin/StoryView', [
            'story' => $story,
        ]);
    }

    public function updateStoryStatus(Request $request, $story_id)
    {
        Log::info('Story status update request received', [
            'story_id' => $story_id,
            'request_data' => $request->all()
        ]);

        try {
            $story = UserStory::findOrFail($story_id);

            $validated = $request->validate([
                'status' => 'required|in:pending,approved,rejected',
                'admin_notes' => 'nullable|string|max:500'
            ]);

            $story->update([
                'status' => $validated['status'],
                'admin_notes' => $validated['admin_notes'],
                'approved_at' => $validated['status'] === 'approved' ? now() : null
            ]);

            Log::info('Story status updated successfully', ['story_id' => $story_id]);

            return back()->with('message', 'Story status updated successfully');

        } catch (\Exception $e) {
            Log::error('Error updating story status', [
                'story_id' => $story_id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return back()
                ->withErrors(['error' => 'Failed to update story status'])
                ->withInput();
        }
    }

    public function destroyStory($id)
    {
        try {
            $story = UserStory::findOrFail($id);
            
            // Delete thumbnail if exists
            if ($story->thumbnail) {
                Storage::delete('public/' . $story->thumbnail);
            }
            
            $story->delete();
            
            return back()->with('message', 'Story deleted successfully');
        } catch (\Exception $e) {
            Log::error('Error deleting story', [
                'story_id' => $id,
                'error' => $e->getMessage()
            ]);

            return back()->withErrors(['error' => 'Failed to delete story']);
        }
    }

    
    /**
     * Display the admin's profile form.
     */
    public function editProfile(Request $request)
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'user' => $request->user()->only([
                'id',
                'name',
                'email',
                'age',
                'phone',
                'address_1',
                'address_2',
                'city',
                'state',
                'postcode',
                'profile_photo_url',
                'email_verified_at'
            ])
        ]);
    }

    /**
     * Update the admin's profile information.
     */
    public function updateProfile(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,' . $request->user()->id],
            'age' => ['nullable', 'numeric', 'min:0', 'max:150'],
            'phone' => ['nullable', 'string', 'regex:/^01[0-9]{8,9}$/'],
            'address_1' => ['nullable', 'string', 'max:255'],
            'address_2' => ['nullable', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:255'],
            'state' => ['nullable', 'string', 'max:255'],
            'postcode' => ['nullable', 'string', 'max:5'],
            'profile_photo_path' => ['nullable', 'image', 'max:1024'],
        ]);

        try {
            DB::beginTransaction();

            $user = $request->user();

            if ($request->hasFile('profile_photo_path')) {
                // Delete old photo if exists
                if ($user->profile_photo_path) {
                    Storage::disk('public')->delete($user->profile_photo_path);
                }
                
                $path = $request->file('profile_photo_path')->store('profile-photos', 'public');
                $validated['profile_photo_path'] = $path;
            }

            $user->fill($validated);

            if ($user->isDirty('email')) {
                $user->email_verified_at = null;
            }

            $user->save();

            DB::commit();

            return Redirect::back()->with('message', 'Profile updated successfully.');

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Admin profile update error: ' . $e->getMessage());
            return Redirect::back()->withErrors(['error' => 'Failed to update profile.']);
        }
    }

    /**
     * Update the admin's password.
     */
    public function updatePassword(Request $request)
    {
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        $request->user()->update([
            'password' => Hash::make($validated['password']),
        ]);

        return back()->with('message', 'Password updated successfully');
    }

    /**
     * Delete the admin's account.
     */
    public function destroyProfile(Request $request)
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        // Delete profile photo if exists
        if ($user->profile_photo_path) {
            Storage::disk('public')->delete($user->profile_photo_path);
        }

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/homepage');
    }

    // Donate 
    public function donate()
    {
        // Get regular donations with user info
        $donations = Donation::with('user')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($donation) {
                return [
                    'id' => $donation->id,
                    'type' => 'regular',
                    'donor_name' => $donation->user_id ? $donation->user->name : $donation->first_name . ' ' . $donation->last_name,
                    'email' => $donation->email,
                    'amount' => $donation->amount,
                    'status' => $donation->payment_status,
                    'date' => $donation->payment_date,
                    'is_anonymous' => false
                ];
            });

        // Get event donations with user and event info
        $eventDonations = EventDonation::with(['user', 'event'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($donation) {
                return [
                    'id' => $donation->id,
                    'type' => 'event',
                    'donor_name' => $donation->is_anonymous ? 'Anonymous' : ($donation->user ? $donation->user->name : 'Unknown'),
                    'email' => $donation->user ? $donation->user->email : '',
                    'amount' => $donation->amount,
                    'status' => $donation->status,
                    'date' => $donation->created_at,
                    'event_name' => $donation->event->title,
                    'is_anonymous' => $donation->is_anonymous
                ];
            });

        // Combine and sort all donations by date
        $allDonations = $donations->concat($eventDonations)
            ->sortByDesc('date')
            ->values();

        // Calculate statistics
        $statistics = [
            'total_donations' => $allDonations->count(),
            'total_amount' => $allDonations->sum('amount'),
            'regular_donations_count' => $donations->count(),
            'event_donations_count' => $eventDonations->count(),
            'completed_donations' => $allDonations->where('status', 'completed')->count(),
            'pending_donations' => $allDonations->where('status', 'pending')->count()
        ];

        // Group donations by type for analysis
        $donationsByType = [
            'regular' => [
                'count' => $donations->count(),
                'amount' => $donations->sum('amount')
            ],
            'event' => [
                'count' => $eventDonations->count(),
                'amount' => $eventDonations->sum('amount')
            ]
        ];

        return Inertia::render('Admin/Donate', [
            'donations' => $allDonations,
            'statistics' => $statistics,
            'donationsByType' => $donationsByType
        ]);
    }

    // In AdminController.php

    public function eventFeedbacks()
    {
        $feedbacks = EventFeedback::with(['event', 'user', 'registration'])
            ->latest()
            ->get();
        
        // Initialize feedback distribution array with zeros for all ratings
        $feedback_distribution = array_fill(1, 5, 0);
        foreach ($feedbacks as $feedback) {
            if (isset($feedback_distribution[$feedback->rating])) {
                $feedback_distribution[$feedback->rating]++;
            }
        }

        // Calculate statistics
        $statistics = [
            'total_feedbacks' => $feedbacks->count(),
            'average_rating' => round($feedbacks->avg('rating'), 1),
            'total_events_with_feedback' => $feedbacks->unique('events_id')->count(),
            'feedback_distribution' => $feedback_distribution,
            'anonymous_feedback_count' => $feedbacks->where('anonymous', true)->count()
        ];

        return Inertia::render('Admin/EventFeedbacks', [
            'feedbacks' => $feedbacks->map(function ($feedback) {
                return [
                    'id' => $feedback->id,
                    'event' => [
                        'id' => $feedback->event->id,
                        'title' => $feedback->event->title,
                        'end_date' => $feedback->event->end_date,
                    ],
                    'user' => $feedback->anonymous ? null : [
                        'id' => $feedback->user->id,
                        'name' => $feedback->user->name,
                    ],
                    'rating' => $feedback->rating,
                    'comment' => $feedback->comment,
                    'anonymous' => $feedback->anonymous,
                    'created_at' => $feedback->created_at->format('Y-m-d H:i:s'),
                ];
            }),
            'statistics' => $statistics
        ]);
    }

    public function exportEventFeedbacks()
    {
        $feedbacks = EventFeedback::with(['event', 'user'])
            ->get()
            ->map(function ($feedback) {
                return [
                    'Event ID' => $feedback->events_id,
                    'Event Title' => $feedback->event->title,
                    'User' => $feedback->anonymous ? 'Anonymous' : $feedback->user->name,
                    'Rating' => $feedback->rating,
                    'Comment' => $feedback->comment,
                    'Submitted At' => $feedback->created_at->format('Y-m-d H:i:s'),
                ];
            });

        return response()->streamDownload(function () use ($feedbacks) {
            $csv = fopen('php://output', 'w');
            fputcsv($csv, array_keys($feedbacks->first()));
            
            foreach ($feedbacks as $row) {
                fputcsv($csv, $row);
            }
            
            fclose($csv);
        }, 'event_feedbacks.csv');
    }
}
