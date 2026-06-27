'use client'

import { createClient } from '@/lib/supabase/client'
import type { ObjectStatus } from '@/components/primitives/StatusChip'

export interface Portfolio {
  id: string
  workspace_id: string
  name: string
  description: string | null
  owner: string | null
  reporting_period: string | null
  health: ObjectStatus
  budget_health: ObjectStatus
  risk_level: ObjectStatus
  archived: boolean
  created_at: string
  updated_at: string
}

export type PortfolioInput = {
  name: string
  description?: string
  owner?: string
  reporting_period?: string
  health?: ObjectStatus
  budget_health?: ObjectStatus
  risk_level?: ObjectStatus
}

const TABLE = 'portfolios'

/** The first workspace the signed-in user can see (single-workspace for now). */
export async function getCurrentWorkspaceId(): Promise<string | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('workspaces')
    .select('id')
    .order('created_at', { ascending: true })
    .limit(1)
    .maybeSingle()
  if (error) throw error
  return data?.id ?? null
}

export async function listPortfolios(includeArchived = false): Promise<Portfolio[]> {
  const supabase = createClient()
  let query = supabase.from(TABLE).select('*').order('created_at', { ascending: false })
  if (!includeArchived) query = query.eq('archived', false)
  const { data, error } = await query
  if (error) throw error
  return (data ?? []) as Portfolio[]
}

export async function getPortfolio(id: string): Promise<Portfolio | null> {
  const supabase = createClient()
  const { data, error } = await supabase.from(TABLE).select('*').eq('id', id).maybeSingle()
  if (error) throw error
  return (data as Portfolio) ?? null
}

export async function createPortfolio(input: PortfolioInput): Promise<Portfolio> {
  const supabase = createClient()
  const workspaceId = await getCurrentWorkspaceId()
  if (!workspaceId) {
    throw new Error('No workspace found. Create a workspace first.')
  }
  const { data, error } = await supabase
    .from(TABLE)
    .insert({ ...input, workspace_id: workspaceId })
    .select('*')
    .single()
  if (error) throw error
  return data as Portfolio
}

export async function updatePortfolio(id: string, patch: PortfolioInput): Promise<Portfolio> {
  const supabase = createClient()
  const { data, error } = await supabase.from(TABLE).update(patch).eq('id', id).select('*').single()
  if (error) throw error
  return data as Portfolio
}

export async function setPortfolioArchived(id: string, archived: boolean): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase.from(TABLE).update({ archived }).eq('id', id)
  if (error) throw error
}
