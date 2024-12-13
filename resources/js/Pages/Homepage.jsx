import { Head } from '@inertiajs/react';
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/Components/Navbar';
import NavLink from '@/Components/NavLink';
import PrimaryButton from '@/Components/PrimaryButton';
import Dropdown from '@/Components/Dropdown';
import 'flowbite';
import Card from '@/Components/My Components/Homepage/Card';
import CardCancer from '@/Components/My Components/Homepage/CardCancer';
import FlexTwoSideCancer from '@/Components/My Components/Homepage/FlexTwoSideCancer';
import CardResearch from '@/Components/My Components/Homepage/CardResearch';
import DynamicNavbar from '@/Components/My Components/AboutCancer/DynamicNavbar';
import BlogList from '@/Components/My Components/Blog/BlogList';
import SubscriptionPlan from '@/Components/My Components/Plan/SubscriptionPlan';
import Footer from '@/Components/My Components/Footer';
import DonateButton from '@/Components/My Components/DonateButton';

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

const scaleIn = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { 
        scale: 1, 
        opacity: 1,
        transition: { duration: 0.5 }
    }
};

export default function Homepage({ blogs, plans }) {
    const topics = [
        { title: 'About Cancer', href: '/cancer-information/about-cancer' },
        { title: 'Cancer Types', href: '/cancer-information/cancer-types' },
        { title: 'Treatment', href: '/cancer-information/treatment' },
        { title: 'Prevention', href: '/cancer-information/prevention' },
        { title: 'Early Detection', href: '/cancer-information/early-detection' },
        { title: 'Recovery', href: '/cancer-information/recovery' },
        { title: 'Diagnosis', href: '/cancer-information/diagnosis' },
    ];

    return (
        <>
            <Head title="Homepage" />
            <DynamicNavbar />

            {/* Hero Section */}
            <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-purpleMuda via-purpleMid to-purpleTua">
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
                    {/* Content Section */}
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="flex items-center px-6 lg:px-12 py-12 relative z-10"
                    >
                        <div className="max-w-xl">
                            <motion.h1 
                                variants={fadeInUp}
                                className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl"
                            >
                                Together, We Fight Cancer, Uniting for a cure
                            </motion.h1>
                            <motion.p 
                                variants={fadeInUp}
                                className="mb-8 text-lg font-normal text-gray-200"
                            >
                                We focus on advancing cancer research and treatment, harnessing the power of innovation to improve lives and create a healthier future for all.
                            </motion.p>
                            <motion.div 
                                variants={staggerContainer}
                                className="flex flex-col space-y-4 sm:flex-row sm:space-y-0"
                            >
                                <motion.a 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    href="#" 
                                    className="inline-flex justify-center items-center py-3 px-6 text-base font-medium text-purpleTua rounded-full bg-yellow-300 hover:bg-yellow-400 transition-colors"
                                >
                                    About Cancer
                                    <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                    </svg>
                                </motion.a>
                                <motion.a 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    href="#" 
                                    className="inline-flex justify-center items-center py-3 px-6 sm:ms-4 text-base font-medium text-white rounded-full border-2 border-white hover:bg-white/10 transition-colors"
                                >
                                    About Us
                                </motion.a>
                                <motion.a 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    href="#" 
                                >
                                    <DonateButton />
                                </motion.a>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Image Section with Curve */}
                    <motion.div 
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[400px] lg:h-auto overflow-hidden"
                    >
                        <div className="absolute inset-0">
                            <svg className="absolute h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <defs>
                                    <clipPath id="curveClipPath">
                                        <path d="M20,0 Q0,50 20,100 L100,100 L100,0 Z" />
                                    </clipPath>
                                </defs>
                                <foreignObject width="100" height="100" clipPath="url(#curveClipPath)">
                                    <div className="w-full h-full">
                                        <motion.img 
                                            initial={{ scale: 1.2 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
                                            src="https://img.freepik.com/free-photo/child-suffering-from-cancer_23-2149501388.jpg?t=st=1726590400~exp=1726594000~hmac=1e2097c5774a6f8fe97b9005842dd287f8a9467fc3f6ffe3e13282549213db73&w=996"
                                            alt="Child with cancer"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </foreignObject>
                            </svg>
                        </div>
                    </motion.div>
                </div>

                {/* Decorative curves */}
                <motion.svg 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="absolute bottom-0 left-0 w-full h-16" 
                    viewBox="0 0 100 100" 
                    preserveAspectRatio="none"
                >
                    <path 
                        d="M0,100 C30,90 70,90 100,100 L100,100 L0,100 Z" 
                        fill="white" 
                        fillOpacity="0.1"
                    />
                </motion.svg>
            </div>

            {/* What We Do Section */}
            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className='bg-gradient-to-b from-white to-purpleMuda p-4 flex flex-col my-20'
            >
                <motion.div 
                    variants={fadeInUp} 
                    className='flex justify-center flex-col items-center mb-10'
                >
                    <div className='text-4xl font-bold mb-2 text-purpleTua'>What We Do</div>
                    <div className='w-24 h-1 bg-purpleMid rounded-full mb-6'></div>
                </motion.div>
                <motion.div 
                    variants={staggerContainer}
                    className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4"
                >
                    {['Educate', 'Encourage', 'Empower'].map((title) => (
                        <motion.div
                            key={title}
                            variants={fadeInUp}
                            whileHover={{ y: -10 }}
                            className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border-t-4 border-purpleMid hover:border-purpleTua"
                        >
                            <div className="w-12 h-12 bg-purpleMuda rounded-full flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-purpleTua" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6v4l3.276 3.276M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-purpleTua mb-2">{title}</h3>
                            <p className="text-gray-600">Supporting you through every step of your journey with comprehensive care and guidance.</p>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Know About Cancer Section */}
            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="bg-gradient-to-r from-purpleMuda to-white"
            >
                <div className="px-4 mx-auto max-w-screen-xl py-16 lg:py-10">
                    <motion.div variants={fadeInUp}>
                        <div className="text-4xl font-bold mb-2 text-purpleTua">Know About Cancer</div>
                        <div className="w-24 h-1 bg-purpleMid rounded-full mb-6"></div>
                        <div className="text-xl text-gray-700 mb-8">
                            If you have been given a cancer diagnosis or have a loved one who has, we offer useful guidance on various topics.
                        </div>
                    </motion.div>
                    <motion.div 
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {topics.map((topic) => (
                            <motion.div
                                key={topic.title}
                                variants={scaleIn}
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <CardCancer title={topic.title} href={topic.href} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>

            {/* Research Section */}
            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="bg-gradient-to-b from-white to-purpleMuda"
            >
                <div className="px-4 mx-auto max-w-screen-xl py-16 lg:py-10">
                    <motion.div 
                        variants={fadeInUp}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold text-purpleTua mb-2">Life-Saving Cancer Research</h2>
                        <div className='w-24 h-1 bg-purpleMid rounded-full mx-auto mb-6'></div>
                        <p className="text-xl text-gray-700">Advancing cancer research for better treatments and improved lives.</p>
                    </motion.div>
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <BlogList blogs={blogs?.slice(0, 3) || []} />
                    </motion.div>
                </div>
            </motion.div>

            {/* Subscription Plan Section */}
            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="bg-gradient-to-b from-purpleMuda to-white"
            >
                <div className="px-4 mx-auto max-w-screen-xl py-16 lg:py-10">
                    <motion.div 
                        variants={fadeInUp}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold text-purpleTua mb-2">Join Our Community</h2>
                        <div className='w-24 h-1 bg-purpleMid rounded-full mx-auto mb-6'></div>
                        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                            Become a member of CancerCare Connect and help us make a difference in the lives of cancer patients and their families.
                        </p>
                    </motion.div>
                    <motion.div variants={scaleIn}>
                        <SubscriptionPlan plans={plans} />
                    </motion.div>
                </div>
            </motion.div>

            {/* Footer */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <Footer />
            </motion.div>
        </>
    );
}