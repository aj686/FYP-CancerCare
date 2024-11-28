import { Head } from '@inertiajs/react';
import React from 'react';
import Navbar from '@/Components/Navbar'; // Import your Navbar component
import NavLink from '@/Components/NavLink'; // Import NavLink component
import PrimaryButton from '@/Components/PrimaryButton';
import 'flowbite';
import ProductList from '@/Components/My Components/Product/ProductList';
import DynamicNavbar from '@/Components/My Components/AboutCancer/DynamicNavbar';

// retrieve props: all_products

export default function Products( { all_products } ) {
    return (
        <>
            <Head title="Products" />
            <DynamicNavbar />
           

            <section className="bg-center bg-no-repeat bg-cover bg-[url('https://img.freepik.com/free-photo/black-friday-elements-assortment_23-2149074075.jpg?t=st=1726643063~exp=1726646663~hmac=0d5a9dcde5ce7aae7dda28a2daa061c7dde0ef6e3f5e4f46833851a3e9bf2723&w=996')] bg-gray-500 bg-blend-multiply h-screen">
                <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
                    <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">Support While You Shop</h1>
                    <p class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">Take advantage of this growing number of opportunities to support the Malaysia Cancer Society’s mission to save lives by buying products you want and need.</p>
                    <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                        {/* <a href="#" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                            Find your cancer now
                            <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </a> */}
                        <a href="#" class="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">
                            Shop Now
                        </a>  
                    </div>
                </div>
            </section>

            
            {/* Send all_products to nested React component */}
             {/* Pass the products prop to the ProductList component */}
            <ProductList all_products = {all_products}/>

            
            
        </>
    );
}   
