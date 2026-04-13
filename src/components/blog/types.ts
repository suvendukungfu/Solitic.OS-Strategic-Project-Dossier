import { Post } from "@prisma/client";
import { JSONContent } from "@tiptap/react";

/**
 * Extended Post type used across blog layout components.
 * Includes all Prisma Post fields plus any runtime-added properties.
 * Overrides content/excerpt to be more flexible for UI rendering using Tiptap's JSONContent.
 */
export type BlogPost = Omit<Post, 'content' | 'excerpt'> & {
  layoutType?: string;
  fonts?: string;
  content: JSONContent | string | null;
  excerpt: JSONContent | string | null;
};

/**
 * Props shared by all layout components.
 */
export interface LayoutProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
  contentOverride?: React.ReactNode;
}
