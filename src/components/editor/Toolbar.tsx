'use client';

import { Editor } from '@tiptap/react';
import { 
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, 
  List, ListOrdered, Heading1, Heading2, Heading3, Quote, 
  Undo, Redo, Image, Link, Type, Palette
} from "lucide-react";
import { cn } from '@/lib/utils';

interface EditorToolbarProps {
  editor: Editor | null;
  className?: string;
}

export function EditorToolbar({ editor, className }: EditorToolbarProps) {
  if (!editor) return null;

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
    <div className={cn(
      "flex flex-wrap items-center gap-1 p-2 bg-black/90 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-4xl",
      className
    )}>
      <div className="flex items-center gap-1 pr-2 border-r border-white/10">
        <ToolbarButton active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} icon={<Bold className="w-4 h-4" />} />
        <ToolbarButton active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} icon={<Italic className="w-4 h-4" />} />
        <ToolbarButton active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()} icon={<Underline className="w-4 h-4" />} />
      </div>

      <div className="flex items-center gap-1 px-2 border-r border-white/10">
        <ToolbarButton active={editor.isActive('heading', { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} icon={<Heading1 className="w-4 h-4" />} />
        <ToolbarButton active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} icon={<Heading2 className="w-4 h-4" />} />
        <ToolbarButton active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} icon={<Heading3 className="w-4 h-4" />} />
      </div>

      <div className="flex items-center gap-1 px-2 border-r border-white/10">
        <ToolbarButton active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()} icon={<List className="w-4 h-4" />} />
        <ToolbarButton active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()} icon={<ListOrdered className="w-4 h-4" />} />
        <ToolbarButton active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()} icon={<Quote className="w-4 h-4" />} />
      </div>

      <div className="flex items-center gap-1 px-2 border-r border-white/10">
        <ToolbarButton active={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()} icon={<AlignLeft className="w-4 h-4" />} />
        <ToolbarButton active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()} icon={<AlignCenter className="w-4 h-4" />} />
        <ToolbarButton active={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()} icon={<AlignRight className="w-4 h-4" />} />
      </div>

      <div className="flex items-center gap-1 pl-2">
        <ToolbarButton onClick={setLink} active={editor.isActive('link')} icon={<Link className="w-4 h-4" />} />
        <ToolbarButton onClick={addImage} icon={<Image className="w-4 h-4" />} />
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
        "p-2 rounded-lg transition-all",
        active 
          ? "bg-gold text-black shadow-lg" 
          : "text-white/40 hover:bg-white/5 hover:text-white"
      )}
    >
      {icon}
    </button>
  );
}
