'use client'

import { createClient } from '@/lib/supabase/client'
import type { ObjectStatus } from '@/components/primitives/StatusChip'

export interface PaIntervention {
  id: string
  ref: string | null
  name: string
  owner: string | null
  status: ObjectStatus
  budget: number
  spent: number
}
export interface FinanceMethod { method: string; amount: number }

export interface PriorityAreaSummary {
  interventions: PaIntervention[]
  financeMethods: FinanceMethod[]
}

/** All interventions beneath a priority area (across its projects), plus a
 *  rollup of their financiers by method. Powers the PA workspace. */
export async function getPriorityAreaSummary(priorityAreaId: string): Promise<PriorityAreaSummary> {
  const supabase = createClient()

  const { data: projs } = await supabase.from('projects').select('id').eq('priority_area_id', priorityAreaId).eq('archived', false)
  const projIds = (projs ?? []).map((p) => (p as { id: string }).id)
  if (projIds.length === 0) return { interventions: [], financeMethods: [] }

  const { data: ivs } = await supabase.from('interventions')
    .select('id, ref, name, owner, status, budget, spent').in('project_id', projIds).eq('archived', false).order('ref', { ascending: true })
  const interventions: PaIntervention[] = ((ivs ?? []) as Record<string, unknown>[]).map((i) => ({
    id: String(i.id), ref: (i.ref as string) ?? null, name: String(i.name ?? ''), owner: (i.owner as string) ?? null,
    status: (i.status as ObjectStatus) ?? 'planned', budget: Number(i.budget ?? 0), spent: Number(i.spent ?? 0),
  }))

  const ivIds = interventions.map((i) => i.id)
  let financeMethods: FinanceMethod[] = []
  if (ivIds.length > 0) {
    const { data: fins } = await supabase.from('financiers').select('finance_method, amount').in('intervention_id', ivIds)
    const totals = new Map<string, number>()
    for (const f of (fins ?? []) as { finance_method: string | null; amount: number | null }[]) {
      const method = f.finance_method || 'Unspecified'
      totals.set(method, (totals.get(method) ?? 0) + Number(f.amount ?? 0))
    }
    financeMethods = Array.from(totals.entries()).map(([method, amount]) => ({ method, amount }))
  }

  return { interventions, financeMethods }
}
