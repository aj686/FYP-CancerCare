import React, { useState } from 'react';
import 'flowbite';
import { ShoppingCart, Heart, ChevronRight, Filter, SortAsc } from 'lucide-react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';



export default function ProductList( {all_products} ) {
    
    // Add product to cart 
    // when user click button add to cart, this function will retrieve param product slug and post to URL to trigger the addToCart
    // in CartController.
    const handleAddToCart = (getProductSlug) => {
        Inertia.post('/cart/add', { slug: getProductSlug }, {
            onSuccess: (page) => {
                alert('Product successfully added to cart!');
                // You can redirect the user to the cart page or update the UI
                // Inertia.visit('/cart');
            },
            onError: (errors) => {
                // Display error message
                alert('Failed to add product to cart: ' + errors.error);
            }
        });
    };

    
    
    return (
        <section className="py-8 antialiased md:py-10">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                {/* Header & Filters */}
                <div className="mb-8 items-end justify-between space-y-4 sm:flex sm:space-y-0">
                    <div>
                        <nav className="flex" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                                <li className="inline-flex items-center">
                                    <a href="#" className="inline-flex items-center text-sm font-medium text-purpleTua hover:text-purpleMid">
                                        <svg className="me-2.5 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                        </svg>
                                        Home
                                    </a>
                                </li>
                            </ol>
                        </nav>
                        <h2 className="mt-3 text-2xl font-bold text-purpleTua sm:text-3xl">Merchandise</h2>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button 
                            data-modal-toggle="filterModal" 
                            data-modal-target="filterModal" 
                            type="button" 
                            className="flex items-center rounded-full border border-purpleTua px-4 py-2 text-sm font-medium text-purpleTua hover:bg-purpleMuda transition-colors"
                        >
                            <Filter className="mr-2 h-4 w-4" />
                            Filters
                        </button>
                        <button 
                            id="sortDropdownButton1" 
                            data-dropdown-toggle="dropdownSort1" 
                            type="button" 
                            className="flex items-center rounded-full border border-purpleTua px-4 py-2 text-sm font-medium text-purpleTua hover:bg-purpleMuda transition-colors"
                        >
                            <SortAsc className="mr-2 h-4 w-4" />
                            Sort
                        </button>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {all_products.map((product) => (
                        <div key={product.id} className="group relative overflow-hidden rounded-xl bg-white p-4 shadow-md transition-all hover:shadow-lg">
                            {/* Image */}
                            <div className="relative aspect-square overflow-hidden rounded-lg bg-purpleMuda/10">
                                <Link href={`/product/${product.slug}`}>
                                    <img 
                                        src={`/storage/${product.image}`} 
                                        alt={product.name}
                                        className="h-full w-full object-contain object-center transition-transform duration-300 group-hover:scale-105"
                                    />
                                </Link>
                            </div>

                            {/* Product Details */}
                            <div className="mt-4 space-y-2">
                                <Link 
                                    href={`/product/${product.slug}`} 
                                    className="text-lg font-semibold text-purpleTua hover:text-purpleMid transition-colors"
                                >
                                    {product.name}
                                </Link>

                                <div className="flex items-center justify-between">
                                    <div className="text-xl font-bold text-purpleTua">
                                        RM{parseFloat(product.price).toFixed(2)}
                                    </div>

                                    <button 
                                        type="button" 
                                        onClick={() => handleAddToCart(product.slug)} 
                                        className="inline-flex items-center rounded-full bg-purpleTua px-4 py-2 text-sm font-medium text-white hover:bg-purpleMid transition-colors"
                                    >
                                        <ShoppingCart className="mr-2 h-4 w-4" />
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Show More Button */}
                <div className="w-full text-center my-5">
                    <button 
                        type="button" 
                        className="rounded-full border-2 border-purpleTua bg-white px-6 py-2 text-sm font-medium text-purpleTua hover:bg-purpleMuda transition-colors"
                    >
                        Show more
                    </button>
                </div>
            </div>
        </section>

    );
}