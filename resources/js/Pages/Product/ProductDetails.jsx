import { Head } from '@inertiajs/react';
import React from 'react';
import Navbar from '@/Components/Navbar'; // Import your Navbar component
import NavLink from '@/Components/NavLink'; // Import NavLink component
import PrimaryButton from '@/Components/PrimaryButton';
import 'flowbite';
import ViewProduct from '@/Components/My Components/Product/ViewProduct';
import DynamicNavbar from '@/Components/My Components/AboutCancer/DynamicNavbar';

export default function ProductDetails( {product} ) {
    console.log('Product data:', product);
    return (
        <>
            <Head title="ProductDetails" />
            <DynamicNavbar />

            <ViewProduct product = {product}/>
            
        </>
    );
}
