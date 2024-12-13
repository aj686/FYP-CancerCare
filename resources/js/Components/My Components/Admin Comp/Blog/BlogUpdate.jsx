import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm, router } from "@inertiajs/react";
import { PencilIcon } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import { lazy, Suspense } from 'react';
const RichTextEditor = lazy(() => import('./RichTextEditor'));

export default function BlogUpdate({ className, blogId, blog }) {
    const [imagePreview, setImagePreview] = useState(blog.thumbnail ? `/storage/${blog.thumbnail}` : null);
    
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
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setEditData('thumbnail', file);
            const reader = new FileReader();
            reader.onload = (e) => setImagePreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        Object.keys(editData).forEach(key => {
            if (key === 'thumbnail' && editData[key] === null) {
                return;
            }
            formData.append(key, editData[key]);
        });

        // Replace Inertia.post with router.post
        router.post(`/admin/update-blog/${blog.id}`, formData, {
            forceFormData: true,
            onSuccess: () => {
                document.getElementById(blogId).close();
                reset();
            },
            preserveScroll: true,
        });
    };

    return (
        <>
            <button
                onClick={() => document.getElementById(blogId).showModal()}
                className={`inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 focus:bg-yellow-600 active:bg-yellow-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition ease-in-out duration-150 ${className}`}
            >
                <PencilIcon className="w-4 h-4" />
                Edit
            </button>

            <dialog id={blogId} className="modal">
                <div className="modal-box bg-slate-50 px-10 max-h-[90vh] overflow-y-auto">
                    <div className="modal-header sticky top-0 bg-slate-50 py-2">
                        <form method="dialog">
                            <button
                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                onClick={() => reset()}
                            >
                                ✕
                            </button>
                        </form>
                        <h3 className="font-bold text-lg">
                            Edit Blog: {editData.title}
                            <span className="block text-sm text-gray-500">ID: {editData.blog_id}</span>
                        </h3>
                    </div>

                    <div className="modal-body py-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Title & Slug Group */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Title */}
                                <div>
                                    <InputLabel htmlFor="title" value="Title *" />
                                    <TextInput
                                        id="title"
                                        className="mt-1 block w-full"
                                        value={editData.title}
                                        onChange={handleTitleChange}
                                        required
                                    />
                                    <InputError className="mt-2" message={errors.title} />
                                </div>

                                {/* Slug */}
                                <div>
                                    <InputLabel htmlFor="slug" value="Slug *" />
                                    <TextInput
                                        id="slug"
                                        className="mt-1 block w-full"
                                        value={editData.slug}
                                        onChange={(e) => setEditData("slug", e.target.value)}
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
                                    className="mt-1 block w-full"
                                    value={editData.header}
                                    onChange={(e) => setEditData("header", e.target.value)}
                                    required
                                />
                                <InputError className="mt-2" message={errors.header} />
                            </div>

                            {/* Content */}
                            <div>
                                <InputLabel htmlFor="editor-content" value="Content *" />
                                <div className="mt-1">
                                    <RichTextEditor 
                                        content={editData.content || ''}
                                        onChange={(newContent) => setEditData("content", newContent)}
                                    />
                                </div>
                                <InputError className="mt-2" message={errors.content} />
                            </div>

                            {/* Author, Date, Tags Group */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Author */}
                                <div>
                                    <InputLabel htmlFor="author" value="Author *" />
                                    <TextInput
                                        id="author"
                                        className="mt-1 block w-full"
                                        value={editData.author}
                                        onChange={(e) => setEditData("author", e.target.value)}
                                        required
                                    />
                                    <InputError className="mt-2" message={errors.author} />
                                </div>

                                {/* Date */}
                                <div>
                                    <InputLabel htmlFor="date" value="Publication Date *" />
                                    <TextInput
                                        id="date"
                                        type="date"
                                        className="mt-1 block w-full"
                                        value={editData.date}
                                        onChange={(e) => setEditData("date", e.target.value)}
                                        required
                                    />
                                    <InputError className="mt-2" message={errors.date} />
                                </div>

                                {/* Active Status */}
                                <div>
                                    <InputLabel htmlFor="active" value="Status *" />
                                    <select
                                        id="active"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                                        value={editData.active}
                                        onChange={(e) => setEditData("active", e.target.value)}
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
                                    className="mt-1 block w-full"
                                    value={editData.tags}
                                    onChange={(e) => setEditData("tags", e.target.value)}
                                    placeholder="Enter tags separated by commas"
                                />
                                <p className="text-sm text-gray-500 mt-1">
                                    Separate multiple tags with commas
                                </p>
                                <InputError className="mt-2" message={errors.tags} />
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

                            {/* Submit Button */}
                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    className={`flex-1 text-center items-center px-4 py-2 bg-yellow-400 hover:bg-yellow-500 focus:bg-yellow-600 active:bg-yellow-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                                        processing && "opacity-25"
                                    }`}
                                    disabled={processing}
                                >
                                    {processing ? "Updating..." : "Update Blog"}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => document.getElementById(blogId).close()}
                                    className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md font-semibold text-xs uppercase"
                                >
                                    Cancel
                                </button>
                            </div>
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