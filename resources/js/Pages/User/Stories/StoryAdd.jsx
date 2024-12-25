// StoryAdd.jsx
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useState, useEffect } from 'react';
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
    const [imagePreview, setImagePreview] = useState(null);

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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('thumbnail', file);
            const reader = new FileReader();
            reader.onload = (e) => setImagePreview(e.target.result);
            reader.readAsDataURL(file);
            setIsDirty(true);
        }
    };

    const submit = (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        // Ensure all fields are added to FormData
        formData.append('title', data.title);
        formData.append('slug', data.slug);
        formData.append('content', data.content);
        formData.append('cancer_type', data.cancer_type);
        
        // Handle thumbnail specifically
        if (data.thumbnail) {
            formData.append('thumbnail', data.thumbnail);
        }
    
        post(route('stories.store'), {
            data: formData,
            forceFormData: true,
            onSuccess: () => {
                document.getElementById("story_modal").close();
                reset();
                setIsDirty(false);
                setImagePreview(null);
            },
            preserveScroll: true,
            onError: (errors) => {
                console.error('Submission errors:', errors);
            }
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
                                    setImagePreview(null);
                                }}
                            >
                                ✕
                            </button>
                        </form>
                        <h3 className="font-bold text-lg">Share Your Story</h3>
                    </div>

                    <div className="modal-body py-6">
                        <form onSubmit={submit} className="space-y-6">
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

                            <div>
                                <InputLabel htmlFor="thumbnail" value="Photo (Optional)" />
                                {imagePreview && (
                                    <div className="mt-2 mb-4">
                                        <img
                                            src={imagePreview}
                                            alt="Story thumbnail preview"
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
                                        file:bg-indigo-50 file:text-indigo-700
                                        hover:file:bg-indigo-100"
                                    onChange={handleImageChange}
                                    accept="image/jpeg,png,jpg,gif"
                                />
                                <p className="text-sm text-gray-500 mt-1">
                                    Max file size: 2MB. Supported formats: JPEG, PNG, JPG, GIF
                                </p>
                                <InputError className="mt-2" message={errors.thumbnail} />
                            </div>

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

                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    className={`flex-1 text-center items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 focus:bg-indigo-800 active:bg-indigo-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                                        processing && "opacity-25"
                                    }`}
                                    disabled={processing}
                                >
                                    {processing ? "Submitting..." : "Submit Your Story"}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => document.getElementById("story_modal").close()}
                                    className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md font-semibold text-xs uppercase"
                                >
                                    Cancel
                                </button>
                            </div>
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
                        setImagePreview(null);
                    }}></button>
                </form>
            </dialog>
        </>
    );
}