import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

export default function Subscribe({ plan, sessionId, publicKey }) {
    useEffect(() => {
        // Redirect to Stripe checkout immediately when component mounts
        const redirectToStripe = async () => {
            try {
                const stripe = await loadStripe(publicKey);
                const { error } = await stripe.redirectToCheckout({
                    sessionId: sessionId
                });
                
                if (error) {
                    console.error('Stripe redirect error:', error);
                }
            } catch (err) {
                console.error('Stripe initialization error:', err);
            }
        };

        redirectToStripe();
    }, [sessionId, publicKey]);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <h1 className="text-2xl font-bold mb-4">Redirecting to payment...</h1>
                <p className="text-gray-600">Please wait while we redirect you to our secure payment page.</p>
            </div>
        </div>
    );
}