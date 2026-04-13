'use client';

import { motion, useScroll, useTransform } from "framer-motion";
import { renderContent } from "@/lib/tiptap";
import { Star, ArrowRight, Share2, Sparkles, ChevronDown } from "lucide-react";
import Link from "next/link";
import { JSONContent } from "@tiptap/react";
import { useRef } from "react";
import { LayoutProps } from "../types";

export default function SpotlightLayout({ post, relatedPosts }: LayoutProps) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const tags = post.tags ? String(post.tags).split(",").filter(Boolean) : [];

  return (
    <article ref={containerRef} className="bg-[#050505] text-white min-h-screen">
      {/* Narrative Hero */}
      <section className="relative h-[120vh] flex items-center justify-center overflow-hidden">
        {post.coverImage && (
          <motion.div style={{ scale }} className="absolute inset-0 z-0">
             <img src={post.coverImage ?? undefined} className="w-full h-full object-cover opacity-60" alt={post.title} />
             <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#050505]" />
          </motion.div>
        )}

        <motion.div 
          style={{ opacity }}
          className="relative z-10 text-center space-y-12 max-w-5xl px-6"
        >
           <div className="flex items-center justify-center gap-4 text-gold/60">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.6em] italic">{post.category}</span>
           </div>

           <h1 className="text-6xl md:text-[10rem] font-display font-black leading-[0.85] tracking-tighter uppercase italic drop-shadow-2xl">
              {post.title}
           </h1>

           <div className="flex flex-col items-center gap-10">
              <div className="w-px h-32 bg-gradient-to-b from-gold/40 to-transparent" />
              <div className="flex items-center gap-10">
                 <div className="flex flex-col items-center">
                    <span className="text-[8px] font-black uppercase tracking-widest text-white/20 mb-2">Lead</span>
                    <span className="text-xs font-bold uppercase tracking-widest text-white">{post.author || "Solitic"}</span>
                 </div>
                 <div className="w-2 h-2 rounded-full bg-gold" />
                 <div className="flex flex-col items-center">
                    <span className="text-[8px] font-black uppercase tracking-widest text-white/20 mb-2">Edition</span>
                    <span className="text-xs font-bold uppercase tracking-widest text-white">{new Date(post.createdAt).getFullYear()}</span>
                 </div>
              </div>
              <ChevronDown className="w-8 h-8 text-white/20 animate-bounce mt-10" />
           </div>
        </motion.div>
      </section>

      {/* Flagship Content Body */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-40">
        <div className="prose prose-invert prose-gold max-w-none spotlight-content">
          <div className="mb-32 text-4xl md:text-5xl font-display font-black text-gold italic leading-tight text-center"
               dangerouslySetInnerHTML={{ __html: renderContent(post.excerpt) }} />
          
          <div dangerouslySetInnerHTML={{ __html: renderContent(post.content as unknown as JSONContent) }} />
        </div>

        {/* Cinematic Footer */}
        <footer className="mt-60 space-y-40 border-t border-white/5 pt-40">
           <div className="flex flex-col items-center text-center space-y-12">
              <Star className="w-10 h-10 text-gold/30" />
              <h2 className="text-5xl md:text-7xl font-display font-black text-white italic tracking-tighter uppercase">Advancing the <span className="text-gold">Frontier.</span></h2>
              <p className="text-white/40 max-w-xl mx-auto italic font-serif text-lg leading-relaxed">Our strategic intelligence is a synthesis of global market shifts and institutional policy evolution.</p>
              <Link href="/contact" className="px-12 py-5 bg-gold text-black text-[10px] font-black uppercase tracking-[0.4em] hover:scale-105 transition-all rounded-full shadow-[0_0_50px_rgba(194,164,109,0.3)]">
                 Secure Consultation
              </Link>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {relatedPosts.slice(0, 2).map(rel => (
                <Link key={rel.id} href={`/blog/${rel.slug}`} className="group relative aspect-video rounded-[3rem] overflow-hidden border border-white/5">
                   <img src={rel.coverImage ?? undefined} className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-110 transition-transform duration-1000" alt={rel.title} />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                   <div className="absolute inset-0 p-12 flex flex-col justify-end">
                      <span className="text-gold text-[9px] font-black uppercase tracking-[0.4em] mb-4">The Next Narrative</span>
                      <h4 className="text-3xl font-display font-black text-white leading-tight italic">{rel.title}</h4>
                   </div>
                </Link>
              ))}
           </div>
        </footer>
      </section>

      <style jsx global>{`
        .spotlight-content h2, .spotlight-content h3 {
          font-family: var(--font-display);
          font-weight: 900;
          font-style: italic;
          text-align: center;
          text-transform: uppercase;
          letter-spacing: -0.05em;
          color: white;
          margin-top: 8rem;
          margin-bottom: 4rem;
        }
        .spotlight-content h2 { font-size: 5rem; line-height: 0.9; }
        .spotlight-content h3 { font-size: 3rem; }
        .spotlight-content p {
          font-size: 1.5rem;
          line-height: 1.8;
          color: rgba(255,255,255,0.6);
          margin-bottom: 3rem;
          text-align: center;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
        }
        .spotlight-content blockquote {
          background: linear-gradient(to bottom, rgba(194,164,109,0.1), transparent);
          border: none;
          padding: 6rem;
          text-align: center;
          font-size: 2.5rem;
          font-weight: 900;
          font-style: italic;
          color: #C2A46D;
          margin: 8rem 0;
          border-radius: 4rem;
          line-height: 1.2;
        }
        .spotlight-content img {
          width: 100%;
          border-radius: 4rem;
          margin: 8rem 0;
          box-shadow: 0 0 100px rgba(0,0,0,1);
        }
      `}</style>
    </article>
  );
}
