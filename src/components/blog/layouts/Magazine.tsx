'use client';

import { motion } from "framer-motion";
import { renderContent } from "@/lib/tiptap";
import { Clock, ChevronRight } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { LayoutProps } from "../types";
import { JSONContent } from "@tiptap/react";

export default function MagazineLayout({ post, relatedPosts, contentOverride }: LayoutProps) {
  const tags = post.tags ? String(post.tags).split(",").filter(Boolean) : [];
  const readingTime = post.readingTime || 5;
  
  return (
    <article className="bg-[#0b0c10] text-[#c5c6c7] min-h-screen">
      {/* Cinematic Hero */}
      <section className="relative h-screen w-full overflow-hidden">
        {post.coverImage && (
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <img 
              src={post.coverImage} 
              className="w-full h-full object-cover opacity-60" 
              alt={post.title} 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-[#0b0c10]" />
          </motion.div>
        )}
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold text-[10px] font-black uppercase tracking-[0.8em] mb-8"
          >
            Institutional Feature / {post.category}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-6xl md:text-[10rem] lg:text-[12rem] font-display font-black leading-[0.85] tracking-tighter uppercase text-white mb-12"
          >
            {post.title}
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-10"
          >
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-white/40 uppercase">Published</span>
              <span className="text-white font-display font-bold italic">{format(new Date(post.createdAt), "MMMM yyyy")}</span>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="flex flex-col items-start">
              <span className="text-[10px] font-black text-white/40 uppercase">Allocation</span>
              <span className="text-white font-display font-bold italic">{readingTime} Min Read</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Narrative Body */}
      <div className="max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-12 gap-20">
        <div className="lg:col-span-8 space-y-24">
          <div 
            className="font-serif text-3xl md:text-5xl italic text-white/50 leading-tight border-l-8 border-gold pl-12 py-4"
            dangerouslySetInnerHTML={{ __html: renderContent(post.excerpt as unknown as JSONContent) }} 
          />

          <div className="magazine-body">
             <div className="magazine-content text-xl leading-relaxed">
               {contentOverride || <div dangerouslySetInnerHTML={{ __html: renderContent(post.content as unknown as JSONContent) }} />}
             </div>
          </div>

          {/* Tactical Tags */}
          <div className="flex flex-wrap gap-4 pt-16 border-t border-white/5">
            {tags.map(t => (
              <span key={t} className="px-6 py-2 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-gold border border-gold/10">
                #{t}
              </span>
            ))}
          </div>
        </div>

        <aside className="lg:col-span-4 space-y-16">
           <div className="sticky top-32 space-y-16">
              <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10 group">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gold mb-8 italic">Next Strategic Draft</h4>
                {relatedPosts.slice(0, 3).map((rel) => (
                  <Link key={rel.id} href={`/blog/${rel.slug}`} className="group block py-6 border-b border-white/5 last:border-0">
                      <div className="flex items-center justify-between text-[8px] font-bold text-white/20 uppercase tracking-widest mb-2">
                        <span>{rel.category}</span>
                        <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <h4 className="text-lg font-display font-black text-white group-hover:text-gold transition-colors leading-tight">{rel.title}</h4>
                  </Link>
                ))}
              </div>

              <div className="p-8 border border-white/5 rounded-3xl">
                <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mb-6">Access Authority</h4>
                <p className="text-xl font-display font-bold italic text-gold">{post.author || "Principal Counsel"}</p>
                <div className="mt-4 w-12 h-1 bg-gold" />
              </div>
           </div>
        </aside>
      </div>

      <style jsx global>{`
        .magazine-content p {
          margin-bottom: 2.5rem;
          color: #c5c6c7;
        }
        .magazine-content h2, .magazine-content h3 {
          color: white;
          font-family: var(--font-display);
          font-weight: 900;
          text-transform: uppercase;
          margin-top: 5rem;
          margin-bottom: 2rem;
        }
        .magazine-content blockquote {
          border-left: 4px solid #c5a47e;
          padding-left: 2rem;
          font-style: italic;
          color: #c5a47e;
          margin: 4rem 0;
          font-size: 1.5rem;
        }
      `}</style>
    </article>
  );
}
