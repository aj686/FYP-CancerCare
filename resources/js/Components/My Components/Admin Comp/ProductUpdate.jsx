import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";

export default function ProductUpdate({ className, productId, product }) {
    const [imagePreview, setImagePreview] = useState(product.image ? `/storage/${product.image}` : null);

    const {
        data: editData,
        setData: setEditData,
        errors,
        processing,
        reset
    } = useForm({
        product_id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        stock_quantity: product.stock_quantity,
        image: null,
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

        Inertia.post(`/admin/update/${product.id}`, formData, {
            forceFormData: true,
            onSuccess: () => {
                document.getElementById(productId).close();
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
                onClick={() => document.getElementById(productId).showModal()}
                className="inline-flex items-center px-4 py-2 bg-yellow-400 hover:bg-yellow-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150"
            >
                Edit
            </button>

            <dialog id={productId} className="modal">
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
                            {/* Modal Header */}
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Edit Product
                                        <small className="block text-sm text-gray-500">ID: {editData.product_id}</small>
                                    </h3>
                                    <button
                                        onClick={() => {
                                            document.getElementById(productId).close();
                                            reset();
                                        }}
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
                                        {/* Name */}
                                        <div>
                                            <InputLabel htmlFor="name" value="Name" />
                                            <TextInput
                                                id="name"
                                                className="mt-1 block w-full"
                                                value={editData.name}
                                                onChange={(e) => setEditData("name", e.target.value)}
                                                required
                                                isFocused
                                                autoComplete="name"
                                            />
                                            <InputError className="mt-2" message={errors.name} />
                                        </div>

                                        {/* Slug */}
                                        <div>
                                            <InputLabel htmlFor="slug" value="Slug" />
                                            <TextInput
                                                id="slug"
                                                className="mt-1 block w-full"
                                                value={editData.slug}
                                                onChange={(e) => setEditData("slug", e.target.value)}
                                                required
                                                autoComplete="slug"
                                            />
                                            <InputError className="mt-2" message={errors.slug} />
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
                                            <InputError className="mt-2" message={errors.description} />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Price */}
                                            <div>
                                                <InputLabel htmlFor="price" value="Price" />
                                                <TextInput
                                                    id="price"
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    className="mt-1 block w-full"
                                                    value={editData.price}
                                                    onChange={(e) => setEditData("price", e.target.value)}
                                                    required
                                                    autoComplete="price"
                                                />
                                                <InputError className="mt-2" message={errors.price} />
                                            </div>

                                            {/* Stock Quantity */}
                                            <div>
                                                <InputLabel htmlFor="stock_quantity" value="Stock Quantity" />
                                                <TextInput
                                                    id="stock_quantity"
                                                    type="number"
                                                    min="0"
                                                    className="mt-1 block w-full"
                                                    value={editData.stock_quantity}
                                                    onChange={(e) => setEditData("stock_quantity", e.target.value)}
                                                    required
                                                    autoComplete="stock_quantity"
                                                />
                                                <InputError className="mt-2" message={errors.stock_quantity} />
                                            </div>
                                        </div>

                                        {/* Image */}
                                        <div>
                                            <InputLabel htmlFor="image" value="Current Image" />
                                            {imagePreview && (
                                                <div className="mt-2 mb-4">
                                                    <img
                                                        src={imagePreview}
                                                        alt="Product preview"
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
                                    </div>

                                    {/* Form Actions */}
                                    <div className="mt-6 flex justify-end gap-3">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                document.getElementById(productId).close();
                                                reset();
                                            }}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="px-4 py-2 text-sm font-medium text-white bg-yellow-400 hover:bg-yellow-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                                        >
                                            {processing ? 'Updating...' : 'Update Product'}
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