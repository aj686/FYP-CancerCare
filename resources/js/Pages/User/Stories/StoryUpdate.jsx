// Components/Stories/StoryUpdate.jsx
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm, router } from "@inertiajs/react";
import { PencilIcon } from "lucide-react";
import { useState } from "react";
import { lazy, Suspense } from 'react';
import RichTextEditor from "@/Components/My Components/Admin Comp/Blog/RichTextEditor";

export default function StoryUpdate({ className, storyId, story }) {
    const [imagePreview, setImagePreview] = useState(story.thumbnail ? `/storage/${story.thumbnail}` : null);
    
    const {
        data: editData,
        setData: setEditData,
        errors,
        processing,
        reset,
    } = useForm({
        story_id: story.id,
        title: story.title,
        slug: story.slug,
        content: story.content,
        cancer_type: story.cancer_type,
        thumbnail: null,
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
        // Add _method field for Laravel to recognize it as a PATCH request
        formData.append('_method', 'PATCH');
        
        Object.keys(editData).forEach(key => {
            if (key === 'thumbnail' && editData[key] === null) {
                return;
            }
            formData.append(key, editData[key]);
        });
    
        // Use router.post with the correct route
        router.post(route('stories.update', story.id), formData, {
            forceFormData: true,
            onSuccess: () => {
                document.getElementById(storyId).close();
                reset();
                router.reload();
            },
            preserveScroll: true,
        });
    };

    return (
        <>
            <button
                onClick={() => document.getElementById(storyId).showModal()}
                className={`inline-flex items-center gap-2 ${className}`}
            >
                <PencilIcon className="w-4 h-4" />
                <span>Edit</span>
            </button>

            <dialog id={storyId} className="modal">
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
                            Edit Story
                        </h3>
                    </div>

                    <div className="modal-body py-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Title & Cancer Type */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                                <div>
                                    <InputLabel htmlFor="cancer_type" value="Cancer Type *" />
                                    <TextInput
                                        id="cancer_type"
                                        className="mt-1 block w-full"
                                        value={editData.cancer_type}
                                        onChange={(e) => setEditData("cancer_type", e.target.value)}
                                        required
                                    />
                                    <InputError className="mt-2" message={errors.cancer_type} />
                                </div>
                            </div>

                            {/* Content */}
                            <div>
                                <InputLabel htmlFor="editor-content" value="Your Story *" />
                                <div className="mt-1">
                                    <RichTextEditor 
                                        content={editData.content || ''}
                                        onChange={(newContent) => setEditData("content", newContent)}
                                    />
                                </div>
                                <InputError className="mt-2" message={errors.content} />
                            </div>

                            {/* Thumbnail */}
                            <div>
                                <InputLabel htmlFor="thumbnail" value="Photo" />
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
                                    accept="image/jpeg,image/png,image/jpg,image/gif"
                                />
                                <p className="text-sm text-gray-500 mt-1">
                                    Leave empty to keep current image. Max file size: 2MB. 
                                    Supported formats: JPEG, PNG, JPG, GIF
                                </p>
                                <InputError className="mt-2" message={errors.thumbnail} />
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    className={`flex-1 text-center items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 focus:bg-indigo-800 active:bg-indigo-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                                        processing && "opacity-25"
                                    }`}
                                    disabled={processing}
                                >
                                    {processing ? "Updating..." : "Update Story"}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => document.getElementById(storyId).close()}
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