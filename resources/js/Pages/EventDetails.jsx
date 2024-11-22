import { Head } from '@inertiajs/react';
import React from 'react';
import Navbar from '@/Components/Navbar';
import NavLink from '@/Components/NavLink';
import PrimaryButton from '@/Components/PrimaryButton';
import ViewEvent from '@/Components/My Components/Involved/ViewEvent';
import { usePage } from '@inertiajs/react';

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
                
                {!auth?.user && (
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