import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { PlusIcon } from "lucide-react";

export default function PlanAdd({ disabled, className = "" }) {
    const { data, setData, post, reset, errors, processing } = useForm({
        name: "",
        slug: "",
        stripe_plan: "",
        price: "",
        description: "",
        can_comment: false,
        can_access_forum: false,
        can_access_events: false,
        can_share_stories: false,
        billing_interval: "year",
    });

    const generateSlug = (name) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    };

    const handleNameChange = (e) => {
        const newName = e.target.value;
        setData({
            ...data,
            name: newName,
            slug: generateSlug(newName),
        });
    };

    const submit = (e) => {
        e.preventDefault();
        post("/admin/create-plans", {
            onSuccess: () => {
                document.getElementById("plan_modal").close();
                reset();
            },
            preserveScroll: true,
        });
    };

    const handleModalClose = () => {
        reset();
        document.getElementById("plan_modal").close();
    };

    return (
        <>
            <button
                onClick={() => document.getElementById("plan_modal").showModal()}
                className={
                    `inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 focus:bg-green-800 active:bg-green-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 ${
                        disabled && "opacity-25"
                    } ` + className
                }
                disabled={disabled}
            >
                <PlusIcon className="w-4 h-4 mr-2" />
                Add Plan
            </button>

            <dialog id="plan_modal" className="modal">
                {/* Modal Backdrop */}
                <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>

                {/* Modal Content */}
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
                            {/* Modal Header */}
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="flex items-start justify-between">
                                    <h3 className="text-xl font-semibold leading-6 text-gray-900">
                                        Add New Plan
                                    </h3>
                                    <button
                                        onClick={handleModalClose}
                                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        <span className="sr-only">Close</span>
                                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Form Content */}
                                <form onSubmit={submit} method="post" className="mt-6 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Name */}
                                        <div className="col-span-2">
                                            <InputLabel htmlFor="name" value="Plan Name" />
                                            <TextInput
                                                id="name"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={data.name}
                                                onChange={handleNameChange}
                                                required
                                                placeholder="Enter plan name"
                                            />
                                            <InputError className="mt-2" message={errors.name} />
                                        </div>

                                        {/* Slug */}
                                        <div className="col-span-2">
                                            <InputLabel htmlFor="slug" value="Slug" />
                                            <TextInput
                                                id="slug"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={data.slug}
                                                onChange={(e) => setData("slug", e.target.value)}
                                                required
                                                placeholder="auto-generated-slug"
                                            />
                                            <InputError className="mt-2" message={errors.slug} />
                                        </div>

                                        {/* Stripe Plan ID */}
                                        <div>
                                            <InputLabel htmlFor="stripe_plan" value="Stripe Plan ID" />
                                            <TextInput
                                                id="stripe_plan"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={data.stripe_plan}
                                                onChange={(e) => setData("stripe_plan", e.target.value)}
                                                required
                                                placeholder="Enter Stripe Plan ID"
                                            />
                                            <InputError className="mt-2" message={errors.stripe_plan} />
                                        </div>

                                        {/* Price */}
                                        <div>
                                            <InputLabel htmlFor="price" value="Price (RM)" />
                                            <TextInput
                                                id="price"
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                className="mt-1 block w-full"
                                                value={data.price}
                                                onChange={(e) => setData("price", e.target.value)}
                                                required
                                                placeholder="0.00"
                                            />
                                            <InputError className="mt-2" message={errors.price} />
                                        </div>

                                        {/* Billing Interval */}
                                        <div>
                                            <InputLabel htmlFor="billing_interval" value="Billing Interval" />
                                            <select
                                                id="billing_interval"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                value={data.billing_interval}
                                                onChange={(e) => setData("billing_interval", e.target.value)}
                                                required
                                            >
                                                <option value="year">Yearly</option>
                                                <option value="month">Monthly</option>
                                            </select>
                                            <InputError className="mt-2" message={errors.billing_interval} />
                                        </div>

                                        {/* Features */}
                                        <div className="col-span-2">
                                            <InputLabel value="Plan Features" />
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <label className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={data.can_comment}
                                                        onChange={(e) => setData("can_comment", e.target.checked)}
                                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    />
                                                    <span className="text-sm text-gray-700">Can Comment on Stories</span>
                                                </label>

                                                <label className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={data.can_access_forum}
                                                        onChange={(e) => setData("can_access_forum", e.target.checked)}
                                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    />
                                                    <span className="text-sm text-gray-700">Access to Forum</span>
                                                </label>

                                                <label className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={data.can_access_events}
                                                        onChange={(e) => setData("can_access_events", e.target.checked)}
                                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    />
                                                    <span className="text-sm text-gray-700">Access to All Events</span>
                                                </label>

                                                <label className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={data.can_share_stories}
                                                        onChange={(e) => setData("can_share_stories", e.target.checked)}
                                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    />
                                                    <span className="text-sm text-gray-700">Share Journey Stories</span>
                                                </label>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div className="col-span-2">
                                            <InputLabel htmlFor="description" value="Description" />
                                            <textarea
                                                id="description"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                value={data.description}
                                                onChange={(e) => setData("description", e.target.value)}
                                                required
                                                rows="4"
                                                placeholder="Enter plan description"
                                            />
                                            <InputError className="mt-2" message={errors.description} />
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="mt-6 flex justify-end gap-3">
                                        <button
                                            type="button"
                                            onClick={handleModalClose}
                                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors duration-200"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className={`px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors duration-200 ${
                                                processing ? 'opacity-75 cursor-not-allowed' : ''
                                            }`}
                                            disabled={processing}
                                        >
                                            {processing ? 'Adding...' : 'Add New Plan'}
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