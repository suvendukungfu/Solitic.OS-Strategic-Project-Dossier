import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from 'next/cache';
import { postSchema } from '../../../../lib/validations/post';
import { calculateReadingTime } from '../../../../lib/utils';

// Public: GET single post by slug
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const resolvedParams = await params;
  try {
    const post = await prisma.post.findUnique({
      where: { slug: resolvedParams.slug },
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    if (post.status !== 'PUBLISHED') {
      const session = await getServerSession(authOptions);
      const user = session?.user as { role?: string; email?: string } | undefined;

      if (!session || !['ADMIN', 'EDITOR'].includes(user?.role || '')) {
        return NextResponse.json({ message: 'Post not found' }, { status: 404 });
      }
    }

    const transformedPost = {
      ...post,
      tags: post.tags ? String(post.tags).split(',') : []
    };

    return NextResponse.json(transformedPost);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching post" }, { status: 500 });
  }
}

// Update post
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const resolvedParams = await params;
  const session = await getServerSession(authOptions);
  const user = session?.user as { role?: string; email?: string } | undefined;
  
  if (!session || !['ADMIN', 'EDITOR'].includes(user?.role || '')) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validatedData = postSchema.parse(body);
    
    // Explicitly destructure to avoid passing 'id' to prisma and to calculate stats
    const { id, ...updateData } = validatedData;
    const readingTime = calculateReadingTime(validatedData.content);

    const updatePayload = {
      ...updateData,
      readingTime,
      tags: updateData.tags || '',
      coverImage: updateData.coverImage || null,
      excerpt: updateData.excerpt || null,
    } as unknown as Prisma.PostUpdateInput;

    const post = await prisma.post.update({
      where: { id: id as string },
      data: updatePayload,
    });

    // Instant real-time update for frontend
    revalidatePath('/blog');
    revalidatePath(`/blog/${post.slug}`);
    if (resolvedParams.slug !== post.slug) {
      revalidatePath(`/blog/${resolvedParams.slug}`);
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ message: "Update failed" }, { status: 400 });
  }
}

// Delete post
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const resolvedParams = await params;
  const session = await getServerSession(authOptions);
  const user = session?.user as { role?: string; email?: string } | undefined;
  
  if (!session || !['ADMIN', 'EDITOR'].includes(user?.role || '')) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ message: "Missing ID" }, { status: 400 });
  }

  try {
    await prisma.post.delete({
      where: { id: id },
    });

    // Revalidate after delete
    revalidatePath('/blog');
    revalidatePath(`/blog/${resolvedParams.slug}`);

    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ message: "Delete failed" }, { status: 500 });
  }
}
