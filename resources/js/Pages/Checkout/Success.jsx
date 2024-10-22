import React from 'react';

export default function Success( {orderId} ) {
    return (
        <>
            <div>
                <h1>Order Confirmation</h1>
                <p>Your order #{orderId} has been successfully placed!</p>
                <a href="/homepage">Go to Homepage</a>
            </div>
        </>
    )
}