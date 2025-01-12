import { Head } from '@inertiajs/react';
import React from 'react';
import DynamicNavbar from '@/Components/My Components/AboutCancer/DynamicNavbar';
import Footer from '@/Components/My Components/Footer';
import { Link } from '@inertiajs/react';
import { XCircle } from 'lucide-react';

export default function BillplzPaymentCancel({ order_id, message, error }) {
    return (
        <>
            <Head title="Payment Cancelled - CancerCare Connect" />
            <DynamicNavbar />

            <section className="bg-gradient-to-b from-white to-purpleMuda py-12 min-h-screen">
                <div className="max-w-3xl mx-auto px-4">
                    <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                        <div className="mb-6">
                            <XCircle className="w-20 h-20 text-red-500 mx-auto" />
                        </div>

                        <h1 className="text-2xl font-bold text-purpleTua mb-4">
                            Payment Cancelled
                        </h1>

                        {error ? (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                                <p className="text-red-600">{error}</p>
                            </div>
                        ) : (
                            <p className="text-gray-600 mb-6">
                                {message || "Your payment was not completed. You can try again or contact our support team for assistance."}
                            </p>
                        )}

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                            <h2 className="text-sm font-medium text-yellow-800 mb-2">Need Help?</h2>
                            <p className="text-sm text-yellow-700">
                                If you experienced any issues with your payment, please contact our support team for assistance.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <Link
                                href={`/checkout`}
                                className="block w-full rounded-full bg-purpleMid px-6 py-3 text-white font-medium hover:bg-purpleTua transition-colors"
                            >
                                Try Again
                            </Link>
                            
                            <Link
                                href="/product"
                                className="block w-full rounded-full bg-gray-100 px-6 py-3 text-purpleTua font-medium hover:bg-gray-200 transition-colors"
                            >
                                Return to Shop
                            </Link>
                            
                            {/* <Link
                                href="/contact"
                                className="block w-full rounded-full border border-purpleMid px-6 py-3 text-purpleMid font-medium hover:bg-purpleMuda/10 transition-colors"
                            >
                                Contact Support
                            </Link> */}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}