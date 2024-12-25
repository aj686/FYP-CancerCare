import { Head } from '@inertiajs/react';
import { useState } from 'react';
import React from 'react';
import Navbar from '@/Components/Navbar';
import NavLink from '@/Components/NavLink';
import PrimaryButton from '@/Components/PrimaryButton';
import 'flowbite';
import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/inertia-react';
import DynamicNavbar from '@/Components/My Components/AboutCancer/DynamicNavbar';
import Footer from '@/Components/My Components/Footer';

export default function Checkout({ order }) {
    const [loading, setLoading] = useState(false);

    const { data, setData, post, errors } = useForm({
        email: '',
        firstname: '',
        lastname: '',
        address_1: '',
        address_2: '',
        city: '',
        country: 'Malaysia',
        state: '',
        postcode: '',
        phonenumber: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Regex validation for phone number
        const phoneRegex = /^01[0-9]{8,9}$/;
        if (!phoneRegex.test(data.phonenumber)) {
            alert('Invalid phone number format. Please use the format 01XXXXXXXX.');
            setLoading(false);
            return;
        }

        post('/checkout', {
            onSuccess: (page) => {
                const { payment_url } = page.props;
                if (payment_url) {
                    window.location.href = payment_url;
                } else {
                    console.error('No payment URL found.');
                    setLoading(false);
                }
            },
            onError: (errors) => {
                console.error('Order placement failed:', errors);
                setLoading(false);
            },
        });
    };

    const getTotalPrice = () => {
        return Object.keys(order).reduce((total, key) => {
            return total + (order[key].price * order[key].quantity);
        }, 0);
    };

    const getTotalPriceAfterShipping = () => {
        const shippingPrice = 10;
        return getTotalPrice() + shippingPrice;
    };

    const statesInMalaysia = [
        "Johor", "Kedah", "Kelantan", "Kuala Lumpur", "Labuan", "Melaka", 
        "Negeri Sembilan", "Pahang", "Penang", "Perak", "Perlis", "Putrajaya", 
        "Sabah", "Sarawak", "Selangor", "Terengganu"
    ];

    // Common CSS classes
    const inputClass = "block w-full rounded-lg border border-purpleMid/30 bg-white p-2.5 text-sm text-gray-900 focus:border-purpleTua focus:ring-purpleTua transition-colors";
    const labelClass = "mb-2 block text-sm font-medium text-purpleTua";
    const errorClass = "mt-1 text-sm text-red-500";

    return (
        <>
            <Head title="Checkout - CancerCare Connect" />
            <DynamicNavbar />

            <section className="bg-gradient-to-b from-white to-purpleMuda py-12">
                <form onSubmit={handleSubmit} className="mx-auto max-w-screen-xl px-4">
                    {/* Progress Steps */}
                    <div className="mb-12">
                        <ol className="flex items-center justify-center space-x-4 text-sm font-medium text-gray-500">
                            {['Order', 'Checkout', 'Order Summary'].map((step, index) => (
                                <li key={step} className="flex items-center">
                                    <span className={`flex items-center justify-center rounded-full ${index === 1 ? 'bg-purpleMid text-white' : 'bg-purpleMuda text-purpleTua'} h-6 w-6 mr-2`}>
                                        {index + 1}
                                    </span>
                                    <span className={index === 1 ? 'text-purpleTua font-semibold' : ''}>
                                        {step}
                                    </span>
                                    {index < 2 && (
                                        <div className="w-12 h-1 mx-4 bg-purpleMuda rounded"></div>
                                    )}
                                </li>
                            ))}
                        </ol>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Delivery Details Form */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white rounded-xl shadow-sm p-8">
                                <h2 className="text-2xl font-bold text-purpleTua mb-8">Delivery Details</h2>
                                
                                {/* Email */}
                                <div className="mb-6">
                                    <label htmlFor="email" className={labelClass}>Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className={inputClass}
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        required
                                        placeholder="Enter your email"
                                    />
                                    {errors.email && <p className={errorClass}>{errors.email}</p>}
                                </div>

                                {/* Name Fields */}
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-6">
                                    <div>
                                        <label htmlFor="firstname" className={labelClass}>First Name</label>
                                        <input
                                            type="text"
                                            id="firstname"
                                            className={inputClass}
                                            value={data.firstname}
                                            onChange={e => setData('firstname', e.target.value)}
                                            required
                                            placeholder="Enter your first name"
                                        />
                                        {errors.firstname && <p className={errorClass}>{errors.firstname}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="lastname" className={labelClass}>Last Name</label>
                                        <input
                                            type="text"
                                            id="lastname"
                                            className={inputClass}
                                            value={data.lastname}
                                            onChange={e => setData('lastname', e.target.value)}
                                            required
                                            placeholder="Enter your last name"
                                        />
                                        {errors.lastname && <p className={errorClass}>{errors.lastname}</p>}
                                    </div>
                                </div>

                                {/* Address Fields */}
                                <div className="space-y-6">
                                    <div>
                                        <label htmlFor="address_1" className={labelClass}>Address Line 1</label>
                                        <input
                                            type="text"
                                            id="address_1"
                                            className={inputClass}
                                            value={data.address_1}
                                            onChange={e => setData('address_1', e.target.value)}
                                            required
                                            placeholder="Enter your address line 1"
                                        />
                                        {errors.address_1 && <p className={errorClass}>{errors.address_1}</p>}
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="address_2" className={labelClass}>Address Line 2</label>
                                        <input
                                            type="text"
                                            id="address_2"
                                            className={inputClass}
                                            value={data.address_2}
                                            onChange={e => setData('address_2', e.target.value)}
                                            placeholder="Enter your address line 2"
                                        />
                                        {errors.address_2 && <p className={errorClass}>{errors.address_2}</p>}
                                    </div>

                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                                        <div>
                                            <label htmlFor="city" className={labelClass}>City</label>
                                            <input
                                                type="text"
                                                id="city"
                                                className={inputClass}
                                                value={data.city}
                                                onChange={e => setData('city', e.target.value)}
                                                required
                                                placeholder="Enter your city"
                                            />
                                            {errors.city && <p className={errorClass}>{errors.city}</p>}
                                        </div>
                                        
                                        <div>
                                            <label htmlFor="state" className={labelClass}>State</label>
                                            <select
                                                id="state"
                                                className={inputClass}
                                                value={data.state}
                                                onChange={e => setData('state', e.target.value)}
                                                required
                                            >
                                                <option value="">Select your state</option>
                                                {statesInMalaysia.map(state => (
                                                    <option key={state} value={state}>{state}</option>
                                                ))}
                                            </select>
                                            {errors.state && <p className={errorClass}>{errors.state}</p>}
                                        </div>
                                        
                                        <div>
                                            <label htmlFor="country" className={labelClass}>Country</label>
                                            <input
                                                type="text"
                                                id="country"
                                                className={inputClass}
                                                value={data.country}
                                                onChange={e => setData('country', e.target.value)}
                                                required
                                                placeholder="Enter your country"
                                                defaultValue="Malaysia"
                                            />
                                            {errors.country && <p className={errorClass}>{errors.country}</p>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                        <div>
                                            <label htmlFor="postcode" className={labelClass}>Postcode</label>
                                            <input
                                                type="text"
                                                id="postcode"
                                                className={inputClass}
                                                value={data.postcode}
                                                onChange={e => setData('postcode', e.target.value)}
                                                required
                                                placeholder="Enter your postcode"
                                            />
                                            {errors.postcode && <p className={errorClass}>{errors.postcode}</p>}
                                        </div>
                                        
                                        <div>
                                            <label htmlFor="phonenumber" className={labelClass}>Phone Number</label>
                                            <input
                                                type="tel"
                                                id="phonenumber"
                                                className={inputClass}
                                                value={data.phonenumber}
                                                onChange={e => setData('phonenumber', e.target.value)}
                                                required
                                                placeholder="Enter your phone number (e.g., 0179519791)"
                                            />
                                            {errors.phonenumber && <p className={errorClass}>{errors.phonenumber}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
                                <h3 className="text-xl font-bold text-purpleTua mb-6">Order Summary</h3>
                                
                                {/* Order Items */}
                                <div className="space-y-4 mb-6">
                                    {Object.keys(order).map((key) => (
                                        <div key={key} className="flex items-center gap-4 p-4 bg-purpleMuda/10 rounded-lg">
                                            <img
                                                src={`/storage/${order[key].image}`}
                                                alt={order[key].name}
                                                className="w-16 h-16 object-cover rounded-lg bg-white"
                                                onError={(e) => {
                                                    e.target.src = '/placeholder-image.jpg';
                                                }}
                                            />
                                            <div className="flex-1">
                                                <h4 className="text-purpleTua font-medium">{order[key].name}</h4>
                                                <p className="text-sm text-gray-600">Quantity: {order[key].quantity}</p>
                                                <p className="text-purpleTua font-bold mt-1">RM{order[key].price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Price Summary */}
                                <div className="space-y-3 border-t border-purpleMuda/20 pt-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="font-medium text-purpleTua">RM{getTotalPrice().toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="font-medium text-purpleTua">RM10.00</span>
                                    </div>
                                    <div className="flex justify-between border-t border-purpleMuda/20 pt-3">
                                        <span className="font-bold text-purpleTua">Total</span>
                                        <span className="font-bold text-purpleTua">RM{getTotalPriceAfterShipping().toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Pay Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="mt-6 w-full rounded-full bg-yellow-300 px-6 py-3 text-purpleTua font-medium hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-purpleTua" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing...
                                        </span>
                                    ) : 'Pay Now'}
                                </button>

                                <p className="mt-4 text-sm text-gray-600 text-center">
                                    By proceeding, you agree to our{' '}
                                    <a href="#" className="text-purpleTua hover:underline">Terms and Conditions</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
            
            <Footer />
        </>
    );
}