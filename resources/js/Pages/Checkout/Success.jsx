import React from 'react';
import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import DynamicNavbar from '@/Components/My Components/AboutCancer/DynamicNavbar';
import Footer from '@/Components/My Components/Footer';

export default function Success({ error, message, order, orderId }) {
    // Handle error case from the controller
    if (error) {
        return (
            <>
                <Head title="Error - CancerCare Connect" />
                <DynamicNavbar />
                
                <div className="min-h-screen bg-gradient-to-b from-white to-purpleMuda">
                    <div className="container mx-auto px-4 py-24">
                        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
                            <div className="text-center mb-6">
                                <svg 
                                    className="mx-auto h-12 w-12 text-red-500" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth="2" 
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                </svg>
                                <h1 className="text-2xl font-bold mb-4 text-purpleTua">{error}</h1>
                            </div>
                            <div className="flex justify-center">
                                <Link 
                                    href="/homepage" 
                                    className="inline-block bg-purpleTua text-white px-6 py-2 rounded-full hover:bg-purpleMid transition-colors duration-200"
                                >
                                    Return to Homepage
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </>
        );
    }

    // Handle success case with order details
    return (
        <>
            <Head title="Success - CancerCare Connect" />
            <DynamicNavbar />
            
            <div className="min-h-screen bg-gradient-to-b from-white to-purpleMuda">
                <div className="container mx-auto px-4 py-24">
                    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
                        <div className="text-center mb-6">
                            <svg 
                                className="mx-auto h-12 w-12 text-green-500" 
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
                            <h1 className="text-2xl font-bold mb-4 text-purpleTua">
                                {message}
                            </h1>
                        </div>

                        {order && (
                            <div className="bg-gray-50 rounded-lg p-6 mb-6">
                                <h2 className="font-semibold text-purpleTua mb-4">Order Details:</h2>
                                <div className="space-y-3 text-gray-600">
                                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                                        <span className="font-medium">Order Number:</span>
                                        <span>{order.ordernumber}</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                                        <span className="font-medium">Amount:</span>
                                        <span>RM {Number(order.total_price).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">Status:</span>
                                        <span className="capitalize px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-center space-x-4">
                            <Link 
                                href="/homepage" 
                                className="inline-block bg-purpleTua text-white px-6 py-2 rounded-full hover:bg-purpleMid transition-colors duration-200"
                            >
                                Return to Homepage
                            </Link>
                            <Link 
                                href="/dashboard" 
                                className="inline-block bg-white text-purpleTua px-6 py-2 rounded-full border-2 border-purpleTua hover:bg-purpleMuda transition-colors duration-200"
                            >
                                View Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}