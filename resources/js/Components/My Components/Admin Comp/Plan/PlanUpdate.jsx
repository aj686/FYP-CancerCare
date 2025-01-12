import { useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { PencilIcon } from "lucide-react";

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
        can_comment: plan.can_comment || false,
        can_access_forum: plan.can_access_forum || false,
        can_access_events: plan.can_access_events || false,
        can_share_stories: plan.can_share_stories || false,
        billing_interval: plan.billing_interval || 'year',
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
                className={`inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 ${className}`}
            >
                <PencilIcon className="w-4 h-4" />
                Edit
            </button>

            <dialog id={planId} className="modal">
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
                            {/* Modal Header */}
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Edit {editData.name} Details
                                        <small className="block text-sm text-gray-500">ID: {editData.plan_id}</small>
                                    </h3>
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

                                {/* Form Content */}
                                <form onSubmit={handleSubmit} className="mt-6">
                                    <div className="grid grid-cols-1 gap-6">
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

                                        {/* Features Section */}
                                        <div>
                                            <InputLabel value="Plan Features" />
                                            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <label className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={editData.can_comment}
                                                        onChange={(e) => {
                                                            setEditData("can_comment", e.target.checked);
                                                            setIsDirty(true);
                                                        }}
                                                        className="rounded border-gray-300 text-yellow-400 shadow-sm focus:ring-yellow-500"
                                                    />
                                                    <span className="text-sm text-gray-700">Can Comment on Stories</span>
                                                </label>

                                                <label className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={editData.can_access_forum}
                                                        onChange={(e) => {
                                                            setEditData("can_access_forum", e.target.checked);
                                                            setIsDirty(true);
                                                        }}
                                                        className="rounded border-gray-300 text-yellow-400 shadow-sm focus:ring-yellow-500"
                                                    />
                                                    <span className="text-sm text-gray-700">Access to Forum</span>
                                                </label>

                                                <label className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={editData.can_access_events}
                                                        onChange={(e) => {
                                                            setEditData("can_access_events", e.target.checked);
                                                            setIsDirty(true);
                                                        }}
                                                        className="rounded border-gray-300 text-yellow-400 shadow-sm focus:ring-yellow-500"
                                                    />
                                                    <span className="text-sm text-gray-700">Access to Events</span>
                                                </label>

                                                <label className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={editData.can_share_stories}
                                                        onChange={(e) => {
                                                            setEditData("can_share_stories", e.target.checked);
                                                            setIsDirty(true);
                                                        }}
                                                        className="rounded border-gray-300 text-yellow-400 shadow-sm focus:ring-yellow-500"
                                                    />
                                                    <span className="text-sm text-gray-700">Share Stories</span>
                                                </label>
                                            </div>
                                        </div>

                                        {/* Billing Interval */}
                                        <div>
                                            <InputLabel htmlFor="billing_interval" value="Billing Interval" />
                                            <select
                                                id="billing_interval"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                                                value={editData.billing_interval}
                                                onChange={(e) => {
                                                    setEditData("billing_interval", e.target.value);
                                                    setIsDirty(true);
                                                }}
                                            >
                                                <option value="year">Yearly</option>
                                                <option value="month">Monthly</option>
                                            </select>
                                            <InputError className="mt-2" message={errors.billing_interval} />
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

                                        {/* Form Actions */}
                                        <div className="flex justify-end gap-3">
                                            <button
                                                type="button"
                                                onClick={handleCancel}
                                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="px-4 py-2 text-sm font-medium text-white bg-yellow-400 hover:bg-yellow-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                                            >
                                                {processing ? 'Updating...' : 'Update Plan'}
                                            </button>
                                        </div>
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