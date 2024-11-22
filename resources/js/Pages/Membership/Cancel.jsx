import React from 'react';
import { Link } from '@inertiajs/react';
import { XCircle } from 'lucide-react';

export default function Cancel({ message }) {
    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <XCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Subscription Cancelled</h1>
                <p className="text-gray-600 mb-8">{message}</p>
                
                <Link
                    href="/plan"
                    className="block w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                >
                    View Plans Again
                </Link>
            </div>
        </div>
    );
}