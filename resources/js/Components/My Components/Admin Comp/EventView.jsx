import InputLabel from "@/Components/InputLabel";
import { CalendarIcon, MapPinIcon, UsersIcon, CurrencyDollarIcon, ClockIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

export default function EventView({ event }) {
    return (
        <>
            {/* Button to open the modal */}
            <button
                onClick={() => document.getElementById(`my_modal_2${event.id}`).showModal()}
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 border border-transparent rounded-lg text-white font-semibold shadow-lg transition ease-in-out duration-200"
            >
                View Details
            </button>

            {/* Modal to display event information */}
            <dialog id={`my_modal_2${event.id}`} className="modal">
                <div className="modal-box bg-white rounded-lg shadow-xl p-8 relative">
                    {/* Close Button */}
                    <button
                        onClick={() => document.getElementById(`my_modal_2${event.id}`).close()}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                    >
                        ✕
                    </button>

                    {/* Modal Content */}
                    <div className="space-y-6">
                        {/* Header Section */}
                        <div className="text-center border-b pb-4">
                            <h3 className="text-2xl font-bold text-gray-800">{event.title}</h3>
                            <p className="text-gray-500 mt-2">{event.description}</p>
                        </div>

                        {/* Event Details */}
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

                            {/* Price */}
                            <div className="flex items-center space-x-3">
                                <CurrencyDollarIcon className="h-6 w-6 text-green-500" />
                                <div>
                                    <InputLabel value="Price (RM)" />
                                    <p className="text-gray-700">{event.price ? `RM ${event.price}` : "Free"}</p>
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
                                {event.status === "active" ? (
                                    <>
                                        <CheckCircleIcon className="h-6 w-6 text-green-600" />
                                        <div>
                                            <InputLabel value="Status" />
                                            <p className="text-green-600 font-semibold">Active</p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <XCircleIcon className="h-6 w-6 text-red-600" />
                                        <div>
                                            <InputLabel value="Status" />
                                            <p className="text-red-600 font-semibold">Inactive</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 text-right">
                        <button
                            onClick={() => document.getElementById(`my_modal_2${event.id}`).close()}
                            className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg shadow-sm transition duration-200"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    );
}
