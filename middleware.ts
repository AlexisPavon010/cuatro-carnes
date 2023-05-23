// middleware.ts
import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {

  const session: any = await getToken({ req, secret: process.env.AUTH_JWT_SECRET })

  if (!session) {
    const { protocol, host, pathname } = req.nextUrl;
    return NextResponse.redirect(`${protocol}//${host}/auth/signin?p=${pathname}`);
  }

  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    if (session.user.role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/checkout/:path*', '/dashboard/:path*', '/account-settings'],
}