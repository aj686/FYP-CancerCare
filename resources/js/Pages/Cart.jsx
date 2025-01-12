import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import DynamicNavbar from '@/Components/My Components/AboutCancer/DynamicNavbar';
import Footer from '@/Components/My Components/Footer';

export default function Cart({ cart = {}, flash = {}, isAuthenticated, user }) {
    const [initialCart, setCart] = useState(cart, flash);
    const [showModal, setShowModal] = useState(false);

    // Add state for managing flash messages
    const [activeFlashes, setActiveFlashes] = useState({
        success: flash?.success || null,
        error: flash?.error || null,
        warning: flash?.warning || null,
        message: flash?.message || null
    });

    // Add useEffect for flash message auto-dismiss
    useEffect(() => {
        setActiveFlashes({
            success: flash?.success || null,
            error: flash?.error || null,
            warning: flash?.warning || null,
            message: flash?.message || null
        });
    }, [flash]);

    // Add useEffect for auto-dismissing messages after 5 seconds
    useEffect(() => {
        const timers = [];
        
        Object.keys(activeFlashes).forEach(type => {
            if (activeFlashes[type]) {
                const timer = setTimeout(() => {
                    setActiveFlashes(prev => ({ ...prev, [type]: null }));
                }, 5000);
                timers.push(timer);
            }
        });

        return () => timers.forEach(timer => clearTimeout(timer));
    }, [activeFlashes]);

    // Function to update cart count in navbar
    const updateCartNotification = () => {
        document.dispatchEvent(new CustomEvent('cartUpdated', { 
            detail: { count: Object.keys(cart).length }
        }));
    };

    // Handle checkout button click
    const handleCheckoutClick = (e) => {
        if (!isAuthenticated) {
            e.preventDefault();
            setShowModal(true);
        }
    };

    // Function to show flash message
    const FlashMessage = ({ message, type }) => {
        const bgColor = {
            success: 'bg-green-100 border-green-500 text-green-700',
            error: 'bg-red-100 border-red-500 text-red-700',
            warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
            message: 'bg-blue-100 border-blue-500 text-blue-700'
        }[type] || 'bg-blue-100 border-blue-500 text-blue-700';

        if (!message) return null;

        return (
            <div className={`${bgColor} border-l-4 p-4 mb-4`}>
                <p className="font-medium">{message}</p>
            </div>
        );
    };

    // Sub One 
    const handleDecrement = (key) => {
        if (cart[key] && cart[key].quantity > 1) {
            setCart((prevCart) => {
                const newCart = { ...prevCart };
                newCart[key].quantity -= 1;
                updateCart(newCart);
                return newCart;
            });
            updateCartNotification();
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
            updateCartNotification();
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
            updateCartNotification();
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
        const totalPrice = getTotalPrice();
        return totalPrice + shippingPrice;
    };

    // Update notification when component mounts
    useEffect(() => {
        updateCartNotification();
    }, [cart]);

    return (
        <div className="min-h-screen flex flex-col">
            <Head title="Cart" />
            <DynamicNavbar cartCount={Object.keys(cart).length} />

            {/* Simple Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <div className="text-center">
                            <h3 className="text-lg font-semibold text-purpleTua mb-2">Create an Account</h3>
                            <p className="text-gray-600 mb-6">
                                Register now to track your orders and get exclusive benefits
                            </p>
                            
                            <div className="flex flex-col gap-3">
                                <Link 
                                    href="/register"
                                    className="w-full py-2 bg-purpleMid text-white rounded-lg hover:bg-purpleTua transition-colors"
                                >
                                    Register Now
                                </Link>
                                <Link 
                                    href="/login"
                                    className="w-full py-2 bg-purpleMuda text-purpleTua rounded-lg hover:bg-purpleMid hover:text-white transition-colors"
                                >
                                    Login
                                </Link>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Flash Messages */}
            <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
                {activeFlashes.success && (
                    <div className="flex items-center p-4 bg-green-50 border border-green-400 rounded-lg shadow-lg">
                        <div className="flex-shrink-0 text-green-400">
                            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <p className="ml-3 text-sm font-medium text-green-800">{activeFlashes.success}</p>
                        <button
                            onClick={() => setActiveFlashes(prev => ({ ...prev, success: null }))}
                            className="ml-4 text-green-500 hover:text-green-600 focus:outline-none"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                )}

                {activeFlashes.error && (
                    <div className="flex items-center p-4 bg-red-50 border border-red-400 rounded-lg shadow-lg">
                        <div className="flex-shrink-0 text-red-400">
                            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <p className="ml-3 text-sm font-medium text-red-800">{activeFlashes.error}</p>
                        <button
                            onClick={() => setActiveFlashes(prev => ({ ...prev, error: null }))}
                            className="ml-4 text-red-500 hover:text-red-600 focus:outline-none"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                )}

                {activeFlashes.warning && (
                    <div className="flex items-center p-4 bg-yellow-50 border border-yellow-400 rounded-lg shadow-lg">
                        <div className="flex-shrink-0 text-yellow-400">
                            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <p className="ml-3 text-sm font-medium text-yellow-800">{activeFlashes.warning}</p>
                        <button
                            onClick={() => setActiveFlashes(prev => ({ ...prev, warning: null }))}
                            className="ml-4 text-yellow-500 hover:text-yellow-600 focus:outline-none"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                )}

                {activeFlashes.message && (
                    <div className="flex items-center p-4 bg-blue-50 border border-blue-400 rounded-lg shadow-lg">
                        <div className="flex-shrink-0 text-blue-400">
                            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <p className="ml-3 text-sm font-medium text-blue-800">{activeFlashes.message}</p>
                        <button
                            onClick={() => setActiveFlashes(prev => ({ ...prev, message: null }))}
                            className="ml-4 text-blue-500 hover:text-blue-600 focus:outline-none"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>

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

                                    {isAuthenticated ? (
                                        <Link
                                            href="/checkout"
                                            className="mt-6 w-full inline-flex justify-center items-center px-6 py-3 rounded-full bg-yellow-300 text-purpleTua font-medium hover:bg-yellow-400 transition-colors"
                                        >
                                            Proceed to Checkout
                                        </Link>
                                    ) : (
                                        <button
                                            onClick={handleCheckoutClick}
                                            className="mt-6 w-full inline-flex justify-center items-center px-6 py-3 rounded-full bg-yellow-300 text-purpleTua font-medium hover:bg-yellow-400 transition-colors"
                                        >
                                            Proceed to Checkout
                                        </button>
                                    )}

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