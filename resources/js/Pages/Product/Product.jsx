import { Head } from '@inertiajs/react';
import React from 'react';
import Navbar from '@/Components/Navbar';
import NavLink from '@/Components/NavLink';
import PrimaryButton from '@/Components/PrimaryButton';
import 'flowbite';
import ProductList from '@/Components/My Components/Product/ProductList';
import DynamicNavbar from '@/Components/My Components/AboutCancer/DynamicNavbar';
import Footer from '@/Components/My Components/Footer';

export default function Products({ all_products, flash }) {
    return (
        <>
            <Head title="Products" />
            <DynamicNavbar />

            {/* Hero Section with Purple Gradient */}
            <section className="relative bg-center bg-no-repeat bg-cover bg-[url('https://img.freepik.com/free-photo/black-friday-elements-assortment_23-2149074075.jpg?t=st=1726643063~exp=1726646663~hmac=0d5a9dcde5ce7aae7dda28a2daa061c7dde0ef6e3f5e4f46833851a3e9bf2723&w=996')]">
                {/* Purple Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purpleMuda via-purpleMid to-purpleTua opacity-90"></div>
                
                <div className="relative px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                        Support While You Shop
                    </h1>
                    <p className="mb-8 text-lg font-normal text-gray-200 lg:text-xl sm:px-16 lg:px-48">
                        Take advantage of this growing number of opportunities to support the Malaysia Cancer Society's mission to save lives by buying products you want and need.
                    </p>
                    <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                        <a 
                            href="#" 
                            className="inline-flex justify-center items-center py-3 px-6 text-base font-medium text-purpleTua bg-yellow-300 hover:bg-yellow-400 rounded-full transition-colors"
                        >
                            Shop Now
                            <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </a>  
                    </div>
                </div>
            </section>

            {/* Products List Section with Light Purple Background */}
            <div className="bg-gradient-to-b from-white to-purpleMuda">
                <ProductList all_products={all_products} flash={flash} />
            </div>
            <Footer />
        </>

    );
}