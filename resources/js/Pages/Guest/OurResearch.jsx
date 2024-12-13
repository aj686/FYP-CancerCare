import { Head } from '@inertiajs/react';
import React from 'react';
import DynamicNavbar from '@/Components/My Components/AboutCancer/DynamicNavbar';
import BlogList from '@/Components/My Components/Blog/BlogList';
import 'flowbite';
import Footer from '@/Components/My Components/Footer';

export default function OurResearch({ blogs }) {
    return (
        <>
            <Head title="Our Research" />
            <DynamicNavbar />

            {/* Hero Section with Purple Gradient */}
            <section className="relative bg-center bg-no-repeat bg-cover bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')]">
                <div className="absolute inset-0 bg-gradient-to-br from-purpleMuda via-purpleMid to-purpleTua opacity-90"></div>
                <div className="relative px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                        We invest in the world's potential
                    </h1>
                    <p className="mb-8 text-lg font-normal text-gray-200 lg:text-xl sm:px-16 lg:px-48">
                        Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.
                    </p>
                    <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                        <a 
                            href="#" 
                            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-purpleTua bg-yellow-300 rounded-full hover:bg-yellow-400 transition-colors duration-300"
                        >
                            Get started
                            <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </a>
                        <a 
                            href="#" 
                            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-white border-2 border-white rounded-full hover:bg-white/10 transition-colors duration-300"
                        >
                            Learn more
                        </a>  
                    </div>
                </div>
            </section>

            {/* Blog Section with Gradient Background */}
            <div className="bg-gradient-to-b from-white to-purpleMuda/20 py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-purpleTua mb-4">Latest Research</h2>
                        <div className="w-24 h-1 bg-purpleMid mx-auto rounded-full mb-6"></div>
                    </div>
                    <BlogList blogs={blogs} />
                </div>
            </div>

            <Footer />
        </>
    );
}