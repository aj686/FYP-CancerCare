import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import DynamicNavbar from '@/Components/My Components/AboutCancer/DynamicNavbar';
import Footer from '@/Components/My Components/Footer';

export default function EventDonationPreview({ event, donationData }) {
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState('');

    const formatAmount = (amount) => {
        const number = parseFloat(amount);
        if (isNaN(number)) return '0.00';
        return number.toFixed(2);
    };

    const handleConfirm = async () => {
        if (processing) return;
        setProcessing(true);
    
        try {
            const response = await fetch(`/events/${event.id}/donate/initiate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(donationData)
            });
    
            const data = await response.json();
            
            if (data.url) {
                window.location.href = data.url;
            } else {
                setError('Failed to initialize payment');
                setProcessing(false);
            }
        } catch (error) {
            console.error('Payment error:', error);
            setError('Failed to process payment');
            setProcessing(false);
        }
    };

    return (
        <>
            <Head title="Confirm Donation - CancerCare Connect" />
            <DynamicNavbar />
            
            <div className="bg-gradient-to-b from-white to-purpleMuda py-16">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-purpleTua">
                                Confirm Your Donation
                            </h2>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="bg-purpleMuda/20 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold text-purpleTua mb-4">
                                    Event Details
                                </h3>
                                <p className="text-lg text-gray-600 mb-2">{event.title}</p>
                                <p className="text-3xl font-bold text-purpleTua">
                                    RM {formatAmount(donationData.amount)}
                                </p>
                            </div>

                            {donationData.message && (
                                <div className="border-t pt-4">
                                    <h3 className="font-semibold mb-2">Your Message</h3>
                                    <p className="text-gray-600">{donationData.message}</p>
                                </div>
                            )}

                            <div className="border-t pt-4">
                                <h3 className="font-semibold mb-2">Donation Type</h3>
                                <p className="text-gray-600">
                                    {donationData.is_anonymous ? 'Anonymous Donation' : 'Public Donation'}
                                </p>
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                                    {error}
                                </div>
                            )}

                            <div className="flex justify-between items-center pt-6">
                                <button
                                    onClick={() => window.history.back()}
                                    disabled={processing}
                                    className="px-6 py-3 rounded-full border-2 border-purpleTua text-purpleTua hover:bg-purpleMuda/20 transition-colors disabled:opacity-50"
                                >
                                    Back to Edit
                                </button>
                                <button
                                    onClick={handleConfirm}
                                    disabled={processing}
                                    className="px-8 py-3 rounded-full bg-purpleTua text-white hover:bg-purpleMid transition-colors disabled:opacity-50"
                                >
                                    {processing ? 'Processing...' : 'Proceed to Payment'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}