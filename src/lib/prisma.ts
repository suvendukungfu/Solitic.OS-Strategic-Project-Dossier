import type { PrismaClient } from '@prisma/client';
import { MOCKUP_POSTS } from "./blog-data";
import { env } from "./env";

// ─────────── ARCHITECTURAL HARDENING: LATE-BOUND PRISMA ───────────

interface VirtualPost {
  findMany: (args?: unknown) => Promise<unknown[]>;
  findUnique: (args: { where: { slug?: string; id?: string } }) => Promise<unknown | null>;
  findFirst: (args?: unknown) => Promise<unknown | null>;
  create: (args: { data: unknown }) => Promise<unknown>;
  update: (args: { where: unknown; data: unknown }) => Promise<unknown>;
  delete: (args: { where: unknown }) => Promise<unknown>;
  count: () => Promise<number>;
}

// ─────────── VIRTUAL PERSISTENCE STORE ───────────
// We use a global singleton to persist data across HMR in development.
const INITIAL_STORE = {
  posts: [...MOCKUP_POSTS] as Record<string, unknown>[],
  messages: [
    {
      id: "m-1",
      name: "Rajiv Malhotra",
      email: "rajiv@financialcorp.in",
      phone: "+91-98765-43210",
      company: "Financial Corp",
      subject: "Corporate Advisory Inquiry",
      message: "We are interested in a strategic overhaul of our legal compliance framework for upcoming M&A activity.",
      createdAt: new Date("2026-04-12T14:30:00Z"),
    },
    {
      id: "m-2",
      name: "Elena Gilbert",
      email: "elena@vanguard.com",
      phone: "+1-555-0199",
      company: "Vanguard Tech",
      subject: "Editorial Intelligence Partnership",
      message: "Seeking to collaborate on high-level legal content for our global investor newsletter.",
      createdAt: new Date("2026-04-13T09:15:00Z"),
    }
  ] as Record<string, unknown>[]
};

declare global {
  var virtualStore: { 
    posts: Record<string, unknown>[]; 
    messages: Record<string, unknown>[]; 
  } | undefined;
}

const VIRTUAL_STORE = globalThis.virtualStore || INITIAL_STORE;
if (process.env.NODE_ENV !== 'production') globalThis.virtualStore = VIRTUAL_STORE;

