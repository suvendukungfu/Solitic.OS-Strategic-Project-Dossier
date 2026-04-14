import { PrismaClient } from '@prisma/client';
import { MOCKUP_POSTS } from "./blog-data";

// Type definitions for the virtual client to ensure type safety
interface VirtualPost {
  findMany: (args?: unknown) => Promise<unknown[]>;
  findUnique: (args: { where: { slug?: string; id?: string } }) => Promise<unknown | null>;
  findFirst: (args?: unknown) => Promise<unknown | null>;
  create: (args: { data: unknown }) => Promise<unknown>;
  update: (args: { where: unknown; data: unknown }) => Promise<unknown>;
  delete: (args: { where: unknown }) => Promise<unknown>;
  count: () => Promise<number>;
}

const virtualPrisma = {
  post: {
    findMany: async (args?: unknown) => {
      console.log("Virtual Client: post.findMany", args);
      return MOCKUP_POSTS;
    },
    findUnique: async (args: { where: { slug?: string; id?: string } }) => {
      console.log("Virtual Client: post.findUnique", args);
      if (args.where.slug) return MOCKUP_POSTS.find(p => p.slug === args.where.slug) || null;
      if (args.where.id) return MOCKUP_POSTS.find(p => p.id === args.where.id) || null;
      return null;
    },
    findFirst: async (args?: unknown) => {
      console.log("Virtual Client: post.findFirst", args);
      return MOCKUP_POSTS[0] || null;
    },
    create: async ({ data }: { data: unknown }) => {
      console.log("Virtual Client: post.create", data);
      return { ...(data as Record<string, unknown>), id: `v-${Math.random().toString(36).substring(2, 11)}` };
    },
    update: async ({ where, data }: { where: unknown; data: unknown }) => {
      console.log("Virtual Client: post.update", where, data);
      return { ...(data as Record<string, unknown>), ...(where as Record<string, unknown>) };
    },
    delete: async ({ where }: { where: unknown }) => {
      console.log("Virtual Client: post.delete", where);
      return { id: (where as Record<string, unknown>).id };
    },
    count: async () => MOCKUP_POSTS.length,
  } as VirtualPost,
  user: {
    findUnique: async (args: unknown) => {
      console.log("Virtual Client: user.findUnique", args);
      return null;
    },
    findFirst: async () => null,
  },
  contact: {
    create: async ({ data }: { data: unknown }) => {
      console.log("Virtual Client: contact.create", data);
      return { ...(data as Record<string, unknown>), id: 'temp-id' };
    },
  }
};

import { env } from "./env";

// ... (interface definitions)

const prismaClientSingleton = () => {
  return new PrismaClient({
    datasources: {
      db: {
        url: env.DATABASE_URL,
      },
    },
  });
};

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const actualPrisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = actualPrisma;

// Create a failover proxy
export const prisma = new Proxy(actualPrisma, {
  get(target, prop) {
    // TypeScript/Linting safety for symbols
    if (typeof prop !== 'string') {
      return target[prop as keyof PrismaClient];
    }

    const value = (target as unknown as Record<string, unknown>)[prop];
    
    if (typeof value === 'object' && value !== null) {
      return new Proxy(value as object, {
        get(subTarget, subProp) {
          if (typeof subProp !== 'string') {
            return (subTarget as Record<string | symbol, unknown>)[subProp];
          }

          const subValue = (subTarget as Record<string, unknown>)[subProp];
          if (typeof subValue === 'function') {
            return async (...args: unknown[]) => {
              try {
                return await subValue.apply(subTarget, args);
              } catch (e) {
                console.error(`Prisma Runtime Error on ${prop}.${subProp}. Failing over to Virtual Client.`, e);
                const virtualModel = (virtualPrisma as Record<string, unknown>)[prop];
                if (virtualModel && typeof virtualModel === 'object') {
                  const virtualMethod = (virtualModel as Record<string, unknown>)[subProp];
                  if (typeof virtualMethod === 'function') {
                    return virtualMethod(...args);
                  }
                }
                throw e; // Rethrow if no virtual fallback exists
              }
            };
          }
          return subValue;
        }
      });
    }
    
    if (value === undefined && (virtualPrisma as Record<string, unknown>)[prop] !== undefined) {
      return (virtualPrisma as Record<string, unknown>)[prop];
    }
    
    return value;
  }
}) as unknown as PrismaClient;
