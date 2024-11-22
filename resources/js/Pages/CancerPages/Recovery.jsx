
import React from 'react';
import 'flowbite';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar'; // Import your Navbar component
import NavLink from '@/Components/NavLink'; // Import NavLink component
import PrimaryButton from '@/Components/PrimaryButton';
import CardDetailCancer from '@/Components/My Components/AboutCancer/CardDetailCancer';

export default function Recovery() {

    return (
        <>
            <Head title="Cancer Recovery" />
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
            </Navbar>

            <section className="bg-center bg-no-repeat bg-cover bg-[url('https://img.freepik.com/free-photo/child-suffering-from-cancer_23-2149501388.jpg?t=st=1726590400~exp=1726594000~hmac=1e2097c5774a6f8fe97b9005842dd287f8a9467fc3f6ffe3e13282549213db73&w=996')] bg-gray-700 bg-blend-multiply h-screen">
                <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
                    <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">Together, We Fight Cancer, Uniting for a cure</h1>
                    <p class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">We focus on advancing cancer research and treatment, harnessing the power of innovation to improve lives and create a healthier future for all.</p>
                    <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                        <a href="#" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                            Find your cancer now
                            <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </a>
                        <a href="#" class="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">
                            Learn more
                        </a>  
                    </div>
                </div>
            </section>

            <div className='bg-white p-4 flex flex-col my-20'>
                <div className='flex justify-center flex-col items-center mb-10'>
                    <div className='text-4xl font-bold mb-2'>Recovery</div>
                    {/* <div className='text-2xl'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et</div> */}
                </div>
                <div className='container mx-auto text-white flex justify-between'> 
                    <CardDetailCancer 
                        title="Survival Rates for Cervical Cancer"
                        href="https://www.cancer.org/cancer/types/cervical-cancer/detection-diagnosis-staging/survival.html"
                    />
                    <CardDetailCancer 
                        title="Key Statistics for Cervical Cancer"
                        href="https://www.cancer.org/cancer/types/cervical-cancer/about/key-statistics.html"
                    />
                    <CardDetailCancer 
                        title="Survival Rates for Breast Cancer"
                        href="https://www.cancer.org/cancer/types/breast-cancer/understanding-a-breast-cancer-diagnosis/breast-cancer-survival-rates.html?_ga=2.61577580.1539447105.1539136573-1874053871.1524533477"
                    />
                </div>
            </div>
        </>
    )

}