import InputLabel from "@/Components/InputLabel";
import { 
    CalendarIcon, 
    MapPinIcon, 
    UsersIcon, 
    CurrencyDollarIcon, 
    ClockIcon, 
    CheckCircleIcon, 
    XCircleIcon,
    UserGroupIcon,
    InformationCircleIcon
} from '@heroicons/react/24/outline';

export default function EventView({ event }) {
    // Format price safely
    const formatPrice = (price) => {
        if (price === null || price === undefined) return "Free";
        const numPrice = parseFloat(price);
        return isNaN(numPrice) ? "Free" : `RM ${numPrice.toFixed(2)}`;
    };

    return (
        <>
            <button
                onClick={() => document.getElementById(`my_modal_2${event.id}`).showModal()}
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150"
            >
                View Details
            </button>

            <dialog id={`my_modal_2${event.id}`} className="modal">
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                {/* Header */}
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Event Details
                                    </h3>
                                    <button
                                        onClick={() => document.getElementById(`my_modal_2${event.id}`).close()}
                                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                                    >
                                        <span className="sr-only">Close</span>
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Event Title and Description */}
                                <div className="text-center border-b pb-4">
                                    <h4 className="text-xl font-bold text-gray-800">{event.title}</h4>
                                    <p className="text-gray-500 mt-2">{event.description}</p>
                                </div>

                                {/* Event Details Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                    {/* Start Date */}
                                    <div className="flex items-center space-x-3">
                                        <CalendarIcon className="h-6 w-6 text-blue-500" />
                                        <div>
                                            <InputLabel value="Start Date" />
                                            <p className="text-gray-700">{event.start_date}</p>
                                        </div>
                                    </div>

                                    {/* End Date */}
                                    <div className="flex items-center space-x-3">
                                        <ClockIcon className="h-6 w-6 text-purple-500" />
                                        <div>
                                            <InputLabel value="End Date" />
                                            <p className="text-gray-700">{event.end_date}</p>
                                        </div>
                                    </div>

                                    {/* Event Time */}
                                    <div className="flex items-center space-x-3">
                                        <ClockIcon className="h-6 w-6 text-purple-500" />
                                        <div>
                                            <InputLabel value="Event Time" />
                                            <p className="text-gray-700">{event.event_time}</p>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-center space-x-3">
                                        <CurrencyDollarIcon className="h-6 w-6 text-green-500" />
                                        <div>
                                            <InputLabel value="Price (RM)" />
                                            <p className="text-gray-700">{formatPrice(event.price)}</p>
                                        </div>
                                    </div>

                                    {/* Location */}
                                    <div className="flex items-center space-x-3">
                                        <MapPinIcon className="h-6 w-6 text-red-500" />
                                        <div>
                                            <InputLabel value="Location" />
                                            <p className="text-gray-700">{event.location}</p>
                                        </div>
                                    </div>

                                    {/* Participants */}
                                    <div className="flex items-center space-x-3">
                                        <UsersIcon className="h-6 w-6 text-yellow-500" />
                                        <div>
                                            <InputLabel value="Participants" />
                                            <p className="text-gray-700">{event.participant_count}</p>
                                        </div>
                                    </div>

                                    {/* Status */}
                                    <div className="flex items-center space-x-3">
                                        {(() => {
                                            switch(event.status) {
                                                case "active":
                                                    return (
                                                        <>
                                                            <CheckCircleIcon className="h-6 w-6 text-green-600" />
                                                            <div>
                                                                <InputLabel value="Status" />
                                                                <p className="text-green-600 font-semibold">Active</p>
                                                            </div>
                                                        </>
                                                    );
                                                case "canceled":
                                                    return (
                                                        <>
                                                            <XCircleIcon className="h-6 w-6 text-red-600" />
                                                            <div>
                                                                <InputLabel value="Status" />
                                                                <p className="text-red-600 font-semibold">Canceled</p>
                                                            </div>
                                                        </>
                                                    );
                                                case "completed":
                                                    return (
                                                        <>
                                                            <CheckCircleIcon className="h-6 w-6 text-blue-600" />
                                                            <div>
                                                                <InputLabel value="Status" />
                                                                <p className="text-blue-600 font-semibold">Completed</p>
                                                            </div>
                                                        </>
                                                    );
                                                default:
                                                    return (
                                                        <>
                                                            <XCircleIcon className="h-6 w-6 text-gray-600" />
                                                            <div>
                                                                <InputLabel value="Status" />
                                                                <p className="text-gray-600 font-semibold">{event.status}</p>
                                                            </div>
                                                        </>
                                                    );
                                            }
                                        })()}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-8 flex justify-end">
                                    <button
                                        onClick={() => document.getElementById(`my_modal_2${event.id}`).close()}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    );
}