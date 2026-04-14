'use client';

import { format } from "date-fns";
import { motion } from "framer-motion";
import { renderContent } from "@/lib/tiptap";
import { cn } from "@/lib/utils";
import { LayoutProps } from "../types";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function EditorialLayout({ post, relatedPosts, contentOverride }: LayoutProps) {
  
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
    <article className="bg-[#fcfcfc] text-black min-h-screen py-20 px-4 md:px-0 selection:bg-gold/30">
      {/* 1. NEWSPAPER MASTHEAD */}
      <div className="max-w-6xl mx-auto border-t-[6px] border-b-2 border-black py-8 mb-24 flex flex-col md:flex-row justify-between items-center px-4">
        <div className="text-[10px] font-black uppercase tracking-[0.5em] border-r border-black/20 pr-10 mr-10 hidden md:block leading-loose">
          ESTABLISHED 2026<br/>
          SOLITIC INSTITUTIONAL<br/>
          STRATEGIC ARCHIVE
        </div>
        <div className="flex flex-col items-center flex-1">
          <span className="text-3xl md:text-7xl font-display font-black tracking-[-0.05em] uppercase leading-none text-center">THE SOLITIC CHRONICLE</span>
          <div className="w-full h-[2px] bg-black mt-4" />
          <div className="w-full h-[1px] bg-black mt-1" />
          <div className="flex justify-between w-full mt-3 text-[9px] font-black uppercase tracking-[0.6em] italic opacity-60 px-2">
             <span>Vol. IV // No. 892</span>
             <span>Institutional Record</span>
             <span>Strategic Intelligence Unit</span>
          </div>
        </div>
        <div className="text-[10px] font-black uppercase tracking-[0.5em] text-right pl-10 ml-10 hidden md:block border-l border-black/20 leading-loose">
          DOCKET: {post.id.slice(0, 8).toUpperCase()}<br/>
          SEC: ALPHA-9<br/>
          PRIORITY: STRATEGIC
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* A. HEADER */}
        <header className="mb-24 text-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-[9rem] font-display font-black leading-[0.8] tracking-tighter uppercase mb-16"
          >
            {post.title}
          </motion.h1>
          
          <div className="flex flex-wrap items-center justify-center gap-10 py-8 border-y border-black/10 font-sans text-[11px] font-black uppercase tracking-[0.4em]">
             <span className="text-gold">By {post.author || "Solitic Consulting"}</span>
             <span className="w-1.5 h-1.5 rounded-full bg-black/10" />
             <span>{post.createdAt ? format(new Date(post.createdAt), "MMMM d, yyyy") : ""}</span>
             <span className="w-1.5 h-1.5 rounded-full bg-black/10" />
             <span className="px-3 py-1 bg-black text-white rounded">{post.category}</span>
             <span className="w-1.5 h-1.5 rounded-full bg-black/10" />
             <span>Duration: {post.readingTime || "5"} MIN</span>
          </div>
        </header>

        {/* B. IMAGE */}
        {post.coverImage && (
          <figure className="mb-32">
            <div className="border-[8px] border-black p-3 bg-white rounded-2xl shadow-3xl overflow-hidden">
              <img
                src={post.coverImage}
                alt={String(post.title)}
                className="w-full grayscale brightness-95 hover:grayscale-0 transition-all duration-2000 object-contain max-h-[800px] bg-[#f8f8f8] rounded-xl"
              />
            </div>
            <figcaption className="mt-8 text-[11px] uppercase tracking-[0.5em] leading-relaxed font-sans font-black text-center opacity-30 italic">
              Fig 1.0 // Documentary evidence authorized by Solitic High Counsel
            </figcaption>
          </figure>
        )}

        {/* C. CONTENT (NEWSPAPER GRID) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          <div className="lg:col-span-8">
            <div 
              className={cn("editorial-prose transition-all duration-700", selectedFontClass)}
              style={{ fontFamily: selectedFontFamily }}
            >
               <div className="max-w-[800px] mx-auto">
                 {contentOverride ? (
                   <div className="editorial-body text-left">
                     {contentOverride}
                   </div>
                 ) : (
                   <div 
                    className="editorial-body text-justify hyphens-auto drop-cap-newspaper"
                    dangerouslySetInnerHTML={{ __html: renderContent(post.content) || "" }} 
                   />
                 )}
               </div>
            </div>
          </div>

          <aside className="lg:col-span-4 sticky top-40 h-fit space-y-20 hidden lg:block">
            <div className="p-12 bg-black text-white rounded-[3rem] space-y-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 -mr-16 -mt-16 rounded-full blur-3xl" />
              <h4 className="text-[11px] font-black uppercase tracking-[0.6em] text-gold border-b border-white/10 pb-6">Executive Summary</h4>
              <div className="font-serif italic text-2xl leading-relaxed text-white/70" 
                 dangerouslySetInnerHTML={{ __html: renderContent(post.excerpt) || "" }} 
              />
            </div>

            <div className="space-y-12">
               <h4 className="text-[11px] font-black uppercase tracking-[0.6em] border-b-2 border-black pb-6">Associated Records</h4>
               <div className="space-y-12">
                 {relatedPosts.slice(0, 3).map(r => (
                   <Link href={`/blog/${r.slug}`} key={r.id} className="block group/item space-y-3">
                      <div className="flex items-center gap-4 text-gold text-[10px] font-black uppercase tracking-widest">
                        <span>{r.category}</span>
                        <ArrowRight className="w-3 h-3 group-hover/item:translate-x-2 transition-transform" />
                      </div>
                      <h5 className="text-3xl font-display font-black leading-none group-hover/item:underline decoration-gold decoration-4 underline-offset-8">
                        {r.title}
                      </h5>
                   </Link>
                 ))}
               </div>
            </div>
          </aside>
        </div>
      </div>

      <style jsx global>{`
        .editorial-body {
          font-family: inherit;
          font-size: 1.2rem;
          line-height: 1.8;
          color: rgba(0,0,0,0.9);
        }
        .editorial-body p {
          margin-bottom: 2.5rem;
        }
        .drop-cap-newspaper p:first-of-type::first-letter {
          float: left;
          font-size: 7.5rem;
          line-height: 0.7;
          padding: 0.1em 0.15em 0 0;
          font-family: var(--font-display);
          font-weight: 900;
          color: black;
        }
        .editorial-body h2, .editorial-body h3 {
          font-family: var(--font-display);
          font-weight: 900;
          text-transform: uppercase;
          margin: 6rem 0 2rem 0;
          border-bottom: 6px solid black;
          padding-bottom: 1rem;
          letter-spacing: -0.04em;
          color: black;
          line-height: 1;
        }
        .editorial-body h2 { font-size: 4rem; }
        .editorial-body h3 { font-size: 2.5rem; }
        .editorial-body blockquote {
          border-top: 2px solid black;
          border-bottom: 2px solid black;
          padding: 4rem 2rem;
          font-style: italic;
          font-size: 2.5rem;
          font-family: var(--font-display);
          font-weight: 900;
          text-align: center;
          margin: 6rem 0;
          text-transform: uppercase;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }
        .editorial-body img {
          width: 100% !important;
          border-radius: 0;
          margin: 6rem 0;
          border: 4px solid black;
          padding: 1rem;
          background: white;
        }
        .editorial-body ul, .editorial-body ol {
          margin-bottom: 3rem;
          padding-left: 2rem;
          list-style-type: square;
          border-left: 1px solid rgba(0,0,0,0.1);
        }
        .editorial-body li, .editorial-body .ProseMirror li { margin-bottom: 2rem; font-weight: 600; display: list-item; }
        .editorial-body strong, .editorial-body .ProseMirror strong { font-weight: 900 !important; color: inherit !important; }
        .editorial-body em, .editorial-body .ProseMirror em { font-style: italic !important; color: inherit !important; }

        .font-poppins { font-family: var(--font-poppins) !important; }
        .font-merriweather { font-family: var(--font-merriweather) !important; }
        .font-mono-fira { font-family: var(--font-mono-fira) !important; }
      `}</style>
    </article>
  );
}
