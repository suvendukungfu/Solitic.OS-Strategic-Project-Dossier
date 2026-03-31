import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PostStatus } from "@/lib/types";

import { revalidatePath } from 'next/cache';

// Public: Get all published posts
export async function GET() {
  try {
    const posts = (await prisma.post.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { createdAt: 'desc' },
    })).map(post => ({
      ...post,
      tags: typeof post.tags === 'string' ? post.tags.split(',') : []
    }));
    
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ message: "Could not fetch posts" }, { status: 500 });
  }
}

// Protected: Create new post
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const user = session?.user as { role?: string; email?: string } | undefined;
  
  if (!session || !['ADMIN', 'EDITOR'].includes(user?.role || '')) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, slug, content, excerpt, coverImage, tags, status } = body;

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        coverImage,
        tags: typeof tags === 'string' ? tags : (Array.isArray(tags) ? tags.join(',') : ''),
        status: status || 'DRAFT',
      },
    });

    // Instant real-time update for frontend
    revalidatePath('/blog');
    revalidatePath(`/blog/${post.slug}`);
    
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Post creation error:", error);
    return NextResponse.json({ message: "Failed to create post" }, { status: 400 });
  }
}
