'use client';
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Building2, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FloatingParticles, GlitterEffect } from "@/components/GlitterEffect";
import heroBg from "@/assets/hero-corporate.jpg";
import soliticLogo from "@/assets/solitic-logo.png";
import { cn } from "@/lib/utils";
import { useRef } from "react";

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  
  // Parallax effects
  const bgY = useTransform(scrollY, [0, 800], [0, 200]);
  const contentY = useTransform(scrollY, [0, 800], [0, -100]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const bgImg = typeof heroBg === "object" && "src" in heroBg ? (heroBg as { src: string }).src : heroBg;
  const logoImg = typeof soliticLogo === "object" && "src" in soliticLogo ? (soliticLogo as { src: string }).src : soliticLogo;

  const titleWords = "Your Business Has Gaps.".split(" ");

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-charcoal"
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 opacity-40 will-change-transform"
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          y: bgY
        }}
      />
      
      {/* Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/50 to-charcoal/80" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      
      <FloatingParticles count={25} />
      <GlitterEffect count={40} className="opacity-40" />
      
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-blue/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Content Container with Parallax */}
      <motion.div 
        style={{ y: contentY }}
        className="relative z-[60] container mx-auto px-6 pt-20"
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Logo - Senior Level entry */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center mb-12 sm:mb-16"
          >
            <div className="relative">
              <img 
                src={logoImg as string} 
                alt="Solitic Consulting" 
                className="h-20 sm:h-28 md:h-32 w-auto filter drop-shadow-[0_0_30px_rgba(201,166,70,0.15)] relative z-10"
              />
              <motion.div 
                className="absolute inset-0 bg-gold/5 blur-3xl rounded-full"
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
 
          {/* Senior Level Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/5 bg-white/5 mb-12 backdrop-blur-xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="font-body text-[10px] sm:text-[11px] text-gold/80 uppercase tracking-[0.4em] font-black">Institutional Integrity Defined</span>
          </motion.div>
 
          {/* Headline - Masterclass Typography */}
          <div className="mb-14 space-y-4">
            <h1 className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] font-black text-off-white leading-[0.85] tracking-tighter uppercase">
              <div className="flex flex-wrap justify-center gap-x-[0.1em] overflow-hidden pb-4">
                {titleWords.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ 
                      duration: 1.2, 
                      delay: 0.4 + (i * 0.08),
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            </h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
              className="relative py-2"
            >
              <span className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-glitter italic font-medium tracking-tight block">
                We Find Them Before They Cost You.
              </span>
              <motion.div
                className="absolute -bottom-2 left-1/3 right-1/3 h-[1px] bg-gold/20"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 2 }}
              />
            </motion.div>
          </div>
 
          {/* Subheadline and Description - Precision Layout */}
          <div className="max-w-3xl mx-auto mb-16 space-y-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.3 }}
              className="font-body text-lg sm:text-xl md:text-2xl text-white/50 leading-relaxed font-light tracking-tight px-4"
            >
              The gap between where you are and where you should be?<br />
              <span className="text-white font-medium italic">It has a name. We fix it.</span>
            </motion.p>
 
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 1.6 }}
              className="flex items-center justify-center gap-6"
            >
              <div className="h-px w-8 bg-gold/20" />
              <p className="font-body text-[10px] sm:text-[11px] text-white/20 uppercase tracking-[0.5em] font-bold">
                End-to-end legal and strategic advisory
              </p>
              <div className="h-px w-8 bg-gold/20" />
            </motion.div>
          </div>
 
          {/* CTA Buttons - High End Interactive */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.8 }}
            className="flex flex-col sm:flex-row gap-8 justify-center items-center px-6 sm:px-0"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Button variant="gold" size="lg" asChild className="relative w-full px-12 py-9 text-xs font-black uppercase tracking-[0.3em] overflow-hidden group shadow-[0_20px_50px_rgba(201,166,70,0.3)]">
                <Link href="/contact" className="flex items-center gap-4 justify-center">
                  <span className="relative z-10">Schedule a Consultation</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-3 transition-transform duration-500" />
                </Link>
              </Button>
            </motion.div>
            
            <Link 
              href="/about" 
              className="text-[10px] uppercase tracking-[0.4em] text-white/30 hover:text-gold transition-colors font-black border-b border-transparent hover:border-gold pb-1"
            >
              Learn More
            </Link>
          </motion.div>

          {/* Enhanced Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="mt-24 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12 max-w-3xl mx-auto px-4"
          >
            {[
              { icon: Users, value: "10+", label: "Institutional Clients" },
              { icon: Shield, value: "100%", label: "Strict Neutrality" },
              { icon: Building2, value: "$100 Million +", label: "Transaction Advised" },
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                className={cn(
                  "text-center group relative p-4 rounded-2xl transition-all duration-500 hover:bg-white/5",
                  index === 2 && "col-span-2 sm:col-span-1"
                )}
                whileHover={{ y: -8 }}
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20 shadow-lg group-hover:bg-gold/20 transition-all">
                  <stat.icon className="w-6 h-6 text-gold" />
                </div>
                <div className="font-display text-2xl sm:text-3xl font-black text-off-white mb-1 tracking-tight">
                  {stat.value}
                </div>
                <div className="font-body text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Fix: Moved Scroll Indicator deeper and hidden on small mobiles to avoid overlap */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-black">Scroll</span>
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[30px] h-[50px] rounded-full border-2 border-white/10 flex items-start justify-center p-2 backdrop-blur-sm"
        >
          <motion.div 
            className="w-1.5 h-3 bg-gold rounded-full shadow-[0_0_10px_rgba(201,166,70,0.5)]"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
