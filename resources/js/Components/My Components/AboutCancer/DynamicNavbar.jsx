import { Head, Link, usePage } from '@inertiajs/react';
import React from 'react';
import NavLink from '@/Components/NavLink';
import PrimaryButton from '@/Components/PrimaryButton';
import Dropdown from '@/Components/Dropdown';
import YellowButton from '@/Components/YellowButton';

export default function DynamicNavbar() {

    const { auth } = usePage().props;
    
    return (
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                <div className="flex items-center">
                    <Link href="/">
                        <span className="self-center text-xl font-semibold whitespace-nowrap">
                            CancerCare Connect
                        </span>
                    </Link>
                </div>
                
                {/* Main Navigation Links */}
                <div className="flex items-center lg:order-2">
                    <ul className="flex flex-row mt-4 font-medium lg:space-x-8 lg:mt-0">
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
                            <NavLink href="/plan" className="text-black">
                                Plan
                            </NavLink>
                        </li>
                        <li>
                            <NavLink href="/our-research" className="text-black">
                                Our Research
                            </NavLink>
                        </li>
                            <li>
                                <NavLink href="/stories" className="text-black">
                                    Our Story
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

                        {/* Cart Link */}
                        <li>
                            <NavLink href="/cart" className="text-black">
                                <span className="sr-only">Cart</span>
                                <svg 
                                    className="w-5 h-5 lg:me-1" 
                                    aria-hidden="true" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="24" 
                                    height="24" 
                                    fill="none" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        stroke="currentColor" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth="2" 
                                        d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                                    />
                                </svg>
                            </NavLink>
                        </li>
                        
                        {/* Authentication Links */}
                        {auth?.user ? (
                            // User is logged in - show dropdown
                            <li className="relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {auth.user.name}
                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        {auth.user.usertype === 'admin' ? (
                                            <>
                                                <Dropdown.Link href={route('admin.dashboard')}>Dashboard</Dropdown.Link>
                                                <Dropdown.Link href={route('admin.orders')}>Orders</Dropdown.Link>
                                            </>
                                        ) : (
                                            <>
                                                <Dropdown.Link href={route('dashboard')}>Dashboard</Dropdown.Link>
                                                <Dropdown.Link href={route('user.bookings')}>My Bookings</Dropdown.Link>
                                                <Dropdown.Link href={route('user.orders')}>My Orders</Dropdown.Link>
                                            </>
                                        )}
                                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </li>
                        ) : (
                            // Guest - show login/register buttons
                            <>
                                <li>
                                    <NavLink href="/login" className="text-white">
                                        <YellowButton className="bg-blue-500 hover:bg-blue-700">
                                            Login
                                        </YellowButton>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink href="/register" className="text-white">
                                        <PrimaryButton>
                                            Register
                                        </PrimaryButton>
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}