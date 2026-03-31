import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function test() {
  const slug = 'digital-transformation-regulatory-compliance';
  console.log('Testing query for slug:', slug);
  try {
    const post = await prisma.post.findUnique({
      where: { slug: slug },
    });
    console.log('Post found:', post?.title);
  } catch (error) {
    console.error('PRISMA ERROR:', error);
  } finally {
    await prisma.$disconnect();
  }
}

test();
