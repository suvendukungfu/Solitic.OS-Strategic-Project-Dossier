'use client';

import { useState } from 'react';
import { Post } from '@/lib/types';
import { PostCard } from './post-card';
import { Search, SlidersHorizontal } from 'lucide-react';

export function BlogSearchListing({ initialPosts }: { initialPosts: Post[] }) {
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const tags = Array.from(new Set(initialPosts.flatMap(p => p.tags || [])));

  const filteredPosts = initialPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) || 
                         post.excerpt?.toLowerCase().includes(search.toLowerCase());
    const matchesTag = !selectedTag || (post.tags && post.tags.includes(selectedTag));
    return matchesSearch && matchesTag;
  });

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 sticky top-24 z-30 bg-background/80 backdrop-blur-xl pb-8 border-b border-border/50">
         <div className="relative w-full max-w-lg">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-50" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search stories..."
              className="w-full pl-14 pr-8 py-5 rounded-3xl bg-muted/20 border border-border/50 focus:outline-none focus:ring-1 ring-primary/50 transition-all font-body text-sm shadow-sm"
            />
         </div>

         <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-4 md:pb-0 no-scrollbar whitespace-nowrap">
            <button 
              onClick={() => setSelectedTag(null)}
              className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] transition-all border ${!selectedTag ? 'bg-charcoal text-off-white border-charcoal' : 'bg-transparent text-muted-foreground border-border hover:border-primary'}`}
            >
              all
            </button>
            {tags.map(tag => (
              <button 
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] transition-all border ${selectedTag === tag ? 'bg-charcoal text-off-white border-charcoal' : 'bg-transparent text-muted-foreground border-border hover:border-primary'}`}
              >
                {tag}
              </button>
            ))}
         </div>
      </div>

      <section className="flex flex-col mb-32">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <div className="py-32 text-center flex flex-col items-center gap-4">
             <SlidersHorizontal className="w-12 h-12 text-muted-foreground/20 animate-pulse" />
             <p className="text-muted-foreground italic font-body">No matching stories found. Try a different search.</p>
          </div>
        )}
      </section>
    </div>
  );
}
