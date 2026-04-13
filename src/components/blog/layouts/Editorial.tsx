'use client';

import { format } from "date-fns";
import { motion } from "framer-motion";
import { renderContent } from "@/lib/tiptap";
import { cn } from "@/lib/utils";
import { LayoutProps } from "../types";
import { JSONContent } from "@tiptap/react";
import Link from "next/link";

export default function EditorialLayout({ post, relatedPosts, contentOverride }: LayoutProps) {
  const tags = post.tags ? String(post.tags).split(",").filter(Boolean) : [];
  
  return (
    <article className="bg-[#fcfcfc] text-black min-h-screen font-serif py-12 px-4 md:px-0">
      <div className="max-w-6xl mx-auto border-t-[6px] border-b-2 border-black py-4 mb-12 flex flex-col md:flex-row justify-between items-center px-4">
        <div className="text-[10px] font-black uppercase tracking-widest border-r border-black/20 pr-6 mr-6 hidden md:block">
          Established 2026<br/>Solitic Institutional Archive
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xl md:text-3xl font-display font-black tracking-[-0.05em] uppercase leading-none">THE SOLITIC CHRONICLE</span>
          <div className="w-full h-px bg-black mt-1" />
          <div className="w-full h-px bg-black mt-0.5" />
        </div>
        <div className="text-[10px] font-black uppercase tracking-widest text-right pl-6 ml-6 hidden md:block border-l border-black/20">
          Price: Strategic Intelligence<br/>Vol. {post.id.slice(0, 4).toUpperCase()}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-[10rem] font-display font-black leading-[0.85] tracking-tighter uppercase mb-8"
          >
            {post.title}
          </motion.h1>
          
          <div className="flex flex-wrap items-center justify-center gap-6 py-4 border-y border-black/10 font-sans text-[10px] font-black uppercase tracking-[0.4em]">
             <span>By {post.author || "Principal Counsel"}</span>
             <span className="w-1.5 h-1.5 rounded-full bg-black/20" />
             <span>{format(new Date(post.createdAt), "MMMM yyyy")}</span>
             <span className="w-1.5 h-1.5 rounded-full bg-black/20" />
             <span className="italic">{post.category}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          <div className="lg:col-span-8">
            {post.coverImage && (
              <figure className="mb-12 border-4 border-black p-1 bg-black/5">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full grayscale contrast-125 brightness-90 hover:grayscale-0 transition-all duration-1000 object-contain max-h-[600px] bg-white"
                />
                <figcaption className="p-4 text-[9px] uppercase tracking-widest leading-relaxed font-sans font-black bg-white border-t-2 border-black">
                  [DOCUMENTARY EVIDENCE] / {post.slug.toUpperCase()} / INSTITUTIONAL CLEARANCE GRANTED
                </figcaption>
              </figure>
            )}

            <div className="md:columns-2 gap-12 text-black editorial-prose drop-cap-newspaper">
               <div 
                 className="editorial-body text-justify hyphens-auto"
               >
                 {contentOverride || <div dangerouslySetInnerHTML={{ __html: renderContent(post.content as unknown as JSONContent) }} />}
               </div>
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-12 border-l border-black/10 pl-12 hidden lg:block">
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.5em] border-b-4 border-black pb-2">Abstract Summary</h4>
              <p className="font-serif italic text-lg leading-relaxed text-black/60" 
                 dangerouslySetInnerHTML={{ __html: renderContent(post.excerpt as unknown as JSONContent) }} 
              />
            </div>

            <div className="bg-black text-white p-8 space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50">Strategic Tags</h4>
              <div className="flex flex-wrap gap-2">
                {tags.map(t => (
                  <span key={t} className="text-[9px] font-black uppercase border border-white/20 px-2 py-1">{t}</span>
                ))}
              </div>
            </div>

            <div className="space-y-8">
               <h4 className="text-[10px] font-black uppercase tracking-[0.5em] border-b-4 border-black pb-2">In This Issue</h4>
               {relatedPosts.map(r => (
                 <Link href={`/blog/${r.slug}`} key={r.id} className="block group">
                    <p className="text-[10px] font-black uppercase text-gold mb-2">Docket: {r.category}</p>
                    <h5 className="text-xl font-bold leading-none group-hover:underline mb-2">{r.title}</h5>
                    <div className="w-full h-px bg-black/10" />
                 </Link>
               ))}
            </div>
          </aside>
        </div>
      </div>

      <style jsx global>{`
        .editorial-prose p {
          margin-bottom: 1.5rem;
          font-family: var(--font-serif);
          font-size: 1.15rem;
          line-height: 1.6;
        }
        .drop-cap-newspaper p:first-of-type::first-letter {
          float: left;
          font-size: 5rem;
          line-height: 1;
          padding: 0.1em 0.1em 0 0;
          font-family: var(--font-display);
          font-weight: 900;
        }
        .editorial-body h2, .editorial-body h3 {
          font-family: var(--font-display);
          font-weight: 900;
          text-transform: uppercase;
          margin: 2rem 0 1rem 0;
          border-bottom: 1px solid black;
          padding-bottom: 0.5rem;
        }
        .editorial-body h2 { font-size: 1.8rem; }
        .editorial-body h3 { font-size: 1.4rem; }
        .editorial-body img {
          width: 100% !important;
          height: auto !important;
          object-fit: contain !important;
          border: 1px solid black;
          margin: 2rem 0;
        }
        .editorial-body ul, .editorial-body ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        .editorial-body li { margin-bottom: 0.5rem; }
      `}</style>
    </article>
  );
}
