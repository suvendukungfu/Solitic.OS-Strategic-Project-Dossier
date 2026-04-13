const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const usersCount = await prisma.user.count();
  console.log(`Total users in DB: ${usersCount}`);
  const users = await prisma.user.findMany();
  console.log('Users:', JSON.stringify(users, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
