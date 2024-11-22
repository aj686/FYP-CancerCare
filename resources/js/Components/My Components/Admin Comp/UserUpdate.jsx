import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";

export default function UserUpdate({ children, className, userId, user }) {

    const {
        data: editData,
        setData: setEditData,
        errors,
        processing,
        reset
    } = useForm({
        user_id: user.id,
        name: user.name,
        email: user.email,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        Inertia.post(`/admin/update-user/${user.id}`, {
            _method: "patch",
            ...editData,
        });
    };


    return (
        <>
            <button
                onClick={() =>
                    document
                        .getElementById(`my_modal_3${user.id}`)
                        .showModal()
                }
                className={`inline-flex items-center px-4 py-2 bg-yellow-400 hover:bg-yellow-500 focus:bg-yellow-600 active:bg-yellow-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest  focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 `}
            >
                Edit
            </button>
            <dialog id={userId} className="modal">
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
                            Edit {user.name} Details
                            <small className="block">
                                id: {editData.user_id}
                            </small>
                        </h3>
                        <form
                            onSubmit={handleSubmit}
                            className="mt-6 space-y-6"
                        >
                            {/* Name */}
                            <div>
                                <InputLabel
                                    htmlFor="name"
                                    value="Name"
                                />

                                <TextInput
                                    id="name"
                                    className="mt-1 block w-full"
                                    value={editData.name}
                                    onChange={(e) =>
                                        setEditData(
                                            "name",
                                            e.target.value
                                        )
                                    }
                                    required
                                    isFocused
                                    autoComplete="name"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.name}
                                />
                            </div>

                            {/* email */}
                            <div>
                                <InputLabel
                                    htmlFor="email"
                                    value="Email"
                                />
                                <TextInput
                                    id="email"
                                    className="mt-1 block w-full"
                                    value={editData.email}
                                    onChange={(e) =>
                                        setEditData("email", e.target.value)
                                    }
                                    required
                                    autoComplete="email"
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.email}
                                />
                            </div>

                            <button
                                className={`w-full text-center items-center px-4 py-2 bg-yellow-400 hover:bg-yellow-500 focus:bg-yellow-600 active:bg-yellow-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest  focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150`}
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