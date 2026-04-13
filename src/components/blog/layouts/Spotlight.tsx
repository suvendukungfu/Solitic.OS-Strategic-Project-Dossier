'use client';

import { motion } from "framer-motion";
import { renderContent } from "@/lib/tiptap";
import { LayoutProps } from "../types";
import { Star, Quote, ChevronDown } from "lucide-react";
import Link from "next/link";
import { JSONContent } from "@tiptap/react";

export default function SpotlightLayout({ post, relatedPosts, contentOverride }: LayoutProps) {
  return (
    <article className="bg-[#050505] text-white min-h-screen font-sans">
      {/* Spotlight Stage */}
      <section className="relative h-screen flex flex-col items-center justify-center p-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent opacity-50" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-5xl"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <Star className="w-5 h-5 text-gold animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.8em] text-gold/60">Executive Spotlight</span>
            <Star className="w-5 h-5 text-gold animate-pulse" />
          </div>

          <h1 className="text-7xl md:text-[14rem] font-display font-black leading-[0.75] tracking-tighter uppercase italic mb-12 text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/10">
            {post.title}
          </h1>

          <div className="h-2 w-40 bg-gold mx-auto mb-12 shadow-[0_0_40px_rgba(194,164,109,0.5)]" />
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10"
        >
          <ChevronDown className="w-8 h-8 text-gold/20" />
        </motion.div>
      </section>

      {/* Spotlight Narrative */}
      <div className="max-w-4xl mx-auto px-6 py-40 space-y-32">
        <div className="relative p-12 bg-white/5 border border-white/10 rounded-[4rem] overflow-hidden group">
           <Quote className="absolute -top-10 -left-10 w-40 h-40 text-white/[0.02] transform rotate-12" />
           <p className="text-3xl md:text-5xl font-display font-black italic text-gold leading-tight relative z-10"
              dangerouslySetInnerHTML={{ __html: renderContent(post.excerpt as unknown as JSONContent) }} />
        </div>

        <div className="spotlight-content">
            {contentOverride || <div dangerouslySetInnerHTML={{ __html: renderContent(post.content as unknown as JSONContent) }} />}
        </div>
      </div>

      <footer className="max-w-7xl mx-auto px-4 pb-40 border-t border-white/5 pt-20">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
           {relatedPosts.map(r => (
             <Link href={`/blog/${r.slug}`} key={r.id} className="group pb-12 border-b border-white/5 last:border-0 md:border-0 md:border-r md:pr-12 md:last:border-0">
               <span className="text-[10px] font-black uppercase text-white/20 tracking-widest block mb-4 italic">Next Spotlight</span>
               <h4 className="text-4xl font-display font-black text-white leading-none group-hover:text-gold transition-colors">{r.title}</h4>
             </Link>
           ))}
         </div>
      </footer>

      <style jsx global>{`
        .spotlight-content p {
          margin-bottom: 3rem;
          font-size: 1.5rem;
          line-height: 1.8;
          color: rgba(255,255,255,0.6);
        }
        .spotlight-content h2, .spotlight-content h3 {
          font-family: var(--font-display);
          font-weight: 900;
          text-transform: uppercase;
          font-size: 5rem;
          line-height: 0.8;
          letter-spacing: -0.05em;
          margin: 6rem 0 3rem;
          color: white;
        }
        .spotlight-content blockquote {
          font-size: 3rem;
          font-weight: 900;
          font-style: italic;
          color: #C2A46D;
          border: 0;
          text-align: center;
          margin: 6rem 0;
        }
        .spotlight-content img {
          width: 100% !important;
          height: auto !important;
          object-fit: contain !important;
          border-radius: 4rem;
          margin: 6rem 0;
          opacity: 0.8;
          filter: grayscale(1);
          transition: all 0.7s;
        }
        .spotlight-content img:hover {
          opacity: 1;
          filter: grayscale(0);
          transform: scale(1.02);
        }
      `}</style>
    </article>
  );
}
