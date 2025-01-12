import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";

export default function EventAdd({ disabled, className = "" }) {
    const { data, setData, post, reset, errors, processing } = useForm({
        title: "",
        description: "",
        start_date: "",
        end_date: "",
        event_time: "",
        price: "",
        location: "",
        image: null,
        participant_count: "",
        status: "",
    });

    const submit = (e) => {
        e.preventDefault();

        // Create FormData to handle file upload
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });

        post("/admin/create-event", {
            data: formData,
            onSuccess: () => {
                document.getElementById("product_modal").close();
                reset();
            },
            preserveScroll: true,
        });
    };

    const handleModalClose = () => {
        reset();
        document.getElementById("product_modal").close();
    };

    return (
        <>
            <button
                onClick={() => document.getElementById("product_modal").showModal()}
                className={
                    `inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 focus:bg-green-800 active:bg-green-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 ${
                        disabled && "opacity-25"
                    } ` + className
                }
                disabled={disabled}
            >
                Add Events
            </button>

            <dialog id="product_modal" className="modal">
                {/* Modal Backdrop with click handler */}
                <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>

                {/* Modal Content */}
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
                            {/* Modal Header */}
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="flex items-start justify-between">
                                    <h3 className="text-xl font-semibold leading-6 text-gray-900">
                                        Add New Event
                                    </h3>
                                    <button
                                        onClick={handleModalClose}
                                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        <span className="sr-only">Close</span>
                                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Form Content */}
                                <form onSubmit={submit} method="post" className="mt-6 space-y-6" encType="multipart/form-data">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Title */}
                                        <div className="col-span-2">
                                            <InputLabel htmlFor="title" value="Event Title" />
                                            <TextInput
                                                id="title"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={data.title}
                                                onChange={(e) => setData("title", e.target.value)}
                                                required
                                                autoComplete="title"
                                                placeholder="Enter event title"
                                            />
                                            <InputError className="mt-2" message={errors.title} />
                                        </div>

                                        {/* Description */}
                                        <div className="col-span-2">
                                            <InputLabel htmlFor="description" value="Description" />
                                            <textarea
                                                id="description"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                value={data.description}
                                                onChange={(e) => setData("description", e.target.value)}
                                                required
                                                rows="4"
                                                placeholder="Enter event description"
                                            />
                                            <InputError className="mt-2" message={errors.description} />
                                        </div>

                                        {/* Date and Time Fields */}
                                        <div>
                                            <InputLabel htmlFor="start_date" value="Start Date" />
                                            <TextInput
                                                id="start_date"
                                                type="date"
                                                className="mt-1 block w-full"
                                                value={data.start_date}
                                                onChange={(e) => setData("start_date", e.target.value)}
                                                required
                                            />
                                            <InputError className="mt-2" message={errors.start_date} />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="end_date" value="End Date" />
                                            <TextInput
                                                id="end_date"
                                                type="date"
                                                className="mt-1 block w-full"
                                                value={data.end_date}
                                                onChange={(e) => setData("end_date", e.target.value)}
                                                required
                                            />
                                            <InputError className="mt-2" message={errors.end_date} />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="event_time" value="Event Time" />
                                            <TextInput
                                                id="event_time"
                                                type="time"
                                                className="mt-1 block w-full"
                                                value={data.event_time}
                                                onChange={(e) => setData("event_time", e.target.value)}
                                                required
                                            />
                                            <InputError className="mt-2" message={errors.event_time} />
                                        </div>

                                        {/* Other Fields */}
                                        <div>
                                            <InputLabel htmlFor="price" value="Price (RM)" />
                                            <TextInput
                                                id="price"
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                className="mt-1 block w-full"
                                                value={data.price}
                                                onChange={(e) => setData("price", e.target.value)}
                                                required
                                                placeholder="0.00"
                                            />
                                            <InputError className="mt-2" message={errors.price} />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="location" value="Location" />
                                            <TextInput
                                                id="location"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={data.location}
                                                onChange={(e) => setData("location", e.target.value)}
                                                required
                                                placeholder="Enter event location"
                                            />
                                            <InputError className="mt-2" message={errors.location} />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="participant_count" value="Participant Count" />
                                            <TextInput
                                                id="participant_count"
                                                type="number"
                                                min="0"
                                                className="mt-1 block w-full"
                                                value={data.participant_count}
                                                onChange={(e) => setData("participant_count", e.target.value)}
                                                placeholder="Enter number of participants"
                                            />
                                            <InputError className="mt-2" message={errors.participant_count} />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="status" value="Event Status" />
                                            <select
                                                id="status"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                value={data.status}
                                                onChange={(e) => setData("status", e.target.value)}
                                                required
                                            >
                                                <option value="">Select Status</option>
                                                <option value="active">Active</option>
                                                <option value="canceled">Canceled</option>
                                                <option value="completed">Completed</option>
                                            </select>
                                            <InputError className="mt-2" message={errors.status} />
                                        </div>

                                        {/* Image Upload */}
                                        <div className="col-span-2">
                                            <InputLabel htmlFor="image" value="Event Image" />
                                            <input
                                                id="image"
                                                type="file"
                                                className="mt-1 block w-full text-sm text-gray-500
                                                    file:mr-4 file:py-2 file:px-4
                                                    file:rounded-md file:border-0
                                                    file:text-sm file:font-semibold
                                                    file:bg-green-50 file:text-green-700
                                                    hover:file:bg-green-100"
                                                onChange={(e) => setData("image", e.target.files[0])}
                                                accept="image/jpeg,image/png,image/jpg,image/gif"
                                                required
                                            />
                                            <p className="text-sm text-gray-500 mt-1">
                                                Max file size: 2MB. Supported formats: JPEG, PNG, JPG, GIF
                                            </p>
                                            <InputError className="mt-2" message={errors.image} />
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="mt-6 flex justify-end gap-3">
                                        <button
                                            type="button"
                                            onClick={handleModalClose}
                                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors duration-200"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className={`px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors duration-200 ${
                                                processing ? 'opacity-75 cursor-not-allowed' : ''
                                            }`}
                                            disabled={processing}
                                        >
                                            {processing ? 'Adding...' : 'Add New Event'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    );
}