import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import BlogEditor from '@/components/editor/tiptap-editor';

export const dynamic = 'force-dynamic';

export default async function EditPostPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const post = await prisma.post.findUnique({
    where: { id: params.id },
  });

  if (!post) notFound();

  // Strict JSON serialization is critical for Next.js 15.2 to avoid 
  // "Event handlers cannot be passed to Client Component props" if Prisma 
  // objects contain non-serializable properties.
  const serializedPost = JSON.parse(JSON.stringify(post));

  return <BlogEditor initialData={serializedPost} />;
}
