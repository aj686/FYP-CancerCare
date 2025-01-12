<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Billplz\Laravel\Billplz;
use App\Models\Order;
use App\Models\Payment;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
class BillplzPaymentController extends Controller
{
    public function createBill(Order $order)
    {
        try {
            $billplz = Billplz::make(config('services.billplz.key'));
            if (config('services.billplz.sandbox')) {
                $billplz->useSandbox();
            }
                
            $response = $billplz->bill()->create(
                config('services.billplz.collection_id'),
                $order->email,
                null,
                $order->firstname . ' ' . $order->lastname,
                $order->total_price * 100, // Convert to cents
                route('billplz.callback'),
                'Order #' . $order->ordernumber,
                [
                    'redirect_url' => route('billplz.redirect', ['order_id' => $order->id]),
                    'reference_1_label' => 'Bank Code',
                    'reference_1' => 'BP-FKR01', // Use Billplz Simulator in sandbox
                    'reference_2_label' => 'Order ID',
                    'reference_2' => $order->id
                ]
            );

            $billData = $response->toArray();
            Log::info('Billplz response:', ['response' => $billData]);

            if (isset($billData['id'])) {
                // Store Billplz information
                $payment = Payment::create([
                    'order_id' => $order->id,
                    'ordernumber' => $order->ordernumber,
                    'user_id' => $order->user_id ?? 0,
                    'stripe_session_id' => 'BILLPLZ_PAYMENT',
                    'billplz_bill_id' => $billData['id'],
                    'billplz_url' => $billData['url'],
                    'payment_method' => 'billplz',
                    'amount' => $order->total_price,
                    'payment_status' => Payment::STATUS_PENDING,
                    'payment_date' => now()
                ]);

                $order->update(['payment_method' => 'billplz']);

                return response()->json([
                    'success' => true,
                    'url' => $billData['url']
                ]);
            }

            throw new \Exception('Invalid response from Billplz');

        } catch (\Exception $e) {
            Log::error('Billplz bill creation failed', [
                'error' => $e->getMessage(),
                'error_class' => get_class($e),
                'order_id' => $order->id,
                'user_id' => $order->user_id,
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to create payment: ' . $e->getMessage()
            ], 500);
        }
    }

    public function callback(Request $request)
    {
        try {
            // Get X-Signature from header
            $xSignature = $request->header('X-Signature');
            $xSignatureKey = config('services.billplz.x-signature');

            // Log the raw request data for debugging
            Log::info('Billplz callback raw data:', [
                'headers' => $request->headers->all(),
                'data' => $request->all()
            ]);

            // Validate the data exists
            $data = $request->all();
            if (!isset($data['id']) || !isset($data['paid']) || !isset($data['paid_at'])) {
                Log::error('Missing required fields in callback data', ['data' => $data]);
                return response()->json(['error' => 'Missing required fields'], 400);
            }

            // Create signature string according to Billplz documentation
            $signatureString = $data['id'] . $data['paid_at'] . $data['paid'] . $data['x_signature'];
            $generatedSignature = hash_hmac('sha256', $signatureString, $xSignatureKey);

            Log::info('Signature verification:', [
                'received_signature' => $data['x_signature'],
                'generated_signature' => $generatedSignature
            ]);

            if ($data['x_signature'] === $generatedSignature) {
                // Find the payment record
                $payment = Payment::where('billplz_bill_id', $data['id'])->first();
                
                if (!$payment) {
                    Log::error('Payment record not found', ['billplz_bill_id' => $data['id']]);
                    return response()->json(['error' => 'Payment not found'], 404);
                }

                $order = $payment->order;
                if (!$order) {
                    Log::error('Order not found for payment', [
                        'payment_id' => $payment->id,
                        'order_id' => $payment->order_id
                    ]);
                    return response()->json(['error' => 'Order not found'], 404);
                }

                // Convert paid status to boolean
                $isPaid = ($data['paid'] === 'true' || $data['paid'] === true);
                
                Log::info('Processing payment status update', [
                    'payment_id' => $payment->id,
                    'order_id' => $order->id,
                    'is_paid' => $isPaid,
                    'current_status' => $payment->payment_status
                ]);

                if ($isPaid) {
                    // Update payment status
                    $payment->update([
                        'payment_status' => Payment::STATUS_COMPLETED,
                        'payment_date' => now()
                    ]);

                    // Update order status
                    $order->update([
                        'status' => 'paid',
                        'shipping_status' => 'processing'
                    ]);

                    Log::info('Payment marked as completed', [
                        'payment_id' => $payment->id,
                        'order_id' => $order->id,
                        'new_status' => Payment::STATUS_COMPLETED
                    ]);
                } else {
                    // Handle failed payment
                    $payment->update([
                        'payment_status' => Payment::STATUS_FAILED,
                        'payment_date' => now()
                    ]);

                    $order->update([
                        'status' => 'failed'
                    ]);

                    Log::info('Payment marked as failed', [
                        'payment_id' => $payment->id,
                        'order_id' => $order->id,
                        'new_status' => Payment::STATUS_FAILED
                    ]);
                }

                return response()->json(['status' => 'success']);
            }

            Log::error('Signature verification failed', [
                'received_signature' => $data['x_signature'],
                'generated_signature' => $generatedSignature
            ]);
            return response()->json(['error' => 'Invalid signature'], 400);

        } catch (\Exception $e) {
            Log::error('Billplz callback processing error', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'request_data' => $request->all()
            ]);
            
            return response()->json(['error' => 'Internal server error'], 500);
        }
    }

    public function redirect(Request $request, $order_id)
    {
        try {
            // Retrieve the order
            $order = Order::findOrFail($order_id);

            // Retrieve the X-Signature from the request header
            $xSignature = $request->header('X-Signature');
            $xSignatureKey = config('services.billplz.x-signature');

            // Retrieve the request data
            $data = $request->all();
            Log::info('Billplz redirect received', [
                'order_id' => $order_id,
                'data' => $data
            ]);

            // Prepare the data string for X-Signature verification
            $dataString = "billplzid={$data['id']}&billplzpaid_at={$data['paid_at']}&billplzpaid={$data['paid']}&billplzx_signature={$xSignature}";

            // Generate the expected X-Signature
            $expectedSignature = hash_hmac('sha256', $dataString, $xSignatureKey);

            // Compare the expected signature with the received signature
            if ($xSignature === $expectedSignature) {
                // Signature is valid
                if ($data['paid'] === 'true' || $data['paid'] === true) {
                    // Payment was successful
                    return Inertia::render('Checkout/BillplzSuccess', [
                        'orderId' => $order->id,
                        'message' => 'Payment successful!',
                        'order' => [
                            'total_price' => $order->total_price,
                            'status' => $order->status,
                            'ordernumber' => $order->ordernumber
                        ]
                    ]);
                }
            }

            // Payment failed or was canceled
            return Inertia::render('Checkout/BillplzPaymentCancel', [
                'order_id' => $order_id,
                'message' => 'Payment was canceled or failed.'
            ]);

        } catch (\Exception $e) {
            // Log the error
            Log::error('Billplz redirect error', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'order_id' => $order_id
            ]);

            // Return an error response
            return Inertia::render('Checkout/BillplzPaymentCancel', [
                'error' => 'Payment processing error'
            ]);
        }
    }
}