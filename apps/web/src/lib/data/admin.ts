'use client'

import { createClient } from '@/lib/supabase/client'

// Canonical four-role model lives in roles.ts. Re-exported for existing callers.
export { ROLE_OPTIONS, roleLabel } from './roles'

// --- Workspace -------------------------------------------------------------
export interface Workspace {
  id: string
  name: string
  organization: string | null
  country: string | null
  timezone: string | null
  language: string | null
  currency: string | null
}

export async function getWorkspace(): Promise<Workspace | null> {
  const { data, error } = await createClient()
    .from('workspaces').select('*').order('created_at', { ascending: true }).limit(1).maybeSingle()
  if (error) throw error
  return (data as Workspace) ?? null
}

export async function updateWorkspace(id: string, patch: Partial<Workspace>): Promise<void> {
  const { error } = await createClient().from('workspaces').update(patch).eq('id', id)
  if (error) throw error
}

// --- Profile ---------------------------------------------------------------
export interface Profile {
  id: string
  name: string
  email: string | null
  role: string
  avatar_color: string | null
}

export async function getMyProfile(): Promise<Profile | null> {
  const supabase = createClient()
  const { data: a } = await supabase.auth.getUser()
  const uid = a.user?.id
  if (!uid) return null
  const { data, error } = await supabase.from('profiles').select('*').eq('id', uid).maybeSingle()
  if (error) throw error
  return (data as Profile) ?? null
}

export async function updateMyProfile(patch: { name?: string }): Promise<void> {
  const supabase = createClient()
  const { data: a } = await supabase.auth.getUser()
  const uid = a.user?.id
  if (!uid) throw new Error('Not signed in')
  const { error } = await supabase.from('profiles').update(patch).eq('id', uid)
  if (error) throw error
  if (patch.name) await supabase.auth.updateUser({ data: { name: patch.name } })
}

// --- Team / memberships ----------------------------------------------------
export interface Member {
  membershipId: string
  userId: string
  name: string
  email: string | null
  role: string
}

export async function listMembers(workspaceId: string): Promise<Member[]> {
  const { data, error } = await createClient()
    .from('memberships')
    .select('id, role, user:profiles(id, name, email)')
    .eq('workspace_id', workspaceId)
  if (error) throw error
  const rows = (data ?? []) as unknown as Record<string, unknown>[]
  return rows.map((m) => {
    const u = (m.user ?? {}) as Record<string, unknown>
    return {
      membershipId: String(m.id),
      userId: String(u.id ?? ''),
      name: String(u.name ?? '—'),
      email: (u.email as string) ?? null,
      role: String(m.role ?? 'contributor'),
    }
  })
}

export async function updateMemberRole(membershipId: string, role: string): Promise<void> {
  const { error } = await createClient().from('memberships').update({ role }).eq('id', membershipId)
  if (error) throw error
}

// --- Invitations -----------------------------------------------------------
export interface WorkspaceInvite {
  id: string
  email: string
  role: string
  created_at: string
}

export async function listInvites(workspaceId: string): Promise<WorkspaceInvite[]> {
  const { data, error } = await createClient()
    .from('workspace_invites')
    .select('id, email, role, created_at')
    .eq('workspace_id', workspaceId)
    .order('created_at', { ascending: true })
  if (error) throw error
  return (data ?? []) as WorkspaceInvite[]
}

export async function createInvite(workspaceId: string, email: string, role: string): Promise<void> {
  const supabase = createClient()
  const { data: a } = await supabase.auth.getUser()
  const { error } = await supabase
    .from('workspace_invites')
    .upsert({ workspace_id: workspaceId, email: email.trim().toLowerCase(), role, invited_by: a.user?.id }, { onConflict: 'workspace_id,email' })
  if (error) throw error
}

export async function deleteInvite(id: string): Promise<void> {
  const { error } = await createClient().from('workspace_invites').delete().eq('id', id)
  if (error) throw error
}
