<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Barryvdh\Debugbar\Facades\Debugbar;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Stripe\{Stripe, Webhook, Checkout\Session};


class PaymentController extends Controller
{
    // Pay order via Stripe Checkout Session// Pay order via Stripe Checkout Session
    public function payOrderByStripe(Order $order) {
        Stripe::setApiKey(config('services.stripe.secret'));
    
        try {
            // Create a Stripe Checkout Session for the order
            $checkoutSession = Session::create([
                'payment_method_types' => ['card'],
                'customer_email' => $order->email,
                'line_items' => [[
                    'price_data' => [
                        'currency' => 'myr',
                        'product_data' => [
                            'name' => 'Order #' . $order->ordernumber,
                        ],
                        'unit_amount' => $order->total_price * 100,
                    ],
                    'quantity' => 1,
                ]],
                'mode' => 'payment',
                'success_url' => route('payment.success', ['order_id' => $order->id]) . '?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => route('payment.cancel', ['order_id' => $order->id,])
            ]);
    
            // Save the session ID to the order
            $order->update([
                'stripe_session_id' => $checkoutSession->id
            ]);
    
            return $checkoutSession;
    
        } catch (\Exception $e) { 
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    // Payment success page (optional, used for redirection)
    public function paymentSuccess(Request $request, $order_id) {
        try {
            // Find the order
            $order = Order::findOrFail($order_id);
            $sessionId = $request->get('session_id');
            
            if (!$sessionId) {
                return Inertia::render('Checkout/Success', [
                    'error' => 'Session ID is required'
                ]);
            }
        
            // Initialize Stripe and get session details
            $stripe = new \Stripe\StripeClient(config('services.stripe.secret'));
            $session = $stripe->checkout->sessions->retrieve($sessionId);
            
            // Only update order status if payment is successful
            if ($session->payment_status === 'paid' && $order->status === 'pending') {
                $order->update([
                    'status' => 'paid',
                    'shipping_status' => 'processing'
                ]);
            }
        
            return Inertia::render('Checkout/Success', [
                'orderId' => $order->id,
                'message' => 'Payment successful!',
                'order' => [
                    'total_price' => $order->total_price,
                    'status' => $order->status,
                    'ordernumber' => $order->ordernumber
                ]
            ]);
    
        } catch (\Exception $e) {
            Log::error('Payment success error: ' . $e->getMessage());
            return Inertia::render('Checkout/Success', [
                'error' => 'There was an error processing your payment confirmation'
            ]);
        }
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
        return Inertia::render('Checkout/PaymentCancel', [
            'order_id' => $order_id,
            'message' => 'Payment was canceled.',
            'order' => $order, // Pass additional order details if necessary
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        // Log the incoming request
        Log::info('Order status update request received', [
            'order_id' => $id,
            'request_data' => $request->all()
        ]);

        try {
            // Validate request
            $validated = $request->validate([
                'status' => 'required|in:default,paid,canceled'
            ]);

            // Find the order
            $order = Order::findOrFail($id);
            
            // Log current state
            Log::info('Current order status', [
                'order_id' => $order->id,
                'old_status' => $order->status,
                'new_status' => $validated['status']
            ]);

            // Update status
            $order->status = $validated['status'];
            $order->save();

            Log::info('Order status updated successfully', [
                'order_id' => $order->id,
                'new_status' => $order->status
            ]);

            return back()->with('success', 'Order status updated successfully');

        } catch (\Exception $e) {
            Log::error('Error updating order status', [
                'order_id' => $id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return back()->with('error', 'Failed to update order status. Error: ' . $e->getMessage());
        }
    }

    // public function getInvoice(Payment $payment)
    // {
    //     try {
    //         if (!$payment->stripe_session_id) {
    //             return response()->json(['error' => 'No Stripe session found'], 404);
    //         }

    //         // Retrieve the session from Stripe
    //         $stripe = new \Stripe\StripeClient(config('services.stripe.secret'));
    //         $session = $stripe->checkout->sessions->retrieve($payment->stripe_session_id);
            
    //         // Get the invoice
    //         if ($session->invoice) {
    //             $invoice = $stripe->invoices->retrieve($session->invoice);
                
    //             // Store invoice URL if not already stored
    //             if (!$payment->stripe_invoice_url) {
    //                 $payment->update([
    //                     'stripe_invoice_id' => $session->invoice,
    //                     'stripe_invoice_url' => $invoice->hosted_invoice_url,
    //                     'invoice_pdf' => $invoice->invoice_pdf
    //                 ]);
    //             }

    //             // Redirect to invoice URL
    //             return redirect($payment->stripe_invoice_url);
    //         }

    //         return back()->with('error', 'No invoice found');
    //     } catch (\Exception $e) {
    //         Log::error('Invoice retrieval error', ['error' => $e->getMessage()]);
    //         return back()->with('error', 'Failed to retrieve invoice');
    //     }
    // }

    public function handleWebhook(Request $request)
    {
        $payload = $request->getContent();
        $sig_header = $request->header('Stripe-Signature');

        try {
            $event = Webhook::constructEvent(
                $payload,
                $sig_header,
                config('services.stripe.webhook_secret')
            );

            Log::info('Webhook received', ['type' => $event->type]);

            switch ($event->type) {
                case 'checkout.session.completed':
                    $session = $event->data->object;
                    
                    // Add debug logging
                    Log::info('Looking for order with session ID', ['session_id' => $session->id]);
                    
                    $order = Order::where('stripe_session_id', $session->id)->first();
                    
                    // Add more debug logging
                    if ($order) {
                        Log::info('Order found', ['order_id' => $order->id]);
                        
                        try {
                            $payment = Payment::create([
                                'order_id' => $order->id,
                                'ordernumber' => $order->ordernumber,
                                'user_id' => $order->user_id,
                                'stripe_session_id' => $session->id,
                                'payment_method' => $session->payment_method_types[0],
                                'amount' => $order->total_price,
                                'payment_status' => 'completed',
                                'payment_date' => now()
                            ]);
                            
                            Log::info('Payment created successfully', ['payment_id' => $payment->id]);

                            $order->update([
                                'status' => 'paid',
                                'shipping_status' => 'processing'
                            ]);
                        } catch (\Exception $e) {
                            Log::error('Payment creation failed', [
                                'error' => $e->getMessage(),
                                'order_id' => $order->id
                            ]);
                        }
                    } else {
                        Log::error('Order not found for session ID', ['session_id' => $session->id]);
                    }
                    break;

                default:
                    Log::info('Unhandled event type: ' . $event->type);
            }

            return response()->json(['status' => 'success'], 200);

        } catch (\UnexpectedValueException $e) {
            Log::error('Webhook Error:', ['error' => $e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 400);
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            Log::error('Webhook Signature Error:', ['error' => $e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 400);
        } catch (\Exception $e) {
            Log::error('Webhook Processing Error:', ['error' => $e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    
}
