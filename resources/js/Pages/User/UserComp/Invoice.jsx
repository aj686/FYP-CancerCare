import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';

export default function Invoice({ order }) {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        setIsReady(true);
    }, [order]);

    useEffect(() => {
        if (isReady) {
            const timer = setTimeout(() => {
                window.print();
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isReady]);

    if (!order) {
        return <div className="p-8">Loading...</div>;
    }

    return (
        <>
            <Head>
                <title>{`Invoice #${order.ordernumber}`}</title>
                <style type="text/css" media="print">
                    {`
                    @page {
                        size: A4;
                        margin: 1cm;
                    }
                    @media print {
                        body {
                            -webkit-print-color-adjust: exact;
                            print-color-adjust: exact;
                        }
                        .no-print {
                            display: none !important;
                        }
                    }
                    `}
                </style>
            </Head>
            
            <div className="min-h-screen bg-white p-8 max-w-4xl mx-auto print:p-4">
                {/* Invoice Header */}
                <div className="mb-8 flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold">INVOICE</h1>
                        <p className="text-gray-600">#{order.ordernumber}</p>
                    </div>
                    <button 
                        onClick={() => window.print()} 
                        className="no-print bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Print Invoice
                    </button>
                </div>

                {/* Bill To Section */}
                <div className="grid grid-cols-2 gap-8 mb-8">
                    <div>
                        <h3 className="font-semibold mb-2">Bill To:</h3>
                        <p>{order.firstname} {order.lastname}</p>
                        <p>{order.address_1}</p>
                        {order.address_2 && <p>{order.address_2}</p>}
                        <p>{order.city}, {order.state} {order.postcode}</p>
                        <p>{order.country}</p>
                        <p>{order.email}</p>
                        <p>{order.phonenumber}</p>
                    </div>
                    <div className="text-right">
                        <p><span className="font-semibold">Invoice Date: </span>
                            {new Date(order.created_at).toLocaleDateString()}</p>
                        <p><span className="font-semibold">Payment Method: </span>
                            {order.payment_method}</p>
                        <p><span className="font-semibold">Order Status: </span>
                            {order.status}</p>
                    </div>
                </div>

                {/* Order Items */}
                <table className="min-w-full mb-8">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left py-2">Item</th>
                            <th className="text-right py-2">Quantity</th>
                            <th className="text-right py-2">Price</th>
                            <th className="text-right py-2">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.order_items?.map((item) => (
                            <tr key={item.id} className="border-b">
                                <td className="py-2">{item.product?.name || 'Product Unavailable'}</td>
                                <td className="text-right py-2">{item.quantity}</td>
                                <td className="text-right py-2">
                                    RM{Number(item.price).toFixed(2)}
                                </td>
                                <td className="text-right py-2">
                                    RM{(Number(item.quantity) * Number(item.price)).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                        <tr className="font-bold">
                            <td colSpan="3" className="text-right py-4">Total:</td>
                            <td className="text-right py-4">
                                RM{Number(order.total_price).toFixed(2)}
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* Footer */}
                <div className="text-center text-gray-600 text-sm mt-8 print:mt-16">
                    <p>Thank you for your business!</p>
                </div>
            </div>
        </>
    );
}