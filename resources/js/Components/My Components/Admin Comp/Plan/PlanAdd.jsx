import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import React, { useState, useEffect } from 'react';
import { PlusIcon } from 'lucide-react';

export default function PlanAdd({ className = "", disabled }) {
    const { data, setData, post, reset, errors, processing } = useForm({
        name: "",
        slug: "",
        stripe_plan: "",
        price: "",
        description: "",
    });

    const [isDirty, setIsDirty] = useState(false);

    const generateSlug = (name) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    };

    const handleNameChange = (e) => {
        const newName = e.target.value;
        setData(data => ({
            ...data,
            name: newName,
            slug: generateSlug(newName)
        }));
        setIsDirty(true);
    };

    const submit = (e) => {
        e.preventDefault();
        post("/admin/create-plans", {
            onSuccess: () => {
                document.getElementById("plan_modal").close();
                reset();
                setIsDirty(false);
            },
            preserveScroll: true,
        });
    };

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (isDirty) {
                e.preventDefault();
                e.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [isDirty]);

    return (
        <>
            <button
                onClick={() => document.getElementById("plan_modal").showModal()}
                className={`inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 focus:bg-green-800 active:bg-green-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                    disabled && "opacity-25"
                } ${className}`}
                disabled={disabled}
            >
                <PlusIcon className="w-4 h-4" />
                Add Plan
            </button>

            <dialog id="plan_modal" className="modal">
                <div className="modal-box bg-slate-50 px-10 max-h-[90vh] overflow-y-auto">
                    <div className="modal-header sticky top-0 bg-slate-50 py-2 z-10">
                        <form method="dialog">
                            <button
                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                onClick={() => {
                                    if (isDirty && !confirm('You have unsaved changes. Are you sure you want to close?')) {
                                        return;
                                    }
                                    reset();
                                    setIsDirty(false);
                                }}
                            >
                                ✕
                            </button>
                        </form>
                        <h3 className="font-bold text-lg">Add New Plan</h3>
                    </div>

                    <div className="modal-body py-6">
                        <form onSubmit={submit} className="space-y-6">
                            {/* Name & Slug Group */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <InputLabel htmlFor="name" value="Name *" />
                                    <TextInput
                                        id="name"
                                        className="mt-1 block w-full"
                                        value={data.name}
                                        onChange={handleNameChange}
                                        required
                                        placeholder="Enter plan name"
                                    />
                                    <InputError className="mt-2" message={errors.name} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="slug" value="Slug *" />
                                    <TextInput
                                        id="slug"
                                        className="mt-1 block w-full"
                                        value={data.slug}
                                        onChange={(e) => {
                                            setData("slug", e.target.value);
                                            setIsDirty(true);
                                        }}
                                        required
                                        placeholder="auto-generated-slug"
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
                                        value={data.stripe_plan}
                                        onChange={(e) => {
                                            setData("stripe_plan", e.target.value);
                                            setIsDirty(true);
                                        }}
                                        required
                                        placeholder="Enter Stripe Plan ID"
                                    />
                                    <InputError className="mt-2" message={errors.stripe_plan} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="price" value="Price *" />
                                    <TextInput
                                        id="price"
                                        type="number"
                                        step="0.01"
                                        className="mt-1 block w-full"
                                        value={data.price}
                                        onChange={(e) => {
                                            setData("price", e.target.value);
                                            setIsDirty(true);
                                        }}
                                        required
                                        placeholder="Enter price"
                                    />
                                    <InputError className="mt-2" message={errors.price} />
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <InputLabel htmlFor="description" value="Description *" />
                                <textarea
                                    id="description"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                    value={data.description}
                                    onChange={(e) => {
                                        setData("description", e.target.value);
                                        setIsDirty(true);
                                    }}
                                    required
                                    rows={4}
                                    placeholder="Enter plan description"
                                />
                                <InputError className="mt-2" message={errors.description} />
                            </div>

                            {/* Submit Button */}
                            <button
                                className={`w-full text-center items-center px-4 py-2 bg-green-600 hover:bg-green-700 focus:bg-green-800 active:bg-green-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                                    processing && "opacity-25"
                                }`}
                                disabled={processing}
                            >
                                {processing ? "Adding..." : "Add New Plan"}
                            </button>
                        </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={() => {
                        if (isDirty && !confirm('You have unsaved changes. Are you sure you want to close?')) {
                            return;
                        }
                        reset();
                        setIsDirty(false);
                    }}></button>
                </form>
            </dialog>
        </>
    );
}