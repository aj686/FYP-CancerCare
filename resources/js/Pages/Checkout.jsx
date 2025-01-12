import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import React from 'react';
import Cookies from 'js-cookie';
import { useForm } from '@inertiajs/inertia-react';
import DynamicNavbar from '@/Components/My Components/AboutCancer/DynamicNavbar';
import Footer from '@/Components/My Components/Footer';
import { router } from '@inertiajs/react';

export default function Checkout({ order, auth, userData, savedAddresses: initialSavedAddresses, error }) {
    const [loading, setLoading] = useState(false);
    const [savedAddresses, setSavedAddresses] = useState(initialSavedAddresses || []);
    const [selectedAddress, setSelectedAddress] = useState(null);

    const statesInMalaysia = [
        "Johor", "Kedah", "Kelantan", "Kuala Lumpur", "Labuan", "Melaka", 
        "Negeri Sembilan", "Pahang", "Penang", "Perak", "Perlis", "Putrajaya", 
        "Sabah", "Sarawak", "Selangor", "Terengganu"
    ];

    const { data, setData, post, errors } = useForm({
        email: userData?.email || '',
        firstname: userData?.firstname || '',
        lastname: userData?.lastname || '',
        address_1: userData?.address_1 || '',
        address_2: userData?.address_2 || '',
        city: userData?.city || '',
        country: 'Malaysia',
        state: userData?.state || '',
        postcode: userData?.postcode || '',
        phonenumber: userData?.phonenumber || '',
        payment_method: 'stripe', // Default payment method
    });

    // Handle payment method selection
    const handlePaymentMethodChange = (method) => {
        setData('payment_method', method);
    };

    // Load saved addresses from cookies
    useEffect(() => {
        const cookieAddresses = Cookies.get('savedAddresses');
        if (cookieAddresses) {
            const parsedAddresses = JSON.parse(cookieAddresses);
            setSavedAddresses(parsedAddresses);
        }
    }, []);

    // Save address to cookies
    const saveAddressToCookies = (addressData) => {
        const addresses = [...savedAddresses];
        const addressExists = addresses.findIndex(
            addr => addr.address_1 === addressData.address_1 && 
                   addr.postcode === addressData.postcode
        );

        if (addressExists === -1) {
            addresses.push(addressData);
            if (addresses.length > 5) {
                addresses.shift();
            }
            setSavedAddresses(addresses);
            Cookies.set('savedAddresses', JSON.stringify(addresses), { expires: 30 });
        }
    };

    // Load saved address
    const loadSavedAddress = (address) => {
        setSelectedAddress(address);
        setData({
            ...data,
            ...address
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
    
        // Validate phone number
        const phoneRegex = /^01[0-9]{8,9}$/;
        if (!phoneRegex.test(data.phonenumber)) {
            alert('Invalid phone number format. Please use the format 01XXXXXXXX.');
            setLoading(false);
            return;
        }
    
        // Validate postcode
        const postcodeRegex = /^\d{5}$/;
        if (!postcodeRegex.test(data.postcode)) {
            alert('Invalid postcode format. Please enter a 5-digit postcode.');
            setLoading(false);
            return;
        }
    
        // Save current address to cookies
        saveAddressToCookies(data);
    
        // Submit form with payment method
        post('/checkout', data, {
            onSuccess: (response) => {
                if (response?.props?.url) {
                    window.location.href = response.props.url;
                } else {
                    console.error('No payment URL received');
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

    // Common CSS classes
    const inputClass = "block w-full rounded-lg border border-purpleMid/30 bg-white p-2.5 text-sm text-gray-900 focus:border-purpleTua focus:ring-purpleTua transition-colors";
    const labelClass = "mb-2 block text-sm font-medium text-purpleTua";
    const errorClass = "mt-1 text-sm text-red-500";

    // Saved Addresses Section Component
    const SavedAddressesSection = () => (
        savedAddresses.length > 0 && (
            <div className="mb-6 bg-white rounded-lg p-4">
                <h3 className="text-lg font-semibold text-purpleTua mb-4">Saved Addresses</h3>
                <div className="grid gap-4 md:grid-cols-2">
                    {savedAddresses.map((address, index) => (
                        <div
                            key={index}
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                                selectedAddress === address ? 'border-purpleTua bg-purpleMuda/10' : 'border-gray-200'
                            }`}
                            onClick={() => loadSavedAddress(address)}
                        >
                            <p className="font-medium">{address.firstname} {address.lastname}</p>
                            <p className="text-sm text-gray-600">{address.address_1}</p>
                            <p className="text-sm text-gray-600">
                                {address.city}, {address.state} {address.postcode}
                            </p>
                            <p className="text-sm text-gray-600">Phone: {address.phonenumber}</p>
                        </div>
                    ))}
                </div>
            </div>
        )
    );

    return (
        <>
            <Head title="Checkout - CancerCare Connect" />
            <DynamicNavbar />

            <section className="bg-gradient-to-b from-white to-purpleMuda py-12">
                {error && (
                    <div className="mx-auto max-w-screen-xl px-4 mb-6">
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    </div>
                )}

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
                                <SavedAddressesSection />
                                
                                <h2 className="text-2xl font-bold text-purpleTua mb-8">Delivery Details</h2>

                                {/* Form Fields */}
                                <div className="space-y-6">
                                    {/* Email */}
                                    <div>
                                        <label htmlFor="email" className={labelClass}>Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            className={inputClass}
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                            required
                                            placeholder="Enter your email address"
                                        />
                                        {errors.email && <p className={errorClass}>{errors.email}</p>}
                                    </div>

                                    {/* Name Fields */}
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                                    <div>
                                        <label htmlFor="address_1" className={labelClass}>Address Line 1</label>
                                        <input
                                            type="text"
                                            id="address_1"
                                            className={inputClass}
                                            value={data.address_1}
                                            onChange={e => setData('address_1', e.target.value)}
                                            required
                                            placeholder="Enter your street address"
                                        />
                                        {errors.address_1 && <p className={errorClass}>{errors.address_1}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="address_2" className={labelClass}>Address Line 2 (Optional)</label>
                                        <input
                                            type="text"
                                            id="address_2"
                                            className={inputClass}
                                            value={data.address_2}
                                            onChange={e => setData('address_2', e.target.value)}
                                            placeholder="Apartment, suite, unit, etc. (optional)"
                                        />
                                        {errors.address_2 && <p className={errorClass}>{errors.address_2}</p>}
                                    </div>

                                    {/* City, State, Country */}
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
                                                <option value="">Select State</option>
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
                                                disabled
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Postcode and Phone */}
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
                                                placeholder="5-digit postcode"
                                                maxLength={5}
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
                                                placeholder="01XXXXXXXX"
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
                                                <p className="text-purpleTua font-bold mt-1">
                                                    RM{(Number(order[key].price)).toFixed(2)}
                                                </p>
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
                                        <span className="text-gray-600">Shipping Fee</span>
                                        <span className="font-medium text-purpleTua">RM10.00</span>
                                    </div>
                                    <div className="flex justify-between border-t border-purpleMuda/20 pt-3">
                                        <span className="font-bold text-purpleTua">Total</span>
                                        <span className="font-bold text-purpleTua">RM{getTotalPriceAfterShipping().toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Payment Method Selection */}
                                <div className="flex space-x-4 mt-2">
                                    <button
                                        type="button"
                                        onClick={() => handlePaymentMethodChange('stripe')}
                                        className={`flex-1 py-3 px-4 rounded-full ${
                                            data.payment_method === 'stripe' 
                                                ? 'bg-purpleMid text-white' 
                                                : 'bg-gray-200 text-gray-700'
                                        } transition-colors`}
                                    >
                                        Pay with Stripe
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handlePaymentMethodChange('billplz')}
                                        className={`flex-1 py-3 px-4 rounded-full ${
                                            data.payment_method === 'billplz' 
                                                ? 'bg-yellow-300 text-purpleTua' 
                                                : 'bg-gray-200 text-gray-700'
                                        } transition-colors`}
                                    >
                                        Pay with Billplz
                                    </button>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="mt-2 w-full rounded-full bg-yellow-300 px-6 py-3 text-purpleTua font-medium hover:bg-yellow-400 transition-colors disabled:opacity-50"
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-purpleTua" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing...
                                        </span>
                                    ) : `Proceed to Pay with ${data.payment_method === 'stripe' ? 'Stripe' : 'Billplz'}`}
                                </button>
                            </div>

                                <p className="mt-4 text-xs text-gray-500 text-center">
                                    By proceeding with the payment, you agree to our{' '}
                                    <a href="#" className="text-purpleTua hover:underline">Terms and Conditions</a>
                                </p>
                            </div>
                        </div>
                </form>
            </section>
            
            <Footer />
        </>
    );
}