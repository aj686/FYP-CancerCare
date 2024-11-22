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
        
        // Create FormData to handle file upload
        const formData = new FormData();
        Object.keys(editData).forEach(key => {
            if (key === 'image' && editData[key] === null) {
                return; // Skip if no new image
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
            // Create preview URL
            const reader = new FileReader();
            reader.onload = (e) => setImagePreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <button
                onClick={() => document.getElementById(productId).showModal()}
                className={`inline-flex items-center px-4 py-2 bg-yellow-400 hover:bg-yellow-500 focus:bg-yellow-600 active:bg-yellow-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150`}
            >
                Edit
            </button>
            
            <dialog id={productId} className="modal">
                <div className="modal-box bg-slate-50 px-20 py-10">
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
                        <h3 className="font-bold text-lg">
                            Edit {product.name} Details
                            <small className="block">id: {editData.product_id}</small>
                        </h3>
                        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
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
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    value={editData.description}
                                    onChange={(e) => setEditData("description", e.target.value)}
                                    required
                                    rows="4"
                                />
                                <InputError className="mt-2" message={errors.description} />
                            </div>

                            {/* Price */}
                            <div>
                                <InputLabel htmlFor="price" value="Price" />
                                <TextInput
                                    id="price"
                                    type="number"
                                    step="0.01"
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
                                    className="mt-1 block w-full"
                                    value={editData.stock_quantity}
                                    onChange={(e) => setEditData("stock_quantity", e.target.value)}
                                    required
                                    autoComplete="stock_quantity"
                                />
                                <InputError className="mt-2" message={errors.stock_quantity} />
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

                            <button
                                type="submit"
                                className={`w-full text-center items-center px-4 py-2 bg-yellow-400 hover:bg-yellow-500 focus:bg-yellow-600 active:bg-yellow-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 ${
                                    processing && "opacity-25"
                                }`}
                                disabled={processing}
                            >
                                Confirm Update
                            </button>
                        </form>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
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