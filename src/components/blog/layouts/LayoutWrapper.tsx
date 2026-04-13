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
    <div className="min-h-screen selection:bg-[#C2A46D] selection:text-black font-sans overflow-x-hidden pt-20 bg-[#050505]">
      <Navbar />

      {/* Reading Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gold z-[101] origin-left"
        style={{ scaleX }}
      />

      <main>
        {children}
      </main>

      <Footer />
    </div>
  );
}
