'use client';

import { format } from "date-fns";
import { renderContent } from "@/lib/tiptap";
import { LayoutProps } from "../types";
import { cn } from "@/lib/utils";

export default function MinimalLayout({ post, contentOverride }: LayoutProps) {
  
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
    <article className="bg-[#050505] text-[#e0e0e0] min-h-screen py-40 selection:bg-gold/20">
      <div className="max-w-[750px] mx-auto px-6">
        <header className="mb-32 space-y-12">
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] opacity-30">
             <span className="text-gold">{post.category}</span>
             <span className="w-1 h-1 rounded-full bg-white/10" />
             <span>{post.createdAt ? format(new Date(post.createdAt), "yyyy") : ""}</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-display font-black leading-[1] tracking-tighter uppercase text-white">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 pt-8 border-t border-white/5 text-[11px] font-black uppercase tracking-widest text-white/40">
             <span>{post.author || "Solitic Consulting"}</span>
             <span>/</span>
             <span>{post.readingTime || "5"} MIN READ</span>
          </div>
        </header>

        {post.coverImage && (
          <figure className="mb-32">
            <img 
              src={post.coverImage} 
              alt={String(post.title)} 
              className="w-full h-auto object-contain max-h-[600px] rounded-xl bg-black border border-white/5"
            />
          </figure>
        )}

        <div 
          className={cn("minimal-prose transition-all duration-700", selectedFontClass)}
          style={{ fontFamily: selectedFontFamily }}
        >
           <div className="minimal-content">
             {contentOverride || <div dangerouslySetInnerHTML={{ __html: renderContent(post.content) || '' }} />}
           </div>
        </div>

        <footer className="mt-40 pt-20 border-t border-white/5 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.6em] opacity-20">
          <span>Solitic Institutional Archive</span>
          <span>End of File</span>
        </footer>
      </div>

      <style jsx global>{`
        .minimal-content {
          font-family: inherit;
          font-size: 1.25rem;
          line-height: 2;
          color: rgba(255,255,255,0.5);
        }
        .minimal-content p {
          margin-bottom: 3.5rem;
        }
        .minimal-content h2, .minimal-content h3 {
          font-family: var(--font-display);
          font-weight: 900;
          text-transform: uppercase;
          margin-top: 6rem;
          margin-bottom: 2.5rem;
          letter-spacing: -0.02em;
          color: white;
          line-height: 1.1;
        }
        .minimal-content h2 { font-size: 3.5rem; }
        .minimal-content h3 { font-size: 2rem; }
        .minimal-content blockquote {
          border-left: 2px solid #C2A46D;
          padding: 2rem 0 2rem 4rem;
          font-style: italic;
          font-size: 2rem;
          line-height: 1.5;
          color: white;
          margin: 6rem 0;
          font-family: var(--font-display);
          font-weight: 900;
        }
        .minimal-content img {
          width: 100% !important;
          border-radius: 0.5rem;
          margin: 6rem 0;
          border: 1px solid rgba(255,255,255,0.05);
        }
        .minimal-content ul, .minimal-content ol {
          margin-bottom: 3.5rem;
          padding-left: 1.5rem;
          border-left: 1px solid rgba(255,255,255,0.1);
        }
        .minimal-content li { margin-bottom: 1.5rem; color: #fff; }

        .font-poppins { font-family: var(--font-poppins) !important; }
        .font-merriweather { font-family: var(--font-merriweather) !important; }
        .font-mono-fira { font-family: var(--font-mono-fira) !important; }
      `}</style>
    </article>
  );
}
