import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { EyeIcon, TruckIcon } from 'lucide-react';

export default function Order({ auth, orders, count }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Order Dashboard</h2>}
        >
            <Head title="Order" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 flex justify-between items-center border-b">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">My Orders</h3>
                                <p className="text-sm text-gray-600">
                                    Total Orders: {count === 0 ? "No orders yet" : count}
                                </p>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order #</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shipping</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {orders.map((order) => (
                                            <tr key={order.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#{order.ordernumber}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {order.firstname} {order.lastname}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.phonenumber}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    ${order.total_price}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                        ${order.status === 'paid' ? 'bg-green-100 text-green-800' : 
                                                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                                          'bg-red-100 text-red-800'}`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                        ${order.shipping_status === 'delivered' ? 'bg-green-100 text-green-800' : 
                                                          order.shipping_status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                                          order.shipping_status === 'processing' ? 'bg-yellow-100 text-yellow-800' : 
                                                          'bg-gray-100 text-gray-800'}`}>
                                                        {order.shipping_status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.payment_method}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex space-x-2">
                                                        <button className="text-blue-600 hover:text-blue-900 flex items-center space-x-1">
                                                            <EyeIcon className="h-5 w-5" />
                                                            <span>Details</span>
                                                        </button>
                                                        <button className="text-green-600 hover:text-green-900 flex items-center space-x-1">
                                                            <TruckIcon className="h-5 w-5" />
                                                            <span>Track</span>
                                                        </button>
                                                    </div>
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