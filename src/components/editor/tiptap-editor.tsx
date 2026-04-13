'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { slugify, cn } from '@/lib/utils';
import { toast } from 'sonner';
import RichTextEditor from './rich-text-editor';
import { JSONContent } from '@tiptap/react';
import { Post } from '@prisma/client';
import { 
  ArrowLeft, 
  Trash2, 
  Image as ImageIcon, 
  Hash, 
  FileText,
  Clock,
  Upload,
  Save,
  Rocket,
  Eye,
  Trash,
  Layout as LayoutIcon,
  Tag,
  Type,
  CheckCircle2,
  Minimize2,
  Maximize2,
  Palette,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BlogPostUI } from '../blog/BlogPostUI';
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
  "Corporate Strategy",
  "Institutional Policy",
  "Market Intelligence",
  "Legal Framework",
  "General Advisory"
];

const LAYOUT_VARIANTS = [
  { id: 'editorial', name: 'Editorial', desc: 'Standard newspaper-inspired grid with a strong cover story focus.', image: 'https://images.unsplash.com/photo-1585241936939-be4099591252?q=80&w=600&auto=format&fit=crop' },
  { id: 'magazine', name: 'Magazine', desc: 'Immersive full-screen imagery and ultra-modern typography headers.', image: 'https://images.unsplash.com/photo-1544640808-32ca72ac7f67?q=80&w=600&auto=format&fit=crop' },
  { id: 'minimal', name: 'Minimal', desc: 'Distraction-free focus on clarity, white space, and elegant serifs.', image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=600&auto=format&fit=crop' },
  { id: 'report', name: 'Report', desc: 'Technical documentation layout with data sidebars and docketing.', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=600&auto=format&fit=crop' },
  { id: 'spotlight', name: 'Spotlight', desc: 'Dramatic vertical scroll with spotlighting on key legal citations.', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop' }
];

const DEFAULT_JSON_CONTENT = { type: 'doc', content: [{ type: 'paragraph' }] };

export default function BlogEditor({ initialData }: { initialData?: Post }) {
  const router = useRouter();
  
  // Safe accessor for extended Prisma fields
  const safeData = initialData as (Post & { layoutType?: string; fonts?: string }) | undefined;

  const [postId, setPostId] = useState<string | null>(initialData?.id ?? null);
  const [title, setTitle] = useState(initialData?.title || '');
  const [category, setCategory] = useState(initialData?.category || 'General Advisory');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">(
    initialData?.status === "PUBLISHED" ? "PUBLISHED" : "DRAFT"
  );
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || '');
  const [tags, setTags] = useState(initialData?.tags || '');
  const [layoutType, setLayoutType] = useState<string>(safeData?.layoutType || 'editorial');
  const [fonts, setFonts] = useState<string>(safeData?.fonts || 'Inter');

  // Rich Text Contents
  const parseContent = (data: unknown): JSONContent => {
    if (!data) return DEFAULT_JSON_CONTENT;
    if (typeof data === 'string') {
      try { return JSON.parse(data) as JSONContent; } catch { return DEFAULT_JSON_CONTENT; }
    }
    return data as JSONContent;
  };

  const [content, setContent] = useState(parseContent(initialData?.content));
  const [excerpt, setExcerpt] = useState(parseContent(initialData?.excerpt));

  // Saving States
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'Saved' | 'Unsaved' | 'Syncing'>('Saved');
  const [isZenMode, setIsZenMode] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Refs for logic
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onSave = useCallback(async (isAutosave = false) => {
    if (!title) {
      if (!isAutosave) toast.error('Strategic Deficit: Manuscript Title required');
      return;
    }
    
    setIsSaving(true);
    setSaveStatus('Syncing');
    
    try {
      const data = {
        id: postId,
        title,
        category,
        slug: slug || slugify(title),
        content,
        excerpt,
        coverImage,
        tags,
        status,
        layoutType,
        fonts,
      };

      if (postId) {
        await axios.put(`/api/posts/byId/${postId}`, data);
      } else {
        const res = await axios.post('/api/posts', data);
        const createdPost = res.data?.data ?? res.data;
        if (createdPost?.id) {
          setPostId(createdPost.id);
          window.history.replaceState(null, '', `/admin/posts/${createdPost.id}`);
        }
      }
      
      setSaveStatus('Saved');
      if (!isAutosave) toast.success(`Institutional Synchronization Complete`);
    } catch (error: unknown) {
      let message = 'Strategic Uplink Failure';
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      if (!isAutosave) toast.error(message);
      setSaveStatus('Unsaved');
    } finally {
      setIsSaving(false);
    }
  }, [postId, title, category, slug, content, excerpt, coverImage, tags, status, layoutType, fonts]);

  // Autosave Logic
  useEffect(() => {
    if (!postId || saveStatus === 'Saved' || saveStatus === 'Syncing') return;
    const timer = setTimeout(() => onSave(true), 5000);
    return () => clearTimeout(timer);
  }, [onSave, postId, saveStatus]);

  const onDelete = async () => {
    if (!postId) return;
    setIsDeleting(true);
    try {
      await axios.delete(`/api/posts/byId/${postId}`);
      toast.success('Manuscript Retracted');
      router.push('/admin/posts');
    } catch {
      toast.error('Retraction Blocked');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleAssetUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post('/api/upload', formData);
      if (res.data?.url) {
        setCoverImage(res.data.url);
        setSaveStatus('Unsaved');
        toast.success('Visual Asset Authorized');
      }
    } catch {
      toast.error('Asset Authorization Failed');
    } finally {
      setIsUploadingImage(false);
      event.target.value = '';
    }
  };

  const [isPreviewMode, setIsPreviewMode] = useState(false);

  return (
    <div className={cn(
      "flex flex-col mx-auto px-4 md:px-0 transition-all duration-1000",
      (isZenMode || isPreviewMode) ? "max-w-full" : "max-w-7xl pb-40"
    )}>
      
      {/* Precision Controls */}
      <div className="fixed right-10 bottom-10 z-[100] flex flex-col gap-4">
        <button 
          onClick={() => onSave(false)}
          disabled={isSaving}
          className="w-14 h-14 rounded-2xl bg-[#C2A46D] text-[#0F0F12] shadow-2xl flex items-center justify-center hover:scale-105 transition-all disabled:opacity-50"
          title="Save Manuscript"
        >
          {isSaving ? <Clock className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
        </button>
        <button 
          onClick={() => setIsPreviewMode(!isPreviewMode)}
          className={cn(
            "w-14 h-14 rounded-2xl flex items-center justify-center transition-all",
            isPreviewMode ? "bg-white text-black" : "bg-[#1A1A1A] border border-white/5 text-white/40 hover:text-white"
          )}
          title="Toggle Premium Preview"
        >
          <Eye className="w-5 h-5" />
        </button>
        {postId && (
          <button onClick={() => setShowDeleteConfirm(true)} className="w-14 h-14 rounded-2xl bg-red-950/20 text-red-500 border border-red-500/10 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
            <Trash className="w-5 h-5" />
          </button>
        )}
        <button 
          onClick={() => setIsZenMode(!isZenMode)} 
          className="w-14 h-14 rounded-2xl bg-[#1A1A1A] border border-white/5 text-white/40 flex items-center justify-center hover:text-white transition-all"
        >
          {isZenMode ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {isPreviewMode ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full h-full min-h-screen bg-black rounded-[3rem] overflow-hidden border border-white/10 shadow-4xl my-10"
          >
             <div className="bg-white/5 p-4 flex items-center justify-between border-b border-white/10 px-8">
               <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gold">Live Tactical Preview</span>
               <button onClick={() => setIsPreviewMode(false)} className="text-white/40 hover:text-white flex items-center gap-2 text-[10px] font-black uppercase">
                 Exit Preview <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
               </button>
             </div>
             <div className="zoom-[0.8] origin-top">
                <BlogPostUI post={{ ...initialData, title, category, slug, content, excerpt, coverImage, tags, layoutType }} relatedPosts={[]} />
             </div>
          </motion.div>
        ) : (
          <motion.div
            key="editor"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AnimatePresence>
              {!isZenMode && (
                <motion.header 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col gap-10 mb-20 pt-10"
                >
                  <div className="flex flex-col gap-6">
                    <button 
                      onClick={() => router.push('/admin/posts')}
                      className="flex items-center gap-3 text-white/20 hover:text-[#C2A46D] transition-colors group w-fit"
                    >
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">Archive</span>
                    </button>
                    <h1 className="text-5xl md:text-8xl font-display font-black text-white tracking-tighter italic">
                      The <span className="text-[#C2A46D]">Manuscript.</span>
                    </h1>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-8 bg-[#1A1A1A]/80 border border-white/5 rounded-[2.5rem] backdrop-blur-3xl shadow-3xl">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 px-2">Principal Title</label>
                      <input 
                        value={title}
                        onChange={(e) => { setTitle(e.target.value); setSaveStatus('Unsaved'); }}
                        placeholder="Manuscript Name..."
                        className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-5 text-2xl font-display font-black text-white placeholder:text-white/5 focus:outline-none focus:border-[#C2A46D]/20 transition-all"
                      />
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 px-2">Strategic Classification</label>
                      <select 
                        value={category}
                        onChange={(e) => { setCategory(e.target.value); setSaveStatus('Unsaved'); }}
                        className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-5 text-lg font-display font-black text-white focus:outline-none focus:border-[#C2A46D]/20 transition-all appearance-none"
                      >
                        {CATEGORIES.map(c => <option key={c} value={c} className="bg-[#1A1A1A] text-white">{c}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="relative group overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#1A1A1A]/40 min-h-[300px] flex items-center justify-center">
                    {coverImage ? (
                      <>
                        <img src={coverImage} className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-700" alt="Cover" />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
                        <button 
                          onClick={() => fileInputRef.current?.click()}
                          className="relative z-10 px-8 py-4 bg-white/10 backdrop-blur-md rounded-2xl text-[10px] font-black uppercase tracking-widest text-white border border-white/10 hover:bg-gold hover:text-black transition-all"
                        >
                          Change Cover Art
                        </button>
                      </>
                    ) : (
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="flex flex-col items-center gap-4 text-white/20 hover:text-gold transition-all"
                      >
                        <Upload className="w-12 h-12" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Authorize Cover Asset</span>
                      </button>
                    )}
                    <input type="file" ref={fileInputRef} onChange={handleAssetUpload} className="hidden" accept="image/*" />
                    {isUploadingImage && (
                      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-20 flex items-center justify-center">
                        <Clock className="w-8 h-8 text-gold animate-spin" />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between p-6 bg-[#1A1A1A]/40 border border-white/5 rounded-3xl">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        saveStatus === 'Saved' ? "bg-green-500 animate-pulse" : "bg-amber-500 animate-bounce"
                      )} />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 italic">
                        {saveStatus === 'Saved' ? 'Synchronized' : 'Sync Pending...'}
                      </span>
                    </div>
                    <button 
                      onClick={() => { setStatus(status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED'); setSaveStatus('Unsaved'); }}
                      className={cn(
                        "flex items-center gap-2 px-6 py-2.5 rounded-full border transition-all text-[10px] font-black uppercase tracking-widest",
                        status === 'PUBLISHED' ? "bg-[#C2A46D]/10 border-[#C2A46D]/20 text-[#C2A46D]" : "bg-white/5 border-white/10 text-white/40"
                      )}
                    >
                      <Rocket className="w-3.5 h-3.5" />
                      {status === 'PUBLISHED' ? 'Institutional Live' : 'Drafting Flow'}
                    </button>
                  </div>
                </motion.header>
              )}
            </AnimatePresence>

            <div className="space-y-32">
              {!isZenMode && (
                <section className="space-y-12">
                  <div className="flex items-center gap-4">
                    <Palette className="w-5 h-5 text-[#C2A46D]" />
                    <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30">Editorial Designs</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {LAYOUT_VARIANTS.map((l) => (
                      <button 
                        key={l.id}
                        onClick={() => { setLayoutType(l.id); setSaveStatus('Unsaved'); }}
                        className={cn(
                          "group relative flex flex-col overflow-hidden rounded-[2rem] border transition-all duration-500",
                          layoutType === l.id ? "border-[#C2A46D] bg-[#C2A46D]/5 ring-4 ring-[#C2A46D]/10" : "border-white/5 bg-white/[0.02] hover:border-white/10"
                        )}
                      >
                        <div className="relative w-full aspect-[16/10] overflow-hidden">
                          <img 
                            src={l.image} 
                            alt={l.name}
                            className={cn(
                              "w-full h-full object-cover transition-all duration-700",
                              layoutType === l.id ? "scale-105 brightness-110" : "opacity-60 grayscale-[0.5] group-hover:grayscale-0 group-hover:opacity-100"
                            )}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F12] via-[#0F0F12]/20 to-transparent" />
                        </div>
                        <div className="p-5 relative z-10 text-left">
                          <span className={cn(
                            "text-[10px] font-black uppercase tracking-[0.2em] block mb-1",
                            layoutType === l.id ? "text-[#C2A46D]" : "text-white/40"
                          )}>
                            {l.name}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </section>
              )}

              <section className="space-y-24">
                {!isZenMode && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-[#C2A46D]/60" />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Executive Abstract</span>
                    </div>
                    <RichTextEditor 
                      content={excerpt} 
                      onChange={(json) => { setExcerpt(json); setSaveStatus('Unsaved'); }}
                      placeholder="Draft the executive summary here..."
                      minHeight="150px"
                      className="font-serif italic text-lg"
                    />
                  </div>
                )}

                <div className="space-y-12 pb-20">
                  {!isZenMode && (
                    <div className="flex items-center gap-3">
                      <Type className="w-4 h-4 text-[#C2A46D]/60" />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">The Manuscript</span>
                    </div>
                  )}
                  
                  <div className={cn(
                    "transition-all duration-1000",
                    isZenMode ? "bg-transparent" : "p-12 md:p-24 bg-[#1A1A1A]/50 border border-white/5 rounded-[4rem] shadow-3xl backdrop-blur-3xl"
                  )}>
                    {isZenMode && (
                      <div className="flex flex-col items-center gap-8 mb-24 max-w-4xl mx-auto text-center">
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#C2A46D]/40 italic">Zen Operational Workspace</span>
                        <h1 className="text-4xl md:text-6xl font-display font-black text-white italic tracking-tighter leading-tight">{title || 'Awaiting Nomenclature...'}</h1>
                        <div className="w-20 h-px bg-white/10" />
                      </div>
                    )}
                    
                    <RichTextEditor 
                      content={content} 
                      onChange={(json) => { setContent(json); setSaveStatus('Unsaved'); }}
                      placeholder="Architecture the main narrative..."
                      minHeight={isZenMode ? "800px" : "600px"}
                      className="text-xl"
                    />
                  </div>
                </div>
              </section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent className="bg-[#121212] border border-white/10 text-white rounded-[2rem] p-10 max-w-lg backdrop-blur-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-3xl font-display font-black italic tracking-tighter mb-4 text-red-500">Acknowledge Retraction?</AlertDialogTitle>
            <AlertDialogDescription className="text-white/40 text-lg leading-relaxed italic">
              This manuscript will be permanently purged from the strategic archive. This action is definitive.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-10 gap-4">
            <AlertDialogCancel className="bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-xl px-8 py-6">Cancel Protocol</AlertDialogCancel>
            <AlertDialogAction 
              onClick={onDelete}
              className="bg-red-500 text-white hover:bg-red-600 rounded-xl px-8 py-6 font-bold"
              disabled={isDeleting}
            >
              {isDeleting ? "Purging..." : "Retract Manuscript"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
