<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Barryvdh\Debugbar\Facades\Debugbar;


class PaymentController extends Controller
{
    // Pay order via Stripe Checkout Session// Pay order via Stripe Checkout Session
    public function payOrderByStripe(Order $order) {

        // Get secret key - Initialize Stripe
        Stripe::setApiKey(env('STRIPE_SECRET_KEY'));

        try {
            // Retrieve the order items associated with the order
            $orderItems = OrderItem::where('order_id', $order->id)->get();
            
            // Prepare line items for Stripe
            $lineItems = $orderItems->map(function ($item) {
                return [
                    'price_data' => [
                        'currency' => 'usd',
                        'product_data' => [
                            'name' => 'Order Item #' . $item->id, // Description for the item
                        ],
                        'unit_amount' => $item->price * 100, // Price in cents
                    ],
                    'quantity' => $item->quantity, // Quantity for this item
                ];
            })->toArray();

            // Create a Stripe Checkout Session for the order
            $checkoutSession = Session::create([
                'payment_method_types' => ['card'], // Add more methods if needed
                'customer_email' => $order->email,
                'line_items' => [[
                    'price_data' => [
                        'currency' => 'usd', // Use your currency
                        'product_data' => [
                            'name' => 'Order #' . $order->ordernumber,
                        ],
                        'unit_amount' => $order->total_price * 100, // Stripe expects the amount in cents
                    ],
                    'quantity' => 1,
                ]],
                'mode' => 'payment',
                'success_url' => route('payment.success', ['order_id' => $order->id, 'session_id' => '{CHECKOUT_SESSION_ID}']), // Redirect after success
                // 'cancel_url' => route('payment.cancel', ['order' => $order->id]),   // Redirect after cancel
                'cancel_url' => route('payment.cancel', ['order_id' => $order->id,])
            ]);

            return $checkoutSession;

        } catch (\Exception $e) { 
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    // Payment success page (optional, used for redirection)
    public function paymentSuccess(Request $request, $order_id) {
        
        // Retrieve the order using the order_id
        $order = Order::findOrFail($order_id);
    
        // Update the order status to 'paid'
        if ($order->status === 'unpaid') {
            $order->status = 'paid';
            $order->save();
        }
    
        // Retrieve session_id from the request query parameter
        $sessionId = $request->get('session_id');

        if (!$sessionId) {
            return response()->json(['error' => 'Session ID is required'], 400);
        }

        // Log the session_id to Debugbar
        Debugbar::info($sessionId);

        // You can also log the whole request for more details
        Debugbar::info($request->all());

        // Now you can use $sessionId to retrieve the Stripe session
        $stripe = new \Stripe\StripeClient(env('STRIPE_SECRET_KEY'));
        $session = $stripe->checkout->sessions->retrieve($sessionId);

        Debugbar::info($session);
    
        // If the user is authenticated, create a payment record for the logged-in user
        if (Auth::check()) {
            $user = Auth::user();
            Payment::create([
                'order_id' => $order->id,
                'ordernumber' => $order->ordernumber,
                'user_id' => $user->id, // Authenticated user
                'stripe_session_id' => $session->id,
                'payment_method' => $session->payment_method_types[0],
                'amount' => $order->total_price,
                'payment_status' => $session->payment_status,
                'payment_date' => now(),
            ]);
        } else {
            // For guest users, create a payment record with null for user_id
            Payment::create([
                'order_id' => $order->id,
                'ordernumber' => $order->ordernumber,
                'user_id' => null, // Null for guest
                'stripe_session_id' => $session->id,
                'payment_method' => $session->payment_method_types[0],
                'amount' => $order->total_price,
                'payment_status' => $session->payment_status,
                'payment_date' => now(),
            ]);
        }
    
        // Render the PaymentSuccess React component using Inertia and pass the order details
        return Inertia::render('/Checkout/PaymentSuccess', [
            'order_id' => $order->id,
            'message' => 'Payment successful!',
            'order' => $order, // Pass order details for display if necessary
        ]);
    }
   

    // Payment cancel page (optional, used for redirection)
    public function paymentCancel(Request $request, $order_id) {
        // Handle payment cancellation
        // Retrieve the order
        $order = Order::findOrFail($order_id);

        // Optionally, you can update the order status to 'canceled'
        $order->status = 'canceled';
        $order->save();

        // Render the PaymentCancel React component and pass the order_id
        return Inertia::render('/Checkout/PaymentCancel', [
            'order_id' => $order_id,
            'message' => 'Payment was canceled.',
            'order' => $order, // Pass additional order details if necessary
        ]);
    }
}
