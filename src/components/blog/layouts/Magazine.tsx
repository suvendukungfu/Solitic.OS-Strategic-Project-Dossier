'use client';

import { motion } from "framer-motion";
import { renderContent } from "@/lib/tiptap";
import { Clock, Share2, Twitter, Linkedin, Link as LinkIcon, ChevronRight } from "lucide-react";
import Link from "next/link";
import { JSONContent } from "@tiptap/react";
import { LayoutProps } from "../types";

export default function MagazineLayout({ post, relatedPosts }: LayoutProps) {
  const tags = post.tags ? String(post.tags).split(",").filter(Boolean) : [];
  const readingTime = post.readingTime || 5;
  
  return (
    <article className="bg-[#0a0a0a] text-white min-h-screen overflow-hidden">
      {/* Immersive Hero */}
      <section className="relative h-screen w-full flex items-end pb-20 px-6 md:px-20 overflow-hidden">
        {post.coverImage && (
          <div className="absolute inset-0">
            <img 
              src={post.coverImage ?? undefined} 
              alt={post.title}
              className="w-full h-full object-cover scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
          </div>
        )}
        
        <div className="relative z-10 max-w-6xl w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 text-gold mb-6"
          >
            <span className="h-px w-12 bg-gold" />
            <span className="text-xs font-black uppercase tracking-[0.5em]">{post.category}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-9xl font-display font-black leading-[0.85] tracking-tighter italic uppercase mb-10"
          >
            {post.title}
          </motion.h1>

          <div className="flex flex-wrap items-center gap-10 text-[10px] font-black uppercase tracking-widest text-white/40">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center text-gold">S</span>
              <div className="flex flex-col">
                <span className="text-white/20 uppercase tracking-widest text-[8px] mb-0.5">Contributor</span>
                <span className="text-white">{post.author || "Solitic Collective"}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 border-l border-white/10 pl-10">
              <Clock className="w-4 h-4 text-gold" />
              <div className="flex flex-col">
                <span className="text-white/20 uppercase tracking-widest text-[8px] mb-0.5">Allocation</span>
                <span>{readingTime} Min Read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-20 py-32 grid grid-cols-1 lg:grid-cols-12 gap-20">
        <div className="lg:col-span-8 space-y-16">
          <div className="text-3xl md:text-4xl font-display font-bold text-gold italic leading-tight border-l-8 border-gold pl-10"
               dangerouslySetInnerHTML={{ __html: renderContent(post.excerpt as unknown as JSONContent) }} />

          <div className="prose prose-invert prose-gold max-w-none text-xl leading-relaxed text-white/70 magazine-content"
               dangerouslySetInnerHTML={{ __html: renderContent(post.content as unknown as JSONContent) }} />
        </div>

        <aside className="lg:col-span-4 space-y-20">
          <div className="sticky top-32 space-y-16">
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gold border-b border-white/10 pb-4">Disseminate Insights</h4>
              <div className="flex gap-4">
                {[Twitter, Linkedin, LinkIcon].map((Icon, i) => (
                  <button key={i} className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center hover:bg-gold hover:text-black transition-all">
                    <Icon className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-10">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gold border-b border-white/10 pb-4">Keywords</h4>
              <div className="flex flex-wrap gap-3">
                {tags.map(tag => (
                  <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-gold cursor-pointer transition-colors">#{tag.trim()}</span>
                ))}
              </div>
            </div>

            <div className="p-10 bg-white/[0.02] border border-white/5 rounded-3xl group">
               <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gold mb-8 italic">Next Up</h4>
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
          </div>
        </aside>
      </section>

      <style jsx global>{`
        .magazine-content h2, .magazine-content h3 {
          font-family: var(--font-display);
          font-weight: 900;
          font-style: italic;
          color: white;
          margin-top: 4rem;
          margin-bottom: 2rem;
          text-transform: uppercase;
          letter-spacing: -0.05em;
        }
        .magazine-content h2 { font-size: 3rem; }
        .magazine-content h3 { font-size: 2rem; }
        .magazine-content p { margin-bottom: 2rem; }
        .magazine-content img {
          width: 100%;
          border-radius: 2rem;
          margin: 4rem 0;
          box-shadow: 0 50px 100px -20px rgba(0,0,0,1);
        }
        .magazine-content blockquote {
          background: rgba(194, 164, 109, 0.05);
          border-left: 4px solid #C2A46D;
          padding: 3rem;
          font-style: italic;
          font-size: 2rem;
          line-height: 1.4;
          color: white;
          margin: 4rem 0;
          border-radius: 0 2rem 2rem 0;
        }
      `}</style>
    </article>
  );
}
