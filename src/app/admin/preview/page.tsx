'use client';

import { useEffect, useState } from 'react';
import { BlogPostUI } from '@/components/blog/BlogPostUI';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

import { BlogPost } from '@/components/blog/types';

export default function PreviewPage() {
  const [draft, setDraft] = useState<BlogPost | null>(null);

  useEffect(() => {
    const data = localStorage.getItem('solitic_draft_preview');
    if (data) {
      try {
        setDraft(JSON.parse(data) as BlogPost);
      } catch (e) {
        console.error("Institutional Preview Corruption:", e);
      }
    }
  }, []);

  if (!draft) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center font-display italic text-white/20">
        <Navbar />
        <div className="flex flex-col items-center gap-6">
           <div className="w-16 h-16 rounded-full border-2 border-white/5 flex items-center justify-center animate-pulse">
             <span className="text-gold font-black">?</span>
           </div>
           <span>Awaiting strategic manuscript data for preview...</span>
         </div>
        <Footer />
      </div>
    );
  }

  // Render the post using the EXACT same component as the public site
  return (
    <div className="bg-background">
      <div className="fixed top-24 left-10 z-[100] pointer-events-none">
         <div className="bg-gold text-charcoal px-6 py-2 rounded-full font-display font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Strategic Preview / Non-Persistent
         </div>
      </div>
      <BlogPostUI post={draft} relatedPosts={[]} />
    </div>
  );
}
