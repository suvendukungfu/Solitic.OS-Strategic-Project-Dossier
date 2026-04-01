'use client';
import { motion } from "framer-motion";
import { ArrowRight, Building2, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FloatingParticles, GlitterEffect } from "@/components/GlitterEffect";
import heroBg from "@/assets/hero-corporate.jpg";
import soliticLogo from "@/assets/solitic-logo.png";

export function HeroSection() {
  const bgImg = typeof heroBg === "object" && "src" in heroBg ? (heroBg as { src: string }).src : heroBg;
  const logoImg = typeof soliticLogo === "object" && "src" in soliticLogo ? (soliticLogo as { src: string }).src : soliticLogo;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-charcoal">
      {/* Background Image */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      {/* Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/50 to-charcoal/80" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      
      {/* Floating particles */}
      <FloatingParticles count={25} />
      
      {/* Glitter effect */}
      <GlitterEffect count={40} className="opacity-40" />
      
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-blue/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -30, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-8"
          >
            <img 
              src={logoImg as string} 
              alt="Solitic Consulting" 
              className="h-32 md:h-40 w-auto"
            />
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/10 mb-8 backdrop-blur-sm"
          >
            <Building2 className="w-4 h-4 text-gold" />
            <span className="font-body text-sm text-gold">Corporate Excellence Redefined</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-off-white leading-tight mb-6"
          >
            Navigate Corporate
            <span className="block relative">
              <span className="text-glitter">Complexity with Clarity</span>
              {/* Animated underline */}
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1 }}
              />
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-body text-lg md:text-xl text-off-white/70 max-w-2xl mx-auto mb-10"
          >
            End-to-end legal and strategic advisory for businesses, law firms, and CA practices. 
            We bring expertise, execution, and accountability under one roof.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button variant="gold" size="lg" asChild className="relative overflow-hidden group">
                <Link href="/contact" className="flex items-center gap-2">
                  <span className="relative z-10">Schedule a Consultation</span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                  {/* Shimmer */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  />
                </Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button variant="gold-outline" size="lg" asChild className="backdrop-blur-sm">
                <Link href="/about">Learn More</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 max-w-2xl mx-auto px-4"
          >
            {[
              { icon: Users, value: "10+", label: "Clients Served" },
              { icon: Shield, value: "100%", label: "Confidentiality" },
              { icon: Building2, value: "6+", label: "Months Experience" },
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center group"
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gold/10 flex items-center justify-center"
                  whileHover={{ 
                    scale: 1.1, 
                    boxShadow: "0 0 30px hsla(42, 52%, 54%, 0.3)",
                  }}
                >
                  <stat.icon className="w-6 h-6 text-gold" />
                </motion.div>
                <div className="font-display text-2xl md:text-3xl font-bold text-off-white group-hover:text-gold transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="font-body text-sm text-off-white/50">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-gold/50 flex items-start justify-center p-2"
        >
          <motion.div 
            className="w-1 h-2 bg-gold rounded-full"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
