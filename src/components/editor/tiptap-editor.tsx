'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { slugify } from '@/lib/utils';
import { toast } from 'sonner';
import { EditorContent, useEditor } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
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
import BubbleMenuExtension from '@tiptap/extension-bubble-menu';
import { Extensions, JSONContent } from '@tiptap/core';
import { 
  Maximize2, 
  Minimize2, 
  ArrowLeft, 
  Type, 
  Trash2, 
  Image as ImageIcon, 
  Hash, 
  FileText,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Link as LinkIcon,
  List,
  Heading1,
  Heading2,
  Clock,
  Upload,
  Undo2,
  Redo2,
  Strikethrough,
  Code,
  ListOrdered,
  Quote,
  MoreHorizontal,
  Save,
  Rocket,
  Underline as UnderlineIcon,
  Eye,
  Globe,
  Trash
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

const extensions: Extensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3],
    },
  }),
  TiptapImage.configure({
    HTMLAttributes: {
      class: 'rounded-2xl border border-white/10 shadow-2xl my-12',
    },
  }),
  TiptapLink.configure({ 
    openOnClick: false,
    HTMLAttributes: {
      class: 'text-[#C2A46D] underline decoration-1 underline-offset-4 cursor-pointer font-bold'
    }
  }),
  Placeholder.configure({ 
    placeholder: 'Begin manuscript drafting. The institutional narrative starts here...',
  }),
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
  BubbleMenuExtension,
];

