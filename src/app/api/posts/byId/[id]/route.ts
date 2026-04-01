import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../../lib/auth";
import { prisma } from "../../../../../lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from 'next/cache';
import { postSchema } from '../../../../../lib/validations/post';
import { calculateReadingTime } from '../../../../../lib/utils';

function isAuthorized(role?: string) {
  return role === 'ADMIN' || role === 'EDITOR';
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  const user = session?.user as { role?: string; email?: string } | undefined;

  if (!session || !isAuthorized(user?.role)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const resolvedParams = await params;
    const post = await prisma.post.findUnique({
      where: { id: resolvedParams.id },
    });

    if (!post) return NextResponse.json({ message: "Not found" }, { status: 404 });
    
    const transformedPost = {
      ...post,
      tags: typeof post.tags === 'string' ? post.tags.split(',') : []
    };
    
    return NextResponse.json(transformedPost);
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  const user = session?.user as { role?: string; email?: string } | undefined;

  if (!session || !isAuthorized(user?.role)) {
    return NextResponse.json({ message: "Unauthorized Strategy Access" }, { status: 401 });
  }

  try {
    const resolvedParams = await params;
    const body = await req.json();
    const validatedData = postSchema.parse(body);
    
    // Explicitly destructure to avoid passing 'id' to prisma and to calculate metrics
    const { id, ...updateData } = validatedData;
    const readingTime = calculateReadingTime(validatedData.content);

    // Initial Slug Generation with Collision Protection if slug changed
    let slug = updateData.slug;
    const currentPost = await prisma.post.findUnique({ where: { id: resolvedParams.id } });
    
    if (slug && currentPost && currentPost.slug !== slug) {
       const existing = await prisma.post.findUnique({ where: { slug } });
       if (existing) {
          slug = `${slug}-${Math.random().toString(36).substring(2, 7)}`;
       }
    }

    const updatePayload = {
      ...updateData,
      slug: slug || updateData.slug,
      readingTime,
      tags: updateData.tags || '',
      coverImage: updateData.coverImage || null,
      excerpt: updateData.excerpt || null,
    } as unknown as Prisma.PostUpdateInput;

    const post = await prisma.post.update({
      where: { id: resolvedParams.id },
      data: updatePayload,
    });
    
    // Ecosystem Real-time Synchronization
    revalidatePath('/blog');
    revalidatePath(`/blog/${post.slug}`);
    if (currentPost && currentPost.slug !== post.slug) {
       revalidatePath(`/blog/${currentPost.slug}`);
    }
    revalidatePath('/admin/posts');
    revalidatePath('/admin/dashboard');
    
    const transformedPost = {
      ...post,
      tags: typeof post.tags === 'string' ? post.tags.split(',') : []
    };
    
    return NextResponse.json(transformedPost);
  } catch (error) {
    console.error("Institutional Update Error:", error);
    return NextResponse.json({ message: "Manuscript synchronization failed" }, { status: 400 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  const user = session?.user as { role?: string; email?: string } | undefined;

  if (!session || !isAuthorized(user?.role)) {
    return NextResponse.json({ message: "Unauthorized Strategy Access" }, { status: 401 });
  }

  try {
    const resolvedParams = await params;
    const body = await req.json();
    const validatedData = postSchema.partial().parse(body);
    
    const { id, ...updateData } = validatedData;
    const readingTime = updateData.content ? calculateReadingTime(updateData.content) : undefined;

    const currentPost = await prisma.post.findUnique({ where: { id: resolvedParams.id } });

    const updatePayload = {
      ...updateData,
      ...(readingTime !== undefined ? { readingTime } : {}),
      ...(updateData.tags !== undefined ? { tags: updateData.tags || '' } : {}),
    } as unknown as Prisma.PostUpdateInput;

    const post = await prisma.post.update({
      where: { id: resolvedParams.id },
      data: updatePayload,
    });

    // Real-time synchronization
    revalidatePath('/blog');
    revalidatePath(`/blog/${post.slug}`);
    if (currentPost && currentPost.slug !== post.slug) {
       revalidatePath(`/blog/${currentPost.slug}`);
    }
    revalidatePath('/admin/posts');
    revalidatePath('/admin/dashboard');

    return NextResponse.json(post);
  } catch (error) {
    console.error("Institutional Patch Error:", error);
    return NextResponse.json({ message: "Manuscript patch failed" }, { status: 400 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  const user = session?.user as { role?: string; email?: string } | undefined;

  if (!session || !isAuthorized(user?.role)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const resolvedParams = await params;
    
    // First find the post to get the slug for revalidation
    const post = await prisma.post.findUnique({
      where: { id: resolvedParams.id },
      select: { slug: true }
    });

    if (post) {
      await prisma.post.delete({
        where: { id: resolvedParams.id },
      });

      // Immediate revalidation across the ecosystem
      revalidatePath('/blog');
      revalidatePath(`/blog/${post.slug}`);
      revalidatePath('/admin/dashboard');
      revalidatePath('/admin/posts');
    }

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Institutional delete error:", error);
    return NextResponse.json({ message: "Retraction failed" }, { status: 500 });
  }
}
