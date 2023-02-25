
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  console.log('middleware');
  console.log(request.url);
  const requestHeaders = new Headers(request.headers);
  const token = request.cookies.get('token')?.value;
  if (token) {
    requestHeaders.set('token', token);
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
}