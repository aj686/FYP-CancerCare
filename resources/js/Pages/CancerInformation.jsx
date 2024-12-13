import { Head } from '@inertiajs/react';
import React from 'react';
import DynamicNavbar from '@/Components/My Components/AboutCancer/DynamicNavbar';
import CardDetailCancer from '@/Components/My Components/AboutCancer/CardDetailCancer';
import Footer from '@/Components/My Components/Footer';

export default function CancerInformation() {
    return (
        <>
            <Head title="Cancer" />
            <DynamicNavbar />

            {/* Hero Section */}
            <section className="relative bg-center bg-no-repeat bg-cover bg-[url('https://img.freepik.com/free-photo/3d-render-medical-background-with-floating-abstract-virus-cells_1048-14145.jpg?t=st=1726592033~exp=1726595633~hmac=0ce854184cd9570b489caa33d99609f5625bcc01ba092f09d83f5948f706ffb4&w=900')]">
                <div className="absolute inset-0 bg-gradient-to-br from-purpleMuda via-purpleMid to-purpleTua opacity-90"></div>
                <div className="relative px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">Cancer Information</h1>
                    <p className="mb-8 text-lg font-normal text-gray-200 lg:text-xl sm:px-16 lg:px-48">If you or a loved one is facing cancer, you can receive free information, assistance and guidance.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a href="/cancer-information/about-cancer" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-purpleTua rounded-full bg-yellow-300 hover:bg-yellow-400 transition-colors">
                            About Cancer  
                            <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </a>
                        <a href="/cancer-information/cancer-types" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-purpleTua rounded-full bg-yellow-300 hover:bg-yellow-400 transition-colors">
                            Cancer Types  
                            <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </a>
                        <a href="/cancer-information/cancer-treatments" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-purpleTua rounded-full bg-yellow-300 hover:bg-yellow-400 transition-colors">
                            Treatment 
                            <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </a>
                        <a href="/cancer-information/cancer-prevention" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-purpleTua rounded-full bg-yellow-300 hover:bg-yellow-400 transition-colors">
                            Prevention 
                            <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </a>
                        <a href="/cancer-information/cancer-detection" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-purpleTua rounded-full bg-yellow-300 hover:bg-yellow-400 transition-colors">
                            Early Detection 
                            <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </a>
                        <a href="/cancer-information/cancer-recovery" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-purpleTua rounded-full bg-yellow-300 hover:bg-yellow-400 transition-colors">
                            Recovery 
                            <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </a>
                        <a href="/cancer-information/cancer-diagnosis" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-purpleTua rounded-full bg-yellow-300 hover:bg-yellow-400 transition-colors">
                            Diagnosis   
                            <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </section>

            {/* About Cancer Section */}
            <div className="bg-gradient-to-b from-white to-purpleMuda/10 p-8">
                <div className="max-w-screen-xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-purpleTua mb-4">About Cancer</h2>
                        <div className="w-24 h-1 bg-purpleMid mx-auto rounded-full mb-6"></div>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            In this section we'll walk you through the basics about cancer - what is cancer, what are the types of cancer, what causes it, and more.
                        </p>
                    </div>
                    <div className="container mx-auto flex flex-col md:flex-row gap-8 mb-8">
                        <CardDetailCancer 
                            title="What is Cancer?"
                            href="https://www.cancer.ie/cancer-information-and-support/cancer-information/about-cancer/what-is-cancer"
                            image="https://www.google.com/imgres?q=cancer&imgurl=https%3A%2F%2Fcdn.the-scientist.com%2Fassets%2FarticleNo%2F71434%2FaImg%2F51270%2F62233-9-m.jpg&imgrefurl=https%3A%2F%2Fwww.the-scientist.com%2Ftargeting-breast-cancer-metastasis-71434&docid=6Zlk5DR5609TSM&tbnid=UPt26ZoRl4cqhM&vet=12ahUKEwj29qjowqGKAxWP3jgGHTjHJ6MQM3oECHwQAA..i&w=800&h=560&hcb=2&ved=2ahUKEwj29qjowqGKAxWP3jgGHTjHJ6MQM3oECHwQAA"
                        />
                        <CardDetailCancer 
                            title="What cause cancer?"
                            href="https://www.cancer.ie/cancer-information-and-support/cancer-information/about-cancer/causes-of-cancer"
                        />
                        <CardDetailCancer 
                            title="How many people get cancer in Malaysia?"
                            href="https://www.pantai.com.my/medical-specialties/oncology/cancer-statistics-malaysia"
                        />
                    </div>
                    <div className="text-center">
                        <a href="/cancer-information/about-cancer">
                            <button className="bg-gradient-to-r from-purpleMid to-purpleTua text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105">
                                Find More
                            </button>
                        </a>
                    </div>
                </div>
            </div>

            {/* Cancer Type Section */}
            <div className="bg-white p-8">
                <div className="max-w-screen-xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-purpleTua mb-4">Cancer Type</h2>
                        <div className="w-24 h-1 bg-purpleMid mx-auto rounded-full mb-6"></div>
                    </div>
                    <div className="container mx-auto flex flex-col md:flex-row gap-8 mb-8">
                        <CardDetailCancer 
                            title="Breast Cancer"
                            href="https://www.cancer.ie/cancer-information-and-support/cancer-types/breast-cancer"
                        />
                        <CardDetailCancer 
                            title="Lung Cancer"
                            href="https://www.cancer.ie/cancer-information-and-support/cancer-types/lung-cancer"
                        />
                        <CardDetailCancer 
                            title="Liver Cancer"
                            href="https://www.cancer.ie/cancer-information-and-support/cancer-types/liver-cancer"
                        />
                    </div>
                    <div className="text-center">
                        <a href="/cancer-information/cancer-types">
                            <button className="bg-gradient-to-r from-purpleMid to-purpleTua text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105">
                                Find More
                            </button>
                        </a>
                    </div>
                </div>
            </div>

            {/* Treatment Section */}
            <div className="bg-gradient-to-b from-white to-purpleMuda/10 p-8">
                <div className="max-w-screen-xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-purpleTua mb-4">Treatment</h2>
                        <div className="w-24 h-1 bg-purpleMid mx-auto rounded-full mb-6"></div>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            There are many types of cancer treatment. The types of treatment that you receive will depend on the type of cancer you have and how advanced it is.
                        </p>
                    </div>
                    <div className="container mx-auto flex flex-col md:flex-row gap-8 mb-8">
                        <CardDetailCancer 
                            title="Chemotherapy"
                            href="https://www.cancer.gov/about-cancer/treatment/types/chemotherapy"
                        />
                        <CardDetailCancer 
                            title="Hormone Therapy"
                            href="https://www.cancer.gov/about-cancer/treatment/types/hormone-therapy"
                        />
                        <CardDetailCancer 
                            title="Hyperthermia"
                            href="https://www.cancer.gov/about-cancer/treatment/types/hyperthermia"
                        />
                    </div>
                    <div className="text-center">
                        <a href="/cancer-information/cancer-treatments">
                            <button className="bg-gradient-to-r from-purpleMid to-purpleTua text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105">
                                Find More
                            </button>
                        </a>
                    </div>
                </div>
            </div>

            {/* Prevention Section */}
            <div className="bg-white p-8">
                <div className="max-w-screen-xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-purpleTua mb-4">Prevention</h2>
                        <div className="w-24 h-1 bg-purpleMid mx-auto rounded-full mb-6"></div>
                    </div>
                    <div className="container mx-auto flex flex-col md:flex-row gap-8 mb-8">
                        <CardDetailCancer 
                            title="Your diet and cancer"
                            href="https://www.cancer.ie/cancer-information-and-support/cancer-prevention/diet-and-cancer"
                        />
                        <CardDetailCancer 
                            title="Alcohol and Cancer"
                            href="https://www.cancer.ie/cancer-information-and-support/cancer-prevention/alcohol-and-cancer"
                        />
                        <CardDetailCancer 
                            title="Exercise and Cancer"
                            href="https://www.cancer.ie/cancer-information-and-support/cancer-prevention/physical-activity-and-cancer"
                        />
                    </div>
                    <div className="text-center">
                        <a href="/cancer-information/cancer-prevention">
                            <button className="bg-gradient-to-r from-purpleMid to-purpleTua text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105">
                                Find More
                            </button>
                        </a>
                    </div>
                </div>
            </div>

            {/* Early Detection Section */}
            <div className="bg-gradient-to-b from-white to-purpleMuda/10 p-8">
                <div className="max-w-screen-xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-purpleTua mb-4">Early Detection</h2>
                        <div className="w-24 h-1 bg-purpleMid mx-auto rounded-full mb-6"></div>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Checking for cancer (or for abnormal cells that may become cancer) in people who have no symptoms is called screening.
                        </p>
                    </div>
                    <div className="container mx-auto flex flex-col md:flex-row gap-8 mb-8">
                        <CardDetailCancer 
                            title="Cancer Screening Overview"
                            href="https://www.cancer.gov/about-cancer/screening/patient-screening-overview-pdq"
                        />
                        <CardDetailCancer 
                            title="Screening Test"
                            href="https://www.cancer.gov/about-cancer/screening/screening-tests"
                        />
                        <CardDetailCancer 
                            title="Screening Research"
                            href="https://www.cancer.gov/about-cancer/screening/research"
                        />
                    </div>
                    <div className="text-center">
                        <a href="/cancer-information/cancer-detection">
                            <button className="bg-gradient-to-r from-purpleMid to-purpleTua text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105">
                                Find More
                            </button>
                        </a>
                    </div>
                </div>
            </div>

            {/* Recovery Section */}
            <div className="bg-white p-8">
                <div className="max-w-screen-xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-purpleTua mb-4">Recovery</h2>
                        <div className="w-24 h-1 bg-purpleMid mx-auto rounded-full mb-6"></div>
                    </div>
                    <div className="container mx-auto flex flex-col md:flex-row gap-8 mb-8">
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
                    <div className="text-center">
                        <a href="/cancer-information/cancer-recovery">
                            <button className="bg-gradient-to-r from-purpleMid to-purpleTua text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105">
                                Find More
                            </button>
                        </a>
                    </div>
                </div>
            </div>

            {/* Diagnosis Section */}
            <div className="bg-gradient-to-b from-white to-purpleMuda/10 p-8">
                <div className="max-w-screen-xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-purpleTua mb-4">Diagnosis</h2>
                        <div className="w-24 h-1 bg-purpleMid mx-auto rounded-full mb-6"></div>
                    </div>
                    <div className="container mx-auto flex flex-col md:flex-row gap-8 mb-8">
                        <CardDetailCancer 
                            title="Tumor Grade"
                            href="https://www.cancer.gov/about-cancer/diagnosis-staging/diagnosis/tumor-grade"
                        />
                        <CardDetailCancer 
                            title="Tumor Markers"
                            href="https://www.cancer.gov/about-cancer/diagnosis-staging/diagnosis/tumor-markers-fact-sheet"
                        />
                        <CardDetailCancer 
                            title="Pathology Reports"
                            href="https://www.cancer.gov/about-cancer/diagnosis-staging/diagnosis/pathology-reports-fact-sheet"
                        />
                    </div>
                    <div className="text-center">
                        <a href="/cancer-information/cancer-diagnosis">
                            <button className="bg-gradient-to-r from-purpleMid to-purpleTua text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105">
                                Find More
                            </button>
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer/>

        </>
    );
}