'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Logo } from '@/components/ui/Logo'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [magicLoading, setMagicLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [magicSent, setMagicSent] = useState(false)

  const supabase = createClient()

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      // Generic message — do not reveal whether email exists
      setError('Incorrect email or password. Please try again.')
      setLoading(false)
      return
    }

    router.push('/dashboard')
  }

  async function handleMagicLink() {
    if (!email) {
      setError('Enter your email address first.')
      return
    }
    setError(null)
    setMagicLoading(true)

    const { error: otpError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin + '/auth/callback?next=/dashboard',
      },
    })

    setMagicLoading(false)

    if (otpError) {
      // Generic — never confirm/deny whether email is registered
      setError('Something went wrong. Please try again.')
      return
    }

    setMagicSent(true)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-5 py-12 md:px-0">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center">
          <Logo className="h-8 w-auto text-ink-primary" />
        </div>

        {/* Subhead */}
        <p className="mt-4 text-center font-inter text-body text-ink-secondary">
          Limited partner portal
        </p>

        {/* Form */}
        <form onSubmit={handleSignIn} className="mt-8 flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="font-inter text-caption uppercase tracking-widest text-ink-secondary"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 w-full rounded-input border border-border-hairline bg-surface px-3 font-inter text-body text-ink-primary placeholder:text-ink-tertiary focus:border-ink-secondary focus:outline-none focus:ring-0 md:h-10"
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="font-inter text-caption uppercase tracking-widest text-ink-secondary"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 w-full rounded-input border border-border-hairline bg-surface px-3 pr-10 font-inter text-body text-ink-primary placeholder:text-ink-tertiary focus:border-ink-secondary focus:outline-none focus:ring-0 md:h-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 font-inter text-caption text-ink-tertiary hover:text-ink-secondary"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <p className="font-inter text-caption text-accent-negative" role="alert">
              {error}
            </p>
          )}

          {/* Sign in button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 h-12 w-full rounded-input bg-ink-primary font-inter text-body font-medium text-white transition-opacity duration-200 ease-out hover:opacity-90 disabled:opacity-50 md:h-10"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative mt-6 flex items-center">
          <div className="flex-1 border-t border-border-hairline" />
          <span className="mx-3 font-inter text-caption text-ink-tertiary">or</span>
          <div className="flex-1 border-t border-border-hairline" />
        </div>

        {/* Magic link */}
        {magicSent ? (
          <p className="mt-4 text-center font-inter text-body text-ink-secondary">
            Magic link sent — check your inbox.
          </p>
        ) : (
          <button
            type="button"
            onClick={handleMagicLink}
            disabled={magicLoading}
            className="mt-4 h-12 w-full rounded-input border border-border-hairline bg-surface font-inter text-body text-ink-primary transition-colors duration-200 ease-out hover:bg-surface-warm disabled:opacity-50 md:h-10"
          >
            {magicLoading ? 'Sending…' : 'Email me a magic link'}
          </button>
        )}

        {/* Footer */}
        <p className="mt-6 text-center font-inter text-caption text-ink-tertiary">
          Access by invitation only.{' '}
          <a
            href="mailto:ir@neweraventures.com"
            className="underline hover:text-ink-secondary"
          >
            Contact ir@neweraventures.com
          </a>
        </p>
      </div>
    </div>
  )
}
