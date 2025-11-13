import { NextResponse } from 'next/server';
import { auth } from '@/auth';
export async function proxy(request) {
  const protectedRoutes = ['/dashboard', '/posts/new'];
  const pathname = request.nextUrl.pathname;
  const needAuth = protectedRoutes.some((route) => pathname.startsWith(route));

  if (!needAuth) return NextResponse.next();

  const session = await auth();
  // debug (увидишь в серверных логах терминала)
  console.log('[proxy]', { pathname, needAuth, user: session?.user?.email });
  if (!session?.user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ['/dashboard/:path*', '/posts/new'],
};
