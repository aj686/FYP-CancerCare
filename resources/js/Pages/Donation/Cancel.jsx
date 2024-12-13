import React from 'react';
import { Head, Link } from '@inertiajs/react';
import DynamicNavbar from '@/Components/My Components/AboutCancer/DynamicNavbar';
import Footer from '@/Components/My Components/Footer';

export default function Cancel({ message }) {
    return (
        <>
            <Head title="Donation Cancelled - CancerCare Connect" />
            <DynamicNavbar />

            <div className="min-h-screen bg-gradient-to-b from-white to-purpleMuda py-16">
                <div className="max-w-2xl mx-auto px-4">
                    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                        <div className="mb-8">
                            <svg className="mx-auto h-16 w-16 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>

                        <h1 className="text-3xl font-bold text-purpleTua mb-4">
                            Donation Cancelled
                        </h1>

                        <p className="text-gray-600 mb-8">
                            {message || 'Your donation was cancelled. You can try again when you\'re ready.'}
                        </p>

                        <div className="space-x-4">
                            <Link
                                href="/donate"
                                className="inline-block bg-purpleTua text-white px-8 py-3 rounded-full hover:bg-purpleMid transition-colors"
                            >
                                Try Again
                            </Link>
                            <Link
                                href="/homepage"
                                className="inline-block border-2 border-purpleTua text-purpleTua px-8 py-3 rounded-full hover:bg-purpleMuda/20 transition-colors"
                            >
                                Return Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}