'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function BlogCTA() {
  return (
    <section className="blog-cta text-center mt-32 mb-20 px-6 py-20 border-t border-white/5 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block border border-[#C2A46D]/40 px-6 py-2 text-[10px] font-black uppercase tracking-[0.5em] text-[#C2A46D] mb-8"
        >
          SEAL OF EXCELLENCE
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-display font-black text-white leading-tight"
        >
          Something feels off <br className="hidden md:block" /> in your business.
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-[#C2A46D] font-display italic text-2xl md:text-3xl"
        >
          It probably is.
        </motion.p>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-white/50 font-body text-lg max-w-xl mx-auto leading-relaxed"
        >
          Get a confidential tactical review — compliance, structuring, tax, and more. One call. Be certain.
        </motion.p>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.4 }}
           className="mt-12"
        >
          <Link href="/contact" className="inline-flex items-center gap-4 px-10 py-5 bg-[#C2A46D] text-black font-body text-[11px] font-black uppercase tracking-[0.3em] hover:bg-[#C2A46D]/90 transition-all group shadow-2xl shadow-gold/20">
            <span>Schedule a Review</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
