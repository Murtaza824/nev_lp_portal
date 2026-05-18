import { NextResponse } from 'next/server'
import type { EmailOtpType } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/server'

/**
 * Auth callback route — handles two flows:
 *
 * 1. PKCE code exchange (magic links): ?code=xxx
 *    Supabase sends a short-lived `code`; we exchange it for a session.
 *
 * 2. Token hash (invite emails): ?token_hash=xxx&type=invite
 *    Supabase invite emails use verifyOtp. After verification the LP is
 *    redirected to /account so they can set their password.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const tokenHash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/dashboard'

  const supabase = createClient()

  // PKCE flow (magic links)
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const redirectTo =
        next && next.startsWith('/') && !next.startsWith('//') ? next : '/dashboard'
      return NextResponse.redirect(`${origin}${redirectTo}`)
    }
  }

  // Token hash flow (invite emails, email confirmation)
  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash })
    if (!error) {
      // Invite: send LP to account page to set their password
      const redirectTo = type === 'invite' ? '/account' : next
      return NextResponse.redirect(`${origin}${redirectTo}`)
    }
  }

  // All flows failed — back to login
  return NextResponse.redirect(`${origin}/login?error=auth`)
}
