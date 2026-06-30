'use client'

import { useQuery } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'
import type { ObjectStatus } from '@/components/primitives/StatusChip'

export interface Finance { budget: number; spent: number }

/** Health from spend against budget: comfortably under → healthy; near the
 *  limit → at risk; over budget → critical. No budget yet → healthy. */
export function deriveSpendHealth({ budget, spent }: Finance): ObjectStatus {
  if (budget <= 0) return 'healthy'
  const ratio = spent / budget
  if (ratio > 1) return 'critical'
  if (ratio >= 0.9) return 'at-risk'
  return 'healthy'
}

interface Iv { ancestor: string; budget: number; spent: number }

/** Sum the interventions' budget + spend beneath each row of `table`. */
async function interventionsByAncestor(table: string, ids: string[]): Promise<Iv[]> {
  const supabase = createClient()
  if (ids.length === 0) return []
  const num = (v: unknown) => Number(v ?? 0)
  const rec = (a: unknown) => a as Record<string, unknown>

  if (table === 'interventions') {
    const { data } = await supabase.from('interventions').select('id, budget, spent').in('id', ids).eq('archived', false)
    return (data ?? []).map((i) => ({ ancestor: String(rec(i).id), budget: num(rec(i).budget), spent: num(rec(i).spent) }))
  }
  if (table === 'projects') {
    const { data } = await supabase.from('interventions').select('project_id, budget, spent').in('project_id', ids).eq('archived', false)
    return (data ?? []).map((i) => ({ ancestor: String(rec(i).project_id), budget: num(rec(i).budget), spent: num(rec(i).spent) }))
  }
  // priority_areas / portfolios — resolve the chain down to interventions.
  let paIds = ids
  const paToTarget = new Map<string, string>()
  if (table === 'portfolios') {
    const { data: pas } = await supabase.from('priority_areas').select('id, portfolio_id').in('portfolio_id', ids).eq('archived', false)
    for (const pa of pas ?? []) paToTarget.set(String(rec(pa).id), String(rec(pa).portfolio_id))
    paIds = [...paToTarget.keys()]
  } else {
    for (const id of ids) paToTarget.set(id, id)
  }
  if (paIds.length === 0) return []
  const { data: projs } = await supabase.from('projects').select('id, priority_area_id').in('priority_area_id', paIds).eq('archived', false)
  const projToTarget = new Map<string, string>()
  for (const p of projs ?? []) { const pa = String(rec(p).priority_area_id); projToTarget.set(String(rec(p).id), paToTarget.get(pa) ?? pa) }
  const projIds = [...projToTarget.keys()]
  if (projIds.length === 0) return []
  const { data: ivs } = await supabase.from('interventions').select('project_id, budget, spent').in('project_id', projIds).eq('archived', false)
  return (ivs ?? []).map((i) => ({ ancestor: projToTarget.get(String(rec(i).project_id)) ?? '', budget: num(rec(i).budget), spent: num(rec(i).spent) }))
}

export async function getFinanceRollup(table: string, ids: string[]): Promise<Record<string, Finance>> {
  const rows = await interventionsByAncestor(table, ids)
  const out: Record<string, Finance> = {}
  for (const id of ids) out[id] = { budget: 0, spent: 0 }
  for (const r of rows) {
    if (!r.ancestor || !out[r.ancestor]) continue
    out[r.ancestor].budget += r.budget
    out[r.ancestor].spent += r.spent
  }
  return out
}

export function useFinanceRollup(table: string, ids: string[]) {
  const key = ids.slice().sort().join(',')
  return useQuery({
    queryKey: ['finance', table, key],
    queryFn: () => getFinanceRollup(table, ids),
    enabled: ids.length > 0,
  })
}
