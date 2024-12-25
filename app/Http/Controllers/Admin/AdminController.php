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
use App\Models\EventRegistration;
use App\Models\Membership;
use App\Models\Plan;
use App\Models\UserStory;
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
        Log::info('Blog update request received', [
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

            if ($request->hasFile('thumbnail')) {
                // Delete old thumbnail if it exists
                if ($blog->thumbnail) {
                    Storage::delete('public/' . $blog->thumbnail);
                }
                
                // Store new thumbnail
                $path = $request->file('thumbnail')->store('public/thumbnail');
                $validated['thumbnail'] = str_replace('public/', '', $path);
            }

            $blog->update($validated);

            Log::info('Blog updated successfully', ['blog_id' => $blog_id]);

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
        $eventRegistration = EventRegistration::all();
        $count = $eventRegistration->count();

        return Inertia::render('Admin/EventRegister',[
            'events_register' => $eventRegistration,
            'count' => $count,
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
    public function destroyPlans(Plan $plan, $plan_id) {
        $planId = $plan->findOrFail($plan_id);
        $planId->delete();
        return back()->with('message', 'Plan deleted successfully');
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
            'photo' => ['nullable', 'image', 'max:2048'],
        ]);
    
        try {
            DB::beginTransaction();
    
            if ($request->hasFile('photo')) {
                // Log for debugging
                Log::info('Processing photo upload', [
                    'mime' => $request->file('photo')->getMimeType(),
                    'size' => $request->file('photo')->getSize(),
                    'original_name' => $request->file('photo')->getClientOriginalName()
                ]);
    
                // Delete old photo if exists
                if ($request->user()->profile_photo_path) {
                    $oldPhotoPath = public_path('storage/' . $request->user()->profile_photo_path);
                    if (file_exists($oldPhotoPath)) {
                        unlink($oldPhotoPath);
                    }
                }
    
                // Generate unique filename
                $fileName = time() . '_' . $request->file('photo')->getClientOriginalName();
                
                // Ensure directory exists
                $path = public_path('storage/profile-photos');
                if (!file_exists($path)) {
                    mkdir($path, 0777, true);
                }
    
                // Move the uploaded file
                $request->file('photo')->move($path, $fileName);
                
                // Save path to validated data
                $validated['profile_photo_path'] = 'profile-photos/' . $fileName;
    
                Log::info('Photo saved', [
                    'path' => $validated['profile_photo_path']
                ]);
            }
    
            $user = $request->user();
            $user->fill($validated);
            $user->save();
    
            DB::commit();
    
            return back()->with('message', 'Profile updated successfully');
    
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Profile update failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return back()->withErrors(['error' => 'Failed to update profile: ' . $e->getMessage()]);
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
}
