'use client'

import { useQuery } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'
import type { ObjectStatus } from '@/components/primitives/StatusChip'

export type Health = 'healthy' | 'at-risk' | 'critical'

const today = () => new Date().toISOString().slice(0, 10)

interface Act { status: string; due_date: string | null }

/** Roll a set of activities up to a single traffic-light:
 *  any overdue → critical; any blocked/at-risk → at risk; else healthy. */
export function deriveHealth(acts: Act[]): Health {
  if (acts.length === 0) return 'healthy'
  const t = today()
  const overdue = acts.some((a) => a.due_date && a.due_date < t && a.status !== 'complete')
  if (overdue) return 'critical'
  if (acts.some((a) => a.status === 'blocked' || a.status === 'at-risk')) return 'at-risk'
  return 'healthy'
}

/** Fetch the activities beneath each row of `table`, keyed by that row's id. */
async function activitiesByAncestor(table: string, ids: string[]): Promise<Map<string, Act[]>> {
  const supabase = createClient()
  const map = new Map<string, Act[]>()
  if (ids.length === 0) return map

  // Resolve activities and the ancestor id at the requested level.
  let actToAncestor: { ancestor: string; status: string; due_date: string | null }[] = []

  if (table === 'interventions') {
    const { data } = await supabase.from('activities').select('status, due_date, intervention_id').in('intervention_id', ids).eq('archived', false)
    actToAncestor = (data ?? []).map((a) => ({ ancestor: String((a as Record<string, unknown>).intervention_id), status: String((a as Record<string, unknown>).status), due_date: ((a as Record<string, unknown>).due_date as string) ?? null }))
  } else if (table === 'projects') {
    const { data: ivs } = await supabase.from('interventions').select('id, project_id').in('project_id', ids).eq('archived', false)
    const ivToProj = new Map((ivs ?? []).map((i) => [String((i as Record<string, unknown>).id), String((i as Record<string, unknown>).project_id)]))
    const ivIds = [...ivToProj.keys()]
    if (ivIds.length) {
      const { data } = await supabase.from('activities').select('status, due_date, intervention_id').in('intervention_id', ivIds).eq('archived', false)
      actToAncestor = (data ?? []).map((a) => ({ ancestor: ivToProj.get(String((a as Record<string, unknown>).intervention_id)) ?? '', status: String((a as Record<string, unknown>).status), due_date: ((a as Record<string, unknown>).due_date as string) ?? null }))
    }
  } else if (table === 'priority_areas' || table === 'portfolios') {
    // Map priority areas (directly, or via portfolios) → activities.
    let paIds = ids
    const paToTarget = new Map<string, string>()
    if (table === 'portfolios') {
      const { data: pas } = await supabase.from('priority_areas').select('id, portfolio_id').in('portfolio_id', ids).eq('archived', false)
      for (const pa of pas ?? []) paToTarget.set(String((pa as Record<string, unknown>).id), String((pa as Record<string, unknown>).portfolio_id))
      paIds = [...paToTarget.keys()]
    } else {
      for (const id of ids) paToTarget.set(id, id)
    }
    if (paIds.length) {
      const { data: projs } = await supabase.from('projects').select('id, priority_area_id').in('priority_area_id', paIds).eq('archived', false)
      const projToTarget = new Map<string, string>()
      for (const p of projs ?? []) { const pa = String((p as Record<string, unknown>).priority_area_id); projToTarget.set(String((p as Record<string, unknown>).id), paToTarget.get(pa) ?? pa) }
      const projIds = [...projToTarget.keys()]
      if (projIds.length) {
        const { data: ivs } = await supabase.from('interventions').select('id, project_id').in('project_id', projIds).eq('archived', false)
        const ivToTarget = new Map<string, string>()
        for (const i of ivs ?? []) { const pr = String((i as Record<string, unknown>).project_id); ivToTarget.set(String((i as Record<string, unknown>).id), projToTarget.get(pr) ?? '') }
        const ivIds = [...ivToTarget.keys()]
        if (ivIds.length) {
          const { data } = await supabase.from('activities').select('status, due_date, intervention_id').in('intervention_id', ivIds).eq('archived', false)
          actToAncestor = (data ?? []).map((a) => ({ ancestor: ivToTarget.get(String((a as Record<string, unknown>).intervention_id)) ?? '', status: String((a as Record<string, unknown>).status), due_date: ((a as Record<string, unknown>).due_date as string) ?? null }))
        }
      }
    }
  }

  for (const a of actToAncestor) {
    if (!a.ancestor) continue
    ;(map.get(a.ancestor) ?? map.set(a.ancestor, []).get(a.ancestor)!).push({ status: a.status, due_date: a.due_date })
  }
  return map
}

export async function getHealthMap(table: string, ids: string[]): Promise<Record<string, Health>> {
  const byAncestor = await activitiesByAncestor(table, ids)
  const out: Record<string, Health> = {}
  for (const id of ids) out[id] = deriveHealth(byAncestor.get(id) ?? [])
  return out
}

/** Derived health for a set of rows. Activities have their own status, so this
 *  is only meaningful for portfolios/priority areas/projects/interventions. */
export function useHealthMap(table: string, ids: string[]) {
  const key = ids.slice().sort().join(',')
  return useQuery({
    queryKey: ['health', table, key],
    queryFn: () => getHealthMap(table, ids),
    enabled: ids.length > 0 && table !== 'activities',
  })
}

export const asStatus = (h: Health | undefined): ObjectStatus => (h ?? 'healthy') as ObjectStatus
