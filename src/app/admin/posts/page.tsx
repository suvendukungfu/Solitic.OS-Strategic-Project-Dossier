import { prisma } from "@/lib/prisma";
import { ManagePostsUI } from "@/components/admin/ManagePostsUI";
import { Post, PostStatus } from "@/lib/types";

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function ManagePosts() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const plainPosts = posts.map(post => {
    const p = post as any;
    return {
      ...p,
      // Ensure layoutType exists even for legacy posts
      layoutType: p.layoutType || 'editorial',
      // Convert tags string to array if needed (handled in ManagePostsUI but good to be explicit)
      tags: p.tags ? String(p.tags).split(',').filter(Boolean) : [],
      status: (p.status || 'DRAFT') as PostStatus,
      // Ensure dates are strings for safe JSON serialization
      createdAt: p.createdAt instanceof Date ? p.createdAt.toISOString() : p.createdAt,
      updatedAt: p.updatedAt instanceof Date ? p.updatedAt.toISOString() : p.updatedAt,
    };
  });

  const serializedPosts = JSON.parse(JSON.stringify(plainPosts));

  return <ManagePostsUI initialPosts={serializedPosts as Post[]} />;
}
