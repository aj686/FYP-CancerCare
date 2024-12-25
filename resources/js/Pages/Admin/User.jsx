import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import UserAdd from '@/Components/My Components/Admin Comp/UserAdd';
import UserDelete from '@/Components/My Components/Admin Comp/UserDelete';
import UserUpdate from '@/Components/My Components/Admin Comp/UserUpdate';
import Role from '@/Components/My Components/Role';

export default function User({ auth, users, count }) {
    const [activeFilter, setActiveFilter] = useState('all');
    
    const filteredUsers = users.filter(user => {
        if (activeFilter === 'all') return true;
        return user.usertype === activeFilter;
    });

    const userCounts = {
        total: users.length,
        admin: users.filter(user => user.usertype === 'admin').length,
        user: users.filter(user => user.usertype === 'user').length,
    };

    // Function to get badge color based on user type
    const getBadgeColor = (usertype) => {
        const colors = {
            admin: 'bg-blue-100 text-blue-800',
            user: 'bg-gray-100 text-gray-800',
        };
        return colors[usertype] || 'bg-gray-100 text-gray-800';
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">User Management</h2>}
        >
            <Head title="User Management" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <Role activeFilter={activeFilter} onFilterChange={setActiveFilter} />
                        
                        {/* Stats Section */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-6 border-b">
                            {Object.entries(userCounts).map(([type, count]) => (
                                <div 
                                    key={type} 
                                    className={`p-4 rounded-lg ${
                                        type === activeFilter ? 'bg-gray-100 ring-2 ring-gray-200' : 'bg-white'
                                    }`}
                                    onClick={() => setActiveFilter(type === 'total' ? 'all' : type)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="text-sm text-gray-500 capitalize">{type}</div>
                                    <div className="text-2xl font-bold text-gray-900">{count}</div>
                                </div>
                            ))}
                        </div>

                        {/* Header Section */}
                        <div className="p-6 flex justify-between items-center border-b">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {activeFilter === 'all' ? 'All Users' : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Users`}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Showing {filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'}
                                </p>
                            </div>
                            <UserAdd className="float-end" />
                        </div>

                        {/* Table Section */}
                        <div className="p-6">
                            <div className="overflow-x-auto rounded-lg border border-gray-200">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredUsers.length > 0 ? (
                                            filteredUsers.map((user) => (
                                                <tr key={user.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="font-medium text-gray-900">{user.name}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBadgeColor(user.usertype)}`}>
                                                            {user.usertype}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <div className="flex space-x-2">
                                                            <UserUpdate
                                                                className="text-blue-600 hover:text-blue-900"
                                                                userId={`my_modal_3${user.id}`}
                                                                user={user}
                                                            />
                                                            <UserDelete
                                                                className="text-red-600 hover:text-red-900"
                                                                userId={`my_modal_4${user.id}`}
                                                                user={user}
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                                    No users found for the selected filter
                                                </td>
                                            </tr>
                                        )}
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