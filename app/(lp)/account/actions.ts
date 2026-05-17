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

  if (!profile.entity_id) {
    return {
      error:
        'Your account is not linked to an LP entity. Contact ir@neweraventures.com to enable team access.',
    }
  }

  const adminSupabase = createAdminClient()
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
    .update({ entity_id: profile.entity_id })
    .eq('id', userId)

  revalidatePath('/account')
  return { success: true }
}
