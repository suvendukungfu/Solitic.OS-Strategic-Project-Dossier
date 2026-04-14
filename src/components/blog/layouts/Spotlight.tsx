'use client';

import { motion } from "framer-motion";
import { renderContent } from "@/lib/tiptap";
import { cn } from "@/lib/utils";
import { LayoutProps } from "../types";
import { format } from "date-fns";

export default function SpotlightLayout({ post, contentOverride }: LayoutProps) {
  
  const getFontClass = (font?: string) => {
    switch(font?.toLowerCase()) {
      case 'playfair': return 'font-display';
      case 'poppins': return 'font-poppins';
      case 'merriweather': return 'font-merriweather';
      case 'fira': return 'font-mono-fira';
      default: return 'font-sans';
    }
  };

  const selectedFontClass = getFontClass(post.fonts);
  const selectedFontFamily = post.fonts?.toLowerCase() === 'playfair' ? 'var(--font-display)' :
                            post.fonts?.toLowerCase() === 'poppins' ? 'var(--font-poppins)' :
                            post.fonts?.toLowerCase() === 'merriweather' ? 'var(--font-merriweather)' :
                            post.fonts?.toLowerCase() === 'fira' ? 'var(--font-mono-fira)' :
                            'var(--font-sans)';

  return (
    <article className="bg-[#050505] text-white min-h-screen">
      <div className="max-w-6xl mx-auto px-8 py-48 flex flex-col items-center">
        {/* Cinematic Header */}
        <header className="w-full text-center space-y-16 mb-40">
           <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-10 py-3 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.8em] text-gold"
           >
             Solitic Spotlight
           </motion.div>

           <motion.h1 
            initial={{ opacity: 0, filter: 'blur(20px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.5 }}
            className="text-8xl md:text-[12rem] font-display font-black uppercase leading-[0.75] tracking-tighter"
           >
            {post.title}
           </motion.h1>

           <div className="flex flex-col items-center gap-6 pt-16">
             <div className="w-px h-24 bg-gradient-to-b from-gold to-transparent" />
             <p className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40 italic">
               Narrative feature by {post.author || "Solitic Consulting"}
             </p>
           </div>
        </header>

        {/* Feature Body */}
        <div 
          className={cn("spotlight-content solitic-content max-w-4xl", selectedFontClass)}
          style={{ fontFamily: selectedFontFamily }}
        >
          {contentOverride || <div dangerouslySetInnerHTML={{ __html: renderContent(post.content) || '' }} />}
        </div>
      </div>
    </article>
  );
}
