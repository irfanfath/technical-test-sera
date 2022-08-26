/* eslint-disable @next/next/no-server-import-in-page */
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { token } = request.cookies;
  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.rewrite(url);
  }
}
