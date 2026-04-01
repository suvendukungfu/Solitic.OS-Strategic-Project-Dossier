import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";
import { Prisma } from "@prisma/client";
import { postSchema } from "../../../lib/validations/post";
import { apiSuccess, apiError, handleApiError } from "../../../lib/api-utils";
import { revalidatePath } from 'next/cache';
import { calculateReadingTime, slugify } from '../../../lib/utils';

// Public: Get all published posts
export async function GET() {
  try {
    const posts = (await prisma.post.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { createdAt: 'desc' },
    })).map(post => ({
      ...post,
      tags: typeof post.tags === 'string' ? post.tags.split(',').filter(Boolean) : []
    }));
    
    return apiSuccess(posts);
  } catch (error) {
    return handleApiError(error);
  }
}

// Protected: Create new post
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user as { role?: string; email?: string } | undefined;
    
    if (!session || !['ADMIN', 'EDITOR'].includes(user?.role || '')) {
      return apiError("Unauthorized Strategy Access", 401);
    }

    const body = await req.json();
    const validatedData = postSchema.parse(body);
    
    const { id, ...postData } = validatedData;
    const readingTime = calculateReadingTime(validatedData.content);

    // Initial Slug Generation with Collision Protection
    let slug = postData.slug || slugify(postData.title);
    const existing = await prisma.post.findUnique({ where: { slug } });
    if (existing) {
       slug = `${slug}-${Math.random().toString(36).substring(2, 7)}`;
    }

    // Construct valid Prisma creation data, aligning with the actual database schema
    // and using type-assertions to satisfy the stagnant local TypeScript environment.
    const creationData = {
      title: postData.title,
      slug,
      content: postData.content as Prisma.InputJsonValue,
      readingTime,
      tags: postData.tags || '',
      coverImage: postData.coverImage || null,
      excerpt: postData.excerpt || null,
      status: postData.status || "DRAFT",
    } as unknown as Prisma.PostCreateInput;

    const post = await prisma.post.create({
      data: creationData,
    });

    // Integrated Live Revalidation
    revalidatePath('/blog');
    revalidatePath(`/blog/${post.slug}`);
    revalidatePath('/admin/dashboard');
    revalidatePath('/admin/posts');
    
    return apiSuccess(post, 201);
  } catch (error) {
    console.error("Strategy Entry Error:", error);
    return handleApiError(error);
  }
}
