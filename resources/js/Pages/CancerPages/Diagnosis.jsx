import React from 'react';
import 'flowbite';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import NavLink from '@/Components/NavLink';
import PrimaryButton from '@/Components/PrimaryButton';
import CardDetailCancer from '@/Components/My Components/AboutCancer/CardDetailCancer';
import DynamicNavbar from '@/Components/My Components/AboutCancer/DynamicNavbar';
import Footer from '@/Components/My Components/Footer';

export default function Diagnosis() {
    return (
        <>
            <Head title="Cancer Diagnosis" />
            <DynamicNavbar />

            {/* Cancer Diagnosis Hero Section */}
            <section className="relative h-[50vh]">
                {/* Background Image Container */}
                <div className="absolute inset-0">
                    <img 
                        src="https://plus.unsplash.com/premium_photo-1726768945604-63642968ec52?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FuY2VyJTIwZGlhZ25vc3xlbnwwfHwwfHx8MA%3D%3D"
                        alt="Cancer Diagnosis Background"
                        className="w-full h-full object-cover blur-[2px]"
                    />
                    {/* Enhanced Overlay with Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purpleMuda via-purpleMid to-purpleTua opacity-90"></div>
                </div>

                {/* Content with adjusted padding */}
                <div className="relative h-full">
                    <div className="px-4 mx-auto max-w-screen-xl text-center py-12 lg:py-24">
                        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                            Cancer Diagnosis Process
                        </h1>
                        <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
                            Understanding the diagnosis process helps patients make informed decisions about their care. Learn about different diagnostic methods and what they mean.
                        </p>
                        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                            <a href="#diagnosis-info" className="inline-flex justify-center items-center py-3 px-6 text-base font-medium text-purpleTua bg-yellow-300 hover:bg-yellow-400 rounded-full transition-colors">
                                Explore Diagnosis Methods
                                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                            </a>
                            <a href="#learn-more" className="inline-flex justify-center items-center py-3 px-6 sm:ms-4 text-base font-medium text-white hover:text-purpleTua bg-transparent hover:bg-yellow-300 rounded-full border-2 border-white hover:border-yellow-300 transition-all">
                                Learn More
                            </a>  
                        </div>
                    </div>
                </div>
            </section>

            {/* Diagnosis Section */}
            <div id="diagnosis-info" className="bg-white p-4 flex flex-col my-20">
                <div className="flex justify-center flex-col items-center mb-10">
                    <div className="text-4xl font-bold mb-2">Diagnosis</div>
                    <div className="w-24 h-1 bg-purpleMid mx-auto rounded-full mb-6"></div>
                    <div className="text-2xl text-center max-w-4xl">
                        Understanding your diagnosis and treatment options is an important step in managing your cancer care journey.
                    </div>
                </div>
                <div className="container mx-auto text-white flex flex-col md:flex-row gap-8 justify-center"> 
                    <CardDetailCancer 
                        title="Tumor Grade"
                        href="https://www.cancer.gov/about-cancer/diagnosis-staging/diagnosis/tumor-grade"
                        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ2Q2x3P5ITdwlM5EAXLRr_9IVc6P-BJ7v-g&s"
                    />
                    <CardDetailCancer 
                        title="Tumor Markers"
                        href="https://www.cancer.gov/about-cancer/diagnosis-staging/diagnosis/tumor-markers-fact-sheet"
                        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_ye-vc1T9HdLmhRDbysholHp8j0-5EWRyZA&s"
                    />
                    <CardDetailCancer 
                        title="Pathology Reports"
                        href="https://www.cancer.gov/about-cancer/diagnosis-staging/diagnosis/pathology-reports-fact-sheet"
                        image="data:image/jpeg;base64,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"
                    />
                </div>
            </div>

            {/* Footer */}
            <Footer/>
        </>
    );
}