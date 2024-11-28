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
                className={`inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 focus:bg-green-800 active:bg-green-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                    disabled && "opacity-25"
                } ${className}`}
                disabled={disabled}
            >
                <PlusIcon className="w-4 h-4" />
                Add Blog
            </button>

            <dialog id="blog_modal" className="modal">
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
                        <h3 className="font-bold text-lg">Add New Blog Post</h3>
                    </div>

                    <div className="modal-body py-6">
                        <form onSubmit={submit} className="space-y-6">
                            {/* Title & Slug Group */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <InputLabel htmlFor="title" value="Title *" />
                                    <TextInput
                                        id="title"
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

                            {/* Rich Text Editor */}
                            <div>
                                <InputLabel htmlFor="editor-content" value="Content *" />
                                <RichTextEditor 
                                    content={data.content}
                                    onChange={(newContent) => {
                                        setData('content', newContent);
                                        setIsDirty(true);
                                    }}
                                />
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

                                {/* Date */}
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

                                {/* Active Status */}
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
                                    className="mt-1 block w-full"
                                    value={data.tags}
                                    onChange={(e) => {
                                        setData("tags", e.target.value);
                                        setIsDirty(true);
                                    }}
                                    placeholder="Enter tags separated by commas (e.g., health, research, news)"
                                />
                                <p className="text-sm text-gray-500 mt-1">
                                    Separate multiple tags with commas
                                </p>
                                <InputError className="mt-2" message={errors.tags} />
                            </div>

                            {/* Submit Button */}
                            <button
                                className={`w-full text-center items-center px-4 py-2 bg-green-600 hover:bg-green-700 focus:bg-green-800 active:bg-green-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                                    processing && "opacity-25"
                                }`}
                                disabled={processing}
                            >
                                {processing ? "Adding..." : "Add New Blog"}
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