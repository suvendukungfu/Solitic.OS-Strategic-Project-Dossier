'use client';

import Link from "next/link";
import { format } from "date-fns";
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  ArrowRight,
  Share2, 
  Tag, 
  Quote, 
  ChevronRight,
  TrendingUp,
  Bookmark
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { renderContent } from "@/lib/tiptap";
import { motion, useScroll, useSpring } from "framer-motion";
import { useState, useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function BlogPostUI({ post, relatedPosts }: { post: any, relatedPosts: any[] }) {
  const [mounted, setMounted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const tags = post.tags ? String(post.tags).split(",").filter(Boolean) : [];
  
  // Reading time
  const contentText = typeof post.content === 'string' 
    ? post.content 
    : JSON.stringify(post.content).replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
  const wordCount = contentText.split(" ").length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));
  
  const publishDate = format(new Date(post.createdAt), "EEEE, MMMM d, yyyy");
  const edition = "DIGEST • GLOBAL COUNSEL EDITION";

  return (
    <div className="min-h-screen bg-background text-off-white selection:bg-gold selection:text-charcoal font-sans">
      <Navbar />

      {/* Reading Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gold z-[101] origin-left"
        style={{ scaleX }}
      />

      <main className="pt-24 pb-32">
        {/* Editorial Masthead Small */}
        <header className="border-b border-white/10 pb-6 mb-16 px-4">
          <div className="editorial-container px-6 flex flex-col md:flex-row justify-between items-center text-[9px] uppercase tracking-[0.4em] font-bold text-white/30">
            <span className="flex items-center gap-4">
              <Link href="/blog" className="text-gold hover:text-white transition-colors">Solitic Digest</Link>
              <ChevronRight className="w-2 h-2" />
              <span>{post.tags ? String(post.tags).split(',')[0] : 'Insight'}</span>
            </span>
            <span className="hidden md:block">{edition}</span>
            <span>{format(new Date(), "MMM d, yyyy")}</span>
          </div>
        </header>

        <article className="editorial-container px-6">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1 border border-gold/30 mb-8"
            >
              <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-black">Strategic Dispatch</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl sm:text-6xl md:text-8xl font-black text-white leading-[0.95] tracking-tight mb-10"
            >
              {post.title}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="font-body text-xl md:text-2xl text-white/40 italic leading-relaxed max-w-3xl mx-auto border-y border-white/5 py-8"
            >
              {post.excerpt}
            </motion.p>
          </div>

          {post.coverImage && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-20"
            >
              <figure className="relative group overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full aspect-[21/9] object-cover filter grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-[2000ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
                <figcaption className="text-[10px] uppercase tracking-[0.4em] text-white/20 mt-6 text-center italic">
                  Solitic Archive Protocol / Reference ID: {post.id.slice(0, 8)}
                </figcaption>
              </figure>
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-start">
            {/* Left Sidebar Info */}
            <aside className="lg:col-span-2 hidden lg:flex flex-col gap-12 sticky top-32">
              <div className="space-y-4 border-t border-white/10 pt-8">
                <p className="text-[9px] uppercase tracking-[0.4em] text-white/20 font-black">Authored By</p>
                <div className="space-y-1">
                  <p className="text-sm font-display font-bold text-white tracking-tight">The Solitic Core</p>
                  <p className="text-[10px] text-gold/60 italic">Strategic Counsel</p>
                </div>
              </div>

              <div className="space-y-4 border-t border-white/10 pt-8">
                <p className="text-[9px] uppercase tracking-[0.4em] text-white/20 font-black">Scan Metrics</p>
                <div className="space-y-2 text-[10px] uppercase tracking-widest text-white/40">
                  <span className="flex items-center gap-2"><Clock className="w-3 h-3 text-gold" /> {readingTime} MIN SCAN</span>
                  <span className="flex items-center gap-2"><Calendar className="w-3 h-3 text-gold" /> {format(new Date(post.createdAt), "MMM d, yyyy")}</span>
                </div>
              </div>

              <button 
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`flex items-center gap-4 text-[9px] uppercase tracking-[0.3em] font-black transition-colors ${isBookmarked ? 'text-gold' : 'text-white/20 hover:text-white/40'}`}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-gold' : ''}`} />
                <span>{isBookmarked ? 'Archived In Vault' : 'Archive Story'}</span>
              </button>
            </aside>

            {/* Main Content Body */}
            <div className="lg:col-span-6 prose-editorial drop-cap">
              <div 
                dangerouslySetInnerHTML={{ __html: renderContent(post.content) }} 
              />

              {/* Author Signature */}
              <div className="mt-24 p-10 border border-white/5 bg-white/[0.01] flex flex-col md:flex-row items-center gap-10">
                <div className="w-24 h-24 rounded-full bg-gold/10 border border-gold/20 shrink-0 flex items-center justify-center">
                   <span className="text-3xl font-display font-black text-gold">S</span>
                </div>
                <div className="space-y-4">
                  <p className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-black">Strategic Contributor</p>
                  <h4 className="text-2xl font-display font-black text-white italic">Solitic Intelligence Core</h4>
                  <p className="text-sm text-white/40 leading-relaxed italic">Our collective of regional counsel and policy architects providing cross-border navigation for global enterprises.</p>
                </div>
              </div>
              
              <div className="mt-12 pt-10 border-t border-white/10 flex flex-wrap gap-4">
                {tags.map((tag: string) => (
                  <span key={tag} className="px-4 py-2 border border-white/5 bg-white/[0.02] text-[10px] uppercase tracking-widest text-white/40 hover:border-gold transition-colors">
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Sidebar - Trending/Takeaways */}
            <aside className="lg:col-span-4 space-y-16 lg:sticky lg:top-32">
              <div className="bg-gold/5 border-l-4 border-gold p-10">
                <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-gold mb-8 italic">Strategic Takeaways</h3>
                <ul className="space-y-6">
                   {[
                     "Regional regulatory shift impacts cross-border structuring.",
                     "Compliance protocols must be updated by Q3 2026.",
                     "Institutional capital pivot suggests long-term resilience."
                   ].map((takeaway, i) => (
                     <li key={i} className="flex gap-4 text-xs italic text-white/60 leading-relaxed">
                       <span className="text-gold font-black">0{i+1}</span>
                       {takeaway}
                     </li>
                   ))}
                </ul>
              </div>

              <div className="bg-white/[0.02] border border-white/5 p-8">
                <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-gold mb-8 flex items-center justify-between">
                  Insights Feed <TrendingUp className="w-3 h-3" />
                </h3>
                <div className="space-y-8">
                  {relatedPosts.slice(0, 4).map((related, idx) => (
                    <Link key={related.id} href={`/blog/${related.slug}`} className="group block space-y-2">
                      <span className="text-[8px] uppercase tracking-widest text-white/20">0{idx + 1}</span>
                      <h4 className="text-sm font-display font-bold text-white group-hover:text-gold transition-colors leading-snug">
                        {related.title}
                      </h4>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="p-8 border border-white/10 bg-charcoal relative group overflow-hidden">
                <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <h4 className="text-[10px] uppercase tracking-[0.4em] text-gold mb-6 font-black">Expert Advisory</h4>
                <p className="text-xs text-white/40 leading-relaxed mb-8 italic">Secure the expertise of our seasoned corporate navigators for your international operations.</p>
                <Link href="/contact" className="flex items-center justify-center gap-3 bg-gold text-charcoal py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all shadow-xl shadow-black/40">
                  Consult Counsel
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </aside>
          </div>
        </article>

        {/* Global Archive Link */}
        <section className="mt-32 pt-32 border-t border-white/10 text-center">
          <div className="editorial-container px-6">
            <h3 className="font-display text-4xl md:text-6xl font-black mb-8 italic text-white/20">Continue the Search.</h3>
            <Link 
              href="/blog"
              className="group inline-flex items-center gap-6 text-[10px] uppercase tracking-[0.5em] font-black text-gold hover:text-white transition-all"
            >
              Return to Journal Index
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-3 transition-transform" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
