import React from 'react';
import 'flowbite';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import NavLink from '@/Components/NavLink';
import PrimaryButton from '@/Components/PrimaryButton';
import CardDetailCancer from '@/Components/My Components/AboutCancer/CardDetailCancer';
import DynamicNavbar from '@/Components/My Components/AboutCancer/DynamicNavbar';
import Footer from '@/Components/My Components/Footer';

export default function CancerTypes() {
    return (
        <>
            <Head title="Cancer Types" />
            <DynamicNavbar />

            {/* Hero Section */}
            <section className="relative h-screen">
                {/* Background Image Container */}
                <div className="absolute inset-0">
                    <img 
                        src="https://img.freepik.com/free-photo/child-suffering-from-cancer_23-2149501388.jpg?t=st=1726590400~exp=1726594000~hmac=1e2097c5774a6f8fe97b9005842dd287f8a9467fc3f6ffe3e13282549213db73&w=996"
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-gray-900/60"></div>
                </div>

                {/* Content */}
                <div className="relative h-full">
                    <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
                        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                            Cancer Types
                        </h1>
                        <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
                            If you know the type of cancer you want to find out about, this is the right section 
                            for you.
                        </p>
                        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                            <a href="#cancer-info" className="inline-flex justify-center items-center py-3 px-6 text-base font-medium text-purpleTua bg-yellow-300 hover:bg-yellow-400 rounded-full transition-colors">
                                Explore Cancer Types
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

            {/* Cancer Types Section */}
            <div id="cancer-info" className="bg-white p-4 flex flex-col my-20">
                <div className="flex justify-center flex-col items-center mb-10">
                    <div className="text-4xl font-bold mb-2">Cancer Types</div>
                    <div className="w-24 h-1 bg-purpleMid mx-auto rounded-full mb-6"></div>
                    <div className="text-2xl text-center max-w-4xl">
                        If you know the type of cancer you want to find out about, this is the right section for you. 
                        Each section has information on symptoms, diagnosis and treatment and living with cancer.    
                    </div>
                </div>
                <div className="container mx-auto text-white flex flex-col md:flex-row gap-8 justify-center"> 
                    <CardDetailCancer 
                        title="Breast Cancer"
                        href="https://www.cancer.ie/cancer-information-and-support/cancer-types/breast-cancer"
                        image="https://www.wellwomen.co.za/wp-content/uploads/2022/10/Breast-Cancer-Ribbon-Held-in-Hands.webp"
                    />
                    <CardDetailCancer 
                        title="Lung Cancer"
                        href="https://www.cancer.ie/cancer-information-and-support/cancer-types/lung-cancer"
                         image="https://assets.roche.com/f/176343/6700x3750/9f01cb5bf8/overarching-lung-cancer-article-asset.jpg/m/1672x0/filters:format(webp):quality(90)/"
                    />
                    <CardDetailCancer 
                        title="Liver Cancer"
                        href="https://www.cancer.ie/cancer-information-and-support/cancer-types/liver-cancer"
                        image="https://www.asvinshospitals.com/wp-content/uploads/2023/08/liver-cancer-symptoms-1024x1024.jpg"
                    />
                </div>
            </div>

            <Footer />
        </>
    );
}