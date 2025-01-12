// import { Head } from '@inertiajs/react';
// import React, { useEffect } from 'react';
// import { motion, useAnimation } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import Navbar from '@/Components/Navbar';
// import NavLink from '@/Components/NavLink';
// import PrimaryButton from '@/Components/PrimaryButton';
// import Dropdown from '@/Components/Dropdown';
// import 'flowbite';
// import Card from '@/Components/My Components/Homepage/Card';
// import CardCancer from '@/Components/My Components/Homepage/CardCancer';
// import FlexTwoSideCancer from '@/Components/My Components/Homepage/FlexTwoSideCancer';
// import CardResearch from '@/Components/My Components/Homepage/CardResearch';
// import DynamicNavbar from '@/Components/My Components/AboutCancer/DynamicNavbar';
// import SubscriptionPlan from '@/Components/My Components/Plan/SubscriptionPlan';

// // Animation variants
// const fadeInUp = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
// };

// const staggerChildren = {
//     hidden: { opacity: 0 },
//     visible: {
//         opacity: 1,
//         transition: {
//             staggerChildren: 0.2
//         }
//     }
// };

// const scaleIn = {
//     hidden: { scale: 0.8, opacity: 0 },
//     visible: { 
//         scale: 1, 
//         opacity: 1,
//         transition: { duration: 0.5 }
//     }
// };

// export default function Homepage() {
//     const heroControls = useAnimation();
//     const [heroRef, heroInView] = useInView({
//         triggerOnce: true,
//         threshold: 0.1
//     });

//     useEffect(() => {
//         if (heroInView) {
//             heroControls.start('visible');
//         }
//     }, [heroControls, heroInView]);

//     return (
//         <>
//             <Head title="Homepage" />
//             <DynamicNavbar />

//             {/* Hero Section */}
//             <section className="relative h-screen">
//                 <div className="absolute inset-0">
//                     <motion.img 
//                         initial={{ scale: 1.2 }}
//                         animate={{ scale: 1 }}
//                         transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
//                         src="https://img.freepik.com/free-photo/child-suffering-from-cancer_23-2149501388.jpg?t=st=1726590400~exp=1726594000~hmac=1e2097c5774a6f8fe97b9005842dd287f8a9467fc3f6ffe3e13282549213db73&w=996"
//                         alt="Background"
//                         className="w-full h-full object-cover"
//                     />
//                     <div className="absolute inset-0 bg-gray-900/60"></div>
//                 </div>

//                 <motion.div 
//                     ref={heroRef}
//                     initial="hidden"
//                     animate={heroControls}
//                     variants={fadeInUp}
//                     className="relative h-full"
//                 >
//                     <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
//                         <motion.h1 
//                             variants={fadeInUp}
//                             className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl"
//                         >
//                             Together, We Fight Cancer, Uniting for a cure
//                         </motion.h1>
//                         <motion.p 
//                             variants={fadeInUp}
//                             className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48"
//                         >
//                             We focus on advancing cancer research and treatment, harnessing the power of innovation to improve lives and create a healthier future for all.
//                         </motion.p>
//                         <motion.div 
//                             variants={fadeInUp}
//                             className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0"
//                         >
//                             <motion.a 
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 href="#" 
//                                 className="inline-flex justify-center items-center py-3 px-6 text-base font-medium text-purpleTua bg-yellow-300 hover:bg-yellow-400 rounded-full transition-colors"
//                             >
//                                 Find your cancer now
//                                 <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
//                                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
//                                 </svg>
//                             </motion.a>
//                             <motion.a 
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 href="#" 
//                                 className="inline-flex justify-center items-center py-3 px-6 sm:ms-4 text-base font-medium text-white hover:text-purpleTua bg-transparent hover:bg-yellow-300 rounded-full border-2 border-white hover:border-yellow-300 transition-all"
//                             >
//                                 Learn more
//                             </motion.a>
//                         </motion.div>
//                     </div>
//                 </motion.div>
//             </section>

