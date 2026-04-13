'use client';

import { format } from "date-fns";
import { renderContent } from "@/lib/tiptap";
import { LayoutProps } from "../types";
import { FileText, Shield, Globe, Lock } from "lucide-react";
import Link from "next/link";
import { JSONContent } from "@tiptap/react";

export default function ReportLayout({ post, relatedPosts, contentOverride }: LayoutProps) {
  const tags = post.tags ? String(post.tags).split(",").filter(Boolean) : [];
  
  return (
    <article className="bg-[#f0f2f5] text-[#1a1a1b] min-h-screen py-20 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-1 px-4 lg:px-0 bg-white border border-black/10 shadow-lg">
        
        {/* Left Sidebar - Meta */}
        <div className="lg:col-span-3 border-r border-black/5 p-12 bg-[#fafbfc] space-y-12">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-black/40">Docket Number</span>
            <p className="text-xl font-display font-black tracking-tight uppercase">SOL-{post.id.slice(0, 8).toUpperCase()}</p>
          </div>

          <div className="space-y-6 pt-12 border-t border-black/5">
            <div className="flex items-center gap-3 text-gold">
               <Shield className="w-4 h-4" />
               <span className="text-[10px] font-black uppercase tracking-widest">Classification</span>
            </div>
            <p className="text-sm font-bold uppercase">{post.category}</p>
          </div>

          <div className="space-y-6 pt-12 border-t border-black/5">
            <div className="flex items-center gap-3 text-gold">
               <Globe className="w-4 h-4" />
               <span className="text-[10px] font-black uppercase tracking-widest">Jurisdiction</span>
            </div>
            <p className="text-sm font-bold uppercase italic">Institutional Archive</p>
          </div>

          <div className="pt-20">
             <div className="p-4 border-2 border-dashed border-black/10 text-center">
                <Lock className="w-6 h-6 mx-auto mb-4 text-black/20" />
                <span className="text-[8px] font-black uppercase tracking-widest text-black/40">Verified Institutional Narrative</span>
             </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-9 p-12 lg:p-24">
          <header className="mb-20 space-y-8">
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-gold">
              <FileText className="w-4 h-4" />
              Strategic Intelligence Report
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter uppercase leading-none">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 pt-8 border-t border-black/5 text-[10px] font-black uppercase tracking-widest text-black/40">
               <span>Authority: {post.author || "Counsel"}</span>
               <span>Date: {format(new Date(post.createdAt), "MMMM yyyy")}</span>
            </div>
          </header>

          <div className="report-content">
             {contentOverride || <div dangerouslySetInnerHTML={{ __html: renderContent(post.content as unknown as JSONContent) }} />}
          </div>

          {/* Report Footer */}
          <div className="mt-32 pt-12 border-t-4 border-black space-y-12">
             <h4 className="text-[10px] font-black uppercase tracking-[0.4em]">Strategic References</h4>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {relatedPosts.map(r => (
                 <Link href={`/blog/${r.slug}`} key={r.id} className="flex gap-4 group">
                    <span className="text-gold font-bold">»</span>
                    <div>
                      <h5 className="font-bold underline group-hover:no-underline">{r.title}</h5>
                      <p className="text-xs text-black/40 mt-1 uppercase font-black">{r.category}</p>
                    </div>
                 </Link>
               ))}
             </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .report-content p {
          margin-bottom: 2rem;
          font-size: 1.1rem;
          line-height: 1.7;
          color: #2d3436;
        }
        .report-content h2, .report-content h3 {
          font-family: var(--font-display);
          font-weight: 900;
          text-transform: uppercase;
          margin: 3rem 0 1.5rem;
          padding-left: 1rem;
          border-left: 6px solid #C2A46D;
        }
        .report-content h2 { font-size: 2rem; }
        .report-content h3 { font-size: 1.5rem; }
        .report-content img {
          width: 100% !important;
          height: auto !important;
          object-fit: contain !important;
          border: 1px solid black;
          margin: 3rem 0;
        }
      `}</style>
    </article>
  );
}
