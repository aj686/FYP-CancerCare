import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { EyeIcon } from 'lucide-react';
import OrderView from '@/Components/My Components/Admin Comp/Order/OrderView';

export default function Order({ auth, orders, count }) {
    const { post, processing } = useForm();

    const formatPrice = (price) => {
        return `RM ${parseFloat(price).toFixed(2)}`;
    };

    const handleStatusChange = (orderId, newStatus) => {
        post(route('admin.orders.updateStatus', orderId), {
            data: { status: newStatus },
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Order Dashboard</h2>}
        >
            <Head title="Order" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/* Header Section */}
                        <div className="p-6 flex justify-between items-center border-b">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">List Orders</h3>
                                <p className="text-sm text-gray-600">
                                    Total Orders: {count === 0 ? "No orders yet" : count}
                                </p>
                            </div>
                        </div>

                        {/* Table Section */}
                        <div className="p-6">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
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
                                        {orders.map((order) => (
                                            <tr key={order.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {order.id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {order.user_id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">#{order.ordernumber}</div>
                                                    <div className="text-sm text-gray-500">{order.email}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {order.firstname}
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
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                                        ${order.shipping_status === 'delivered' ? 'bg-green-100 text-green-800' : 
                                                        order.shipping_status === 'processing' ? 'bg-blue-100 text-blue-800' : 
                                                        'bg-gray-100 text-gray-800'}`}>
                                                        {order.shipping_status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    {/* <button
                                                        onClick={() => document.getElementById(`order-modal-${order.id}`).showModal()}
                                                        className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                                                    >
                                                        <EyeIcon className="h-4 w-4" />
                                                        View
                                                    </button> */}
                                                    <OrderView
                                                        orderId={`order-modal-${order.id}`}
                                                        order={order}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}