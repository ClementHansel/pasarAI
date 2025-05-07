import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyAccessToken } from '@/lib/middleware'

// Define public paths that don't require authentication
const publicPaths = [
  '/',
  '/market',
  '/products',
  '/login',
  '/register',
  '/forgot-password',
  '/api/auth/login',
  '/api/auth/register'
]

// Paths that require seller authentication
const sellerPaths = [
  '/seller',
  '/dashboard',
  '/products/create',
  '/products/edit'
]

// Paths that require buyer authentication
const buyerPaths = [
  '/cart',
  '/checkout',
  '/wishlist',
  '/orders'
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Allow public paths
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  // Get token from cookie
  const token = request.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Verify token and get user role
  const user = verifyAccessToken(token)
  
  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Check seller-only paths
  if (sellerPaths.some(path => pathname.startsWith(path))) {
    if (user.role !== 'SELLER') {
      return NextResponse.redirect(new URL('/market', request.url))
    }
  }

  // Check buyer-only paths
  if (buyerPaths.some(path => pathname.startsWith(path))) {
    if (user.role !== 'BUYER') {
      return NextResponse.redirect(new URL('/market', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}