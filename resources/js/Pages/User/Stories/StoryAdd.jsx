// Components/Stories/StoryAdd.jsx
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import React, { useState, useEffect } from 'react';
import { PlusIcon } from 'lucide-react';
import RichTextEditor from "@/Components/My Components/Admin Comp/Blog/RichTextEditor";

export default function StoryAdd({ className = "", disabled }) {
    const { data, setData, post, reset, errors, processing } = useForm({
        title: "",
        slug: "",
        content: "",
        cancer_type: "",
        thumbnail: null,
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

        post(route('stories.store'), {
            data: formData,
            forceFormData: true,
            onSuccess: () => {
                document.getElementById("story_modal").close();
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
                onClick={() => document.getElementById("story_modal").showModal()}
                className={`inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 focus:bg-indigo-800 active:bg-indigo-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                    disabled && "opacity-25"
                } ${className}`}
                disabled={disabled}
            >
                <PlusIcon className="w-4 h-4" />
                Share Your Story
            </button>

            <dialog id="story_modal" className="modal">
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
                        <h3 className="font-bold text-lg">Share Your Story</h3>
                    </div>

                    <div className="modal-body py-6">
                        <form onSubmit={submit} className="space-y-6">
                            {/* Title & Cancer Type Group */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <InputLabel htmlFor="title" value="Title *" />
                                    <TextInput
                                        id="title"
                                        className="mt-1 block w-full"
                                        value={data.title}
                                        onChange={handleTitleChange}
                                        required
                                        placeholder="Give your story a title"
                                    />
                                    <InputError className="mt-2" message={errors.title} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="cancer_type" value="Cancer Type *" />
                                    <TextInput
                                        id="cancer_type"
                                        className="mt-1 block w-full"
                                        value={data.cancer_type}
                                        onChange={(e) => {
                                            setData("cancer_type", e.target.value);
                                            setIsDirty(true);
                                        }}
                                        required
                                        placeholder="Type of cancer"
                                    />
                                    <InputError className="mt-2" message={errors.cancer_type} />
                                </div>
                            </div>

                            {/* Thumbnail */}
                            <div>
                                <InputLabel htmlFor="thumbnail" value="Photo (Optional)" />
                                <input
                                    type="file"
                                    id="thumbnail"
                                    className="mt-1 block w-full text-sm text-gray-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-md file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-indigo-50 file:text-indigo-700
                                        hover:file:bg-indigo-100"
                                    onChange={(e) => {
                                        setData("thumbnail", e.target.files[0]);
                                        setIsDirty(true);
                                    }}
                                    accept="image/jpeg,image/png,image/jpg,image/gif"
                                />
                                <p className="text-sm text-gray-500 mt-1">
                                    Max file size: 2MB. Supported formats: JPEG, PNG, JPG, GIF
                                </p>
                                <InputError className="mt-2" message={errors.thumbnail} />
                            </div>

                            {/* Rich Text Editor */}
                            <div>
                                <InputLabel htmlFor="editor-content" value="Your Story *" />
                                <RichTextEditor 
                                    content={data.content}
                                    onChange={(newContent) => {
                                        setData('content', newContent);
                                        setIsDirty(true);
                                    }}
                                />
                                <InputError className="mt-2" message={errors.content} />
                            </div>

                            {/* Submit Button */}
                            <button
                                className={`w-full text-center items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 focus:bg-indigo-800 active:bg-indigo-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                                    processing && "opacity-25"
                                }`}
                                disabled={processing}
                            >
                                {processing ? "Submitting..." : "Submit Your Story"}
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