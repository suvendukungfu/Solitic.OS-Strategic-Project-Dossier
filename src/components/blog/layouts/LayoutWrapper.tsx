'use client';

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion, useScroll, useSpring } from "framer-motion";
import { Post } from "@prisma/client";

export function LayoutWrapper({ 
  children 
}: { 
  post: Post, 
  children: React.ReactNode 
}) {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background selection:bg-[#C2A46D] selection:text-black font-sans overflow-x-hidden pt-20">
      <Navbar />

      {/* Reading Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gold z-[101] origin-left"
        style={{ scaleX }}
      />

      <main className="tiptap-root-container">
        {children}
      </main>

      <Footer />

      <style jsx global>{`
        /* ──── INSTITUTIONAL EDITORIAL GLOBAL NORMALIZATION ──── */
        
        /* 1. Base Prosemirror / Content Parity */
        .ProseMirror, .tiptap-content {
          outline: none !important;
        }

        /* 2. Mark Consistency (Bold, Italic, Color) */
        .ProseMirror strong, .tiptap-content strong,
        .magazine-content strong, .editorial-body strong { 
          font-weight: 900 !important; 
          color: inherit !important; 
        }
        
        .ProseMirror em, .tiptap-content em,
        .magazine-content em, .editorial-body em { 
          font-style: italic !important; 
          color: inherit !important; 
        }
        
        /* High-Parity Mark Inheritance: Let user colors shine through bold/italic */
        .tiptap-root-container span[style*="color"] {
          color: inherit; 
        }
        .tiptap-root-container strong, .tiptap-root-container em {
          color: inherit !important;
        }

        /* 3. Global List Synchronization (Hardened) */
        .ProseMirror ul, .tiptap-content ul,
        .editorial-body ul, .magazine-content ul { 
          list-style-type: square !important; 
          list-style-position: inside !important;
          margin-left: 0 !important; 
          margin-bottom: 2rem !important; 
          padding-left: 1.5rem !important;
          display: block !important;
          width: 100% !important;
        }
        
        .ProseMirror ol, .tiptap-content ol,
        .editorial-body ol, .magazine-content ol { 
          list-style-type: decimal !important; 
          list-style-position: inside !important;
          margin-left: 0 !important; 
          margin-bottom: 2rem !important; 
          padding-left: 1.5rem !important;
          display: block !important;
          width: 100% !important;
        }

        .ProseMirror li, .tiptap-content li,
        .magazine-content li, .editorial-body li { 
          display: list-item !important;
          width: 100% !important;
          clear: both !important;
          margin-bottom: 0.75rem !important; 
          line-height: 1.8 !important;
          text-align: left !important;
        }

        /* 4. Font System Constants */
        .font-poppins { font-family: var(--font-poppins), sans-serif !important; }
        .font-merriweather { font-family: var(--font-merriweather), serif !important; }
        .font-mono-fira { font-family: var(--font-mono-fira), monospace !important; }
        
        /* 5. Placeholder & Editor Specifics */
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: rgba(128,128,128,0.3);
          pointer-events: none;
          height: 0;
        }

        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
