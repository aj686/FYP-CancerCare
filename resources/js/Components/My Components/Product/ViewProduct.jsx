import React, { useState, useEffect } from 'react';
import 'flowbite';
import { ShoppingCart, Heart, ChevronRight } from 'lucide-react'; // Added ChevronRight import
import { Inertia } from '@inertiajs/inertia';
import Footer from '../Footer';

export default function ViewProduct({ product, flash }) {
    const [quantity, setQuantity] = useState(1);

    // Add the FlashMessage component
    const FlashMessage = ({ message, type }) => {
        const [isVisible, setIsVisible] = useState(true);

        useEffect(() => {
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 5000);
            return () => clearTimeout(timer);
        }, []);

        if (!message || !isVisible) return null;

        const styles = {
            success: 'bg-green-50 border-green-400 text-green-800',
            error: 'bg-red-50 border-red-400 text-red-800',
            warning: 'bg-yellow-50 border-yellow-400 text-yellow-800',
            message: 'bg-blue-50 border-blue-400 text-blue-800'
        };

        return (
            <div className={`fixed top-4 right-4 z-50 flex items-center p-4 rounded-lg shadow-lg border ${styles[type]}`}>
                <div className="flex-shrink-0">
                    {type === 'success' && (
                        <svg className="w-5 h-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                        </svg>
                    )}
                </div>
                <p className="ml-3 text-sm font-medium">{message}</p>
                <button
                    onClick={() => setIsVisible(false)}
                    className="ml-4 inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                    </svg>
                </button>
            </div>
        );
    };

    if (!product) {
        return (
            <div className="flex h-96 items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-purpleTua">Product not found</h2>
                    <p className="mt-2 text-gray-600">The product you're looking for doesn't exist.</p>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        Inertia.post('/cart/add', {
            slug: product.slug,
            quantity: quantity
        }, {
            preserveScroll: true,
        });
    };

    const formatPrice = (price) => {
        return `RM ${parseFloat(price).toFixed(2)}`;
    };

    return (
        <section className="bg-gradient-to-br from-white to-purpleMuda py-12">
            {/* Flash Messages */}
            {flash?.success && <FlashMessage message={flash.success} type="success" />}
            {flash?.error && <FlashMessage message={flash.error} type="error" />}
            {flash?.warning && <FlashMessage message={flash.warning} type="warning" />}
            {flash?.message && <FlashMessage message={flash.message} type="message" />}

            <div className="max-w-screen-xl px-4 mx-auto">
                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Product Image */}
                    <div className="relative">
                        <div className="aspect-square overflow-hidden rounded-xl bg-white p-6 shadow-md">
                            <img 
                                src={`/storage/${product.image}`}
                                alt={product.name}
                                className="h-full w-full object-contain object-center transition-all hover:scale-105"
                            />
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col">
                        {/* Breadcrumb */}
                        <nav className="mb-4">
                            <ol className="flex items-center space-x-2 text-sm">
                                <li>
                                    <a href="/" className="text-purpleTua hover:text-purpleMid">Home</a>
                                </li>
                                <li>
                                    <ChevronRight className="h-4 w-4 text-gray-400" />
                                </li>
                                <li>
                                    <a href="/products" className="text-purpleTua hover:text-purpleMid">Products</a>
                                </li>
                                <li>
                                    <ChevronRight className="h-4 w-4 text-gray-400" />
                                </li>
                                <li className="text-purpleTua font-medium">{product.name}</li>
                            </ol>
                        </nav>

                        {/* Title */}
                        <h1 className="text-3xl font-bold text-purpleTua sm:text-4xl">
                            {product.name}
                        </h1>

                        {/* Price */}
                        <div className="mt-4 flex items-center space-x-4">
                            <span className="text-3xl font-bold text-purpleTua">
                                {formatPrice(product.price)}
                            </span>
                            {product.old_price && (
                                <span className="text-xl text-gray-500 line-through">
                                    {formatPrice(product.old_price)}
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        <div className="mt-6">
                            <p className="text-gray-600">
                                {product.description}
                            </p>
                        </div>

                        {/* Quantity Selector */}
                        <div className="mt-8">
                            <label htmlFor="quantity" className="block text-sm font-medium text-purpleTua">
                                Quantity
                            </label>
                            <div className="mt-2 flex items-center space-x-3">
                                <button 
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="rounded-full bg-purpleMuda h-8 w-8 text-purpleTua hover:bg-purpleMid hover:text-white transition-colors"
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    id="quantity"
                                    name="quantity"
                                    min="1"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="w-20 rounded-lg border-purpleMid text-center shadow-sm focus:border-purpleTua focus:ring-purpleTua"
                                />
                                <button 
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="rounded-full bg-purpleMuda h-8 w-8 text-purpleTua hover:bg-purpleMid hover:text-white transition-colors"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 inline-flex justify-center items-center gap-2 rounded-full bg-purpleTua px-6 py-3 text-sm font-medium text-white hover:bg-purpleMid transition-colors"
                            >
                                <ShoppingCart className="h-5 w-5" />
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}