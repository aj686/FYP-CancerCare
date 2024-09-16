import React from 'react';

export default function Navbar({ children }) {
    return (
        <nav className="bg-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-black text-lg font-bold">
                    CancerCare Connect
                </div>
                <ul className="flex space-x-4">
                    {children} {/* Render dynamic NavLinks or other elements here */}
                </ul>
            </div>
        </nav>
    );
}
