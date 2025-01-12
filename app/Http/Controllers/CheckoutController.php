<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Barryvdh\Debugbar\Facades\Debugbar;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Products;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\PaymentController;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Mail\ShippingUpdateMail;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\BillplzPaymentController;

class CheckoutController extends Controller
{
    /**
     * Show the checkout page with cart items and user data
     */
    public function showOrder(Request $request) 
    {
        // Get current cart
        $checkoutOrder = session()->get('cart', []);
        
        if (empty($checkoutOrder)) {
            Debugbar::info('No cart!');
            return redirect()->route('cart.show')->with('message', 'Your cart is empty.');
        }

        // Get authenticated user data if available
        $userData = null;
        if (Auth::check()) {
            $user = Auth::user();
            $userData = [
                'email' => $user->email,
                'firstname' => explode(' ', $user->name)[0] ?? '',
                'lastname' => implode(' ', array_slice(explode(' ', $user->name), 1)) ?? '',
                'address_1' => $user->address_1,
                'address_2' => $user->address_2,
                'city' => $user->city,
                'state' => $user->state,
                'postcode' => $user->postcode,
                'country' => $user->country,
                'phonenumber' => $user->phone,
            ];
        }

        // Get saved addresses from cookie
        $savedAddresses = json_decode($request->cookie('savedAddresses'), true) ?? [];

        return Inertia::render('Checkout', [
            'order' => $checkoutOrder,
            'userData' => $userData,
            'savedAddresses' => $savedAddresses,
            'auth' => [
                'user' => Auth::user()
            ]
        ]);
    }

    /**
     * Create a new order and process payment
     */
    // public function createOrder(Request $request)
    // {
    //     // First check if cart is empty
    //     $cart = session()->get('cart', []);
    //     if (empty($cart)) {
    //         return redirect()->route('products')
    //             ->with('warning', 'Please select products before proceeding to checkout.');
    //     }

    //     // Validate the request
    //     $validatedData = $request->validate([
    //         'email' => 'required|email|max:255',
    //         'firstname' => 'required|string|max:255',
    //         'lastname' => 'required|string|max:255',
    //         'address_1' => 'required|string',
    //         'address_2' => 'nullable|string',
    //         'city' => 'required|string',
    //         'country' => 'required|string',
    //         'state' => ['required', 'string', Rule::in([
    //             'Johor', 'Kedah', 'Kelantan', 'Kuala Lumpur', 'Labuan', 
    //             'Melaka', 'Negeri Sembilan', 'Pahang', 'Penang', 'Perak', 
    //             'Perlis', 'Putrajaya', 'Sabah', 'Sarawak', 'Selangor', 'Terengganu'
    //         ])],
    //         'postcode' => 'required|string|regex:/^\d{5}$/',
    //         'phonenumber' => 'required|string|regex:/^01[0-9]{8,9}$/',
    //         'payment_method' => ['required', Rule::in(Order::getValidPaymentMethods())],
    //     ]);

    //     // Get cart
    //     $cart = session()->get('cart', []);
    //     if (empty($cart)) {
    //         return redirect()->route('cart.show')->with('error', 'Your cart is empty');
    //     }

    //     try {
    //         // Start transaction
    //         DB::beginTransaction();

    //         // Create the order
    //         $order = Order::create([
    //             'user_id' => Auth::id(),
    //             'ordernumber' => $this->generateOrderNumber(),
    //             'email' => $validatedData['email'],
    //             'firstname' => $validatedData['firstname'],
    //             'lastname' => $validatedData['lastname'],
    //             'address_1' => $validatedData['address_1'],
    //             'address_2' => $validatedData['address_2'],
    //             'city' => $validatedData['city'],
    //             'state' => $validatedData['state'],
    //             'postcode' => $validatedData['postcode'],
    //             'country' => $validatedData['country'],
    //             'phonenumber' => $validatedData['phonenumber'],
    //             'total_price' => $this->calculateTotalPrice($cart),
    //             'status' => Order::STATUS_PENDING,
    //             'shipping_status' => Order::SHIPPING_STATUS_PENDING,
    //             'payment_method' => $validatedData['payment_method'],
                
    //         ]);

