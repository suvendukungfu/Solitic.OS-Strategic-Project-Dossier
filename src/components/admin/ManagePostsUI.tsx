'use client';

import Link from 'next/link';
import { Post } from "@/lib/types";
import { format } from 'date-fns';
import { Edit2, Eye, Trash2, CheckCircle, AlertCircle, Plus, Search, Filter, Layers, X } from 'lucide-react';
import { toast } from 'sonner';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function ManagePostsUI({ initialPosts }: { initialPosts: Post[] }) {
  const [posts, setPosts] = useState(initialPosts);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [pendingDeleteType, setPendingDeleteType] = useState<{ type: 'SINGLE' | 'BULK', post?: Post }>({ type: 'SINGLE' });

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'DRAFT' | 'PUBLISHED'>('ALL');
  const [isBulkActing, setIsBulkActing] = useState(false);
  const router = useRouter();

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Derived filtered posts
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
                            (post.tags && String(post.tags).toLowerCase().includes(debouncedSearch.toLowerCase()));
      const matchesStatus = statusFilter === 'ALL' || post.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [posts, debouncedSearch, statusFilter]);

  // Bulk Selection Handlers
  const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectedIds(new Set(filteredPosts.map(p => p.id)));
    else setSelectedIds(new Set());
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  // Improved Delete Handler (Supports Single & Bulk)
  const executeDelete = async () => {
    setShowDeleteConfirm(false);
    if (pendingDeleteType.type === 'BULK') {
       await bulkAction('DELETE', true);
    } else if (pendingDeleteType.post) {
       await deletePostRaw(pendingDeleteType.post);
    }
  };

  // Bulk Action Dispatcher (Refined)
  const bulkAction = async (action: 'DELETE' | 'PUBLISHED' | 'DRAFT', confirmed = false) => {
    if (action === 'DELETE' && !confirmed) {
      setPendingDeleteType({ type: 'BULK' });
      setShowDeleteConfirm(true);
      return;
    }
    
    setIsBulkActing(true);
    try {
      const targets = posts.filter(p => selectedIds.has(p.id));
      const results = await Promise.all(targets.map(async post => {
        try {
          if (action === 'DELETE') {
             const res = await fetch(`/api/posts/byId/${post.id}`, { method: 'DELETE' });
             if (!res.ok) throw new Error();
          } else {
             const res = await fetch(`/api/posts/byId/${post.id}`, {
               method: 'PATCH',
               body: JSON.stringify({ status: action }),
               headers: { 'Content-Type': 'application/json' }
             });
             if (!res.ok) throw new Error();
          }
          return { id: post.id, success: true };
        } catch (e) {
          return { id: post.id, success: false };
        }
      }));

      const successfulIds = new Set(results.filter(r => r.success).map(r => r.id));

      if (action === 'DELETE') {
        setPosts(prev => prev.filter(p => !successfulIds.has(p.id)));
      } else {
        setPosts(prev => prev.map(p => successfulIds.has(p.id) ? { ...p, status: action } : p));
      }
      
      setSelectedIds(new Set());
      router.refresh();
      
      const failedCount = targets.length - successfulIds.size;
      if (failedCount > 0) {
         toast.error(`${failedCount} operations failed, but ${successfulIds.size} succeeded.`);
      } else {
         toast.success(`Success: ${successfulIds.size} manuscripts processed.`);
      }
    } catch (e) {
      toast.error('Fatal synchronization error.');
    } finally {
      setIsBulkActing(false);
    }
  };

  // Single Actions
  const toggleStatus = async (post: Post) => {
    const newStatus = post.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    setIsUpdating(post.id);
    try {
      const resp = await fetch(`/api/posts/byId/${post.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus }),
        headers: { 'Content-Type': 'application/json' }
      });
      if (!resp.ok) throw new Error();
      
      setPosts(posts.map(p => p.id === post.id ? { ...p, status: newStatus } : p));
      router.refresh();
      toast.success(`Manuscript ${newStatus === 'PUBLISHED' ? 'is now live' : 'secured as draft'}`);
    } catch (e) {
      toast.error('Status transition failure');
    } finally {
      setIsUpdating(null);
    }
  };

  const deletePostRaw = async (post: Post) => {
    setIsUpdating(post.id);
    try {
      const resp = await fetch(`/api/posts/byId/${post.id}`, { method: 'DELETE' });
      if (!resp.ok) throw new Error();
      
      setPosts(posts.filter(p => p.id !== post.id));
      setSelectedIds(prev => {
        const next = new Set(prev);
        next.delete(post.id);
        return next;
      });
      router.refresh();
      toast.success('Manuscript retracted from registry');
    } catch (e) {
      toast.error('Retraction failed');
    } finally {
      setIsUpdating(null);
    }
  };

  return (
    <div className="flex flex-col gap-8 relative pb-24">
      {/* Retraction Confirmation Modal */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent className="bg-[#1A1A1A] border border-white/5 text-white backdrop-blur-3xl rounded-[2rem] p-10">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-3xl font-display font-black italic tracking-tighter">Confirm <span className="text-red-500">Retraction.</span></AlertDialogTitle>
            <AlertDialogDescription className="text-white/40 py-4 font-serif italic text-lg leading-relaxed">
              {pendingDeleteType.type === 'BULK' 
                ? `Are you certain you wish to purge ${selectedIds.size} manuscripts from the institutional registry? This action is permanent.`
                : "Are you certain you wish to purge this manuscript from the institutional registry? This action is permanent."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex gap-4">
            <AlertDialogCancel className="bg-transparent border border-white/5 hover:bg-white/5 text-white/60 rounded-xl px-8">Abort</AlertDialogCancel>
            <AlertDialogAction 
              onClick={executeDelete}
              className="bg-red-500 hover:bg-red-600 text-white rounded-xl px-8 font-black uppercase tracking-widest text-[10px]"
            >
              Confirm Purge
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Floating Bulk Action Bar */}
      {selectedIds.size > 0 && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-charcoal text-white px-6 py-4 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.3)] border border-white/10 flex items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gold/20 text-gold font-bold text-xs">{selectedIds.size}</span>
              <span className="text-sm font-medium">Selected</span>
            </div>
            <div className="w-px h-6 bg-white/20"></div>
            <div className="flex items-center gap-2">
              <button 
                disabled={isBulkActing}
                onClick={() => bulkAction('PUBLISHED')}
                className="px-4 py-2 rounded-full text-xs font-bold bg-white/10 hover:bg-emerald-500/20 hover:text-emerald-400 transition-colors disabled:opacity-50"
              >
                Publish
              </button>
              <button 
                disabled={isBulkActing}
                onClick={() => bulkAction('DRAFT')}
                className="px-4 py-2 rounded-full text-xs font-bold bg-white/10 hover:bg-amber-500/20 hover:text-amber-400 transition-colors disabled:opacity-50"
              >
                Set Draft
              </button>
              <button 
                disabled={isBulkActing}
                onClick={() => bulkAction('DELETE')}
                className="px-4 py-2 rounded-full text-xs font-bold bg-red-500/20 text-red-200 hover:bg-red-500 hover:text-white transition-colors disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-end gap-12">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl md:text-5xl font-display font-black tracking-tighter">
            Story <span className="text-gold italic">Catalogue.</span>
          </h1>
          <p className="text-muted-foreground font-body">Review, manage, and curate the House's content.</p>
        </div>
        
        <Link 
          href="/admin/posts/new" 
          className="group flex items-center gap-2 px-6 py-3 bg-gold text-charcoal rounded-xl font-display font-black text-sm tracking-tight hover:bg-gold/90 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(200,160,80,0.3)] transition-all"
        >
          <Plus className="w-4 h-4" />
          Draft New Story
        </Link>
      </header>

      {/* Advanced Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-muted/20 p-4 rounded-2xl border border-border/50">
        <div className="relative w-full md:w-96 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/50 group-focus-within:text-gold transition-colors">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            placeholder="Search titles or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-11 pr-4 py-3 bg-background border border-border/60 rounded-xl text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all outline-none shadow-sm"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex items-center gap-2 bg-background border border-border/60 rounded-xl px-4 py-2 hover:border-border transition-colors">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'ALL' | 'DRAFT' | 'PUBLISHED')}
              className="bg-transparent text-sm font-medium border-none focus:outline-none focus:ring-0 text-foreground"
            >
              <option value="ALL">All Status</option>
              <option value="PUBLISHED">Published Only</option>
              <option value="DRAFT">Drafts Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data Grid */}
      <div className="rounded-2xl border border-border/60 bg-background overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-muted/30 border-b border-border/60">
            <tr className="text-[10px] uppercase tracking-[0.1em] font-bold text-muted-foreground bg-muted/10">
              <th className="py-3 pl-6 pr-3 w-12">
                <input 
                  type="checkbox" 
                  checked={filteredPosts.length > 0 && selectedIds.size === filteredPosts.length}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded border-border/50 text-gold shadow-sm focus:ring-gold focus:ring-offset-background bg-background cursor-pointer transition-all hover:border-gold"
                />
              </th>
              <th className="py-3 px-4 font-body tracking-widest">Image</th>
              <th className="py-3 px-4 font-body tracking-widest w-full">Topic & Title</th>
              <th className="py-3 px-4 font-body tracking-widest">Status</th>
              <th className="py-3 px-6 font-body tracking-widest text-right">Settings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => {
                const isSelected = selectedIds.has(post.id);
                return (
                  <tr key={post.id} className={`group transition-all duration-200 ${isSelected ? 'bg-gold/5' : 'hover:bg-muted/10'}`}>
                    <td className="py-4 pl-6 pr-3">
                      <input 
                        type="checkbox" 
                        checked={isSelected}
                        onChange={() => toggleSelect(post.id)}
                        className="w-4 h-4 rounded border-border/50 text-gold focus:ring-gold shadow-sm focus:ring-offset-background bg-background cursor-pointer transition-all group-hover:border-gold"
                      />
                    </td>
                    <td className="py-4 px-4">
                      <div className={`w-14 h-14 rounded-md overflow-hidden border transition-all ${isSelected ? 'border-gold' : 'border-border/50 bg-muted/50 group-hover:border-gold/30 group-hover:shadow-sm'}`}>
                        {post.coverImage ? (
                          <img src={post.coverImage} alt="" className="w-full h-full object-cover transition-all duration-700" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[9px] text-muted-foreground font-body uppercase bg-muted/30">Void</div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-1 max-w-lg cursor-default">
                        <Link href={`/admin/posts/${post.id}`} className="font-display font-bold text-sm tracking-tight leading-tight text-foreground hover:text-gold transition-colors">{post.title}</Link>
                        <div className="flex items-center gap-3 flex-wrap mt-0.5">
                          <span className="text-[10px] text-muted-foreground/80 font-body tracking-wide border-r border-border/50 pr-3" title="Last Updated">Edited: {format(new Date(post.updatedAt), 'MMM d')}</span>
                          <div className="flex gap-1.5 flex-wrap">
                            {post.tags && String(post.tags).split(',').slice(0, 3).map(tag => (
                              <span key={tag} className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground/60 bg-muted/30 px-1.5 py-0.5 rounded shadow-sm border border-border/30">{tag.trim()}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                       <button 
                         disabled={isUpdating === post.id}
                         onClick={() => toggleStatus(post)}
                         className={`text-[9px] px-2.5 py-1 rounded font-bold tracking-wider uppercase inline-flex items-center gap-1.5 border transition-all hover:scale-105 active:scale-95 disabled:opacity-50 ${post.status === 'PUBLISHED' ? 'border-emerald-500/20 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/10 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white shadow-sm' : 'border-amber-500/20 bg-amber-50 text-amber-700 dark:bg-amber-900/10 dark:text-amber-400 hover:bg-amber-500 hover:text-white shadow-sm'}`}
                       >
                          {post.status === 'PUBLISHED' ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                          {post.status}
                       </button>
                    </td>
                    <td className="py-4 px-6">
                       <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <Link href={`/admin/posts/${post.id}`} className="p-2 rounded border border-transparent hover:border-border/60 hover:text-foreground hover:bg-background transition-all text-muted-foreground shadow-sm bg-transparent hover:shadow-md" title="Open / Edit">
                            <Edit2 className="w-3.5 h-3.5" />
                          </Link>
                          <Link href={`/blog/${post.slug}`} target="_blank" className="p-2 rounded border border-transparent hover:border-border/60 hover:text-foreground hover:bg-background transition-all text-muted-foreground shadow-sm bg-transparent hover:shadow-md" title="Live Preview">
                            <Eye className="w-3.5 h-3.5" />
                          </Link>
                          <div className="w-px h-4 bg-border/50 mx-1 hidden md:block"></div>
                          <button 
                            disabled={isUpdating === post.id}
                            onClick={() => {
                              setPendingDeleteType({ type: 'SINGLE', post });
                              setShowDeleteConfirm(true);
                            }}
                            className="p-2 rounded border border-transparent hover:border-red-500/30 hover:text-red-500 hover:bg-red-500/5 transition-all text-muted-foreground disabled:opacity-50 shadow-sm bg-transparent" title="Retract"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                       </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="py-24 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <Layers className="w-12 h-12 text-muted-foreground/20 mb-4" />
                    <p className="text-muted-foreground font-body text-sm mb-2">No stories match your criteria.</p>
                    <p className="text-xs text-muted-foreground/60">Try clearing your filters or drafting a new story.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
