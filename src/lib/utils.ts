import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const _DEBUG_ = true;

export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w-]+/g, '')    // Remove all non-word chars
    .replace(/--+/g, '-')       // Replace multiple - with single -
    .replace(/^-+/, '')         // Trim - from start of text
    .replace(/-+$/, '');        // Trim - from end of text
}

export function calculateReadingTime(content: string | unknown) {
  // Simple word count for TipTap JSON or string
  const text = typeof content === "string" ? content : JSON.stringify(content);
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return minutes;
}
