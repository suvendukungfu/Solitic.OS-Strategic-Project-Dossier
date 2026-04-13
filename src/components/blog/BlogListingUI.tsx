'use client';

import Link from "next/link";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
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
    <div className="min-h-screen bg-black text-white selection:bg-gold selection:text-charcoal font-sans overflow-x-hidden">
      <Navbar />
      
      <main className="pt-32 pb-40">
        {/* 1. HERO (SOLITIC DIGEST) */}
        <section className="mb-24">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="text-gold text-[10px] uppercase font-black tracking-[0.6em]">The Strategic Record</div>
              <h1 className="font-display text-7xl md:text-[8rem] lg:text-[10rem] font-black leading-[0.8] tracking-tighter uppercase mb-6">
                SOLITIC <span className="text-gold italic">DIGEST</span>
              </h1>
              <div className="h-0.5 w-40 bg-gold/30 mx-auto" />
              <div className="flex flex-col items-center gap-4 mt-8">
                <p className="text-white/40 font-serif italic text-xl md:text-2xl">
                  Strategic Insights & Editorial Intelligence
                </p>
                <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.4em] text-white/20">
                   <span>SEC: {activeLayout.toUpperCase()}</span>
                   <span className="w-1 h-1 rounded-full bg-gold" />
                   <span>VOL: 2026.IV</span>
                </div>
              </div>
            </motion.div>

            {/* Category Strip */}
            <div className="mt-16 border-t border-b border-white/5 py-4 overflow-x-auto no-scrollbar">
              <div className="flex justify-center items-center gap-4 min-w-max px-4">
                <button 
                  onClick={() => setActiveLayout("all")}
                  className={cn(
                    "px-6 py-2 text-[10px] font-black uppercase tracking-widest border transition-all duration-300",
                    activeLayout === "all" ? "bg-gold text-black border-gold shadow-[0_0_20px_rgba(194,164,109,0.3)]" : "border-white/10 text-white/40 hover:border-gold hover:text-white"
                  )}
                >
                  All Dockets
                </button>
                {studioLayouts.map((cat) => (
                  <button 
                    key={cat.id}
                    onClick={() => setActiveLayout(cat.id)}
                    className={cn(
                      "px-6 py-2 text-[10px] font-black uppercase tracking-widest border transition-all duration-300",
                      activeLayout === cat.id ? "bg-gold text-black border-gold shadow-[0_0_20px_rgba(194,164,109,0.3)]" : "border-white/10 text-white/40 hover:border-gold hover:text-white"
                    )}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 2. MAIN GRID (70/30) */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* LEFT SIDE (FEATURED) */}
            <div className="lg:col-span-8">
              {featuredPost && (
                <article className="group relative">
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-white/5 border border-white/10 transition-all duration-700 group-hover:border-gold/30">
                    {featuredPost.coverImage && (
                      <img 
                        src={featuredPost.coverImage} 
                        alt={String(featuredPost.title)}
                        className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-[2s] group-hover:scale-105"
                      />
                    )}
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/80 to-transparent" />
                    
                    {/* Overlay Content */}
                    <div className="absolute bottom-10 left-10 right-10 space-y-4">
                      <span className="inline-block px-3 py-1 bg-gold text-black text-[9px] font-black uppercase tracking-widest">
                        {featuredPost.category}
                      </span>
                      <Link href={`/blog/${featuredPost.slug}`}>
                        <h2 className="text-4xl md:text-6xl font-display font-black leading-[1.1] text-white tracking-tight group-hover:text-gold transition-colors">
                          {featuredPost.title}
                        </h2>
                      </Link>
                      <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-white/40">
                        <span>{featuredPost.createdAt ? format(new Date(featuredPost.createdAt), "MMM d, yyyy") : ""}</span>
                        <span className="w-1 h-1 rounded-full bg-gold" />
                        <span>{featuredPost.readingTime || "5"} Min Read</span>
                      </div>
                    </div>
                  </div>

                  {/* Below Image */}
                  <div className="mt-10 px-4">
                    <div className="text-lg text-white/50 leading-relaxed italic max-w-3xl line-clamp-2 mb-8">
                      {renderPlainText(featuredPost.excerpt)}
                    </div>
                    <Link 
                      href={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center gap-2 text-gold text-[10px] font-black uppercase tracking-[0.3em] group/cta"
                    >
                      Read Article
                      <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-2 transition-transform" />
                    </Link>
                  </div>
                </article>
              )}
            </div>

            {/* RIGHT SIDEBAR */}
            <aside className="lg:col-span-4 space-y-16 lg:sticky lg:top-32 lg:h-fit">
              {/* Trending */}
              <div className="space-y-10">
                <div className="flex items-center gap-2 pb-4 border-b border-white/10">
                   <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                   <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30">Trending Insights</h3>
                </div>
                <div className="space-y-8">
                  {trendingPosts.map((post) => (
                    <Link key={post.id} href={`/blog/${post.slug}`} className="group block space-y-3">
                      <p className="text-gold text-[9px] font-black uppercase tracking-[0.2em]">{post.category}</p>
                      <h4 className="text-xl font-bold leading-snug text-white group-hover:text-gold transition-all duration-300 tracking-tight">
                        {post.title}
                      </h4>
                      <div className="flex items-center gap-4 text-[9px] text-white/20 uppercase tracking-widest font-black">
                        <span>{post.createdAt ? format(new Date(post.createdAt), "MMM d") : ""}</span>
                        <span className="w-0.5 h-0.5 rounded-full bg-white/10" />
                        <span>{post.readingTime || "5"} MIN</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Subscribe */}
              <div className="p-12 bg-white/[0.02] border border-white/10 rounded-[2.5rem] space-y-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 -mr-16 -mt-16 rounded-full blur-3xl" />
                <div className="space-y-3 relative z-10">
                  <h3 className="text-2xl font-display font-black tracking-tighter text-white uppercase italic leading-none">Strategic Feed</h3>
                  <p className="text-[10px] text-white/30 leading-relaxed italic uppercase tracking-widest font-black">Institutional Briefings delivered weekly.</p>
                </div>
                <div className="flex flex-col gap-4 relative z-10">
                  <input 
                    type="email" 
                    placeholder="ENTER E-MAIL ADDRESS"
                    className="bg-black border border-white/10 px-8 py-5 text-[10px] font-black uppercase tracking-widest text-white placeholder:text-white/20 focus:border-gold outline-none transition-all rounded-2xl"
                  />
                  <button className="w-full bg-gold text-black py-5 text-[10px] font-black uppercase tracking-[.4em] hover:bg-white transition-all shadow-[0_20px_40px_rgba(194,164,109,0.2)] rounded-2xl active:scale-95">
                    Authorize Access
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* 3. POST CARDS (2-COLUMN GRID) */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-20 border-b border-white/10 pb-10">
            <h2 className="text-[11px] font-black uppercase tracking-[0.8em] text-white/30 italic">Analytical Archive</h2>
            <div className="text-[9px] text-white/20 italic font-black uppercase tracking-widest">SEQ. VOL 1.0 // {gridPosts.length} DOCUMENTS</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-40">
            {gridPosts.map((post) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group flex flex-col"
              >
                <Link href={`/blog/${post.slug}`} className="block relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] bg-white/[0.02] border border-white/5 group-hover:border-gold/30 mb-10 transition-all duration-700">
                  {post.coverImage && (
                    <img 
                      src={post.coverImage} 
                      alt={String(post.title)}
                      className="w-full h-full object-contain p-6 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.5s]"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-gold/5 transition-all" />
                </Link>

                <div className="space-y-6 px-4">
                  <div className="flex items-center gap-4">
                    <span className="text-gold text-[10px] font-black uppercase tracking-[0.3em]">
                      {post.category}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/10" />
                    <span className="text-[9px] text-white/20 font-black uppercase tracking-widest">{post.readingTime || "5"} MIN</span>
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-4xl font-display font-black text-white leading-[1] tracking-tighter group-hover:text-gold transition-all duration-500 relative inline-block">
                      {post.title}
                      <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gold transition-all duration-700 group-hover:w-full" />
                    </h3>
                  </Link>
                  <p className="text-lg text-white/40 leading-relaxed italic line-clamp-2 font-serif">
                    {renderPlainText(post.excerpt)}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
