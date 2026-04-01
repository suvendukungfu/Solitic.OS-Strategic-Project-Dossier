import { z } from "zod";

export const postSchema = z.object({
  id: z.string().nullable().optional(),
  title: z.string().min(1, "Title is mandatory for institutional records."),
  slug: z.string().optional(), // Can be auto-generated if missing
  content: z.unknown().optional(), // TipTap JSONContent
  excerpt: z.string().nullable().optional(),
  coverImage: z.string().nullable().optional(),
  tags: z.string().nullable().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
});

export type PostInput = z.infer<typeof postSchema>;
