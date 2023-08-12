import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const dashboardRoutes = path === '/';
    const isLogin = path === '/login';
    const isRegister = path === '/register';
    const isVerifyOtpRoute = path === '/verifyOtp';
    const hasToken = request.cookies.get('access_token')?.value || undefined;
    const hasTemporaryToken = request.cookies.get('temporary-token')?.value || undefined;

    console.log('dashboard >', dashboardRoutes);
    console.log('hasToken >', hasToken);
    if (path === '/' && !hasToken) return NextResponse.redirect(new URL('/login', request.url));
    if (isVerifyOtpRoute && hasToken) return NextResponse.redirect(new URL('/', request.url));
    if (isLogin && hasTemporaryToken) return NextResponse.redirect(new URL('/verifyOtp', request.url));
    if (dashboardRoutes && hasTemporaryToken) return NextResponse.redirect(new URL('/login', request.url));
    if (isLogin && hasToken) return NextResponse.redirect(new URL('/', request.url));
    if (isVerifyOtpRoute && !hasTemporaryToken && !hasToken) return NextResponse.redirect(new URL('/login', request.url));
    if (isRegister && (hasToken || hasTemporaryToken)) return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
    matcher: ['/register', '/login', '/verifyOtp'],
};

