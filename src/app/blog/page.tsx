import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic"; // rebuild trigger
import { BlogListingUI } from "@/components/blog/BlogListingUI";
import { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Insights & Editorial Intelligence",
  description:
    "Read the latest Solitic briefings on corporate strategy, compliance, contracts, and business advisory.",
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    url: absoluteUrl('/blog'),
    siteName: siteConfig.name,
    title: "Solitic Insights & Editorial Intelligence",
    description:
      "Read the latest Solitic briefings on corporate strategy, compliance, contracts, and business advisory.",
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solitic Insights & Editorial Intelligence',
    description:
      "Read the latest Solitic briefings on corporate strategy, compliance, contracts, and business advisory.",
  },
};

export default async function BlogListing() {
  let posts: any[] = [];
  try {
    const dbPosts = await prisma.post.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
    });
    posts = dbPosts || [];
  } catch (error) {
    console.error("Critical: Prisma database fetch failed. Falling back to mockup data.", error);
    posts = [];
  }

  return <BlogListingUI posts={posts} />;
}
