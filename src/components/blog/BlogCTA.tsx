'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BlogCTA() {
  return (
    <section className="py-24 bg-charcoal relative overflow-hidden text-center border-t border-white/5">
      {/* Decorative Orbs - Matching Institutional Design */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl opacity-50" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <div className="inline-block border border-gold/40 px-5 py-2 text-[10px] font-black uppercase tracking-[0.5em] text-gold mb-10">
            SEAL OF EXCELLENCE
          </div>

          <h2 className="font-display text-4xl md:text-6xl font-black text-off-white mb-6 leading-[1.1]">
            Something feels off in your business.
          </h2>

          <p className="font-display italic text-2xl md:text-3xl text-gold mb-8 opacity-90">
            It probably is.
          </p>

          <p className="font-body text-lg text-off-white/60 max-w-2xl mx-auto mb-12 leading-relaxed">
            Get a confidential tactical review — compliance, structuring, tax, and more. One call. Be certain.
          </p>

          {/* Institutional Action Anchor */}
          <Button variant="gold" size="xl" asChild>
            <Link href="/contact" className="flex items-center gap-3 px-12">
              <span className="font-black tracking-[0.2em] text-[11px] uppercase">Schedule a Review</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
