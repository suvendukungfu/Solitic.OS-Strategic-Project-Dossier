'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

export function Header() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin') ?? false;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl h-16 flex items-center justify-between px-4 sm:px-8">
        <Link 
          href="/" 
          className="flex items-center gap-2 group"
        >
          <span className="font-display font-bold text-xl md:text-2xl tracking-tight transition-transform group-hover:scale-[1.02]">
            Golden <span className="text-primary underline decoration-primary/30 underline-offset-4">Dynasty</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-foreground/80 lowercase">
          <Link href="/blog" className={clsx(pathname === '/blog' && 'text-primary')}>stories</Link>
          <Link href="/about" className="hover:text-primary">about</Link>
          <Link href="/contact" className="hover:text-primary">contact</Link>
          
          {isAdmin ? (
            <Link 
              href="/admin/dashboard" 
              className="px-4 py-1.5 rounded-full bg-primary text-primary-foreground font-display font-semibold transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-95"
            >
              dashboard
            </Link>
          ) : (
            <Link 
              href="/admin/login" 
              className="hover:text-primary transition-colors italic"
            >
              admin access
            </Link>
          )}
        </nav>

        {/* Mobile Spacer / Logic can go here */}
        <div className="md:hidden">
           <Link href="/menu" className="text-sm">menu</Link>
        </div>
      </div>
    </header>
  );
}
