import { prisma } from "@/lib/prisma";
import { MOCKUP_POSTS } from "./blog-data";
import { JSONContent } from "@tiptap/react";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  excerpt: string;
  content: JSONContent;
  coverImage?: string | null;
  tags?: string | null;
  featured: boolean;
  trending: boolean;
  viewCount: number;
  readingTime: number;
  status: string;
  layoutType: "editorial" | "magazine" | "report" | "minimal" | "spotlight";
  createdAt: Date | string;
  updatedAt: Date | string;
};

/**
 * CMS Service Layer for Blog
 * Centralized data fetching with fallback to mockup data
 */
export const BlogService = {
  /**
   * Get all published posts
   */
  async getAllPosts(): Promise<BlogPost[]> {
    try {
      const posts = await prisma.post.findMany({
        orderBy: { createdAt: "desc" },
      });
      
      if (!posts || posts.length === 0) {
        return MOCKUP_POSTS as unknown as BlogPost[];
      }
      
      return posts as unknown as BlogPost[];
    } catch (error) {
      console.error("Database fetch failed, calling mockup fallback:", error);
      return MOCKUP_POSTS as unknown as BlogPost[];
    }
  },

  /**
   * Get a single post by slug
   */
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const post = await prisma.post.findUnique({
        where: { slug },
      });
      
      if (!post) {
        // Fallback search in mockup data
        const mockPost = MOCKUP_POSTS.find(p => p.slug === slug);
        return mockPost ? (mockPost as unknown as BlogPost) : null;
      }
      
      return post as unknown as BlogPost;
    } catch (error) {
       // Fallback search in mockup data
       const mockPost = MOCKUP_POSTS.find(p => p.slug === slug);
       return mockPost ? (mockPost as unknown as BlogPost) : null;
    }
  },

  /**
   * Get featured posts
   */
  async getFeaturedPosts(): Promise<BlogPost[]> {
    try {
      const posts = await prisma.post.findMany({
        where: { featured: true },
        orderBy: { createdAt: "desc" },
      });
      
      if (!posts || posts.length === 0) {
        return MOCKUP_POSTS.filter(p => p.featured) as unknown as BlogPost[];
      }
      
      return posts as unknown as BlogPost[];
    } catch (error) {
      return MOCKUP_POSTS.filter(p => p.featured) as unknown as BlogPost[];
    }
  },

  /**
   * Get trending posts
   */
  async getTrendingPosts(): Promise<BlogPost[]> {
    try {
      const posts = await prisma.post.findMany({
        where: { trending: true },
        orderBy: { viewCount: "desc" },
      });
      
      if (!posts || posts.length === 0) {
        return MOCKUP_POSTS.filter(p => p.trending) as unknown as BlogPost[];
      }
      
      return posts as unknown as BlogPost[];
    } catch (error) {
      return MOCKUP_POSTS.filter(p => p.trending) as unknown as BlogPost[];
    }
  }
};
