'use server'

import { createAdminClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function inviteLP(formData: FormData) {
  const email = (formData.get('email') as string | null)?.trim()
  const fullName = (formData.get('full_name') as string | null)?.trim()
  const commitmentRaw = formData.get('commitment_amount') as string | null
  const commitmentAmount = commitmentRaw ? parseFloat(commitmentRaw) : null

  if (!email) {
    return { error: 'Email is required.' }
  }

  const adminSupabase = createAdminClient()

  // Invite the user — do NOT pass role in metadata (trigger always assigns 'lp')
  const { data: inviteData, error: inviteError } = await adminSupabase.auth.admin.inviteUserByEmail(
    email,
    {
      data: fullName ? { full_name: fullName } : {},
    }
  )

  if (inviteError) {
    return { error: inviteError.message }
  }

  const userId = inviteData.user?.id
  if (!userId) {
    return { error: 'Invite succeeded but no user ID returned.' }
  }

  // Update profile with commitment amount if provided
  if (commitmentAmount !== null && !isNaN(commitmentAmount)) {
    await adminSupabase
      .from('profiles')
      .update({ commitment_amount: commitmentAmount })
      .eq('id', userId)
  }

  revalidatePath('/admin/users')
  return { success: true }
}

export async function updateCommitment(formData: FormData) {
  const userId = formData.get('user_id') as string | null
  const commitmentRaw = formData.get('commitment_amount') as string | null

  if (!userId || !commitmentRaw) {
    return { error: 'User ID and commitment amount are required.' }
  }

  const commitmentAmount = parseFloat(commitmentRaw)
  if (isNaN(commitmentAmount)) {
    return { error: 'Invalid commitment amount.' }
  }

  const adminSupabase = createAdminClient()
  const { error } = await adminSupabase
    .from('profiles')
    .update({ commitment_amount: commitmentAmount })
    .eq('id', userId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/users')
  return { success: true }
}
