<?php

namespace App\Http\Controllers;

use App\Models\Membership;
use App\Models\Plan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class MembershipController extends Controller
{
    public function __construct()
    {
        // Updated to use the correct config key
        Stripe::setApiKey(config('services.stripe.secret'));
    }

    public function subscribe($slug)
    {
        try {
            $user = Auth::user();
            $plan = Plan::where('slug', $slug)->firstOrFail();

            $checkoutSession = Session::create([
                'payment_method_types' => ['card'],
                'customer_email' => $user->email,
                'line_items' => [[
                    'price' => $plan->stripe_plan, // This should be your price_xxx ID
                    'quantity' => 1,
                ]],
                'mode' => 'subscription',
                'metadata' => [
                    'plan_id' => $plan->id
                ],
                'success_url' => route('membership.success', ['session_id' => '{CHECKOUT_SESSION_ID}']),
                'cancel_url' => route('membership.cancel')
            ]);

            Log::info('Checkout session created', [
                'session' => $checkoutSession,
                'session_id' => $checkoutSession->id ?? 'null'
            ]);
    
            if (!$checkoutSession || !$checkoutSession->id) {
                Log::error('Invalid checkout session');
                return response()->json(['error' => 'Failed to create checkout session'], 500);
            }

            return response()->json([
                'sessionId' => $checkoutSession->id
            ]);

        } catch (\Exception $e) {
            Log::error('Stripe Error: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function success(Request $request)
    {
        try {
            $user = Auth::user();
            // Updated to use the correct config key
            $stripe = new \Stripe\StripeClient(config('services.stripe.secret'));
            $session = $stripe->checkout->sessions->retrieve($request->session_id);

            $membership = new Membership([
                'user_id' => $user->id,
                'start_date' => now(),
                'end_date' => now()->addMonth(),
                'status' => 'active',
                'amount' => 25.00,
                'stripe_subscription_id' => $session->subscription
            ]);

            $membership->save();

            return Inertia::render('Membership/Success', [
                'message' => 'Subscription successful!'
            ]);

        } catch (\Exception $e) {
            Log::error('Success Error: ' . $e->getMessage());
            return Inertia::render('Membership/Error', [
                'message' => 'Error processing subscription.'
            ]);
        }
    }

    public function cancel()
    {
        return Inertia::render('Membership/Cancel', [
            'message' => 'Subscription was cancelled.'
        ]);
    }
}