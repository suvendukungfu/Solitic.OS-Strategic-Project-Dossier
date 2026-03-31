export type PostStatus = 'DRAFT' | 'PUBLISHED';

export interface Post {
  id: string;
  title: string;
  slug: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any; // TipTap JSON
  coverImage?: string | null;
  excerpt?: string | null;
  tags: string[];
  status: PostStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  role: 'ADMIN' | 'USER';
  name?: string | null;
}
