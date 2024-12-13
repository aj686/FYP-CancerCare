import React from 'react';
import DonateButton from './DonateButton';

export default function Footer() {
    return(
        <footer className="bg-purpleTua text-white">
            <div className="mx-auto max-w-screen-xl px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">CancerCare Connect</h2>
                        <p className="text-purpleMuda">Supporting cancer patients and their families with care and compassion.</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Partnership</h3>
                        <ul className="space-y-2">
                            <li>
                                <a 
                                    href="https://makna.org.my" 
                                    className="text-purpleMuda hover:text-purpleMid transition-colors duration-300"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    MAKNA (Majlis Kanser Nasional)
                                </a>
                            </li>
                            <li className="text-purpleMuda">
                                <p>Address:</p>
                                <p>Level 8, Kompleks Majlis Kanser Nasional</p>
                                <p>Jalan Raja Muda Abdul Aziz</p>
                                <p>50300 Kuala Lumpur, Malaysia</p>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Give support</h2>
                        <DonateButton />
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-8 flex justify-between items-center">
                    <p className="text-sm text-white">© 2024 CancerCare Connect. All rights reserved.</p>
                    <div className="flex space-x-4">
                        {['Facebook', 'Twitter', 'Instagram'].map((social) => (
                            <a 
                                key={social} 
                                href="#" 
                                className="text-white hover:text-purpleMuda transition-colors duration-300"
                            >
                                {social}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}