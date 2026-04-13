import { z } from "zod";

export const postSchema = z.object({
  id: z.string().nullable().optional(),
  title: z.string().min(1, "Title is mandatory for institutional records."),
  slug: z.string().optional(),
  category: z.string().min(1, "Category is required for classification."),
  content: z.unknown().optional(),
  excerpt: z.unknown().optional(), // Changed to unknown for RichText compatibility
  coverImage: z.string().nullable().optional(),
  tags: z.string().nullable().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
  layoutType: z.enum(["editorial", "magazine", "report", "minimal", "spotlight"]).default("editorial"),
  fonts: z.string().default("Inter"),
});

export type PostInput = z.infer<typeof postSchema>;
