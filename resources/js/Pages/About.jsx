import { Head } from '@inertiajs/react';
import React from 'react';
import Navbar from '@/Components/Navbar';
import NavLink from '@/Components/NavLink';
import PrimaryButton from '@/Components/PrimaryButton';
import 'flowbite';
import DynamicNavbar from '@/Components/My Components/AboutCancer/DynamicNavbar';
import { Linkedin, Mail, ExternalLink } from 'lucide-react';
import Footer from '@/Components/My Components/Footer';

export default function About() {
    const teamMembers = [
        {
            name: "Datin Rozita",
            title: "In Charge of MAKNA Organization | Motivator | Sponsor",
            image: "/storage/person/datin.jpg",
            // contribution: "Led groundbreaking research in early cancer detection methods and established our comprehensive patient care protocol.",
            // linkedin: "#"
        },
        {
            name: "Assoc. Prof. Ts. Dr. Munaisyah Abdullah",
            title: "CIDEX - Centre of Innovative Digital Education and Emerging Tech | Sponsor | Bridging the Gap between Academia and Technology",
            image: "/storage/person/madam.jpg",
            // contribution: "Pioneered innovative treatment approaches and published over 50 research papers in oncology.",
            // linkedin: "#"
        },
        {
            name: "Mr. Ajwad Aqhari",
            title: "Designer | Developer | Bachelor of Software Engineering in Information Technology",
            image: "/storage/person/ajwad.jpg",
            // contribution: "Established partnerships with 20+ organizations and led cancer awareness campaigns nationwide.",
            // linkedin: "#"
        }
    ];

    return (
        <>
            <Head title="About Us - CancerCare Connect" />
            <DynamicNavbar />
            
            {/* Hero Section */}
            <section className="relative bg-center bg-no-repeat bg-cover bg-[url('https://img.freepik.com/free-photo/curvy-pink-streamer-closeup_23-2148050293.jpg?t=st=1726639737~exp=1726643337~hmac=52c3d94107ae4236b83203f757da5bd81a33dcb6d74227b9a2011e98c9a87687&w=996')]">
                <div className="absolute inset-0 bg-gradient-to-br from-purpleMuda via-purpleMid to-purpleTua opacity-90"></div>
                <div className="relative px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                        Dedicated to Fighting Cancer Together
                    </h1>
                    <p className="mb-8 text-lg font-normal text-gray-200 lg:text-xl sm:px-16 lg:px-48">
                        At CancerCare Connect, we bring together medical expertise, research innovation, and compassionate care to support cancer patients and their families throughout Malaysia.
                    </p>
                    <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                        <a href="#team" className="inline-flex justify-center items-center py-3 px-6 text-base font-medium text-purpleTua bg-yellow-300 hover:bg-yellow-400 rounded-full transition-colors">
                            Meet Our Team
                            <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section id="team" className="py-16 bg-gradient-to-b from-white to-purpleMuda">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-purpleTua mb-4">Our Leadership Team</h2>
                        <div className="w-24 h-1 bg-purpleMid mx-auto rounded-full mb-6"></div>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Meet the dedicated professionals who lead our mission to provide exceptional cancer care and support to our community.
                        </p>
                    </div>

                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                            {teamMembers.map((member, index) => (
                                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 w-full max-w-sm">
                                    <div className="aspect-square relative">
                                        <img 
                                            src={member.image} 
                                            alt={member.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-purpleTua/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                                            <a 
                                                href={member.linkedin}
                                                className="text-white hover:text-yellow-300 transition-colors p-2"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Linkedin className="w-6 h-6" />
                                            </a>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-purpleTua mb-2">{member.name}</h3>
                                        <p className="text-purpleMid font-medium mb-3">{member.title}</p>
                                        <p className="text-gray-600 text-sm">
                                            {member.contribution}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}