import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Head} from '@inertiajs/react';
import { useState } from 'react';
import Navbar from '@/Components/Navbar'; // Import your Navbar component
import NavLink from '@/Components/NavLink'; // Import NavLink component
import PrimaryButton from '@/Components/PrimaryButton'; 
import 'flowbite';

export default function PaymentSuccess ({ order_id, message, order }) {
     

    return (
       <>
        <div>
            <h1>{message}</h1>
            <p>Your order ID: {order_id}</p>
            <p>Order Details:</p>
            <ul>
                <li>Amount: ${order.total_price}</li>
                <li>Status: {order.status}</li>
            </ul>
        </div>
        <a href="/homepage"></a>
       </> 
    );
};

