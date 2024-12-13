import React from 'react';
import { Link } from '@inertiajs/react';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function Success({ message, stripe_session_id }) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
            <div className="max-w-2xl w-full mx-auto p-6">
                <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                    <div className="flex justify-center">
                        <div className="rounded-full bg-green-50 p-3">
                            <CheckCircle className="w-16 h-16 text-green-500" />
                        </div>
                    </div>
                    
                    <h1 className="text-2xl font-bold text-gray-900 mt-6 mb-2">Subscription Successful!</h1>
                    <p className="text-gray-600 mb-8">{message || "Thank you for subscribing! Your subscription is now active."}</p>
                    
                    <div className="text-left mb-8 bg-gray-50 p-4 rounded">
                        <p className="text-sm text-gray-600">Session ID: {stripe_session_id}</p>
                    </div>
                    
                    <div className="space-y-4">
                        <Link
                            href="/dashboard"
                            className="flex items-center justify-center w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                        >
                            Go to Dashboard
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                        
                        <Link
                            href="/"
                            className="flex items-center justify-center w-full text-gray-600 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
 }