const virtualPrisma = {
  post: {
    findMany: async (args?: unknown) => {
      console.log("Virtual Client: post.findMany", args);
      return VIRTUAL_STORE.posts;
    },
    findUnique: async (args: { where: { slug?: string; id?: string } }) => {
      console.log("Virtual Client: post.findUnique", args);
      if (args.where.slug) return VIRTUAL_STORE.posts.find(p => (p as Record<string, unknown>).slug === args.where.slug) || null;
      if (args.where.id) return VIRTUAL_STORE.posts.find(p => (p as Record<string, unknown>).id === args.where.id) || null;
      return null;
    },
    findFirst: async (args?: unknown) => {
      console.log("Virtual Client: post.findFirst", args);
      return VIRTUAL_STORE.posts[0] || null;
    },
    create: async ({ data }: { data: Record<string, unknown> }) => {
      console.log("Virtual Client: post.create", data);
      const newPost = { 
        ...data, 
        id: `v-${Math.random().toString(36).substring(2, 11)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      VIRTUAL_STORE.posts.unshift(newPost);
      return newPost;
    },
    update: async ({ where, data }: { where: Record<string, unknown>; data: Record<string, unknown> }) => {
      console.log("Virtual Client: post.update", where, data);
      const id = where.id as string;
      const index = VIRTUAL_STORE.posts.findIndex(p => (p as Record<string, unknown>).id === id);
      if (index !== -1) {
        VIRTUAL_STORE.posts[index] = { ...VIRTUAL_STORE.posts[index], ...data, updatedAt: new Date().toISOString() };
        return VIRTUAL_STORE.posts[index];
      }
      return { ...data, ...where };
    },
    delete: async ({ where }: { where: Record<string, unknown> }) => {
      console.log("Virtual Client: post.delete", where);
      const id = where.id as string;
      const index = VIRTUAL_STORE.posts.findIndex(p => (p as Record<string, unknown>).id === id);
      if (index !== -1) VIRTUAL_STORE.posts.splice(index, 1);
      return { id };
    },
    count: async () => VIRTUAL_STORE.posts.length,
  } as VirtualPost,
  user: {
    findUnique: async (args: { where: { email: string } }) => {
      console.log("Virtual Client: user.findUnique", args);
      if (args.where.email === env.ADMIN_EMAIL) {
        return {
          id: 'admin-id',
          email: env.ADMIN_EMAIL,
          name: 'Solitic Admin',
          role: 'ADMIN',
          password: '$2a$10$XmP1v0v3qP3l4ZJ0a9k9eO6f5r5u7v8w9x0y1z2a3b4c5d6e7f8g'
        };
      }
      return null;
    },
    findFirst: async () => null,
  },
  contact: {
    findMany: async (args?: unknown) => {
      console.log("Virtual Client: contact.findMany", args);
      return VIRTUAL_STORE.messages;
    },
    findUnique: async (args: { where: { id: string } }) => {
      console.log("Virtual Client: contact.findUnique", args);
      return VIRTUAL_STORE.messages.find(m => m.id === args.where.id) || null;
    },
    create: async ({ data }: { data: Record<string, unknown> }) => {
      console.log("Virtual Client: contact.create", data);
      const newMessage = { ...data, id: `m-${Date.now()}`, createdAt: new Date() };
      VIRTUAL_STORE.messages.unshift(newMessage);
      return newMessage;
    },
    delete: async ({ where }: { where: Record<string, unknown> }) => {
      console.log("Virtual Client: contact.delete", where);
      const id = where.id as string;
      const index = VIRTUAL_STORE.messages.findIndex(m => m.id === id);
      if (index !== -1) VIRTUAL_STORE.messages.splice(index, 1);
      return { id };
    },
  }
};

let PrismaClientClass: unknown = null;

const getPrismaClientClass = async () => {
  if (PrismaClientClass) return PrismaClientClass as { new (options: unknown): PrismaClient };
  try {
    const { PrismaClient } = await import('@prisma/client');
    PrismaClientClass = PrismaClient;
    return PrismaClient;
  } catch (e) {
    return null;
  }
};

const prismaClientSingleton = async () => {
  const Client = await getPrismaClientClass();
  if (!Client) return null;
  try {
    return new (Client as { new (options: unknown): PrismaClient })({
      datasources: { db: { url: env.DATABASE_URL } },
      log: ['error'],
    });
  } catch (e) {
    return null; 
  }
};

declare global {
  var prismaGlobal: undefined | Promise<PrismaClient | null>;
}

const actualPrismaPromise = globalThis.prismaGlobal ?? prismaClientSingleton();
if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = actualPrismaPromise;

export const prisma = new Proxy({} as Record<string, unknown>, {
  get(_, prop: string) {
    const virtualModel = (virtualPrisma as unknown as Record<string, Record<string, (...a: unknown[]) => Promise<unknown>>>)[prop];

    // Handle the top-level model access (e.g. prisma.post)
    if (virtualModel) {
      return new Proxy(virtualModel as object, {
        get(target, method: string) {
          return async (...args: unknown[]) => {
            const client = await actualPrismaPromise;
            // Use unknown double-cast to safely access dynamic properties without 'any'
            const model = client 
              ? (client as unknown as Record<string, Record<string, (...a: unknown[]) => Promise<unknown>>>)[prop] 
              : null;

            if (model && typeof model[method] === 'function') {
              try {
                return await model[method](...args);
              } catch (e) {
                console.error(`Prisma Failover: ${prop}.${method} failed. using virtual.`, e);
                return (target as Record<string, (...a: unknown[]) => Promise<unknown>>)[method](...args);
              }
            }
            return (target as Record<string, (...a: unknown[]) => Promise<unknown>>)[method](...args);
          };
        }
      });
    }

    return (virtualPrisma as unknown as Record<string, Record<string, (...a: unknown[]) => Promise<unknown>>>)[prop];
  }
}) as unknown as PrismaClient;
