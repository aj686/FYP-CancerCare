import { useForm } from "@inertiajs/react";
import { TrashIcon } from "lucide-react";
import { useState } from "react";

export default function PlanDelete({ className, planId, plan }) {
    const [error, setError] = useState(null);
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    
    const { data, setData, delete: destroy, processing, reset } = useForm({
        plan_id: plan.id,
        name: plan.name,
        _method: 'DELETE'
    });

    const handleDelete = (e) => {
        e.preventDefault();
        setShowDeleteWarning(true);
    };

    const handleConfirmDelete = () => {
        destroy(route('admin.plans.destroy', plan.id), {
            preserveScroll: true,
            onSuccess: () => {
                setShowDeleteWarning(false);
                document.getElementById(planId).close();
                reset();
            },
            onError: (errors) => {
                setError(errors.error || 'Failed to delete plan.');
            },
        });
    };

    const handleCancel = () => {
        setShowDeleteWarning(false);
        setError(null);
        document.getElementById(planId).close();
        reset();
    };

    return (
        <>
            <button
                onClick={() => document.getElementById(planId).showModal()}
                className={`inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 ${className}`}
            >
                <TrashIcon className="w-4 h-4" />
                Delete
            </button>

            <dialog id={planId} className="modal">
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                {/* Modal Header with Warning Icon */}
                                <div className="flex justify-between items-start">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                Delete Plan
                                            </h3>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleCancel}
                                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                                    >
                                        <span className="sr-only">Close</span>
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Warning Content */}
                                <div className="mt-4">
                                    <div className="mt-2">
                                        <p className="text-gray-600">
                                            Are you sure you want to delete <span className="font-semibold">{data.name}</span>?
                                            <small className="block mt-1 text-gray-500">
                                                Plan ID: {data.plan_id}
                                            </small>
                                        </p>
                                        <p className="mt-2 text-sm text-gray-500">
                                            This action cannot be undone. Any users subscribed to this plan may be affected.
                                        </p>
                                    </div>

                                    {/* Error Message */}
                                    {error && (
                                        <div className="mt-3 p-3 rounded bg-red-50 border border-red-200">
                                            <p className="text-sm text-red-600">{error}</p>
                                        </div>
                                    )}

                                    {/* Confirmation Section */}
                                    {showDeleteWarning && (
                                        <div className="mt-4 p-4 bg-yellow-50 rounded-md">
                                            <div className="flex">
                                                <div className="flex-shrink-0">
                                                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <div className="ml-3">
                                                    <h3 className="text-sm font-medium text-yellow-800">
                                                        Final Warning
                                                    </h3>
                                                    <p className="mt-2 text-sm text-yellow-700">
                                                        This will permanently delete the plan and cannot be recovered. Are you absolutely sure?
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-6 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Cancel
                                    </button>
                                    {!showDeleteWarning ? (
                                        <button
                                            type="button"
                                            onClick={handleDelete}
                                            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                        >
                                            Delete Plan
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={handleConfirmDelete}
                                            disabled={processing}
                                            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                        >
                                            {processing ? 'Deleting...' : 'Yes, Delete Plan'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    );
}