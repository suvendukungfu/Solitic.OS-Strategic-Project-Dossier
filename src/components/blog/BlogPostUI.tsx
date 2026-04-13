'use client';

import dynamic from 'next/dynamic';
import { LayoutWrapper } from "./layouts/LayoutWrapper";

// Dynamically import layouts for performance
const EditorialLayout = dynamic(() => import("./layouts/Editorial"));
const MagazineLayout = dynamic(() => import("./layouts/Magazine"));
const MinimalLayout = dynamic(() => import("./layouts/Minimal"));
const ReportLayout = dynamic(() => import("./layouts/Report"));
const SpotlightLayout = dynamic(() => import("./layouts/Spotlight"));
import { LayoutProps, BlogPost } from "./types";

const LAYOUT_MAP: Record<string, React.ComponentType<LayoutProps>> = {
  editorial: EditorialLayout,
  magazine: MagazineLayout,
  minimal: MinimalLayout,
  report: ReportLayout,
  spotlight: SpotlightLayout,
};

export function BlogPostUI({ post, relatedPosts }: { post: BlogPost; relatedPosts: BlogPost[] }) {
  // Graceful fallback to editorial layout
  const SelectedLayout = LAYOUT_MAP[post.layoutType || 'editorial'] || EditorialLayout;

  return (
    <LayoutWrapper post={post}>
      <SelectedLayout post={post} relatedPosts={relatedPosts} />
    </LayoutWrapper>
  );
}
