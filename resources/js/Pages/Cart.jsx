import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import React from 'react';
import Navbar from '@/Components/Navbar';
import NavLink from '@/Components/NavLink';
import PrimaryButton from '@/Components/PrimaryButton';
import 'flowbite';
import { Inertia } from '@inertiajs/inertia';
import DynamicNavbar from '@/Components/My Components/AboutCancer/DynamicNavbar';
import Footer from '@/Components/My Components/Footer';

export default function Cart({ cart }) {
    const [initialCart, setCart] = useState(cart);

    // Sub One 
    const handleDecrement = (key) => {
        // Ensure quantity does not go below 1
        if (cart[key] && cart[key].quantity > 1) {
            setCart((prevCart) => {
                const newCart = { ...prevCart };
                newCart[key].quantity -= 1;
                updateCart(newCart);
                return newCart;
            });
        }
    };

    // Add One
    const handleIncrement = (key) => {
        if (cart[key]) {
            setCart((prevCart) => {
                const newCart = { ...prevCart };
                newCart[key].quantity += 1;
                updateCart(newCart);
                return newCart;
            });
        }
    };

    const handleRemoveFromCart = (key) => {
        if (cart[key]) {
            setCart((prevCart) => {
                const newCart = { ...prevCart };
                delete newCart[key];
                updateCart(newCart);
                return newCart;
            });
        }
    }

    // Function to send cart update to the server
    const updateCart = (newCart) => {
        Inertia.post('/cart/update', { cart: newCart });
    };

    // Calculate Total Price
    const getTotalPrice = () => {
        return Object.keys(cart).reduce((total, key) => {
            return total + (cart[key].price * cart[key].quantity);
        }, 0);
    };

    // Total Price including shipping
    const getTotalPriceAfterShipping = () => {
        const shippingPrice = 10;
        const totalPrice = Object.keys(cart).reduce((total, key) => {
            return total + (cart[key].price * cart[key].quantity);
        }, 0);
        return totalPrice + shippingPrice;
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Head title="Cart" />
            <DynamicNavbar />

            {/* Cart Section */}
            <main className="flex-grow bg-gradient-to-b from-white to-purpleMuda">
                <section className="py-12">
                    <div className="mx-auto max-w-screen-xl px-4">
                        {/* Progress Steps */}
                        <div className="mb-12">
                            <ol className="flex items-center justify-center space-x-4 text-sm font-medium text-gray-500">
                                {['Order', 'Checkout', 'Order Summary'].map((step, index) => (
                                    <li key={step} className="flex items-center">
                                        <span className={`flex items-center justify-center rounded-full ${index === 0 ? 'bg-purpleMid text-white' : 'bg-purpleMuda text-purpleTua'} h-6 w-6 mr-2`}>
                                            {index + 1}
                                        </span>
                                        <span className={index === 0 ? 'text-purpleTua font-semibold' : ''}>
                                            {step}
                                        </span>
                                        {index < 2 && (
                                            <div className="w-12 h-1 mx-4 bg-purpleMuda rounded"></div>
                                        )}
                                    </li>
                                ))}
                            </ol>
                        </div>
                        <h2 className="text-2xl font-bold text-purpleTua mb-8">Shopping Cart</h2>
                        
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Cart Items */}
                            <div className="lg:col-span-2">
                                <div className="space-y-4">
                                    {Object.keys(cart).length === 0 ? (
                                        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                                            <p className="text-gray-600">Your cart is empty.</p>
                                            <Link href="/product" className="inline-flex items-center mt-4 text-purpleTua hover:text-purpleMid">
                                                Continue Shopping
                                                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                                                </svg>
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {Object.keys(cart).map((key) => (
                                                <div key={key} className="bg-white rounded-xl shadow-sm p-6 transition-all hover:shadow-md">
                                                    <div className="flex items-center gap-6">
                                                        {/* Image */}
                                                        <div className="w-24 h-24 rounded-lg overflow-hidden bg-purpleMuda/10">
                                                            <img
                                                                src={`/storage/${cart[key].image}`}
                                                                alt={cart[key].name}
                                                                className="w-full h-full object-cover"
                                                                onError={(e) => {
                                                                    e.target.src = '/placeholder-image.jpg';
                                                                }}
                                                            />
                                                        </div>

                                                        {/* Details */}
                                                        <div className="flex-1">
                                                            <h3 className="text-lg font-medium text-purpleTua">{cart[key].name}</h3>
                                                            <div className="mt-4 flex items-center gap-4">
                                                                {/* Quantity Controls */}
                                                                <div className="flex items-center gap-2">
                                                                    <button
                                                                        onClick={() => handleDecrement(key)}
                                                                        className="w-8 h-8 rounded-full bg-purpleMuda text-purpleTua hover:bg-purpleMid hover:text-white transition-colors"
                                                                    >
                                                                        -
                                                                    </button>
                                                                    <input
                                                                        type="text"
                                                                        className="w-12 text-center border-none bg-transparent"
                                                                        value={cart[key].quantity}
                                                                        readOnly
                                                                    />
                                                                    <button
                                                                        onClick={() => handleIncrement(key)}
                                                                        className="w-8 h-8 rounded-full bg-purpleMuda text-purpleTua hover:bg-purpleMid hover:text-white transition-colors"
                                                                    >
                                                                        +
                                                                    </button>
                                                                </div>

                                                                <div className="ml-auto text-lg font-bold text-purpleTua">
                                                                    RM{cart[key].price}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Actions */}
                                                    <div className="mt-4 flex items-center justify-end gap-4 border-t pt-4">
                                                        <button
                                                            onClick={() => handleRemoveFromCart(key)}
                                                            className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                                            </svg>
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-xl shadow-sm p-6">
                                    <h3 className="text-xl font-bold text-purpleTua mb-6">Order Summary</h3>
                                    
                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Subtotal</span>
                                            <span className="font-medium text-purpleTua">RM{getTotalPrice().toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Shipping</span>
                                            <span className="font-medium text-purpleTua">RM10.00</span>
                                        </div>
                                        <div className="border-t pt-4">
                                            <div className="flex justify-between">
                                                <span className="font-bold text-purpleTua">Total</span>
                                                <span className="font-bold text-purpleTua">RM{getTotalPriceAfterShipping().toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <Link
                                        href="/checkout"
                                        className="mt-6 w-full inline-flex justify-center items-center px-6 py-3 rounded-full bg-yellow-300 text-purpleTua font-medium hover:bg-yellow-400 transition-colors"
                                    >
                                        Proceed to Checkout
                                    </Link>

                                    <Link
                                        href="/product"
                                        className="mt-4 w-full inline-flex justify-center items-center px-6 py-3 rounded-full border-2 border-purpleTua text-purpleTua hover:bg-purpleMuda transition-colors"
                                    >
                                        Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}