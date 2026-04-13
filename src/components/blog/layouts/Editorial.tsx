'use client';

import { format } from "date-fns";
import { motion } from "framer-motion";
import { renderContent } from "@/lib/tiptap";
import { cn } from "@/lib/utils";
import { LayoutProps } from "../types";
import { JSONContent } from "@tiptap/react";
import Link from "next/link";

export default function EditorialLayout({ post, relatedPosts }: LayoutProps) {
  const tags = post.tags ? String(post.tags).split(",").filter(Boolean) : [];
  
  return (
    <article className="bg-[#fcfcfc] text-black min-h-screen font-serif py-20 px-4 md:px-10">
      <div className="max-w-6xl mx-auto border-y-4 border-black py-12 mb-16 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-xs font-black uppercase tracking-[0.4em] mb-12">
          <span>Vol. {post.id.slice(0, 3).toUpperCase()} / No. {post.id.slice(3, 6).toUpperCase()}</span>
          <span className="text-2xl font-display font-black tracking-tighter">THE SOLITIC CHRONICLE</span>
          <span>{format(new Date(post.createdAt), "EEEE, MMMM d, yyyy")}</span>
        </div>

        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-5xl md:text-8xl font-display font-black text-center mb-8 leading-[0.9] tracking-tighter uppercase"
        >
          {post.title}
        </motion.h1>

        <div className="max-w-4xl mx-auto text-center border-t border-black/10 pt-8 mt-8">
           <p className="text-xl md:text-2xl font-serif italic text-black/60 leading-relaxed" 
              dangerouslySetInnerHTML={{ __html: renderContent(post.excerpt) }} 
           />
           <div className="mt-6 flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-widest bg-black text-white px-6 py-2 w-fit mx-auto">
             Reported By {post.author || "The Solitic Core"}
           </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {post.coverImage && (
          <div className="mb-16 border-b border-black pb-16">
            <img
              src={post.coverImage ?? undefined}
              alt={post.title}
              className="w-full h-auto object-contain filter grayscale border-4 border-black shadow-[15px_15px_0px_0px_rgba(0,0,0,0.1)]"
            />
            <p className="mt-4 text-[9px] uppercase tracking-widest text-black/40 text-center italic font-sans font-black">
              FIG. 01: ARCHIVE RECONSTRUCTION / {post.slug.toUpperCase()}
            </p>
          </div>
        )}

        {/* Multi-column Body */}
        <div className="md:columns-2 lg:columns-3 gap-12 text-black leading-relaxed text-justify hyphens-auto prose-editorial-black drop-cap-black">
          <div 
            className="editorial-content"
            dangerouslySetInnerHTML={{ __html: renderContent(post.content as unknown as JSONContent) }} 
          />
        </div>

        <div className="mt-20 pt-10 border-t-2 border-black flex flex-wrap gap-3 font-sans">
          {tags.map((tag: string) => (
            <span key={tag} className="px-3 py-1 bg-black text-white text-[9px] font-black uppercase tracking-widest">
              {tag.trim()}
            </span>
          ))}
        </div>

        {/* Newspaper Footer */}
        <div className="mt-32 grid grid-cols-1 md:columns-3 gap-12 border-t-4 border-black pt-12 opacity-80">
          {relatedPosts.slice(0, 3).map((related) => (
            <div key={related.id} className="space-y-4 font-serif">
              <span className="text-[10px] font-black uppercase tracking-widest text-black/40 border-b border-black/10 pb-2 block underline">Related Brief</span>
              <h3 className="text-xl font-bold leading-tight hover:underline cursor-pointer">{related.title}</h3>
              <p className="text-sm text-black/60 line-clamp-3 leading-relaxed">{renderContent(related.excerpt as unknown as JSONContent).replace(/<[^>]*>/g, '')}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .prose-editorial-black p {
          margin-bottom: 1.5rem;
          font-size: 1.1rem;
        }
        .drop-cap-black p:first-of-type::first-letter {
          float: left;
          font-size: 5rem;
          line-height: 4rem;
          padding-top: 4px;
          padding-right: 8px;
          padding-left: 3px;
          font-family: var(--font-display);
          font-weight: 900;
          color: black;
        }
        .editorial-content h2, .editorial-content h3 {
           column-span: all;
           font-family: var(--font-display);
           font-weight: 900;
           text-transform: uppercase;
           letter-spacing: -0.05em;
           margin-top: 2rem;
           margin-bottom: 1.5rem;
           border-bottom: 2px solid black;
           padding-bottom: 0.5rem;
        }
        .editorial-content h2 { font-size: 2rem; }
        .editorial-content h3 { font-size: 1.5rem; }
        .editorial-content img {
           column-span: all;
           width: 100% !important;
           height: auto !important;
           object-fit: contain !important;
           margin: 2rem 0;
           border: 2px solid black;
        }
      `}</style>
    </article>
  );
}
