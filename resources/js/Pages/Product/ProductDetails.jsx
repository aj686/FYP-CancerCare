import { Head } from '@inertiajs/react';
import React from 'react';
import Navbar from '@/Components/Navbar';
import NavLink from '@/Components/NavLink';
import PrimaryButton from '@/Components/PrimaryButton';
import 'flowbite';
import ViewProduct from '@/Components/My Components/Product/ViewProduct';
import DynamicNavbar from '@/Components/My Components/AboutCancer/DynamicNavbar';
import Footer from '@/Components/My Components/Footer';

export default function ProductDetails({ product }) {
    console.log('Product data:', product);
    
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-white via-purpleMuda/30 to-purpleMuda/50">
                <Head title={`${product?.name || 'Product Details'} - CancerCare Connect`} />
                <DynamicNavbar />

                {/* Wrapper with top padding to prevent content from going under navbar */}
                <main className="pt-16">
                    <ViewProduct product={product} />
                </main>
            </div>

            <Footer />
        </>
        
    );
}