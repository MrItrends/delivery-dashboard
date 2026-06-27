'use client'

import { createClient } from '@/lib/supabase/client'
import { getCurrentWorkspaceId } from './portfolios'

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'workspace'
}

export interface ProvisionInput {
  name: string
  organization?: string
  country?: string
  timezone?: string
  language?: string
  currency?: string
  portfolioName?: string
  portfolioOwner?: string
  portfolioDescription?: string
  invites?: { email: string; role: string }[]
}

/** Create the user's own workspace (and optional first portfolio) from their
 *  onboarding details. Reuses an existing workspace rather than duplicating. */
export async function provisionWorkspace(input: ProvisionInput): Promise<string> {
  const supabase = createClient()

  let workspaceId = await getCurrentWorkspaceId()
  if (!workspaceId) {
    const { data, error } = await supabase.from('workspaces').insert({
      name: input.name?.trim() || 'My workspace',
      identifier: `${slugify(input.name || 'workspace')}-${Math.random().toString(36).slice(2, 6)}`,
      organization: input.organization || null,
      country: input.country || 'ng',
      timezone: input.timezone || 'Africa/Lagos',
      language: input.language || 'en-GB',
      currency: input.currency || 'NGN',
    }).select('id').single()
    if (error) throw error
    workspaceId = data.id as string
  }

  // Owner membership (admin). Ignore if it already exists.
  const { data: auth } = await supabase.auth.getUser()
  if (auth.user) {
    await supabase.from('memberships')
      .upsert({ user_id: auth.user.id, workspace_id: workspaceId, role: 'admin' }, { onConflict: 'user_id,workspace_id', ignoreDuplicates: true })
  }

  // Optional first portfolio.
  if (input.portfolioName?.trim()) {
    await supabase.from('portfolios').insert({
      workspace_id: workspaceId,
      name: input.portfolioName.trim(),
      owner: input.portfolioOwner || null,
      description: input.portfolioDescription || null,
      health: 'healthy', budget_health: 'healthy', risk_level: 'healthy',
    })
  }

  // Pending invitations — collaborators join this workspace when they sign up.
  const invites = (input.invites ?? []).filter((i) => i.email.trim())
  if (invites.length > 0 && auth.user) {
    await supabase.from('workspace_invites').upsert(
      invites.map((i) => ({ workspace_id: workspaceId, email: i.email.trim().toLowerCase(), role: i.role, invited_by: auth.user!.id })),
      { onConflict: 'workspace_id,email' }
    )
  }

  return workspaceId
}

/** Lazily guarantee a workspace exists for users who skipped onboarding. */
export async function ensureWorkspaceId(): Promise<string> {
  const existing = await getCurrentWorkspaceId()
  if (existing) return existing
  return provisionWorkspace({ name: 'My workspace' })
}

// --- Parent-chain provisioning --------------------------------------------
// Used when a user creates a child object in an otherwise-empty workspace.
// We reuse the existing ancestor where one exists, and only create a default
// when none does. The user can rename any default afterwards.

async function firstId(table: string): Promise<string | null> {
  const { data } = await createClient().from(table).select('id').eq('archived', false).order('created_at', { ascending: true }).limit(1).maybeSingle()
  return (data?.id as string) ?? null
}

async function ensurePortfolioId(): Promise<string> {
  const existing = await firstId('portfolios')
  if (existing) return existing
  const supabase = createClient()
  const workspaceId = await ensureWorkspaceId()
  const { data: ws } = await supabase.from('workspaces').select('name').eq('id', workspaceId).maybeSingle()
  const name = (ws?.name as string)?.trim() || 'General'
  const { data, error } = await supabase.from('portfolios')
    .insert({ workspace_id: workspaceId, name, health: 'healthy', budget_health: 'healthy', risk_level: 'healthy' })
    .select('id').single()
  if (error) throw error
  return data.id as string
}

async function ensurePriorityAreaId(): Promise<string> {
  const existing = await firstId('priority_areas')
  if (existing) return existing
  const portfolioId = await ensurePortfolioId()
  const { data, error } = await createClient().from('priority_areas')
    .insert({ portfolio_id: portfolioId, name: 'General priority area', health: 'healthy', budget_health: 'healthy', target_status: 'healthy' })
    .select('id').single()
  if (error) throw error
  return data.id as string
}

async function ensureProjectId(): Promise<string> {
  const existing = await firstId('projects')
  if (existing) return existing
  const priorityAreaId = await ensurePriorityAreaId()
  const { data, error } = await createClient().from('projects')
    .insert({ priority_area_id: priorityAreaId, name: 'General project', health: 'healthy', budget_health: 'healthy', delivery_confidence: 'healthy', status: 'planned' })
    .select('id').single()
  if (error) throw error
  return data.id as string
}

async function ensureInterventionId(): Promise<string> {
  const existing = await firstId('interventions')
  if (existing) return existing
  const projectId = await ensureProjectId()
  const { data, error } = await createClient().from('interventions')
    .insert({ project_id: projectId, name: 'General intervention', status: 'planned', health: 'healthy', budget_health: 'healthy' })
    .select('id').single()
  if (error) throw error
  return data.id as string
}

/** Resolve (creating if needed) the parent id for a child entity created with
 *  no parent selected. Returns null for top-level entities. */
export async function ensureParentId(childKey: string): Promise<string | null> {
  switch (childKey) {
    case 'priorityArea': return ensurePortfolioId()
    case 'project': return ensurePriorityAreaId()
    case 'intervention': return ensureProjectId()
    case 'activity': return ensureInterventionId()
    default: return null
  }
}
