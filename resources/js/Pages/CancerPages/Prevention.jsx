import React from 'react';
import 'flowbite';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import NavLink from '@/Components/NavLink';
import PrimaryButton from '@/Components/PrimaryButton';
import CardDetailCancer from '@/Components/My Components/AboutCancer/CardDetailCancer';
import DynamicNavbar from '@/Components/My Components/AboutCancer/DynamicNavbar';
import Footer from '@/Components/My Components/Footer';

export default function Prevention() {
    return (
        <>
            <Head title="Cancer Prevention" />
            <DynamicNavbar />

            {/* Hero Section */}
            <section className="relative h-[50vh]">
                {/* Background Image Container */}
                <div className="absolute inset-0">
                    <img 
                        src="https://images.unsplash.com/photo-1631558553269-03a775c388b5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhbmNlciUyMHByZXZlbnRhdGlvbnxlbnwwfHwwfHx8MA%3D%3D"
                        alt="Cancer Prevention Background"
                        className="w-full h-full object-cover blur-[2px]"
                    />
                    {/* Enhanced Overlay with Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purpleMuda via-purpleMid to-purpleTua opacity-90"></div>
                </div>

                {/* Content with adjusted padding */}
                <div className="relative h-full">
                    <div className="px-4 mx-auto max-w-screen-xl text-center py-12 lg:py-24">
                        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                            Cancer Prevention
                        </h1>
                        <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
                            Learn about lifestyle changes and preventive measures that can help reduce your risk of developing cancer.
                        </p>
                        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                            <a href="#prevention-info" className="inline-flex justify-center items-center py-3 px-6 text-base font-medium text-purpleTua bg-yellow-300 hover:bg-yellow-400 rounded-full transition-colors">
                                Explore Prevention Methods
                                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                            </a>
                            <a href="#healthy-lifestyle" className="inline-flex justify-center items-center py-3 px-6 sm:ms-4 text-base font-medium text-white hover:text-purpleTua bg-transparent hover:bg-yellow-300 rounded-full border-2 border-white hover:border-yellow-300 transition-all">
                                Healthy Lifestyle Tips
                            </a>  
                        </div>
                    </div>
                </div>
            </section>

            {/* Prevention Section */}
            <div id="prevention-info" className="bg-white p-4 flex flex-col my-20">
                <div className="flex justify-center flex-col items-center mb-10">
                    <div className="text-4xl font-bold mb-2">Prevention</div>
                    <div className="w-24 h-1 bg-purpleMid mx-auto rounded-full mb-6"></div>
                    <div className="text-2xl text-center max-w-4xl">
                        Making healthy choices and understanding risk factors can help reduce your chances of developing cancer.
                    </div>
                </div>
                <div className="container mx-auto text-white flex flex-col md:flex-row gap-8 justify-center"> 
                    <CardDetailCancer 
                        title="Your diet and cancer"
                        href="https://www.cancer.ie/cancer-information-and-support/cancer-prevention/diet-and-cancer"
                        image="data:image/jpeg;base64,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"
                    />
                    <CardDetailCancer 
                        title="Alcohol and Cancer"
                        href="https://www.cancer.ie/cancer-information-and-support/cancer-prevention/alcohol-and-cancer"
                        image="data:image/jpeg;base64,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"
                    />
                    <CardDetailCancer 
                        title="Exercise and Cancer"
                        href="https://www.cancer.ie/cancer-information-and-support/cancer-prevention/physical-activity-and-cancer"
                        image="data:image/jpeg;base64,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"
                    />
                </div>
            </div>

            <Footer />
        </>
    );
}