'use client';

import { format } from "date-fns";
import { motion } from "framer-motion";
import { renderContent } from "@/lib/tiptap";
import { LayoutProps } from "../types";
import { ArrowRight, Star, Sparkles, User, Info } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function SpotlightLayout({ post, relatedPosts, contentOverride }: LayoutProps) {
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
    <article className="bg-[#050505] text-[#e0e0e0] min-h-screen selection:bg-gold/30">
      {/* 1. ATMOSPHERIC HERO */}
      <section className="relative min-h-[100vh] w-full flex items-center justify-center overflow-hidden py-40">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-radial-gradient from-gold/10 via-transparent to-transparent opacity-40 blur-[150px]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center z-10 space-y-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            <div className="flex items-center justify-center gap-6">
               <span className="w-12 h-px bg-gold/50" />
               <div className="flex items-center gap-3 text-gold text-[11px] font-black uppercase tracking-[0.8em] italic">
                 <Star className="w-3.5 h-3.5 fill-gold animate-pulse" />
                 Solitic Spotlight
               </div>
               <span className="w-12 h-px bg-gold/50" />
            </div>
            
            <h1 className="text-7xl md:text-[10rem] lg:text-[14rem] font-display font-black leading-[0.8] tracking-tighter uppercase text-white">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-12 pt-16 border-t border-white/5 mx-auto w-fit">
               <div className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.4em] text-white/40 italic">
                  <User className="w-4 h-4 text-gold" />
                  {post.author || "Solitic Consulting"}
               </div>
               <div className="w-1.5 h-1.5 rounded-full bg-gold/40" />
               <div className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.4em] text-white/40 italic">
                  <span>{post.createdAt ? format(new Date(post.createdAt), "MMMM yyyy") : ""}</span>
               </div>
               <div className="w-1.5 h-1.5 rounded-full bg-gold/40" />
               <div className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.4em] text-white/40 italic">
                  <Sparkles className="w-4 h-4 text-gold" />
                  {post.category}
               </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gold/30"
        >
          <div className="w-px h-24 bg-gradient-to-b from-gold/50 to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* 2. FEATURED COULMN (800PX) */}
      <div className="max-w-7xl mx-auto px-8 pb-40 flex flex-col items-center">
        
        {/* Cinematic Preview */}
        {post.coverImage && (
          <motion.figure 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-[1200px] mb-40 relative group"
          >
            <div className="absolute -inset-4 bg-gold/5 rounded-[4rem] blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-1000" />
            <div className="relative overflow-hidden rounded-[3rem] border border-white/5 bg-[#0a0a0a] p-4">
               <img 
                 src={post.coverImage} 
                 alt={String(post.title)} 
                 className="w-full h-auto object-contain max-h-[800px] rounded-[2.5rem] transition-all duration-500 group-hover:scale-[1.03] group-hover:brightness-[1.05] group-hover:contrast-[1.05]"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none" />
            </div>
          </motion.figure>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-32 w-full">
          {/* Main Content */}
          <div className="lg:col-span-8 lg:col-start-3 space-y-32">
            
            {/* The Hook */}
            <div 
              className="font-display text-4xl md:text-6xl font-black italic text-gold leading-[1.1] text-center mb-40"
              dangerouslySetInnerHTML={{ __html: renderContent(post.excerpt) || '' }} 
            />

            <div 
              className={cn("spotlight-prose transition-all duration-700", selectedFontClass)}
              style={{ fontFamily: selectedFontFamily }}
            >
               <div className="spotlight-content max-w-[800px] mx-auto">
                 {contentOverride || <div dangerouslySetInnerHTML={{ __html: renderContent(post.content) || '' }} />}
               </div>
            </div>

            {/* Tags Strip */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-32 border-t border-white/5">
                {tags.map(t => (
                  <span key={t} className="text-[10px] font-black uppercase tracking-[0.8em] text-white/20 hover:text-gold transition-colors cursor-default">
                    #{t}
                  </span>
                ))}
            </div>
          </div>

          {/* Sticky Mini Sidebar (Profile) */}
          <aside className="lg:col-span-2 sticky top-40 h-fit space-y-20 hidden lg:block opacity-40 hover:opacity-100 transition-opacity">
             <div className="space-y-6">
                <div className="w-20 h-20 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
                   <User className="w-8 h-8" />
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-gold mb-1">Narrator</p>
                   <p className="text-xl font-display font-black text-white italic leading-none">{post.author || "Solitic Consulting"}</p>
                </div>
             </div>

             <div className="pt-10 space-y-10">
                <h4 className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/20">
                   <Info className="w-4 h-4" /> Related Archive
                </h4>
                <div className="space-y-8">
                  {relatedPosts.slice(0, 3).map(r => (
                    <Link href={`/blog/${r.slug}`} key={r.id} className="block group/rel">
                      <h5 className="text-xs font-black uppercase tracking-widest text-white group-hover/rel:text-gold transition-colors leading-relaxed">{r.title}</h5>
                      <p className="text-[9px] font-black italic text-white/20 mt-2 uppercase">{r.category}</p>
                    </Link>
                  ))}
                </div>
             </div>
          </aside>
        </div>
      </div>

      <style jsx global>{`
        .spotlight-content {
          font-family: inherit;
          font-size: 1.4rem;
          line-height: 1.8;
          color: rgba(255,255,255,0.5);
        }
        .spotlight-content p {
          margin-bottom: 3.5rem;
        }
        .spotlight-content h2, .spotlight-content h3 {
          color: white;
          font-family: var(--font-display);
          font-weight: 900;
          text-transform: uppercase;
          margin-top: 8rem;
          margin-bottom: 3.5rem;
          letter-spacing: -0.06em;
          text-align: center;
          line-height: 0.8;
        }
        .spotlight-content h2 { font-size: 7rem; }
        .spotlight-content h3 { font-size: 4rem; }
        .spotlight-content blockquote {
          font-size: 4rem;
          font-style: italic;
          color: white;
          border: 0;
          text-align: center;
          margin: 10rem 0;
          font-family: var(--font-display);
          line-height: 1;
          letter-spacing: -0.04em;
          background: linear-gradient(to right, #C2A46D, #fff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 900;
        }
        .spotlight-content img {
          width: 100% !important;
          border-radius: 4rem;
          margin: 10rem 0;
          filter: brightness(0.9) contrast(0.9);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(255,255,255,0.05);
          box-shadow: 0 50px 100px rgba(0,0,0,0.8);
        }
        .spotlight-content img:hover {
          filter: brightness(1.05) contrast(1.05);
          transform: scale(1.03);
        }
        .spotlight-content ul, .spotlight-content ol {
          margin: 6rem auto;
          padding: 6rem;
          background: rgba(255,194,109,0.03);
          border-radius: 4rem;
          border: 1px solid rgba(255,194,109,0.05);
          max-width: 600px;
        }
        .spotlight-content li { margin-bottom: 2rem; color: #fff; text-align: center; font-weight: 600; }

        .font-poppins { font-family: var(--font-poppins) !important; }
        .font-merriweather { font-family: var(--font-merriweather) !important; }
        .font-mono-fira { font-family: var(--font-mono-fira) !important; }
      `}</style>
    </article>
  );
}
