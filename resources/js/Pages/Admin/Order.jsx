import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { EyeIcon, TruckIcon } from 'lucide-react';
import { useState } from 'react';
import OrderView from '@/Components/My Components/Admin Comp/Order/OrderView';
import SalesDashboard from '@/Components/My Components/Admin Comp/Order/SalesDashboard';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Order({ auth, orders, count }) {
    const [isShippingModalOpen, setIsShippingModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const { data, setData, post, processing } = useForm({
        tracking_number: '',
        courier_name: '',
        shipping_status: ''
    });

    // Filter orders based on search
    const filteredOrders = orders.filter(order => {
        const searchStr = searchTerm.toLowerCase();
        return (
            order.ordernumber?.toLowerCase().includes(searchStr) ||
            order.email?.toLowerCase().includes(searchStr) ||
            order.firstname?.toLowerCase().includes(searchStr) ||
            order.lastname?.toLowerCase().includes(searchStr) ||
            order.city?.toLowerCase().includes(searchStr) ||
            order.state?.toLowerCase().includes(searchStr)
        );
    });

    // Pagination calculations
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

    const formatPrice = (price) => {
        return `RM ${parseFloat(price).toFixed(2)}`;
    };
    
    const handleStatusChange = (orderId, newStatus) => {
        post(route('admin.orders.updateStatus', orderId), {
            data: { status: newStatus },
            preserveScroll: true,
        });
    };

    const handleShippingStatusChange = (orderId, newStatus) => {
        post(route('admin.orders.updateShippingStatus', orderId), {
            data: { shipping_status: newStatus },
            preserveScroll: true,
        });
    };

    const openShippingModal = (order) => {
        setSelectedOrder(order);
        setData({
            tracking_number: order.tracking_number || '',
            courier_name: order.courier_name || '',
            shipping_status: order.shipping_status || ''
        });
        setIsShippingModalOpen(true);
    };

    const handleShippingSubmit = (e) => {
        e.preventDefault();
        post(route('admin.orders.updateShippingStatus', selectedOrder.id), {
            data: {
                shipping_status: data.shipping_status,
                tracking_number: data.tracking_number,
                courier_name: data.courier_name
            },
            onSuccess: () => {
                setIsShippingModalOpen(false);
                setSelectedOrder(null);
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Order Dashboard</h2>}
        >
            <Head title="Order" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <SalesDashboard orders={orders} />
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/* Header Section with Search */}
                        <div className="p-6 flex justify-between items-center border-b">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">List Orders</h3>
                                <p className="text-sm text-gray-600">
                                    Total Orders: {count === 0 ? "No orders yet" : count}
                                </p>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search orders..."
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        {/* Table Section */}
                        <div className="p-6">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Info</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shipping</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {currentItems.map((order) => (
                                            <tr key={order.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {order.id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">#{order.ordernumber}</div>
                                                    <div className="text-sm text-gray-500">{order.email}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {order.firstname} {order.lastname}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{order.city}</div>
                                                    <div className="text-sm text-gray-500">{order.state}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {formatPrice(order.total_price)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {order.payment_method}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <select 
                                                        className={`text-sm rounded-full px-3 py-1 font-semibold ${
                                                            order.status === 'paid' ? 'bg-green-100 text-green-800' : 
                                                            order.status === 'canceled' ? 'bg-red-100 text-red-800' : 
                                                            'bg-yellow-100 text-yellow-800'
                                                        }`}
                                                        value={order.status || 'default'}
                                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                        disabled={processing}
                                                    >
                                                        <option value="default">Pending</option>
                                                        <option value="paid">Paid</option>
                                                        <option value="canceled">Canceled</option>
                                                    </select>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <select 
                                                        className={`text-sm rounded-full px-3 py-1 font-semibold ${
                                                            order.shipping_status === 'delivered' ? 'bg-green-100 text-green-800' : 
                                                            order.shipping_status === 'processing' ? 'bg-blue-100 text-blue-800' : 
                                                            order.shipping_status === 'shipped' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-gray-100 text-gray-800'
                                                        }`}
                                                        value={order.shipping_status}
                                                        onChange={(e) => handleShippingStatusChange(order.id, e.target.value)}
                                                        disabled={processing}
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="processing">Processing</option>
                                                        <option value="shipped">Shipped</option>
                                                        <option value="delivered">Delivered</option>
                                                    </select>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex space-x-3">
                                                        <button
                                                            onClick={() => openShippingModal(order)}
                                                            className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                                                        >
                                                            <TruckIcon className="h-4 w-4" />
                                                            Shipping
                                                        </button>
                                                        <OrderView
                                                            orderId={`order-modal-${order.id}`}
                                                            order={order}
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="mt-4 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                                <div className="flex flex-1 justify-between sm:hidden">
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                                            currentPage === 1
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                : 'bg-white text-gray-700 hover:bg-gray-50 border'
                                        }`}
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        className={`relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                                            currentPage === totalPages
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                : 'bg-white text-gray-700 hover:bg-gray-50 border'
                                        }`}
                                    >
                                        Next
                                    </button>
                                </div>
                                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm text-gray-700">
                                            Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                                            <span className="font-medium">
                                                {Math.min(indexOfLastItem, filteredOrders.length)}
                                            </span>{' '}
                                            of <span className="font-medium">{filteredOrders.length}</span> results
                                        </p>
                                    </div>
                                    <div>
                                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                            <button
                                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                                disabled={currentPage === 1}
                                                className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-sm font-medium ${
                                                    currentPage === 1
                                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                        : 'bg-white text-gray-700 hover:bg-gray-50 border'
                                                }`}
                                            >
                                                Previous
                                            </button>
                                            {[...Array(totalPages)].map((_, index) => (
                                                <button
                                                    key={index + 1}
                                                    onClick={() => setCurrentPage(index + 1)}
                                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                                                        currentPage === index + 1
                                                            ? 'z-10 bg-blue-600 text-white focus:z-20'
                                                            : 'bg-white text-gray-700 hover:bg-gray-50 border-t border-b'
                                                    }`}
                                                >
                                                    {index + 1}
                                                </button>
                                            ))}
                                            <button
                                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                                disabled={currentPage === totalPages}
                                                className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-sm font-medium ${
                                                    currentPage === totalPages
                                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                        : 'bg-white text-gray-700 hover:bg-gray-50 border'
                                                }`}
                                            >
                                                Next
                                            </button>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Shipping Update Modal */}
            {isShippingModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h3 className="text-lg font-bold mb-4">Update Shipping Information</h3>
                        
                        <form onSubmit={handleShippingSubmit}>
                            {/* Courier Selection */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Courier</label>
                                <select 
                                    value={data.courier_name}
                                    onChange={e => setData('courier_name', e.target.value)}
                                    className="w-full rounded border-gray-300"
                                    required
                                >
                                    <option value="">Select Courier</option>
                                    <option value="J&T Express">J&T Express</option>
                                    <option value="Pos Laju">Pos Laju</option>
                                    <option value="DHL">DHL</option>
                                    <option value="FedEx">FedEx</option>
                                </select>
                            </div>

                            {/* Tracking Number */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Tracking Number</label>
                                <input
                                    type="text"
                                    value={data.tracking_number}
                                    onChange={e => setData('tracking_number', e.target.value)}
                                    className="w-full rounded border-gray-300"
                                    required
                                    placeholder="Enter tracking number"
                                />
                            </div>

                            {/* Shipping Status */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Status</label>
                                <select 
                                    value={data.shipping_status}
                                    onChange={e => setData('shipping_status', e.target.value)}
                                    className="w-full rounded border-gray-300"
                                    required
                                >
                                    <option value="processing">Processing</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="delivered">Delivered</option>
                                </select>
                            </div>

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsShippingModalOpen(false)}
                                    className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                                >
                                    Update & Send Email
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}