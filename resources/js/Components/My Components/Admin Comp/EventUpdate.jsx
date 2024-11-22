import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";

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
        participant_count: event.participant_count, // Changed from participant to participant_count
        status: event.status,
        _method: 'PATCH'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Create FormData to handle file upload
        const formData = new FormData();
        Object.keys(editData).forEach(key => {
            if (key === 'image' && editData[key] === null) {
                return; // Skip if no new image
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
            // Create preview URL
            const reader = new FileReader();
            reader.onload = (e) => setImagePreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };
    
    return(
        <>
            <button
                onClick={() =>
                    document
                        .getElementById(`my_modal_3${event.id}`)
                        .showModal()
                }
                className={`inline-flex items-center px-4 py-2 bg-yellow-400 hover:bg-yellow-500 focus:bg-yellow-600 active:bg-yellow-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest  focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 `}
            >
                Edit
            </button>
            <dialog id={eventId} className="modal">
                <div className="modal-box bg-slate-50 px-20 py-10 ">
                    <div className="modal-header">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button
                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                onClick={() => reset()}
                            >
                                ✕
                            </button>
                        </form>
                    </div>
                    <div className="modal-body py-6">
                        <h3 className="font-bold text-lg">
                            Edit {event.title} Details
                            <small className="block">ID: {editData.event_id}</small>
                        </h3>
                        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                            {/* Title */}
                            <div>
                                <InputLabel htmlFor="title" value="Event Title" />
                                <TextInput
                                    id="title"
                                    className="mt-1 block w-full"
                                    value={editData.title}
                                    onChange={(e) => setEditData("title", e.target.value)}
                                    required
                                    autoComplete="title"
                                />
                                <InputError className="mt-2" message={errors.title} />
                            </div>

                            {/* Description */}
                            <div>
                                <InputLabel htmlFor="description" value="Description" />
                                <textarea
                                    id="description"
                                    className="mt-1 block w-full"
                                    value={editData.description}
                                    onChange={(e) => setEditData("description", e.target.value)}
                                    required
                                    rows="4"
                                />
                                <InputError className="mt-2" message={errors.description} />
                            </div>

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
                                <InputError className="mt-2" message={errors.start_date} />
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
                                <InputError className="mt-2" message={errors.end_date} />
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
                                <InputError className="mt-2" message={errors.event_time} />
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
                                <InputError className="mt-2" message={errors.price} />
                            </div>

                            {/* Location */}
                            <div>
                                <InputLabel htmlFor="location" value="Location" />
                                <TextInput
                                    id="location"
                                    className="mt-1 block w-full"
                                    value={editData.location}
                                    onChange={(e) => setEditData("location", e.target.value)}
                                    required
                                />
                                <InputError className="mt-2" message={errors.location} />
                            </div>

                            {/* Participant Count */}
                            <div>
                                <InputLabel htmlFor="participant_count" value="Participants" />
                                <TextInput
                                    id="participant_count"
                                    type="number"
                                    min="0"
                                    className="mt-1 block w-full"
                                    value={editData.participant_count}
                                    onChange={(e) => setEditData("participant_count", e.target.value)}
                                />
                                <InputError className="mt-2" message={errors.participant_count} />
                            </div>

                            {/* Status */}
                            <div>
                                <InputLabel htmlFor="status" value="Event Status" />
                                <select
                                    id="status"
                                    className="mt-1 block w-full"
                                    value={editData.status}
                                    onChange={(e) => setEditData("status", e.target.value)}
                                    required
                                >
                                    <option value="">Select Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                                <InputError className="mt-2" message={errors.status} />
                            </div>

                            {/* Image Upload */}
                            <div>
                                <InputLabel htmlFor="image" value="Current Image" />
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
                                    className="mt-1 block w-full text-sm text-gray-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-md file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-yellow-50 file:text-yellow-700
                                        hover:file:bg-yellow-100"
                                    onChange={handleImageChange}
                                    accept="image/jpeg,image/png,image/jpg,image/gif"
                                />
                                <p className="text-sm text-gray-500 mt-1">
                                    Leave empty to keep current image. Max file size: 2MB. 
                                    Supported formats: JPEG, PNG, JPG, GIF
                                </p>
                                <InputError className="mt-2" message={errors.image} />
                            </div>

                            {/* Submit Button */}
                            <button
                                className={`w-full text-center items-center px-4 py-2 bg-yellow-400 hover:bg-yellow-500 focus:bg-yellow-600 active:bg-yellow-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150`}
                                disabled={processing}
                            >
                                Confirm Update
                            </button>
                        </form>
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button
                                className="btn text-black border-0 bg-gray-300 hover:bg-gray-400"
                                onClick={() => reset()}
                            >
                                Close
                            </button>
                        </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={() => reset()}></button>
                </form>
            </dialog>
        </>
    );
}



