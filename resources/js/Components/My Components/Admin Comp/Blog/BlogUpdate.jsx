import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm, router } from "@inertiajs/react";
import { PencilIcon } from "lucide-react";
import { useState, useEffect, lazy, Suspense } from "react";
const RichTextEditor = lazy(() => import('./RichTextEditor'));

export default function BlogUpdate({ className, blogId, blog }) {
    const [imagePreview, setImagePreview] = useState(blog.thumbnail ? `/storage/${blog.thumbnail}` : null);
    const [isDirty, setIsDirty] = useState(false);

    const {
        data: editData,
        setData: setEditData,
        errors,
        processing,
        reset,
    } = useForm({
        blog_id: blog.id,
        title: blog.title,
        slug: blog.slug,
        header: blog.header,
        thumbnail: null,
        content: blog.content,
        tags: blog.tags,
        author: blog.author,
        date: blog.date,
        active: blog.active.toString(),
        _method: 'PATCH'
    });

    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    };

    const handleTitleChange = (e) => {
        const newTitle = e.target.value;
        setEditData(data => ({
            ...data,
            title: newTitle,
            slug: generateSlug(newTitle)
        }));
        setIsDirty(true);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setEditData('thumbnail', file);
            const reader = new FileReader();
            reader.onload = (e) => setImagePreview(e.target.result);
            reader.readAsDataURL(file);
        } else {
            setEditData('thumbnail', null);
            setImagePreview(blog.thumbnail ? `/storage/${blog.thumbnail}` : null);
        }
        setIsDirty(true);
    };

    const handleClose = () => {
        if (isDirty && !confirm('You have unsaved changes. Are you sure you want to close?')) {
            return;
        }
        reset();
        setImagePreview(blog.thumbnail ? `/storage/${blog.thumbnail}` : null);
        setIsDirty(false);
        document.getElementById(blogId).close(); // Close the modal
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(editData).forEach(key => {
            if (key === 'thumbnail' && editData[key] instanceof File) {
                formData.append(key, editData[key]);
            } else {
                formData.append(key, editData[key] || '');
            }
        });

        router.post(`/admin/update-blog/${blog.id}`, formData, {
            forceFormData: true,
            onSuccess: () => {
                document.getElementById(blogId).close(); // Close the modal on success
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
                onClick={() => document.getElementById(blogId).showModal()}
                className={`inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 ${className}`}
            >
                <PencilIcon className="w-4 h-4" />
                Edit
            </button>

            <dialog id={blogId} className="modal">
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
                            {/* Modal Header */}
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Edit Blog: {editData.title}
                                        <span className="block text-sm text-gray-500">ID: {editData.blog_id}</span>
                                    </h3>
                                    <button
                                        onClick={handleClose} // Use handleClose to close the modal
                                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                                    >
                                        <span className="sr-only">Close</span>
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Form Content */}
                                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                                    {/* Title & Slug */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <InputLabel htmlFor="title" value="Title *" />
                                            <TextInput
                                                id="title"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={editData.title}
                                                onChange={handleTitleChange}
                                                required
                                            />
                                            <InputError className="mt-2" message={errors.title} />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="slug" value="Slug *" />
                                            <TextInput
                                                id="slug"
                                                type="text"
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

                                    {/* Header */}
                                    <div>
                                        <InputLabel htmlFor="header" value="Header *" />
                                        <TextInput
                                            id="header"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={editData.header}
                                            onChange={(e) => {
                                                setEditData("header", e.target.value);
                                                setIsDirty(true);
                                            }}
                                            required
                                        />
                                        <InputError className="mt-2" message={errors.header} />
                                    </div>

                                    {/* Thumbnail */}
                                    <div>
                                        <InputLabel htmlFor="thumbnail" value="Thumbnail" />
                                        {imagePreview && (
                                            <div className="mt-2 mb-4">
                                                <img
                                                    src={imagePreview}
                                                    alt="Blog thumbnail preview"
                                                    className="max-w-xs rounded-lg shadow-md"
                                                />
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            id="thumbnail"
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
                                        <InputError className="mt-2" message={errors.thumbnail} />
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <InputLabel htmlFor="content" value="Content *" />
                                        <Suspense fallback={<div>Loading editor...</div>}>
                                            <RichTextEditor
                                                content={editData.content || ''}
                                                onChange={(newContent) => {
                                                    setEditData("content", newContent);
                                                    setIsDirty(true);
                                                }}
                                            />
                                        </Suspense>
                                        <InputError className="mt-2" message={errors.content} />
                                    </div>

                                    {/* Author, Date, Status */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div>
                                            <InputLabel htmlFor="author" value="Author *" />
                                            <TextInput
                                                id="author"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={editData.author}
                                                onChange={(e) => {
                                                    setEditData("author", e.target.value);
                                                    setIsDirty(true);
                                                }}
                                                required
                                            />
                                            <InputError className="mt-2" message={errors.author} />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="date" value="Publication Date *" />
                                            <TextInput
                                                id="date"
                                                type="date"
                                                className="mt-1 block w-full"
                                                value={editData.date}
                                                onChange={(e) => {
                                                    setEditData("date", e.target.value);
                                                    setIsDirty(true);
                                                }}
                                                required
                                            />
                                            <InputError className="mt-2" message={errors.date} />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="active" value="Status *" />
                                            <select
                                                id="active"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                                                value={editData.active}
                                                onChange={(e) => {
                                                    setEditData("active", e.target.value);
                                                    setIsDirty(true);
                                                }}
                                                required
                                            >
                                                <option value="1">Active</option>
                                                <option value="0">Draft</option>
                                            </select>
                                            <InputError className="mt-2" message={errors.active} />
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    <div>
                                        <InputLabel htmlFor="tags" value="Tags" />
                                        <TextInput
                                            id="tags"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={editData.tags}
                                            onChange={(e) => {
                                                setEditData("tags", e.target.value);
                                                setIsDirty(true);
                                            }}
                                            placeholder="Enter tags separated by commas"
                                        />
                                        <p className="text-sm text-gray-500 mt-1">
                                            Separate multiple tags with commas
                                        </p>
                                        <InputError className="mt-2" message={errors.tags} />
                                    </div>

                                    {/* Submit Button */}
                                    <div className="mt-6 flex justify-end gap-3">
                                        <button
                                            type="button"
                                            onClick={handleClose} // Use handleClose to close the modal
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className={`px-4 py-2 text-sm font-medium text-white bg-yellow-400 hover:bg-yellow-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 ${
                                                processing ? 'opacity-75 cursor-not-allowed' : ''
                                            }`}
                                            disabled={processing}
                                        >
                                            {processing ? 'Updating...' : 'Update Blog'}
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