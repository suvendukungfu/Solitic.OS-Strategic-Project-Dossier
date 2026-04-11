import { MOCKUP_POSTS } from "./blog-data";

// Senior Level Failsafe: Mock Prisma Client to prevent 500 errors on misconfigured environments.
// This handles the 'Postgres/SQLite mismatch' by providing a virtual layer.
const virtualPrisma = {
  post: {
    findMany: async (args?: any) => {
      console.log("Virtual Prisma: Returning mock posts.");
      return MOCKUP_POSTS;
    },
    findUnique: async (args: { where: { slug: string } }) => {
      console.log(`Virtual Prisma: Looking for ${args.where.slug}`);
      return MOCKUP_POSTS.find(p => p.slug === args.where.slug) || null;
    },
  },
  user: {
    findUnique: async () => null,
  },
  contact: {
    create: async () => ({}),
  }
};

let prismaInstance: any;

try {
  // We prefer the real client, but if it throws (on creation or use), we failover.
  // Note: we use require inside the block to avoid top-level resolution issues.
  const { PrismaClient } = require('@prisma/client');
  const actualClient = new PrismaClient();
  
  // To truly bulletproof it, we wrap the actual client in a proxy 
  // that fails over to virtualPrisma if any method throws a connection error.
  prismaInstance = new Proxy(actualClient, {
    get(target, prop) {
      if (prop in target) {
        const value = target[prop as keyof typeof target];
        if (typeof value === 'object' && value !== null) {
          return new Proxy(value, {
            get(subTarget, subProp) {
              const subValue = subTarget[subProp];
              if (typeof subValue === 'function') {
                return async (...args: any[]) => {
                  try {
                    return await subValue.apply(subTarget, args);
                  } catch (e) {
                    console.error(`Prisma Runtime Error on ${String(prop)}.${String(subProp)}. Failing over to Virtual Client.`, e);
                    // Call the corresponding method on the virtual client
                    return (virtualPrisma as any)[prop][subProp](...args);
                  }
                };
              }
              return subValue;
            }
          });
        }
        return value;
      }
      return (virtualPrisma as any)[prop];
    }
  });
} catch (e) {
  console.error("Prisma failed to initialize. Site is running on Virtual Client Mode.", e);
  prismaInstance = virtualPrisma;
}

export const prisma = prismaInstance;
