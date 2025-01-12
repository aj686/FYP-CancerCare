import React from 'react';
import { Head, Link } from '@inertiajs/react';
import DynamicNavbar from '@/Components/My Components/AboutCancer/DynamicNavbar';
import Footer from '@/Components/My Components/Footer';

export default function EventDonationSuccess({ event, donation }) {
    const formatAmount = (amount) => {
        return parseFloat(amount).toLocaleString('en-MY', {
            style: 'currency',
            currency: 'MYR'
        });
    };

    return (
        <>
            <Head title="Donation Success - CancerCare Connect" />
            <DynamicNavbar />

            <div className="bg-gradient-to-b from-white to-purpleMuda py-16">
                <div className="max-w-2xl mx-auto px-4">
                    <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                        {/* Success Icon */}
                        <div className="mb-6">
                            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                <svg 
                                    className="w-8 h-8 text-green-500" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth="2" 
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-purpleTua mb-4">
                            Thank You for Your Donation!
                        </h2>

                        <p className="text-gray-600 mb-8">
                            Your donation to <span className="font-semibold">{event.title}</span> has been successfully processed.
                        </p>

                        <div className="bg-purpleMuda/20 rounded-lg p-6 mb-8">
                            <div className="text-4xl font-bold text-purpleTua mb-2">
                                {formatAmount(donation.amount)}
                            </div>
                            <p className="text-gray-600">Donation Amount</p>
                        </div>

                        <div className="space-y-2 mb-8 text-left">
                            {donation.message && (
                                <div className="border-t border-gray-200 py-3">
                                    <h3 className="font-semibold mb-1">Your Message:</h3>
                                    <p className="text-gray-600">{donation.message}</p>
                                </div>
                            )}
                            <div className="border-t border-gray-200 py-3">
                                <h3 className="font-semibold mb-1">Transaction Date:</h3>
                                <p className="text-gray-600">{donation.date}</p>
                            </div>
                        </div>

                        <p className="text-gray-600 mb-8">
                            A confirmation email has been sent to your email address with the donation details.
                        </p>

                        <Link
                            href="/homepage"
                            className="inline-block bg-purpleTua text-white px-8 py-3 rounded-full hover:bg-purpleMid transition-colors duration-300"
                        >
                            Return to Homepage
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}