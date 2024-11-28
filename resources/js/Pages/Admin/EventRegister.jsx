import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';


export default function EventRegister({auth, events_register, count }) {
    return(
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Event Register</h2>}
        >
            <Head title="Payment" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/* Header Section */}
                         <div className="p-6 flex justify-between items-center border-b">
                             <div>
                                 <h3 className="text-lg font-semibold text-gray-900">List Event Register</h3>
                                 <p className="text-sm text-gray-600">
                                     Total Registration: {count === 0 ? "No user register yet" : count}
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
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event ID</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {events_register.map((register) => (
                                            <tr key={register.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{register.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{register.events_id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="font-medium text-gray-900">{register.user_id}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{register.status}</td> 
            
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