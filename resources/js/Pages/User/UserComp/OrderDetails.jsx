import React from 'react';

export default function OrderDetails({ order, isOpen, onClose }) {
    if (!isOpen || !order) return null;

    // Calculate subtotal from order items
    const subtotal = order.order_items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const shippingFee = 10;
    const total = subtotal + shippingFee;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative min-h-screen flex items-center justify-center p-4">
                <div className="relative bg-white rounded-lg max-w-3xl w-full shadow-xl">
                    {/* Header */}
                    <div className="border-b px-6 py-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Order #{order.ordernumber} Details
                            </h3>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <span className="sr-only">Close</span>
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                        <div className="space-y-6">
                            {/* Order and Customer Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-lg font-semibold mb-2">Order Information</h4>
                                    <div className="space-y-1 text-sm">
                                        <p><span className="font-medium">Date:</span> {new Date(order.created_at).toLocaleDateString()}</p>
                                        <p><span className="font-medium">Status:</span> {order.status}</p>
                                        <p><span className="font-medium">Payment Method:</span> {order.payment_method}</p>
                                        <p><span className="font-medium">Shipping Status:</span> {order.shipping_status}</p>
                                        <p><span className="font-medium">Total:</span> RM{order.total_price}</p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-lg font-semibold mb-2">Customer Information</h4>
                                    <div className="space-y-1 text-sm">
                                        <p>{order.firstname} {order.lastname}</p>
                                        <p>{order.email}</p>
                                        <p>{order.phonenumber}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div>
                                <h4 className="text-lg font-semibold mb-2">Shipping Address</h4>
                                <div className="text-sm">
                                    <p>{order.address_1}</p>
                                    {order.address_2 && <p>{order.address_2}</p>}
                                    <p>{order.city}, {order.state} {order.postcode}</p>
                                    <p>{order.country}</p>
                                </div>
                            </div>

                            {/* Order Items */}
                            {order.order_items && (
                                <div>
                                    <h4 className="text-lg font-semibold mb-2">Order Items</h4>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead>
                                                <tr>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {order.order_items.map((item) => (
                                                    <tr key={item.id}>
                                                        <td className="px-4 py-2 text-sm">{item.product?.name || 'Product Not Found'}</td>
                                                        <td className="px-4 py-2 text-sm">{item.quantity}</td>
                                                        <td className="px-4 py-2 text-sm">RM{item.price}</td>
                                                        <td className="px-4 py-2 text-sm">RM{item.quantity * item.price}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Order Summary */}
                                    <div className="mt-4 border-t pt-4">
                                        <div className="flex justify-end space-y-2">
                                            <div className="w-64">
                                                <div className="flex justify-between text-sm mb-2">
                                                    <span className="font-medium">Subtotal:</span>
                                                    <span>RM{subtotal}</span>
                                                </div>
                                                <div className="flex justify-between text-sm mb-2">
                                                    <span className="font-medium">Shipping Fee:</span>
                                                    <span>RM{shippingFee}</span>
                                                </div>
                                                <div className="flex justify-between text-base font-semibold border-t pt-2">
                                                    <span>Total:</span>
                                                    <span>RM{total}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t px-6 py-4">
                        <div className="flex justify-end">
                            <button
                                onClick={onClose}
                                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}