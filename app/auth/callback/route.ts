import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * Auth callback route — required for PKCE flow (magic links and invite emails).
 *
 * Supabase Auth sends a short-lived `code` in the redirect URL. This handler
 * exchanges the code for a session, sets the session cookies, then redirects
 * the user to their destination.
 *
 * Without this handler, middleware would intercept the code-bearing URL,
 * see no session cookie, and redirect to /login — dropping the code.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const redirectTo =
        next && next.startsWith('/') && !next.startsWith('//')
          ? next
          : '/dashboard'
      return NextResponse.redirect(`${origin}${redirectTo}`)
    }
  }

  // Exchange failed or no code — send to login with a generic error param
  return NextResponse.redirect(`${origin}/login?error=auth`)
}
