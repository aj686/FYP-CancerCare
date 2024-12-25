import React, { useState } from 'react';
import 'flowbite';
import { ShoppingCart, Heart, ChevronRight } from 'lucide-react'; // Added ChevronRight import
import { Inertia } from '@inertiajs/inertia';
import Footer from '../Footer';

export default function ViewProduct({ product }) {
    const [quantity, setQuantity] = useState(1);

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
            onSuccess: () => {
                alert('Product added to cart successfully!');
            },
        });
    };

    const formatPrice = (price) => {
        return `RM ${parseFloat(price).toFixed(2)}`;
    };

    return (
        <section className="bg-gradient-to-br from-white to-purpleMuda py-12">
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