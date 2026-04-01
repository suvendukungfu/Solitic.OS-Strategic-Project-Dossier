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
    .replace(/\s+/g, '-')      // Replace spaces with -
    .replace(/_/g, '-')        // Replace underscores with -
    .replace(/[^a-z0-9-]/g, '') // Remove all non-alphanumeric chars (except -)
    .replace(/--+/g, '-')      // Replace multiple - with single -
    .replace(/^-+/, '')         // Trim - from start of text
    .replace(/-+$/, '');        // Trim - from end of text
}

export function calculateReadingTime(content: unknown) {
  // Extract text from TipTap JSON or use string directly
  let text = "";
  
  if (typeof content === 'string') {
    text = content;
  } else if (content && typeof content === 'object') {
    // Structural Interface for TipTap traversing
    interface TipTapNode {
      text?: string;
      content?: TipTapNode[];
      [key: string]: unknown;
    }

    const extract = (node: TipTapNode): string => {
      if (node.text) return node.text;
      if (node.content && Array.isArray(node.content)) {
        return node.content.map(extract).join(" ");
      }
      return "";
    };
    text = extract(content as TipTapNode);
  }

  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return minutes;
}
