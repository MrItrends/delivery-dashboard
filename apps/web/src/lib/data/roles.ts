'use client'

import { useQuery } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'
import type { SelectOption } from '@/lib/onboarding/options'

// =============================================================================
// The FOUR canonical roles (TBI deck, p.23). Not eight. See docs/NORTH_STAR.md §4.
// =============================================================================
export type Role = 'admin' | 'priority-area-lead' | 'intervention-lead' | 'regular'

export const ROLE_OPTIONS: SelectOption[] = [
  { value: 'admin', label: 'Administrator' },
  { value: 'priority-area-lead', label: 'Priority area lead' },
  { value: 'intervention-lead', label: 'Intervention lead' },
  { value: 'regular', label: 'Regular user' },
]

export const ROLE_DESCRIPTIONS: Record<Role, string> = {
  admin: 'Full access. Approves milestones, manages financiers and people.',
  'priority-area-lead': 'Leads or co-leads a priority area. Creates and edits its actions and milestones, and manages its people.',
  'intervention-lead': 'Leads or co-leads an intervention. Creates and edits its actions and milestones, and manages its people.',
  regular: 'Updates their own actions and raises issues. No edit rights elsewhere.',
}

export const roleLabel = (v: string | null | undefined) =>
  ROLE_OPTIONS.find((r) => r.value === normalizeRole(v))?.label ?? 'Regular user'

/** Map any legacy/8-role value onto the four canonical roles. */
export function normalizeRole(v: string | null | undefined): Role {
  switch (v) {
    case 'admin':
    case 'administrator':
    case 'executive':
      return 'admin'
    case 'priority-area-lead':
    case 'portfolio-manager':
    case 'programme-manager':
      return 'priority-area-lead'
    case 'intervention-lead':
    case 'project-manager':
      return 'intervention-lead'
    default:
      return 'regular'
  }
}

// --- Capabilities ----------------------------------------------------------
export interface Capabilities {
  canCreate: boolean
  canEdit: boolean
  canArchive: boolean
  canApprove: boolean
  canManageUsers: boolean
  canManageWorkspace: boolean
}

export function capabilitiesFor(role: Role | string | null | undefined): Capabilities {
  switch (normalizeRole(role)) {
    case 'admin':
      return { canCreate: true, canEdit: true, canArchive: true, canApprove: true, canManageUsers: true, canManageWorkspace: true }
    case 'priority-area-lead':
    case 'intervention-lead':
      return { canCreate: true, canEdit: true, canArchive: true, canApprove: false, canManageUsers: false, canManageWorkspace: false }
    default:
      return { canCreate: false, canEdit: false, canArchive: false, canApprove: false, canManageUsers: false, canManageWorkspace: false }
  }
}

// --- Current user's role ---------------------------------------------------
export async function getMyRole(): Promise<Role> {
  const supabase = createClient()
  const { data: a } = await supabase.auth.getUser()
  if (!a.user) return 'regular'
  const { data: m } = await supabase.from('memberships').select('role').eq('user_id', a.user.id).limit(1).maybeSingle()
  // A member's capabilities come from their workspace role.
  if (m?.role) return normalizeRole(m.role as string)
  // No membership yet → this user is bootstrapping their own workspace, so they
  // own it: treat them as admin. Creating their first object makes this real.
  return 'admin'
}

export function useMyRole() {
  return useQuery({ queryKey: ['my-role'], queryFn: getMyRole, staleTime: 5 * 60_000 })
}

/** Capabilities for the signed-in user. Defaults to least-privilege while loading. */
export function useCapabilities(): Capabilities & { role: Role; isLoading: boolean } {
  const { data, isLoading } = useMyRole()
  return { ...capabilitiesFor(data), role: data ?? 'regular', isLoading }
}
