'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { slugify, cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useEditor, EditorContent, JSONContent } from '@tiptap/react';
import { TIPTAP_EXTENSIONS } from '@/lib/tiptap';
import { Post } from '@prisma/client';
import { 
  ArrowLeft, Clock, Upload, Save, Rocket, Eye, Trash, 
  Layout as LayoutIcon, Tag, Type, Palette, X, ChevronRight, Settings,
  Zap, Globe, Bold, Italic, List, ListOrdered, Code, Quote, Heading1, Heading2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { EditorToolbar } from './Toolbar';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

// Import Layouts directly for the Canvas
import EditorialLayout from '../blog/layouts/Editorial';
import MagazineLayout from '../blog/layouts/Magazine';
import MinimalLayout from '../blog/layouts/Minimal';
import ReportLayout from '../blog/layouts/Report';
import SpotlightLayout from '../blog/layouts/Spotlight';
import { BlogPost } from '../blog/types';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const CATEGORIES = [
  "Finance",
  "Technology",
  "Strategy",
  "Leadership",
  "Startups"
];

const FONTS = [
  { id: 'inter', name: 'Inter (Default)', class: 'font-sans' },
  { id: 'playfair', name: 'Playfair (Editorial)', class: 'font-display' },
  { id: 'poppins', name: 'Poppins (Modern)', class: 'font-poppins' },
  { id: 'merriweather', name: 'Merriweather (Reading)', class: 'font-merriweather' },
  { id: 'fira', name: 'Fira Code (Accent)', class: 'font-mono' }
];

const LAYOUT_VARIANTS = [
  { id: 'editorial', name: 'Newspaper', image: 'https://images.unsplash.com/photo-1585241936939-be4099591252?q=80&w=600&auto=format&fit=crop' },
  { id: 'magazine', name: 'Visual', image: 'https://images.unsplash.com/photo-1544640808-32ca72ac7f67?q=80&w=600&auto=format&fit=crop' },
  { id: 'minimal', name: 'Clean', image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=600&auto=format&fit=crop' },
  { id: 'report', name: 'Corporate', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=600&auto=format&fit=crop' },
  { id: 'spotlight', name: 'Feature', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop' }
];

const DEFAULT_JSON_CONTENT = { type: 'doc', content: [{ type: 'paragraph' }] };

export default function BlogEditor({ initialData }: { initialData?: Post }) {
  const router = useRouter();
  
  // State 
  const [postId, setPostId] = useState<string | null>(initialData?.id ?? null);
  const [title, setTitle] = useState(initialData?.title || '');
  const [category, setCategory] = useState(initialData?.category || 'Strategy');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">(initialData?.status === "PUBLISHED" ? "PUBLISHED" : "DRAFT");
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || '');
  const [tags, setTags] = useState(initialData?.tags || '');
  const [layoutType, setLayoutType] = useState<string>((initialData as BlogPost)?.layoutType || 'editorial');
  const [author, setAuthor] = useState(initialData?.author || 'Principal Counsel');
  const [selectedFont, setSelectedFont] = useState(initialData?.fonts || 'inter');

  // Logic states
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [showConfig, setShowConfig] = useState(true);

  // Editor Implementation
  // Editor Implementation
  const editor = useEditor({
    extensions: [
      ...TIPTAP_EXTENSIONS,
      Placeholder.configure({ 
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') return 'Write your headline...';
          return 'Start writing...';
        }
      }),
    ],
    content: initialData?.content ? (typeof initialData.content === 'string' ? JSON.parse(initialData.content) : initialData.content) : DEFAULT_JSON_CONTENT,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[500px] selection:bg-gold/20 selection:text-gold selection:shadow-[0_0_15px_rgba(194,164,109,0.3)]',
      },
    },
    onUpdate: ({ editor }) => {
      // Logic for debounced auto-save can be added here
    }
  });

  // Debounced Auto-save
  useEffect(() => {
    if (!editor || !title) return;
    const timer = setTimeout(() => {
      // Silently save draft in background if it's already a draft
      if (postId && status === 'DRAFT') {
        const payload = {
          id: postId,
          title,
          category,
          slug: slug || slugify(title),
          content: editor.getJSON(),
          coverImage,
          tags,
          status,
          layoutType,
          fonts: selectedFont,
          author,
        };
        axios.put(`/api/posts/byId/${postId}`, payload).catch(() => {});
      }
    }, 5000); // 5 sec debounce

    return () => clearTimeout(timer);
  }, [editor, title, category, slug, coverImage, tags, status, layoutType, selectedFont, author, postId]);

  const onSave = useCallback(async () => {
    if (!title) {
       toast.error('Post Title is required');
       return;
    }
    
    setIsSaving(true);
    const saveToast = toast.loading('Synchronizing with Solitic DB...');
    
    try {
      const payload = {
        id: postId,
        title,
        category,
        slug: slug || slugify(title),
        content: editor?.getJSON() || {},
        coverImage,
        tags,
        status,
        layoutType,
        fonts: selectedFont,
        author,
        createdAt: initialData?.createdAt || new Date().toISOString(),
      };

      if (postId) {
        await axios.put(`/api/posts/byId/${postId}`, payload);
      } else {
        const res = await axios.post('/api/posts', payload);
        const created = res.data?.data ?? res.data;
        if (created?.id) {
          setPostId(created.id);
          window.history.replaceState(null, '', `/admin/posts/${created.id}`);
        }
      }
      toast.success('Dossier Synced', { id: saveToast });
    } catch (err: unknown) {
      console.error("Save Error:", err);
      toast.error('Sync Failed', { id: saveToast });
    } finally {
      setIsSaving(false);
    }
  }, [postId, title, category, slug, editor, coverImage, tags, status, layoutType, selectedFont, author, initialData]);

  const onDelete = async () => {
    if (!postId) return;
    try {
      await axios.delete(`/api/posts/byId/${postId}`);
      toast.success('Dossier Purged');
      router.push('/admin/posts');
    } catch {
      toast.error('Purge Failed');
    }
  };

  const currentPostForCanvas = useMemo(() => ({
    id: postId || 'draft',
    title,
    category,
    slug: slug || slugify(title),
    coverImage,
    tags,
    status,
    layoutType,
    fonts: selectedFont,
    author,
    createdAt: initialData?.createdAt || new Date().toISOString(),
    content: editor?.getJSON() || {},
    excerpt: "",
    updatedAt: new Date(),
    readingTime: Math.max(1, Math.ceil((editor?.getText().split(' ').length || 0) / 200)),
    featured: false,
    trending: false,
    viewCount: 0,
    deletedAt: null
  }), [postId, title, category, slug, coverImage, tags, status, layoutType, selectedFont, author, editor, initialData]);

  // Optimized Preview Data (Update only when necessary to prevent lag)
  const [previewData, setPreviewData] = useState(currentPostForCanvas);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPreviewData(currentPostForCanvas);
    }, 100); // 100ms lag for preview updates is imperceptible but saves UI thread
    return () => clearTimeout(timer);
  }, [currentPostForCanvas]);

  const renderCanvas = () => {
    const selectedFontFamily = selectedFont.toLowerCase() === 'playfair' ? 'var(--font-display)' :
                              selectedFont.toLowerCase() === 'poppins' ? 'var(--font-poppins)' :
                              selectedFont.toLowerCase() === 'merriweather' ? 'var(--font-merriweather)' :
                              selectedFont.toLowerCase() === 'fira' ? 'var(--font-mono-fira)' :
                              'var(--font-sans)';

    const props = { 
      post: previewData as unknown as BlogPost, 
      relatedPosts: [], 
      contentOverride: (
        <div 
          className={cn("outline-none transition-all duration-300 relative min-h-[500px] py-4", 
            selectedFont === 'inter' && "font-sans",
            selectedFont === 'playfair' && "font-display",
            selectedFont === 'poppins' && "font-poppins",
            selectedFont === 'merriweather' && "font-merriweather",
            selectedFont === 'fira' && "font-mono-fira"
          )}
          style={{ fontFamily: selectedFontFamily }}
        >
          {editor && (
            <div className="absolute inset-0 pointer-events-none z-[1000]">
               {/* Custom Bubble Menu (Text Selection) */}
               <AnimatePresence>
                 {!editor.state.selection.empty && (
                   <motion.div
                     initial={{ opacity: 0, scale: 0.9, y: 10 }}
                     animate={{ opacity: 1, scale: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 0.9, y: 10 }}
                     className="pointer-events-auto absolute flex items-center gap-1 bg-black/90 backdrop-blur-xl border border-white/10 p-1.5 rounded-xl shadow-2xl overflow-hidden"
                     style={{
                        left: editor.view.coordsAtPos(editor.state.selection.from).left - 20,
                        top: editor.view.coordsAtPos(editor.state.selection.from).top - 60,
                     }}
                   >
                    <button onClick={() => editor.chain().focus().toggleBold().run()} className={cn("p-2 rounded-lg transition-colors hover:bg-white/10", editor.isActive('bold') ? "text-gold" : "text-white/60")}>
                      <Bold className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => editor.chain().focus().toggleItalic().run()} className={cn("p-2 rounded-lg transition-colors hover:bg-white/10", editor.isActive('italic') ? "text-gold" : "text-white/60")}>
                      <Italic className="w-3.5 h-3.5" />
                    </button>
                    <div className="w-px h-4 bg-white/10 mx-1" />
                    <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={cn("p-2 rounded-lg transition-colors hover:bg-white/10", editor.isActive('heading', { level: 1 }) ? "text-gold" : "text-white/60")}>
                      <Heading1 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={cn("p-2 rounded-lg transition-colors hover:bg-white/10", editor.isActive('heading', { level: 2 }) ? "text-gold" : "text-white/60")}>
                      <Heading2 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={cn("p-2 rounded-lg transition-colors hover:bg-white/10", editor.isActive('blockquote') ? "text-gold" : "text-white/60")}>
                      <Quote className="w-3.5 h-3.5" />
                    </button>
                   </motion.div>
                 )}
               </AnimatePresence>

               {/* Custom Floating Menu (Empty Line) */}
               <AnimatePresence>
                 {editor.state.selection.empty && editor.state.doc.resolve(editor.state.selection.from).parent.content.size === 0 && (
                   <motion.div
                     initial={{ opacity: 0, x: -10 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -10 }}
                     className="pointer-events-auto absolute flex items-center gap-1 bg-black/90 backdrop-blur-xl border border-white/10 p-1.5 rounded-xl shadow-2xl overflow-hidden"
                     style={{
                        left: editor.view.coordsAtPos(editor.state.selection.from).left - 40,
                        top: editor.view.coordsAtPos(editor.state.selection.from).top - 10,
                     }}
                   >
                     <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={cn("p-2 rounded-lg transition-colors hover:bg-white/10", editor.isActive('bulletList') ? "text-gold" : "text-white/60")}>
                      <List className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={cn("p-2 rounded-lg transition-colors hover:bg-white/10", editor.isActive('orderedList') ? "text-gold" : "text-white/60")}>
                      <ListOrdered className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={cn("p-2 rounded-lg transition-colors hover:bg-white/10", editor.isActive('codeBlock') ? "text-gold" : "text-white/60")}>
                      <Code className="w-3.5 h-3.5" />
                    </button>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>
          )}
          <EditorContent editor={editor} />
        </div>
      )
    };
    
    switch(layoutType) {
      case 'magazine': return <MagazineLayout {...props} />;
      case 'minimal': return <MinimalLayout {...props} />;
      case 'report': return <ReportLayout {...props} />;
      case 'spotlight': return <SpotlightLayout {...props} />;
      default: return <EditorialLayout {...props} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden selection:bg-gold selection:text-black">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 h-20 bg-black/80 backdrop-blur-2xl border-b border-white/5 z-[100] flex items-center justify-between px-8">
        <div className="flex items-center gap-6">
          <button onClick={() => router.push('/admin/posts')} className="p-3 hover:bg-white/5 rounded-xl transition-all">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gold italic underline decoration-gold/30">Draft Studio</span>
            <span className="text-xs font-medium text-white/40">{postId ? 'Edit Post' : 'Create New Post'}</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <EditorToolbar editor={editor} className="hidden lg:flex" />
          
          <div className="h-8 w-px bg-white/10 hidden lg:block" />

          {/* Font Selector */}
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
            <Type className="w-3.5 h-3.5 text-gold/60" />
            <select 
              value={selectedFont} 
              onChange={e => setSelectedFont(e.target.value)}
              className="bg-transparent text-[10px] font-black uppercase tracking-widest text-white/70 focus:outline-none cursor-pointer"
            >
              {FONTS.map(f => <option key={f.id} value={f.id} className="bg-black text-white">{f.name}</option>)}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end text-[9px] font-black uppercase tracking-widest text-white/20 mr-4">
            <span className={cn(isSaving && "text-gold animate-pulse")}>{isSaving ? 'Saving...' : 'Status'}</span>
            <span className="text-white/40">{status === 'PUBLISHED' ? 'Live' : 'Draft'}</span>
          </div>
          
          <button 
            onClick={onSave}
            disabled={isSaving}
            className="flex items-center gap-3 px-8 py-3 bg-gold text-black rounded-2xl font-black uppercase text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
          >
            {isSaving ? <Zap className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>

          <button onClick={() => setShowConfig(!showConfig)} className={cn("p-3 rounded-xl transition-all", showConfig ? "bg-white/10 text-white" : "text-white/40")}>
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Layout Canvas */}
      <main className="flex-1 overflow-y-auto pt-20 pb-40 scrollbar-hide bg-[#0c0c0c]">
        {renderCanvas()}
      </main>

      {/* Config Sidebar */}
      <AnimatePresence>
        {showConfig && (
          <motion.aside 
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            className="w-[400px] border-l border-white/5 bg-[#080808] flex flex-col p-8 pt-28 space-y-12 overflow-y-auto z-50"
          >
            {/* Layout Switcher */}
            <div className="space-y-6">
               <div className="flex items-center gap-3">
                 <LayoutIcon className="w-4 h-4 text-gold" />
                 <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Select Layout</h3>
               </div>
               <div className="grid grid-cols-5 gap-2">
                 {LAYOUT_VARIANTS.map(l => (
                   <button 
                     key={l.id}
                     onClick={() => setLayoutType(l.id)}
                     className={cn(
                       "aspect-square rounded-xl border-2 transition-all flex items-center justify-center overflow-hidden",
                       layoutType === l.id ? "border-gold bg-gold/10" : "border-white/5 hover:border-white/20 grayscale opacity-40"
                     )}
                     title={l.name}
                   >
                     <img src={l.image} className="w-full h-full object-cover" />
                   </button>
                 ))}
               </div>
            </div>

            {/* Simple Fields */}
            <div className="space-y-8">
               <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 px-2 flex items-center gap-2">
                    <Type className="w-3 h-3" /> Post Title
                  </label>
                  <input 
                    value={title} 
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Write your headline..."
                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-xl font-display font-black text-white focus:outline-none focus:border-gold/20 transition-all placeholder:text-white/10"
                  />
               </div>

               <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 px-2 flex items-center gap-2">
                    <Globe className="w-3 h-3" /> Category
                  </label>
                  <select 
                    value={category} 
                    onChange={e => setCategory(e.target.value)}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 font-bold text-white focus:outline-none appearance-none cursor-pointer"
                  >
                    {CATEGORIES.map(c => <option key={c} value={c} className="bg-[#080808]">{c}</option>)}
                  </select>
               </div>

               <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 px-2 flex items-center gap-2">
                    <Tag className="w-3 h-3" /> Author
                  </label>
                  <input 
                    value={author} 
                    onChange={e => setAuthor(e.target.value)}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 font-bold text-white focus:outline-none"
                  />
               </div>
            </div>

            {/* Asset Management */}
            <div className="space-y-6">
               <div className="flex items-center gap-3">
                 <Palette className="w-4 h-4 text-gold" />
                 <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Cover Image</h3>
               </div>
               <div className="relative aspect-video bg-white/5 border border-white/5 rounded-3xl overflow-hidden group cursor-pointer" onClick={() => (document.getElementById('fileInput') as HTMLInputElement).click()}>
                  {coverImage ? <img src={coverImage} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all" /> : <div className="absolute inset-0 flex items-center justify-center text-white/20"><Upload className="w-8 h-8" /></div>}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                    <span className="text-[8px] font-black uppercase tracking-widest text-white">Upload Image</span>
                  </div>
                  <input type="file" id="fileInput" hidden onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setIsUploadingImage(true);
                    try {
                      const formData = new FormData();
                      formData.append('file', file);
                      const res = await axios.post('/api/upload', formData);
                      setCoverImage(res.data.url);
                      toast.success('Image uploaded');
                    } catch {
                      toast.error('Upload failed');
                    } finally { setIsUploadingImage(false); }
                  }} />
                  {isUploadingImage && <div className="absolute inset-0 bg-black/80 flex items-center justify-center"><Zap className="w-6 h-6 animate-spin text-gold" /></div>}
               </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-3xl mt-auto">
               <button 
                  onClick={() => setStatus(status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED')}
                  className={cn(
                    "flex items-center gap-3 px-6 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all",
                    status === 'PUBLISHED' ? "bg-gold/10 border-gold/20 text-gold shadow-lg shadow-gold/5" : "bg-white/5 border-white/10 text-white/40"
                  )}
                >
                  <Rocket className="w-3.5 h-3.5" />
                  {status === 'PUBLISHED' ? 'Live' : 'Draft'}
                </button>
                {postId && (
                  <button onClick={() => setShowDeleteConfirm(true)} className="p-3 text-white/20 hover:text-red-500 transition-colors">
                    <Trash className="w-5 h-5" />
                  </button>
                )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent className="bg-[#0c0c0c] border border-white/10 text-white rounded-[2rem]">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display font-black text-red-500 uppercase italic">Delete Draft?</AlertDialogTitle>
            <AlertDialogDescription className="text-white/40 font-serif italic">This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white/5 border-0 text-white">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete} className="bg-red-500 hover:bg-red-600 text-white font-bold px-8">Delete Forever</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <style jsx global>{`
        .font-poppins { font-family: 'Poppins', sans-serif; }
        .font-merriweather { font-family: 'Merriweather', serif; }
        .font-mono-fira { font-family: var(--font-mono-fira), monospace; }
        
/* Custom Writing Styles */
        .ProseMirror {
          min-height: 500px;
          outline: none !important;
        }
        .ProseMirror p {
          line-height: 1.8;
          margin-bottom: 1.5rem;
        }
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: rgba(255,255,255,0.15);
          pointer-events: none;
          height: 0;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .editorial-body.text-left .ProseMirror {
          text-align: left !important;
        }
      `}</style>
    </div>
  );
}
