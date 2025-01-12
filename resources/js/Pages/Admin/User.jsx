import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import UserAdd from '@/Components/My Components/Admin Comp/UserAdd';
import UserDelete from '@/Components/My Components/Admin Comp/UserDelete';
import UserUpdate from '@/Components/My Components/Admin Comp/UserUpdate';
import Role from '@/Components/My Components/Role';
import { CreditCard, XCircle } from 'lucide-react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function User({ auth, users, count, subscribedCount }) {
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filter users based on type and search
    const filteredUsers = users.filter(user => {
        const matchesFilter = activeFilter === 'all' ? true :
            activeFilter === 'subscribed' ? (user.usertype === 'user' && user.hasActiveMembership) :
            user.usertype === activeFilter;

        const searchStr = searchTerm.toLowerCase();
        const matchesSearch = user.name?.toLowerCase().includes(searchStr) ||
            user.email?.toLowerCase().includes(searchStr) ||
            user.usertype?.toLowerCase().includes(searchStr);

        return matchesFilter && matchesSearch;
    });

    // Pagination calculations
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    
    const userCounts = {
        total: users.length,
        admin: users.filter(user => user.usertype === 'admin').length,
        user: users.filter(user => user.usertype === 'user').length,
        subscribed: users.filter(user => user.usertype === 'user' && user.hasActiveMembership).length
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

                        {/* Header Section with Search */}
                        <div className="p-6 flex justify-between items-center border-b">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {activeFilter === 'all' ? 'All Users' : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Users`}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Showing {filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'}
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search users..."
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>
                                <UserAdd className="float-end" />
                            </div>
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
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscription</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {currentItems.length > 0 ? (
                                            currentItems.map((user) => (
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
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {user.usertype === 'user' && (
                                                            user.hasActiveMembership ? (
                                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                    <CreditCard className="w-4 h-4 mr-1" />
                                                                    Subscribed
                                                                </span>
                                                            ) : (
                                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                                    <XCircle className="w-4 h-4 mr-1" />
                                                                    Not Subscribed
                                                                </span>
                                                            )
                                                        )}
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
                                                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                                    No users found for the selected filter
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {filteredUsers.length > 0 && (
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
                                                    {Math.min(indexOfLastItem, filteredUsers.length)}
                                                </span>{' '}
                                                of <span className="font-medium">{filteredUsers.length}</span> results
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
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}