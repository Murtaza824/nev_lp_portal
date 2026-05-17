'use server'

import { createClient, createAdminClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import type { Profile } from '@/lib/types'

export async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut()
  redirect('/login')
}

export async function inviteTeamMember(formData: FormData) {
  const email = (formData.get('email') as string | null)?.trim()
  const fullName = (formData.get('full_name') as string | null)?.trim()

  if (!email) return { error: 'Email is required.' }

  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated.' }

  const { data: profileData } = await supabase
    .from('profiles')
    .select('entity_id, role')
    .eq('id', user.id)
    .single()
  const profile = profileData as Pick<Profile, 'entity_id' | 'role'> | null

  if (!profile || profile.role !== 'lp') {
    return { error: 'Only LPs can invite team members.' }
  }

  const adminSupabase = createAdminClient()

  let entityId = profile.entity_id

  if (!entityId) {
    // Auto-create an entity for this LP so they can invite team members
    const { data: fullProfile } = await supabase
      .from('profiles')
      .select('full_name, commitment_amount, email')
      .eq('id', user.id)
      .single()
    const fp = fullProfile as Pick<Profile, 'full_name' | 'commitment_amount' | 'email'> | null
    const entityName = fp?.full_name ?? fp?.email ?? 'My entity'

    const { data: newEntity, error: entityError } = await adminSupabase
      .from('lp_entities')
      .insert({ name: entityName, commitment_amount: fp?.commitment_amount ?? null })
      .select()
      .single()

    if (entityError || !newEntity) {
      return { error: entityError?.message ?? 'Could not create entity for team access.' }
    }

    await adminSupabase
      .from('profiles')
      .update({ entity_id: newEntity.id })
      .eq('id', user.id)

    entityId = newEntity.id
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://lp.neweraventures.com')

  const { data: inviteData, error: inviteError } =
    await adminSupabase.auth.admin.inviteUserByEmail(email, {
      data: fullName ? { full_name: fullName } : {},
      redirectTo: `${siteUrl}/auth/callback`,
    })

  if (inviteError) return { error: inviteError.message }

  const userId = inviteData.user?.id
  if (!userId) return { error: 'Invite succeeded but no user ID returned.' }

  await adminSupabase
    .from('profiles')
    .update({ entity_id: entityId })
    .eq('id', userId)

  revalidatePath('/account')
  return { success: true }
}
