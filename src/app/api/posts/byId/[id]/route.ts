import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  const user = session?.user as { role?: string; email?: string } | undefined;

  if (!session || user?.role !== 'ADMIN') {
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

  if (!session || user?.role !== 'ADMIN') {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const resolvedParams = await params;
    const body = await req.json();
    const updateData = { ...body };
    if (updateData.tags && Array.isArray(updateData.tags)) {
      updateData.tags = updateData.tags.join(',');
    }
    
    const post = await prisma.post.update({
      where: { id: resolvedParams.id },
      data: updateData,
    });
    
    const transformedPost = {
      ...post,
      tags: typeof post.tags === 'string' ? post.tags.split(',') : []
    };
    
    return NextResponse.json(transformedPost);
  } catch (error) {
    return NextResponse.json({ message: "Update failed" }, { status: 400 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  const user = session?.user as { role?: string; email?: string } | undefined;

  if (!session || user?.role !== 'ADMIN') {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const resolvedParams = await params;
    await prisma.post.delete({
      where: { id: resolvedParams.id },
    });
    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    return NextResponse.json({ message: "Delete failed" }, { status: 500 });
  }
}
