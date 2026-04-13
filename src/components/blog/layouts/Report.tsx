'use client';

import { motion } from "framer-motion";
import { renderContent } from "@/lib/tiptap";
import { FileText, Shield, BarChart3, Database, ChevronRight, ArrowRight, Globe } from "lucide-react";
import Link from "next/link";
import { JSONContent } from "@tiptap/react";
import { format } from "date-fns";
import { LayoutProps } from "../types";

export default function ReportLayout({ post, relatedPosts }: LayoutProps) {
  const tags = post.tags ? String(post.tags).split(",").filter(Boolean) : [];
  
  return (
    <article className="bg-[#0f0f12] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 min-h-screen border-x border-white/5">
        {/* Technical Sidebar */}
        <aside className="lg:col-span-3 border-r border-white/5 p-10 space-y-16 hidden lg:block">
           <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gold/40">Resource ID</span>
              <p className="text-xs font-mono text-white/60">{post.id.toUpperCase()}</p>
           </div>

           <div className="space-y-10">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gold">Index of Objects</h4>
              <div className="space-y-4">
                 {[
                   { icon: FileText, label: "Executive Summary" },
                   { icon: BarChart3, label: "Strategic Analysis" },
                   { icon: Globe, label: "Regional Outlook" },
                   { icon: Shield, label: "Compliance Frame" }
                 ].map((idx, i) => (
                   <div key={i} className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                      <idx.icon className="w-4 h-4 text-white/20 group-hover:text-gold transition-colors" />
                      <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest group-hover:text-white">{idx.label}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="p-8 rounded-2xl bg-gold/5 border border-gold/10 space-y-4">
              <Database className="w-5 h-5 text-gold" />
              <h5 className="text-[10px] font-black uppercase tracking-widest text-gold text-white">Encrypted Archive</h5>
              <p className="text-[9px] text-white/30 leading-relaxed uppercase tracking-widest">This document is classified for institutional use only.</p>
           </div>
        </aside>

        {/* Main Report Body */}
        <div className="lg:col-span-9 bg-[#1A1A1A]/30 p-12 md:p-20">
           <header className="mb-20 pb-20 border-b border-white/5">
              <div className="flex items-center gap-4 text-gold mb-10">
                 <Shield className="w-4 h-4" />
                 <span className="text-[10px] font-black uppercase tracking-[0.5em]">{post.category}</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-display font-black text-white leading-[0.9] tracking-tighter mb-12 uppercase">
                {post.title}
              </h1>
              <div className="flex items-center gap-6">
                 <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
                    Dated: {format(new Date(post.createdAt), "dd MMM yyyy")}
                 </div>
                 <div className="h-px flex-1 bg-white/5" />
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gold italic">Strategic Briefing No. {post.id.slice(-4).toUpperCase()}</span>
              </div>
           </header>

           <div className="prose prose-invert prose-gold max-w-none report-content">
              <div className="font-mono text-xs text-gold/60 mb-10 p-6 bg-gold/5 rounded-xl border border-gold/10 inline-block uppercase tracking-widest">
                [Objective: Institutional Alignment]
              </div>
              <div dangerouslySetInnerHTML={{ __html: renderContent(post.content as unknown as JSONContent) }} />
           </div>

           <div className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-10">
              {relatedPosts.slice(0, 2).map(rel => (
                <Link key={rel.id} href={`/blog/${rel.slug}`} className="group p-8 border border-white/5 bg-white/[0.01] hover:border-gold/30 transition-all rounded-2xl">
                   <p className="text-[9px] font-black text-gold/40 uppercase tracking-widest mb-4">Related Intelligence</p>
                   <h4 className="text-xl font-display font-bold text-white group-hover:text-gold transition-colors">{rel.title}</h4>
                   <div className="mt-8 flex items-center gap-2 text-[9px] font-black text-white/20 uppercase tracking-widest">
                      Read Analysis <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                   </div>
                </Link>
              ))}
           </div>
        </div>
      </div>
      
      <style jsx global>{`
        .report-content h2, .report-content h3 {
          font-family: var(--font-display);
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #C2A46D;
          margin-top: 5rem;
          margin-bottom: 2rem;
          border-left: 1px solid #C2A46D;
          padding-left: 2rem;
        }
        .report-content p {
          font-family: var(--font-mono);
          font-size: 0.9rem;
          line-height: 1.8;
          color: rgba(255,255,255,0.6);
          margin-bottom: 2rem;
        }
        .report-content blockquote {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          padding: 3rem;
          border-radius: 1.5rem;
          margin: 4rem 0;
          color: #C2A46D;
          font-weight: bold;
        }
      `}</style>
    </article>
  );
}