//             {/* What We Do Section */}
//             <motion.div 
//                 variants={staggerChildren}
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true }}
//                 className='bg-white p-4 flex flex-col my-20'
//             >
//                 <motion.div variants={fadeInUp} className='flex justify-center flex-col items-center mb-10'>
//                     <div className='text-4xl font-bold mb-2'>What We Do</div>
//                     <div className='text-2xl'>At CancerCare Connect, we believe in transforming the cancer care journey through three essential pillars of support.</div>
//                 </motion.div>
//                 <div className='container mx-auto text-white flex justify-between'> 
//                     <motion.div 
//                         variants={fadeInUp} 
//                         whileHover={{ scale: 1.05 }} 
//                         transition={{ type: "spring", stiffness: 300 }}
//                     >
//                         <Card 
//                             title="Educate"
//                             description="We provide comprehensive knowledge and resources to help you understand your cancer journey better."
//                             icon={
//                                 <svg className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
//                                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6v4l3.276 3.276M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
//                                 </svg>
//                             }
//                         />
//                     </motion.div>
//                     <motion.div 
//                         variants={fadeInUp} 
//                         whileHover={{ scale: 1.05 }} 
//                         transition={{ type: "spring", stiffness: 300 }}
//                     >
//                         <Card 
//                             title="Encourage"
//                             description="We stand beside you with emotional support and community connections that help strengthen your spirit:"
//                             icon={
//                                 <svg className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
//                                     <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z"/>
//                                 </svg>
//                             }
//                         />
//                     </motion.div>
//                     <motion.div 
//                         variants={fadeInUp} 
//                         whileHover={{ scale: 1.05 }} 
//                         transition={{ type: "spring", stiffness: 300 }}
//                     >
//                         <Card 
//                             title="Empower"
//                             description="We empower you to take control of your healthcare journey by providing personalized guidance and resources to advocate for your care needs."
//                             icon={
//                                 <svg className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
//                                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292z"/>
//                                 </svg>
//                             }
//                         />
//                     </motion.div>
//                 </div>
//             </motion.div>

//             {/* About Cancer Section */}
//             <div className='bg-slate-200'>
//                 <motion.div 
//                     className="px-4 mx-auto max-w-screen-xl py-16 lg:py-10"
//                     variants={staggerChildren}
//                     initial="hidden"
//                     whileInView="visible"
//                     viewport={{ once: true }}
//                 >
//                     <motion.div variants={fadeInUp}>
//                         <div className='text-4xl font-bold mb-2'>Know About Cancer</div>
//                         <div className='text-2xl'>If you have been given a cancer diagnosis or have a loved one who has, we offer useful guidance on various topics such as symptoms, screenings, and coping post-treatment.</div>
//                     </motion.div>
                    
//                     <motion.div variants={fadeInUp} className='grid grid-cols-4 gap-4 py-10'>
//                         {[
//                             { title: "About Cancer", href: "/cancer-information/about-cancer" },
//                             { title: "Cancer Types", href: "/cancer-information/cancer-types" },
//                             { title: "Treatment", href: "/cancer-information/cancer-treatments" },
//                             { title: "Prevention", href: "/cancer-information/cancer-prevention" },
//                             { title: "Early Detection", href: "/cancer-information/cancer-detection" },
//                             { title: "Recovery", href: "/cancer-information/cancer-recovery" },
//                             { title: "Diagnosis", href: "/cancer-information/cancer-diagnosis" }
//                         ].map((card, index) => (
//                             <motion.div 
//                                 key={index}
//                                 whileHover={{ scale: 1.05 }} 
//                                 transition={{ type: "spring", stiffness: 300 }}
//                             >
//                                 <CardCancer title={card.title} href={card.href} />
//                             </motion.div>
//                         ))}
//                     </motion.div>
//                 </motion.div>
//             </div>

//             {/* Get Involved Section */}
//             <motion.div 
//                 variants={fadeInUp}
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true }}
//                 className="px-4 mx-auto max-w-screen-xl py-16 lg:py-10"
//             >
//                 <FlexTwoSideCancer />
//             </motion.div>

//             {/* Research Section */}
//             <motion.div 
//                 className="bg-sky-100"
//                 variants={scaleIn}
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true }}
//             >
//                 <div className="px-4 mx-auto max-w-screen-xl py-16 lg:py-10 flex flex-col">
//                     <motion.div 
//                         variants={fadeInUp}
//                         className="flex justify-center flex-col items-center mb-10"
//                     >
//                         <div className="text-4xl font-bold mb-2 text-center">Life-Saving Cancer Research</div>
//                         <div className="text-2xl text-center">Advancing cancer research is essential to discovering better treatments, understanding its causes, and improving the lives of those affected by the disease.</div>
//                     </motion.div>
                    
//                     <motion.div 
//                         variants={staggerChildren}
//                         className="container mx-auto text-white grid grid-cols-1 md:grid-cols-3 gap-8"
//                     >
//                         {[1, 2, 3].map((_, index) => (
//                             <motion.div
//                                 key={index}
//                                 variants={fadeInUp}
//                                 whileHover={{ scale: 1.05 }}
//                                 transition={{ type: "spring", stiffness: 300 }}
//                             >
//                                 <CardResearch />
//                             </motion.div>
//                         ))}
//                     </motion.div>
                    
//                     <motion.div
//                         variants={fadeInUp}
//                         whileHover={{ scale: 1.05 }}
//                     >
//                         <button type="button" className="mt-6 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
//                             Our Research Program
//                         </button>
//                     </motion.div>
//                 </div>
//             </motion.div>

