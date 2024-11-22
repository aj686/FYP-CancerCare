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
        document.getElementById("user_modal").close();
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
                <div className="modal-box bg-slate-50 px-10">
                    <div className="modal-header">
                        <form method="dialog">
                            <button
                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                onClick={() => reset()}
                            >
                                ✕
                            </button>
                        </form>
                    </div>
                    <div className="modal-body py-6">
                        <h3 className="font-bold text-lg">Add New Event</h3>
                        <form onSubmit={submit} method="post" className="mt-6 space-y-6" encType="multipart/form-data">
                            
                            {/* Event Title */}
                            <div>
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
                            <div>
                                <InputLabel htmlFor="description" value="Description" />
                                <textarea
                                    id="description"
                                    className="mt-1 block w-full"
                                    value={data.description}
                                    onChange={(e) => setData("description", e.target.value)}
                                    required
                                    rows="4"
                                    placeholder="Enter event description"
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
                                    value={data.start_date}
                                    onChange={(e) => setData("start_date", e.target.value)}
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
                                    value={data.end_date}
                                    onChange={(e) => setData("end_date", e.target.value)}
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
                                    name="event_time"
                                    className="mt-1 block w-full"
                                    value={data.event_time}
                                    onChange={(e) => setData("event_time", e.target.value)}
                                    required
                                />
                                <InputError className="mt-2" message={errors.event_time} />
                            </div>


                            {/* Price */}
                            <div>
                                <InputLabel htmlFor="price" value="Price" />
                                <TextInput
                                    id="price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    className="mt-1 block w-full"
                                    value={data.price}
                                    onChange={(e) => setData("price", e.target.value)}
                                    required
                                    placeholder="Enter price in RM"
                                />
                                <InputError className="mt-2" message={errors.price} />
                            </div>

                            {/* Location */}
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

                            {/* Participant Count */}
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

                            {/* Status */}
                            <div>
                                <InputLabel htmlFor="status" value="Event Status" />
                                <select
                                    id="status"
                                    className="mt-1 block w-full"
                                    value={data.status}
                                    onChange={(e) => setData("status", e.target.value)}
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
                                <InputLabel htmlFor="image" value="Image" />
                                <input
                                    id="image"
                                    type="file"
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("image", e.target.files[0])}
                                    accept="image/jpeg,image/png,image/jpg,image/gif"
                                    required
                                />
                                <p className="text-sm text-gray-500 mt-1">
                                    Max file size: 2MB. Supported formats: JPEG, PNG, JPG, GIF
                                </p>
                                <InputError className="mt-2" message={errors.image} />
                            </div>


                            <button
                                className={`w-full text-center items-center px-4 py-2 bg-green-600 hover:bg-green-700 focus:bg-green-800 active:bg-green-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 ${
                                    processing && "opacity-25"
                                }`}
                                disabled={processing}
                            >
                                Add New Event
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