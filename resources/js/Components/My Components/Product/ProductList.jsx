import React, { useState, useEffect } from 'react';
import 'flowbite';
import { ShoppingCart, Search } from 'lucide-react';
import { router } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

export default function ProductList({ all_products, flash }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(all_products.current_page);

    // Handle search
    const handleSearch = (value) => {
        setSearchTerm(value);
        router.get('/product', 
            { search: value, page: 1 }, 
            { preserveState: true, preserveScroll: true }
        );
    };

    // Handle pagination
    const handlePageChange = (page) => {
        setCurrentPage(page);
        router.get('/product', 
            { search: searchTerm, page: page }, 
            { preserveState: true, preserveScroll: true }
        );
    };

    const FlashMessage = ({ message, type }) => {
        const [isVisible, setIsVisible] = useState(true);

        useEffect(() => {
            const timer = setTimeout(() => setIsVisible(false), 5000);
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
                <button onClick={() => setIsVisible(false)} className="ml-4 inline-flex text-gray-400 hover:text-gray-500 focus:outline-none">
                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                    </svg>
                </button>
            </div>
        );
    };

    const handleAddToCart = (getProductSlug) => {
        router.post('/cart/add', 
            { slug: getProductSlug }, 
            { preserveScroll: true }
        );
    };

    return (
        <section className="py-8 antialiased md:py-10">
            {/* Flash Messages */}
            {flash?.success && <FlashMessage message={flash.success} type="success" />}
            {flash?.error && <FlashMessage message={flash.error} type="error" />}
            {flash?.warning && <FlashMessage message={flash.warning} type="warning" />}
            {flash?.message && <FlashMessage message={flash.message} type="message" />}

            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">

                {/* Search Bar */}
                <div className="mb-6">
                    <div className="mx-auto max-w-4xl px-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Header */}
                <div className="mb-8">
                    <nav className="flex" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                            <li className="inline-flex items-center">
                                <Link href="/" className="inline-flex items-center text-sm font-medium text-purpleTua hover:text-purpleMid">
                                    <svg className="me-2.5 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                    </svg>
                                    Home
                                </Link>
                            </li>
                        </ol>
                    </nav>
                    <h2 className="mt-3 text-2xl font-bold text-purpleTua sm:text-3xl">Merchandise</h2>
                </div>

                {/* Product Grid */}
                <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {all_products.data.map((product) => (
                        <div key={product.id} className="group relative overflow-hidden rounded-xl bg-white p-4 shadow-md transition-all hover:shadow-lg">
                            <div className="relative aspect-square overflow-hidden rounded-lg bg-purpleMuda/10">
                                <Link href={`/product/${product.slug}`}>
                                    <img 
                                        src={`/storage/${product.image}`} 
                                        alt={product.name}
                                        className="h-full w-full object-contain object-center transition-transform duration-300 group-hover:scale-105"
                                    />
                                </Link>
                            </div>

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

                {/* Pagination */}
                {all_products.last_page > 1 && (
                    <div className="flex justify-center space-x-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="rounded-lg border border-purpleTua px-4 py-2 text-purpleTua disabled:opacity-50"
                        >
                            Previous
                        </button>
                        
                        {Array.from({ length: all_products.last_page }, (_, i) => i + 1).map(pageNum => (
                            <button
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum)}
                                className={`rounded-lg px-4 py-2 ${
                                    currentPage === pageNum
                                        ? 'bg-purpleTua text-white'
                                        : 'border border-purpleTua text-purpleTua'
                                }`}
                            >
                                {pageNum}
                            </button>
                        ))}
                        
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === all_products.last_page}
                            className="rounded-lg border border-purpleTua px-4 py-2 text-purpleTua disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}