//             {/* Subscription Plan Section */}
//             <motion.div 
//                 variants={fadeInUp}
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true }}
//                 className="bg-gradient-to-b from-purpleMuda to-white"
//             >
//                 <div className="px-4 mx-auto max-w-screen-xl py-16 lg:py-10">
//                     <motion.div 
//                         variants={fadeInUp}
//                         className="text-center mb-12"
//                     >
//                         <h2 className="text-4xl font-bold text-purpleTua mb-2">Join Our Community</h2>
//                         <div className='w-24 h-1 bg-purpleMid rounded-full mx-auto mb-6'></div>
//                         <p className="text-xl text-gray-700 max-w-3xl mx-auto">
//                             Become a member of CancerCare Connect and help us make a difference in the lives of cancer patients and their families.
//                         </p>
//                     </motion.div>
//                     <motion.div variants={fadeInUp}>
//                         <SubscriptionPlan plans={[]} />
//                     </motion.div>
//                 </div>
//             </motion.div>

//             {/* Footer Section */}
//             <motion.footer 
//                 initial={{ opacity: 0 }}
//                 whileInView={{ opacity: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 1 }}
//                 className="p-4 bg-white sm:p-6 dark:bg-gray-800"
//             >
//                 <div className="mx-auto max-w-screen-xl">
//                     <div className="md:flex md:justify-between">
//                         <div className="mb-6 md:mb-0">
//                             <motion.a 
//                                 href="https://flowbite.com" 
//                                 className="flex items-center"
//                                 whileHover={{ scale: 1.05 }}
//                             >
//                                 <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">CancerCare Connect</span>
//                             </motion.a>
//                         </div>
//                         <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
//                             <div>
//                                 <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h2>
//                                 <ul className="text-gray-600 dark:text-gray-400">
//                                     <motion.li 
//                                         className="mb-4"
//                                         whileHover={{ x: 5 }}
//                                         transition={{ type: "spring", stiffness: 400 }}
//                                     >
//                                         <a href="" className="hover:underline">National Malaysia Cancer</a>
//                                     </motion.li>
//                                     <motion.li
//                                         whileHover={{ x: 5 }}
//                                         transition={{ type: "spring", stiffness: 400 }}
//                                     >
//                                         <a href="" className="hover:underline">Cancer Research Malaysia</a>
//                                     </motion.li>
//                                 </ul>
//                             </div>
//                             <div>
//                                 <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
//                                 <ul className="text-gray-600 dark:text-gray-400">
//                                     <motion.li 
//                                         className="mb-4"
//                                         whileHover={{ x: 5 }}
//                                         transition={{ type: "spring", stiffness: 400 }}
//                                     >
//                                         <a href="https://github.com/themesberg/flowbite" className="hover:underline">Github</a>
//                                     </motion.li>
//                                     <motion.li
//                                         whileHover={{ x: 5 }}
//                                         transition={{ type: "spring", stiffness: 400 }}
//                                     >
//                                         <a href="https://discord.gg/4eeurUVvTy" className="hover:underline">Discord</a>
//                                     </motion.li>
//                                 </ul>
//                             </div>
//                             <div>
//                                 <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
//                                 <ul className="text-gray-600 dark:text-gray-400">
//                                     <motion.li 
//                                         className="mb-4"
//                                         whileHover={{ x: 5 }}
//                                         transition={{ type: "spring", stiffness: 400 }}
//                                     >
//                                         <a href="#" className="hover:underline">Privacy Policy</a>
//                                     </motion.li>
//                                     <motion.li
//                                         whileHover={{ x: 5 }}
//                                         transition={{ type: "spring", stiffness: 400 }}
//                                     >
//                                         <a href="#" className="hover:underline">Terms &amp; Conditions</a>
//                                     </motion.li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                     <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
//                     <div className="sm:flex sm:items-center sm:justify-between">
//                         <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
//                             © 2022 <a href="https://flowbite.com" className="hover:underline">CancerCare Connect™</a>. All Rights Reserved.
//                         </span>
//                         <motion.div 
//                             className="flex mt-4 space-x-6 sm:justify-center sm:mt-0"
//                             variants={staggerChildren}
//                             initial="hidden"
//                             whileInView="visible"
//                         >
//                             {/* Social Media Icons */}
//                             {/* Each social media icon wrapped in motion.a */}
//                             <motion.a 
//                                 href="#" 
//                                 className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
//                                 whileHover={{ scale: 1.2, rotate: 5 }}
//                             >
//                                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                                     <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
//                                 </svg>
//                             </motion.a>
//                             {/* Repeat for other social media icons */}
//                         </motion.div>
//                     </div>
//                 </div>
//             </motion.footer>
//         </>
//     );
// }