    //         // Create order items
    //         foreach ($cart as $cartItem) {
    //             OrderItem::create([
    //                 'order_id' => $order->id,
    //                 'product_id' => $cartItem['id'],
    //                 'quantity' => $cartItem['quantity'],
    //                 'price' => $cartItem['price']
    //             ]);
    //         }

    //         // Save address to cookie
    //         $cookieValue = request()->cookie('savedAddresses');
    //         $savedAddresses = [];
            
    //         if (!is_null($cookieValue)) {
    //             $savedAddresses = json_decode((string)$cookieValue, true) ?? [];
    //         }

    //         // Check if address already exists
    //         $exists = collect($savedAddresses)->contains(function ($saved) use ($validatedData) {
    //             return $saved['address_1'] === $validatedData['address_1'] 
    //                 && $saved['postcode'] === $validatedData['postcode'];
    //         });

    //         if (!$exists) {
    //             array_push($savedAddresses, [
    //                 'email' => $validatedData['email'],
    //                 'firstname' => $validatedData['firstname'],
    //                 'lastname' => $validatedData['lastname'],
    //                 'address_1' => $validatedData['address_1'],
    //                 'address_2' => $validatedData['address_2'],
    //                 'city' => $validatedData['city'],
    //                 'state' => $validatedData['state'],
    //                 'postcode' => $validatedData['postcode'],
    //                 'country' => $validatedData['country'],
    //                 'phonenumber' => $validatedData['phonenumber'],
    //             ]);

    //             if (count($savedAddresses) > 5) {
    //                 array_shift($savedAddresses);
    //             }

    //             Cookie::queue('savedAddresses', json_encode($savedAddresses), 43200);
    //         }

    //         // Clear the cart
    //         Session::forget('cart');

    //         // Generate Stripe session
    //         $paymentController = app(PaymentController::class);
    //         $stripeSession = $paymentController->payOrderByStripe($order);

    //         // If everything is successful, commit the transaction
    //         DB::commit();

    //         // Return Stripe checkout URL
    //         if ($stripeSession && isset($stripeSession->url)) {
    //             return Inertia::location($stripeSession->url);
    //         }

    //         throw new \Exception('Failed to create payment session');

    //     } catch (\Exception $e) {
    //         // Rollback all database changes
    //         DB::rollBack();
            
    //         Log::error('Order creation failed', [
    //             'error' => $e->getMessage(),
    //             'trace' => $e->getTraceAsString(),
    //             'user_id' => Auth::id(),
    //             'data' => $validatedData,
    //             'cart' => $cart
    //         ]);

    //         // Get saved addresses safely for error response
    //         $cookieValue = request()->cookie('savedAddresses');
    //         $savedAddresses = [];
            
    //         if (!is_null($cookieValue)) {
    //             $savedAddresses = json_decode((string)$cookieValue, true) ?? [];
    //         }

    //         // Return to checkout with error
    //         return Inertia::render('Checkout', [
    //             'error' => 'Failed to create order: ' . $e->getMessage(),
    //             'order' => $cart,
    //             'userData' => $validatedData,
    //             'savedAddresses' => $savedAddresses,
    //             'auth' => [
    //                 'user' => Auth::user()
    //             ]
    //         ]);
    //     }
    // }

