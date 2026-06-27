'use client'

import { createClient } from '@/lib/supabase/client'

// --- Roles -----------------------------------------------------------------
export const ROLE_OPTIONS = [
  { value: 'admin', label: 'Administrator' },
  { value: 'executive', label: 'Executive' },
  { value: 'portfolio-manager', label: 'Portfolio Manager' },
  { value: 'programme-manager', label: 'Programme Manager' },
  { value: 'project-manager', label: 'Project Manager' },
  { value: 'delivery-team', label: 'Delivery Team' },
  { value: 'finance', label: 'Finance' },
  { value: 'observer', label: 'Observer' },
]
export const roleLabel = (v: string) => ROLE_OPTIONS.find((r) => r.value === v)?.label ?? v

// --- Workspace -------------------------------------------------------------
export interface Workspace {
  id: string
  name: string
  organization: string | null
  country: string | null
  timezone: string | null
  language: string | null
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
