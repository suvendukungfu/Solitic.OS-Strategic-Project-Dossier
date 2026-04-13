'use client';

import { motion } from "framer-motion";
import { renderContent } from "@/lib/tiptap";
import { ArrowLeft, Share2, Link as LinkIcon, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";
import { JSONContent } from "@tiptap/react";
import { format } from "date-fns";
import { LayoutProps } from "../types";

export default function MinimalLayout({ post, relatedPosts }: LayoutProps) {
  const tags = post.tags ? String(post.tags).split(",").filter(Boolean) : [];
  
  return (
    <article className="bg-white text-black min-h-screen">
      {/* Top Header */}
      <nav className="fixed top-0 left-0 right-0 h-20 border-b border-black/5 bg-white/80 backdrop-blur-3xl z-50 flex items-center justify-between px-10">
         <Link href="/blog" className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-black/40 hover:text-black transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Archive
         </Link>
         <h3 className="text-xl font-display font-black tracking-tighter italic">Solitic.</h3>
         <div className="flex gap-6">
            <Share2 className="w-4 h-4 text-black/20 hover:text-black transition-colors cursor-pointer" />
         </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 pt-52 pb-40">
        <header className="space-y-12 mb-32">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="text-[10px] font-black uppercase tracking-[0.5em] text-black/20 border-b border-black/10 pb-4 w-full">
               {post.category} / {format(new Date(post.createdAt), "yyyy")}
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter leading-tight italic">
              {post.title}
            </h1>
            <p className="text-lg text-black/40 font-serif italic max-w-xl mx-auto leading-relaxed"
               dangerouslySetInnerHTML={{ __html: renderContent(post.excerpt) }} />
          </div>

          <div className="flex items-center justify-between border-y border-black/5 py-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-display font-black uppercase text-xs">S</div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-black/20">The Voice of</span>
                <span className="text-xs font-bold">{post.author || "Solitic Strategy"}</span>
              </div>
            </div>
            <div className="text-[10px] font-black uppercase tracking-widest text-black/20 italic">
               Briefing No. {post.id.slice(0, 4)}
            </div>
          </div>
        </header>

        <div className="prose prose-lg prose-black max-w-none minimal-content">
          <div dangerouslySetInnerHTML={{ __html: renderContent(post.content as unknown as JSONContent) }} />
        </div>

        <footer className="mt-40 pt-20 border-t border-black/5 space-y-32">
          <div className="flex flex-wrap gap-3">
             {tags.map(tag => (
               <span key={tag} className="text-[10px] font-black uppercase tracking-widest px-4 py-2 border border-black/5 hover:bg-black hover:text-white transition-all cursor-pointer">
                 {tag.trim()}
               </span>
             ))}
          </div>

          <div className="space-y-16">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-black">Curated Recommendations</h4>
            <div className="grid grid-cols-1 gap-12">
               {relatedPosts.slice(0, 3).map(rel => (
                 <Link key={rel.id} href={`/blog/${rel.slug}`} className="group space-y-4">
                   <div className="flex items-center gap-4">
                     <span className="h-px w-8 bg-black/10 group-hover:bg-black group-hover:w-16 transition-all" />
                     <span className="text-[9px] font-black text-black/20 uppercase tracking-widest">{rel.category}</span>
                   </div>
                   <h4 className="text-3xl font-display font-black text-black leading-tight">{rel.title}</h4>
                 </Link>
               ))}
            </div>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        .minimal-content p {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          line-height: 2;
          color: rgba(0,0,0,0.7);
          margin-bottom: 2.5rem;
        }
        .minimal-content h2, .minimal-content h3 {
          font-family: var(--font-display);
          font-weight: 900;
          font-style: italic;
          color: black;
          margin-top: 5rem;
          margin-bottom: 2rem;
          letter-spacing: -0.05em;
        }
        .minimal-content h2 { font-size: 3rem; }
        .minimal-content h3 { font-size: 2rem; }
        .minimal-content blockquote {
          border-left: 2px solid black;
          padding: 2rem 0 2rem 4rem;
          font-style: italic;
          font-size: 1.5rem;
          color: black;
          margin: 4rem 0;
        }
        .minimal-content img {
          width: 100%;
          border-radius: 0;
          margin: 6rem 0;
          border: 1px solid rgba(0,0,0,0.05);
        }
      `}</style>
    </article>
  );
}
