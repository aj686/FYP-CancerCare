import { useForm } from "@inertiajs/react";
import { TrashIcon } from "lucide-react";

export default function BlogDelete({ className, blogId, blog }) {
    const { data, processing, reset } = useForm({
        blog_id: blog.id,
        title: blog.title
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.blogs.destroy', blog.id), {
            preserveScroll: true,
            onSuccess: () => {
                document.getElementById(blogId).close();
                reset();
            },
        });
    };

    return (
        <>
            <button
                onClick={() => document.getElementById(blogId).showModal()}
                className={`inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 focus:bg-red-800 active:bg-red-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150 ${className}`}
            >
                <TrashIcon className="w-4 h-4" />
                Delete
            </button>

            <dialog id={blogId} className="modal">
                <div className="modal-box bg-slate-50 px-6 py-4">
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
                    <div className="modal-body">
                        <h3 className="font-bold text-lg text-red-600 mb-4">
                            Delete Confirmation
                        </h3>
                        <p className="text-gray-700 mb-2">
                            Are you sure you want to delete the blog post:
                        </p>
                        <p className="font-semibold text-gray-900 mb-4">
                            "{data.title}"?
                        </p>
                        <p className="text-sm text-gray-500 mb-6">
                            This action cannot be undone.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <button
                                type="submit"
                                className={`w-full text-center items-center px-4 py-2 bg-red-600 hover:bg-red-700 focus:bg-red-800 active:bg-red-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                                    processing && "opacity-25"
                                }`}
                                disabled={processing}
                            >
                                {processing ? "Deleting..." : "Confirm Delete"}
                            </button>

                            <button
                                type="button"
                                onClick={() => document.getElementById(blogId).close()}
                                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md font-semibold text-xs uppercase"
                            >
                                Cancel
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