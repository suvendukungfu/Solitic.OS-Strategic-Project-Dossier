'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { LayoutDashboard, FileText, PenTool, LogOut, Settings, Sparkles, Mail } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { motion } from 'framer-motion';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === 'unauthenticated' && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [status, pathname, router]);

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center font-display italic animate-pulse">authorizing...</div>;
  }

  if (status === 'unauthenticated' && pathname !== '/admin/login') {
    return null;
  }

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground selection:bg-gold selection:text-charcoal font-body">
      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 bottom-0 w-72 bg-charcoal text-off-white border-r border-white/10 flex flex-col z-50">
        <div className="h-24 flex items-center px-8 border-b border-white/5 bg-white/[0.02]">
          <Link href="/" className="group relative">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="font-display font-black text-2xl tracking-tight transition-all duration-300"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/40 group-hover:from-gold group-hover:to-gold/50 transition-all duration-500">
                Solitic<span className="text-gold italic">.OS</span>
              </span>
            </motion.div>
            
            {/* Hover Glow */}
            <div className="absolute -inset-2 bg-gold/0 group-hover:bg-gold/5 blur-xl rounded-full transition-all duration-500 pointer-events-none" />
            
            {/* Shimmer Line */}
            <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent group-hover:w-full transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100" />
          </Link>
        </div>

        <nav className="flex-1 py-10 px-6 flex flex-col gap-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2 px-4">Workspace</span>
          
          <Link 
            href="/admin/dashboard" 
            className={`flex items-center gap-4 px-4 py-3.5 rounded-xl font-medium text-sm transition-all group ${
              pathname === '/admin/dashboard' 
                ? 'bg-gold/10 text-gold shadow-sm' 
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <LayoutDashboard className={`w-4 h-4 transition-transform group-hover:scale-110 ${pathname === '/admin/dashboard' ? 'text-gold' : 'opacity-70'}`} />
            Overview
          </Link>

          <Link 
            href="/admin/posts" 
            className={`flex items-center gap-4 px-4 py-3.5 rounded-xl font-medium text-sm transition-all group ${
              pathname === '/admin/posts' 
                ? 'bg-gold/10 text-gold shadow-sm' 
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <FileText className={`w-4 h-4 transition-transform group-hover:scale-110 ${pathname === '/admin/posts' ? 'text-gold' : 'opacity-70'}`} />
            Story Catalogue
          </Link>

          <Link 
            href="/admin/messages" 
            className={`flex items-center gap-4 px-4 py-3.5 rounded-xl font-medium text-sm transition-all group ${
              pathname === '/admin/messages' 
                ? 'bg-gold/10 text-gold shadow-sm' 
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Mail className={`w-4 h-4 transition-transform group-hover:scale-110 ${pathname === '/admin/messages' ? 'text-gold' : 'opacity-70'}`} />
            Strategic Messages
          </Link>

          <Link 
            href="/admin/posts/new" 
            className={`flex items-center gap-4 px-4 py-3.5 rounded-xl font-medium text-sm transition-all group ${
              pathname === '/admin/posts/new' 
                ? 'bg-gold/10 text-gold shadow-sm' 
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <PenTool className={`w-4 h-4 transition-transform group-hover:scale-110 ${pathname === '/admin/posts/new' ? 'text-gold' : 'opacity-70'}`} />
            Draft Studio
          </Link>
        </nav>

        <div className="p-6 border-t border-white/5 flex flex-col gap-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/50 flex items-center justify-center text-gold font-display font-black text-xs">A</div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white leading-tight">Admin System</span>
              <span className="text-[10px] text-white/40 truncate w-32">{session?.user?.email}</span>
            </div>
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold text-white/50 hover:bg-white/5 hover:text-red-400 transition-colors w-full"
          >
            <LogOut className="w-3.5 h-3.5" />
            Terminate Session
          </button>
        </div>
      </aside>
      
      {/* Main Canvas */}
      <main className="flex-1 ml-72 min-h-screen bg-[#fcfcfc] dark:bg-zinc-950 p-8 md:p-12 lg:p-16">
        <div className="max-w-6xl mx-auto rounded-3xl bg-background border border-border/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] p-8 md:p-12 min-h-[80vh]">
          {children}
        </div>
      </main>
    </div>
  );
}
