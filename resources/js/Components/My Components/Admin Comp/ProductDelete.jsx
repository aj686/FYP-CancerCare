import { useForm } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

export default function ProductDelete({ children, className, productId, product }) {
    const {
        data: deleteData,
        setData: setDeleteData,
        processing,
        reset,
    } = useForm({
        product_id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        stock_quantity: product.stock_quantity,
        image: product.image,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        Inertia.post(`/admin/destroy/${product.id}`, {
            _method: "delete",
            ...deleteData,
        });
    };

    return (
        <>
            <button
                onClick={() => document.getElementById(`my_modal_4${product.id}`).showModal()}
                className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150"
            >
                Delete
            </button>

            <dialog id={productId} className="modal">
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            {/* Modal Header */}
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="flex items-start">
                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                        </svg>
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Delete Product
                                            <small className="block text-sm text-gray-500">
                                                ID: {deleteData.product_id}
                                            </small>
                                        </h3>
                                        <div className="mt-2">
                                            <p className="text-gray-600">
                                                Are you sure you want to delete <span className="font-semibold">{deleteData.name}</span>?
                                            </p>
                                            <p className="mt-2 text-sm text-gray-500">
                                                This action cannot be undone. This will permanently delete the product
                                                and all associated data.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-6 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => document.getElementById(productId).close()}
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
                                        {processing ? 'Deleting...' : 'Delete Product'}
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