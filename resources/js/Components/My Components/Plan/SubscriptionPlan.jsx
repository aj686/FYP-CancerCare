import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

export default function SubscriptionPlan({ plans }) {
    const handleSubscription = async (slug) => {
        try {
            const response = await fetch(`/membership/subscribe/${slug}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                }
            });

            const data = await response.json();
            
            if (data.error) {
                console.error('Subscription error:', data.error);
                return;
            }

            const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
            const { error } = await stripe.redirectToCheckout({
                sessionId: data.sessionId
            });

            if (error) {
                console.error('Stripe redirect error:', error);
            }
        } catch (err) {
            console.error('Subscription error:', err);
        }
    };

    return (
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto p-8">
            {/* Free Plan */}
            <div className="group relative rounded-3xl p-8 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-purpleMuda/20 border border-purpleMuda/30">
                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-purpleMuda/30 to-transparent" />
                <div className="flex flex-col h-full">
                    <div className="mb-6">
                        <h3 className="text-2xl font-bold text-purpleTua mb-2">Free Plan</h3>
                        <div className="mt-4 flex items-baseline text-purpleTua">
                            <span className="text-5xl font-bold tracking-tight">RM 0</span>
                            <span className="text-lg text-purpleMid ml-2">/month</span>
                        </div>
                    </div>
                    <ul className="mt-6 space-y-4 flex-1">
                        <li className="flex gap-x-3 text-gray-700">
                            <svg className="h-6 w-5 flex-none text-purpleMid" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                            </svg>
                            <span>Basic access</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Premium Plans */}
            {plans.map((plan) => (
                <div 
                    key={plan.slug} 
                    className="group relative rounded-3xl bg-gradient-to-br from-purpleMuda via-purpleMid/10 to-white p-8 ring-1 ring-purpleMid/20 hover:shadow-xl transition-all duration-300"
                >
                    <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-purpleMid/50 to-transparent" />
                    <div className="flex flex-col h-full">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-purpleTua mb-2">{plan.name}</h3>
                            <div className="mt-4 flex items-baseline text-purpleTua">
                                <span className="text-5xl font-bold tracking-tight">
                                    RM {plan.price}
                                </span>
                                <span className="text-lg text-purpleMid ml-2">/month</span>
                            </div>
                        </div>

                        <button 
                            onClick={() => handleSubscription(plan.slug)}
                            className="mt-8 w-full bg-gradient-to-r from-purpleMid to-purpleTua px-8 py-4 rounded-2xl text-white font-semibold 
                                     shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Subscribe Now
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}