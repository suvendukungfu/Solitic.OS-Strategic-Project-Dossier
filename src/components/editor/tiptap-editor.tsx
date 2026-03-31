'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { slugify } from '@/lib/utils';
import { toast } from 'sonner';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TiptapImage from '@tiptap/extension-image';
import TiptapLink from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { Underline } from '@tiptap/extension-underline';
import { TextAlign } from '@tiptap/extension-text-align';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { Typography } from '@tiptap/extension-typography';
import { Extensions, JSONContent } from '@tiptap/core';

const extensions: Extensions = [
  StarterKit,
  TiptapImage,
  TiptapLink.configure({ 
    openOnClick: false,
    HTMLAttributes: {
      class: 'text-gold underline decoration-1 underline-offset-4'
    }
  }),
  Placeholder.configure({ placeholder: 'Tell your story...' }),
  Underline,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  TableCell,
  Typography,
];

const DEFAULT_CONTENT = {
  type: 'doc',
  content: [{ type: 'paragraph' }],
};

import { renderContent } from '@/lib/tiptap';

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function BlogEditor({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [status, setStatus] = useState<string>(initialData?.status || 'DRAFT');
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || '');
  const [tags, setTags] = useState(initialData?.tags || '');
  const [content, setContent] = useState<JSONContent | undefined>(initialData?.content || DEFAULT_CONTENT);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'Saved' | 'Unsaved'>('Saved');
  const [postId, setPostId] = useState<string | undefined>(initialData?.id);
  const [mounted, setMounted] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-generate slug from title if slug was empty or matches previous title slug
  useEffect(() => {
    if (!postId || (title && !slug)) {
      setSlug(slugify(title));
    }
  }, [title, postId, slug]);
  
  const contentRef = useRef(content);
  const titleRef = useRef(title);
  const slugRef = useRef(slug);
  const excerptRef = useRef(excerpt);
  const coverImageRef = useRef(coverImage);
  const tagsRef = useRef(tags);
  const postIdRef = useRef(postId);
  
  useEffect(() => {
    contentRef.current = content;
    titleRef.current = title;
    slugRef.current = slug;
    excerptRef.current = excerpt;
    coverImageRef.current = coverImage;
    tagsRef.current = tags;
    postIdRef.current = postId;
  }, [content, title, slug, excerpt, coverImage, tags, postId]);

  const onSave = useCallback(async (isAutosave = false) => {
    if (!titleRef.current) {
      if (!isAutosave) toast.error('Please add a title');
      return;
    }
    
    setIsSaving(true);
    setSaveStatus('Saved');
    
    try {
      const data = {
        id: postIdRef.current,
        title: titleRef.current,
        slug: slugRef.current || slugify(titleRef.current),
        content: contentRef.current,
        excerpt: excerptRef.current,
        coverImage: coverImageRef.current,
        tags: tagsRef.current,
        status,
      };

      if (postIdRef.current) {
        await axios.put(`/api/posts/${data.slug}`, data);
      } else {
        const res = await axios.post('/api/posts', data);
        if (res.data.id) {
           setPostId(res.data.id);
           window.history.replaceState(null, '', `/admin/posts/${res.data.id}`);
        }
      }
      
      router.refresh(); // Invalidate server cache for real-time updates

      if (!isAutosave) {
        toast.success(`Story ${status.toLowerCase()} successfully`);
      }
    } catch (error) {
      if (!isAutosave) toast.error('Failed to save story');
      setSaveStatus('Unsaved');
    } finally {
      setIsSaving(false);
    }
  }, [status, router]);

  // Autosave Draft logic
  useEffect(() => {
    if (status !== 'DRAFT') return;
    
    const interval = setInterval(() => {
      if (saveStatus === 'Unsaved' && titleRef.current) {
        onSave(true);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [saveStatus, status, onSave]);

  const onUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await axios.post('/api/upload', formData);
      return res.data.url;
    } catch (e) {
      toast.error('Image upload failed');
      throw e;
    }
  };

  const editor = useEditor({
    immediatelyRender: false,
    content,
    extensions,
    onUpdate: ({ editor }) => {
      setContent(editor.getJSON());
      setSaveStatus('Unsaved');
    },
    editorProps: {
      attributes: {
        class: 'w-full h-full focus:outline-none',
      },
      handleDrop: (view, event, _slice, moved) => {
        if (!moved && event.dataTransfer?.files?.[0]) {
          const file = event.dataTransfer.files[0];
          if (file.type.startsWith('image/')) {
            const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY });
            onUpload(file).then((url) => {
              view.dispatch(
                view.state.tr.insert(
                  coordinates?.pos || 0,
                  view.state.schema.nodes.image.create({ src: url })
                )
              );
            });
            return true;
          }
        }
        return false;
      },
    },
  });

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto py-12 px-6">
      <header className="flex flex-col md:flex-row justify-between items-center gap-8 sticky top-24 z-40 bg-background/80 backdrop-blur-md pb-6 border-b border-border/50">
        <div className="w-full relative">
          <input 
            type="text" 
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setSaveStatus('Unsaved');
            }}
            placeholder="New Story Title"
            className="w-full text-4xl md:text-5xl font-display font-black tracking-tight border-none focus:outline-none bg-transparent placeholder:text-muted-foreground/20"
          />
          <div className="absolute -bottom-6 left-2 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${saveStatus === 'Unsaved' ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`}></span>
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{saveStatus}</span>
            </div>
            <div className="flex items-center gap-1 font-body text-[10px] text-muted-foreground">
              <span className="opacity-50">Slug:</span>
              <input 
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                  setSaveStatus('Unsaved');
                }}
                className="bg-transparent border-none focus:outline-none focus:text-gold transition-colors font-bold lowercase"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 shrink-0">
           <div className="flex bg-muted/50 p-1 rounded-full border border-border/50">
             <button 
               onClick={() => setIsPreview(false)}
               className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${!isPreview ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
             >
               Edit
             </button>
             <button 
               onClick={() => setIsPreview(true)}
               className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${isPreview ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
             >
               Preview
             </button>
           </div>

           <select 
             value={status} 
             onChange={(e) => {
               setStatus(e.target.value);
               setSaveStatus('Unsaved');
             }}
             className="text-[10px] uppercase tracking-widest font-black bg-muted/50 rounded-full px-4 py-2 border-border/50 transition-all focus:ring-1 ring-primary cursor-pointer"
           >
             <option value="DRAFT">draft</option>
             <option value="PUBLISHED">publish</option>
           </select>

           <button 
             onClick={() => onSave(false)}
             disabled={isSaving}
             className="px-8 py-2.5 rounded-full bg-charcoal text-off-white font-display font-bold tracking-tight hover:scale-105 active:scale-95 transition-all disabled:opacity-50 shadow-xl shadow-black/20"
           >
             {isSaving ? 'saving...' : 'save story'}
           </button>
        </div>
      </header>

      {!isPreview ? (
        <>
          {/* Editorial Metadata */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-muted/10 p-8 rounded-3xl border border-border/30">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Short Excerpt (Newspaper Teaser)</label>
                <span className={`text-[10px] font-bold ${excerpt.length > 160 ? 'text-red-500' : 'text-muted-foreground/50'}`}>
                  {excerpt.length}/160
                </span>
              </div>
              <textarea 
                value={excerpt}
                onChange={(e) => {
                  setExcerpt(e.target.value);
                  setSaveStatus('Unsaved');
                }}
                placeholder="A compelling one-sentence teaser that appears on the front page..."
                className="w-full bg-background border border-border/30 rounded-2xl p-4 text-sm min-h-[100px] focus:outline-none focus:ring-2 ring-primary/20 transition-all"
              />
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Cover Image URL</label>
                <input 
                  type="text" 
                  value={coverImage}
                  onChange={(e) => {
                    setCoverImage(e.target.value);
                    setSaveStatus('Unsaved');
                  }}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-background border border-border/30 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 ring-primary/20 transition-all"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Tags (comma separated)</label>
                <input 
                  type="text" 
                  value={tags}
                  onChange={(e) => {
                    setTags(e.target.value);
                    setSaveStatus('Unsaved');
                  }}
                  placeholder="Compliance, Regulatory, Strategy..."
                  className="w-full bg-background border border-border/30 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 ring-primary/20 transition-all"
                />
              </div>
            </div>
          </section>

          <section className="bg-background rounded-3xl border border-border/50 p-8 md:p-16 shadow-sm min-h-[600px] prose dark:prose-invert max-w-none">
            {mounted && editor && <EditorContent editor={editor} className="w-full h-full" />}
          </section>
        </>
      ) : (
        <section className="bg-background rounded-3xl border-2 border-gold/20 p-8 md:p-16 shadow-2xl animate-in fade-in zoom-in duration-300">
          <div className="max-w-3xl mx-auto">
            <header className="mb-12 border-b-4 border-foreground pb-8">
              <div className="flex gap-2 flex-wrap mb-4">
                {String(tags).split(',').filter(Boolean).map(tag => (
                   <span key={tag} className="text-[10px] font-black uppercase tracking-widest text-gold">{tag.trim()}</span>
                ))}
              </div>
              <h1 className="font-display text-5xl font-black text-foreground mb-6 leading-tight">{title}</h1>
              {excerpt && <p className="font-body text-xl text-muted-foreground italic border-l-4 border-gold pl-6 mb-4">{excerpt}</p>}
              <div className="text-[10px] uppercase font-black tracking-widest text-muted-foreground opacity-50">Editorial Preview Mode</div>
            </header>
            
            {coverImage && (
              <img src={coverImage} alt="" className="w-full aspect-video object-cover mb-12 shadow-2xl" />
            )}
            
            <div 
              className="prose prose-lg dark:prose-invert max-w-none font-body prose-headings:font-display prose-headings:font-black prose-img:shadow-xl prose-editorial"
              dangerouslySetInnerHTML={{ __html: renderContent(content as any) }}
            />
          </div>
        </section>
      )}
    </div>
  );
}
