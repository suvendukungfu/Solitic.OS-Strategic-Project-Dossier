import { prisma } from "@/lib/prisma";
import { BlogListingUI } from "@/components/blog/BlogListingUI";
import { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "The Solitic | Legal Intelligence & Corporate Advisory",
  description: "The authoritative voice for legal and business intelligence. Read our latest stories on compliance, corporate strategy, and regulatory shifts.",
  openGraph: {
    title: "The Solitic | Legal Intelligence",
    description: "The authoritative voice for legal and business intelligence.",
    type: "website",
  }
};

export default async function BlogListing() {
  const posts = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
  });

  return <BlogListingUI posts={posts} />;
}
