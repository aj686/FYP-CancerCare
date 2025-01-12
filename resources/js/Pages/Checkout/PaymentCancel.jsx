import React from 'react';
import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import DynamicNavbar from '@/Components/My Components/AboutCancer/DynamicNavbar';
import Footer from '@/Components/My Components/Footer';
import { XCircle } from 'lucide-react';

const PaymentCancel = ({ order_id, message, order }) => {
    return (
        <>
            <Head title="Payment Cancelled - CancerCare Connect" />
            <DynamicNavbar />
            
            <div className="min-h-screen bg-gradient-to-b from-white to-purpleMuda">
                <div className="container mx-auto px-4 py-24">
                    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
                        <div className="text-center mb-6">
                            <XCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
                            <h1 className="text-2xl font-bold mb-2 text-purpleTua">
                                Payment Cancelled
                            </h1>
                            <p className="text-gray-600 mb-4">{message}</p>
                        </div>

                        {order && (
                            <div className="bg-gray-50 rounded-lg p-6 mb-6">
                                <h2 className="font-semibold text-purpleTua mb-4">Order Information:</h2>
                                <div className="space-y-3 text-gray-600">
                                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                                        <span className="font-medium">Order ID:</span>
                                        <span>{order_id}</span>
                                    </div>
                                    {order.total_price && (
                                        <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                                            <span className="font-medium">Amount:</span>
                                            <span>RM {Number(order.total_price).toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">Status:</span>
                                        <span className="capitalize px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                                            Cancelled
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-yellow-700">
                                        The payment for this order was cancelled. You can try again or contact our support team for assistance.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                            <Link 
                                href="/orders" 
                                className="inline-block bg-purpleTua text-white px-6 py-2 rounded-full hover:bg-purpleMid transition-colors duration-200 text-center"
                            >
                                View Orders
                            </Link>
                            <Link 
                                href="/support" 
                                className="inline-block bg-white text-purpleTua px-6 py-2 rounded-full border-2 border-purpleTua hover:bg-purpleMuda transition-colors duration-200 text-center"
                            >
                                Contact Support
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default PaymentCancel;