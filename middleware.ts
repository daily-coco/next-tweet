import getSession from './lib/session';
import { NextRequest, NextResponse } from 'next/server';

interface Routes {
  [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
  '/': true,
  '/login': true,
  '/join': true,
  '/tweet': true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const exists = publicOnlyUrls[request.nextUrl.pathname];

  if (!session.id) {
    if (!exists) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else {
    const user = session;
    if (exists && user.username) {
      return NextResponse.redirect(
        new URL(`/users/${user.username}`, request.url)
      );
    }
  }
}
export const config = {
  matcher: ['/', '/((?!api|_next|favicon.ico).*)'],
};
