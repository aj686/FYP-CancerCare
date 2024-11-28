import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import PlanAdd from '@/Components/My Components/Admin Comp/Plan/PlanAdd';
import PlanUpdate from '@/Components/My Components/Admin Comp/Plan/PlanUpdate';
import PlanDelete from '@/Components/My Components/Admin Comp/Plan/PlanDelete';
import { PencilIcon, TrashIcon } from 'lucide-react';


export default function Plan({auth, plans, count }) {
    return(
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Plans</h2>}
        >
            <Head title="Payment" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/* Header Section */}
                         <div className="p-6 flex justify-between items-center border-b">
                             <div>
                                 <h3 className="text-lg font-semibold text-gray-900">List Plans</h3>
                                 <p className="text-sm text-gray-600">
                                     Total Plans: {count === 0 ? "No plans created yet" : count}
                                 </p>
                             </div>
                            <PlanAdd className='float-end'/>
                         </div>  
                         
                        {/* Table Section */}
                        <div className="p-6">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stripe Plan</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        { plans.map((plan) => (
                                            <tr key={plan.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{plan.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{plan.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{plan.slug}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="font-medium text-gray-900">{plan.stripe_plan}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="font-medium text-gray-900">{plan.price}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{plan.description}</td> 

                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex space-x-2">
                                                        {/* Update */}
                                                        <PlanUpdate className="text-blue-600 hover:text-blue-900"
                                                            planId = {`my_modal_3${plan.id}`}
                                                            plan = {plan}
                                                        >
                                                            <PencilIcon className="h-5 w-5" />
                                                            <span>Edit</span>
                                                        </PlanUpdate>
                                                        
                                                        {/* Delete */}
                                                        <PlanDelete className="text-red-600 hover:text-red-900"
                                                            planId = {`my_modal_4${plan.id}`}
                                                            plan = {plan}
                                                        >
                                                            <TrashIcon className="h-5 w-5" />
                                                            <span>Delete</span>
                                                        </PlanDelete>
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