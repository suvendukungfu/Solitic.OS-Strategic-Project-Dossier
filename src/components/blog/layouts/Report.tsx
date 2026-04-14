'use client';

import { motion } from "framer-motion";
import { renderContent } from "@/lib/tiptap";
import { cn } from "@/lib/utils";
import { LayoutProps } from "../types";
import { format } from "date-fns";
import { FileText, Shield, Globe, Award } from "lucide-react";

export default function ReportLayout({ post, contentOverride }: LayoutProps) {
  
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
    <article className="bg-[#0a0c10] text-white min-h-screen">
      {/* Institutional Top Bar */}
      <div className="h-2 w-full bg-gradient-to-r from-gold via-white to-gold" />
      
      <div className="max-w-5xl mx-auto px-8 py-32 space-y-24">
        {/* Verification Badge */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 border-b border-white/10 pb-12">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
              <Shield className="w-8 h-8 text-gold" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Classification</p>
              <p className="text-xl font-display font-black tracking-widest text-white uppercase italic">Strategic Intelligence</p>
            </div>
          </div>
          <div className="text-right">
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Authorized By</p>
             <p className="text-sm font-black uppercase tracking-[0.2em] text-gold">{post.author || "Solitic High Counsel"}</p>
          </div>
        </div>

        {/* Title Block */}
        <header className="space-y-12">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-6xl md:text-8xl font-display font-black uppercase tracking-tighter leading-[0.9]"
          >
            {post.title}
          </motion.h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-white/5">
            <div className="space-y-1">
              <p className="text-[9px] font-black uppercase text-white/30 tracking-widest">Date Published</p>
              <p className="text-xs font-bold">{post.createdAt ? format(new Date(post.createdAt), "dd.MM.yyyy") : ""}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[9px] font-black uppercase text-white/30 tracking-widest">Document ID</p>
              <p className="text-xs font-bold">SOL-{post.id?.slice(0, 6).toUpperCase()}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[9px] font-black uppercase text-white/30 tracking-widest">Category</p>
              <p className="text-xs font-bold text-gold uppercase">{post.category}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[9px] font-black uppercase text-white/30 tracking-widest">Status</p>
              <p className="text-xs font-bold text-green-500 uppercase">Verified</p>
            </div>
          </div>
        </header>

        {/* Executive Abstract */}
        <div className="bg-white/[0.02] p-12 border border-white/5 rounded-3xl relative overflow-hidden">
           <FileText className="absolute top-4 right-4 w-24 h-24 text-white/5 -rotate-12" />
           <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gold mb-6 border-b border-gold/20 pb-2 w-fit">Abstract</p>
           <div className="font-serif italic text-2xl text-white/70 leading-relaxed" 
              dangerouslySetInnerHTML={{ __html: renderContent(post.excerpt) || '' }} 
           />
        </div>

        {/* Report Body */}
        <div 
          className={cn("report-content solitic-content", selectedFontClass)}
          style={{ fontFamily: selectedFontFamily }}
        >
          {contentOverride || <div dangerouslySetInnerHTML={{ __html: renderContent(post.content) || '' }} />}
        </div>

        {/* Footer Authorization */}
        <footer className="pt-32 border-t border-white/10 flex flex-col items-center gap-12 opacity-40">
           <div className="w-24 h-1 bg-gold rounded-full" />
           <p className="text-[10px] font-black uppercase tracking-[0.8em] text-center">
             End of Strategic Document // Institutional Archive Solitic.OS
           </p>
        </footer>
      </div>
    </article>
  );
}
