'use client';

import BlogEditor from '@/components/editor/tiptap-editor';

export default function NewPostPage() {
  return (
    <div className="flex flex-col gap-12 animate-fade-in px-4">
      <h1 className="text-4xl md:text-5xl font-display font-black tracking-tighter">
        New <span className="text-primary italic">Story.</span>
      </h1>
      <BlogEditor />
    </div>
  );
}
