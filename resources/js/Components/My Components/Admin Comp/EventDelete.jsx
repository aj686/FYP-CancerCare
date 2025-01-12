import { useForm } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

export default function EventDelete({ children, className, eventId, event }) {
    const {
        data: deleteData,
        setData: setDeleteData,
        processing,
        reset,
    } = useForm({
        event_id: event.id,
        title: event.title,
        description: event.description,
        startTime: event.start_date,
        endTime: event.end_time,
        price: event.price,
        location: event.location,
        image: event.image,
        participant: event.participant_count,
        status: event.status,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        Inertia.post(`/admin/destroy-event/${event.id}`, {
            _method: "delete",
            ...deleteData,
        });
    };

    return (
        <>
            <button
                onClick={() => document.getElementById(`my_modal_4${event.id}`).showModal()}
                className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150"
            >
                Delete
            </button>

            <dialog id={eventId} className="modal">
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            {/* Modal Header */}
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                            </svg>
                                        </div>
                                        <h3 className="ml-3 text-lg font-semibold text-gray-900">
                                            Delete Event
                                        </h3>
                                    </div>
                                    <button
                                        onClick={() => document.getElementById(eventId).close()}
                                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                                    >
                                        <span className="sr-only">Close</span>
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="mt-4">
                                    <p className="text-gray-600">
                                        Are you sure you want to delete <span className="font-semibold">{deleteData.title}</span>?
                                        <small className="block mt-1 text-gray-500">
                                            Event ID: {deleteData.event_id}
                                        </small>
                                    </p>
                                    <p className="mt-2 text-sm text-gray-500">
                                        This action cannot be undone. This will permanently delete the event
                                        and all associated data.
                                    </p>
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-6 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => document.getElementById(eventId).close()}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        disabled={processing}
                                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                    >
                                        {processing ? 'Deleting...' : 'Delete Event'}
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