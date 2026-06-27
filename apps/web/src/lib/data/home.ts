'use client'

import { createClient } from '@/lib/supabase/client'
import { getMyProfile } from './admin'
import type { ObjectStatus } from '@/components/primitives/StatusChip'

async function countOf(table: string, col?: string, val?: string): Promise<number> {
  let q = createClient().from(table).select('id', { count: 'exact', head: true }).eq('archived', false)
  if (col && val) q = q.eq(col, val)
  const { count } = await q
  return count ?? 0
}

export interface AttentionItem { id: string; type: string; label: string; health: ObjectStatus; href: string | null }
export interface MyActivity { id: string; name: string; status: ObjectStatus; due: string | null; overdue: boolean }
export interface RecentNote { id: string; author: string; body: string; created_at: string }

export interface WorkspaceOverview {
  counts: { portfolios: number; priorityAreas: number; projects: number; interventions: number; activities: number }
  health: { healthy: number; atRisk: number; critical: number }
  needsAttention: AttentionItem[]
  myActivities: MyActivity[]
  recent: RecentNote[]
}

export async function getWorkspaceOverview(): Promise<WorkspaceOverview> {
  const supabase = createClient()
  const me = await getMyProfile()

  const [portfolios, priorityAreas, projects, interventions, activities] = await Promise.all([
    countOf('portfolios'), countOf('priority_areas'), countOf('projects'), countOf('interventions'), countOf('activities'),
  ])

  // Health roll-up across projects (the layer where delivery confidence lives).
  const { data: projHealth } = await supabase.from('projects').select('health').eq('archived', false)
  const ph = (projHealth ?? []) as { health: string }[]
  const health = {
    healthy: ph.filter((r) => r.health === 'healthy').length,
    atRisk: ph.filter((r) => r.health === 'at-risk').length,
    critical: ph.filter((r) => r.health === 'critical').length,
  }

  // Needs attention — anything at-risk or critical, most severe first.
  const needsAttention: AttentionItem[] = []
  const { data: paRisk } = await supabase.from('priority_areas').select('id, name, health').in('health', ['at-risk', 'critical']).eq('archived', false).limit(6)
  for (const r of (paRisk ?? []) as { id: string; name: string; health: ObjectStatus }[]) needsAttention.push({ id: r.id, type: 'Priority area', label: r.name, health: r.health, href: `/priority-areas/${r.id}` })
  const { data: prRisk } = await supabase.from('projects').select('id, name, health').in('health', ['at-risk', 'critical']).eq('archived', false).limit(6)
  for (const r of (prRisk ?? []) as { id: string; name: string; health: ObjectStatus }[]) needsAttention.push({ id: r.id, type: 'Project', label: r.name, health: r.health, href: `/projects/${r.id}` })
  needsAttention.sort((a, b) => (a.health === 'critical' ? -1 : 1) - (b.health === 'critical' ? -1 : 1))

  // My activities — assigned to me, not yet complete.
  let myActivities: MyActivity[] = []
  if (me?.name) {
    const { data } = await supabase.from('activities').select('id, name, status, due_label, overdue').eq('owner', me.name).neq('status', 'complete').eq('archived', false).order('overdue', { ascending: false }).limit(8)
    myActivities = ((data ?? []) as { id: string; name: string; status: ObjectStatus; due_label: string | null; overdue: boolean }[]).map((a) => ({ id: a.id, name: a.name, status: a.status, due: a.due_label, overdue: a.overdue }))
  }

  // Recent activity — latest comments across the workspace.
  const { data: cData } = await supabase.from('comments').select('id, body, created_at, author:profiles(name)').order('created_at', { ascending: false }).limit(6)
  const recent = ((cData ?? []) as unknown as Record<string, unknown>[]).map((c) => ({
    id: String(c.id), body: String(c.body ?? ''), created_at: String(c.created_at ?? ''),
    author: String((c.author as Record<string, unknown> | null)?.name ?? 'Someone'),
  }))

  return { counts: { portfolios, priorityAreas, projects, interventions, activities }, health, needsAttention, myActivities, recent }
}

export interface GettingStarted {
  priorityAreas: number
  interventions: number
  activities: number
  members: number
  reports: number
  complete: boolean
}

export async function getGettingStarted(): Promise<GettingStarted> {
  const [priorityAreas, interventions, activities, members, reports] = await Promise.all([
    countOf('priority_areas'), countOf('interventions'), countOf('activities'),
    createClient().from('memberships').select('id', { count: 'exact', head: true }).then((r) => r.count ?? 0),
    createClient().from('reports').select('id', { count: 'exact', head: true }).then((r) => r.count ?? 0),
  ])
  const complete = priorityAreas > 0 && interventions > 0 && activities > 0 && members > 1 && reports > 0
  return { priorityAreas, interventions, activities, members, reports, complete }
}
