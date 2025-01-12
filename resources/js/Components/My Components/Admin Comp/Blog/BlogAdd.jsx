import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import React, { useState, useEffect } from 'react';
import { PlusIcon } from 'lucide-react';
import RichTextEditor from "./RichTextEditor";

export default function BlogAdd({ className = "", disabled }) {
    const { data, setData, post, reset, errors, processing } = useForm({
        title: "",
        slug: "",
        header: "",
        thumbnail: null,
        content: "",
        tags: "",
        author: "",
        date: new Date().toISOString().split('T')[0],
        active: "1",
    });

    const [isDirty, setIsDirty] = useState(false);

    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    };

    const handleTitleChange = (e) => {
        const newTitle = e.target.value;
        setData(data => ({
            ...data,
            title: newTitle,
            slug: generateSlug(newTitle)
        }));
        setIsDirty(true);
    };

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (key === 'thumbnail' && data[key]) {
                formData.append(key, data[key]);
            } else {
                formData.append(key, data[key] || '');
            }
        });

        post("/admin/create-blog", {
            data: formData,
            forceFormData: true,
            onSuccess: () => {
                document.getElementById("blog_modal").close();
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
                onClick={() => document.getElementById("blog_modal").showModal()}
                className={`inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 ${
                    disabled && "opacity-25"
                } ${className}`}
                disabled={disabled}
            >
                <PlusIcon className="w-4 h-4" />
                Add Blog
            </button>

            <dialog id="blog_modal" className="modal">
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
                            {/* Modal Header */}
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Add New Blog Post
                                    </h3>
                                    <button
                                        onClick={() => {
                                            if (isDirty && !confirm('You have unsaved changes. Are you sure you want to close?')) {
                                                return;
                                            }
                                            reset();
                                            setIsDirty(false);
                                            document.getElementById("blog_modal").close();
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
                                <form onSubmit={submit} className="mt-6 space-y-6">
                                    {/* Title & Slug */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <InputLabel htmlFor="title" value="Title *" />
                                            <TextInput
                                                id="title"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={data.title}
                                                onChange={handleTitleChange}
                                                required
                                                placeholder="Enter blog title"
                                            />
                                            <InputError className="mt-2" message={errors.title} />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="slug" value="Slug *" />
                                            <TextInput
                                                id="slug"
                                                type="text"
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

                                    {/* Header */}
                                    <div>
                                        <InputLabel htmlFor="header" value="Header *" />
                                        <TextInput
                                            id="header"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={data.header}
                                            onChange={(e) => {
                                                setData("header", e.target.value);
                                                setIsDirty(true);
                                            }}
                                            required
                                            placeholder="Brief description or subtitle"
                                        />
                                        <InputError className="mt-2" message={errors.header} />
                                    </div>

                                    {/* Thumbnail */}
                                    <div>
                                        <InputLabel htmlFor="thumbnail" value="Thumbnail *" />
                                        <input
                                            type="file"
                                            id="thumbnail"
                                            className="mt-1 block w-full text-sm text-gray-500
                                                file:mr-4 file:py-2 file:px-4
                                                file:rounded-md file:border-0
                                                file:text-sm file:font-semibold
                                                file:bg-green-50 file:text-green-700
                                                hover:file:bg-green-100"
                                            onChange={(e) => {
                                                setData("thumbnail", e.target.files[0]);
                                                setIsDirty(true);
                                            }}
                                            accept="image/jpeg,image/png,image/jpg,image/gif"
                                            required
                                        />
                                        <p className="text-sm text-gray-500 mt-1">
                                            Max file size: 2MB. Supported formats: JPEG, PNG, JPG, GIF
                                        </p>
                                        <InputError className="mt-2" message={errors.thumbnail} />
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <InputLabel htmlFor="content" value="Content *" />
                                        <RichTextEditor
                                            content={data.content}
                                            onChange={(newContent) => {
                                                setData("content", newContent);
                                                setIsDirty(true);
                                            }}
                                        />
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
                                                value={data.author}
                                                onChange={(e) => {
                                                    setData("author", e.target.value);
                                                    setIsDirty(true);
                                                }}
                                                required
                                                placeholder="Author name"
                                            />
                                            <InputError className="mt-2" message={errors.author} />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="date" value="Publication Date *" />
                                            <TextInput
                                                id="date"
                                                type="date"
                                                className="mt-1 block w-full"
                                                value={data.date}
                                                onChange={(e) => {
                                                    setData("date", e.target.value);
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
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                                value={data.active}
                                                onChange={(e) => {
                                                    setData("active", e.target.value);
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
                                            value={data.tags}
                                            onChange={(e) => {
                                                setData("tags", e.target.value);
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
                                            onClick={() => {
                                                if (isDirty && !confirm('You have unsaved changes. Are you sure you want to close?')) {
                                                    return;
                                                }
                                                reset();
                                                setIsDirty(false);
                                                document.getElementById("blog_modal").close();
                                            }}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className={`px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                                                processing ? 'opacity-75 cursor-not-allowed' : ''
                                            }`}
                                            disabled={processing}
                                        >
                                            {processing ? 'Adding...' : 'Add New Blog'}
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