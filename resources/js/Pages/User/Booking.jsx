import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PencilIcon, TrashIcon, EyeIcon } from 'lucide-react';

export default function Booking({ auth, bookings, count }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Booking Dashboard</h2>}
        >
            <Head title="Booking" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/* Header Section */}
                        <div className="p-6 flex justify-between items-center border-b">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">My Bookings</h3>
                                <p className="text-sm text-gray-600">
                                    Total Bookings: {count === 0 ? "No bookings yet" : count}
                                </p>
                            </div>
                        </div>

                        {/* Table Section */}
                        <div className="p-6">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Title</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {bookings.map((booking) => (
                                            <tr key={booking.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="font-medium text-gray-900">{booking.event.title}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.user.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.event.start_date}</td>
                                                <td className="px-6 py-4 text-sm text-gray-500">{booking.event.end_date}</td>
                                                <td className="px-6 py-4 text-sm text-gray-500">{booking.event.price}</td>
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                        ${booking.status === 'registered' ? 'bg-green-100 text-green-800' : 
                                                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                                          'bg-red-100 text-red-800'}`}>
                                                        {booking.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex space-x-2">
                                                        <button className="text-blue-600 hover:text-blue-900">
                                                            <EyeIcon className="h-5 w-5" />
                                                            <span>View</span>
                                                        </button>
                                                        <button className="text-blue-600 hover:text-blue-900">
                                                            <PencilIcon className="h-5 w-5" />
                                                            <span>Edit</span>
                                                        </button>
                                                        <button className="text-red-600 hover:text-red-900">
                                                            <TrashIcon className="h-5 w-5" />
                                                            <span>Delete</span>
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