const DEFAULT_CONTENT = {
  type: 'doc',
  content: [{ type: 'paragraph' }],
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function BlogEditor({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [postId, setPostId] = useState<string | null>(initialData?.id ?? null);
  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [status, setStatus] = useState<string>(initialData?.status || 'DRAFT');
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || '');
  const [tags, setTags] = useState(initialData?.tags || '');
  
  // Handle potentially stringified content for legacy data
  const parseContent = (content: any) => {
    if (!content) return DEFAULT_CONTENT;
    if (typeof content === 'string') {
      try {
        return JSON.parse(content);
      } catch (e) {
        return DEFAULT_CONTENT;
      }
    }
    return content;
  };

  const [content, setContent] = useState<JSONContent>(parseContent(initialData?.content));
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'Saved' | 'Unsaved' | 'Syncing'>('Saved');
  const [isZenMode, setIsZenMode] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [readTime, setReadTime] = useState(0);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const contentRef = useRef(content);
  const titleRef = useRef(title);
  const slugRef = useRef(slug);
  const excerptRef = useRef(excerpt);
  const coverImageRef = useRef(coverImage);
  const tagsRef = useRef(tags);
  const postIdRef = useRef<string | null>(initialData?.id ?? null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorImageInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    contentRef.current = content;
    titleRef.current = title;
    slugRef.current = slug;
    excerptRef.current = excerpt;
    coverImageRef.current = coverImage;
    tagsRef.current = tags;
    postIdRef.current = postId;
  }, [content, title, slug, excerpt, coverImage, tags, postId]);

  const onDelete = async () => {
    if (!postId) return;
    setIsDeleting(true);
    try {
      await axios.delete(`/api/posts/byId/${postId}`);
      toast.success('Manuscript retracted successfully');
      router.push('/admin/posts');
    } catch (error) {
      toast.error('Retraction failed');
    } finally {
      setIsDeleting(false);
    }
  };

  const onPreview = () => {
    const data = {
      title,
      slug: slug || slugify(title),
      content,
      excerpt,
      coverImage,
      tags,
      status,
      createdAt: initialData?.createdAt || new Date().toISOString(),
    };
    
    if (typeof window !== 'undefined') {
       localStorage.setItem('solitic_draft_preview', JSON.stringify(data));
       window.open('/admin/preview', '_blank');
    }
  };

  const onSave = useCallback(async (isAutosave = false) => {
    if (!titleRef.current) {
      if (!isAutosave) toast.error('Required: Title missing');
      return;
    }
    
    setIsSaving(true);
    setSaveStatus('Syncing');
    
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
        if (isAutosave) {
           await axios.patch(`/api/posts/byId/${postIdRef.current}`, data);
        } else {
           await axios.put(`/api/posts/byId/${postIdRef.current}`, data);
        }
      } else {
        const res = await axios.post('/api/posts', data);
        const createdPost = res.data?.data ?? res.data;
        if (createdPost?.id) {
           postIdRef.current = createdPost.id;
           setPostId(createdPost.id);
           if (typeof window !== 'undefined') {
             window.history.replaceState(null, '', `/admin/posts/${createdPost.id}`);
           }
        }
      }
      
      setSaveStatus('Saved');
      if (!isAutosave) toast.success(`Manuscript preserved`);
    } catch (error) {
      if (!isAutosave) toast.error('Uplink failed');
      setSaveStatus('Unsaved');
    } finally {
      setIsSaving(false);
    }
  }, [status]);

  // Premium Auto-save Synchronization
  useEffect(() => {
    if (!postId || saveStatus === 'Saved' || saveStatus === 'Syncing') return;

    const timer = setTimeout(() => {
      onSave(true);
    }, 5000); // 5s autosave for drafting flow

    return () => clearTimeout(timer);
  }, [title, content, excerpt, coverImage, tags, postId, onSave, saveStatus]);

  // Calculate metrics
  useEffect(() => {
    if (!content) return;
    const text = JSON.stringify(content).replace(/[^\w\s]/g, ' ');
    const words = text.split(/\s+/).filter(w => w.length > 0).length;
    setWordCount(words);
    setReadTime(Math.ceil(words / 200));
  }, [content]);

  // Institutional Slug Control
  useEffect(() => {
    if (title && (!postId || !slug)) {
      setSlug(slugify(title));
    }
  }, [title, postId, slug]);

  const handleAssetUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post('/api/upload', formData);
      const uploadedUrl = response.data?.url;
      if (!uploadedUrl) throw new Error('Upload failed');
      setCoverImage(uploadedUrl);
      setSaveStatus('Unsaved');
      toast.success('Cover asset uploaded');
    } catch (error) {
      toast.error('Asset upload failed');
    } finally {
      setIsUploadingImage(false);
      event.target.value = '';
    }
  }, []);

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
        class: 'w-full h-full focus:outline-none min-h-[800px] py-12',
      },
    },
  });

  if (!editor) return null;

  const handleEditorImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !editor) return;

    const toastId = toast.loading('Uploading asset...');
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post('/api/upload', formData);
      const uploadedUrl = response.data?.url;
      if (!uploadedUrl) throw new Error('Upload failed');
      
      editor.chain().focus().setImage({ src: uploadedUrl }).run();
      toast.success('Asset integrated successfully', { id: toastId });
    } catch (error) {
      toast.error('Asset upload failed', { id: toastId });
    } finally {
      event.target.value = '';
    }
  };

  const MenuBar = () => {
    const toggleLink = () => {
      const url = window.prompt('Enter institutional asset URL');
      if (url) {
        editor.chain().focus().setLink({ href: url }).run();
      } else {
        editor.chain().focus().unsetLink().run();
      }
    };

    const addImage = () => {
      editorImageInputRef.current?.click();
    };

    return (
      <div className="flex flex-wrap items-center gap-2 p-2 bg-[#1A1A1A] border border-white/5 rounded-2xl shadow-2xl backdrop-blur-3xl sticky top-20 z-50 transition-all duration-500">
        <input 
          type="file" 
          ref={editorImageInputRef} 
          accept="image/*" 
          className="hidden" 
          onChange={handleEditorImageUpload} 
        />
        <div className="flex items-center gap-1.5 px-3 border-r border-white/5">
          <button 
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="p-2.5 rounded-lg hover:bg-white/5 transition-all disabled:opacity-20 text-white/40 hover:text-white"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="p-2.5 rounded-lg hover:bg-white/5 transition-all disabled:opacity-20 text-white/40 hover:text-white"
          >
            <Redo2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-1.5 px-3 border-r border-white/5">
          {[
            { action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), icon: Heading1, active: 'heading' },
            { action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), icon: Heading2, active: 'heading' },
            { action: () => editor.chain().focus().setParagraph().run(), icon: Type, active: 'paragraph' },
          ].map((item, idx) => (
            <button 
              key={idx}
              onClick={item.action}
              className={`p-2.5 rounded-lg transition-all ${editor.isActive(item.active, item.active === 'heading' ? { level: (item.icon === Heading1 ? 1 : 2) } : undefined) ? 'bg-[#C2A46D]/20 text-[#C2A46D]' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}
            >
              <item.icon className="w-3.5 h-3.5" />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 px-3 border-r border-white/5">
          {[
            { action: () => editor.chain().focus().toggleBold().run(), icon: Bold, active: 'bold' },
            { action: () => editor.chain().focus().toggleItalic().run(), icon: Italic, active: 'italic' },
            { action: () => editor.chain().focus().toggleUnderline().run(), icon: UnderlineIcon, active: 'underline' },
            { action: () => editor.chain().focus().toggleStrike().run(), icon: Strikethrough, active: 'strike' },
            { action: () => editor.chain().focus().toggleCode().run(), icon: Code, active: 'code' },
          ].map((item, idx) => (
            <button 
              key={idx}
              onClick={item.action}
              className={`p-2.5 rounded-lg transition-all ${editor.isActive(item.active) ? 'bg-[#C2A46D]/20 text-[#C2A46D]' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}
            >
              <item.icon className="w-3.5 h-3.5" />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 px-3 border-r border-white/5">
          {[
            { action: () => editor.chain().focus().toggleBulletList().run(), icon: List, active: 'bulletList' },
            { action: () => editor.chain().focus().toggleOrderedList().run(), icon: ListOrdered, active: 'orderedList' },
            { action: () => editor.chain().focus().toggleBlockquote().run(), icon: Quote, active: 'blockquote' },
          ].map((item, idx) => (
            <button 
              key={idx}
              onClick={item.action}
              className={`p-2.5 rounded-lg transition-all ${editor.isActive(item.active) ? 'bg-[#C2A46D]/20 text-[#C2A46D]' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}
            >
              <item.icon className="w-3.5 h-3.5" />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 px-3">
          <button 
            onClick={toggleLink}
            className={`p-2.5 rounded-lg transition-all ${editor.isActive('link') ? 'bg-[#C2A46D]/20 text-[#C2A46D]' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={addImage}
            className="p-2.5 rounded-lg text-white/40 hover:bg-white/5 hover:text-white transition-all"
          >
            <ImageIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`flex flex-col mx-auto px-4 md:px-0 transition-all duration-1000 ${isZenMode ? 'max-w-4xl py-12' : 'max-w-7xl pb-40'}`}>
      
   {/* Zen Toggle / Institutional Controller */}
   <div className="fixed right-10 bottom-10 z-[100] flex flex-col gap-4">
     <button 
       onClick={() => onSave(false)}
       disabled={isSaving}
       className="w-14 h-14 rounded-2xl bg-[#C2A46D] text-[#0F0F12] shadow-[0_16px_32px_rgba(194,164,109,0.2)] flex items-center justify-center hover:scale-105 transition-all active:scale-95 disabled:opacity-50"
       title="Manual Synchronization"
     >
       {isSaving ? <Clock className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
     </button>
     
     <button 
       onClick={onPreview}
       className="w-14 h-14 rounded-2xl bg-[#1A1A1A] border border-white/5 text-white/40 shadow-2xl flex items-center justify-center hover:scale-105 transition-all hover:text-white"
       title="Institutional Preview"
     >
       <Eye className="w-5 h-5" />
     </button>

     {postId && (
        <button 
          onClick={() => setShowDeleteConfirm(true)}
          disabled={isDeleting}
          className="w-14 h-14 rounded-2xl bg-red-950/20 border border-red-500/10 text-red-500/40 shadow-2xl flex items-center justify-center hover:scale-105 transition-all hover:bg-red-500 hover:text-white"
          title="Retract Manuscript"
        >
          {isDeleting ? <Clock className="w-5 h-5 animate-spin" /> : <Trash className="w-5 h-5" />}
        </button>
     )}

     <button 
       onClick={() => setIsZenMode(!isZenMode)}
       className="w-14 h-14 rounded-2xl bg-[#1A1A1A] border border-white/5 text-white/40 shadow-2xl flex items-center justify-center hover:scale-105 transition-all hover:text-white"
       title={isZenMode ? "Exit Zen Mode" : "Enter Zen Mode"}
     >
       {isZenMode ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
     </button>
   </div>

   {/* Retraction Confirmation Modal */}
   <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
     <AlertDialogContent className="bg-[#1A1A1A] border border-white/5 text-white backdrop-blur-3xl rounded-[2rem] p-10">
       <AlertDialogHeader>
         <AlertDialogTitle className="text-3xl font-display font-black italic tracking-tighter">Confirm <span className="text-red-500">Retraction.</span></AlertDialogTitle>
         <AlertDialogDescription className="text-white/40 py-4 font-serif italic text-lg leading-relaxed">
           Are you certain you wish to purge this manuscript from the institutional registry? This action is permanent and cannot be reversed by strategic restoration protocols.
         </AlertDialogDescription>
       </AlertDialogHeader>
       <AlertDialogFooter className="flex gap-4">
         <AlertDialogCancel className="bg-transparent border border-white/5 hover:bg-white/5 text-white/60 rounded-xl px-8">Abort</AlertDialogCancel>
         <AlertDialogAction 
           onClick={onDelete}
           className="bg-red-500 hover:bg-red-600 text-white rounded-xl px-8 font-black uppercase tracking-widest text-[10px]"
         >
           Confirm Purge
         </AlertDialogAction>
       </AlertDialogFooter>
     </AlertDialogContent>
   </AlertDialog>

   <AnimatePresence>
        {!isZenMode && (
          <motion.header 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col gap-12 mb-20"
          >
            {/* Context Navigation */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
              <div className="flex flex-col gap-6">
                <button 
                  onClick={() => router.push('/admin/posts')}
                  className="flex items-center gap-3 text-white/20 hover:text-[#C2A46D] transition-colors group"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">Registry Archive</span>
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-1 h-5 bg-[#C2A46D] rounded-full" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 italic">Drafting Studio / Manuscript Control</span>
                </div>
                <h1 className="text-5xl md:text-8xl font-display font-black text-white tracking-[calc(-0.04em)] leading-[0.8]">
                  The <span className="text-[#C2A46D] italic">Manuscript.</span>
                </h1>
              </div>

              <div className="flex items-center gap-6 p-8 rounded-3xl bg-[#1A1A1A]/80 border border-white/5 backdrop-blur-3xl shadow-3xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-[#C2A46D]/5 -mr-12 -mt-12 rounded-full blur-3xl opacity-20" />
                 <div className="flex flex-col items-end">
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/10">Lexical Extent</span>
                    <span className="text-2xl font-display font-black text-white italic">{wordCount} <span className="text-[10px] uppercase text-white/20 not-italic ml-1">Words</span></span>
                 </div>
                 <div className="w-px h-10 bg-white/5" />
                 <div className="flex flex-col items-end">
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/10">Temporal Period</span>
                    <span className="text-2xl font-display font-black text-white italic">{readTime} <span className="text-[10px] uppercase text-white/20 not-italic ml-1">Min</span></span>
                 </div>
              </div>
            </div>

            {/* Principal Title & Status Dashboard */}
            <div className="flex flex-col gap-10 lg:flex-row lg:items-center justify-between p-10 bg-[#1A1A1A]/50 border border-white/5 rounded-[2.5rem] shadow-xl relative backdrop-blur-xl group">
               <div className="flex-1 max-w-4xl">
                 <textarea 
                   rows={1}
                   value={title}
                   onChange={(e) => {
                     setTitle(e.target.value);
                     setSaveStatus('Unsaved');
                   }}
                   placeholder="Enter Principal Manuscript Title..."
                   className="w-full bg-transparent text-4xl md:text-6xl font-display font-black text-white placeholder:text-white/5 focus:outline-none italic tracking-tighter resize-none overflow-hidden transition-all group-focus-within:text-[#C2A46D]"
                 />
               </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-4 px-6 py-3 rounded-full bg-[#0F0F12] border border-white/5 shadow-inner">
                     <div className={`w-1.5 h-1.5 rounded-full transition-all duration-700 ${
                       saveStatus === 'Saved' ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]' : 
                       saveStatus === 'Syncing' ? 'bg-[#C2A46D] animate-pulse shadow-[0_0_12px_rgba(194,164,109,0.8)]' : 
                       'bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.8)]'
                     }`} />
                     <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 italic">
                       {saveStatus === 'Saved' ? 'Synchronized' : saveStatus === 'Syncing' ? 'Syncing...' : 'Pending Entry'}
                     </span>
                  </div>
                  <button 
                   onClick={() => {
                      const next = status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
                      setStatus(next);
                      // Trigger instantaneous save with updated status
                      setTimeout(() => onSave(false), 0);
                   }}
                   className={`flex items-center gap-3 px-6 py-3 rounded-full border transition-all duration-500 ${status === 'PUBLISHED' ? 'bg-[#C2A46D]/10 border-[#C2A46D]/20 text-[#C2A46D]' : 'bg-white/5 border-white/10 text-white/40 hover:text-white hover:bg-white/10'}`}
                  >
                     <Rocket className="w-3.5 h-3.5" />
                     <span className="text-[10px] font-black uppercase tracking-widest">{status === 'PUBLISHED' ? 'Live' : 'Draft'}</span>
                  </button>
               </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Drafting Matrix */}
      <div className="flex flex-col gap-16 py-10">
        {!isZenMode && (
          <section className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">
            {/* Abstract Compose */}
            <div className="flex flex-col gap-6 p-10 bg-[#1A1A1A]/80 border border-white/5 rounded-[2.5rem] shadow-xl backdrop-blur-3xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-[#C2A46D]/60" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Executive Abstract</span>
                </div>
                <span className="text-[9px] font-black text-white/5 uppercase tracking-widest italic">Compositional Meta-layer</span>
              </div>
              <textarea 
                value={excerpt}
                onChange={(e) => {
                  setExcerpt(e.target.value);
                  setSaveStatus('Unsaved');
                }}
                placeholder="Compose a concise executive summary of the manuscript... This will represent the narrative in listings."
                className="w-full h-48 bg-[#0F0F12]/30 border border-white/5 rounded-2xl p-8 text-xl font-serif italic text-white/50 focus:outline-none focus:border-[#C2A46D]/20 transition-all no-scrollbar leading-relaxed"
              />
            </div>

            {/* Metadata Registry */}
            <div className="flex flex-col gap-8 p-10 bg-[#1A1A1A]/80 border border-white/5 rounded-[2.5rem] shadow-xl backdrop-blur-3xl">
               <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <ImageIcon className="w-4 h-4 text-[#C2A46D]/60" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Principal Visual Asset</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploadingImage}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#C2A46D]/20 bg-[#0F0F12]/70 px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#C2A46D] transition-all hover:border-[#C2A46D]/40 hover:bg-[#0F0F12] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Upload className={`h-3.5 w-3.5 ${isUploadingImage ? 'animate-spin' : ''}`} />
                      {isUploadingImage ? 'Uploading' : 'Upload Asset'}
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAssetUpload}
                    />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/10 italic">
                      JPG, PNG, WEBP
                    </span>
                  </div>
                    <button
                      type="button"
                      onClick={() => {
                        setCoverImage('');
                        setSaveStatus('Unsaved');
                      }}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/10 bg-red-500/5 px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-red-500 transition-all hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Retract asset
                    </button>
                    <input 
                      type="text" 
                      value={coverImage}
                      onChange={(e) => {
                        setCoverImage(e.target.value);
                        setSaveStatus('Unsaved');
                      }}
                      placeholder="Institutional Image CDN URL..."
                      className="w-full bg-[#0F0F12]/50 border border-white/5 rounded-xl px-6 py-4 text-[11px] font-mono text-white/40 focus:outline-none focus:border-[#C2A46D]/20 transition-all"
                    />
                  <div className="overflow-hidden rounded-2xl border border-white/5 bg-[#0F0F12]/50 aspect-video flex items-center justify-center">
                    {coverImage ? (
                      <img
                        src={coverImage}
                        alt="Cover preview"
                        className="h-full w-full object-cover transition-all hover:scale-105"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-4 px-6 text-center">
                        <ImageIcon className="w-8 h-8 text-white/5" />
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/10 italic">Awaiting Visual Asset</span>
                      </div>
                    )}
                  </div>
               </div>
               
               <div className="flex flex-col gap-6 pt-8 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <Hash className="w-4 h-4 text-[#C2A46D]/60" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Classification Tags</span>
                  </div>
                  <input 
                    type="text" 
                    value={tags}
                    onChange={(e) => {
                      setTags(e.target.value);
                      setSaveStatus('Unsaved');
                    }}
                    placeholder="Institutional labels (separated by commas)..."
                    className="w-full bg-[#0F0F12]/50 border border-white/5 rounded-xl px-6 py-4 text-[11px] font-mono text-white/40 focus:outline-none focus:border-[#C2A46D]/20 transition-all"
                  />
               </div>
            </div>
          </section>
        )}

        {/* The Drafting Surface */}
        {!isZenMode && <MenuBar />}
        
        <section className={`relative transition-all duration-1000 ${isZenMode ? 'p-0 bg-transparent' : 'p-12 md:p-24 bg-[#1A1A1A]/50 border border-white/5 rounded-[4rem] shadow-[-32px_0_64px_rgba(0,0,0,0.5)] backdrop-blur-3xl'}`}>
          {isZenMode && (
            <div className="flex flex-col items-center gap-8 mb-24 max-w-4xl mx-auto text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
               <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#C2A46D]/40 italic">Zen Operational Workspace</span>
               <h1 className="text-4xl md:text-6xl font-display font-black text-white italic tracking-tighter leading-tight">{title || 'Awaiting Nomenclature...'}</h1>
               <div className="w-20 h-px bg-white/10" />
            </div>
          )}
          
          <div className="prose prose-invert prose-editorial max-w-none prose-p:font-serif prose-p:text-2xl md:prose-p:text-3xl prose-p:text-white/60 prose-p:italic prose-p:leading-[1.6] prose-headings:font-display prose-headings:font-black prose-headings:tracking-tighter prose-headings:italic prose-headings:text-white prose-a:text-[#C2A46D] prose-a:italic selection:bg-[#C2A46D]/20">
            {editor && (
              <BubbleMenu editor={editor} pluginKey="bubbleMenu" updateDelay={100}>
                <div className="flex items-center gap-1 p-1 bg-[#0F0F12]/90 border border-white/10 rounded-xl shadow-2xl backdrop-blur-xl">
                  <button onClick={() => editor.chain().focus().toggleBold().run()} className={`p-2 rounded-lg transition-all ${editor.isActive('bold') ? 'bg-[#C2A46D] text-[#0F0F12]' : 'text-white/40 hover:text-white hover:bg-white/5'}`}><Bold className="w-3.5 h-3.5" /></button>
                  <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-2 rounded-lg transition-all ${editor.isActive('italic') ? 'bg-[#C2A46D] text-[#0F0F12]' : 'text-white/40 hover:text-white hover:bg-white/5'}`}><Italic className="w-3.5 h-3.5" /></button>
                  <button onClick={() => editor.chain().focus().toggleLink({ href: '' }).run()} className={`p-2 rounded-lg transition-all ${editor.isActive('link') ? 'bg-[#C2A46D] text-[#0F0F12]' : 'text-white/40 hover:text-white hover:bg-white/5'}`}><LinkIcon className="w-3.5 h-3.5" /></button>
                </div>
              </BubbleMenu>
            )}
            <EditorContent editor={editor} />
          </div>

          <div className="absolute bottom-12 right-12 opacity-5 pointer-events-none select-none">
             <span className="text-8xl font-display font-black italic">Solitic.</span>
          </div>
        </section>
      </div>

      <style jsx global>{`
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: rgba(255, 255, 255, 0.05);
          pointer-events: none;
          height: 0;
          font-style: italic;
          font-family: var(--font-playfair);
        }
        .ProseMirror {
          min-height: 800px;
          outline: none;
        }
        .shadow-3xl {
          box-shadow: 0 32px 128px -16px rgba(0, 0, 0, 0.7);
        }
      `}</style>
    </div>
  );
}
