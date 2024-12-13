import React from 'react';
import { Head, Link } from '@inertiajs/react';
import DynamicNavbar from '@/Components/My Components/AboutCancer/DynamicNavbar';
import Footer from '@/Components/My Components/Footer';

export default function Success({ donation }) {
    return (
        <>
            <Head title="Donation Successful - CancerCare Connect" />
            <DynamicNavbar />

            <div className="min-h-screen bg-gradient-to-b from-white to-purpleMuda py-16">
                <div className="max-w-2xl mx-auto px-4">
                    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                        <div className="mb-8">
                            <svg className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>

                        <h1 className="text-3xl font-bold text-purpleTua mb-4">
                            Thank You for Your Donation!
                        </h1>

                        <p className="text-gray-600 mb-6">
                            Your generous contribution of RM{donation.amount} will help make a difference in the lives of those battling cancer.
                        </p>

                        <div className="bg-gray-50 rounded-lg p-6 mb-6">
                            <h2 className="font-semibold text-lg mb-4">Donation Details</h2>
                            <div className="space-y-2 text-left">
                                <p><span className="font-medium">Amount:</span> RM{donation.amount}</p>
                                <p><span className="font-medium">Date:</span> {donation.date}</p>
                                <p><span className="font-medium">Name:</span> {donation.name}</p>
                                <p><span className="font-medium">Email:</span> {donation.email}</p>
                            </div>
                        </div>

                        <p className="text-gray-600 mb-8">
                            A confirmation email has been sent to {donation.email}
                        </p>

                        <Link
                            href="/homepage"
                            className="inline-block bg-purpleTua text-white px-8 py-3 rounded-full hover:bg-purpleMid transition-colors"
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