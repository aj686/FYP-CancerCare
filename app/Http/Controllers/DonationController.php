<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Stripe\{Stripe, Webhook, Checkout\Session};
use Illuminate\Support\Facades\{Auth, DB, Log, Mail};
use App\Mail\DonationConfirmation;

class DonationController extends Controller
{
    public function __construct()
    {
        Stripe::setApiKey(config('services.stripe.secret'));
    }

    public function show()
    {
        return Inertia::render('Donation/DonationPage');
    }

    public function initiateDonation(Request $request)
    {
        $validated = $request->validate([
            'amount' => 'required|numeric|min:1',
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'identityNumber' => 'required|string|max:50',
            'race' => 'nullable|string|max:50',
            'streetAddress' => 'nullable|string|max:255',
            'addressLine2' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'postalCode' => 'nullable|string|max:20',
            'country' => 'required|string|max:100',
            'termsAccepted' => 'required|accepted',
            'newsletterOptIn' => 'boolean'
        ]);

        try {
            DB::beginTransaction();

            // Create donation record first
            $donation = Donation::create([
                'user_id' => Auth::id(),
                'amount' => $validated['amount'],
                'payment_status' => 'pending',
                'first_name' => $validated['firstName'],
                'last_name' => $validated['lastName'],
                'email' => $validated['email'],
                'phone' => $validated['phone'],
                'identity_number' => $validated['identityNumber'],
                'race' => $validated['race'],
                'street_address' => $validated['streetAddress'],
                'address_line2' => $validated['addressLine2'],
                'city' => $validated['city'],
                'state' => $validated['state'],
                'postal_code' => $validated['postalCode'],
                'country' => $validated['country'],
                'newsletter_opt_in' => $validated['newsletterOptIn'] ?? false,
            ]);

            // Create Stripe checkout session
            $session = Session::create([
                'payment_method_types' => ['card'],
                'customer_email' => $validated['email'],
                'line_items' => [[
                    'price_data' => [
                        'currency' => 'myr',
                        'product_data' => [
                            'name' => 'Donation to CancerCare Connect',
                        ],
                        'unit_amount' => $validated['amount'] * 100,
                    ],
                    'quantity' => 1,
                ]],
                'mode' => 'payment',
                'metadata' => [
                    'user_id' => Auth::id() ?? 'guest',
                    'donation_id' => $donation->id
                ],
                'success_url' => route('donation.success') . '?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => route('donation.cancel')
            ]);

            // Update donation with session ID
            $donation->update(['stripe_session_id' => $session->id]);

            DB::commit();
            // return response()->json(['sessionId' => $session->id]);
            // return response()->json([
            //     'url' => $session->url // Stripe Session object includes a URL property
            // ]);

            // Redirect to Stripe Checkout using Inertia::location()
            if ($session && isset($session->url)) {
                return Inertia::location($session->url);
            }

            return Inertia::render('Donation/DonationPage', [
                'error' => 'Unable to create payment session'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Donation Error', [
                'error' => $e->getMessage(),
                'user' => Auth::id() ?? 'guest'
            ]);

             return Inertia::render('Donation/DonationPage', [
            'error' => 'An error occurred while processing your donation. Please try again.'
        ]);
        }
    }

    public function success(Request $request)
    {
        if (!$request->get('session_id')) {
            return redirect('/');
        }

        try {
            $session = Session::retrieve($request->session_id);
            $donation = Donation::where('stripe_session_id', $session->id)->firstOrFail();

            return Inertia::render('Donation/Success', [
                'donation' => [
                    'amount' => $donation->amount,
                    'name' => $donation->first_name . ' ' . $donation->last_name,
                    'email' => $donation->email,
                    'date' => $donation->created_at->format('Y-m-d H:i:s')
                ]
            ]);
        } catch(\Exception $e) {
            Log::error('Success page error', ['error' => $e->getMessage()]);
            return redirect('/')->with('error', 'Unable to process donation confirmation');
        }
    }

    public function cancel()
    {
        return Inertia::render('Donation/Cancel', [
            'message' => 'Your donation was cancelled. Please try again when you\'re ready.'
        ]);
    }

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

            Log::info('Webhook received', ['type' => $event->type]); // Add logging

            // Handle the checkout.session.completed event
            if ($event->type === 'checkout.session.completed') {
                $session = $event->data->object;
                
                // Log the session data
                Log::info('Session data', ['session' => $session]);

                $donation = Donation::where('stripe_session_id', $session->id)
                    ->where('payment_status', 'pending')
                    ->first();

                if ($donation) {
                    $donation->update([
                        'payment_status' => 'completed',
                        'payment_date' => now()
                    ]);

                    // Send confirmation email
                    Mail::to($donation->email)
                        ->queue(new DonationConfirmation($donation));

                    Log::info('Donation updated successfully', ['donation_id' => $donation->id]);
                } else {
                    Log::warning('Donation not found for session', ['session_id' => $session->id]);
                }
            }

            return response()->json(['status' => 'success']);
        } catch (\UnexpectedValueException $e) {
            Log::error('Webhook signature verification failed', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Invalid payload'], 400);
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            Log::error('Webhook signature verification failed', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Invalid signature'], 400);
        } catch (\Exception $e) {
            Log::error('Webhook Processing Error', ['error' => $e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}