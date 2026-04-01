import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const ALLOWED_ROLES = new Set(['ADMIN', 'EDITOR']);

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (pathname === '/admin/login') {
    if (token && ALLOWED_ROLES.has(String(token.role ?? ''))) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    return NextResponse.next();
  }

  if (!token || !ALLOWED_ROLES.has(String(token.role ?? ''))) {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('callbackUrl', `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
