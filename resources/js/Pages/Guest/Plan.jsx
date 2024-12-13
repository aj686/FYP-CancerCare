import { Head } from '@inertiajs/react';
import React from 'react';
import DynamicNavbar from '@/Components/My Components/AboutCancer/DynamicNavbar';
import SubscriptionPlan from '@/Components/My Components/Plan/SubscriptionPlan';
import Footer from '@/Components/My Components/Footer';

export default function Plan({ plans }) {
    return (
        <>
            <Head title="Plan" />
            <DynamicNavbar />

            {/* Hero Section with Purple Gradient */}
            <section className="relative bg-center bg-no-repeat bg-cover bg-[url('https://img.freepik.com/free-photo/curvy-pink-streamer-closeup_23-2148050293.jpg?t=st=1726639737~exp=1726643337~hmac=52c3d94107ae4236b83203f757da5bd81a33dcb6d74227b9a2011e98c9a87687&w=996')]">
                <div className="absolute inset-0 bg-gradient-to-br from-purpleMuda via-purpleMid to-purpleTua opacity-90"></div>
                <div className="relative px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                        Join Our Membership Program
                    </h1>
                    <p className="mb-8 text-lg font-normal text-gray-200 lg:text-xl sm:px-16 lg:px-48">
                        Get exclusive access to resources, support, and benefits while helping us make a difference in cancer care.
                    </p>
                    <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                        <a href="#plans" className="inline-flex justify-center items-center py-3 px-6 text-base font-medium text-purpleTua bg-yellow-300 hover:bg-yellow-400 rounded-full transition-colors">
                            Subscribe as member
                            <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </section>

            {/* Membership Plans Section */}
            <div id="plans" className="bg-gradient-to-b from-white to-purpleMuda">
                <div className="px-4 mx-auto max-w-screen-xl py-16 lg:py-10 flex flex-col">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-purpleTua mb-4">Choose Your Membership Plan</h2>
                        <div className="w-24 h-1 bg-purpleMid mx-auto rounded-full mb-6"></div>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Select the plan that best fits your needs and join our community of supporters.
                        </p>
                    </div>
                    
                    {/* Subscription Plans */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <SubscriptionPlan plans={plans} />
                    </div>
                </div>
            </div>

            {/* Footer with Purple Gradient */}
            <Footer />
        </>
    );
}