    /**
 * Create a new order and process payment
 */
    public function createOrder(Request $request)
    {
        // First check if cart is empty
        $cart = session()->get('cart', []);
        if (empty($cart)) {
            return redirect()->route('products')
                ->with('warning', 'Please select products before proceeding to checkout.');
        }

        // Validate the request
        $validatedData = $request->validate([
            'email' => 'required|email|max:255',
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'address_1' => 'required|string',
            'address_2' => 'nullable|string',
            'city' => 'required|string',
            'country' => 'required|string',
            'state' => ['required', 'string', Rule::in([
                'Johor', 'Kedah', 'Kelantan', 'Kuala Lumpur', 'Labuan', 
                'Melaka', 'Negeri Sembilan', 'Pahang', 'Penang', 'Perak', 
                'Perlis', 'Putrajaya', 'Sabah', 'Sarawak', 'Selangor', 'Terengganu'
            ])],
            'postcode' => 'required|string|regex:/^\d{5}$/',
            'phonenumber' => 'required|string|regex:/^01[0-9]{8,9}$/',
            'payment_method' => ['required', Rule::in(['stripe', 'billplz'])], // Add payment method validation
        ]);

        // Get cart
        $cart = session()->get('cart', []);
        if (empty($cart)) {
            return redirect()->route('cart.show')->with('error', 'Your cart is empty');
        }

        try {
            // Start transaction
            DB::beginTransaction();

            // Create the order
            $order = Order::create([
                'user_id' => Auth::id(),
                'ordernumber' => $this->generateOrderNumber(),
                'email' => $validatedData['email'],
                'firstname' => $validatedData['firstname'],
                'lastname' => $validatedData['lastname'],
                'address_1' => $validatedData['address_1'],
                'address_2' => $validatedData['address_2'],
                'city' => $validatedData['city'],
                'state' => $validatedData['state'],
                'postcode' => $validatedData['postcode'],
                'country' => $validatedData['country'],
                'phonenumber' => $validatedData['phonenumber'],
                'total_price' => $this->calculateTotalPrice($cart),
                'status' => Order::STATUS_PENDING,
                'shipping_status' => Order::SHIPPING_STATUS_PENDING,
                'payment_method' => $validatedData['payment_method'],
            ]);

            // Create order items
            foreach ($cart as $cartItem) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $cartItem['id'],
                    'quantity' => $cartItem['quantity'],
                    'price' => $cartItem['price']
                ]);
            }

            // Save address to cookie
            $cookieValue = request()->cookie('savedAddresses');
            $savedAddresses = [];
            
            if (!is_null($cookieValue)) {
                $savedAddresses = json_decode((string)$cookieValue, true) ?? [];
            }

            // Check if address already exists
            $exists = collect($savedAddresses)->contains(function ($saved) use ($validatedData) {
                return $saved['address_1'] === $validatedData['address_1'] 
                    && $saved['postcode'] === $validatedData['postcode'];
            });

            if (!$exists) {
                array_push($savedAddresses, [
                    'email' => $validatedData['email'],
                    'firstname' => $validatedData['firstname'],
                    'lastname' => $validatedData['lastname'],
                    'address_1' => $validatedData['address_1'],
                    'address_2' => $validatedData['address_2'],
                    'city' => $validatedData['city'],
                    'state' => $validatedData['state'],
                    'postcode' => $validatedData['postcode'],
                    'country' => $validatedData['country'],
                    'phonenumber' => $validatedData['phonenumber'],
                ]);

                if (count($savedAddresses) > 5) {
                    array_shift($savedAddresses);
                }

                Cookie::queue('savedAddresses', json_encode($savedAddresses), 43200);
            }

            // Clear the cart
            Session::forget('cart');

            // Process payment based on selected method
            if ($validatedData['payment_method'] === 'stripe') {
                $paymentController = app(PaymentController::class);
                $stripeSession = $paymentController->payOrderByStripe($order);

                // If everything is successful, commit the transaction
                DB::commit();

                // Return Stripe checkout URL
                if ($stripeSession && isset($stripeSession->url)) {
                    return Inertia::location($stripeSession->url);
                }
            } elseif ($validatedData['payment_method'] === 'billplz') {
                $billplzController = app(BillplzPaymentController::class);
                $billplzSession = $billplzController->createBill($order);
                
                // If everything is successful, commit the transaction
                DB::commit();
            
                // Get the response data
                $responseData = json_decode($billplzSession->getContent(), true);
            
                // Check if successful and URL exists
                if ($responseData['success'] && isset($responseData['url'])) {
                    return Inertia::location($responseData['url']);
                }
            }

            throw new \Exception('Failed to create payment session');

        } catch (\Exception $e) {
            // Rollback all database changes
            DB::rollBack();
            
            Log::error('Order creation failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'user_id' => Auth::id(),
                'data' => $validatedData,
                'cart' => $cart
            ]);

            // Get saved addresses safely for error response
            $cookieValue = request()->cookie('savedAddresses');
            $savedAddresses = [];
            
            if (!is_null($cookieValue)) {
                $savedAddresses = json_decode((string)$cookieValue, true) ?? [];
            }

            // Return to checkout with error
            return Inertia::render('Checkout', [
                'error' => 'Failed to create order: ' . $e->getMessage(),
                'order' => $cart,
                'userData' => $validatedData,
                'savedAddresses' => $savedAddresses,
                'auth' => [
                    'user' => Auth::user()
                ]
            ]);
        }
    }

    /**
     * Generate a unique order number
     */
    private function generateOrderNumber()
    {
        $prefix = 'ORD';
        $timestamp = now()->format('YmdHis');
        $random = str_pad(rand(0, 999), 3, '0', STR_PAD_LEFT);
        return $prefix . $timestamp . $random;
    }

    /**
     * Calculate total price including shipping
     */
    private function calculateTotalPrice($cart)
    {
        $totalPrice = collect($cart)->sum(function ($item) {
            return $item['quantity'] * $item['price'];
        });

        $shippingFee = 10; // Fixed shipping fee
        return $totalPrice + $shippingFee;
    }

    /**
     * Update shipping status
     */
    public function updateShippingStatus(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'shipping_status' => ['required', Rule::in([
                    Order::SHIPPING_STATUS_PENDING,
                    Order::SHIPPING_STATUS_PROCESSING,
                    Order::SHIPPING_STATUS_SHIPPED,
                    Order::SHIPPING_STATUS_DELIVERED
                ])],
                'tracking_number' => 'required|string',
                'courier_name' => ['required', Rule::in([
                    Order::COURIER_JANDT,
                    Order::COURIER_POSLAJU,
                    Order::COURIER_DHL,
                    Order::COURIER_FEDEX
                ])]
            ]);

            $order = Order::findOrFail($id);
            
            // Update shipping info
            $order->update($validated);

            // Send email notification
            try {
                Mail::to($order->email)->send(new ShippingUpdateMail($order));
                Log::info('Shipping update email sent', ['order_id' => $order->id]);
            } catch (\Exception $e) {
                Log::error('Failed to send shipping update email', [
                    'order_id' => $order->id,
                    'error' => $e->getMessage()
                ]);
            }

            return back()->with('success', 'Shipping information updated successfully');

        } catch (\Exception $e) {
            Log::error('Error updating shipping status', [
                'order_id' => $id,
                'error' => $e->getMessage()
            ]);
            return back()->with('error', 'Failed to update shipping status');
        }
    }

    /**
     * Get shipping information
     */
    public function getShippingInfo($id)
    {
        try {
            $order = Order::with(['orderItems.product'])->findOrFail($id);
            
            if (!$order->canViewShippingInfo()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized to view shipping information'
                ], 403);
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'ordernumber' => $order->ordernumber,
                    'shipping_status' => $order->shipping_status,
                    'tracking_number' => $order->tracking_number,
                    'courier_name' => $order->courier_name,
                    'delivery_address' => [
                        'address_1' => $order->address_1,
                        'address_2' => $order->address_2,
                        'city' => $order->city,
                        'state' => $order->state,
                        'postcode' => $order->postcode,
                        'country' => $order->country
                    ],
                    'order_items' => $order->orderItems->map(function ($item) {
                        return [
                            'name' => $item->product->name,
                            'quantity' => $item->quantity,
                            'price' => $item->price
                        ];
                    })
                ]
            ]);

        } catch (\Exception $e) {
            Log::error('Error retrieving shipping info', [
                'order_id' => $id,
                'error' => $e->getMessage()
            ]);
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve shipping information'
            ], 500);
        }
    }

    /**
     * Update order status
     */
    public function updateStatus(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'status' => ['required', Rule::in(Order::getValidStatuses())]
            ]);

            $order = Order::findOrFail($id);
            
            Log::info('Updating order status', [
                'order_id' => $order->id,
                'old_status' => $order->status,
                'new_status' => $validated['status']
            ]);

            $order->update([
                'status' => $validated['status']
            ]);

            return back()->with('success', 'Order status updated successfully');

        } catch (\Exception $e) {
            Log::error('Error updating order status', [
                'order_id' => $id,
                'error' => $e->getMessage()
            ]);
            return back()->with('error', 'Failed to update status');
        }
    }
}