import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { BlogPostUI } from "@/components/blog/BlogPostUI";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { MOCKUP_POSTS } from "@/lib/blog-data";
import { renderPlainText } from "@/lib/tiptap";
import { BlogPost } from "@/components/blog/types";

import { Post } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  
  let post: BlogPost | null = null;
  try {
    const dbPost = await prisma.post.findUnique({
      where: { slug: params.slug },
    });
    post = dbPost as unknown as BlogPost | null;
  } catch (e) {
    console.error("Prisma error in metadata:", e);
  }

  // Fallback to mockup data
  if (!post) {
    post = MOCKUP_POSTS.find(p => p.slug === params.slug) as unknown as BlogPost | null;
  }

  if (!post) {
    return { title: "Post Not Found | Solitic Consulting" };
  }

  const plainExcerpt = renderPlainText(post.excerpt) || "Legal and strategic insights from Solitic Consulting.";
  const imageUrl = post.coverImage ? absoluteUrl(post.coverImage) : undefined;

  return {
    title: `${post.title} | Solitic Consulting`,
    description: plainExcerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      url: absoluteUrl(`/blog/${post.slug}`),
      siteName: siteConfig.name,
      title: post.title,
      description: plainExcerpt,
      images: imageUrl ? [imageUrl] : [],
      type: "article",
      publishedTime: typeof post.createdAt === 'string' ? post.createdAt : (post.createdAt as Date).toISOString(),
      tags: post.tags ? String(post.tags).split(",") : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: plainExcerpt,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  let post: BlogPost | null = null;
  try {
    const dbPost = await prisma.post.findUnique({
      where: { slug: params.slug },
    });
    post = dbPost as unknown as BlogPost | null;
  } catch (e) {
    console.error("Prisma error in page body:", e);
  }

  // Fallback to mockup data
  if (!post) {
    post = MOCKUP_POSTS.find(p => p.slug === params.slug) as unknown as BlogPost | null;
  }

  if (!post) {
    notFound();
  }

  if (post.status !== "PUBLISHED") {
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as { role?: string })?.role;
    if (userRole !== "ADMIN" && userRole !== "EDITOR") {
      notFound();
    }
  }

  let relatedPosts: BlogPost[] = [];
  try {
    const dbRelated = await prisma.post.findMany({
      where: { 
        status: "PUBLISHED", 
        NOT: { id: post.id },
      },
      take: 3,
      orderBy: { createdAt: "desc" },
    });
    relatedPosts = dbRelated as unknown as BlogPost[];
  } catch (e) {
    relatedPosts = [];
  }
  
  // Combine with dummy related posts if DB empty or fetch fails
  const finalRelatedPosts = relatedPosts.length > 0 
    ? relatedPosts 
    : (MOCKUP_POSTS.filter(p => p.slug !== params.slug).slice(0, 3) as unknown as BlogPost[]);

  return <BlogPostUI post={post} relatedPosts={finalRelatedPosts} />;
}
