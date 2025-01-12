import React from 'react';
import 'flowbite';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import NavLink from '@/Components/NavLink';
import PrimaryButton from '@/Components/PrimaryButton';
import CardDetailCancer from '@/Components/My Components/AboutCancer/CardDetailCancer';
import DynamicNavbar from '@/Components/My Components/AboutCancer/DynamicNavbar';
import Footer from '@/Components/My Components/Footer';

export default function Recovery() {
    return (
        <>
            <Head title="Cancer Recovery" />
            <DynamicNavbar />

            {/* Cancer Recovery Hero Section */}
            <section className="relative h-[50vh]">
                {/* Background Image Container */}
                <div className="absolute inset-0">
                    <img 
                        src="https://images.unsplash.com/photo-1606166187734-a4cb74079037?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FuY2VyJTIwcmVjb3Zlcnl8ZW58MHx8MHx8fDA%3D"
                        alt="Cancer Recovery Background"
                        className="w-full h-full object-cover blur-[2px]"
                    />
                    {/* Enhanced Overlay with Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purpleMuda via-purpleMid to-purpleTua opacity-90"></div>
                </div>

                {/* Content with adjusted padding */}
                <div className="relative h-full">
                    <div className="px-4 mx-auto max-w-screen-xl text-center py-12 lg:py-24">
                        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                            Cancer Recovery Journey
                        </h1>
                        <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
                            Understanding survival rates and recovery paths helps patients and families navigate their cancer journey with hope and knowledge.
                        </p>
                        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                            <a href="#recovery-info" className="inline-flex justify-center items-center py-3 px-6 text-base font-medium text-purpleTua bg-yellow-300 hover:bg-yellow-400 rounded-full transition-colors">
                                Explore Recovery Statistics
                                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                            </a>
                            <a href="#success-stories" className="inline-flex justify-center items-center py-3 px-6 sm:ms-4 text-base font-medium text-white hover:text-purpleTua bg-transparent hover:bg-yellow-300 rounded-full border-2 border-white hover:border-yellow-300 transition-all">
                                Success Stories
                            </a>  
                        </div>
                    </div>
                </div>
            </section>

            {/* Recovery Section */}
            <div id="recovery-info" className="bg-white p-4 flex flex-col my-20">
                <div className="flex justify-center flex-col items-center mb-10">
                    <div className="text-4xl font-bold mb-2">Recovery</div>
                    <div className="w-24 h-1 bg-purpleMid mx-auto rounded-full mb-6"></div>
                    <div className="text-2xl text-center max-w-4xl">
                        Learn about cancer survival rates, recovery processes, and success stories that inspire hope.
                    </div>
                </div>
                <div className="container mx-auto text-white flex flex-col md:flex-row gap-8 justify-center"> 
                    <CardDetailCancer 
                        title="Survival Rates for Cervical Cancer"
                        href="https://www.cancer.org/cancer/types/cervical-cancer/detection-diagnosis-staging/survival.html"
                        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLGG_DgHotMd03EPala5PLMcdRGn7bhVYpMQ&s"
                    />
                    <CardDetailCancer 
                        title="Key Statistics for Cervical Cancer"
                        href="https://www.cancer.org/cancer/types/cervical-cancer/about/key-statistics.html"
                        image="https://www.miracleshealth.com/assets/blog/assets/uploads/blog/1696838068cervical-cancer-scaled-6523b0401fd38.webp"
                    />
                    <CardDetailCancer 
                        title="Survival Rates for Breast Cancer"
                        href="https://www.cancer.org/cancer/types/breast-cancer/understanding-a-breast-cancer-diagnosis/breast-cancer-survival-rates.html?_ga=2.61577580.1539447105.1539136573-1874053871.1524533477"
                        image="data:image/jpeg;base64,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"
                    />
                </div>
            </div>

             {/* Footer */}
            <Footer/>
        </>
    );
}