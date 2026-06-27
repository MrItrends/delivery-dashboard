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

  return workspaceId
}

/** Lazily guarantee a workspace exists for users who skipped onboarding. */
export async function ensureWorkspaceId(): Promise<string> {
  const existing = await getCurrentWorkspaceId()
  if (existing) return existing
  return provisionWorkspace({ name: 'My workspace' })
}
