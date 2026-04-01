'use client';

import { motion } from 'framer-motion';
import { Newspaper, PenLine, Eye, Shield, ArrowRight, BarChart3, ShieldCheck, Cpu, Globe, Zap } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: PenLine,
    title: 'Manuscript Studio',
    desc: 'Proprietary TipTap-powered editorial environment with Zen Mode for distraction-free drafting.',
  },
  {
    icon: Globe,
    title: 'Institutional Archive',
    desc: 'Every published manuscript enters the golden-standard registry with high-fidelity newspaper layouts.',
  },
  {
    icon: ShieldCheck,
    title: 'Strategic Control',
    desc: 'Command-level management of drafts and live dispatches with absolute registry integrity.',
  },
  {
    icon: Zap,
    title: 'Pulse Analytics',
    desc: 'Real-time visualization of institutional reach and audience engagement metrics.',
  },
];

export function AdminPortalSection() {
  return (
    <section className="py-32 bg-[#070708] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold/5 blur-[150px] rounded-full pointer-events-none opacity-50" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          {/* Left Content */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-10"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 border border-gold/20 bg-gold/5 rounded-full backdrop-blur-xl">
                <Shield className="w-4 h-4 text-gold animate-pulse" />
                <span className="font-sans text-[10px] font-black uppercase tracking-[0.5em] text-gold">
                  Administrative Command Entry
                </span>
              </div>

              <h2 className="font-display text-6xl md:text-8xl font-black text-white leading-[0.8] tracking-[calc(-0.04em)] transition-all">
                The Power <br />
                Behind <span className="text-gold italic font-serif">The Script.</span>
              </h2>

              <p className="font-serif italic text-white/30 text-2xl leading-relaxed max-w-xl">
                "Directing the flow of institutional narrative and strategic insights for global impact."
              </p>

              <div className="flex flex-col sm:flex-row gap-8 pt-6">
                <Link
                  href="/admin/login"
                  className="group relative flex items-center justify-center"
                >
                  <div className="absolute -inset-4 bg-gold/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <div className="relative flex items-center gap-4 px-10 py-6 bg-gold text-charcoal rounded-2xl font-sans font-black text-xs uppercase tracking-[0.3em] shadow-[0_30px_60px_rgba(212,175,55,0.2)] hover:bg-white hover:text-charcoal transition-all duration-700 hover:-translate-y-2 active:scale-95">
                    Access Newsroom
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                  </div>
                </Link>
                <Link
                  href="/blog"
                  className="flex items-center gap-4 px-10 py-6 border border-white/5 text-white/40 hover:text-white hover:border-white/20 transition-all duration-700 rounded-2xl font-sans font-black text-xs uppercase tracking-[0.3em] backdrop-blur-md"
                >
                  External Archive
                  <Newspaper className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right — Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="p-10 border border-white/5 bg-white/[0.01] hover:border-gold/30 hover:bg-gold/5 transition-all duration-700 group rounded-[2.5rem] backdrop-blur-3xl shadow-2xl relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-gold/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                
                <div className="w-14 h-14 rounded-2xl border border-gold/20 bg-gold/5 flex items-center justify-center mb-8 group-hover:bg-gold group-hover:text-charcoal transition-all duration-700 shadow-inner">
                  <feature.icon className="w-6 h-6 text-gold group-hover:text-charcoal transition-colors" />
                </div>
                <h3 className="font-display text-xl font-black text-white mb-4 italic tracking-tight lowercase">
                  {feature.title}
                </h3>
                <p className="font-serif italic text-sm text-white/20 leading-relaxed group-hover:text-white/40 transition-colors">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tactical Stat Strip */}
        <div className="mt-24 pt-16 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-12 max-w-5xl">
          {[
            { value: '< 2m', label: 'Draft Precision' },
            { value: '100%', label: 'Registry Integrity' },
            { value: '∞', label: 'Sector Archive' },
            { value: '001', label: 'Command Node' },
          ].map((stat) => (
            <div key={stat.label} className="space-y-2">
              <div className="font-display text-4xl md:text-5xl font-black text-gold tracking-tighter leading-none italic">
                {stat.value}
              </div>
              <div className="font-sans text-[10px] font-black text-white/10 uppercase tracking-[0.5em] italic">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
