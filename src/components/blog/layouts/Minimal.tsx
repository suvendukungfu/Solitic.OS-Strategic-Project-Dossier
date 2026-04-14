'use client';

import { motion } from "framer-motion";
import { renderContent } from "@/lib/tiptap";
import { cn } from "@/lib/utils";
import { LayoutProps } from "../types";
import { format } from "date-fns";

export default function MinimalLayout({ post, contentOverride }: LayoutProps) {
  
  // Font System Resolver
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
    <article className="bg-black text-white min-h-screen selection:bg-gold/30">
      <div className="max-w-4xl mx-auto px-6 py-40 space-y-32">
        {/* Header */}
        <header className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.5em] text-gold"
          >
            <span>{post.category}</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-white/40">{post.readingTime || "5"} MIN READ</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-display font-black leading-none tracking-tighter"
          >
            {post.title}
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-6 pt-8 border-t border-white/10"
          >
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-display italic text-lg text-gold">
              {post.author?.[0] || 'S'}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-white">{post.author || "Solitic Consulting"}</span>
              <span className="text-[10px] font-medium text-white/40 uppercase tracking-widest">
                {post.createdAt ? format(new Date(post.createdAt), "dd MMM yyyy") : ""}
              </span>
            </div>
          </motion.div>
        </header>

        {/* Content */}
        <div 
          className={cn("minimal-content solitic-content", selectedFontClass)}
          style={{ fontFamily: selectedFontFamily }}
        >
          {contentOverride || <div dangerouslySetInnerHTML={{ __html: renderContent(post.content) || '' }} />}
        </div>
      </div>
    </article>
  );
}
