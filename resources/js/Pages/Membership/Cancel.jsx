import React from 'react';
import { Link } from '@inertiajs/react';
import { XCircle, ArrowLeft } from 'lucide-react';

export default function Cancel({ message }) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
            <div className="max-w-2xl w-full mx-auto p-6">
                <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                    <div className="flex justify-center">
                        <div className="rounded-full bg-red-50 p-3">
                            <XCircle className="w-16 h-16 text-red-500" />
                        </div>
                    </div>
                    
                    <h1 className="text-2xl font-bold text-gray-900 mt-6 mb-2">Subscription Cancelled</h1>
                    <p className="text-gray-600 mb-8">{message || "Your subscription process was cancelled. No charges were made."}</p>
                    
                    <div className="space-y-4">
                        <Link
                            href="/plan"
                            className="flex items-center justify-center w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                        >
                            View Plans Again
                        </Link>
                        
                        <Link
                            href="/"
                            className="flex items-center justify-center w-full text-gray-600 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}