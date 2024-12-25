import { useForm } from "@inertiajs/react";
import { Trash2, AlertTriangle, X, Loader2 } from 'lucide-react';

export default function UserDelete({ userId, user }) {
    const { processing, delete: destroy } = useForm();

    const handleDelete = (e) => {
        e.preventDefault();
        destroy(route('admin.users.destroy', user.id), {
            onSuccess: () => {
                document.getElementById(userId).close();
            },
        });
    };

    const handleModalClose = () => {
        document.getElementById(userId).close();
    };

    return (
        <>
            <button
                onClick={() => document.getElementById(userId).showModal()}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-lg"
            >
                <Trash2 className="w-4 h-4" />
                Delete
            </button>

            <dialog id={userId} className="modal">
                <div className="modal-content w-full max-w-xl bg-white rounded-xl shadow-2xl p-0 relative animate-fade-up">
                    <div className="text-center p-8">
                        <button
                            onClick={handleModalClose}
                            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        
                        <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                            <AlertTriangle className="w-10 h-10 text-red-600" />
                        </div>
                        
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Delete User Account</h3>
                        
                        <div className="bg-gray-50 rounded-lg p-4 mb-6">
                            <p className="font-medium text-lg text-gray-900 mb-1">{user.name}</p>
                            <p className="text-gray-600">{user.email}</p>
                            <p className="text-sm text-gray-500 mt-2">User Type: {user.usertype}</p>
                        </div>
                        
                        <p className="text-gray-600 mb-8">
                            This action cannot be undone. All data associated with this user will be permanently deleted from our servers.
                        </p>

                        <div className="flex items-center justify-center gap-4 border-t border-gray-200 pt-6">
                            <button
                                type="button"
                                onClick={handleModalClose}
                                className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={processing}
                                className="inline-flex items-center px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-full transition-colors"
                            >
                                {processing ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    <>
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Delete Account
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop bg-black/50">
                    <button onClick={handleModalClose}></button>
                </form>
            </dialog>
        </>
    );
}