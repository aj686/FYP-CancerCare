import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import { 
    Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, 
    Link as LinkIcon, Image as ImageIcon, List, ListOrdered, 
    Heading1, Heading2, Quote, Code, Undo, Redo
} from 'lucide-react';

const EditorButton = ({ onClick, children, title, isActive = false }) => (
    <button
        type="button"
        onClick={onClick}
        className={`p-2 hover:bg-gray-200 rounded transition-colors duration-200 ${
            isActive ? 'bg-gray-200' : ''
        }`}
        title={title}
    >
        {children}
    </button>
);

const EditorMenuBar = ({ editor }) => {
    if (!editor) {
        return null;
    }

    return (
        <div className="border-b border-gray-300 bg-gray-50 p-2 flex flex-wrap gap-2">
            {/* Text Formatting */}
            <div className="flex items-center gap-1 border-r pr-2">
                <EditorButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    isActive={editor.isActive('bold')}
                    title="Bold (Ctrl+B)"
                >
                    <Bold className="w-4 h-4" />
                </EditorButton>
                <EditorButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    isActive={editor.isActive('italic')}
                    title="Italic (Ctrl+I)"
                >
                    <Italic className="w-4 h-4" />
                </EditorButton>
                <EditorButton
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    isActive={editor.isActive('underline')}
                    title="Underline (Ctrl+U)"
                >
                    <Underline className="w-4 h-4" />
                </EditorButton>
            </div>

            {/* Alignment */}
            <div className="flex items-center gap-1 border-r pr-2">
                <EditorButton
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    isActive={editor.isActive({ textAlign: 'left' })}
                    title="Align Left"
                >
                    <AlignLeft className="w-4 h-4" />
                </EditorButton>
                <EditorButton
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    isActive={editor.isActive({ textAlign: 'center' })}
                    title="Align Center"
                >
                    <AlignCenter className="w-4 h-4" />
                </EditorButton>
                <EditorButton
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    isActive={editor.isActive({ textAlign: 'right' })}
                    title="Align Right"
                >
                    <AlignRight className="w-4 h-4" />
                </EditorButton>
            </div>

            {/* Headings */}
            <div className="flex items-center gap-1 border-r pr-2">
                <EditorButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    isActive={editor.isActive('heading', { level: 1 })}
                    title="Heading 1"
                >
                    <Heading1 className="w-4 h-4" />
                </EditorButton>
                <EditorButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    isActive={editor.isActive('heading', { level: 2 })}
                    title="Heading 2"
                >
                    <Heading2 className="w-4 h-4" />
                </EditorButton>
            </div>

            {/* Lists */}
            <div className="flex items-center gap-1 border-r pr-2">
                <EditorButton
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    isActive={editor.isActive('bulletList')}
                    title="Bullet List"
                >
                    <List className="w-4 h-4" />
                </EditorButton>
                <EditorButton
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    isActive={editor.isActive('orderedList')}
                    title="Numbered List"
                >
                    <ListOrdered className="w-4 h-4" />
                </EditorButton>
            </div>

            {/* Other Formatting */}
            <div className="flex items-center gap-1 border-r pr-2">
                <EditorButton
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    isActive={editor.isActive('blockquote')}
                    title="Quote"
                >
                    <Quote className="w-4 h-4" />
                </EditorButton>
                <EditorButton
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    isActive={editor.isActive('codeBlock')}
                    title="Code Block"
                >
                    <Code className="w-4 h-4" />
                </EditorButton>
            </div>

            {/* Links and Images */}
            <div className="flex items-center gap-1">
                <EditorButton
                    onClick={() => {
                        const url = window.prompt('Enter URL:');
                        if (url) {
                            editor.chain().focus().setLink({ href: url }).run();
                        }
                    }}
                    isActive={editor.isActive('link')}
                    title="Insert Link"
                >
                    <LinkIcon className="w-4 h-4" />
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
                        onChange={(e) => {
                            if (e.target.files?.length) {
                                const file = e.target.files[0];
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                    if (e.target?.result) {
                                        editor.chain().focus().setImage({ src: e.target.result.toString() }).run();
                                    }
                                };
                                reader.readAsDataURL(file);
                            }
                        }}
                    />
                </div>
            </div>

            {/* Undo/Redo */}
            <div className="flex items-center gap-1 ml-auto">
                <EditorButton
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    title="Undo (Ctrl+Z)"
                >
                    <Undo className="w-4 h-4" />
                </EditorButton>
                <EditorButton
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    title="Redo (Ctrl+Shift+Z)"
                >
                    <Redo className="w-4 h-4" />
                </EditorButton>
            </div>
        </div>
    );
};

export default function RichTextEditor({ content, onChange }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-600 hover:text-blue-800 underline'
                }
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'max-w-full h-auto rounded'
                }
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content: content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    return (
        <div className="mt-1 border rounded-md border-gray-300 shadow-sm focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500">
            <EditorMenuBar editor={editor} />
            <EditorContent editor={editor} className="min-h-[300px] p-4 prose max-w-none focus:outline-none" />
        </div>
    );
};s