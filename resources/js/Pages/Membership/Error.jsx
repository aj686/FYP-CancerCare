import React from 'react';
import { Link } from '@inertiajs/react';
import { AlertCircle } from 'lucide-react';

export default function Error({ message }) {
    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Subscription Failed</h1>
                <p className="text-gray-600 mb-8">{message}</p>
                
                <div className="space-y-4">
                    <Link
                        href="/plan"
                        className="block w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                    >
                        Try Again
                    </Link>
                    <Link
                        href="/dashboard"
                        className="block w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200"
                    >
                        Go to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}