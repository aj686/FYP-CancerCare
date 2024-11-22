import React from 'react';
import { ShieldCheck, Users, Stethoscope } from 'lucide-react';

export default function Role() {
    return (
        <div className="p-6 bg-white border-b border-gray-200">
            <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-start">
                <button
                type="button"
                className="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                <ShieldCheck className="w-4 h-4 mr-2" />
                Admin
                </button>
                
                <button
                type="button"
                className="inline-flex items-center text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 mr-2"
                >
                <Users className="w-4 h-4 mr-2" />
                Patient or Caregivers
                </button>
                
                <button
                type="button"
                className="inline-flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                <Stethoscope className="w-4 h-4 mr-2" />
                Doctor
                </button>
            </div>
        </div>
    );
};