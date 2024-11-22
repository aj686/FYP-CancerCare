<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Barryvdh\Debugbar\Facades\Debugbar;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\PaymentController;


class CheckoutController extends Controller
{

    // Items at cart session will store as same in order 
    // order object pass the props to Checkout.jsx
    public function showOrder (Request $request) {

        $checkoutOrder = session()->get('cart', []);

        if (empty($checkoutOrder)) {
            Debugbar::info('No cart!');
            // // You can redirect to the cart page if it's empty
            // return redirect()->route('cart.index')->with('message', 'Your cart is empty.');
        }
        return Inertia::render('Checkout', props:['order' => $checkoutOrder]);

        

    }

    public function createOrder(Request $request) {

        // Get user from Checkout.jsx form and validate
        $validatedUser = $request->validate([
            'email' => 'required|email|max:255',
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'address_1' => 'required|string',
            'address_2' => 'nullable|string',
            'city' => 'required|string',
            'country' => 'required|string',
            'state' => 'required|string',
            'postcode' => 'required|string',
            'phonenumber' => 'required|string',
            // 'cart' => 'required|array',  // The cart data from session
        ]);


        // get current session cart user
        $cart = session()->get('cart', []);

        // if(empty($cart)) {
        //     return redirect()->route('cart.show')->with('error', 'Your cart is empty');
        // }

        // // Merge address fields into a single string
        // $delivery_address = $validatedUser['address_1'] 
        //     . ' ' . ($validatedUser['address_2'] ?? '') 
        //     . ', ' . $validatedUser['city'] 
        //     . ', ' . $validatedUser['state'] 
        //     . ', ' . $validatedUser['country'] 
        //     . ', ' . $validatedUser['postcode'];

        // Check if the user is authenticated 
        if (Auth::check()) {
            $user = Auth::user();
            $order = Order::create([
                'user_id' => $user->id, // Set user id for registerd users
                'ordernumber' => uniqid('order_'), // Generate a unique order number
                'email' => $validatedUser['email'],
                'firstname' => $user->name, // Use the user's name
                'lastname' => $validatedUser['lastname'], // You may choose to allow updates later
                'address_1' => $validatedUser['address_1'],
                'address_2' => $validatedUser['address_2'],
                'city' => $validatedUser['city'],
                'state' => $validatedUser['state'],
                'postcode' => $validatedUser['postcode'],
                'country' => $validatedUser['country'],
                'phonenumber' => $validatedUser['phonenumber'],
                'total_price' => $this->calculateTotalPrice($cart),
                'shipping_status' => 'pending',  // Default order status
                'payment_method' => 'stripe', // Assume Stripe for now
            ]);


        } else {
            // If the user is not authenticated, create a guest order
            // Create order for guest users (no user_id)
            $order = Order::create([
                'user_id' => null, // Set to null for guest users
                'ordernumber' => uniqid('order_'), // Generate a unique order number
                'email' => $validatedUser['email'],
                'firstname' => $validatedUser['firstname'],
                'lastname' => $validatedUser['lastname'],
                'address_1' => $validatedUser['address_1'],
                'address_2' => $validatedUser['address_2'],
                'city' => $validatedUser['city'],
                'state' => $validatedUser['state'],
                'postcode' => $validatedUser['postcode'],
                'country' => $validatedUser['country'],
                'phonenumber' => $validatedUser['phonenumber'],
                'total_price' => $this->calculateTotalPrice($cart),
                'shipping_status' => 'pending',  // Default order status
                'payment_method' => 'stripe', // Payment method (e.g., Stripe)
            ]);
        }

        // // Create order items
        // foreach ($validatedUser['cart'] as $cartItem) {
        //     OrderItem::create([
        //         'order_id' => $order->id,
        //         'product_id' => $cartItem['product_id'],
        //         'quantity' => $cartItem['quantity'],
        //         'price' => $cartItem['price']

        //     ]);
        // }

        // Create order items
        foreach ($cart as $cartItem) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $cartItem['id'],
                'quantity' => $cartItem['quantity'],
                'price' => $cartItem['price'],
            ]);
        }

            // Clear the cart session
            Session::forget('cart');

            // Call the Payment Controller to generate a Stripe Session
            $paymentController = app(PaymentController::class);
            $stripeSession = $paymentController->payOrderByStripe($order);

            // Check if the session was created successfully and return the payment URL
            if ($stripeSession && isset($stripeSession->url)) {
                // return response()->json(['payment_url' => $stripeSession->url]);
                // return redirect($stripeSession->url);
                return Inertia::location($stripeSession->url);

            } else {
                return response()->json(['error' => 'Unable to create payment session'], 500);
            }
        }

    /**
     * Helper function to calculate the total price of the cart.
     */
    private function calculateTotalPrice($cart)
    {
        // Calculate the total price of the cart items
        $totalPrice = collect($cart)->sum(function ($item) {
            return $item['quantity'] * $item['price'];
        });

        // Add RM 10 for shipping
        $shippingFee = 10;

        return $totalPrice + $shippingFee;
    }
}
