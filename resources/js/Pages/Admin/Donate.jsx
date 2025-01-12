import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { format } from 'date-fns';
import StatCard from '@/Components/My Components/Admin Comp/StatCard';

export default function Donate({ donations, statistics, donationsByType }) {
    const [filterType, setFilterType] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filter donations based on type and search term
    const filteredDonations = donations?.filter(donation => {
        const matchesType = filterType === 'all' || donation.type === filterType;
        const matchesSearch = donation.donor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            donation.email.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesType && matchesSearch;
    }) || [];

    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredDonations.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredDonations.length / itemsPerPage);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <AuthenticatedLayout>
            <Head title="Donations Management" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-semibold text-gray-900">Donations Management</h2>

                    {/* Statistics Cards */}
                    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        <StatCard
                            title="Total Donations"
                            value={statistics.total_donations}
                            subValue={`RM ${statistics.total_amount.toFixed(2)}`}
                        />
                        <StatCard
                            title="Regular Donations"
                            value={donationsByType.regular.count}
                            subValue={`RM ${donationsByType.regular.amount.toFixed(2)}`}
                        />
                        <StatCard
                            title="Event Donations"
                            value={donationsByType.event.count}
                            subValue={`RM ${donationsByType.event.amount.toFixed(2)}`}
                        />
                    </div>

                    {/* Event-specific Donations */}
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Donations Overview</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {Object.entries(
                                donations
                                    ?.filter(donation => donation.type === 'event')
                                    ?.reduce((acc, donation) => {
                                        const eventName = donation.event_name || 'Unnamed Event';
                                        if (!acc[eventName]) {
                                            acc[eventName] = {
                                                total: 0,
                                                count: 0
                                            };
                                        }
                                        acc[eventName].total += parseFloat(donation.amount) || 0;
                                        acc[eventName].count += 1;
                                        return acc;
                                    }, {}) || {}
                            ).map(([eventName, eventTotals]) => (
                                <div 
                                    key={eventName}
                                    className="bg-white rounded-lg shadow p-4 border border-gray-200"
                                >
                                    <div className="text-sm font-medium text-gray-500">
                                        {eventName}
                                    </div>
                                    <div className="mt-1 text-2xl font-semibold text-gray-900">
                                        RM {eventTotals.total.toFixed(2)}
                                    </div>
                                    <div className="mt-1 text-sm text-gray-600">
                                        {eventTotals.count} donation{eventTotals.count !== 1 ? 's' : ''}
                                    </div>
                                    <div className="mt-2 text-xs text-gray-500">
                                        Average: RM {(eventTotals.total / eventTotals.count).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
                        <div className="flex gap-4">
                            <select
                                value={filterType}
                                onChange={(e) => {
                                    setFilterType(e.target.value);
                                    setCurrentPage(1); // Reset to first page on filter change
                                }}
                                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                                <option value="all">All Donations</option>
                                <option value="regular">Regular Donations</option>
                                <option value="event">Event Donations</option>
                            </select>
                            <input
                                type="text"
                                placeholder="Search donor or email..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1); // Reset to first page on search
                                }}
                                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>
                    </div>

                    {/* Donations Table */}
                    <div className="mt-8 flex flex-col">
                        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Donor</th>
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Type</th>
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Amount</th>
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                                                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Details</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {currentItems.map((donation, index) => (
                                                <tr key={`${donation.type}-${donation.id}-${index}`}>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                                                        <div className="font-medium">{donation.donor_name}</div>
                                                        <div className="text-gray-500">{donation.email}</div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                                            donation.type === 'event' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                                                        }`}>
                                                            {donation.type === 'event' ? 'Event' : 'Regular'}
                                                            {donation.type === 'event' && donation.event_name && (
                                                                <span className="ml-1">- {donation.event_name}</span>
                                                            )}
                                                        </span>
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                                                        RM {typeof donation.amount === 'number' ? donation.amount.toFixed(2) : parseFloat(donation.amount).toFixed(2)}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                                            donation.status === 'completed' ? 'bg-green-100 text-green-800' : 
                                                            donation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                                            'bg-red-100 text-red-800'
                                                        }`}>
                                                            {donation.status}
                                                        </span>
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        {format(new Date(donation.date), 'dd MMM yyyy HH:mm')}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        {donation.is_anonymous && (
                                                            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                                                Anonymous
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Pagination */}
                        <div className="mt-4 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                            <div className="flex flex-1 justify-between sm:hidden">
                                <button
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ${
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
                                    className={`relative ml-3 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ${
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
                                            {Math.min(indexOfLastItem, filteredDonations.length)}
                                        </span>{' '}
                                        of <span className="font-medium">{filteredDonations.length}</span> results
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
                                                        ? 'z-10 bg-indigo-600 text-white focus:z-20'
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
        </AuthenticatedLayout>
    );
}