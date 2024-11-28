import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';


export default function Membership({auth, members, count }) {
    return(
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Membership</h2>}
        >
            <Head title="Payment" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/* Header Section */}
                         <div className="p-6 flex justify-between items-center border-b">
                             <div>
                                 <h3 className="text-lg font-semibold text-gray-900">List Membership Joined</h3>
                                 <p className="text-sm text-gray-600">
                                     Total Membership: {count === 0 ? "No membership yet" : count}
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
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stripe Subscription ID</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {members.map((member) => (
                                            <tr key={member.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.user_id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="font-medium text-gray-900">{member.start_date}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="font-medium text-gray-900">{member.end_date}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.status}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.amount}</td>  
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.stripe_subscription_id}</td> 

                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex space-x-2">
                                                        {/* View Detail */}
                                                        {/* <ProductUpdate className="text-blue-600 hover:text-blue-900"
                                                        productId = {`my_modal_3${product.id}`}
                                                        product = {product}
                                                        >
                                                            <PencilIcon className="h-5 w-5" />
                                                            <span>Edit</span>
                                                        </ProductUpdate>

                                                        <ProductDelete className="text-red-600 hover:text-red-900"
                                                            productId = {`my_modal_4${product.id}`}
                                                            product = {product}
                                                        >
                                                            <TrashIcon className="h-5 w-5" />
                                                            <span>Delete</span>
                                                        </ProductDelete> */}
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