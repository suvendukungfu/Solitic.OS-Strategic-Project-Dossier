import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool } from '@neondatabase/serverless';

const prismaClientSingleton = () => {
  // In Prisma 7, we can pass the Pool to PrismaNeon, 
  // but if types conflict, we ensure the Pool matches the expected interface.
  const neonPool = new Pool({ connectionString: process.env.DATABASE_URL });
  // @ts-expect-error - PrismaNeon expects a Pool from a specific version of the driver, but the serverless driver is compatible.
  const adapter = new PrismaNeon(neonPool); 
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
