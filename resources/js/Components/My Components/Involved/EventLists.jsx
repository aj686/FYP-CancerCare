import React from 'react';
import 'flowbite';

export default function EventLists() {
    return (
        <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-5xl mb-4">
            <div className="md:flex">
                <div className="md:flex-shrink-0">
                    <img 
                        className="h-48 w-full object-cover md:w-72" 
                        src="https://via.placeholder.com/300x200" 
                        alt="Breast Cancer Awareness Event"
                        style={{ objectFit: 'cover', height: '100%' }}
                    />
                </div>
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                        Breast Cancer Awareness 2024
                    </div>
                    <p className="block mt-1 text-lg leading-tight font-medium text-black">
                        Join us for Breast Cancer Awareness 2024 at KL Wellness City Gallery. Together, we can raise awareness and support the fight against breast cancer.
                    </p>
                    <p className="mt-2 text-gray-500">
                        KL Wellness City Gallery, No 1, Jalan Bukit Jalil Indah 2, Bukit Jalil, 57000 Kuala Lumpur, Malaysia
                    </p>
                    <div className="mt-4 text-gray-500">
                        <p><strong>Date:</strong> October 25, 2024</p>
                        <p><strong>Time:</strong> 10:00 AM - 4:00 PM</p>
                        <p><strong>Price:</strong> RM 50</p>
                    </div>
                    <div className="mt-6">
                        <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 focus:outline-none">
                            Join Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
