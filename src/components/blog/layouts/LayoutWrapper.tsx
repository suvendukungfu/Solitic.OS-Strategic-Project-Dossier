'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { 
  ChevronRight,
  Search,
  X
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion, useScroll, useSpring } from "framer-motion";

import { Post } from "@prisma/client";

export function LayoutWrapper({ 
  post, 
  children 
}: { 
  post: Post, 
  children: React.ReactNode 
}) {
  const [mounted, setMounted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
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

  const edition = "DIGEST • GLOBAL COUNSEL EDITION";

  return (
    <div className="min-h-screen bg-background text-off-white selection:bg-gold selection:text-charcoal font-sans overflow-x-hidden">
      <Navbar />

      {/* Reading Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gold z-[101] origin-left"
        style={{ scaleX }}
      />

      <main className="pt-24 pb-32">
        {/* Universal Header - Shared across all layouts */}
        <header className="border-b border-white/10 pb-6 mb-16 px-4">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-[9px] uppercase tracking-[0.4em] font-bold text-white/30">
            <div className="flex items-center gap-4 sm:gap-6 group order-2 md:order-1 mt-4 md:mt-0">
              <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-white/40 hover:text-gold transition-all duration-300 transform hover:scale-110"
              >
                {searchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
              </button>
            </div>
            
            <span className="flex items-center gap-4 order-1 md:order-2">
              <Link href="/blog" className="text-gold hover:text-white transition-colors">Solitic Digest</Link>
              <ChevronRight className="w-2 h-2" />
              <span>{post.category || 'Insight'}</span>
            </span>
            
            <div className="hidden md:flex items-center gap-8 order-3">
               <span>{edition}</span>
               <span className="w-1 h-1 rounded-full bg-white/10" />
               <span>{format(new Date(), "MMM d, yyyy")}</span>
            </div>
          </div>
        </header>

        {children}
      </main>

      <Footer />
    </div>
  );
}
