import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { BlogPostUI } from "@/components/blog/BlogPostUI";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const session = await getServerSession(authOptions);
  const userRole = (session?.user as { role?: string })?.role;
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
  });

  if (
    !post ||
    (post.status !== "PUBLISHED" && userRole !== "ADMIN" && userRole !== "EDITOR")
  ) {
    return { title: "Post Not Found | Solitic Consulting" };
  }

  const imageUrl = post.coverImage ? absoluteUrl(post.coverImage) : undefined;

  return {
    title: `${post.title} | Solitic Consulting`,
    description: post.excerpt || "Legal and strategic insights from Solitic Consulting.",
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      url: absoluteUrl(`/blog/${post.slug}`),
      siteName: siteConfig.name,
      title: post.title,
      description: post.excerpt || "Legal and strategic insights from Solitic Consulting.",
      images: imageUrl ? [imageUrl] : [],
      type: "article",
      publishedTime: post.createdAt.toISOString(),
      tags: typeof post.tags === "string" ? post.tags.split(",") : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || "Legal and strategic insights from Solitic Consulting.",
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
  });

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

  const relatedPosts = await prisma.post.findMany({
    where: { 
      status: "PUBLISHED", 
      NOT: { id: post.id },
    },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  return <BlogPostUI post={post} relatedPosts={relatedPosts} />;
}
