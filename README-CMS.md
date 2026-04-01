# Golden Dynasty Blog CMS

A production-grade, premium Blog Content Management System built with Next.js, TipTap, and Prisma.

## Features
- **Medium-Inspired UI**: Clean typography and minimalistic design for reading pleasure.
- **Rich Text Editor**: Integrated with TipTap for headings, images, links, and bold/italic.
- **Admin Dashboard**: Manage, edit, and delete stories from a central gate.
- **Draft Workflow**: Save stories as drafts before publishing them to the public listing.
- **Search & Filtering**: Real-time client-side search and tag-based filtering.
- **NextAuth Integration**: Secure credentials-based login for administrators.
- **SEO Ready**: Dynamic meta tags and optimized slugs.

## Tech Stack
- **Frontend**: Next.js 14+ (App Router)
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS + Framer Motion
- **Editor**: TipTap Rich Text Editor
- **Auth**: NextAuth.js

## Setup Instructions

1. **Environment Variables**:
   Update the `.env` file with your database credentials:
   ```env
   DATABASE_URL="file:./prisma/dev.db"
   NEXTAUTH_SECRET="your-secret"
   NEXTAUTH_URL="http://localhost:3000"
   NEXT_PUBLIC_SITE_URL="http://localhost:3000"
   RESEND_API_KEY="re_xxx"
   CONTACT_TO_EMAIL="contact@solitic.in"
   CONTACT_FROM_EMAIL="onboarding@resend.dev"
   ```

2. **Database Initialization**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

3. **Seed Admin User**:
   Run the seeding script to create your initial admin account:
   ```bash
   npm run db:seed
   ```
   *Default Credentials*:
   - Email: `admin@goldendynasty.com`
   - Password: `SoliticAdmin2026!`

4. **Run Development Server**:
   ```bash
   npm run db:push
   npm run dev
   ```

5. **Access CMS**:
   Navigate to `/admin/login` to authenticate and start writing stories.

## Deployment Notes

- `next.config.mjs` is configured with `output: 'standalone'` for Node hosting and reverse-proxy/domain setups.
- Set `NEXT_PUBLIC_SITE_URL` and `NEXTAUTH_URL` to your final production domain so metadata, sitemap, robots, and auth callbacks resolve correctly.
- If you deploy to an ephemeral/serverless host, move uploads and the database off local disk. The current local `public/uploads` and SQLite setup are suitable for persistent Node/VPS hosting, not stateless storage.

## Architecture
- `/app/blog`: Public-facing blog listing and story pages.
- `/app/admin`: CMS dashboard and management interface.
- `/app/api`: Clean RESTful API routes for stories and authentication.
- `/components`: Modular, reusable blocks (Editor, Cards, UI).
- `/lib`: Singleton instances and utility helpers.
- `/prisma`: Data models and schema.
