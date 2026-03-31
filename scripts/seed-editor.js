import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'editor@goldendynasty.com';
  const password = await hash('SoliticEditor2026!', 10);

  const userRole = 'EDITOR';

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      password,
      role: userRole,
    },
    create: {
      email,
      name: 'Content Editor',
      password,
      role: userRole,
    },
  });

  console.log(`✅ Seeded EDITOR User:\nEmail: ${user.email}\nRole: ${user.role}`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding editor:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
