export type PostStatus = 'DRAFT' | 'PUBLISHED';

export interface Post {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  excerpt?: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any; // TipTap JSON
  tags: string[];
  coverImage?: string | null;
  readingTime: number;
  featured: boolean;
  trending: boolean;
  status: PostStatus;
  layoutType: 'editorial' | 'magazine' | 'report' | 'minimal' | 'spotlight';
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  role: 'ADMIN' | 'USER';
  name?: string | null;
}
