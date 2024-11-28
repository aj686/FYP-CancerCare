import { Head } from '@inertiajs/react';
import React from 'react';
import Navbar from '@/Components/Navbar';
import NavLink from '@/Components/NavLink';
import PrimaryButton from '@/Components/PrimaryButton';
import ViewEvent from '@/Components/My Components/Involved/ViewEvent';
import { usePage } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';

export default function EventDetails() {
    const { event, isRegistered, hasMembership, auth } = usePage().props;

    if (!event) {
        return <div>Loading...</div>;
    }

    const renderNavLinks = () => {
        const links = [
            { href: "/homepage", text: "Home" },
            { href: "/cancer-information", text: "Cancer" },
            { href: "/get-involved", text: "Get Involved" },
            { href: "/plan", text: "Plan" },
            { href: "/our-research", text: "Our Research" },
            { href: "/product", text: "Shop with Us" },
            { href: "/about", text: "About" }
        ];

        return (
            <>
                {links.map((link, index) => (
                    <li key={index}>
                        <NavLink href={link.href} className="text-black">
                            {link.text}
                        </NavLink>
                    </li>
                ))}
                
                {auth?.user ? (
                    // Authenticated user dropdown
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
                    // Guest links
                    <>
                        <li>
                            <NavLink href="/login" className="text-white">
                                <PrimaryButton className="bg-blue-500 hover:bg-blue-700">
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
                    </>
                )}
            </>
        );
    };

    return (
        <>
            <Head title={`${event?.title || 'Event Details'}`} />
            <Navbar>
                {renderNavLinks()}
            </Navbar>

            <ViewEvent 
                event={event}
                isRegistered={isRegistered}
                hasMembership={hasMembership}
                auth={auth || {}}
            />
        </>
    );
}