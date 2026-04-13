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

  const fontSizes = [
    { label: '12px', value: '12px' },
    { label: '14px', value: '14px' },
    { label: '16px', value: '16px' },
    { label: '18px', value: '18px' },
    { label: '20px', value: '20px' },
    { label: '24px', value: '24px' },
    { label: '32px', value: '32px' },
  ];

  const fontFamilies = [
    { name: 'Playfair Display', value: 'var(--font-display)' },
    { name: 'Inter', value: 'var(--font-sans)' },
    { name: 'Poppins', value: 'var(--font-poppins)' },
    { name: 'Merriweather', value: 'var(--font-merriweather)' },
    { name: 'Fira Code', value: 'var(--font-mono-fira)' },
  ];

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
      "flex flex-wrap items-center gap-1 p-2 bg-black/95 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50",
      className
    )}>
      {/* 1. TYPOGRAPHY TOOLS */}
      <div className="flex items-center gap-2 pr-3 border-r border-white/5">
        <select 
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(e) => (editor.chain().focus() as any).setFontSize(e.target.value).run()}
          className="bg-white/5 text-[10px] font-black uppercase tracking-widest text-white/60 px-2 py-1.5 rounded-lg focus:outline-none cursor-pointer hover:bg-white/10"
        >
          <option value="">Size</option>
          {fontSizes.map(size => (
            <option key={size.value} value={size.value} className="bg-black text-white">{size.label}</option>
          ))}
        </select>

        <select 
          onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
          className="bg-white/5 text-[10px] font-black uppercase tracking-widest text-white/60 px-2 py-1.5 rounded-lg focus:outline-none cursor-pointer hover:bg-white/10 max-w-[80px]"
        >
          <option value="">Font</option>
          {fontFamilies.map(font => (
            <option key={font.value} value={font.value} className="bg-black text-white">{font.name}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-1 px-2 border-r border-white/5">
        <ToolbarButton active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} icon={<Bold className="w-4 h-4" />} />
        <ToolbarButton active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} icon={<Italic className="w-4 h-4" />} />
        <ToolbarButton active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()} icon={<Underline className="w-4 h-4" />} />
      </div>

      <div className="flex items-center gap-1 px-2 border-r border-white/5">
        <ToolbarButton active={editor.isActive('heading', { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} icon={<Heading1 className="w-4 h-4" />} />
        <ToolbarButton active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} icon={<Heading2 className="w-4 h-4" />} />
        <ToolbarButton active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} icon={<Heading3 className="w-4 h-4" />} />
      </div>

      <div className="flex items-center gap-1 px-2 border-r border-white/5">
        <ToolbarButton active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()} icon={<List className="w-4 h-4" />} />
        <ToolbarButton active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()} icon={<ListOrdered className="w-4 h-4" />} />
        <ToolbarButton active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()} icon={<Quote className="w-4 h-4" />} />
      </div>

      <div className="flex items-center gap-1 px-2 border-r border-white/5 text-gold">
        <ToolbarButton active={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()} icon={<AlignLeft className="w-4 h-4" />} />
        <ToolbarButton active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()} icon={<AlignCenter className="w-4 h-4" />} />
        <ToolbarButton active={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()} icon={<AlignRight className="w-4 h-4" />} />
      </div>

      <div className="flex items-center gap-1 pl-2">
        <ToolbarButton onClick={setLink} active={editor.isActive('link')} icon={<Link className="w-4 h-4" />} />
        <ToolbarButton onClick={addImage} icon={<Image className="w-4 h-4" />} />
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} icon={<Undo className="w-4 h-4" />} />
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} icon={<Redo className="w-4 h-4" />} />
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
