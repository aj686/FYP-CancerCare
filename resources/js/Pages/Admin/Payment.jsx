import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PencilIcon, TrashIcon } from 'lucide-react'; // Import icons if using lucide-react
import PaymentView from '@/Components/My Components/Admin Comp/Payment/PaymentView';

export default function Payment({ auth, payments, count }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Payments Dashboard</h2>}
        >
            <Head title="Payment" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/* Header Section */}
                         <div className="p-6 flex justify-between items-center border-b">
                             <div>
                                 <h3 className="text-lg font-semibold text-gray-900">List Payments</h3>
                                 <p className="text-sm text-gray-600">
                                     Total Order: {count === 0 ? "No orders yet" : count}
                                 </p>
                             </div>
                            {/* <OrderView className='float-end'/> */}
                         </div>  
                         
                        {/* Table Section */}
                        <div className="p-6">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment ID</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stripe ID</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Number</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {payments.map((payment) => (
                                            <tr key={payment.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.order_id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.stripe_session_id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="font-medium text-gray-900">{payment.user_id}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.ordernumber}</td>
                                                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{payment.amount}</td>
                                                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{payment.payment_method}</td> 
                                                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{payment.payment_status}</td>  
            
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex space-x-2">
                                                        {/* View Detail */}
                                                        <PaymentView
                                                            key={payment.id}
                                                            className="text-blue-600 hover:text-blue-900"
                                                            paymentId={`my_modal_2${payment.id}`}
                                                            payment={payment}
                                                        >
                                                            <PencilIcon className="h-5 w-5" />
                                                            <span>View</span>
                                                        </PaymentView>
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


