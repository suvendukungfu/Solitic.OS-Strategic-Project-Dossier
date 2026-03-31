import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { BlogPostUI } from "@/components/blog/BlogPostUI";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
  });

  if (!post) {
    return { title: "Post Not Found | Solitic Consulting" };
  }

  return {
    title: `${post.title} | Solitic Consulting`,
    description: post.excerpt || "Legal and strategic insights from Solitic Consulting.",
    openGraph: {
      title: post.title,
      description: post.excerpt || "Legal and strategic insights from Solitic Consulting.",
      images: post.coverImage ? [post.coverImage] : [],
      type: "article",
      publishedTime: post.createdAt.toISOString(),
      tags: typeof post.tags === "string" ? post.tags.split(",") : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || "Legal and strategic insights from Solitic Consulting.",
      images: post.coverImage ? [post.coverImage] : [],
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
    where: { status: "PUBLISHED", NOT: { id: post.id } },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  return <BlogPostUI post={post} relatedPosts={relatedPosts} />;
}
