import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { PencilIcon } from "lucide-react";
import { useState } from "react";

export default function PlanUpdate({ className, planId, plan }) {
    const [isDirty, setIsDirty] = useState(false);
    
    const {
        data: editData,
        setData: setEditData,
        errors,
        processing,
        reset,
    } = useForm({
        plan_id: plan.id,
        name: plan.name,
        slug: plan.slug,
        stripe_plan: plan.stripe_plan,
        price: plan.price,
        description: plan.description,
        _method: 'PATCH'
    });

    const generateSlug = (name) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    };

    const handleNameChange = (e) => {
        const newName = e.target.value;
        setEditData(data => ({
            ...data,
            name: newName,
            slug: generateSlug(newName)
        }));
        setIsDirty(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        Inertia.post(`/admin/update-plans/${plan.id}`, editData, {
            onSuccess: () => {
                document.getElementById(planId).close();
                reset();
                setIsDirty(false);
            },
            preserveScroll: true,
        });
    };

    const handleCancel = () => {
        if (isDirty && !confirm('You have unsaved changes. Are you sure you want to close?')) {
            return;
        }
        document.getElementById(planId).close();
        reset();
        setIsDirty(false);
    };

    return (
        <>
            <button
                onClick={() => document.getElementById(planId).showModal()}
                className={`inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 focus:bg-yellow-600 active:bg-yellow-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition ease-in-out duration-150 ${className}`}
            >
                <PencilIcon className="w-4 h-4" />
                Edit
            </button>

            <dialog id={planId} className="modal">
                <div className="modal-box bg-slate-50 px-10 max-h-[90vh] overflow-y-auto">
                    <div className="modal-header sticky top-0 bg-slate-50 py-2 z-10">
                        <form method="dialog">
                            <button
                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                onClick={handleCancel}
                            >
                                ✕
                            </button>
                        </form>
                        <h3 className="font-bold text-lg">
                            Edit Plan: {editData.name}
                            <span className="block text-sm text-gray-500">ID: {editData.plan_id}</span>
                        </h3>
                    </div>

                    <div className="modal-body py-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name & Slug Group */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <InputLabel htmlFor="name" value="Name *" />
                                    <TextInput
                                        id="name"
                                        className="mt-1 block w-full"
                                        value={editData.name}
                                        onChange={handleNameChange}
                                        required
                                    />
                                    <InputError className="mt-2" message={errors.name} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="slug" value="Slug *" />
                                    <TextInput
                                        id="slug"
                                        className="mt-1 block w-full"
                                        value={editData.slug}
                                        onChange={(e) => {
                                            setEditData("slug", e.target.value);
                                            setIsDirty(true);
                                        }}
                                        required
                                    />
                                    <InputError className="mt-2" message={errors.slug} />
                                </div>
                            </div>

                            {/* Stripe Plan & Price Group */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <InputLabel htmlFor="stripe_plan" value="Stripe Plan ID *" />
                                    <TextInput
                                        id="stripe_plan"
                                        className="mt-1 block w-full"
                                        value={editData.stripe_plan}
                                        onChange={(e) => {
                                            setEditData("stripe_plan", e.target.value);
                                            setIsDirty(true);
                                        }}
                                        required
                                    />
                                    <InputError className="mt-2" message={errors.stripe_plan} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="price" value="Price *" />
                                    <TextInput
                                        id="price"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        className="mt-1 block w-full"
                                        value={editData.price}
                                        onChange={(e) => {
                                            setEditData("price", e.target.value);
                                            setIsDirty(true);
                                        }}
                                        required
                                    />
                                    <InputError className="mt-2" message={errors.price} />
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <InputLabel htmlFor="description" value="Description *" />
                                <textarea
                                    id="description"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                                    value={editData.description}
                                    onChange={(e) => {
                                        setEditData("description", e.target.value);
                                        setIsDirty(true);
                                    }}
                                    required
                                    rows={4}
                                />
                                <InputError className="mt-2" message={errors.description} />
                            </div>

                            {/* Submit and Cancel Buttons */}
                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    className={`flex-1 text-center items-center px-4 py-2 bg-yellow-400 hover:bg-yellow-500 focus:bg-yellow-600 active:bg-yellow-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                                        processing && "opacity-25"
                                    }`}
                                    disabled={processing}
                                >
                                    {processing ? "Updating..." : "Update Plan"}
                                </button>

                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md font-semibold text-xs uppercase"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={handleCancel}></button>
                </form>
            </dialog>
        </>
    );
}