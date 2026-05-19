'use client'

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { EmailOtpType } from '@supabase/supabase-js'

function CallbackHandler() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const supabase = createClient()
    const next = searchParams.get('next') ?? '/dashboard'
    const code = searchParams.get('code')
    const tokenHash = searchParams.get('token_hash')
    const type = searchParams.get('type') as EmailOtpType | null

    async function handle() {
      // PKCE code exchange (magic links)
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error) {
          router.replace(next)
          return
        }
      }

      // Token hash flow (some invite configs)
      if (tokenHash && type) {
        const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash })
        if (!error) {
          const needsPasswordSet = type === 'invite' || type === 'recovery'
          router.replace(needsPasswordSet ? '/auth/set-password' : next)
          return
        }
      }

      // Hash fragment flow — createBrowserClient auto-processes #access_token=...
      // Listen for the SIGNED_IN / PASSWORD_RECOVERY event
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, session) => {
          if ((event === 'SIGNED_IN' || event === 'PASSWORD_RECOVERY') && session) {
            subscription.unsubscribe()
            const hash = window.location.hash
            const needsPasswordSet =
              hash.includes('type=invite') ||
              hash.includes('type=recovery') ||
              type === 'invite' ||
              type === 'recovery'
            router.replace(needsPasswordSet ? '/auth/set-password' : next)
          }
        }
      )

      // If already signed in (race condition), redirect immediately
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        subscription.unsubscribe()
        const hash = window.location.hash
        const needsPasswordSet =
          hash.includes('type=invite') ||
          hash.includes('type=recovery') ||
          type === 'invite' ||
          type === 'recovery'
        router.replace(needsPasswordSet ? '/account' : next)
        return
      }

      // Fallback: nothing resolved after 10s, send to login
      setTimeout(() => {
        subscription.unsubscribe()
        router.replace('/login?error=auth')
      }, 10000)
    }

    handle()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return null
}

export default function AuthCallbackPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas">
      <p className="font-inter text-body text-ink-secondary animate-pulse">
        Signing you in…
      </p>
      <Suspense>
        <CallbackHandler />
      </Suspense>
    </div>
  )
}
