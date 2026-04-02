'use client';

import Link from "next/link";
import { format } from "date-fns";
import { Calendar, Clock, ArrowRight, TrendingUp } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function BlogListingUI({ posts }: { posts: any[] }) {
  function getTagColor(tag: string) {
    const colors: Record<string, string> = {
      Compliance: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
      Contracts: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
      Startups: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
      Corporate: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
      "IP Rights": "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
    };
    return colors[tag] || "bg-gold/10 text-amber-700 dark:text-gold";
  }

  const featuredPost = posts[0];
  const secondaryPosts = posts.slice(1, 4);
  const gridPosts = posts.slice(4, 10);
  const remainingPosts = posts.slice(10);
  const today = format(new Date(), "EEEE, MMMM d, yyyy");

  return (
    <div className="min-h-screen bg-background selection:bg-gold selection:text-charcoal relative">
      <Navbar />
      <main className="pt-24">
        {/* Newspaper Header Segment */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="border-b-8 border-foreground dark:border-off-white/20 pb-16 pt-12"
        >
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between border-y-2 border-foreground/10 py-4 mb-16 text-[10px] font-display font-black uppercase tracking-[0.3em] text-muted-foreground/60 overflow-hidden">
              <span className="mb-2 md:mb-0 shrink-0">{today}</span>
              <span className="hidden md:block mx-8 opacity-20 tracking-tighter">////////////////////////////////////////////////////////////////</span>
              <span className="shrink-0 text-foreground font-black italic">Solitic Intel Core · Central Intelligence Report</span>
              <span className="hidden md:block mx-8 opacity-20 tracking-tighter">////////////////////////////////////////////////////////////////</span>
              <span className="shrink-0">{posts.length} Volume{posts.length !== 1 ? "s" : ""} Recorded</span>
            </div>
            
            <div className="text-center relative">
              <div className="absolute -top-6 md:-top-12 left-1/2 -translate-x-1/2 opacity-5 pointer-events-none select-none">
                <h2 className="font-display text-[20vw] md:text-[12vw] font-black leading-none whitespace-nowrap">ST. 2024</h2>
              </div>
              <motion.h1 
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-5xl sm:text-7xl md:text-9xl lg:text-[11rem] font-black tracking-[-0.04em] text-foreground leading-[0.85] mb-6"
              >
                THE <span className="text-gold italic underline decoration-2 md:decoration-4 underline-offset-[1rem] md:underline-offset-[1.5rem]">INTEL.</span>
              </motion.h1>
              <div className="flex flex-col items-center justify-center gap-4">
                <p className="font-body text-[10px] md:text-sm text-foreground/40 uppercase tracking-[0.3em] md:tracking-[0.5em] font-black px-4">
                  Legal Architecture & Global Compliance Advisory
                </p>
                <div className="flex items-center gap-4 w-full max-w-[200px] md:max-w-sm">
                  <span className="h-[2px] flex-1 bg-gradient-to-l from-foreground/20 to-transparent" />
                  <span className="w-2 h-2 rounded-full border-2 border-gold" />
                  <span className="h-[2px] flex-1 bg-gradient-to-r from-foreground/20 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Live Intel Ticker */}
        {posts.length > 0 && (
          <div className="bg-foreground text-background py-3 overflow-hidden border-b-2 border-gold/40">
            <div className="flex whitespace-nowrap relative">
              <div className="animate-ticker flex items-center gap-12 pr-12">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex items-center gap-12">
                    {posts.slice(0, 5).map((p, idx) => (
                      <Link 
                        key={`${idx}-${i}`} 
                        href={`/blog/${p.slug}`}
                        className="flex items-center gap-4 group"
                      >
                        <span className="font-display font-black text-[10px] text-gold uppercase tracking-widest border-r border-background/20 pr-4 shrink-0">FL-72-{idx}</span>
                        <span className="font-body text-[11px] font-black uppercase tracking-widest text-background group-hover:text-gold transition-colors">{p.title}</span>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {!posts || posts.length === 0 ? (
          <section className="py-48 text-center bg-muted/5">
            <div className="container mx-auto px-6 max-w-xl">
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-8 border border-gold/20">
                <Calendar className="w-6 h-6 text-gold opacity-40" />
              </div>
              <h3 className="font-display text-4xl font-black text-foreground mb-4">No Intel Recorded.</h3>
              <p className="font-body text-muted-foreground leading-relaxed text-lg italic">
                The strategic archives are currently empty. Check back as our counsel records new intelligence.
              </p>
            </div>
          </section>
        ) : (
          <>
            <section className="py-12 md:py-20">
              <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                  {/* Primary Editorial Column */}
                  <div className="lg:col-span-8 flex flex-col gap-16">
                    {featuredPost && (
                      <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <Link href={`/blog/${featuredPost.slug}`} className="group block">
                          {featuredPost.coverImage && (
                            <div className="w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden mb-8 md:mb-12 relative">
                              <div className="absolute inset-0 bg-gold/5 group-hover:bg-transparent transition-colors duration-1000 z-10"></div>
                              <img
                                src={featuredPost.coverImage}
                                alt={featuredPost.title}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1500ms] ease-out scale-105 group-hover:scale-100"
                              />
                              <div className="absolute top-4 left-4 md:top-8 md:left-8 z-20 bg-foreground text-background px-3 py-1 md:px-4 md:py-2 font-display font-black text-[8px] md:text-[10px] uppercase tracking-[0.3em] shadow-2xl">
                                Lead Intel
                              </div>
                            </div>
                          )}
                          <div className="space-y-4 md:space-y-6 max-w-4xl">
                            <div className="flex items-center gap-4">
                              {featuredPost.tags && (
                                <span className="font-display font-black text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-gold border-l-4 border-gold pl-4 py-1">
                                  {String(featuredPost.tags).split(",")[0].trim()}
                                </span>
                              )}
                              <span className="w-2 h-2 rounded-full bg-foreground/10" />
                              <span className="font-body text-[10px] md:text-[11px] uppercase tracking-widest text-muted-foreground/60">{format(new Date(featuredPost.createdAt), "MMMM d, yyyy")}</span>
                            </div>
                            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground leading-[0.95] tracking-[-0.05em] group-hover:text-gold transition-colors duration-500 underline decoration-foreground group-hover:decoration-gold decoration-4 underline-offset-[0.5rem] md:underline-offset-[1rem]">
                              {featuredPost.title}
                            </h2>
                            {featuredPost.excerpt && (
                              <p className="font-body text-base md:text-xl text-muted-foreground/80 leading-relaxed max-w-3xl line-clamp-3 italic">
                                {featuredPost.excerpt}
                              </p>
                            )}
                            <div className="flex items-center gap-6 pt-6 border-t border-foreground/10">
                              <div className="flex items-center gap-2 group-hover:gap-4 transition-all duration-500">
                                <span className="font-display font-black text-[10px] uppercase tracking-[0.3em] text-foreground">Extract Protocol</span>
                                <ArrowRight className="w-3 h-3 text-gold group-hover:translate-x-2 transition-all" />
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t-4 border-foreground pt-12">
                      {gridPosts.slice(0, 4).map((post, idx) => (
                        <motion.div
                          key={post.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <Link href={`/blog/${post.slug}`} className="group h-full flex flex-col gap-6">
                            {post.coverImage && (
                              <div className="aspect-[16/10] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                                <img src={post.coverImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1500ms]" />
                              </div>
                            )}
                            <div className="space-y-4 flex-1">
                              <span className="font-display font-black text-[10px] uppercase tracking-[0.2em] text-gold">{post.tags ? String(post.tags).split(",")[0] : "INTELLIGENCE"}</span>
                              <h3 className="font-display text-2xl font-black text-foreground leading-tight group-hover:text-gold transition-colors line-clamp-3 mb-2">{post.title}</h3>
                              <p className="font-body text-sm text-muted-foreground/80 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                            </div>
                            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 border-t border-foreground/5 pt-4">
                              <span>{format(new Date(post.createdAt), "MMM d, yyyy")}</span>
                              <span>·</span>
                              <span>VOL-41-{idx}</span>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Strategic Sidebar */}
                  <aside className="lg:col-span-4 space-y-12 md:space-y-16">
                    <div className="border-t-8 border-gold pt-8">
                      <div className="flex items-center gap-4 mb-8">
                        <h3 className="font-display font-black text-xl text-foreground uppercase tracking-tighter">Strategic <span className="text-gold italic">Feed.</span></h3>
                        <div className="flex-1 h-px bg-gold/30" />
                      </div>
                      
                      <div className="flex flex-col divide-y-2 divide-foreground/5">
                        {secondaryPosts.map((post, idx) => (
                          <motion.div 
                            key={post.id}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <Link href={`/blog/${post.slug}`} className="group py-8 first:pt-0 flex gap-6">
                              <div className="font-display font-black text-3xl text-foreground/5 group-hover:text-gold/20 transition-colors duration-500">0{idx + 1}</div>
                              <div className="flex flex-col gap-2">
                                <span className="font-display font-black text-[10px] uppercase tracking-[0.2em] text-gold/60">{post.tags ? String(post.tags).split(",")[0] : "INTEL"}</span>
                                <h4 className="font-display text-lg font-bold text-foreground group-hover:text-gold transition-colors leading-tight decoration-gold decoration-1 group-hover:underline underline-offset-4">{post.title}</h4>
                                <div className="flex items-center gap-3 font-body text-[10px] text-muted-foreground/60 uppercase tracking-widest mt-2">
                                  <span>{format(new Date(post.createdAt), "MMM d")}</span>
                                  <span className="w-1 h-1 rounded-full bg-gold/30" />
                                  <span>Insight Protocol</span>
                                </div>
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-charcoal p-8 md:p-10 border border-white/5 relative group overflow-hidden shadow-2xl">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 -mr-16 -mt-16 rounded-full blur-3xl group-hover:bg-gold/15 transition-all duration-700"></div>
                      <div className="relative z-10">
                        <span className="font-display font-black text-[10px] text-gold uppercase tracking-[0.3em] mb-6 block">Strategic Counsel</span>
                        <h3 className="font-display text-2xl md:text-3xl font-black text-off-white mb-4 leading-none">Intelligence <span className="italic">On-Demand.</span></h3>
                        <p className="font-body text-off-white/50 text-sm mb-10 leading-relaxed">
                          Secure the expertise of our seasoned corporate navigators for your international operations.
                        </p>
                        <Link href="/contact" className="w-full flex items-center justify-center gap-4 bg-gold text-charcoal py-5 font-display font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white transition-all shadow-xl shadow-black/40">
                          Request Briefing
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </aside>
                </div>
              </div>
            </section>

            {remainingPosts.length > 0 && (
              <section className="py-20 md:py-32 bg-muted/30 border-y-2 border-foreground/5">
                <div className="container mx-auto px-6">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-20 border-b-4 border-foreground pb-12">
                    <div className="max-w-2xl">
                      <h2 className="font-display text-5xl md:text-8xl font-black text-foreground tracking-tighter mb-4 leading-none">ARCHIVE <span className="text-gold italic">ACCESS.</span></h2>
                      <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed">Comprehensive strategic history and intelligence protocols from the Solitic Intel Core.</p>
                    </div>
                    <div className="hidden md:flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40 mb-2">
                      <span>Historical Records</span>
                      <span className="w-8 h-[2px] bg-gold" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12 md:gap-y-20">
                    {remainingPosts.map((post, idx) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: (idx % 3) * 0.1 }}
                      >
                        <Link href={`/blog/${post.slug}`} className="group flex border-t-2 border-foreground/10 pt-10 h-full flex-col">
                          <div className="space-y-6 flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-display font-black text-[10px] uppercase tracking-[0.2em] text-gold">{post.tags ? String(post.tags).split(",")[0] : "ARCHIVE"}</span>
                              <span className="font-body text-[10px] uppercase tracking-widest text-muted-foreground/40">VOL-00-{idx + 10}</span>
                            </div>
                            <h3 className="font-display text-2xl md:text-3xl font-black text-foreground group-hover:text-gold transition-colors leading-[1.1] tracking-tight">{post.title}</h3>
                          </div>
                          <div className="pt-10 flex items-center justify-between group-hover:pl-4 transition-all duration-500">
                             <span className="font-body text-[11px] uppercase tracking-widest text-muted-foreground font-bold">{format(new Date(post.createdAt), "MMM d, yyyy")}</span>
                             <div className="p-3 border-2 border-foreground/5 rounded-full group-hover:border-gold group-hover:bg-gold/5 transition-all">
                               <ArrowRight className="w-3 h-3 text-foreground group-hover:text-gold" />
                             </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        )}

        {/* Global CTA */}
        <section className="py-24 md:py-48 bg-charcoal text-off-white overflow-hidden relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="container mx-auto px-6 text-center relative z-10"
          >
            <div className="inline-block px-12 py-2 border-2 border-gold/40 mb-8 md:mb-12">
              <span className="font-display font-black text-xs text-gold uppercase tracking-[0.3em] md:tracking-[0.5em]">Command & Control</span>
            </div>
            <h2 className="font-display text-5xl md:text-9xl font-black mb-8 md:mb-12 tracking-[-0.04em] leading-none">
              SECURE YOUR <span className="text-gold italic underline decoration-1 underline-offset-[1rem] md:underline-offset-[2rem]">LEGACY.</span>
            </h2>
            <p className="font-body text-off-white/40 mb-12 md:with-16 max-w-3xl mx-auto text-lg md:text-2xl leading-relaxed italic px-4">
              Strategic counsel for the world&apos;s most sophisticated corporate structures. Connect with the Solitic Intel Core today.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-6 px-10 py-6 md:px-16 md:py-8 bg-gold text-charcoal font-display font-black text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] hover:bg-white transition-all shadow-2xl shadow-gold/30"
            >
              Consult Counsel
              <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform duration-500" />
            </Link>
          </motion.div>
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none select-none overflow-hidden">
             <div className="font-display font-black text-[50vw] md:text-[30vw] leading-none absolute -bottom-1/4 -right-1/4 rotate-12">SOLITIC</div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
