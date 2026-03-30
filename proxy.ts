import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

// 1. Initialize the next-intl middleware
const routingMiddleware = createMiddleware({
  locales: ['en', 'id'],
  defaultLocale: 'en',
  
  // Disabling detection prevents the browser from aggressively overriding
  // the user's manual language selection. Great choice for a portfolio!
  localeDetection: false 
});

// 2. THE FIX: Next.js strictly requires the middleware to be the default export.
export default function middleware(request: NextRequest) {
  return routingMiddleware(request);
}

export const config = {
  // 3. THE CATCH-ALL MATCHER
  // Intercepts everything EXCEPT internal Next.js files, APIs, static images, 
  // and your Sanity Studio routes (/admin, /studio).
  matcher: ['/((?!api|_next|_vercel|admin|studio|.*\\..*).*)']
};