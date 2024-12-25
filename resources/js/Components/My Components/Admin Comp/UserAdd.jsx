import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { UserPlus, X } from 'lucide-react';

export default function UserAdd({ disabled, className }) {
    const { data, setData, post, reset, errors, processing } = useForm({
        name: "",
        email: "",
        usertype: "",
        password: "",
        password_confirmation: ""
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.users.create'), {
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
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg"
                disabled={disabled}
            >
                <UserPlus className="w-5 h-5" />
                Add New User
            </button>

            <dialog id="user_modal" className="modal">
                <div className="modal-content w-full max-w-2xl bg-white rounded-xl shadow-2xl p-0 relative animate-fade-up">
                    <div className="text-center p-8 border-b border-gray-200">
                        <button
                            onClick={handleModalClose}
                            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <h3 className="text-3xl font-bold text-gray-900">CancerCare Connect</h3>
                        <p className="mt-2 text-gray-600">Add new user to the platform</p>
                    </div>

                    <form onSubmit={submit} className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Left Column - Required Fields */}
                            <div className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="name" value="Name" />
                                    <TextInput
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                        className="mt-1 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="email" value="Email" />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData("email", e.target.value)}
                                        className="mt-1 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="password" value="Password" />
                                    <TextInput
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData("password", e.target.value)}
                                        className="mt-1 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData("password_confirmation", e.target.value)}
                                        className="mt-1 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Right Column - Additional Fields */}
                            <div className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="usertype" value="User Type" />
                                    <select
                                        id="usertype"
                                        value={data.usertype}
                                        onChange={(e) => setData("usertype", e.target.value)}
                                        className="mt-1 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">Select user type</option>
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                        <option value="doctor">Doctor</option>
                                        <option value="patient">Patient</option>
                                        <option value="parent">Parent</option>
                                    </select>
                                    <InputError message={errors.usertype} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="age" value="Age" />
                                    <TextInput
                                        id="age"
                                        type="number"
                                        value={data.age}
                                        onChange={(e) => setData("age", e.target.value)}
                                        className="mt-1 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    <InputError message={errors.age} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="cancer_type" value="Type of Cancer" />
                                    <TextInput
                                        id="cancer_type"
                                        value={data.cancer_type}
                                        onChange={(e) => setData("cancer_type", e.target.value)}
                                        className="mt-1 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    <InputError message={errors.cancer_type} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="survivorship_status" value="Survivorship Status" />
                                    <select
                                        id="survivorship_status"
                                        value={data.survivorship_status}
                                        onChange={(e) => setData("survivorship_status", e.target.value)}
                                        className="mt-1 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    >
                                        <option value="">Select status</option>
                                        <option value="newly_diagnosed">Newly Diagnosed</option>
                                        <option value="in_treatment">In Treatment</option>
                                        <option value="post_treatment">Post Treatment</option>
                                        <option value="survivor">Survivor</option>
                                    </select>
                                    <InputError message={errors.survivorship_status} className="mt-2" />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={handleModalClose}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center px-6 py-2 bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-medium rounded-full transition-colors"
                            >
                                {processing ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Creating...
                                    </>
                                ) : 'Create User'}
                            </button>
                        </div>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop bg-black/50">
                    <button onClick={handleModalClose}></button>
                </form>
            </dialog>
        </>
    );
}