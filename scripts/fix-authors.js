
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.post.updateMany({
    where: {
      author: 'Golden Dynasty Counsel'
    },
    data: {
      author: 'Solitic Consulting'
    }
  });

  console.log(`Updated ${result.count} posts from 'Golden Dynasty Counsel' to 'Solitic Consulting'.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
