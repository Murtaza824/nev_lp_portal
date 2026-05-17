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
  const [error, setError] = useState<string | null>(null)

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
      setError('Incorrect email or password. Please try again.')
      setLoading(false)
      return
    }

    router.push('/dashboard')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-5 py-12 md:px-0">
      <div className="animate-fade-up w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center">
          <Logo className="h-8 w-auto text-ink-primary" />
        </div>

        {/* Subhead */}
        <p className="mt-4 text-center font-inter text-body text-ink-secondary">
          Limited Partner portal
        </p>

        {/* Form */}
        <form onSubmit={handleSignIn} className="mt-8 flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="font-inter text-caption uppercase text-ink-secondary"
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
              className="font-inter text-caption uppercase text-ink-secondary"
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
                className="h-12 w-full rounded-input border border-border-hairline bg-surface px-3 pr-12 font-inter text-body text-ink-primary placeholder:text-ink-tertiary focus:border-ink-secondary focus:outline-none focus:ring-0 md:h-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-1 top-1/2 -translate-y-1/2 flex min-h-[44px] min-w-[44px] items-center justify-center p-2 font-inter text-caption text-ink-secondary hover:text-ink-primary transition-colors"
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
            className="mt-2 h-[52px] w-full rounded-input bg-ink-primary font-inter text-body font-medium text-white transition-opacity duration-200 ease-out hover:opacity-90 disabled:opacity-50 md:h-10"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center font-inter text-caption text-ink-tertiary">
          Access by invitation only.
        </p>
      </div>
    </div>
  )
}
