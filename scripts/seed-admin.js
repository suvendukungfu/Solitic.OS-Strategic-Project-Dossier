import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool } from '@neondatabase/serverless';

// 1. Resolve path to .env (Relative to this script in /scripts)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../.env');

// 2. Load environment variables IMMEDIATELY
dotenv.config({ path: envPath });

console.log('--- 🛡️  Solitic Seed Debugger ---');
console.log('Loading .env from:', envPath);
console.log('DATABASE_URL found:', process.env.DATABASE_URL ? '✅ Yes' : '❌ No');

if (!process.env.DATABASE_URL) {
  console.error('❌ CRITICAL ERROR: DATABASE_URL is missing.');
  console.log('Please ensure your .env file contains: DATABASE_URL="your-connection-string"');
  process.exit(1);
}

// 3. Initialize Prisma with the Adapter (Prisma 7 Factory Pattern)
const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@goldendynasty.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'SoliticAdmin2026!';

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: 'System Admin',
      role: 'ADMIN',
    },
  });

  console.log('Admin user seeded:', admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
