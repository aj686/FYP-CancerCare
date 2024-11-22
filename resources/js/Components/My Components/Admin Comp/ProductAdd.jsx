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
                        <h3 className="font-bold text-lg">Add New Product</h3>
                        <form onSubmit={submit} className="mt-6 space-y-6">
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
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    value={data.description}
                                    onChange={(e) => setData("description", e.target.value)}
                                    required
                                    rows="4"
                                    placeholder="Product description"
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

                            {/* Image */}
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
                                type="submit"
                                className={`w-full text-center items-center px-4 py-2 bg-green-600 hover:bg-green-700 focus:bg-green-800 active:bg-green-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 ${
                                    processing && "opacity-25"
                                }`}
                                disabled={processing}
                            >
                                Add New Product
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