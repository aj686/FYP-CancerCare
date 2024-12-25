<?php

namespace App\Http\Controllers;

use App\Models\{Membership, Plan, User};
use Illuminate\Support\Facades\{Auth, DB, Log};
use Stripe\{Stripe, Webhook, Checkout\Session};
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Http\Request;

class MembershipController extends Controller
{
    public function __construct()
    {
        Stripe::setApiKey(config('services.stripe.secret'));
    }

    public function subscribe($slug)
    {
        try {
            $user = Auth::user();
            $plan = Plan::where('slug', $slug)->firstOrFail();

            // Use direct query
            $hasSubscription = Membership::where('user_id', $user->id)
            ->where('status', 'active')
            ->where('end_date', '>', now())
            ->exists();
            
            if ($hasSubscription) {
                throw new \Exception('Active subscription exists');
            }

            DB::beginTransaction();

            $session = Session::create([
                'payment_method_types' => ['card'],
                'customer_email' => $user->email,
                'line_items' => [[
                    'price' => $plan->stripe_plan,
                    'quantity' => 1,
                ]],
                'mode' => 'subscription',
                'metadata' => [
                    'plan_id' => $plan->id,
                    'user_id' => $user->id
                ],
                'success_url' => route('membership.success') . '?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => route('membership.cancel')
            ]);

            Membership::create([
                'user_id' => $user->id,
                'plan_id' => $plan->id,
                'start_date' => now(),
                'end_date' => now()->addYear(),
                'status' => 'pending',
                'amount' => $plan->price,
                'stripe_session_id' => $session->id
            ]);

            DB::commit();
            return response()->json(['sessionId' => $session->id]);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Subscription Error', [
                'error' => $e->getMessage(),
                'user' => Auth::id(),
                'plan' => $slug
            ]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function success(Request $request)
    {
        if (!$request->get('session_id')) {
            return redirect('/');
        }

        try {
            $session = Session::retrieve($request->session_id);
            $membership = Membership::where('stripe_session_id', $session->id)->firstOrFail();

            return Inertia::render('Membership/Success', [
                'message' => 'Subscription successful!',
                'stripe_session_id' => $session->id
            ]);
        } catch(\Exception $e) {
            Log::error('Success page error', ['error' => $e->getMessage()]);
            return redirect('/');
        }
    }

    public function cancel()
    {
        return Inertia::render('Membership/Cancel');
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
        } catch (\Exception $e) {
            Log::error('Webhook Error', ['error' => $e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 400);
        }

        try {
            switch ($event->type) {
                case 'checkout.session.completed':
                    $session = $event->data->object;
                    $invoice = \Stripe\Invoice::retrieve($session->invoice);
                    $membership = Membership::where('stripe_session_id', $session->id)->firstOrFail();
                    $membership->update([
                        'status' => 'active',
                        'start_date' => now(),
                        'end_date' => now()->addYear(), // Changed from addMonth() to addYear()
                        'stripe_invoice_id' => $session->invoice,
                        'stripe_invoice_url' => $invoice->hosted_invoice_url
                    ]);
                break;

                case 'invoice.payment_succeeded':
                    $invoice = $event->data->object;
                    $membership = Membership::where('stripe_invoice_id', $invoice->id)->first();
                    if ($membership) {
                        $membership->update([
                            'end_date' => Carbon::parse($membership->end_date)->addYear(), // Changed from addMonth() to addYear()
                            'amount' => $invoice->amount_paid / 100
                        ]);
                    }
                    break;

                case 'invoice.payment_failed':
                    $invoice = $event->data->object;
                    $membership = Membership::where([
                        'user_id' => $invoice->customer->metadata->user_id,
                        'status' => 'active'
                    ])->first();

                    if ($membership) {
                        $membership->update(['status' => 'payment_failed']);
                    }
                    break;

                    case 'invoice.created':
                        $invoice = $event->data->object;
                        $membership = Membership::where('stripe_invoice_id', $invoice->id)->first();
                        Log::info('Invoice Data', ['invoice' => $invoice]);
                        
                        if ($membership) {
                            $membership->update([
                                'stripe_invoice_url' => $invoice->hosted_invoice_url
                            ]);
                        }
                        break;
            }

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            Log::error('Webhook Processing Error', ['error' => $e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}