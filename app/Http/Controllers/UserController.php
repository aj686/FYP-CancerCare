<?php

namespace App\Http\Controllers;

use inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\EventRegistration;
use App\Models\Order;
use App\Models\Membership;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\UserStory;

class UserController extends Controller
{
    public function bookings() {
        
        $user = Auth::user();
    
        // Get the latest registration status for each event
        $bookings = EventRegistration::with(['event', 'user'])
            ->where('user_id', $user->id)
            ->whereIn('id', function($query) use ($user) {
                $query->select(DB::raw('MAX(id)'))
                    ->from('event_registrations')
                    ->where('user_id', $user->id)
                    ->groupBy('events_id');
            })
            ->get();

        $count = $bookings->count();
            
        return Inertia::render('User/Booking', [
            'bookings' => $bookings,
            'count' => $count
        ]);
    }

    public function cancelBooking(EventRegistration $eventRegistration) {

        // Check if user owns this booking
        if ($eventRegistration->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Check if booking can be cancelled (not already cancelled)
        if ($eventRegistration->status === 'cancelled') {
            return response()->json(['message' => 'Booking is already cancelled'], 400);
        }

        $eventRegistration->update(['status' => 'cancelled']);

        return redirect()->back()->with('success', 'Booking cancelled successfully');
    }

    public function orders()
    {
        $user = Auth::user();

        $orders = Order::with(['orderItems.product'])  // Note the nested eager loading
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('User/Order', [
            'orders' => $orders,
            'count' => $orders->count()
        ]);
    }

    public function showInvoice(Order $order)
    {
        // Add dd() to debug
        // dd($order->toArray());  // Remove this after testing
        
        // Check if the authenticated user owns this order
        if ($order->user_id !== Auth::id()) {
            abort(403);
        }
    
        // Load order items with their related products
        $order->load(['orderItems.product' => function($query) {
            $query->select('id', 'name');
        }]);
    
        return Inertia::render('User/UserComp/Invoice', [
            'order' => $order
        ]);
    }

    public function dashboard()
    {
        $user = Auth::user();
        
        $orders = Order::where('user_id', $user->id)
            ->with(['orderItems.product'])
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        $bookings = EventRegistration::where('user_id', $user->id)
            ->with(['event' => function($query) {
                $query->select('id', 'title', 'start_date', 'end_date');
            }])
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        $stories = UserStory::query()
            ->where('user_id', $user->id)
            ->select('id', 'title', 'status', 'created_at')
            ->where('status', 'approved')
            ->orderBy('created_at', 'desc')
            ->get();

        // Check active membership
        $activeMembership = Membership::where('user_id', $user->id)
            ->where('status', 'active')
            ->where('end_date', '>', now())
            ->first();

        // Debug user data
        // dd($user->toArray());  // Uncomment this to debug

        return Inertia::render('Dashboard', [
            'auth' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'usertype' => $user->usertype,
                    'age' => $user->age,
                    'phone' => $user->phone,
                    'address_1' => $user->address_1,
                    'address_2' => $user->address_2,
                    'city' => $user->city,
                    'state' => $user->state,
                    'postcode' => $user->postcode,
                    'country' => $user->country,
                    'profile_photo_url' => $user->profile_photo_url,
                    'has_active_membership' => !is_null($activeMembership),
                    'membership' => $activeMembership ? [
                        'start_date' => $activeMembership->start_date->format('Y-m-d'),
                        'end_date' => $activeMembership->end_date->format('Y-m-d')
                    ] : null
                ]
            ],
            'orders' => $orders,
            'bookings' => $bookings,
            'stories' => $stories
        ]);
    }

    public function cancelMembership(Request $request)
    {
        $user = Auth::user();

        $membership = Membership::where('user_id', $user->id)
            ->where('status', 'active')
            ->first();

        if ($membership) {
            $membership->update(['status' => 'canceled']);
            return back()->with('success', 'Membership canceled successfully.');
        }

        return back()->with('error', 'No active membership found.');
    }
}
