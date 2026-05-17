'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function ChangePasswordForm() {
  const [open, setOpen] = useState(false)
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    const { error: updateError } = await supabase.auth.updateUser({ password })
    setLoading(false)

    if (updateError) {
      setError(updateError.message)
      return
    }

    setSuccess(true)
    setOpen(false)
    setPassword('')
    setConfirm('')
  }

  return (
    <div className="flex flex-col gap-3">
      {success && (
        <p className="font-inter text-caption text-accent-positive">
          Password updated successfully.
        </p>
      )}

      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="w-full h-12 md:h-10 rounded-input border border-border-hairline bg-surface px-4 font-inter text-body text-ink-primary hover:bg-surface-warm transition-colors duration-200 text-left"
        >
          Change password
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label
              htmlFor="new-password"
              className="block font-inter text-caption uppercase tracking-[0.08em] text-ink-secondary mb-1"
            >
              New password
            </label>
            <input
              id="new-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              minLength={8}
              required
              className="w-full h-12 md:h-10 rounded-input border border-border-hairline bg-surface px-3 font-inter text-body text-ink-primary placeholder:text-ink-tertiary focus:outline-none focus:ring-2 focus:ring-accent-positive"
            />
          </div>
          <div>
            <label
              htmlFor="confirm-password"
              className="block font-inter text-caption uppercase tracking-[0.08em] text-ink-secondary mb-1"
            >
              Confirm password
            </label>
            <input
              id="confirm-password"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              autoComplete="new-password"
              required
              className="w-full h-12 md:h-10 rounded-input border border-border-hairline bg-surface px-3 font-inter text-body text-ink-primary placeholder:text-ink-tertiary focus:outline-none focus:ring-2 focus:ring-accent-positive"
            />
          </div>
          {error && (
            <p className="font-inter text-caption text-accent-negative">{error}</p>
          )}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 h-12 md:h-10 rounded-input bg-ink-primary px-4 font-inter text-body text-canvas hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? 'Saving…' : 'Save password'}
            </button>
            <button
              type="button"
              onClick={() => {
                setOpen(false)
                setError(null)
                setPassword('')
                setConfirm('')
              }}
              className="h-12 md:h-10 rounded-input border border-border-hairline bg-surface px-4 font-inter text-body text-ink-primary hover:bg-surface-warm transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

    </div>
  )
}
