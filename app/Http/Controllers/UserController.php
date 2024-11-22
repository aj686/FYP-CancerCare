<?php

namespace App\Http\Controllers;

use inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\EventRegistration;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;
class UserController extends Controller
{
    public function bookings() {
        
        $user = Auth::user();
    
        $bookings = EventRegistration::with(['event', 'user'])
            ->where('user_id', $user->id)
            ->get();

        $count = $bookings->count();
            
        return Inertia::render('User/Booking', [
            'bookings' => $bookings,
            'count' => $count
        ]);
    }

    public function orders() {
        $user = Auth::user();
    
        $orders = Order::where('user_id', $user->id)->orderBy('created_at', 'desc')->get();

        return Inertia::render('User/Order', [
            'orders' => $orders,
            'count' => $orders->count()
        ]);
    }
}
