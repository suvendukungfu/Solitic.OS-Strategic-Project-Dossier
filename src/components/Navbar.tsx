'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState, type MouseEvent } from "react";

import { cn } from "@/lib/utils";
import { SoliticLogo } from "./SoliticLogo";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

interface NavItemProps {
  active: boolean;
  href: string;
  label: string;
  mobile?: boolean;
  onClick: (event: MouseEvent<HTMLAnchorElement>) => void;
}

function NavItem({ active, href, label, mobile = false, onClick }: NavItemProps) {
  if (mobile) {
    return (
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        onClick={onClick}
        className={cn(
          "group relative flex items-center justify-between rounded-2xl px-5 py-4 text-base font-medium tracking-[-0.01em] transition-all duration-300",
          active
            ? "bg-gold/12 text-gold ring-1 ring-inset ring-gold/25"
            : "text-foreground/80 hover:bg-foreground/[0.04] hover:text-foreground",
        )}
      >
        <span>{label}</span>
        <span
          className={cn(
            "h-px w-10 rounded-full bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100",
            active && "opacity-100",
          )}
        />
      </Link>
    );
  }

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      onClick={onClick}
      className={cn(
        "group relative inline-flex min-w-[5.25rem] items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium tracking-[-0.01em] transition-colors duration-300 lg:min-w-[5.75rem] lg:px-5",
        active ? "text-gold" : "text-foreground/75 hover:text-foreground",
      )}
    >
      {active && (
        <motion.span
          layoutId="desktop-nav-highlight"
          className="absolute inset-0 rounded-full bg-gold/12 ring-1 ring-inset ring-gold/25"
          transition={{ type: "spring", stiffness: 360, damping: 30 }}
        />
      )}
      <span className="relative z-10">{label}</span>
      <span
        className={cn(
          "absolute inset-x-4 bottom-1.5 h-px origin-left rounded-full bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-100",
          active ? "scale-x-100 opacity-100" : "scale-x-0",
        )}
      />
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavClick = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (href === pathname) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    setIsOpen(false);
  };

  const getShellClasses = (isLogo: boolean = false) => cn(
    "border shadow-[0_12px_36px_rgba(3,7,18,0.25)] backdrop-blur-2xl transition-all duration-500 ease-in-out",
    isLogo ? "rounded-2xl px-3 py-2.5" : "rounded-full px-3 py-2",
    scrolled
      ? "border-white/10 bg-black/60 shadow-black/40"
      : "border-white/15 bg-background/60 supports-[backdrop-filter]:bg-background/45",
  );

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-[100] transition-all duration-500",
          scrolled
            ? "border-b border-white/5 bg-background/80 shadow-2xl backdrop-blur-2xl"
            : "bg-transparent py-6",
        )}
      >
        <div className="container mx-auto px-4 sm:px-8">
          <div className="relative flex h-20 items-center justify-center">
            <Link
              href="/"
              onClick={handleNavClick("/")}
              className={cn(
                "absolute left-0 top-1/2 z-20 -translate-y-1/2 flex items-center justify-center group overflow-visible",
                getShellClasses(true),
              )}
              aria-label="Solitic home"
            >
              <SoliticLogo size="md" variant="full" priority={true} />
              <div className="absolute inset-0 rounded-2xl bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>

            <nav
              aria-label="Primary navigation"
              className={cn(
                "hidden md:flex items-center gap-1 rounded-full border px-2 py-1.5 shadow-[0_14px_44px_rgba(3,7,18,0.2)] backdrop-blur-2xl",
                scrolled
                  ? "border-white/10 bg-black/40"
                  : "border-white/15 bg-background/60 supports-[backdrop-filter]:bg-background/45",
              )}
            >
              {navLinks.map((link) => (
                <NavItem
                  key={link.href}
                  active={isActivePath(pathname, link.href)}
                  href={link.href}
                  label={link.label}
                  onClick={handleNavClick(link.href)}
                />
              ))}
            </nav>

            <button
              type="button"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-controls="mobile-navigation"
              aria-expanded={isOpen}
              onClick={() => setIsOpen((open) => !open)}
              className={cn(
                "absolute right-0 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center md:hidden active:scale-95 transition-transform",
                getShellClasses(false),
              )}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isOpen ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                  transition={{ duration: 0.2, ease: "circOut" }}
                  className="flex items-center justify-center"
                >
                  {isOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[95] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label="Close navigation menu"
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, y: -24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-4 right-4 top-[5.5rem] rounded-[32px] border border-white/10 bg-background/95 p-4 shadow-[0_32px_96px_rgba(0,0,0,0.4)] backdrop-blur-3xl"
            >
              <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
                {navLinks.map((link) => (
                  <NavItem
                    key={link.href}
                    mobile
                    active={isActivePath(pathname, link.href)}
                    href={link.href}
                    label={link.label}
                    onClick={handleNavClick(link.href)}
                  />
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
