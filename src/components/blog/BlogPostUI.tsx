'use client';

import Link from "next/link";
import { format } from "date-fns";
import { Calendar, Clock, ArrowLeft, Share2, Tag, Quote } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { renderContent } from "@/lib/tiptap";
import { motion } from "framer-motion";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function BlogPostUI({ post, relatedPosts }: { post: any, relatedPosts: any[] }) {
  const tags = post.tags ? String(post.tags).split(",").filter(Boolean) : [];
  
  // More accurate reading time calculation: ~200 words per minute
  const contentText = JSON.stringify(post.content).replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
  const wordCount = contentText.split(" ").length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));
  
  const publishDate = format(new Date(post.createdAt), "EEEE, MMMM d, yyyy");

  return (
    <div className="min-h-screen bg-background selection:bg-gold selection:text-charcoal relative">
      <Navbar />

      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gold z-50 origin-left"
        style={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false }}
      />

      {/* Article Header */}
      <header className="pt-32 pb-0 border-b-4 border-foreground dark:border-off-white/20">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.5 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors font-body text-xs uppercase tracking-widest mb-10 group"
            >
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
              Journal Index
            </Link>
          </motion.div>

          {tags.length > 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 flex-wrap mb-6"
            >
              {tags.map((tag: string) => (
                <span
                  key={tag}
                  className="font-body text-[10px] font-black uppercase tracking-[0.2em] text-gold border border-gold/30 px-3 py-1"
                >
                  {tag.trim()}
                </span>
              ))}
            </motion.div>
          )}

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-foreground leading-[1.05] mb-8 tracking-tighter"
          >
            {post.title}
          </motion.h1>

          {post.excerpt && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="relative mb-12"
            >
              <Quote className="absolute -left-6 md:-left-12 -top-4 w-12 h-12 md:w-16 md:h-16 text-gold/5 rotate-180" />
              <p className="font-display text-xl md:text-2xl lg:text-3xl text-muted-foreground/80 leading-snug border-l-4 border-gold/40 pl-6 md:pl-10 italic font-medium">
                {post.excerpt}
              </p>
            </motion.div>
          )}

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap items-center gap-6 md:gap-10 py-8 border-t border-foreground/10 font-body text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-charcoal flex items-center justify-center border-2 border-gold/20 shadow-xl">
                <span className="font-display font-black text-gold text-base md:text-lg">S</span>
              </div>
              <div>
                <span className="font-black text-foreground block tracking-[0.2em]">Solitic Editorial</span>
                <span className="opacity-50 text-[8px] md:text-[9px]">Intelligence Core</span>
              </div>
            </div>
            <div className="hidden sm:block h-8 w-px bg-foreground/10" />
            <span className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-gold" />
              {publishDate}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-gold" />
              {readingTime} Minute Scan
            </span>
          </motion.div>
        </div>
      </header>

      <main>
        {post.coverImage && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <div className="container mx-auto px-6 max-w-6xl py-8 md:py-16">
              <figure className="relative group overflow-hidden">
                <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-transparent transition-colors duration-1000 z-10"></div>
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full aspect-[16/9] md:aspect-[21/9] object-cover grayscale group-hover:grayscale-0 transition-all duration-[2000ms] ease-out scale-110 group-hover:scale-100"
                />
                <figcaption className="font-body text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60 mt-6 text-center border-b border-foreground/10 pb-6">
                  Reference: {post.title} · Solitic Archive
                </figcaption>
              </figure>
            </div>
          </motion.div>
        )}

        <section className="py-8 md:py-12">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 md:gap-20 max-w-7xl mx-auto">
              <motion.article 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-3 prose-editorial"
              >
                <div
                  dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
                />

                <div className="mt-12 md:mt-20 pt-10 border-t-4 border-foreground selection:bg-gold">
                  <div className="flex flex-wrap items-center justify-between gap-8">
                    <div className="flex items-center gap-3 flex-wrap">
                      <Tag className="w-4 h-4 text-gold" />
                      {tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="font-body text-[10px] font-black uppercase tracking-[0.2em] text-foreground border border-foreground/20 px-4 py-2 hover:bg-foreground hover:text-background transition-all cursor-pointer"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                    <button className="group inline-flex items-center gap-3 font-display font-black text-[10px] uppercase tracking-widest text-foreground hover:text-gold transition-all">
                      <span className="p-3 border border-foreground/10 rounded-full group-hover:border-gold group-hover:bg-gold/5 transition-all">
                        <Share2 className="w-4 h-4" />
                      </span>
                      Spread the Insight
                    </button>
                  </div>
                </div>
              </motion.article>

              <aside className="lg:block">
                <div className="lg:sticky lg:top-32 space-y-12">
                   <div className="border-t-2 border-gold pt-8">
                    <h3 className="font-display font-black text-xs uppercase tracking-[0.2em] text-gold mb-8">
                      Related Intelligence
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
                      {relatedPosts.map((related, idx) => (
                        <motion.div
                          key={related.id}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <Link
                            href={`/blog/${related.slug}`}
                            className="group block"
                          >
                            <span className="font-body text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 block mb-2">
                              {related.tags ? String(related.tags).split(",")[0] : "Story"}
                            </span>
                            <h4 className="font-display text-base font-bold text-foreground leading-tight group-hover:text-gold transition-colors decoration-gold decoration-2 underline-offset-4 group-hover:underline">
                              {related.title}
                            </h4>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-charcoal p-8 border border-white/5 relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 -mr-12 -mt-12 rounded-full blur-3xl group-hover:bg-gold/20 transition-all duration-700"></div>
                    <h3 className="font-display font-black text-lg text-off-white mb-3 relative z-10">
                      Expert Advisory
                    </h3>
                    <p className="font-body text-xs text-off-white/50 mb-6 leading-relaxed relative z-10">
                      Connect with our seasoned counsel for international business compliance.
                    </p>
                    <Link
                      href="/contact"
                      className="block w-full text-center font-display font-black text-[10px] uppercase tracking-widest bg-gold text-charcoal px-6 py-4 hover:bg-white transition-all relative z-10 shadow-xl shadow-black/40"
                    >
                      Request Consultation
                    </Link>
                  </motion.div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      {relatedPosts.length > 0 && (
        <section className="py-16 md:py-24 border-t-8 border-foreground dark:border-off-white/20">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-black uppercase tracking-tighter text-foreground">
                In Other <span className="italic text-gold underline decoration-2 md:decoration-4 underline-offset-[8px] md:underline-offset-[12px]">News.</span>
              </h2>
              <span className="flex-1 h-px bg-foreground/10 w-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {relatedPosts.map((related, idx) => (
                <motion.div
                  key={related.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link
                    href={`/blog/${related.slug}`}
                    className="group block"
                  >
                    {related.coverImage && (
                      <div className="aspect-[16/10] overflow-hidden mb-6 filter grayscale group-hover:grayscale-0 transition-all duration-700 shadow-xl border border-foreground/5">
                        <img
                          src={related.coverImage}
                          alt={related.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                        />
                      </div>
                    )}
                    <span className="font-body text-[10px] font-black uppercase tracking-[0.2em] text-gold block mb-3">
                      {related.tags ? String(related.tags).split(",")[0] : "Intelligence"}
                    </span>
                    <h3 className="font-display text-xl md:text-2xl font-black text-foreground leading-tight group-hover:text-gold transition-colors decoration-2 underline-offset-4 group-hover:underline mb-3">
                      {related.title}
                    </h3>
                    <div className="flex items-center gap-3 font-body text-[10px] text-muted-foreground uppercase tracking-widest opacity-60">
                      <span>{format(new Date(related.createdAt), "MMM d, yyyy")}</span>
                      <span className="w-1 h-1 rounded-full bg-gold"></span>
                      <span>Archive Insight</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
