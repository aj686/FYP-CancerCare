<?php

namespace App\Http\Controllers;

use App\Models\Events;
use App\Models\EventDonation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use Stripe\Webhook;
use Illuminate\Support\Facades\{DB, Log, Mail};
use App\Mail\EventDonationConfirmation;

class EventDonationController extends Controller
{
    public function __construct()
    {
        Stripe::setApiKey(config('services.stripe.secret'));
    }

    public function show(Events $event)
    {
        return Inertia::render('Donation/EventDonation', [
            'event' => [
                'id' => $event->id,
                'title' => $event->title,
                'total_donations' => (float)$event->total_donations,
                'funding_goal' => (float)$event->funding_goal,
                'funding_categories' => $event->funding_categories ?? []
            ],
            'auth' => [
                'user' => Auth::user()
            ]
        ]);
    }

    public function preview(Request $request, Events $event)
    {
        // Ensure is_anonymous is properly cast to boolean
        $isAnonymous = $request->has('is_anonymous') ? 
            filter_var($request->is_anonymous, FILTER_VALIDATE_BOOLEAN) : 
            !Auth::check();

        $validated = $request->validate([
            'amount' => 'required|numeric|min:1',
            'message' => 'nullable|string|max:500'
        ]);

        // Add the validated is_anonymous value
        $validated['is_anonymous'] = $isAnonymous;

        return Inertia::render('Donation/EventDonationPreview', [
            'event' => [
                'id' => $event->id,
                'title' => $event->title
            ],
            'donationData' => $validated,
            'auth' => [
                'user' => Auth::user()
            ]
        ]);
    }

    public function initiate(Request $request, Events $event)
    {
        try {
            $validated = $request->validate([
                'amount' => 'required|numeric|min:1',
                'message' => 'nullable|string|max:500',
                'is_anonymous' => 'required|boolean'
            ]);

            DB::beginTransaction();

            $donation = EventDonation::create([
                'event_id' => $event->id,
                'user_id' => Auth::id(),
                'amount' => $validated['amount'],
                'message' => $validated['message'] ?? null,
                'is_anonymous' => $validated['is_anonymous'],
                'status' => 'pending'
            ]);

            $session = Session::create([
                'payment_method_types' => ['card'],
                'line_items' => [[
                    'price_data' => [
                        'currency' => 'myr',
                        'product_data' => [
                            'name' => "Donation for {$event->title}",
                            'description' => $validated['message'] ?? 'Event Donation',
                        ],
                        'unit_amount' => (int)($validated['amount'] * 100),
                    ],
                    'quantity' => 1,
                ]],
                'mode' => 'payment',
                'metadata' => [
                    'donation_type' => 'event',
                    'event_id' => $event->id,
                    'donation_id' => $donation->id,
                    'user_id' => Auth::id() ?? 'guest'
                ],
                'success_url' => route('events.donate.success', ['event' => $event->id]) . '?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => route('events.donate.cancel', ['event' => $event->id]),
                'customer_email' => Auth::user()->email ?? null
            ]);

            $donation->update(['stripe_payment_id' => $session->id]);

            DB::commit();

            // Check if it's an AJAX request
            if ($request->ajax() || $request->wantsJson()) {
                return response()->json(['url' => $session->url]);
            }

            // For non-AJAX requests, redirect directly
            return redirect($session->url);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Event Donation Error', [
                'error' => $e->getMessage(),
                'event_id' => $event->id,
                'user' => Auth::id() ?? 'guest'
            ]);

            if ($request->ajax() || $request->wantsJson()) {
                return response()->json([
                    'error' => 'An error occurred while processing your donation.'
                ], 500);
            }

            return back()->with('error', 'An error occurred while processing your donation.');
        }
    }

    public function success(Request $request, Events $event)
    {
        if (!$request->get('session_id')) {
            return redirect()->route('events.show.event', $event);
        }

        try {
            $session = Session::retrieve($request->session_id);
            $donation = EventDonation::where('stripe_payment_id', $session->id)->firstOrFail();

            $donation->update([
                'status' => 'completed',
                'payment_date' => now()
            ]);

            return Inertia::render('Donation/EventDonationSuccess', [
                'event' => [
                    'id' => $event->id,
                    'title' => $event->title
                ],
                'donation' => [
                    'amount' => $donation->amount,
                    'message' => $donation->message,
                    'date' => $donation->created_at->format('Y-m-d H:i:s')
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('Event donation success page error', ['error' => $e->getMessage()]);
            return redirect()->route('events.show.event', $event)
                ->with('error', 'Unable to process donation confirmation');
        }
    }

    public function cancel(Events $event)
    {
        return redirect()->route('events.show.event', $event)
            ->with('error', 'Donation was cancelled. Please try again when you\'re ready.');
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

            Log::info('Webhook received', ['type' => $event->type]);

            if ($event->type === 'checkout.session.completed') {
                $session = $event->data->object;
                
                Log::info('Session data', ['session' => $session]);

                $donation = EventDonation::where('stripe_payment_id', $session->id)
                    ->where('status', 'pending')
                    ->first();

                if ($donation) {
                    try {
                        DB::transaction(function () use ($donation) {
                            // Update donation status
                            $donation->update([
                                'status' => 'completed',
                                'payment_date' => now()
                            ]);

                            // Send confirmation email
                            Mail::to($donation->email)->send(new EventDonationConfirmation($donation));
                            
                            Log::info('Event donation confirmation email sent', [
                                'donation_id' => $donation->id
                            ]);
                        });
                    } catch (\Exception $e) {
                        Log::error('Error processing webhook', [
                            'error' => $e->getMessage(),
                            'donation_id' => $donation->id
                        ]);
                    }
                }
            }

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            Log::error('Webhook error', [
                'error' => $e->getMessage()
            ]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}