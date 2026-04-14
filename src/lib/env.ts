import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(1),
  NEXTAUTH_URL: z.string().url().optional(),
  ADMIN_EMAIL: z.string().email(),
  ADMIN_PASSWORD: z.string().min(8),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
});

/**
 * Validated environment variables with explicit typing.
 * This ensures that a build hang or runtime crash due to
 * "undefined" secrets is caught at the configuration layer.
 */
const _env = envSchema.safeParse({
  DATABASE_URL: process.env.DATABASE_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
});

if (!_env.success) {
  console.error("❌ Invalid environment variables:", _env.error.format());
  // In production, we throw to prevent insecure/broken startups
  if (process.env.NODE_ENV === "production") {
    throw new Error("Invalid environment variables");
  }
}

export const env = _env.success ? _env.data : {} as z.infer<typeof envSchema>;
