'use client';

import { motion } from 'framer-motion';
import { Newspaper, PenLine, Eye, Shield, ArrowRight, BarChart3 } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: PenLine,
    title: 'Rich Text Editor',
    desc: 'Write and format articles with our TipTap-powered editor. Headings, images, links, and more.',
  },
  {
    icon: Newspaper,
    title: 'Newspaper Layout',
    desc: 'Every published article appears in a premium newspaper-style layout on the public blog.',
  },
  {
    icon: Eye,
    title: 'Draft & Publish',
    desc: 'Manage drafts separately from published content. Preview before you go live.',
  },
  {
    icon: BarChart3,
    title: 'Article Analytics',
    desc: 'Track published vs draft counts and manage your editorial calendar with ease.',
  },
];

export function AdminPortalSection() {
  return (
    <section className="py-24 bg-charcoal relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/3 rounded-full blur-3xl" />

      {/* Newspaper grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.3) 0px, rgba(255,255,255,0.3) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(255,255,255,0.3) 0px, rgba(255,255,255,0.3) 1px, transparent 1px, transparent 40px)',
      }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-gold/30 bg-gold/10 rounded mb-6">
                <Shield className="w-3.5 h-3.5 text-gold" />
                <span className="font-body text-xs font-bold uppercase tracking-widest text-gold">
                  Editorial Newsroom
                </span>
              </div>

              <h2 className="font-display text-4xl md:text-5xl font-black text-off-white leading-tight mb-6">
                Power Behind
                <span className="block text-gold italic">The Solitic.</span>
              </h2>

              <p className="font-body text-off-white/70 leading-relaxed mb-8 max-w-lg">
                Our admin newsroom lets the Solitic editorial team publish insights, manage content, and control the narrative — all from a secure, intuitive dashboard.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/admin/login"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold text-charcoal font-display font-bold tracking-tight hover:bg-gold/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/20 transition-all"
                >
                  Access Newsroom
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-off-white/20 text-off-white font-display font-bold tracking-tight hover:border-gold hover:text-gold transition-all"
                >
                  View The Blog
                  <Newspaper className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right — Features Grid */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-5 border border-off-white/10 bg-off-white/5 hover:border-gold/30 hover:bg-gold/5 transition-all group"
              >
                <div className="w-9 h-9 border border-gold/30 bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                  <feature.icon className="w-4 h-4 text-gold" />
                </div>
                <h3 className="font-display text-sm font-bold text-off-white mb-2">
                  {feature.title}
                </h3>
                <p className="font-body text-xs text-off-white/50 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stat Strip */}
        <div className="mt-16 pt-10 border-t border-off-white/10 grid grid-cols-3 gap-8 max-w-2xl">
          {[
            { value: '< 2 min', label: 'To publish an article' },
            { value: '100%', label: 'Real-time updates' },
            { value: '∞', label: 'Articles supported' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-2xl md:text-3xl font-black text-gold mb-1">
                {stat.value}
              </div>
              <div className="font-body text-[11px] text-off-white/40 uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
