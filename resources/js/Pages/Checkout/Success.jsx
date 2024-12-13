
import React from 'react';
import { Link } from '@inertiajs/react';

export default function Success({ orderId, message, order }) {
    console.log('Props received:', { orderId, message, order });
    
    if (!order) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-2xl font-bold mb-4">Error Loading Order</h1>
                    <p className="mb-4">Unable to load order details.</p>
                    <Link 
                        href="/homepage" 
                        className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Return to Homepage
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
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
                    <h1 className="text-2xl font-bold mb-2 text-gray-800">{message || 'Payment Successful!'}</h1>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h2 className="font-semibold text-gray-800 mb-2">Order Details:</h2>
                    <div className="space-y-2 text-gray-600">
                        <p>Order Number: {order.ordernumber}</p>
                        <p>Amount: RM {Number(order.total_price).toFixed(2)}</p>
                        <p>Status: <span className="capitalize">{order.status}</span></p>
                    </div>
                </div>

                <div className="flex justify-center">
                    <Link 
                        href="/homepage" 
                        className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                    >
                        Return to Homepage
                    </Link>
                </div>
            </div>
        </div>
    );
}