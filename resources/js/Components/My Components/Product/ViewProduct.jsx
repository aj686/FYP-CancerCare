import React from 'react';
import 'flowbite';

export default function ViewProduct( {product} ) {
    // debug
    if (!product) {

        return <div>Product not found</div>
    }

    return (
        <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
            <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
                <img className="w-full dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg" alt="" />
                <img className="w-full hidden dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg" alt="" />
                </div>

                    <div className="mt-6 sm:mt-8 lg:mt-0">
                        {/* name */}
                    <h1
                        className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"
                    >
                        {product.name}
                    </h1>
                    <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                        {/* price */}
                        <p
                        className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white"
                        >
                         {product.price}
                        </p>
                        
                    </div>

                    <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                        <a
                        href="#"
                        title=""
                        className="text-white mt-4 sm:mt-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-center"
                        role="button"
                        >
                        <svg
                            className="w-5 h-5 -ms-2 me-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                            />
                        </svg>

                        Add to cart
                        </a>
                    </div>

                    <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

                    {/* description */}
                    <p className="mb-6 text-gray-500 dark:text-gray-400">
                        {product.description}  
                    </p>
                    </div>
            
            </div>
            </div>
        </section>
    );
}   