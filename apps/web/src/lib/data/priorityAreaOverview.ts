'use client'

import { createClient } from '@/lib/supabase/client'

export interface ActivityBreakdown {
  overdue: number
  completed: number
  ongoing: number
  openIssue: number
  pending: number
}

export interface PriorityAreaCard {
  id: string
  name: string
  mission: string | null
  lead: string | null
  coLead: string | null
  interventionCount: number
  activityCount: number
  pctComplete: number
  budget: number
  funded: number
  spent: number
  breakdown: ActivityBreakdown
}

/** One rich summary card per priority area, aggregated from interventions and
 *  activities beneath it (the "Full Dashboard" overview the client knows). */
export async function listPriorityAreaCards(): Promise<PriorityAreaCard[]> {
  const supabase = createClient()

  const { data: paData } = await supabase
    .from('priority_areas').select('id, name, mission, owner, co_lead').eq('archived', false).order('created_at', { ascending: true })
  const areas = (paData ?? []) as { id: string; name: string; mission: string | null; owner: string | null; co_lead: string | null }[]
  if (areas.length === 0) return []

  const [{ data: projData }, { data: ivData }, { data: actData }, { data: finData }] = await Promise.all([
    supabase.from('projects').select('id, priority_area_id').eq('archived', false),
    supabase.from('interventions').select('id, project_id, budget, spent').eq('archived', false),
    supabase.from('activities').select('intervention_id, status, overdue').eq('archived', false),
    supabase.from('financiers').select('intervention_id, amount'),
  ])

  const projToPa = new Map<string, string>()
  for (const p of (projData ?? []) as { id: string; priority_area_id: string }[]) projToPa.set(p.id, p.priority_area_id)

  const ivToPa = new Map<string, string>()
  const init = (): PriorityAreaCard => ({
    id: '', name: '', mission: null, lead: null, coLead: null,
    interventionCount: 0, activityCount: 0, pctComplete: 0, budget: 0, funded: 0, spent: 0,
    breakdown: { overdue: 0, completed: 0, ongoing: 0, openIssue: 0, pending: 0 },
  })
  const cards = new Map<string, PriorityAreaCard>()
  for (const a of areas) cards.set(a.id, { ...init(), id: a.id, name: a.name, mission: a.mission, lead: a.owner, coLead: a.co_lead })

  for (const iv of (ivData ?? []) as { id: string; project_id: string | null; budget: number | null; spent: number | null }[]) {
    const paId = iv.project_id ? projToPa.get(iv.project_id) : undefined
    if (!paId) continue
    ivToPa.set(iv.id, paId)
    const c = cards.get(paId)
    if (!c) continue
    c.interventionCount += 1
    c.budget += Number(iv.budget ?? 0)
    c.spent += Number(iv.spent ?? 0)
  }

  for (const f of (finData ?? []) as { intervention_id: string; amount: number | null }[]) {
    const paId = ivToPa.get(f.intervention_id)
    if (!paId) continue
    const c = cards.get(paId)
    if (c) c.funded += Number(f.amount ?? 0)
  }

  for (const act of (actData ?? []) as { intervention_id: string | null; status: string; overdue: boolean }[]) {
    const paId = act.intervention_id ? ivToPa.get(act.intervention_id) : undefined
    if (!paId) continue
    const c = cards.get(paId)
    if (!c) continue
    c.activityCount += 1
    if (act.overdue) c.breakdown.overdue += 1
    else if (act.status === 'complete') c.breakdown.completed += 1
    else if (act.status === 'active') c.breakdown.ongoing += 1
    else if (act.status === 'blocked' || act.status === 'at-risk') c.breakdown.openIssue += 1
    else c.breakdown.pending += 1
  }

  for (const c of cards.values()) {
    c.pctComplete = c.activityCount > 0 ? Math.round((c.breakdown.completed / c.activityCount) * 100) : 0
  }

  return Array.from(cards.values())
}
