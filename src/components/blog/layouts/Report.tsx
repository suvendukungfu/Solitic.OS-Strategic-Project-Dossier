'use client';

import { format } from "date-fns";
import { renderContent } from "@/lib/tiptap";
import { LayoutProps } from "../types";
import { FileText, Shield, Globe, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ReportLayout({ post, relatedPosts, contentOverride }: LayoutProps) {
  const tags = post.tags ? String(post.tags).split(",").filter(Boolean) : [];

  // Font System Resolver
  const getFontClass = (font?: string) => {
    switch(font?.toLowerCase()) {
      case 'playfair': return 'font-display';
      case 'poppins': return 'font-poppins';
      case 'merriweather': return 'font-merriweather';
      case 'fira': return 'font-mono-fira';
      default: return 'font-sans';
    }
  };

  const selectedFontClass = getFontClass(post.fonts);
  const selectedFontFamily = post.fonts?.toLowerCase() === 'playfair' ? 'var(--font-display)' :
                            post.fonts?.toLowerCase() === 'poppins' ? 'var(--font-poppins)' :
                            post.fonts?.toLowerCase() === 'merriweather' ? 'var(--font-merriweather)' :
                            post.fonts?.toLowerCase() === 'fira' ? 'var(--font-mono-fira)' :
                            'var(--font-sans)';
  
  return (
    <article className="bg-[#f0f2f5] text-[#1a1a1b] min-h-screen py-32 font-sans selection:bg-gold/40">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 bg-white border border-black/[0.08] shadow-[0_50px_100px_rgba(0,0,0,0.04)] rounded-[4rem] overflow-hidden">
        
        {/* Left Sidebar - Data (Sticky) */}
        <div className="lg:col-span-3 border-r border-black/[0.05] p-16 bg-[#f9fafb] hidden lg:block">
          <div className="sticky top-40 space-y-20">
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-black/20">System ID</span>
              <p className="text-3xl font-display font-black tracking-tighter uppercase leading-none opacity-80">SOL-{post.id.slice(0, 8).toUpperCase()}</p>
            </div>

            <div className="space-y-8 pt-12 border-t border-black/[0.05]">
              <div className="flex items-center gap-4">
                 <Shield className="w-4 h-4 text-gold" />
                 <span className="text-[10px] font-black uppercase tracking-[0.5em]">Classification</span>
              </div>
              <p className="text-sm font-black uppercase tracking-widest bg-black text-white px-6 py-3 rounded-xl inline-block">{post.category}</p>
            </div>

            <div className="space-y-8 pt-12 border-t border-black/[0.05]">
              <div className="flex items-center gap-4">
                 <Globe className="w-4 h-4 text-gold" />
                 <span className="text-[10px] font-black uppercase tracking-[0.5em]">Clearance</span>
              </div>
              <p className="text-xs font-bold italic tracking-wide opacity-40 leading-relaxed px-2">Verified Archive Protocol Level IV. Authorized by Principal Counsel.</p>
            </div>

            <div className="pt-24 opacity-20">
               <div className="p-10 border-2 border-dashed border-black/10 rounded-[2.5rem] text-center">
                  <Lock className="w-8 h-8 mx-auto mb-6" />
                  <span className="text-[8px] font-black uppercase tracking-[0.6em] leading-loose">Institutional <br/> Confidentiality</span>
               </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-9 p-8 md:p-20 lg:p-32">
          <header className="mb-32 space-y-12">
            <div className="flex items-center gap-6">
               <div className="w-24 h-px bg-gold" />
               <div className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.7em] text-gold shrink-0">
                <FileText className="w-4 h-4" />
                Intelligence Brief
               </div>
            </div>
            
            <h1 className="text-6xl md:text-9xl font-display font-black tracking-tighter uppercase leading-[0.8] text-black">
              {post.title}
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-black/[0.05] text-[10px] font-black uppercase tracking-[0.4em] text-black/40 italic">
               <div className="flex flex-col gap-1">
                 <span className="opacity-40">Authority</span>
                 <span className="text-black opacity-100">{post.author || "Counsel"}</span>
               </div>
               <div className="flex flex-col gap-1">
                 <span className="opacity-40">Frequency</span>
                 <span className="text-black opacity-100">STRATEGIC</span>
               </div>
               <div className="flex flex-col gap-1">
                 <span className="opacity-40">Docketed</span>
                 <span className="text-black opacity-100">{post.createdAt ? format(new Date(post.createdAt), "MMM yyyy") : ""}</span>
               </div>
               <div className="flex flex-col gap-1">
                 <span className="opacity-40">Seq ID</span>
                 <span className="text-black opacity-100">00{post.id.slice(-2)}</span>
               </div>
            </div>
          </header>

          {post.coverImage && (
            <figure className="mb-32 rounded-[2.5rem] overflow-hidden border border-black/[0.05] bg-[#fbfbfb] p-6 shadow-4xl group">
              <img 
                src={post.coverImage} 
                alt={String(post.title)} 
                className="w-full h-auto object-contain max-h-[800px] grayscale group-hover:grayscale-0 transition-all duration-[2s]"
              />
            </figure>
          )}

          <div 
            className={cn("report-prose transition-all duration-700", selectedFontClass)}
            style={{ fontFamily: selectedFontFamily }}
          >
             <div className="report-content max-w-[800px]">
                {contentOverride || <div dangerouslySetInnerHTML={{ __html: renderContent(post.content) || '' }} />}
             </div>
          </div>

          <div className="mt-40 pt-20 border-t-8 border-black">
             <div className="flex items-center justify-between mb-16">
               <h4 className="text-[11px] font-black uppercase tracking-[0.6em] text-black italic bg-gold/5 px-6 py-2 rounded-lg">Associated Documents</h4>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               {(relatedPosts || []).slice(0, 4).map(r => (
                 <Link href={`/blog/${r.slug}`} key={r.id} className="group p-10 border border-black/[0.05] rounded-3xl hover:bg-[#fafbfc] transition-all">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center text-[10px] font-black italic">R</div>
                      <span className="text-[10px] text-gold font-black uppercase tracking-widest leading-none">{r.category}</span>
                    </div>
                    <h5 className="text-2xl font-bold leading-tight group-hover:text-gold transition-colors">{r.title}</h5>
                    <div className="flex items-center gap-3 mt-8 text-black/20 group-hover:text-gold transition-all">
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">Access File</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                 </Link>
               ))}
             </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .report-content p {
          margin-bottom: 2.5rem;
          font-size: 1.2rem;
          line-height: 1.9;
          color: rgba(0,0,0,0.8);
          font-weight: 500;
        }
        .report-content h2, .report-content h3 {
          font-family: var(--font-display);
          font-weight: 900;
          text-transform: uppercase;
          margin: 6rem 0 2.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 2px solid rgba(0,0,0,0.05);
          letter-spacing: -0.04em;
          color: black;
          line-height: 1;
        }
        .report-content h2 { font-size: 3.5rem; }
        .report-content h3 { font-size: 2.2rem; }
        .report-content blockquote {
          background: #f9f9f9;
          padding: 5rem;
          border-left: 12px solid #C2A46D;
          border-radius: 0 2.5rem 2.5rem 0;
          margin: 6rem 0;
          font-style: italic;
          font-size: 2rem;
          line-height: 1.4;
          color: #1a1a1b;
          font-weight: 600;
        }
        .report-content img {
          width: 100% !important;
          border-radius: 2rem;
          border: 1px solid rgba(0,0,0,0.05);
          margin: 6rem 0;
          box-shadow: 0 40px 100px rgba(0,0,0,0.05);
        }
        .report-content ul, .report-content ol {
          margin: 4rem 0;
          padding: 4rem 5.5rem;
          background: #fbfbfb;
          border-radius: 2.5rem;
          border: 1px solid rgba(0,0,0,0.04);
        }
        .report-content li { margin-bottom: 1.5rem; color: #4b4b4b; font-weight: 600; }

        .font-poppins { font-family: var(--font-poppins) !important; }
        .font-merriweather { font-family: var(--font-merriweather) !important; }
        .font-mono-fira { font-family: var(--font-mono-fira) !important; }
      `}</style>
    </article>
  );
}
