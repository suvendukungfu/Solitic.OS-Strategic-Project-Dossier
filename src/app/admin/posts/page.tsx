import { prisma } from "@/lib/prisma";
import { ManagePostsUI } from "@/components/admin/ManagePostsUI";
import { Post, PostStatus } from "@/lib/types";

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function ManagePosts() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const plainPosts = posts.map(post => ({
    ...post,
    tags: typeof post.tags === 'string' ? post.tags.split(',').filter(Boolean) : [],
    status: post.status as PostStatus,
  }));

  // Strict JSON serialization to remove any non-serializable Prisma methods
  const serializedPosts = JSON.parse(JSON.stringify(plainPosts));

  return <ManagePostsUI initialPosts={serializedPosts as Post[]} />;
}
