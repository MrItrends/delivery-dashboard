import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

type CookieToSet = { name: string; value: string; options?: CookieOptions }

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Routes reachable without a session.
const PUBLIC_PREFIXES = [
  '/login', '/signup', '/forgot-password', '/reset-password', '/check-email',
  '/expired-link', '/account-locked', '/session-expired', '/signing-in',
  '/error', '/contact-administrator', '/auth',
]

function isPublic(pathname: string) {
  return PUBLIC_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + '/'))
}

export async function middleware(request: NextRequest) {
  // If Supabase isn't configured (e.g. env not set on this deploy), don't guard —
  // the app keeps working rather than 500-ing.
  if (!url || !anon) return NextResponse.next()

  let response = NextResponse.next({ request })

  const supabase = createServerClient(url, anon, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet: CookieToSet[]) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        response = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        )
      },
    },
  })

  const { data: { user } } = await supabase.auth.getUser()
  const path = request.nextUrl.pathname

  if (!user && !isPublic(path)) {
    const redirect = new URL('/login', request.url)
    return NextResponse.redirect(redirect)
  }
  if (user && (path === '/login' || path === '/signup')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return response
}

export const config = {
  // Run on everything except static assets and files with an extension.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.[\\w]+$).*)'],
}
