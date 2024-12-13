import { Head } from '@inertiajs/react';
import React from 'react';
import DynamicNavbar from '@/Components/My Components/AboutCancer/DynamicNavbar';
import SubscriptionPlan from '@/Components/My Components/Plan/SubscriptionPlan';

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
            <footer className="bg-gradient-to-br from-purpleMuda via-purpleMid to-purpleTua">
                <div className="mx-auto max-w-screen-xl px-4 py-12">
                    <div className="md:flex md:justify-between">
                        <div className="mb-6 md:mb-0">
                            <span className="text-2xl font-semibold text-white">CancerCare Connect</span>
                        </div>
                        <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-white uppercase">Resources</h2>
                                <ul className="text-gray-200">
                                    <li className="mb-4">
                                        <a href="" className="hover:text-white transition-colors">National Malaysia Cancer</a>
                                    </li>
                                    <li>
                                        <a href="" className="hover:text-white transition-colors">Cancer Research Malaysia</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-white uppercase">Follow us</h2>
                                <ul className="text-gray-200">
                                    <li className="mb-4">
                                        <a href="#" className="hover:text-white transition-colors">Twitter</a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-white transition-colors">Facebook</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-white uppercase">Legal</h2>
                                <ul className="text-gray-200">
                                    <li className="mb-4">
                                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-white transition-colors">Terms &amp; Conditions</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <hr className="my-6 border-gray-200/20 sm:mx-auto lg:my-8" />
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <span className="text-sm text-gray-200">© 2024 <a href="#" className="hover:text-white">CancerCare Connect™</a>. All Rights Reserved.</span>
                        <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
                            {/* Social Media Links */}
                            {['Facebook', 'Instagram', 'Twitter', 'GitHub'].map((platform) => (
                                <a key={platform} href="#" className="text-gray-200 hover:text-white transition-colors">
                                    <span className="sr-only">{platform}</span>
                                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}