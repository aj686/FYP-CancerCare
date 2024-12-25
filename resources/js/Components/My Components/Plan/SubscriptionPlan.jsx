import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

export default function SubscriptionPlan({ plans = [], isGuest = true, activeMembership = null }) {
    // Debug logging
    useEffect(() => {
        console.log('SubscriptionPlan Props:', { plans, isGuest, activeMembership });
    }, [plans, isGuest, activeMembership]);

    // Safeguard against undefined plans
    if (!Array.isArray(plans)) {
        console.error('Plans is not an array:', plans);
        return (
            <div className="p-4 text-center">
                <p>Loading plans...</p>
            </div>
        );
    }

    const handleSubscription = async (slug) => {
        if (isGuest) {
            window.location.href = '/login';
            return;
        }

        try {
            const csrf = document.querySelector('meta[name="csrf-token"]');
            if (!csrf) {
                console.error('CSRF token not found');
                return;
            }

            const response = await fetch(`/membership/subscribe/${slug}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf.content
                }
            });

            const data = await response.json();
            
            if (data.error) {
                console.error('Subscription error:', data.error);
                return;
            }

            const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
            if (!stripe) {
                console.error('Stripe failed to load');
                return;
            }

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

    const BenefitItem = ({ text }) => (
        <li className="flex gap-x-3 text-gray-700">
            <svg className="h-6 w-5 flex-none text-purpleMid" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
            </svg>
            <span>{text}</span>
        </li>
    );

    const getSubscriptionStatus = (plan) => {
        // Add null check for plan
        if (!plan) {
            console.error('Invalid plan object');
            return {
                text: 'Error',
                disabled: true,
                onClick: null,
                className: 'bg-gray-400 cursor-not-allowed'
            };
        }

        if (isGuest) {
            return {
                text: 'Login to Subscribe',
                disabled: false,
                onClick: () => handleSubscription(plan.slug),
                className: 'bg-gradient-to-r from-purpleMid to-purpleTua hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
            };
        }

        if (activeMembership) {
            if (activeMembership.plan_id === plan.id) {
                return {
                    text: 'Current Plan',
                    disabled: true,
                    onClick: null,
                    className: 'bg-green-600 cursor-not-allowed'
                };
            } else {
                return {
                    text: 'Change Plan',
                    disabled: false,
                    onClick: () => handleSubscription(plan.slug),
                    className: 'bg-gradient-to-r from-purpleMid to-purpleTua hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
                };
            }
        }

        return {
            text: 'Subscribe Now',
            disabled: false,
            onClick: () => handleSubscription(plan.slug),
            className: 'bg-gradient-to-r from-purpleMid to-purpleTua hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
        };
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
                        <BenefitItem text="Basic access to cancer resources and articles" />
                        <BenefitItem text="View public community posts" />
                        <li className="flex gap-x-3 text-gray-500 line-through">
                            <svg className="h-6 w-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clipRule="evenodd" />
                            </svg>
                            <span>Cannot join premium events</span>
                        </li>
                        <li className="flex gap-x-3 text-gray-500 line-through">
                            <svg className="h-6 w-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clipRule="evenodd" />
                            </svg>
                            <span>Cannot upload personal stories</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Premium Plans */}
            {Array.isArray(plans) && plans.map((plan) => {
                const subscriptionStatus = getSubscriptionStatus(plan);
                
                return (
                    <div 
                        key={plan.slug || 'fallback-key'} 
                        className="group relative rounded-3xl bg-gradient-to-br from-purpleMuda via-purpleMid/10 to-white p-8 ring-1 ring-purpleMid/20 hover:shadow-xl transition-all duration-300"
                    >
                        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-purpleMid/50 to-transparent" />
                        <div className="flex flex-col h-full">
                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-purpleTua mb-2">{plan.name || 'Plan Name'}</h3>
                                <div className="mt-4 flex items-baseline text-purpleTua">
                                    <span className="text-5xl font-bold tracking-tight">
                                        RM {plan.price || 0}
                                    </span>
                                    <span className="text-lg text-purpleMid ml-2">/month</span>
                                </div>
                            </div>

                            <ul className="mt-6 space-y-4 flex-1">
                                <BenefitItem text="All Free Plan benefits" />
                                <BenefitItem text="Access to all premium events" />
                                <BenefitItem text="Share your personal cancer journey stories" />
                            </ul>

                            <button 
                                onClick={subscriptionStatus.onClick}
                                disabled={subscriptionStatus.disabled}
                                className={`mt-8 w-full px-8 py-4 rounded-2xl text-white font-semibold shadow-lg transition-all duration-300 ${subscriptionStatus.className}`}
                            >
                                {subscriptionStatus.text}
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}