import { NextRequest, NextResponse } from 'next/server';

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const LIMIT = 20; // Allow 20 requests per minute for simulation
const WINDOW = 60 * 1000;

export function middleware(req: NextRequest) {
  const response = NextResponse.next();

  // Security Headers
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(self)');

  // Rate Limiting for API routes
  if (req.nextUrl.pathname.startsWith('/api')) {
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = (typeof forwarded === 'string' ? forwarded.split(',')[0] : forwarded) || 'anonymous';
    const now = Date.now();
    
    const rateData = rateLimitMap.get(ip) || { count: 0, lastReset: now };
    
    if (now - rateData.lastReset > WINDOW) {
      rateData.count = 1;
      rateData.lastReset = now;
    } else {
      rateData.count++;
    }
    
    rateLimitMap.set(ip, rateData);
    
    if (rateData.count > LIMIT) {
      return new NextResponse(
        JSON.stringify({ error: 'Too many requests' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }

  return response;
}

export const config = {
  matcher: '/api/:path*',
};
