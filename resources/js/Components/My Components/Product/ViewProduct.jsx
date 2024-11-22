import React, { useState } from 'react';
import 'flowbite';
import { ShoppingCart, Heart } from 'lucide-react';
import { Inertia } from '@inertiajs/inertia';

export default function ViewProduct({ product }) {
    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return (
            <div className="flex h-96 items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
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
            onSuccess: () => {
                alert('Product added to cart successfully!');
            },
        });
    };

    const formatPrice = (price) => {
        return `RM ${parseFloat(price).toFixed(2)}`;
    };

    return (
        <section className="py-8 bg-white dark:bg-gray-900 antialiased">
            <div className="max-w-screen-xl px-4 mx-auto">
                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Product Image Section */}
                    <div className="relative">
                        <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
                            <img 
                                src={`/storage/${product.image}`}
                                alt={product.name}
                                className="h-full w-full object-contain object-center"
                            />
                        </div>
                    </div>

                    {/* Product Details Section */}
                    <div className="flex flex-col">
                        {/* Breadcrumb */}
                        <nav className="mb-4">
                            <ol className="flex items-center space-x-2 text-sm">
                                <li>
                                    <a href="/" className="text-gray-500 hover:text-primary-600">Home</a>
                                </li>
                                <li className="text-gray-500">/</li>
                                <li>
                                    <a href="/products" className="text-gray-500 hover:text-primary-600">Products</a>
                                </li>
                                <li className="text-gray-500">/</li>
                                <li className="text-gray-900 font-medium">{product.name}</li>
                            </ol>
                        </nav>

                        {/* Product Title */}
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
                            {product.name}
                        </h1>

                        {/* Price Section */}
                        <div className="mt-4 flex items-center space-x-4">
                            <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                {formatPrice(product.price)}
                            </span>
                            {product.old_price && (
                                <span className="text-xl text-gray-500 line-through">
                                    {formatPrice(product.old_price)}
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        <div className="mt-6 space-y-4">
                            <p className="text-base text-gray-600 dark:text-gray-400">
                                {product.description}
                            </p>
                        </div>

                        {/* Quantity Selector */}
                        <div className="mt-6">
                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Quantity
                            </label>
                            <div className="mt-2 flex items-center space-x-3">
                                <button 
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="rounded-md bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
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
                                    className="w-20 rounded-md border-gray-200 text-center shadow-sm dark:bg-gray-800 dark:border-gray-700"
                                />
                                <button 
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="rounded-md bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 inline-flex justify-center items-center gap-2 rounded-lg bg-primary-700 px-5 py-3 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700"
                            >
                                <ShoppingCart className="h-5 w-5" />
                                Add to Cart
                            </button>
                            
                            <button
                                className="flex-1 inline-flex justify-center items-center gap-2 rounded-lg bg-gray-100 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                            >
                                <Heart className="h-5 w-5" />
                                Add to Wishlist
                            </button>
                        </div>

                        {/* Additional Info */}
                        <div className="mt-8 border-t border-gray-200 pt-8 dark:border-gray-700">
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">Free Delivery</p>
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Enter your postal code for Delivery Availability</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">Return Delivery</p>
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Free 30 Days Delivery Returns. Details</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}