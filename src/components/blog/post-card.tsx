'use client';

import Link from 'next/link';
import { format } from 'date-fns';
import { Post } from '@/lib/types';
import { motion } from 'framer-motion';

export function PostCard({ post }: { post: Post }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col gap-4 border-b border-border py-8"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest font-display">
          {format(new Date(post.createdAt), 'MMM dd, yyyy')}
          <span>•</span>
          {post.tags?.[0] || 'Uncategorized'}
        </div>
        
        <Link href={`/blog/${post.slug}`} className="group-hover:text-primary transition-colors">
          <h3 className="text-2xl md:text-3xl font-display font-bold leading-tight">
            {post.title}
          </h3>
        </Link>

        {post.excerpt && (
          <p className="text-muted-foreground font-body leading-relaxed max-w-2xl line-clamp-2">
            {post.excerpt}
          </p>
        )}
      </div>

      {post.coverImage && (
        <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-32 h-32 overflow-hidden rounded">
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
    </motion.div>
  );
}
