import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PencilIcon, TrashIcon } from 'lucide-react'; // Import icons if using lucide-react
import UserAdd from '@/Components/My Components/Admin Comp/UserAdd';
import UserDelete from '@/Components/My Components/Admin Comp/UserDelete';
import UserUpdate from '@/Components/My Components/Admin Comp/UserUpdate';
import Role from '@/Components/My Components/Role';

export default function User({ auth, users, count }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">User Dashboard</h2>}
        >
            <Head title="User" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <Role/>
                        {/* Header Section */}
                         <div className="p-6 flex justify-between items-center border-b">
                             <div>
                                 <h3 className="text-lg font-semibold text-gray-900">List User</h3>
                                 <p className="text-sm text-gray-600">
                                     Total Users: {count === 0 ? "No users yet" : count}
                                 </p>
                             </div>
                            <UserAdd className='float-end'/>
                         </div>  
                         
                        {/* Table Section */}
                        <div className="p-6">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {users.map((user) => (
                                            <tr key={user.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="font-medium text-gray-900">{user.name}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                                {/* <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{user.description}</td> */}
            
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex space-x-2">
                                                    <UserUpdate className="text-blue-600 hover:text-blue-900"
                                                        userId = {`my_modal_3${user.id}`}
                                                        user = {user}
                                                    >
                                                        <PencilIcon className="h-5 w-5" />
                                                        <span>Edit</span>
                                                    </UserUpdate>

                                                    <UserDelete className="text-red-600 hover:text-red-900"
                                                        userId = {`my_modal_4${user.id}`}
                                                        user = {user}
                                                    >
                                                        <TrashIcon className="h-5 w-5" />
                                                        <span>Delete</span>
                                                    </UserDelete>
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


