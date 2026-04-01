import type { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';
import { absoluteUrl } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = ['/', '/about', '/blog', '/contact', '/login'].map(
    (route) => ({
      url: absoluteUrl(route),
      lastModified: new Date(),
      changeFrequency: route === '/blog' ? 'daily' : 'weekly',
      priority: route === '/' ? 1 : 0.7,
    }),
  );

  try {
    const posts = await prisma.post.findMany({
      where: { status: 'PUBLISHED' },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: 'desc' },
    });

    return [
      ...staticRoutes,
      ...posts.map((post) => ({
        url: absoluteUrl(`/blog/${post.slug}`),
        lastModified: post.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      })),
    ];
  } catch (error) {
    console.error('[sitemap] Falling back to static routes:', error);
    return staticRoutes;
  }
}
