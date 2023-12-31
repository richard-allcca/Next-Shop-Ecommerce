import { NextResponse, type NextRequest } from 'next/server';
import { isValidElement } from 'react';

export async function authMiddleware(req: NextRequest) {
  const previousPage = req.nextUrl.pathname;

  if (previousPage.startsWith('/checkout')) {
    console.log('entro');
        
    const token = req.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.redirect(
        new URL(`/auth/login?p=${previousPage}`, req.url)
      );
    }

    try {
      await isValidElement(token);
      return NextResponse.next();

    } catch (error) {

      return NextResponse.redirect(
        new URL(`/auth/login?p=${previousPage}`, req.url)
      );
    }
  }
}

export const config = {
  matcher: ['/checkout/:path*'],
};