import { Head } from '@inertiajs/react';
import React from 'react';
import Navbar from '@/Components/Navbar'; // Import your Navbar component
import NavLink from '@/Components/NavLink'; // Import NavLink component
import PrimaryButton from '@/Components/PrimaryButton';
import 'flowbite';
import ProductList from '@/Components/My Components/Product/ProductList';

// retrieve props: all_products

export default function Products( { all_products } ) {
    return (
        <>
            <Head title="Products" />
            <Navbar>
                {/* Pass NavLink components as children to Navbar */}
                <li>
                    <NavLink href="/homepage" className="text-black">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink href="/cancer-information" className="text-black">
                        Cancer
                    </NavLink>
                </li>
                <li>
                    <NavLink href="/get-involved" className="text-black">
                        Get Involved
                    </NavLink>
                </li>
                <li>
                    <NavLink href="/our-research" className="text-black">
                        Our Research
                    </NavLink>
                </li>
                <li>
                    <NavLink href="/product" className="text-black">
                        Shop with Us
                    </NavLink>
                </li>
                <li>
                    <NavLink href="/about" className="text-black">
                        About
                    </NavLink>
                </li>
                <li>
                    <NavLink href="/login" className="text-white">
                        <PrimaryButton
                            className="bg-blue-500 hover:bg-blue-700">
                            Login
                        </PrimaryButton>
                    </NavLink>
                </li>
                <li>
                    <NavLink href="/register" className="text-white">
                        <PrimaryButton>
                            Register
                        </PrimaryButton>
                    </NavLink>
                </li>
                <li>
                    <NavLink href="/cart" className="text-black">
                        <span class="sr-only">
                            Cart
                        </span>
                        <svg class="w-5 h-5 lg:me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/>
                        </svg>   
                    </NavLink>
                </li>
            </Navbar>

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
