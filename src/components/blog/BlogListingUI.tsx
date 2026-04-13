'use client';

import Link from "next/link";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  ChevronDown,
  Search,
  Mail,
  X,
  TrendingUp, 
  Clock, 
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useState, useEffect } from "react";
import { MOCKUP_POSTS } from "@/lib/blog-data";
import { renderPlainText } from "@/lib/tiptap";

const categories = [
  "Corporate Law",
  "Taxation",
  "Startups",
  "Governance",
  "IP Rights",
  "Compliance",
  "M&A",
  "Arbitration"
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function BlogListingUI({ posts: initialPosts }: { posts: any[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [mounted, setMounted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Use Database posts if available, otherwise fall back to Mock Data
  const posts = initialPosts && initialPosts.length > 0 ? initialPosts : MOCKUP_POSTS; 
  
  const featuredPost = posts.find(p => p.featured) || posts[0];
  const secondaryPosts = posts.filter(p => !p.featured).slice(0, 3); // Analysis grid
  const sidebarPosts = posts.filter(p => p.trending).slice(0, 3); // Also in this issue
  const remainingPosts = posts.slice(7);
  
  const editionDate = "Friday, April 18, 2026";
  const editionVol = "Volume 1 • Issue 11";

  return (
    <div className="min-h-screen bg-background text-off-white selection:bg-gold selection:text-charcoal font-sans">
      <Navbar />
      
      <main className="pt-20">
        {/* Editorial Masthead */}
        <header className="border-b border-white/10 pt-16 pb-8">
          <div className="editorial-container px-6">
            <div className="flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.4em] text-gold font-bold mb-8">
              <span>{editionDate}</span>
              <span className="hidden md:block">{editionVol}</span>
              <span className="text-white/40">Global Edition / Digital Archive</span>
            </div>

            <div className="text-center py-8">
              <p className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30 mb-6">Solitic Consulting Presents</p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-block px-8 py-2 border border-gold/30 mb-8"
              >
                <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40 italic">Institutional Dispatch</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-5xl sm:text-7xl md:text-[10rem] lg:text-[13rem] font-black tracking-[-0.04em] text-white leading-[0.9] mb-4"
              >
                SOLITIC <span className="text-gold italic">DIGEST.</span>
              </motion.h1>
              
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-white/30 text-[9px] sm:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.5em] font-medium max-w-2xl mx-auto border-y border-white/5 py-4 mt-8">
                <span>Legal Strategy</span>
                <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gold/50" />
                <span>Corporate Intelligence</span>
                <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gold/50" />
                <span>Global Compliance</span>
              </div>
            </div>
          </div>
        </header>

        {/* Breaking News Ticker */}
        <div className="bg-gold text-charcoal py-2 border-y border-gold/50 overflow-hidden">
          <div className="flex whitespace-nowrap animate-ticker-slow">
            <div className="flex items-center gap-12 px-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-8 sm:gap-12">
                  <div className="flex items-center gap-3 sm:gap-4 group">
                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest bg-charcoal text-white px-2 py-0.5">Alert</span>
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest decoration-charcoal/30">Court upheld Subramani Over Farm assertion</span>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 group">
                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest bg-charcoal text-white px-2 py-0.5">Alert</span>
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest decoration-charcoal/30">SEBI flags inflated early-stage rounds</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category Navigation */}
        <nav className="sticky top-20 z-40 bg-background/90 backdrop-blur-xl border-b border-white/5 no-scrollbar">
          <div className="editorial-container px-6 flex items-center justify-between h-14">
            <div className="flex items-center gap-6 sm:gap-10 overflow-x-auto no-scrollbar scroll-smooth">
              <button 
                onClick={() => setActiveCategory("All")}
                className={`text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] transition-all hover:text-gold shrink-0 ${activeCategory === "All" ? "text-gold" : "text-white/40"}`}
              >
                All Desks
              </button>
              {categories.map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] transition-all hover:text-gold shrink-0 ${activeCategory === cat ? "text-gold" : "text-white/40"}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-4 sm:gap-6 pl-4 sm:pl-6 border-l border-white/5 ml-4 sm:ml-6">
              <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-white/40 hover:text-gold transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className={`overflow-hidden transition-all duration-500 bg-white/[0.02] ${searchOpen ? 'h-24' : 'h-0'}`}>
            <div className="editorial-container px-6 h-full flex items-center">
               <input 
                 type="text" 
                 placeholder="Search the archives..."
                 className="w-full bg-transparent border-none text-xl sm:text-2xl font-display italic text-white placeholder:text-white/10 focus:ring-0"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
               />
               <button onClick={() => setSearchOpen(false)} className="text-white/40 hover:text-white">
                 <X className="w-6 h-6" />
               </button>
            </div>
          </div>
        </nav>

        {/* Lead Newsletter Strip */}
        <section className="bg-gold/5 border-b border-white/5 py-6 sm:py-4">
           <div className="editorial-container px-6 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4">
             <div className="flex items-center gap-4">
               <Mail className="w-4 h-4 text-gold" />
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Subscribe to Strategic Intelligence</span>
             </div>
             <form className="flex w-full sm:w-auto border-b border-gold/30">
               <input 
                 type="email" 
                 placeholder="colleague@firm.com" 
                 className="bg-transparent border-none text-[10px] uppercase tracking-widest text-white placeholder:text-white/20 py-2 focus:ring-0 w-full sm:min-w-[200px]"
               />
               <button className="text-[10px] font-black uppercase tracking-[0.3em] text-gold pl-4 pb-2">Join</button>
             </form>
           </div>
        </section>

        {/* The Great Grid */}
        <section className="py-16 md:py-24">
          <div className="editorial-container px-6">
            {!posts || posts.length === 0 ? (
              <div className="py-32 text-center border border-white/5 bg-white/[0.01]">
                <Clock className="w-12 h-12 text-gold/20 mx-auto mb-6" />
                <h2 className="font-display text-3xl font-bold text-white mb-4">The archives are sealed.</h2>
                <p className="font-body text-white/40 italic">New intelligence is currently being synthesized.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                
                {/* COLUMN 1: THE LEAD (LEFT) */}
                <div className="lg:col-span-5 flex flex-col">
                  {featuredPost && (
                    <motion.article 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="group flex flex-col h-full"
                    >
                      <div className="space-y-6 mb-10">
                        <div className="flex items-center gap-4">
                          <span className="text-[10px] font-black text-gold uppercase tracking-[0.4em] border-b border-gold/50 pb-1">Cover Story · {featuredPost.category}</span>
                          <span className="text-[10px] text-white/30 uppercase tracking-widest">{format(new Date(featuredPost.createdAt), "MMM d, yyyy")}</span>
                        </div>
                        
                        <Link href={`/blog/${featuredPost.slug}`}>
                          <h2 className="font-display text-5xl md:text-7xl font-bold leading-[0.9] tracking-tight group-hover:text-gold transition-colors duration-500 text-white decoration-gold/20 decoration-[0.5px] underline-offset-[12px] hover:underline">
                            {featuredPost.title}
                          </h2>
                        </Link>
                      </div>

                      <Link href={`/blog/${featuredPost.slug}`} className="block overflow-hidden relative mb-10 bg-white/5">
                        {featuredPost.coverImage ? (
                          <img 
                            src={featuredPost.coverImage} 
                            alt={featuredPost.title}
                            className="w-full aspect-[4/3] object-cover filter grayscale hover:grayscale-0 transition-all duration-[2000ms] group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full aspect-[4/3] flex items-center justify-center text-white/10 font-display italic text-2xl">
                            Visual Intelligence Restricted
                          </div>
                        )}
                        <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-1000" />
                      </Link>
                      
                      <div className="space-y-8 flex-1">
                        <div className="drop-cap font-body text-xl md:text-2xl text-white/70 leading-relaxed italic border-l-2 border-gold/20 pl-6 mb-12">
                          <p>{renderPlainText(featuredPost.excerpt)}</p>
                        </div>

                        {/* Highlight Quote Integrated in Lead Column */}
                        <div className="py-8 border-y border-white/5">
                          <blockquote className="font-display text-2xl text-gold italic border-l-2 border-gold/40 pl-8 leading-relaxed">
                            "You can dress up a contract however you want. You cannot dress up its consequences."
                          </blockquote>
                          <p className="text-[10px] uppercase tracking-widest text-white/20 mt-4 pl-8">— {featuredPost.author || "Arjun Duggal"}, Solitic Consulting</p>
                        </div>
                        
                        <div className="pt-8 mt-auto flex items-center justify-between border-t border-white/10">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-display text-gold">A</div>
                            <div className="text-[10px] uppercase tracking-widest">
                              <p className="text-white font-bold">{featuredPost.author || "Arjun Duggal"}</p>
                              <p className="text-white/30">Corporate Desk Analyst</p>
                            </div>
                          </div>
                          <span className="text-[10px] text-white/20 italic">{featuredPost.readingTime} min read</span>
                        </div>
                      </div>
                    </motion.article>
                  )}
                </div>

                {/* COLUMN 2: REGULATORY DESK (CENTER) */}
                <div className="lg:col-span-4 flex flex-col divide-y divide-white/10 lg:border-l lg:border-white/10 lg:pl-10">
                  <div className="pb-8 mb-8">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 mb-10">Recent Analysis</h3>
                    <div className="space-y-12">
                      {secondaryPosts.map((post, idx) => (
                        <motion.article 
                          key={post.id}
                          initial={{ opacity: 0, scale: 0.98 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 }}
                          className="group"
                        >
                          <Link href={`/blog/${post.slug}`} className="block space-y-4 group/card">
                            <span className="text-[9px] font-black text-gold/60 uppercase tracking-[0.3em]">{post.category}</span>
                            <h3 className="font-display text-3xl font-bold leading-tight group-hover/card:text-gold transition-colors text-white relative">
                              {post.title}
                              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-500 group-hover/card:w-full" />
                            </h3>
                            <p className="font-body text-sm text-white/50 line-clamp-3 leading-relaxed italic group-hover/card:text-white/80 transition-colors">
                              {renderPlainText(post.excerpt)}
                            </p>
                            <div className="flex items-center gap-2 text-[9px] text-white/30 uppercase tracking-widest pt-2">
                              <span>{format(new Date(post.createdAt), "MMM d, yyyy")}</span>
                              <span className="w-1 h-1 rounded-full bg-gold/50" />
                              <span>{post.readingTime} min read</span>
                            </div>
                          </Link>
                        </motion.article>
                      ))}
                    </div>
                  </div>
                  
                  {/* Regulatory Desk Strip */}
                  <div className="pt-8 space-y-12">
                     <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 mb-10">Regulatory Desk</h3>
                     <motion.article className="group border-b border-white/5 pb-8 last:border-0">
                        <Link href="/blog/ma-tightened-roc-filing" className="block space-y-3">
                          <h4 className="font-display text-xl font-bold leading-tight group-hover:text-gold transition-colors italic text-white">
                            M&A has tightened ROC filling procedures
                          </h4>
                          <p className="text-xs text-white/30 leading-relaxed italic line-clamp-2">
                             Amended rules now apply from Buy 1st delay. Businesses with pending more lead filings should act immediately.
                          </p>
                          <div className="flex items-center gap-2 text-[9px] text-white/20 uppercase tracking-widest pt-2">
                             <span>Urgent Update</span>
                          </div>
                        </Link>
                      </motion.article>
                  </div>
                </div>

                {/* COLUMN 3: SIDEBAR (RIGHT) */}
                <div className="lg:col-span-3 flex flex-col space-y-12 lg:border-l lg:border-white/10 lg:pl-10">
                  <div>
                    <div className="flex items-center justify-between mb-10">
                      <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30">Also in this Issue</h3>
                      <TrendingUp className="w-3 h-3 text-gold/40" />
                    </div>
                    
                    <div className="space-y-10">
                      {sidebarPosts.map((post, idx) => (
                        <motion.div 
                          key={post.id}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <Link href={`/blog/${post.slug}`} className="group/item block space-y-3 p-4 hover:bg-white/[0.02] border-transparent border transition-all hover:border-white/10">
                            <span className="text-[9px] font-black text-gold/40 uppercase tracking-widest">{post.category}</span>
                            <h4 className="font-display text-base font-bold text-white group-hover/item:text-gold transition-colors leading-snug">
                              {post.title}
                            </h4>
                            <p className="text-[10px] text-white/30 leading-relaxed italic line-clamp-2">{renderPlainText(post.excerpt)}</p>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="p-8 border border-gold/20 bg-gold/5 relative group overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 -mr-16 -mt-16 rounded-full blur-3xl opacity-20" />
                    <div className="relative z-10 space-y-6">
                      <span className="text-[9px] font-black uppercase tracking-[0.4em] text-gold">Briefing Desk</span>
                      <h3 className="font-display text-xl font-bold text-white italic tracking-tight">Need specific intelligence?</h3>
                      <p className="font-body text-xs text-white/40 leading-relaxed">Our regional counsel is standing by to provide tailored legal architecture for your next transaction.</p>
                      <Link href="/contact" className="flex items-center justify-center gap-3 bg-gold text-charcoal py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all shadow-lg shadow-black/40">
                        Request Advisory
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        </section>

        {/* The Bottom Grid Section */}
        <section className="py-24 border-t border-white/10 bg-background/50">
            <div className="editorial-container px-6">
              <div className="flex justify-between items-end mb-16 border-b border-white/5 pb-12">
                <div className="max-w-2xl">
                  <h2 className="font-display text-5xl font-bold text-white mb-4 italic">The Vault.</h2>
                  <p className="font-body text-white/30 italic text-lg leading-relaxed">Historical briefings and deep-dive analyses from the global archive.</p>
                </div>
                <div className="hidden md:block text-[10px] font-black uppercase tracking-[0.4em] text-white/10 border-r border-gold/40 pr-6 mr-6">Archive Protocol</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="space-y-4">
                  <h4 className="text-gold font-black uppercase text-[10px] tracking-widest">M&A Strategy</h4>
                  <p className="text-white font-display text-xl font-bold italic leading-tight hover:text-gold cursor-pointer transition-colors">The Architect&apos;s Approach to Asset Protection</p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-gold font-black uppercase text-[10px] tracking-widest">Taxation</h4>
                  <p className="text-white font-display text-xl font-bold italic leading-tight hover:text-gold cursor-pointer transition-colors">Global Trade: Post-Pandemic Shifts & &apos;Friend-Shoring&apos;</p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-gold font-black uppercase text-[10px] tracking-widest">Compliance</h4>
                  <p className="text-white font-display text-xl font-bold italic leading-tight hover:text-gold cursor-pointer transition-colors">The Digital Transformation of Regulatory Compliance</p>
                </div>
              </div>
            </div>
        </section>

        {/* Editorial Footer CTA */}
        <section className="py-32 md:py-48 bg-charcoal relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,166,70,0.05)_0%,transparent_70%)]" />
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="editorial-container px-6 relative z-10"
          >
            <div className="inline-flex items-center gap-4 px-10 py-2 border border-gold mb-12">
              <span className="text-gold font-display font-black text-xs uppercase tracking-[0.6em]">Seal of Excellence</span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-8 leading-tight tracking-tight">
              Something feels off in your business. <br />
              <span className="text-gold italic">It probably is.</span>
            </h2>
            <p className="font-body text-white/30 text-lg md:text-xl max-w-3xl mx-auto italic mb-16 leading-relaxed">
              Get a confidential tactical review — compliance, structuring, tax, and more. One call. Be certain.
            </p>
            <Link 
              href="/contact"
              className="group inline-flex items-center gap-6 px-16 py-8 bg-gold text-charcoal font-display font-black text-xs uppercase tracking-[0.5em] hover:bg-white transition-all shadow-3xl shadow-gold/20"
            >
              Schedule a Review
              <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform" />
            </Link>
          </motion.div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
