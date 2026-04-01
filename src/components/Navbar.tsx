'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { SoliticLogo } from "./SoliticLogo";
import { cn } from "../lib/utils";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [pathname, isOpen]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
        scrolled || isOpen
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-elegant"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="relative z-[110]">
            <SoliticLogo size="sm" animated={false} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={link.path}
                  className={cn(
                    "font-body text-sm font-medium transition-all duration-300 link-underline relative group",
                    pathname === link.path
                      ? "text-gold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.name}
                  <span className="absolute inset-0 -z-10 bg-gold/0 group-hover:bg-gold/5 rounded-lg transition-colors duration-300" />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3 relative z-[110]">
            <ThemeToggle />
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden lg:block"
            >
              <Button variant="gold" className="relative overflow-hidden group" asChild>
                <Link href="/contact">
                  <span className="relative z-10">Get Started</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  />
                </Link>
              </Button>
            </motion.div>
            
            {/* Tactical Mobile Toggle */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-gold/10 text-gold border border-gold/20 hover:bg-gold/20 transition-all outline-none"
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Tactical Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 lg:hidden bg-background/98 backdrop-blur-3xl z-[105] flex flex-col justify-center px-8 md:px-16"
          >
            {/* Background Texture */}
            <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
            
            <nav className="flex flex-col gap-8 relative z-10">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  <Link
                    href={link.path}
                    className={cn(
                      "font-display text-4xl md:text-5xl font-black transition-all tracking-tighter italic",
                      pathname === link.path
                        ? "text-gold translate-x-4"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="pt-10"
              >
                <Button variant="gold" size="lg" className="w-full text-lg font-black h-16 rounded-[1.25rem] shadow-elegant group" asChild>
                  <Link href="/contact" className="flex items-center justify-center gap-3">
                    Get Started
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            </nav>

            {/* Tactical Footer for Drawer */}
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.7 }}
               className="absolute bottom-12 left-8 md:left-16 flex flex-col gap-2"
            >
               <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/10 italic">Management: Authorized Terminal</span>
               <div className="w-12 h-1 bg-gold shadow-[0_0_15px_rgba(212,175,55,0.4)] rounded-full" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
