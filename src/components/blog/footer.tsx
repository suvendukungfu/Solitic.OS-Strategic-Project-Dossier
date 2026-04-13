'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background pt-24 pb-16">
      <div className="container max-w-7xl px-4 sm:px-8 grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
        <div className="md:col-span-2 flex flex-col gap-8 max-w-md">
          <Link href="/" className="font-display font-black text-3xl md:text-4xl tracking-tighter hover:text-primary transition-colors">
            Golden <span className="text-primary italic">Dynasty.</span>
          </Link>
          <p className="text-lg text-muted-foreground font-body leading-relaxed">
            A boutique legal and strategic advisory house dedicated to clarity, execution, and corporate excellence.
          </p>
        </div>

        <div className="flex flex-col gap-6 text-sm font-medium tracking-tight">
          <span className="font-display font-bold uppercase tracking-widest text-xs text-primary/80">explore</span>
          <Link href="/blog" className="hover:opacity-60 transition-opacity">stories</Link>
          <Link href="/about" className="hover:opacity-60 transition-opacity">about the house</Link>
          <Link href="/services" className="hover:opacity-60 transition-opacity">our advisory</Link>
        </div>

        <div className="flex flex-col gap-6 text-sm font-medium tracking-tight">
          <span className="font-display font-bold uppercase tracking-widest text-xs text-primary/80">connect</span>
          <a href="#" className="hover:opacity-60 transition-opacity">linkedin</a>
          <a href="#" className="hover:opacity-60 transition-opacity">schedule consulting</a>
          <Link href="/contact" className="hover:opacity-60 transition-opacity">contact direct</Link>
        </div>
      </div>

      <div className="container max-w-7xl px-4 sm:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-muted-foreground uppercase tracking-widest border-t border-border/50 pt-12">
        <span>© 2026 Solitic Consulting Advisory Group</span>
        <div className="flex gap-8">
          <Link href="/privacy" className="hover:text-primary">privacy</Link>
          <Link href="/terms" className="hover:text-primary">terms</Link>
        </div>
      </div>
    </footer>
  );
}
