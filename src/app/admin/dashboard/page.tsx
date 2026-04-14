import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { format } from "date-fns";
import {
  FileText,
  CheckCircle2,
  Clock,
  PlusCircle,
  Eye,
  Edit3,
  TrendingUp,
  ExternalLink,
} from "lucide-react";
import * as motion from "framer-motion/client";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const postsCount = await prisma.post.count();
  const publishedCount = await prisma.post.count({ where: { status: "PUBLISHED" } });
  const draftCount = await prisma.post.count({ where: { status: "DRAFT" } });

  const recentPosts = await prisma.post.findMany({
    take: 10,
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      status: true,
      updatedAt: true,
      tags: true,
    }
  });

  const stats = [
    {
      label: "Total Articles",
      value: postsCount,
      icon: FileText,
      color: "text-foreground",
      bg: "bg-muted/10",
      border: "border-border",
    },
    {
      label: "Published",
      value: publishedCount,
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50 dark:bg-emerald-900/10",
      border: "border-emerald-200 dark:border-emerald-800",
    },
    {
      label: "Drafts",
      value: draftCount,
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50 dark:bg-amber-900/10",
      border: "border-amber-200 dark:border-amber-800",
    },
    {
      label: "Readability",
      value: postsCount > 0 ? `${Math.round((publishedCount / postsCount) * 100)}%` : "—",
      icon: TrendingUp,
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-900/10",
      border: "border-blue-200 dark:border-blue-800",
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-10"
    >
      {/* Page Header */}
      <header className="relative p-8 md:p-10 rounded-[2rem] overflow-hidden border border-border bg-card/50 backdrop-blur-xl shadow-2xl shadow-black/5">
        {/* Abstract Background Element */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2.5 mb-3"
            >
              <div className="px-3 py-1 rounded-full bg-gold/10 border border-gold/20">
                <span className="font-sans text-[10px] font-black uppercase tracking-[0.2em] text-gold">
                  SOLITIC.OS
                </span>
              </div>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                Intelligence Hub
              </span>
            </motion.div>
            
            <h1 className="relative font-sans text-4xl md:text-5xl font-black tracking-tight leading-[1.1] mb-4 group">
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-br from-foreground via-foreground to-foreground/40 drop-shadow-sm transition-all duration-500 group-hover:from-gold group-hover:to-gold/60">
                Solitic<span className="text-gold italic font-display">.OS</span>
              </span>
              
              {/* Atmospheric Glow */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-4 bg-gold/10 blur-2xl rounded-full pointer-events-none z-0"
              />
              
              {/* Animated Underline */}
              <motion.div 
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "100%", opacity: 1 }}
                transition={{ delay: 0.5, duration: 1, ease: "circOut" }}
                className="absolute -bottom-2 left-0 h-[1.5px] bg-gradient-to-r from-gold/50 via-gold to-transparent rounded-full"
              />
            </h1>
            
            <p className="font-sans text-sm md:text-base text-muted-foreground/60 max-w-lg leading-relaxed mt-2">
              Elevate your editorial workflow with precision-engineered tools for 
              corporate intelligence and strategic narrative management.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/blog"
              target="_blank"
              className="px-6 py-3 rounded-2xl border border-border bg-background/50 hover:bg-background hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 transition-all duration-300 font-sans text-sm font-semibold text-muted-foreground hover:text-gold flex items-center gap-2 active:scale-95"
            >
              <ExternalLink className="w-4 h-4" />
              View Portal
            </Link>
            <Link
              href="/admin/posts/new"
              className="px-8 py-3 rounded-2xl bg-gold text-charcoal font-sans font-black text-sm tracking-tight shadow-xl shadow-gold/20 hover:shadow-gold/40 hover:-translate-y-1 active:scale-95 transition-all duration-300 flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              New Report
            </Link>
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + idx * 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className={`relative p-6 rounded-[2rem] border ${stat.border} ${stat.bg} backdrop-blur-sm shadow-sm hover:shadow-xl hover:shadow-black/5 transition-all duration-300 group overflow-hidden`}
          >
            {/* Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} border ${stat.border} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-sans text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground/50">
                    {stat.label}
                  </span>
                </div>
              </div>
              
              <div className="flex items-baseline gap-2">
                <span className={`font-sans text-4xl font-black tracking-tight ${stat.color}`}>
                  {stat.value}
                </span>
                {stat.label === "Readability" && (
                  <span className="font-sans text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                    Optimal
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Quick Actions */}
      <section className="grid md:grid-cols-3 gap-6">
        {[
          {
            href: "/admin/posts/new",
            icon: PlusCircle,
            label: "Draft New Report",
            desc: "Start a new strategic intelligence piece",
            gradient: "from-gold/20 via-transparent to-transparent",
            iconBg: "bg-gold/10 text-gold",
          },
          {
            href: "/admin/posts",
            icon: FileText,
            label: "Manage Archive",
            desc: "Review, edit, or archive published reports",
            gradient: "from-blue-500/10 via-transparent to-transparent",
            iconBg: "bg-blue-500/10 text-blue-500",
          },
          {
            href: "/blog",
            icon: Eye,
            label: "Review Live Portal",
            desc: "Audit the client-facing intelligence deck",
            gradient: "from-emerald-500/10 via-transparent to-transparent",
            iconBg: "bg-emerald-500/10 text-emerald-500",
          },
        ].map((action, idx) => (
          <motion.div
            key={action.href}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + idx * 0.1 }}
          >
            <Link
              href={action.href}
              className="relative group flex flex-col p-6 rounded-[2rem] border border-border bg-card hover:bg-muted/5 transition-all duration-300 hover:shadow-elegant overflow-hidden"
            >
              <div className={`absolute top-0 left-0 w-32 h-32 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className={`w-14 h-14 rounded-2xl ${action.iconBg} flex items-center justify-center mb-6 relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                <action.icon className="w-6 h-6" />
              </div>
              
              <div className="relative z-10">
                <div className="font-sans font-black text-base text-foreground mb-1">
                  {action.label}
                </div>
                <div className="font-sans text-xs text-muted-foreground leading-relaxed">
                  {action.desc}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </section>

      {/* Recent Articles Table */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-xl font-bold text-foreground tracking-tight">
              Recent Activity
            </h2>
            <span className="w-8 h-0.5 bg-gold/30 rounded-full" />
          </div>
          <Link
            href="/admin/posts"
            className="font-body text-xs text-gold hover:text-gold/80 transition-colors font-medium"
          >
            View all →
          </Link>
        </div>

        <div className="rounded-2xl border border-border overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-6 py-3 bg-muted/30 border-b border-border">
            <span className="font-body text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Article
            </span>
            <span className="font-body text-xs font-bold uppercase tracking-widest text-muted-foreground hidden md:block">
              Status
            </span>
            <span className="font-body text-xs font-bold uppercase tracking-widest text-muted-foreground hidden md:block">
              Updated
            </span>
            <span className="font-body text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Actions
            </span>
          </div>

          {recentPosts.length > 0 ? (
            <div className="divide-y divide-border/30">
              {recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-8 py-5 hover:bg-muted/10 transition-all duration-200 items-center group"
                >
                  <div className="min-w-0 pr-4">
                    <p className="font-sans font-bold text-sm text-foreground mb-1 truncate group-hover:text-gold transition-colors">
                      {post.title}
                    </p>
                    {post.tags && (
                      <span className="font-sans text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                        {post.tags ? String(post.tags).split(",")[0] : ""}
                      </span>
                    )}
                  </div>
                  <div className="hidden md:block">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        post.status === "PUBLISHED"
                          ? "bg-emerald-100/50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400"
                          : "bg-amber-100/50 text-amber-700 dark:bg-amber-400/10 dark:text-amber-400"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          post.status === "PUBLISHED" ? "animate-pulse bg-emerald-500" : "bg-amber-500"
                        }`}
                      />
                      {post.status}
                    </span>
                  </div>
                  <span className="font-sans text-xs text-muted-foreground/60 hidden md:block whitespace-nowrap">
                    {format(new Date(post.updatedAt), "MMM d, yyyy")}
                  </span>
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/posts/${post.id}`}
                      className="p-2 rounded-xl border border-border bg-background hover:border-gold hover:text-gold hover:shadow-lg transition-all"
                      title="Edit Story"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Link>
                    {post.status === "PUBLISHED" && (
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="p-2 rounded-xl bg-muted/30 text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
                        title="View Live"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <div className="w-20 h-20 bg-muted/20 border border-border rounded-3xl flex items-center justify-center mx-auto mb-6 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <FileText className="w-10 h-10 text-muted-foreground/40" />
              </div>
              <h3 className="font-sans font-black text-xl text-foreground mb-2">
                Operational Silence
              </h3>
              <p className="font-sans text-muted-foreground/60 text-sm max-w-sm mx-auto mb-8 leading-relaxed">
                The strategic archive is currently empty. Initialize your first intelligence piece to begin shaping the narrative.
              </p>
              <Link
                href="/admin/posts/new"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-charcoal font-sans font-black text-sm rounded-2xl shadow-xl shadow-gold/20 hover:shadow-gold/40 hover:-translate-y-1 active:scale-95 transition-all duration-300"
              >
                <PlusCircle className="w-5 h-5" />
                Begin First Report
              </Link>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
