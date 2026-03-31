'use client';

import { signIn, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, ArrowRight, Shield } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      const role = (session?.user as { role?: string })?.role;
      if (role === 'ADMIN' || role === 'EDITOR') {
        router.push('/admin/dashboard');
      } else {
        router.push('/');
      }
    }
  }, [status, session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        toast.error('Invalid email or password. Please try again.');
      } else {
        toast.success('Welcome back!');
        router.refresh();
      }
    } catch {
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-lg mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-6">
                <Lock className="w-7 h-7 text-gold" />
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-black text-foreground tracking-tight mb-2">
                Sign In to Solitic
              </h1>
              <p className="font-body text-muted-foreground">
                Access exclusive legal insights and resources
              </p>
            </motion.div>

            {/* Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-card border border-border rounded-3xl p-8 md:p-10 shadow-xl shadow-black/5"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div className="space-y-2">
                  <label className="font-body text-xs font-bold uppercase tracking-widest text-muted-foreground block">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-xl font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="font-body text-xs font-bold uppercase tracking-widest text-muted-foreground block">
                      Password
                    </label>
                    <button
                      type="button"
                      className="font-body text-xs text-gold hover:text-gold/80 transition-colors"
                      onClick={() => toast.info('Please contact contact@solitic.in to reset your password.')}
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-12 pr-12 py-4 bg-background border border-border rounded-xl font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                      placeholder="••••••••"
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
                  className="w-full flex items-center justify-center gap-2 py-4 bg-gold text-charcoal font-display font-black tracking-tight rounded-xl hover:bg-gold/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/20 active:scale-98 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-charcoal border-t-transparent rounded-full animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Admin shortcut */}
              <div className="mt-6 pt-6 border-t border-border text-center">
                <p className="font-body text-xs text-muted-foreground">
                  Are you an admin?{' '}
                  <Link
                    href="/admin/login"
                    className="text-gold hover:text-gold/80 font-medium transition-colors"
                  >
                    Admin portal →
                  </Link>
                </p>
              </div>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex items-center justify-center gap-6 text-muted-foreground"
            >
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-gold" />
                <span className="font-body text-[11px] uppercase tracking-widest">Secure Login</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-muted-foreground" />
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-gold" />
                <span className="font-body text-[11px] uppercase tracking-widest">SSL Encrypted</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-muted-foreground" />
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-gold" />
                <span className="font-body text-[11px] uppercase tracking-widest">100% Private</span>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
