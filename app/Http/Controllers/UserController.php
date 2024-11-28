<?php

namespace App\Http\Controllers;

use inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\EventRegistration;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

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
}
