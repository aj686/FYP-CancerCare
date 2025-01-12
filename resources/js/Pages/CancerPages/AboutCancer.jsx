import React from 'react';
import 'flowbite';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import NavLink from '@/Components/NavLink';
import PrimaryButton from '@/Components/PrimaryButton';
import CardDetailCancer from '@/Components/My Components/AboutCancer/CardDetailCancer';
import DynamicNavbar from '@/Components/My Components/AboutCancer/DynamicNavbar';
import Footer from '@/Components/My Components/Footer';

export default function AboutCancer() {
    return (
        <>
            <Head title="About Cancer" />
            <DynamicNavbar />

            {/* Hero Section */}
            <section className="relative h-[50vh]">
                {/* Background Image Container */}
                <div className="absolute inset-0">
                    <img 
                        src="https://images.unsplash.com/photo-1631049127288-f2ef4b664b58?q=80&w=1790&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Cancer Care Background"
                        className="w-full h-full object-cover blur-[2px]"
                    />
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purpleMuda via-purpleMid to-purpleTua opacity-90"></div>
                </div>

                {/* Content with adjusted padding */}
                <div className="relative h-full">
                    <div className="px-4 mx-auto max-w-screen-xl text-center py-12 lg:py-24">  {/* Reduced padding */}
                        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                            About Cancer
                        </h1>
                        <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
                            Details on cancer such as its origins, data, methods of detection, and the process of diagnosis.
                        </p>
                        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                            <a href="#cancer-basics" className="inline-flex justify-center items-center py-3 px-6 text-base font-medium text-purpleTua bg-yellow-300 hover:bg-yellow-400 rounded-full transition-colors">
                                Explore Cancer Basics
                                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                            </a>
                            <a href="#early-detection" className="inline-flex justify-center items-center py-3 px-6 sm:ms-4 text-base font-medium text-white hover:text-purpleTua bg-transparent hover:bg-yellow-300 rounded-full border-2 border-white hover:border-yellow-300 transition-all">
                                Early Detection
                            </a>  
                        </div>
                    </div>
                </div>
            </section>

            {/* About Cancer Section */}
            <div id="cancer-basics" className="bg-white p-4 flex flex-col my-20">
                <div className="flex justify-center flex-col items-center mb-10">
                    <div className="text-4xl font-bold mb-2">About Cancer</div>
                    <div className="text-2xl text-center">In this section we'll walk you through the basics about cancer - what is cancer, what are the types of cancer, what causes it, and more.</div>
                </div>
                <div className="container mx-auto text-white flex flex-col md:flex-row gap-8 justify-center"> 
                    <CardDetailCancer 
                        title="What is Cancer?"
                        href="https://www.cancer.ie/cancer-information-and-support/cancer-information/about-cancer/what-is-cancer"
                        image="https://mobilephysiotherapyclinic.in/wp-content/uploads/2023/02/cancer.webp"
                    />
                    <CardDetailCancer 
                        title="What cause cancer?"
                        href="https://www.cancer.ie/cancer-information-and-support/cancer-information/about-cancer/causes-of-cancer"
                        image="https://www.singaporecancersociety.org.sg/images/contents/learn-about-cancer-what-is-cancer/cancer-cell.png"
                    />
                    <CardDetailCancer 
                        title="How many people get cancer in Malaysia?"
                        href="https://www.pantai.com.my/medical-specialties/oncology/cancer-statistics-malaysia"
                        image="https://www.waroncancer.org.my/aeimages/Image/materials/logo400.png"
                    />
                </div>
            </div>

            {/* Early Detection Section */}
            <div id="early-detection" className="bg-gradient-to-b from-white to-purpleMuda/10 p-4 flex flex-col my-20">
                <div className="flex justify-center flex-col items-center mb-10">
                    <div className="text-4xl font-bold mb-2">Early Detection</div>
                    <div className="text-2xl text-center">Were you aware of this? The sooner cancer is detected, the higher the likelihood of survival. In this part, we demonstrate how to detect cancer at an early stage and discuss the process of cancer screening.</div>
                </div>
                <div className="container mx-auto text-white flex flex-col md:flex-row gap-8 justify-center"> 
                    <CardDetailCancer 
                        title="Spot cancer early"
                        href="https://www.cancer.ie/cancer-information-and-support/cancer-prevention/early-detection"
                        image="https://www.cancer.ie/sites/default/files/styles/square/public/2022-12/Spot%20anything%201%20Twitter.png?h=bd907a81&itok=SkfXKUlf"
                    />
                    <CardDetailCancer 
                        title="About cancer screening"
                        href="https://www.cancer.ie/cancer-information-and-support/cancer-information/early-detection/cancer-screening"
                        image="https://www.cancer.ie/sites/default/files/styles/hero_large_1x/public/2019-12/mammogram.JPG?h=30f1d14f&itok=df1kXuXG"
                    />
                    <CardDetailCancer 
                        title="Diagnosing Cancer"
                        href="https://www.cancer.ie/cancer-information-and-support/cancer-information/early-detection/diagnosing-cancer"
                        image="https://www.cancer.ie/sites/default/files/styles/hero_large_1x/public/2019-08/download.jpeg?h=c2b54b8e&itok=h5-kU5IN"
                    />
                </div>
            </div>

            <Footer />
        </>
    );
}