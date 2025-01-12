import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useMemo, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function EventRegister({ auth, events_register, events_analytics, statistics, count }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Calculate actual statistics based on events_register data
    const calculatedStats = useMemo(() => {
        const totalRegistered = events_register?.filter(reg => reg.status === 'registered').length || 0;
        const totalCancelled = events_register?.filter(reg => reg.status === 'cancelled').length || 0;
        
        return {
            ...statistics,
            total_registrations: totalRegistered,
            total_cancelled: totalCancelled
        };
    }, [events_register, statistics]);

    // Process events data to ensure consistent registration counts
    const processedEventsAnalytics = useMemo(() => {
        return events_analytics?.map(event => {
            const registeredCount = events_register?.filter(
                reg => reg.event?.id === event.id && reg.status === 'registered'
            ).length || 0;

            return {
                ...event,
                registered_count: registeredCount,
                available_spots: Math.max(0, event.total_spots - registeredCount),
                registration_percentage: (registeredCount / event.total_spots) * 100
            };
        }) || [];
    }, [events_analytics, events_register]);

    // Filter registrations based on search
    const filteredRegistrations = useMemo(() => {
        return events_register?.filter(register => {
            const searchStr = searchTerm.toLowerCase();
            return (
                register.event?.title?.toLowerCase().includes(searchStr) ||
                register.user?.name?.toLowerCase().includes(searchStr) ||
                register.user?.email?.toLowerCase().includes(searchStr) ||
                register.status?.toLowerCase().includes(searchStr)
            );
        }) || [];
    }, [events_register, searchTerm]);

    // Pagination calculations
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredRegistrations.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredRegistrations.length / itemsPerPage);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
            <AuthenticatedLayout
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Event Registration Dashboard</h2>}
            >
                <Head title="Event Registration" />

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        {/* Statistics Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                            <div className="bg-white rounded-lg shadow p-6">
                                <h3 className="text-lg font-semibold text-gray-700">Total Events</h3>
                                <p className="text-3xl font-bold text-blue-600">{calculatedStats?.total_events || 0}</p>
                            </div>
                            <div className="bg-white rounded-lg shadow p-6">
                                <h3 className="text-lg font-semibold text-gray-700">Active Registrations</h3>
                                <p className="text-3xl font-bold text-green-600">{calculatedStats?.total_registrations || 0}</p>
                            </div>
                            <div className="bg-white rounded-lg shadow p-6">
                                <h3 className="text-lg font-semibold text-gray-700">Cancelled Registrations</h3>
                                <p className="text-3xl font-bold text-red-600">{calculatedStats?.total_cancelled || 0}</p>
                            </div>
                            <div className="bg-white rounded-lg shadow p-6">
                                <h3 className="text-lg font-semibold text-gray-700">Active Events</h3>
                                <p className="text-3xl font-bold text-purple-600">{calculatedStats?.active_events || 0}</p>
                            </div>
                        </div>

                        {/* Events Overview */}
                        <div className="bg-white shadow rounded-lg mb-6">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Events Overview</h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event Title</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Spots</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Registered</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Available</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fill Rate</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {processedEventsAnalytics.map((event) => (
                                                <tr key={event.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {event.title}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {event.total_spots}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {event.registered_count}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {event.available_spots}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                                <div 
                                                                    className="bg-blue-600 h-2.5 rounded-full" 
                                                                    style={{ width: `${event.registration_percentage}%` }}
                                                                ></div>
                                                            </div>
                                                            <span className="ml-2 text-sm text-gray-600">
                                                                {Math.round(event.registration_percentage)}%
                                                            </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Detailed Registrations */}
                        <div className="bg-white shadow rounded-lg">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Registration Details</h3>
                                    <div className="relative w-64">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Search registrations..."
                                            value={searchTerm}
                                            onChange={(e) => {
                                                setSearchTerm(e.target.value);
                                                setCurrentPage(1);
                                            }}
                                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User Name</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Registration Date</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {currentItems.map((register) => (
                                                <tr key={register.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {register.id}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {register.event?.title || 'N/A'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="font-medium text-gray-900">
                                                            {register.user?.name || 'N/A'}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {register.user?.email || 'N/A'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                            register.status === 'registered' 
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-red-100 text-red-800'
                                                        }`}>
                                                            {register.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {new Date(register.created_at).toLocaleDateString()}
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
                                            onClick={() => paginate(currentPage - 1)}
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
                                            onClick={() => paginate(currentPage + 1)}
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
                                                    {Math.min(indexOfLastItem, filteredRegistrations.length)}
                                                </span>{' '}
                                                of <span className="font-medium">{filteredRegistrations.length}</span> results
                                            </p>
                                        </div>
                                        <div>
                                            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                                <button
                                                    onClick={() => paginate(currentPage - 1)}
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
                                                        onClick={() => paginate(index + 1)}
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
                                                onClick={() => paginate(currentPage + 1)}
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
        </AuthenticatedLayout>
    );
}