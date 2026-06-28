'use client'

import { createClient } from '@/lib/supabase/client'

export interface Target {
  id: string
  intervention_id: string | null
  name: string
  target: number | null        // target amount
  start_amount: number | null
  unit: string | null
  start_date: string | null
  deadline: string | null
}

export type TargetInput = Omit<Target, 'id' | 'intervention_id'>

export async function listTargets(interventionId: string): Promise<Target[]> {
  const { data, error } = await createClient()
    .from('targets').select('id, intervention_id, name, target, start_amount, unit, start_date, deadline')
    .eq('intervention_id', interventionId).order('created_at', { ascending: true })
  if (error) throw error
  return (data ?? []) as Target[]
}

export async function createTarget(interventionId: string, input: TargetInput): Promise<Target> {
  const { data, error } = await createClient()
    .from('targets').insert({ ...input, intervention_id: interventionId })
    .select('id, intervention_id, name, target, start_amount, unit, start_date, deadline').single()
  if (error) throw error
  return data as Target
}

export async function deleteTarget(id: string): Promise<void> {
  const { error } = await createClient().from('targets').delete().eq('id', id)
  if (error) throw error
}

/** Replace all targets for an intervention with the given rows (drops empties). */
export async function replaceTargets(interventionId: string, rows: TargetInput[]): Promise<void> {
  const supabase = createClient()
  await supabase.from('targets').delete().eq('intervention_id', interventionId)
  const clean = rows.filter((r) => (r.name ?? '').trim())
  if (clean.length === 0) return
  const { error } = await supabase.from('targets').insert(clean.map((r) => ({ ...r, intervention_id: interventionId })))
  if (error) throw error
}
