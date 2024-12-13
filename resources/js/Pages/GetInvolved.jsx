import { Head } from '@inertiajs/react';
import React from 'react';
import DynamicNavbar from '@/Components/My Components/AboutCancer/DynamicNavbar';
import EventList from '@/Components/My Components/Involved/EventLists';
import Footer from '@/Components/My Components/Footer';

export default function GetInvolved({ events }) {
    return (
        <>
            <Head title="Get Involved" />
            <DynamicNavbar />

            {/* Hero Section with Purple Gradient */}
            <section className="relative bg-center bg-no-repeat bg-cover bg-[url('https://img.freepik.com/free-photo/curvy-pink-streamer-closeup_23-2148050293.jpg?t=st=1726639737~exp=1726643337~hmac=52c3d94107ae4236b83203f757da5bd81a33dcb6d74227b9a2011e98c9a87687&w=996')]">
                <div className="absolute inset-0 bg-gradient-to-br from-purpleMuda via-purpleMid to-purpleTua opacity-90"></div>
                <div className="relative px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                        We are defeating cancer as a team.
                    </h1>
                    <p className="mb-8 text-lg font-normal text-gray-200 lg:text-xl sm:px-16 lg:px-48">
                        There are numerous methods of clicking and typing to support CancerCare Connect and get involved. Together, we're making a difference – and you can, too.
                    </p>
                    <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                        <a href="#" className="inline-flex justify-center items-center py-3 px-6 text-base font-medium text-purpleTua bg-yellow-300 hover:bg-yellow-400 rounded-full transition-colors">
                            Join Event
                            <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </section>

            {/* Event Listing Section */}
            <div className="bg-gradient-to-b from-white to-purpleMuda">
                <div className="px-4 mx-auto max-w-screen-xl py-16 lg:py-10 flex flex-col">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-purpleTua mb-4">Support an Event Now</h2>
                        <div className="w-24 h-1 bg-purpleMid mx-auto rounded-full mb-6"></div>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Volunteer your time at one of our fundraising events to help us celebrate life and take meaningful action in the fight against cancer.
                        </p>
                    </div>
                    
                    {/* Event List Component with enhanced styling */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <EventList events={events} />
                    </div>
                </div>
            </div>

            {/* Footer with Purple Gradient */}
            <Footer />
        </>
    );
}