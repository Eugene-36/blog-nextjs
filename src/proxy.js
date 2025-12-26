'use server';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
export async function proxy(request) {
  const protectedRoutes = ['/dashboard', '/posts/new', '/admin'];
  const pathname = request.nextUrl.pathname;
  const needAuth = protectedRoutes.some((route) => pathname.startsWith(route));

  if (!needAuth) return NextResponse.next();

  const session = await auth();

  if (!session?.user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  if (pathname.startsWith('/admin') && session.user.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ['/dashboard/:path*', '/posts/new', '/admin/:path*'],
};
