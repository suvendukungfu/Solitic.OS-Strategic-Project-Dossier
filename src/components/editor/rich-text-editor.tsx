'use client';

import { useEditor, EditorContent, JSONContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import { cn } from '@/lib/utils';
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  List, 
  ListOrdered, 
  Heading1, 
  Heading2, 
  Heading3,
  Quote,
  Undo,
  Redo,
  Image as ImageIcon,
  Link as LinkIcon
} from "lucide-react";

interface RichTextEditorProps {
  content: JSONContent | string | null;
  onChange: (json: JSONContent) => void;
  placeholder?: string;
  minHeight?: string;
  className?: string;
}

export default function RichTextEditor({
  content,
  onChange,
  placeholder = 'Start writing...',
  minHeight = '300px',
  className
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: content || '',
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
    editorProps: {
      attributes: {
        class: cn(
          'prose prose-invert max-w-none focus:outline-none min-h-[inherit] py-10',
          className
        ),
      },
    },
  });

  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt('Enter Image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className="relative border border-white/5 bg-[#121212] rounded-[2rem] overflow-hidden focus-within:border-gold/30 transition-all shadow-2xl">
      {/* Floating Toolbar Inspired by Canva/Medium */}
      <div className="sticky top-0 z-50 flex flex-wrap items-center gap-2 p-3 border-b border-white/5 bg-black/80 backdrop-blur-xl">
        <div className="flex items-center gap-1 pr-4 border-r border-white/10">
          <ToolbarButton 
            active={editor.isActive('bold')} 
            onClick={() => editor.chain().focus().toggleBold().run()}
            icon={<Bold className="w-4 h-4" />}
          />
          <ToolbarButton 
            active={editor.isActive('italic')} 
            onClick={() => editor.chain().focus().toggleItalic().run()}
            icon={<Italic className="w-4 h-4" />}
          />
          <ToolbarButton 
            active={editor.isActive('underline')} 
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            icon={<UnderlineIcon className="w-4 h-4" />}
          />
        </div>

        <div className="flex items-center gap-1 px-4 border-r border-white/10">
          <ToolbarButton 
            active={editor.isActive('heading', { level: 1 })} 
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            icon={<Heading1 className="w-4 h-4" />}
          />
          <ToolbarButton 
            active={editor.isActive('heading', { level: 2 })} 
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            icon={<Heading2 className="w-4 h-4" />}
          />
          <ToolbarButton 
            active={editor.isActive('heading', { level: 3 })} 
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            icon={<Heading3 className="w-4 h-4" />}
          />
        </div>

        <div className="flex items-center gap-1 px-4 border-r border-white/10">
          <ToolbarButton 
            active={editor.isActive('bulletList')} 
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            icon={<List className="w-4 h-4" />}
          />
          <ToolbarButton 
            active={editor.isActive('orderedList')} 
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            icon={<ListOrdered className="w-4 h-4" />}
          />
          <ToolbarButton 
            active={editor.isActive('blockquote')} 
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            icon={<Quote className="w-4 h-4" />}
          />
        </div>

        <div className="flex items-center gap-1 px-4 border-r border-white/10">
          <ToolbarButton 
            active={editor.isActive({ textAlign: 'left' })} 
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            icon={<AlignLeft className="w-4 h-4" />}
          />
          <ToolbarButton 
            active={editor.isActive({ textAlign: 'center' })} 
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            icon={<AlignCenter className="w-4 h-4" />}
          />
          <ToolbarButton 
            active={editor.isActive({ textAlign: 'right' })} 
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            icon={<AlignRight className="w-4 h-4" />}
          />
        </div>

        <div className="flex items-center gap-1 px-4">
          <ToolbarButton 
            onClick={setLink}
            active={editor.isActive('link')}
            icon={<LinkIcon className="w-4 h-4" />}
          />
          <ToolbarButton 
            onClick={addImage}
            icon={<ImageIcon className="w-4 h-4" />}
          />
        </div>

        <div className="ml-auto flex items-center gap-1">
          <ToolbarButton onClick={() => editor.chain().focus().undo().run()} icon={<Undo className="w-4 h-4" />} />
          <ToolbarButton onClick={() => editor.chain().focus().redo().run()} icon={<Redo className="w-4 h-4" />} />
        </div>
      </div>

      <div 
        className="p-10 md:p-16 cursor-text" 
        style={{ minHeight }}
        onClick={() => editor.chain().focus().run()}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

function ToolbarButton({ active, onClick, icon }: { active?: boolean; onClick: () => void; icon: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "p-2.5 rounded-xl transition-all duration-300",
        active 
          ? "bg-gold text-black shadow-lg shadow-gold/20 scale-110" 
          : "text-white/40 hover:bg-white/5 hover:text-white"
      )}
    >
      {icon}
    </button>
  );
}
