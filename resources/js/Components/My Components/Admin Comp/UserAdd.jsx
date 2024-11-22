import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";

export default function UserAdd({ disabled, className }) {
    const { data, setData, post, reset, errors, processing } = useForm({
        name: "",
        email: ""
    });

    const submit = (e) => {
        e.preventDefault();

        post("admin.users.create", {
            data: data,
            forceFormData: true,
            onSuccess: () => {
                document.getElementById("user_modal").close();
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
                onClick={() => document.getElementById("user_modal").showModal()}
                className={`inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 focus:bg-green-800 active:bg-green-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 ${
                    disabled && "opacity-25"
                } ${className}`}
                disabled={disabled}
            >
                Add User
            </button>

            <dialog id="user_modal" className="modal">
                <div className="modal-box bg-slate-50 px-10">
                    <div className="modal-header">
                        <button
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={handleModalClose}
                        >
                            ✕
                        </button>
                    </div>
                    <div className="modal-body py-6">
                        <h3 className="font-bold text-lg">Add New User</h3>
                        <form onSubmit={submit} className="mt-6 space-y-6">
                            <div>
                                <InputLabel htmlFor="name" value="User Name" />
                                <TextInput
                                    id="name"
                                    className="mt-1 block w-full"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                    required
                                    isFocused
                                    autoComplete="name"
                                    placeholder="Enter user name"
                                />
                                <InputError className="mt-2" message={errors.name} />
                            </div>

                            <div>
                                <InputLabel htmlFor="email" value="Email" />
                                <TextInput
                                    id="email"
                                    className="mt-1 block w-full"
                                    value={data.email}
                                    onChange={(e) => setData("email", e.target.value)}
                                    required
                                    autoComplete="email"
                                    placeholder="Enter user email"
                                />
                                <InputError className="mt-2" message={errors.email} />
                            </div>

                            <button
                                type="submit"
                                className={`w-full text-center items-center px-4 py-2 bg-green-600 hover:bg-green-700 focus:bg-green-800 active:bg-green-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 ${
                                    processing && "opacity-25"
                                }`}
                                disabled={processing}
                            >
                                Add New User
                            </button>
                        </form>
                    </div>
                </div>
                <div className="modal-backdrop" onClick={handleModalClose} />
            </dialog>
        </>
    );
}