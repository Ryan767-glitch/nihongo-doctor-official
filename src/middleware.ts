import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Get hostname of request (e.g. localhost:3000, nihongo-doctor-global.vercel.app)
    const hostname = request.headers.get('host') || request.nextUrl.hostname;

    // Check if the request is coming from a vercel.app domain
    if (hostname.endsWith('.vercel.app')) {
        // Redirect to the main canonical domain
        const mainDomain = 'https://nihongo-doctor.com';
        const redirectUrl = new URL(request.nextUrl.pathname + request.nextUrl.search, mainDomain);

        // Use 301 Permanent Redirect for SEO transfer
        return NextResponse.redirect(redirectUrl, 301);
    }

    // Otherwise continue normally
    return NextResponse.next();
}

// Config to run middleware only on specific paths (we want all paths except specific static files)
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
