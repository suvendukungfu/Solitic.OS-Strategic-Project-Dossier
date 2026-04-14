'use client';

import { motion } from "framer-motion";
import { renderContent } from "@/lib/tiptap";
import Link from "next/link";
import { format } from "date-fns";
import { LayoutProps } from "../types";
import { cn } from "@/lib/utils";

export default function MagazineLayout({ post, relatedPosts, contentOverride }: LayoutProps) {
  const tags = post.tags ? String(post.tags).split(",").filter(Boolean) : [];
  
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
    <article className="bg-[#080808] text-white min-h-screen">
      {/* 1. CINEMATIC HERO */}
      <section className="relative h-[100vh] w-full overflow-hidden flex flex-col justify-end pb-32">
        {post.coverImage && (
          <motion.div 
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 3 }}
            className="absolute inset-0"
          >
            <img 
              src={post.coverImage} 
              className="w-full h-full object-cover opacity-60 grayscale-[0.5] hover:grayscale-0 transition-all duration-3000" 
              alt={String(post.title)} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />
          </motion.div>
        )}
        
        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="space-y-12"
          >
            <div className="flex items-center gap-6">
               <span className="px-6 py-2 bg-gold text-black text-[10px] font-black uppercase tracking-[0.5em]">
                  {post.category}
               </span>
               <span className="text-[10px] font-black uppercase tracking-[0.8em] text-white/40">Exclusive Feature</span>
            </div>
            
            <h1 className="text-7xl md:text-[10rem] lg:text-[13rem] font-display font-black leading-[0.8] tracking-tighter uppercase mb-6 max-w-6xl">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-12 pt-10 border-t border-white/10 w-fit">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-gold uppercase tracking-widest mb-1">Author</span>
                <span className="text-white font-display font-bold italic text-3xl">{post.author || "Solitic Consulting"}</span>
              </div>
              <div className="flex flex-col border-l border-white/10 pl-12">
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Docketed</span>
                <span className="text-white font-display font-bold italic text-3xl">{post.createdAt ? format(new Date(post.createdAt), "MMMM yyyy") : ""}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. NARRATIVE BODY */}
      <div className="max-w-7xl mx-auto px-8 py-40 grid grid-cols-1 lg:grid-cols-12 gap-32">
        <div className="lg:col-span-8 space-y-32">
          {/* Intense Lead */}
          <div 
            className="font-serif text-3xl md:text-5xl italic text-white/50 leading-snug max-w-4xl"
            dangerouslySetInnerHTML={{ __html: renderContent(post.excerpt) || '' }} 
          />

          <div 
            className={cn("magazine-body solitic-content max-w-[800px]", selectedFontClass)}
            style={{ fontFamily: selectedFontFamily }}
          >
             <div className="magazine-content">
               {contentOverride || <div dangerouslySetInnerHTML={{ __html: renderContent(post.content) || '' }} />}
             </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-24 border-t border-white/5">
            {tags.map(t => (
              <span key={t} className="px-8 py-3 bg-white/5 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] text-gold border border-gold/20">
                #{t}
              </span>
            ))}
          </div>
        </div>

        <aside className="lg:col-span-4 sticky top-40 h-fit space-y-24 hidden lg:block">
           <div className="bg-white/[0.03] p-16 rounded-[4rem] border border-white/10 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-gold/10 rounded-full blur-[100px]" />
              <h4 className="text-[11px] font-black uppercase tracking-[0.7em] text-gold mb-16 italic pb-6 border-b border-white/5">Sequence Archive</h4>
              <div className="space-y-16">
                {relatedPosts.slice(0, 3).map((rel) => (
                  <Link key={rel.id} href={`/blog/${rel.slug}`} className="group/item block space-y-6">
                      <p className="text-gold text-[10px] font-black uppercase tracking-widest">{rel.category}</p>
                      <h4 className="text-3xl font-display font-black text-white group-hover/item:text-gold transition-all duration-500 leading-none">
                        {rel.title}
                      </h4>
                      <div className="w-0 h-1 bg-gold transition-all duration-700 group-hover/item:w-full" />
                  </Link>
                ))}
              </div>
           </div>

           <div className="p-16 border border-white/5 bg-gradient-to-b from-white/[0.05] to-transparent rounded-[3.5rem] flex flex-col items-center text-center">
             <div className="w-24 h-24 rounded-3xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold font-display text-4xl font-black italic mb-8">
                {post.author?.[0] || 'S'}
             </div>
             <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mb-2">Verified Analyst</p>
             <p className="text-3xl font-display font-black italic text-white uppercase">{post.author || "Solitic Consulting"}</p>
           </div>
        </aside>
      </div>
    </article>
  );
}
