import { Head} from '@inertiajs/react';
import { useState } from 'react';
import React from 'react';
import Navbar from '@/Components/Navbar'; // Import your Navbar component
import NavLink from '@/Components/NavLink'; // Import NavLink component
import PrimaryButton from '@/Components/PrimaryButton'; 
import 'flowbite';
import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/inertia-react';
import { loadStripe } from '@stripe/stripe-js';

// // Load Stripe publicsheable key
// const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);
    
// props order send object data as name, price, quantity = 1
export default function Checkout( {order} ) {

    const [loading, setLoading] = useState(false);

    // use useForm hook to handle form state and submission
    const { data, setData, post, errors } = useForm({
        email: '',
        firstname: '',
        lastname: '',
        address_1: '',
        address_2: '',
        city: '',
        country: '',
        state: '',
        postcode: '',
        phonenumber: '',
        // payment_method: '', 
        // cart: order,  // The cart data from the Laravel backend
        // _token: document.querySelector('meta[name="csrf-token"]').getAttribute('content') // Add CSRF token
    })

    // handle form submit 
    const handleSubmit = (e) => {
        e.preventDefault();

        // Disable button while processing
        setLoading(true);

        // Send a POST request using Inertia to create the order and get the payment URL
        post('/checkout', {
            onSuccess: (page) => {
                const { payment_url } = page.props; // Get payment_url from the response

                if (payment_url) {
                    // Redirect to the Stripe payment page
                    window.location.href = payment_url;
                } else {
                    console.error('No payment URL found.');
                    setLoading(false); // Re-enable the button if there's an issue
                }
            },
            onError: (errors) => {
                console.error('Order placement failed:', errors);
                setLoading(false); // Re-enable the button on error
            },
        });
    }

    // Calculate Total Price
    const getTotalPrice = () => {
        return Object.keys(order).reduce((total, key) => {
            return total + (order[key].price * order[key].quantity);
          }, 0);
    };

    // Total Price including shipping
    const getTotalPriceAfterShipping = () => {
        const shippingPrice = 10; // Assuming shipping cost is 10
        const totalPrice = Object.keys(order).reduce((total, key) => {
            return total + (order[key].price * order[key].quantity);
        }, 0);
        return totalPrice + shippingPrice;
    };

    return(
        <>
        <Head title="Checkout" />
            <Navbar>
                {/* Pass NavLink components as children to Navbar */}
                <li>
                    <NavLink href="/homepage" classNameName="text-black">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink href="/cancer-information" classNameName="text-black">
                        Cancer
                    </NavLink>
                </li>
                <li>
                    <NavLink href="/get-involved" classNameName="text-black">
                        Get Involved
                    </NavLink>
                </li>
                <li>
                    <NavLink href="/our-research" classNameName="text-black">
                        Our Research
                    </NavLink>
                </li>
                <li>
                    <NavLink href="/product" classNameName="text-black">
                        Shop with Us
                    </NavLink>
                </li>
                <li>
                    <NavLink href="/about" classNameName="text-black">
                        About
                    </NavLink>
                </li>
                <li>
                    <NavLink href="/login" classNameName="text-white">
                        <PrimaryButton
                            classNameName="bg-blue-500 hover:bg-blue-700">
                            Login
                        </PrimaryButton>
                    </NavLink>
                </li>
                <li>
                    <NavLink href="/register" classNameName="text-white">
                        <PrimaryButton>
                            Register
                        </PrimaryButton>
                    </NavLink>
                </li>
                <li>
                    <NavLink href="/order" classNameName="text-black">
                        <span className="sr-only">
                            order
                        </span>
                        <svg className="w-5 h-5 lg:me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/>
                        </svg>   
                    </NavLink>
                </li>
            </Navbar>

            {/* Checkout Section */}
            <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
                <form action="#" className="mx-auto max-w-screen-xl px-4 2xl:px-0" onSubmit={handleSubmit}> 
                    <ol className="items-center flex w-full max-w-2xl text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
                    <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
                        <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                        <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        order
                        </span>
                    </li>

                    <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
                        <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                        <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        Checkout
                        </span>
                    </li>

                    <li className="flex shrink-0 items-center">
                        <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        Order summary
                    </li>
                    </ol>

                    <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                    <div className="min-w-0 flex-1 space-y-8">
                        <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Delivery Details</h2>
                            <div>
                                <label for="email" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Email Address </label>
                                <input  name='email' type="email" id="email" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" 
                                    placeholder="" 
                                    required 
                                    value={data.email}
                                    onChange={ e => setData('email', e.target.value)}
                                />
                                {errors.email && <span className="error">{errors.email}</span>}
                            </div>    
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label for="firstname" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> First Name </label>
                                    <input name='firstname' type="text" id="firstname" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" 
                                        placeholder="" 
                                        required 
                                        value={data.firstname}
                                        onChange={ e => setData('firstname', e.target.value)}
                                    />
                                    {errors.firstname && <span className="error">{errors.firstname}</span>}
                                </div>

                                <div>
                                    <label for="lastname" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Last Name </label>
                                    <input name='lastname' type="text" id="lastname" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" 
                                        placeholder="" 
                                        required 
                                        value={data.lastname}
                                        onChange={ e => setData('lastname', e.target.value)}
                                    />
                                    {errors.lastname && <span className="error">{errors.lastname}</span>}
                                </div>   
                            </div>
                            <div>
                                <label for="address_1" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Address 1 </label>
                                <input name='address_1' type="text" id="address_1" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" 
                                    placeholder="" 
                                    required 
                                    value={data.address_1}
                                    onChange={ e => setData('address_1', e.target.value)}
                                />
                                {errors.address_1 && <span className="error">{errors.address_1}</span>}
                            </div>
                            <div>
                                <label for="address_2" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Address 2 </label>
                                <input name='address_2' type="text" id="address_2" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" 
                                    placeholder="" 
                                    required 
                                    value={data.address_2}
                                    onChange={ e => setData('address_2', e.target.value)}
                                />
                                {errors.address_2 && <span className="error">{errors.address_2}</span>}
                            </div>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <div>
                                    <label for="city" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> City </label>
                                    <input name='city' type="text" id="city" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" 
                                        placeholder="" 
                                        required 
                                        value={data.city}
                                        onChange={ e => setData('city', e.target.value)}
                                    />
                                    {errors.city && <span className="error">{errors.city}</span>}
                                </div>

                                <div>
                                    <label for="country" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Country </label>
                                    <input name='country' type="text" id="country" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" 
                                        placeholder="" 
                                        required 
                                        value={data.country}
                                        onChange={ e => setData('country', e.target.value)}
                                    />
                                    {errors.country && <span className="error">{errors.country}</span>}
                                </div>   
                                <div>
                                    <label for="state" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> State </label>
                                    <input name='state' type="text" id="state" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" 
                                        placeholder="" 
                                        required 
                                        value={data.state}
                                        onChange={ e => setData('state', e.target.value)}
                                    />
                                    {errors.state && <span className="error">{errors.state}</span>}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label for="postcode" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Postcode </label>
                                    <input name='postcode' type="text" id="postcode" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                        placeholder="" 
                                        required 
                                        value={data.postcode}
                                        onChange={ e => setData('postcode', e.target.value)}
                                    />
                                    {errors.postcode && <span className="error">{errors.postcode}</span>}
                                </div> 
                                <div>
                                    <label for="phonenumber" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Phone Number </label>
                                    <input name='phonenumber' type="text" id="phonenumber" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" 
                                        placeholder="" 
                                        required 
                                        value={data.phonenumber}
                                        onChange={ e => setData('phonenumber', e.target.value)}
                                    />
                                    {errors.phonenumber && <span className="error">{errors.phonenumber}</span>}
                                </div>   
                                {/* Payment Method */}
                                {/* <div>
                                    <label htmlFor="payment_method" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Payment Method</label>
                                    <select name="payment_method" id="payment_method" className="block w-full rounded-lg border p-2.5 text-sm" 
                                        required 
                                        value={data.payment_method}
                                        onChange={e => setData('payment_method', e.target.value)}
                                    >
                                        <option value="">Select a payment method</option>
                                        <option value="credit_card">Credit Card</option>
                                        <option value="paypal">PayPal</option>
                                        <option value="bank_transfer">Bank Transfer</option>
                                    </select>
                                    {errors.payment_method && <span className="error">{errors.payment_method}</span>}
                                </div> */}
                            </div>
                        </div>
                    </div>


                    <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
                        <div className="flow-root">
                        <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                        <div class="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                            <div class="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                                <div class="space-y-6">
                                <div>
                                    {Object.keys(order).length === 0 ? (
                                        <p>Your order is empty.</p>
                                    ) : (
                                        <ul>
                                        {Object.keys(order).map((key) => (
                                            <li key={key}>
                                            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                                                <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                                {/* Image Section */}
                                                <a href="#" className="shrink-0 md:order-1">
                                                    <img
                                                    className="h-20 w-20 dark:hidden"
                                                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                                                    alt={order[key].name}
                                                    />
                                                    <img
                                                    className="hidden h-20 w-20 dark:block"
                                                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                                                    alt={order[key].name}
                                                    />
                                                </a>

                                                {/* Quantity Control */}
                                                <div className="flex items-center justify-between md:order-3 md:justify-end">
                                                    {/* Price Section */}
                                                    <div className="text-end md:order-4 md:w-32">
                                                    <p className="text-base font-bold text-gray-900 dark:text-white">
                                                        RM{order[key].price}
                                                    </p>
                                                    </div>
                                                </div>

                                                {/* Product Details */}
                                                <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                                    <a
                                                    href="#"
                                                    className="text-base font-medium text-gray-900 hover:underline dark:text-white"
                                                    >
                                                    {order[key].name}
                                                    </a>

                                                    <div className="flex items-center ">
                                                    {/* Remove Button */}
                                                    <p>Quantity:</p>
                                                    <input
                                                        type="text"
                                                        id="counter-input"
                                                        className="w-10 shrink-0 border-0 bg-transparent text-sm font-medium text-gray-900 focus:outline-none dark:text-white"
                                                        value={order[key].quantity}
                                                        readOnly
                                                    />
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                            </li>
                                        ))}
                                        </ul>
                                    )}
                                    </div>
                                </div>
                            </div>
                            </div>
                            <hr />
                            <dl className="flex items-center justify-between gap-4 py-3">
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Subtotal</dt>
                            <dd className="text-base font-medium text-gray-900 dark:text-white">RM{getTotalPrice()}</dd>
                            </dl>

                            {/* <dl className="flex items-center justify-between gap-4 py-3">
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                            <dd className="text-base font-medium text-green-500">0</dd>
                            </dl> */}

                            {/* <dl className="flex items-center justify-between gap-4 py-3">
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Store Pickup</dt>
                            <dd className="text-base font-medium text-gray-900 dark:text-white">$99</dd>
                            </dl> */}

                            <dl className="flex items-center justify-between gap-4 py-3">
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Shipping</dt>
                            <dd className="text-base font-medium text-gray-900 dark:text-white">RM10</dd>
                            </dl>

                            <dl className="flex items-center justify-between gap-4 py-3">
                            <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                            <dd className="text-base font-bold text-gray-900 dark:text-white">RM{getTotalPriceAfterShipping()}</dd>
                            </dl>
                        </div>
                        </div>

                        <div className="space-y-3">
                        <button disabled={loading} type="submit" className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            {loading ? 'Processing...' : 'Pay Now'}
                        </button>

                        <p className="text-sm font-normal text-gray-500 dark:text-gray-400">One or more items in your order require an account. <a href="#" title="" className="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">Sign in or create an account now.</a>.</p>
                        </div>
                    </div>
                    </div>
                </form>
            </section>
        </>
    );
}

