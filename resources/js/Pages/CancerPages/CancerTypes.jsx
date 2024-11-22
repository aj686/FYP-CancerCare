
import React from 'react';
import 'flowbite';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar'; // Import your Navbar component
import NavLink from '@/Components/NavLink'; // Import NavLink component
import PrimaryButton from '@/Components/PrimaryButton';
import CardDetailCancer from '@/Components/My Components/AboutCancer/CardDetailCancer';

export default function CancerTypes() {

    return (
        <>
            <Head title="Cancer Types" />
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
                    <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">Cancer Types</h1>
                    <p class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
                        If you know the type of cancer you want to find out about, this is the right section 
                        for you.
                    </p>
                    <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                </div>
                </div>
            </section>

            {/* Cancer Type   Section */}
            <div className='bg-white p-4 flex flex-col my-20'>
                <div className='flex justify-center flex-col items-center mb-10'>
                    <div className='text-4xl font-bold mb-2'>Cancer Types</div>
                    <div className='text-2xl'>
                    If you know the type of cancer you want to find out about, this is the right section for you. Each section has information on symptoms, diagnosis and treatment and living with cancer.    
                    </div>
                </div>
                <div className='container mx-auto text-white flex justify-between'> 
                    <CardDetailCancer 
                        title="Spot cancer early"
                        href="https://www.cancer.ie/cancer-information-and-support/cancer-prevention/early-detection"
                    />
                    <CardDetailCancer 
                        title="About cancer screening"
                        href="https://www.cancer.ie/cancer-information-and-support/cancer-information/early-detection/cancer-screening"
                    />
                    <CardDetailCancer 
                        title="Diagnosing Cancer"
                        href="https://www.cancer.ie/cancer-information-and-support/cancer-information/early-detection/diagnosing-cancer"
                    />
                </div>
            </div>
        </>
    )

}