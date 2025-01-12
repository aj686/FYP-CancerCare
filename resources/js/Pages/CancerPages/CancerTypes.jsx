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
            <section className="relative h-[50vh]">
                {/* Background Image Container */}
                <div className="absolute inset-0">
                    <img 
                        src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FuY2VyJTIwdHlwZXxlbnwwfHwwfHx8MA%3D%3D"
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purpleMuda via-purpleMid to-purpleTua opacity-90"></div>
                </div>

                {/* Content */}
                <div className="relative h-full">
                    <div className="px-4 mx-auto max-w-screen-xl text-center py-12 lg:py-24">
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
                <div className="container mx-auto text-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 px-20">
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
                    <CardDetailCancer 
                        title="Colorectal Cancer"
                        href="https://www.cancer.gov/types/colorectal"
                        image="https://www.woodlandsgastroenterology.com/wp-content/uploads/2021/05/colon-cancer.jpg"
                    />
                    <CardDetailCancer 
                        title="Prostate Cancer"
                        href="https://www.cancer.gov/types/prostate"
                        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCM8zv0KwGLdM5FQ5FBaa9zHJSZ9fDTfb12Q&s"
                    />
                    <CardDetailCancer 
                        title="Blood Cancer"
                        href="https://www.cancer.ie/cancer-information-and-support/cancer-types/blood-cancers"
                        image="https://max-website20-images.s3.ap-south-1.amazonaws.com/Blood_Cancer_c9eaf08786.jpg"
                    />
                </div>
            </div>

            <Footer />
        </>
    );
}