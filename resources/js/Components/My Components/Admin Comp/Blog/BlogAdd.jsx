import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import React, { useState, useEffect } from 'react';
import { 
    Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, 
    Link, Image as ImageIcon, List, ListOrdered, Heading1, Heading2, 
    Quote, Code, PlusIcon, Undo, Redo
} from 'lucide-react';

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

    // Track if editor has unsaved changes
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

    // Rich Text Editor Functions
    const formatText = (command, value = null) => {
        document.execCommand(command, false, value);
        const content = document.getElementById('editor-content').innerHTML;
        setData('content', content);
        setIsDirty(true);
    };

    const handleKeyCommands = (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch (e.key.toLowerCase()) {
                case 'b':
                    e.preventDefault();
                    formatText('bold');
                    break;
                case 'i':
                    e.preventDefault();
                    formatText('italic');
                    break;
                case 'u':
                    e.preventDefault();
                    formatText('underline');
                    break;
                case 'z':
                    e.preventDefault();
                    if (e.shiftKey) {
                        document.execCommand('redo', false);
                    } else {
                        document.execCommand('undo', false);
                    }
                    break;
            }
        }
    };

    const insertHeading = (level) => {
        formatText('formatBlock', `h${level}`);
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            // Here you would typically upload the file to your server
            // and get back a URL. This is a simplified example
            const reader = new FileReader();
            reader.onload = (e) => {
                formatText('insertImage', e.target.result);
            };
            reader.readAsDataURL(file);
        }
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

    // Warn about unsaved changes
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

    const EditorButton = ({ onClick, children, title }) => (
        <button
            type="button"
            onClick={onClick}
            className="p-2 hover:bg-gray-200 rounded transition-colors duration-200"
            title={title}
        >
            {children}
        </button>
    );

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
                                <div className="mt-1 border rounded-md border-gray-300 shadow-sm focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500">
                                    {/* Editor Toolbar */}
                                    <div className="border-b border-gray-300 bg-gray-50 p-2 flex flex-wrap gap-2">
                                        {/* Text Formatting */}
                                        <div className="flex items-center gap-1 border-r pr-2">
                                            <EditorButton onClick={() => formatText('bold')} title="Bold (Ctrl+B)">
                                                <Bold className="w-4 h-4" />
                                            </EditorButton>
                                            <EditorButton onClick={() => formatText('italic')} title="Italic (Ctrl+I)">
                                                <Italic className="w-4 h-4" />
                                            </EditorButton>
                                            <EditorButton onClick={() => formatText('underline')} title="Underline (Ctrl+U)">
                                                <Underline className="w-4 h-4" />
                                            </EditorButton>
                                        </div>

                                        {/* Alignment */}
                                        <div className="flex items-center gap-1 border-r pr-2">
                                            <EditorButton onClick={() => formatText('justifyLeft')} title="Align Left">
                                                <AlignLeft className="w-4 h-4" />
                                            </EditorButton>
                                            <EditorButton onClick={() => formatText('justifyCenter')} title="Align Center">
                                                <AlignCenter className="w-4 h-4" />
                                            </EditorButton>
                                            <EditorButton onClick={() => formatText('justifyRight')} title="Align Right">
                                                <AlignRight className="w-4 h-4" />
                                            </EditorButton>
                                        </div>

                                        {/* Headings */}
                                        <div className="flex items-center gap-1 border-r pr-2">
                                            <EditorButton onClick={() => insertHeading(1)} title="Heading 1">
                                                <Heading1 className="w-4 h-4" />
                                            </EditorButton>
                                            <EditorButton onClick={() => insertHeading(2)} title="Heading 2">
                                                <Heading2 className="w-4 h-4" />
                                            </EditorButton>
                                        </div>

                                        {/* Lists */}
                                        <div className="flex items-center gap-1 border-r pr-2">
                                            <EditorButton onClick={() => formatText('insertUnorderedList')} title="Bullet List">
                                                <List className="w-4 h-4" />
                                            </EditorButton>
                                            <EditorButton onClick={() => formatText('insertOrderedList')} title="Numbered List">
                                                <ListOrdered className="w-4 h-4" />
                                            </EditorButton>
                                        </div>

                                        {/* Other Formatting */}
                                        <div className="flex items-center gap-1 border-r pr-2">
                                            <EditorButton onClick={() => formatText('formatBlock', 'blockquote')} title="Quote">
                                                <Quote className="w-4 h-4" />
                                            </EditorButton>
                                            <EditorButton onClick={() => formatText('formatBlock', 'pre')} title="Code Block">
                                                <Code className="w-4 h-4" />
                                            </EditorButton>
                                        </div>

                                        {/* Links and Images */}
                                        <div className="flex items-center gap-1">
                                            <EditorButton
                                                onClick={() => {
                                                    const url = prompt('Enter URL:');
                                                    if (url) formatText('createLink', url);
                                                }}
                                                title="Insert Link"
                                            >
                                                <Link className="w-4 h-4" />
                                            </EditorButton>
                                            <div className="relative">
                                                <EditorButton
                                                    onClick={() => document.getElementById('image-upload').click()}
                                                    title="Insert Image"
                                                >
                                                    <ImageIcon className="w-4 h-4" />
                                                </EditorButton>
                                                <input
                                                    type="file"
                                                    id="image-upload"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                />
                                            </div>
                                        </div>

                                        {/* Undo/Redo */}
                                        <div className="flex items-center gap-1 ml-auto">
                                            <EditorButton onClick={() => document.execCommand('undo')} title="Undo (Ctrl+Z)">
                                                <Undo className="w-4 h-4" />
                                            </EditorButton>
                                            <EditorButton onClick={() => document.execCommand('redo')} title="Redo (Ctrl+Shift+Z)">
                                            <Redo className="w-4 h-4" />
                                            </EditorButton>
                                        </div>
                                    </div>

                                    {/* Editor Content Area */}
                                    <div
                                        id="editor-content"
                                        contentEditable="true"
                                        className="min-h-[300px] p-4 focus:outline-none prose max-w-none"
                                        onInput={(e) => {
                                            setData('content', e.currentTarget.innerHTML);
                                            setIsDirty(true);
                                        }}
                                        onKeyDown={handleKeyCommands}
                                        dangerouslySetInnerHTML={{ __html: data.content }}
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