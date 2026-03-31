'use client';

import { signIn, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, ArrowRight, ShieldCheck, Newspaper } from 'lucide-react';
import Link from 'next/link';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      toast.success('Already signed in. Redirecting...');
      router.push('/admin/dashboard');
    }
  }, [status, router]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        toast.error('Invalid credentials or access denied.');
      } else {
        toast.success('Access granted. Welcome to the Newsroom.');
        router.push('/admin/dashboard');
        router.refresh();
      }
    } catch {
      toast.error('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-charcoal">
        <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal flex">
      {/* Left — Branding Panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-16 bg-charcoal border-r border-off-white/10">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gold rounded flex items-center justify-center">
            <span className="font-display font-black text-charcoal text-sm">S</span>
          </div>
          <span className="font-display font-black text-off-white text-xl tracking-tight">Solitic</span>
        </Link>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-6">
              <Newspaper className="w-5 h-5 text-gold" />
              <span className="font-body text-xs font-bold uppercase tracking-widest text-gold">
                Admin Newsroom
              </span>
            </div>
            <h1 className="font-display text-5xl font-black text-off-white leading-tight">
              The Editorial
            </h1>
            <h1 className="font-display text-5xl font-black text-gold leading-tight italic">
              Command Centre.
            </h1>
          </div>
          <p className="font-body text-off-white/60 leading-relaxed max-w-md">
            Publish legal insights, manage stories, and shape the narrative of corporate excellence — all from one place.
          </p>

          <div className="space-y-3 pt-4">
            {[
              'Draft and publish articles instantly',
              'Real-time newspaper layout preview',
              'Contact form submissions delivered to your inbox',
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border border-gold/40 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-gold" />
                </div>
                <span className="font-body text-sm text-off-white/70">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-off-white/30 font-body text-xs">
          © {new Date().getFullYear()} Solitic Consulting · contact@solitic.in
        </div>
      </div>

      {/* Right — Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-16 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link href="/" className="lg:hidden flex items-center gap-2 mb-10">
            <div className="w-8 h-8 bg-gold rounded flex items-center justify-center">
              <span className="font-display font-black text-charcoal text-sm">S</span>
            </div>
            <span className="font-display font-black text-foreground text-xl tracking-tight">Solitic</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="mb-8">
              <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6 text-gold" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-black text-foreground tracking-tight mb-1">
                Admin Access
              </h2>
              <p className="font-body text-sm text-muted-foreground">
                Sign in to access the editorial newsroom
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="font-body text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  Access Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-4 bg-muted/20 border border-border rounded-xl font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                    placeholder="admin@solitic.in"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="font-body text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  Secret Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-11 pr-12 py-4 bg-muted/20 border border-border rounded-xl font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                    placeholder="••••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-4 bg-charcoal dark:bg-gold text-off-white dark:text-charcoal font-display font-black tracking-tight rounded-xl hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/10 active:scale-[0.98] transition-all disabled:opacity-50 text-sm mt-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Authorizing Access...
                  </>
                ) : (
                  <>
                    Authenticate
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-border text-center">
              <Link
                href="/login"
                className="font-body text-xs text-muted-foreground hover:text-gold transition-colors"
              >
                ← Back to user login
              </Link>
              <span className="mx-3 text-border">·</span>
              <Link
                href="/"
                className="font-body text-xs text-muted-foreground hover:text-gold transition-colors"
              >
                Visit website
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
