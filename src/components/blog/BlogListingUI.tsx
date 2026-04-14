'use client';

import Link from "next/link";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogCTA } from "./BlogCTA";
import { useState, useEffect } from "react";
import { MOCKUP_POSTS } from "@/lib/blog-data";
import { renderPlainText } from "@/lib/tiptap";
import { BlogPost } from "./types";

// Helper for conditional classes
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export function BlogListingUI({ posts: initialPosts }: { posts: BlogPost[] }) {
  const [activeLayout, setActiveLayout] = useState("all");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Data processing
  const posts = initialPosts && initialPosts.length > 0 ? initialPosts : (MOCKUP_POSTS as unknown as BlogPost[]); 
  
  // Filtering by layoutType
  const filteredPosts = activeLayout === "all" 
    ? posts 
    : posts.filter(p => p.layoutType?.toLowerCase() === activeLayout.toLowerCase());

  const featuredPost = filteredPosts[0];
  const gridPosts = filteredPosts.slice(1);
  const trendingPosts = posts.filter(p => p.featured || String(p.tags).includes("trending")).slice(0, 4);
  
  const studioLayouts = [
    { id: "editorial", name: "Editorial" },
    { id: "magazine", name: "Magazine" },
    { id: "report", name: "Report" },
    { id: "minimal", name: "Minimal" },
    { id: "spotlight", name: "Spotlight" },
  ];

  return (
    <div className="min-h-screen bg-background text-white selection:bg-[#C2A46D] selection:text-black font-sans overflow-x-hidden">
      <Navbar />
      
      <main className="pt-24 pb-32">
        {/* 1. HERO (SOLITIC DIGEST) - REFINED MASTHEAD */}
        <section className="mb-14">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="py-2 border-y border-gold/20 flex justify-between items-center text-[8px] font-black uppercase tracking-[0.4em] text-white/40 mb-10 overflow-hidden whitespace-nowrap">
                 <span>Institutional Archive</span>
                 <span className="hidden md:inline">Global Edition • {format(new Date(), "MMMM yyyy")} • Solitic Strategy Unit</span>
                 <span>Ref: 00{filteredPosts.length} Archive Docs</span>
              </div>

              <div className="space-y-2">
                <div className="text-gold text-[9px] uppercase font-black tracking-[0.8em] italic">The Strategic Record</div>
                <h1 className="font-display text-7xl md:text-[8rem] lg:text-[11rem] font-black leading-[0.75] tracking-tighter uppercase mb-2">
                  SOLITIC <span className="text-gold italic">DIGEST</span>
                </h1>
                <p className="text-white/40 font-serif italic text-xl md:text-2xl mt-4">
                  "Strategic Insights & Editorial Intelligence"
                </p>
              </div>

              <div className="pt-6 border-t border-gold/20" />
            </motion.div>

            {/* Category Strip - REFINED */}
            <div className="mt-12 py-4 border-b border-white/5 overflow-x-auto no-scrollbar">
              <div className="flex justify-center items-center gap-8 min-w-max px-4">
                <button 
                  onClick={() => setActiveLayout("all")}
                  className={cn(
                    "relative py-2 text-[9px] font-black uppercase tracking-[0.3em] transition-all duration-300",
                    activeLayout === "all" ? "text-gold" : "text-white/30 hover:text-white"
                  )}
                >
                  All Archive
                  {activeLayout === "all" && <motion.div layoutId="underline" className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gold" />}
                </button>
                {studioLayouts.map((cat) => (
                  <button 
                    key={cat.id}
                    onClick={() => setActiveLayout(cat.id)}
                    className={cn(
                      "relative py-2 text-[9px] font-black uppercase tracking-[0.3em] transition-all duration-300",
                      activeLayout === cat.id ? "text-gold" : "text-white/30 hover:text-white"
                    )}
                  >
                    {cat.name}
                    {activeLayout === cat.id && <motion.div layoutId="underline" className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gold" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 2. EDITORIAL GRID (20 / 55 / 25) */}
        <section className="max-w-[1400px] mx-auto px-6 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 border-t border-white/5 pt-12">
            
            {/* COLUMN 1: META (20%) */}
            <aside className="lg:col-span-2 hidden lg:block space-y-12">
               <div className="space-y-10 group">
                  <div className="flex flex-col gap-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-gold italic">Authorized Context</span>
                    <div className="h-px w-8 bg-white/10" />
                  </div>
                  
                  <div className="space-y-8">
                     <div className="space-y-1">
                        <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.4em]">Authority</p>
                        <p className="text-sm font-black text-white/60 tracking-tight">{featuredPost?.author || "Solitic Consulting"}</p>
                     </div>
                     <div className="space-y-1">
                        <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.4em]">Category</p>
                        <p className="text-sm font-black text-gold tracking-tight">{featuredPost?.category}</p>
                     </div>
                     <div className="space-y-1">
                        <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.4em]">Duration</p>
                        <p className="text-sm font-black text-white/60 tracking-tight">{featuredPost?.readingTime || "5"} Minutes</p>
                     </div>
                  </div>
               </div>

               <div className="pt-24 opacity-10">
                  <div className="p-8 border-2 border-dashed border-white/20 rounded-3xl text-center">
                    <span className="text-[8px] font-black uppercase tracking-[0.6em]">Institutional Record <br/> Confidential</span>
                  </div>
               </div>
            </aside>

            {/* COLUMN 2: MAIN FEATURE (55%) */}
            <div className="lg:col-span-7 space-y-20 border-x border-white/5 px-6 lg:px-12">
              {featuredPost && (
                <article className="group space-y-12">
                  <header className="space-y-8">
                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.8em] text-gold">
                       <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                       Briefing: Cover Story
                    </div>
                    
                    <Link href={`/blog/${featuredPost.slug}`}>
                      <h2 className="text-5xl md:text-7xl font-display font-black leading-[0.9] text-white tracking-tighter group-hover:text-gold transition-all duration-700 uppercase">
                        {featuredPost.title}
                      </h2>
                    </Link>

                    <p className="text-xl md:text-2xl font-serif italic text-white/40 leading-snug">
                       "{renderPlainText(featuredPost.excerpt)}"
                    </p>
                  </header>

                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[2.5rem] bg-white/5 border border-white/10 group-hover:border-gold/30 shadow-4xl group-hover:shadow-gold/10 transition-all duration-1000">
                    {featuredPost.coverImage && (
                      <img 
                        src={featuredPost.coverImage} 
                        alt={String(featuredPost.title)}
                        className="w-full h-full object-contain p-8 grayscale group-hover:grayscale-0 transition-all duration-2000 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <div className="p-12 border-y border-white/5 bg-white/[0.01] relative group-hover:bg-gold/[0.02] transition-colors">
                     <p className="text-2xl md:text-3xl font-display font-black italic text-gold/80 leading-tight tracking-tight">
                        "The primary objective of institutional strategy is not mere survival, but the relentless consolidation of qualitative advantage."
                     </p>
                     <div className="absolute -left-1 top-4 bottom-4 w-1 bg-gold rounded-full" />
                  </div>

                  <Link 
                    href={`/blog/${featuredPost.slug}`}
                    className="flex justify-center items-center gap-4 py-6 border border-white/10 rounded-2xl text-gold text-[10px] font-black uppercase tracking-[0.5em] hover:bg-gold hover:text-black transition-all group-hover:shadow-[0_20px_40px_rgba(194,164,109,0.1)] active:scale-95"
                  >
                    Enter Institutional Archive
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </article>
              )}
            </div>

            {/* COLUMN 3: SIDEBAR (25%) */}
            <aside className="lg:col-span-3 space-y-20 lg:sticky lg:top-40 lg:h-fit">
              <div className="space-y-12">
                <div className="pb-4 border-b border-gold/20">
                   <h3 className="text-[10px] font-black uppercase tracking-[0.6em] text-white italic">Also in this Issue</h3>
                </div>
                <div className="space-y-12">
                  {gridPosts.slice(0, 3).map((post) => (
                    <Link key={post.id} href={`/blog/${post.slug}`} className="group/item block space-y-4">
                      <p className="text-gold text-[9px] font-black uppercase tracking-[0.3em]">{post.category}</p>
                      <h4 className="text-2xl font-display font-black leading-none text-white group-hover/item:text-gold transition-all duration-300">
                        {post.title}
                      </h4>
                      <p className="text-[9px] text-white/30 uppercase tracking-widest font-black italic">Seq: 00{post.id.slice(-2)}</p>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-16 border-t border-white/5 space-y-10">
                <div className="pb-4">
                   <h3 className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20 italic">Trending Record</h3>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-6">
                   {trendingPosts.slice(0, 3).map(tp => (
                     <Link key={tp.id} href={`/blog/${tp.slug}`} className="flex gap-6 group/trend">
                        <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-[10px] font-bold text-gold shrink-0 group-hover/trend:bg-gold group-hover/trend:text-black transition-all">
                           {(trendingPosts.indexOf(tp) + 1).toString().padStart(2, '0')}
                        </div>
                        <h5 className="text-sm font-black leading-snug group-hover/trend:text-white/60 transition-colors">{tp.title}</h5>
                     </Link>
                   ))}
                </div>
              </div>

              {/* Newsletter Minimal Block */}
              <div className="p-10 border border-gold/10 rounded-[3rem] bg-gradient-to-b from-white/[0.03] to-transparent space-y-8">
                 <h4 className="text-xl font-display font-black italic text-white text-center">STRATEGIC DOSSIER</h4>
                 <div className="flex flex-col gap-3">
                   <input 
                      type="email" 
                      placeholder="AUTHORIZE E-MAIL"
                      className="bg-black border border-white/10 px-6 py-4 rounded-xl text-[9px] font-black uppercase tracking-widest text-center w-full focus:border-gold outline-none transition-all"
                   />
                   <button className="w-full bg-gold text-black py-4 rounded-xl text-[9px] font-black uppercase tracking-[0.5em] active:scale-95 transition-transform">
                      Authorize
                   </button>
                 </div>
              </div>
            </aside>
          </div>
        </section>

        {/* 3. ARCHIVE GRID (EQUAL CARDS) */}
        <section className="max-w-[1400px] mx-auto px-6 border-t border-white/10 pt-16">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
            <h2 className="text-[12px] font-black uppercase tracking-[0.8em] text-gold italic">Historical Sequence</h2>
            <div className="w-full md:w-1/2 h-px bg-white/5" />
            <div className="text-[10px] text-white/20 italic font-black uppercase tracking-[0.3em] shrink-0">Seq. Vol IV // Section Archive</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-32">
            {gridPosts.map((post) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="group flex flex-col h-full border border-white/5 p-8 rounded-[3.5rem] bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-500"
              >
                <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/10] w-full overflow-hidden rounded-[2.5rem] bg-black border border-white/5 group-hover:border-gold/20 mb-10 transition-all">
                  {post.coverImage && (
                    <img 
                      src={post.coverImage} 
                      alt={String(post.title)}
                      className="w-full h-full object-contain p-6 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </Link>

                <div className="flex-1 space-y-6 flex flex-col">
                  <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-white/20">
                    <span className="text-gold opacity-100">{post.category}</span>
                    <span className="w-0.5 h-0.5 rounded-full bg-white/10" />
                    <span>{post.readingTime || "5"} MIN Read</span>
                  </div>
                  <Link href={`/blog/${post.slug}`} className="flex-1">
                    <h3 className="text-3xl font-display font-black text-white leading-[1] tracking-tighter group-hover:text-gold transition-all duration-500">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-lg text-white/30 leading-snug italic line-clamp-2 font-serif">
                    {renderPlainText(post.excerpt)}
                  </p>
                  
                  <div className="pt-6 border-t border-white/5 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <span className="text-[8px] font-black uppercase tracking-widest text-white/20">Authorized Access</span>
                     <ArrowRight className="w-4 h-4 text-gold" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
        <BlogCTA />
      </main>
      
      <Footer />
    </div>
  );
}
