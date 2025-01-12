import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";

export default function ProductAdd({ className = "", disabled }) {
    const { data, setData, post, reset, errors, processing } = useForm({
        name: "",
        slug: "",
        description: "",
        price: "",
        stock_quantity: "",
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();

        post("/admin/create", {
            preserveScroll: true,
            onSuccess: () => {
                document.getElementById("product_modal").close();
                reset();
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    // Generate slug automatically from name
    const handleNameChange = (e) => {
        const name = e.target.value;
        setData(data => ({
            ...data,
            name,
            slug: name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '')
        }));
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
                Add Product
            </button>

            <dialog id="product_modal" className="modal">
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
                            {/* Modal Header */}
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Add New Product
                                    </h3>
                                    <button
                                        onClick={() => {
                                            document.getElementById("product_modal").close();
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
                                <form onSubmit={submit} className="mt-6">
                                    <div className="grid grid-cols-1 gap-6">
                                        {/* Product Name */}
                                        <div>
                                            <InputLabel htmlFor="name" value="Product Name" />
                                            <TextInput
                                                id="name"
                                                className="mt-1 block w-full"
                                                value={data.name}
                                                onChange={handleNameChange}
                                                required
                                                isFocused
                                                autoComplete="name"
                                                placeholder="Enter product name"
                                            />
                                            <InputError className="mt-2" message={errors.name} />
                                        </div>

                                        {/* Slug */}
                                        <div>
                                            <InputLabel htmlFor="slug" value="Slug" />
                                            <TextInput
                                                id="slug"
                                                className="mt-1 block w-full"
                                                value={data.slug}
                                                onChange={(e) => setData("slug", e.target.value)}
                                                required
                                                autoComplete="slug"
                                                placeholder="product-url-slug"
                                            />
                                            <InputError className="mt-2" message={errors.slug} />
                                        </div>

                                        {/* Description */}
                                        <div>
                                            <InputLabel htmlFor="description" value="Description" />
                                            <textarea
                                                id="description"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                value={data.description}
                                                onChange={(e) => setData("description", e.target.value)}
                                                required
                                                rows="4"
                                                placeholder="Product description"
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
                                                    value={data.price}
                                                    onChange={(e) => setData("price", e.target.value)}
                                                    required
                                                    autoComplete="price"
                                                    placeholder="0.00"
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
                                                    value={data.stock_quantity}
                                                    onChange={(e) => setData("stock_quantity", e.target.value)}
                                                    required
                                                    autoComplete="stock_quantity"
                                                    placeholder="0"
                                                />
                                                <InputError className="mt-2" message={errors.stock_quantity} />
                                            </div>
                                        </div>

                                        {/* Image */}
                                        <div>
                                            <InputLabel htmlFor="image" value="Product Image" />
                                            <input
                                                id="image"
                                                type="file"
                                                className="mt-1 block w-full text-sm text-gray-500
                                                    file:mr-4 file:py-2 file:px-4
                                                    file:rounded-md file:border-0
                                                    file:text-sm file:font-semibold
                                                    file:bg-green-50 file:text-green-700
                                                    hover:file:bg-green-100"
                                                onChange={(e) => setData("image", e.target.files[0])}
                                                accept="image/jpeg,image/png,image/jpg,image/gif"
                                                required
                                            />
                                            <p className="text-sm text-gray-500 mt-1">
                                                Max file size: 2MB. Supported formats: JPEG, PNG, JPG, GIF
                                            </p>
                                            <InputError className="mt-2" message={errors.image} />
                                        </div>
                                    </div>

                                    {/* Form Actions */}
                                    <div className="mt-6 flex justify-end gap-3">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                document.getElementById("product_modal").close();
                                                reset();
                                            }}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                        >
                                            {processing ? 'Adding...' : 'Add Product'}
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