// RichTextEditor.jsx
import { useEditor, EditorContent, EditorProvider, useCurrentEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useState, useEffect } from 'react';
import { 
    Bold, Italic, Strikethrough, Link as LinkIcon, 
    List, ListOrdered, Quote, Code, Undo, Redo,
    Heading1, Heading2, ImageIcon, AlignLeft, 
    AlignCenter, AlignRight
} from 'lucide-react';
import TextAlign from '@tiptap/extension-text-align';

const MenuButton = ({ onClick, isActive = false, disabled = false, children, className = '' }) => (
    <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={`
            p-2 rounded-md transition-colors duration-200
            ${isActive ? 'bg-yellow-100 text-yellow-800' : 'text-gray-600 hover:bg-gray-100'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            ${className}
        `}
    >
        {children}
    </button>
);

const MenuBar = () => {
    const { editor } = useCurrentEditor();

    if (!editor) return null;

    const addImage = () => {
        const url = window.prompt('Enter image URL:');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    const addLink = () => {
        const url = window.prompt('Enter URL:');
        if (url) {
            editor.chain().focus().setLink({ href: url }).run();
        }
    };

    return (
        <div className="border-b border-gray-200 bg-white p-2 sticky top-0 z-10">
            <div className="flex flex-wrap gap-1">
                {/* Text Formatting */}
                <div className="flex items-center space-x-1 border-r pr-2">
                    <MenuButton 
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        isActive={editor.isActive('bold')}
                    >
                        <Bold className="w-4 h-4" />
                    </MenuButton>
                    <MenuButton 
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        isActive={editor.isActive('italic')}
                    >
                        <Italic className="w-4 h-4" />
                    </MenuButton>
                    <MenuButton 
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        isActive={editor.isActive('strike')}
                    >
                        <Strikethrough className="w-4 h-4" />
                    </MenuButton>
                </div>

                {/* Headings */}
                <div className="flex items-center space-x-1 border-r pr-2">
                    <MenuButton 
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        isActive={editor.isActive('heading', { level: 1 })}
                    >
                        <Heading1 className="w-4 h-4" />
                    </MenuButton>
                    <MenuButton 
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        isActive={editor.isActive('heading', { level: 2 })}
                    >
                        <Heading2 className="w-4 h-4" />
                    </MenuButton>
                </div>

                {/* Lists */}
                <div className="flex items-center space-x-1 border-r pr-2">
                    <MenuButton 
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        isActive={editor.isActive('bulletList')}
                    >
                        <List className="w-4 h-4" />
                    </MenuButton>
                    <MenuButton 
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        isActive={editor.isActive('orderedList')}
                    >
                        <ListOrdered className="w-4 h-4" />
                    </MenuButton>
                </div>

                {/* Alignment */}
                <div className="flex items-center space-x-1 border-r pr-2">
                    <MenuButton 
                        onClick={() => editor.chain().focus().setTextAlign('left').run()}
                        isActive={editor.isActive({ textAlign: 'left' })}
                    >
                        <AlignLeft className="w-4 h-4" />
                    </MenuButton>
                    <MenuButton 
                        onClick={() => editor.chain().focus().setTextAlign('center').run()}
                        isActive={editor.isActive({ textAlign: 'center' })}
                    >
                        <AlignCenter className="w-4 h-4" />
                    </MenuButton>
                    <MenuButton 
                        onClick={() => editor.chain().focus().setTextAlign('right').run()}
                        isActive={editor.isActive({ textAlign: 'right' })}
                    >
                        <AlignRight className="w-4 h-4" />
                    </MenuButton>
                </div>

                {/* Special Elements */}
                <div className="flex items-center space-x-1 border-r pr-2">
                    <MenuButton 
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        isActive={editor.isActive('blockquote')}
                    >
                        <Quote className="w-4 h-4" />
                    </MenuButton>
                    <MenuButton 
                        onClick={() => editor.chain().focus().toggleCode().run()}
                        isActive={editor.isActive('code')}
                    >
                        <Code className="w-4 h-4" />
                    </MenuButton>
                    <MenuButton onClick={addLink} isActive={editor.isActive('link')}>
                        <LinkIcon className="w-4 h-4" />
                    </MenuButton>
                    <MenuButton onClick={addImage}>
                        <ImageIcon className="w-4 h-4" />
                    </MenuButton>
                </div>

                {/* Undo/Redo */}
                <div className="flex items-center space-x-1">
                    <MenuButton 
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editor.can().chain().focus().undo().run()}
                    >
                        <Undo className="w-4 h-4" />
                    </MenuButton>
                    <MenuButton 
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editor.can().chain().focus().redo().run()}
                    >
                        <Redo className="w-4 h-4" />
                    </MenuButton>
                </div>
            </div>
        </div>
    );
};

const extensions = [
    StarterKit.configure({
        bulletList: { keepMarks: true },
        orderedList: { keepMarks: true },
    }),
    TextAlign.configure({  // Add this extension
        types: ['heading', 'paragraph'],
        defaultAlignment: 'left',
    }),
];

export default function RichTextEditor({ content = '', onChange }) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    if (!isMounted) {
        return (
            <div className="mt-1 border rounded-md border-gray-200 p-4 min-h-[300px] flex items-center justify-center text-gray-500 bg-gray-50">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mb-2"></div>
                    <span>Loading editor...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="border rounded-md border-gray-200 bg-white overflow-hidden">
            <EditorProvider
                slotBefore={<MenuBar />}
                extensions={extensions}
                content={content}
                onUpdate={({ editor }) => {
                    onChange(editor.getHTML());
                }}
                editorProps={{
                    attributes: {
                        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none max-w-none p-4 min-h-[300px]',
                    },
                }}
            />
        </div>
    );
}