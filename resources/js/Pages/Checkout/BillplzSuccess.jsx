import { Head } from '@inertiajs/react';
import React from 'react';
import DynamicNavbar from '@/Components/My Components/AboutCancer/DynamicNavbar';
import Footer from '@/Components/My Components/Footer';
import { Link } from '@inertiajs/react';
import { CheckCircle } from 'lucide-react';

export default function BillplzSuccess({ orderId, message, order }) {
    return (
        <>
            <Head title="Payment Success - CancerCare Connect" />
            <DynamicNavbar />

            <section className="bg-gradient-to-b from-white to-purpleMuda py-12 min-h-screen">
                <div className="max-w-3xl mx-auto px-4">
                    <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                        <div className="mb-6">
                            <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
                        </div>

                        <h1 className="text-2xl font-bold text-purpleTua mb-4">
                            Payment Successful!
                        </h1>

                        <p className="text-gray-600 mb-6">
                            Thank you for your purchase. Your payment has been successfully processed.
                        </p>

                        <div className="bg-gray-50 rounded-lg p-6 mb-6">
                            <h2 className="text-lg font-semibold text-purpleTua mb-4">
                                Order Details
                            </h2>
                            
                            <div className="space-y-2 text-left">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Order Number:</span>
                                    <span className="font-medium text-purpleTua">{order.ordernumber}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Total Amount:</span>
                                    <span className="font-medium text-purpleTua">
                                        RM{order.total_price.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Status:</span>
                                    <span className="font-medium text-green-600 capitalize">
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Link
                                href="/user/orders"
                                className="block w-full rounded-full bg-purpleMid px-6 py-3 text-white font-medium hover:bg-purpleTua transition-colors"
                            >
                                View Order Details
                            </Link>
                            
                            <Link
                                href="/product"
                                className="block w-full rounded-full bg-gray-100 px-6 py-3 text-purpleTua font-medium hover:bg-gray-200 transition-colors"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}