import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

const PaymentCancel = ({ order_id, message, order }) => {
    return (
        <div>
            <h1>{message}</h1>
            <p>Your order ID: {order_id}</p>
            <p>The payment for this order was canceled. You can try again or contact support.</p>
            <InertiaLink href="/orders">View Orders</InertiaLink>
        </div>
    );
};

export default PaymentCancel;
