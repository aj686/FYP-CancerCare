import { useState } from 'react';
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

export default function EventUpdate({ children, className, eventId, event }) {
    const [imagePreview, setImagePreview] = useState(event.image ? `/storage/${event.image}` : null);

    const {
        data: editData,
        setData: setEditData,
        errors,
        processing,
        reset
    } = useForm({
        event_id: event.id,
        title: event.title,
        description: event.description,
        start_date: event.start_date,
        end_date: event.end_date,
        event_time: event.event_time,
        price: event.price,
        location: event.location,
        image: null,
        participant_count: event.participant_count,
        status: event.status,
        _method: 'PATCH'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        Object.keys(editData).forEach(key => {
            if (key === 'image' && editData[key] === null) {
                return;
            }
            formData.append(key, editData[key]);
        });

        Inertia.post(`/admin/update-event/${event.id}`, formData, {
            forceFormData: true,
            onSuccess: () => {
                document.getElementById(eventId).close();
                reset();
            },
            preserveScroll: true,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setEditData('image', file);
            const reader = new FileReader();
            reader.onload = (e) => setImagePreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <button
                onClick={() => document.getElementById(`my_modal_3${event.id}`).showModal()}
                className="inline-flex items-center px-4 py-2 bg-yellow-400 hover:bg-yellow-500 focus:bg-yellow-600 active:bg-yellow-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150"
            >
                Edit
            </button>

            <dialog id={eventId} className="modal">
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
                            {/* Modal Header */}
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Edit {event.title} Details
                                        <small className="block text-sm text-gray-500">ID: {editData.event_id}</small>
                                    </h3>
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

                                {/* Form Content */}
                                <form onSubmit={handleSubmit} className="mt-6">
                                    <div className="grid grid-cols-1 gap-6">
                                        {/* Title */}
                                        <div>
                                            <InputLabel htmlFor="title" value="Event Title" />
                                            <TextInput
                                                id="title"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={editData.title}
                                                onChange={(e) => setEditData("title", e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.title} className="mt-2" />
                                        </div>

                                        {/* Description */}
                                        <div>
                                            <InputLabel htmlFor="description" value="Description" />
                                            <textarea
                                                id="description"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                value={editData.description}
                                                onChange={(e) => setEditData("description", e.target.value)}
                                                required
                                                rows="4"
                                            />
                                            <InputError message={errors.description} className="mt-2" />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Start Date */}
                                            <div>
                                                <InputLabel htmlFor="start_date" value="Start Date" />
                                                <TextInput
                                                    id="start_date"
                                                    type="date"
                                                    className="mt-1 block w-full"
                                                    value={editData.start_date}
                                                    onChange={(e) => setEditData("start_date", e.target.value)}
                                                    required
                                                />
                                                <InputError message={errors.start_date} className="mt-2" />
                                            </div>

                                            {/* End Date */}
                                            <div>
                                                <InputLabel htmlFor="end_date" value="End Date" />
                                                <TextInput
                                                    id="end_date"
                                                    type="date"
                                                    className="mt-1 block w-full"
                                                    value={editData.end_date}
                                                    onChange={(e) => setEditData("end_date", e.target.value)}
                                                    required
                                                />
                                                <InputError message={errors.end_date} className="mt-2" />
                                            </div>

                                            {/* Event Time */}
                                            <div>
                                                <InputLabel htmlFor="event_time" value="Event Time" />
                                                <TextInput
                                                    id="event_time"
                                                    type="time"
                                                    className="mt-1 block w-full"
                                                    value={editData.event_time}
                                                    onChange={(e) => setEditData("event_time", e.target.value)}
                                                    required
                                                />
                                                <InputError message={errors.event_time} className="mt-2" />
                                            </div>

                                            {/* Price */}
                                            <div>
                                                <InputLabel htmlFor="price" value="Price (RM)" />
                                                <TextInput
                                                    id="price"
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    className="mt-1 block w-full"
                                                    value={editData.price}
                                                    onChange={(e) => setEditData("price", e.target.value)}
                                                    required
                                                />
                                                <InputError message={errors.price} className="mt-2" />
                                            </div>

                                            {/* Location */}
                                            <div>
                                                <InputLabel htmlFor="location" value="Location" />
                                                <TextInput
                                                    id="location"
                                                    type="text"
                                                    className="mt-1 block w-full"
                                                    value={editData.location}
                                                    onChange={(e) => setEditData("location", e.target.value)}
                                                    required
                                                />
                                                <InputError message={errors.location} className="mt-2" />
                                            </div>

                                            {/* Status */}
                                            <div>
                                                <InputLabel htmlFor="status" value="Event Status" />
                                                <select
                                                    id="status"
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    value={editData.status}
                                                    onChange={(e) => setEditData("status", e.target.value)}
                                                    required
                                                >
                                                    <option value="">Select Status</option>
                                                    <option value="active">Active</option>
                                                    <option value="canceled">Canceled</option>
                                                    <option value="completed">Completed</option>
                                                </select>
                                                <InputError message={errors.status} className="mt-2" />
                                            </div>

                                            {/* Participant Count */}
                                            <div>
                                                <InputLabel htmlFor="participant_count" value="Maximum Participants" />
                                                <TextInput
                                                    id="participant_count"
                                                    type="number"
                                                    min="1"
                                                    className="mt-1 block w-full"
                                                    value={editData.participant_count}
                                                    onChange={(e) => setEditData("participant_count", e.target.value)}
                                                    required
                                                />
                                                <InputError message={errors.participant_count} className="mt-2" />
                                            </div>
                                        </div>

                                        {/* Image Upload */}
                                        <div>
                                            <InputLabel htmlFor="image" value="Event Image" />
                                            {imagePreview && (
                                                <div className="mt-2 mb-4">
                                                    <img
                                                        src={imagePreview}
                                                        alt="Event preview"
                                                        className="max-w-xs rounded-lg shadow-md"
                                                    />
                                                </div>
                                            )}
                                            <input
                                                type="file"
                                                id="image"
                                                onChange={handleImageChange}
                                                className="mt-1 block w-full text-sm text-gray-500
                                                    file:mr-4 file:py-2 file:px-4
                                                    file:rounded-md file:border-0
                                                    file:text-sm file:font-semibold
                                                    file:bg-yellow-50 file:text-yellow-700
                                                    hover:file:bg-yellow-100"
                                                accept="image/jpeg,image/png,image/jpg,image/gif"
                                            />
                                            <p className="text-sm text-gray-500 mt-1">
                                                Leave empty to keep current image. Max file size: 2MB. 
                                                Supported formats: JPEG, PNG, JPG, GIF
                                            </p>
                                            <InputError message={errors.image} className="mt-2" />
                                        </div>
                                    </div>

                                    {/* Form Actions */}
                                    <div className="mt-6 flex justify-end gap-3">
                                        <button
                                            type="button"
                                            onClick={() => document.getElementById(eventId).close()}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="px-4 py-2 text-sm font-medium text-white bg-yellow-400 hover:bg-yellow-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                                        >
                                            {processing ? 'Updating...' : 'Update Event'}
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