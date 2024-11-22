import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PencilIcon, TrashIcon } from 'lucide-react'; // Import icons if using lucide-react
import EventAdd from '@/Components/My Components/Admin Comp/EventAdd';
import EventView from '@/Components/My Components/Admin Comp/EventView';
import EventDelete from '@/Components/My Components/Admin Comp/EventDelete';
import EventUpdate from '@/Components/My Components/Admin Comp/EventUpdate';

export default function Program({ auth, events, count }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Programs Dashboard</h2>}
        >
            <Head title="Program" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/* Header Section */}
                        <div className="p-6 flex justify-between items-center border-b">
                             <div>
                                 <h3 className="text-lg font-semibold text-gray-900">List Programs</h3>
                                 <p className="text-sm text-gray-600">
                                     Total Programs: {count === 0 ? "No programs yet" : count}
                                 </p>
                             </div>
                            <EventAdd className='float-end'/>
                         </div>  

                         {/* Table Section */}
                        <div className="p-6">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participate</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {events.map((event) => (
                                            <tr key={event.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{event.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="font-medium text-gray-900">{event.title}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.start_date}</td>
                                                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{event.end_date}</td>
                                                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{event.price}</td>
                                                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{event.location}</td>
                                                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{event.participant_count}</td>
                                                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{event.status}</td>
            
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex space-x-2">
                                                        {/* View Detail */}
                                                        <EventView
                                                            key={event.id}
                                                            className="text-blue-600 hover:text-blue-900"
                                                            eventId={`my_modal_2${event.id}`}
                                                            event={event}
                                                        >
                                                            <PencilIcon className="h-5 w-5" />
                                                            <span>View</span>
                                                        </EventView>
                                                        
                                                        {/* Update */}
                                                        <EventUpdate className="text-blue-600 hover:text-blue-900"
                                                            eventId = {`my_modal_3${event.id}`}
                                                            event = {event}
                                                        >
                                                            <PencilIcon className="h-5 w-5" />
                                                            <span>Edit</span>
                                                        </EventUpdate>

                                                        {/* Delete */}
                                                        <EventDelete className="text-red-600 hover:text-red-900"
                                                            eventId = {`my_modal_4${event.id}`}
                                                            event = {event}
                                                        >
                                                            <TrashIcon className="h-5 w-5" />
                                                            <span>Delete</span>
                                                        </EventDelete>
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
