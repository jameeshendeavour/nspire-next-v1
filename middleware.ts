import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the AuthToken and userRole from cookies (or localStorage on the client-side)
  const authToken = request.cookies.get('access_token')?.value;
  const userRole = request.cookies.get('user_role')?.value;
  const { pathname } = request.nextUrl;

  if(authToken && pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  if (!authToken && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If AuthToken exists, redirect based on userRole
  if (authToken) {
    if (userRole === 'User' && pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/home', request.url));
    } else if (userRole === 'Admin' && pathname.startsWith('/home')) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
  }

  // Allow the request to continue if no redirection is needed
  return NextResponse.next();
}

// Define the routes where the middleware should run
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login page (to avoid infinite redirects)
     */
    '/((?!_next/static|_next/image|favicon.ico|images).*)',
  ],
};
