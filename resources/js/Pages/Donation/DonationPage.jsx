import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { loadStripe } from '@stripe/stripe-js';
import Card from '@/Components/ui/Card';
import CardTitle from '@/Components/ui/CardTitle';
import CardHeader from '@/Components/ui/CardHeader';
import CardContent from '@/Components/ui/CardContent';
import DynamicNavbar from '@/Components/My Components/AboutCancer/DynamicNavbar';
import Footer from '@/Components/My Components/Footer';

export default function DonationPage() {
    const [selectedAmount, setSelectedAmount] = useState(null);
    const [customAmount, setCustomAmount] = useState('');
    const [error, setError] = useState(null);
    
    const { data, setData, post, processing, errors } = useForm({
        amount: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        identityNumber: '',
        race: '',
        streetAddress: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'Malaysia',
        termsAccepted: false,
        newsletterOptIn: false
    });

    const predefinedAmounts = [
        { value: 5, label: 'RM5' },
        { value: 10, label: 'RM10' },
        { value: 50, label: 'RM50' },
        { value: 100, label: 'RM100' }
    ];

    const handleAmountSelect = (amount) => {
        setSelectedAmount(selectedAmount === amount ? null : amount);
        setCustomAmount('');
        setData('amount', selectedAmount === amount ? '' : amount);
    };

    const handleCustomAmount = (e) => {
        const value = e.target.value;
        setCustomAmount(value);
        setSelectedAmount(null);
        setData('amount', value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        
        post(route('donation.initiate'), {
            onSuccess: async (response) => {
                // Inertia will handle the redirect automatically
                if (response?.error) {
                    setError(response.error);
                }
            },
            onError: (errors) => {
                setError('Failed to process donation. Please check your details and try again.');
            }
        });
    };

    return (
        <>
            <Head title="Donate - CancerCare Connect" />
            <DynamicNavbar />

            {/* Hero Section */}
            <section className="relative bg-center bg-no-repeat bg-cover bg-[url('https://img.freepik.com/free-photo/curvy-pink-streamer-closeup_23-2148050293.jpg?t=st=1726639737~exp=1726643337~hmac=52c3d94107ae4236b83203f757da5bd81a33dcb6d74227b9a2011e98c9a87687&w=996')]">
                <div className="absolute inset-0 bg-gradient-to-br from-purpleMuda via-purpleMid to-purpleTua opacity-90"></div>
                <div className="relative px-4 mx-auto max-w-screen-xl text-center py-24">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                        Join Us in Fighting Cancer
                    </h1>
                    <p className="mb-8 text-lg font-normal text-gray-200 lg:text-xl sm:px-16 lg:px-48">
                        Your donation makes a difference in the lives of those battling cancer.
                    </p>
                    <Link 
                        href="/homepage"
                        className="inline-flex justify-center items-center py-3 px-6 text-base font-medium text-white border-2 border-white hover:bg-white/10 rounded-full transition-colors"
                    >
                        Back to Home
                    </Link>
                </div>
            </section>

            <div className="bg-gradient-to-b from-white to-purpleMuda py-16">
                <div className="max-w-4xl mx-auto px-4">
                    {/* Error Display */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}
                    
                    {/* Pledge Section */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-purpleTua mb-4">My Pledge Against Cancer</h2>
                        <div className="w-24 h-1 bg-purpleMid mx-auto rounded-full mb-6"></div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            {predefinedAmounts.map((amount) => (
                                <button
                                    key={amount.value}
                                    onClick={() => handleAmountSelect(amount.value)}
                                    className={`p-4 rounded-full border-2 transition-all duration-300 ${
                                        selectedAmount === amount.value 
                                            ? 'bg-purpleTua text-white border-purpleTua transform scale-105' 
                                            : 'bg-white border-purpleMid text-purpleTua hover:bg-purpleMuda/20'
                                    }`}
                                >
                                    {amount.label}
                                </button>
                            ))}
                        </div>

                        <div className="mb-12">
                            <input
                                type="number"
                                placeholder="Other Amount (RM)"
                                value={customAmount}
                                onChange={handleCustomAmount}
                                className="p-4 border-2 border-purpleMid rounded-full w-full max-w-xs text-center focus:border-purpleTua focus:ring-2 focus:ring-purpleMuda outline-none"
                            />
                        </div>
                    </div>

                    {/* Donor Details Form */}
                    <Card className="p-8">
                        <CardHeader>
                            <CardTitle>Donor Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Form fields with updated styling */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block mb-2">First Name <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            value={data.firstName}
                                            onChange={e => setData('firstName', e.target.value)}
                                            className="w-full p-2 border rounded"
                                            required
                                        />
                                        {errors.firstName && (
                                            <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block mb-2">Last Name <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            value={data.lastName}
                                            onChange={e => setData('lastName', e.target.value)}
                                            className="w-full p-2 border rounded"
                                            required
                                        />
                                        {errors.lastName && (
                                            <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block mb-2">Email <span className="text-red-500">*</span></label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                            className="w-full p-2 border rounded"
                                            required
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block mb-2">Phone <span className="text-red-500">*</span></label>
                                        <input
                                            type="tel"
                                            value={data.phone}
                                            onChange={e => setData('phone', e.target.value)}
                                            className="w-full p-2 border rounded"
                                            required
                                        />
                                        {errors.phone && (
                                            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block mb-2">Identity/Passport Number <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            value={data.identityNumber}
                                            onChange={e => setData('identityNumber', e.target.value)}
                                            className="w-full p-2 border rounded"
                                            required
                                        />
                                        {errors.identityNumber && (
                                            <p className="mt-1 text-sm text-red-600">{errors.identityNumber}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block mb-2">Race</label>
                                        <select
                                            value={data.race}
                                            onChange={e => setData('race', e.target.value)}
                                            className="w-full p-2 border rounded"
                                        >
                                            <option value="">Select Race</option>
                                            <option value="Malay">Malay</option>
                                            <option value="Chinese">Chinese</option>
                                            <option value="Indian">Indian</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block mb-2">Street Address</label>
                                    <input
                                        type="text"
                                        value={data.streetAddress}
                                        onChange={e => setData('streetAddress', e.target.value)}
                                        className="w-full p-2 border rounded mb-2"
                                    />
                                    <input
                                        type="text"
                                        value={data.addressLine2}
                                        onChange={e => setData('addressLine2', e.target.value)}
                                        className="w-full p-2 border rounded"
                                        placeholder="Address Line 2"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block mb-2">City</label>
                                        <input
                                            type="text"
                                            value={data.city}
                                            onChange={e => setData('city', e.target.value)}
                                            className="w-full p-2 border rounded"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2">State/Province</label>
                                        <input
                                            type="text"
                                            value={data.state}
                                            onChange={e => setData('state', e.target.value)}
                                            className="w-full p-2 border rounded"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block mb-2">Postal Code</label>
                                        <input
                                            type="text"
                                            value={data.postalCode}
                                            onChange={e => setData('postalCode', e.target.value)}
                                            className="w-full p-2 border rounded"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2">Country</label>
                                        <input
                                            type="text"
                                            value={data.country}
                                            className="w-full p-2 border rounded bg-gray-100"
                                            disabled
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <input
                                            type="checkbox"
                                            id="terms"
                                            checked={data.termsAccepted}
                                            onChange={e => setData('termsAccepted', e.target.checked)}
                                            className="mt-1 mr-2"
                                            required
                                        />
                                        <label htmlFor="terms" className="text-gray-600">
                                            I have read, understood and agree with the Terms and Conditions <span className='text-red-700'>NO YET CREATE THE CONDITION</span>
                                        </label>
                                    </div>

                                    <div className="flex items-start">
                                        <input
                                            type="checkbox"
                                            id="newsletter"
                                            checked={data.newsletterOptIn}
                                            onChange={e => setData('newsletterOptIn', e.target.checked)}
                                            className="mt-1 mr-2"
                                        />
                                        <label htmlFor="newsletter" className="text-gray-600">
                                            By checking this box you would like to receive more information about our services, events, and news.
                                        </label>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-purpleTua text-white py-4 px-8 rounded-full hover:bg-purpleMid disabled:bg-gray-300 transition-colors duration-300 font-medium text-lg"
                                >
                                    {processing ? 'Processing...' : 'Submit Donation'}
                                </button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <Footer />
        </>
    );
}