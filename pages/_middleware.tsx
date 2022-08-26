// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextResponse } from 'next/server';

export function middleware(req: any) {
  const { token } = req.cookies;
  const url = req.url;

  if (token && url === '/login') {
    return NextResponse.redirect('/dashboard');
  }
}
