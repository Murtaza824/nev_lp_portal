import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { formatUSD } from '@/lib/format'
import { ChangePasswordForm } from '@/components/lp/ChangePasswordForm'
import type { Profile, LpEntity } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Account',
  robots: { index: false, follow: false },
}

type ProfileWithEntity = Profile & {
  lp_entities: LpEntity | null
}

export default async function AccountPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: rawProfile } = await supabase
    .from('profiles')
    .select('*, lp_entities(*)')
    .eq('id', user.id)
    .single()

  const profile = rawProfile as ProfileWithEntity | null
  const entity: LpEntity | null = profile?.lp_entities ?? null

  const effectiveCommitment =
    entity?.commitment_amount ?? profile?.commitment_amount ?? 0
  const displayName =
    entity?.name ?? profile?.full_name ?? 'Your account'
  const email = profile?.email ?? user.email ?? ''

  return (
    <div className="mx-auto max-w-[640px] px-4 py-10 md:px-8 animate-fade-up">
      {/* Profile card */}
      <div className="rounded-card border border-border-hairline bg-surface p-6 mb-6">
        <h1 className="font-fraunces text-heading-mobile md:text-heading text-ink-primary mb-5">
          Your account
        </h1>

        <div className="flex flex-col gap-4">
          {/* Name */}
          <div>
            <p className="font-inter text-caption uppercase tracking-[0.08em] text-ink-secondary mb-0.5">
              Name
            </p>
            <p className="font-inter font-medium text-body text-ink-primary">
              {displayName}
            </p>
          </div>

          {/* Entity (if applicable and distinct from personal name) */}
          {entity?.name && profile?.full_name && entity.name !== profile.full_name && (
            <div>
              <p className="font-inter text-caption uppercase tracking-[0.08em] text-ink-secondary mb-0.5">
                LP entity
              </p>
              <p className="font-inter text-body text-ink-primary">{entity.name}</p>
            </div>
          )}

          {/* Email */}
          <div>
            <p className="font-inter text-caption uppercase tracking-[0.08em] text-ink-secondary mb-0.5">
              Email
            </p>
            <p className="font-inter text-body text-ink-secondary">{email}</p>
          </div>

          {/* Commitment */}
          <div>
            <p className="font-inter text-caption uppercase tracking-[0.08em] text-ink-secondary mb-0.5">
              Your commitment
            </p>
            <p className="font-mono text-mono-md text-ink-primary">
              {effectiveCommitment > 0 ? formatUSD(effectiveCommitment) : '—'}
            </p>
          </div>
        </div>
      </div>

      {/* Security card */}
      <div className="rounded-card border border-border-hairline bg-surface p-6">
        <h2 className="font-fraunces text-heading-mobile md:text-heading text-ink-primary mb-5">
          Security
        </h2>
        <ChangePasswordForm />
      </div>
    </div>
  )
}
