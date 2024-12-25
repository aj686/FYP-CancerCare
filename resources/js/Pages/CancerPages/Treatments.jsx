import React from 'react';
import 'flowbite';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import NavLink from '@/Components/NavLink';
import PrimaryButton from '@/Components/PrimaryButton';
import CardDetailCancer from '@/Components/My Components/AboutCancer/CardDetailCancer';
import DynamicNavbar from '@/Components/My Components/AboutCancer/DynamicNavbar';
import Footer from '@/Components/My Components/Footer';

export default function Treatments() {
    return (
        <>
            <Head title="Cancer Treatments" />
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
                            Cancer Treatment Options
                        </h1>
                        <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
                            Explore different treatment methods and understand which options might be best for your specific situation.
                        </p>
                        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                            <a href="#treatment-info" className="inline-flex justify-center items-center py-3 px-6 text-base font-medium text-purpleTua bg-yellow-300 hover:bg-yellow-400 rounded-full transition-colors">
                                Explore Treatments
                                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                            </a>
                            <a href="#treatment-options" className="inline-flex justify-center items-center py-3 px-6 sm:ms-4 text-base font-medium text-white hover:text-purpleTua bg-transparent hover:bg-yellow-300 rounded-full border-2 border-white hover:border-yellow-300 transition-all">
                                Treatment Options
                            </a>  
                        </div>
                    </div>
                </div>
            </section>

            {/* Treatment Section */}
            <div id="treatment-info" className="bg-white p-4 flex flex-col my-20">
                <div className="flex justify-center flex-col items-center mb-10">
                    <div className="text-4xl font-bold mb-2">Treatment</div>
                    <div className="w-24 h-1 bg-purpleMid mx-auto rounded-full mb-6"></div>
                    <div className="text-2xl text-center max-w-4xl">
                        There are many types of cancer treatment. The types of treatment that you receive will depend on the type of cancer you have and how advanced it is.
                    </div>
                </div>
                <div className="container mx-auto text-white flex flex-col md:flex-row gap-8 justify-center"> 
                    <CardDetailCancer 
                        title="Chemotherapy"
                        href="https://www.cancer.gov/about-cancer/treatment/types/chemotherapy"
                        description="Learn about how chemotherapy works and what to expect during treatment."
                        image="https://www.oncoplus.co.in/wp-content/uploads/2021/03/chemo.jpg"
                    />
                    <CardDetailCancer 
                        title="Hormone Therapy"
                        href="https://www.cancer.gov/about-cancer/treatment/types/hormone-therapy"
                        description="Understanding hormone therapy and its role in cancer treatment."
                        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9d27IG2NY2xYA8B_iLzzgaFLiA6urzNGMIw&s"
                    />
                    <CardDetailCancer 
                        title="Hyperthermia"
                        href="https://www.cancer.gov/about-cancer/treatment/types/hyperthermia"
                        description="Explore hyperthermia treatment and its benefits in cancer care."
                        image="data:image/jpeg;base64,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"
                    />
                </div>
            </div>

            <Footer />
        </>
    );
}