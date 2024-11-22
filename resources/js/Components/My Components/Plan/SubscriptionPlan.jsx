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

            // Using the correct environment variable
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
            <div className="group relative rounded-3xl p-8 hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur border border-gray-200">
                <div className="flex flex-col h-full">
                    <div className="mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Free Plan</h3>
                        <div className="mt-4 flex items-baseline">
                            <span className="text-5xl font-bold tracking-tight text-gray-900">RM 0</span>
                            <span className="text-lg text-gray-500">/month</span>
                        </div>
                    </div>
                    <ul className="mt-6 space-y-4 flex-1">
                        <li className="flex gap-x-3">
                            <span className="text-gray-700">Basic access</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Premium Plans */}
            {plans.map((plan) => (
                <div key={plan.slug} className="group relative rounded-3xl bg-gradient-to-b from-blue-50 to-white p-8 ring-1 ring-blue-500/20 hover:shadow-lg transition-all duration-300">
                    <div className="flex flex-col h-full">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                            <div className="mt-4 flex items-baseline">
                                <span className="text-5xl font-bold tracking-tight text-gray-900">
                                    RM {plan.price}
                                </span>
                                <span className="text-lg text-gray-500">/month</span>
                            </div>
                        </div>

                        <button 
                            onClick={() => handleSubscription(plan.slug)}
                            className="mt-8 w-full bg-blue-500 px-8 py-4 rounded-2xl text-white font-semibold shadow-lg hover:bg-blue-600 transition-colors duration-200"
                        >
                            Subscribe Now
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}