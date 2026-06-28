'use client'

import { createClient } from '@/lib/supabase/client'

export interface Financier {
  id: string
  intervention_id: string
  name: string
  finance_method: string | null
  procurement_method: string | null
  amount: number | null
}

export type FinancierInput = Omit<Financier, 'id' | 'intervention_id'>

export async function listFinanciers(interventionId: string): Promise<Financier[]> {
  const { data, error } = await createClient()
    .from('financiers').select('*').eq('intervention_id', interventionId).order('created_at', { ascending: true })
  if (error) throw error
  return (data ?? []) as Financier[]
}

export async function createFinancier(interventionId: string, input: FinancierInput): Promise<Financier> {
  const { data, error } = await createClient()
    .from('financiers').insert({ ...input, intervention_id: interventionId }).select('*').single()
  if (error) throw error
  return data as Financier
}

export async function deleteFinancier(id: string): Promise<void> {
  const { error } = await createClient().from('financiers').delete().eq('id', id)
  if (error) throw error
}

/** Replace all financiers for an intervention with the given rows (drops empties). */
export async function replaceFinanciers(interventionId: string, rows: FinancierInput[]): Promise<void> {
  const supabase = createClient()
  await supabase.from('financiers').delete().eq('intervention_id', interventionId)
  const clean = rows.filter((r) => (r.name ?? '').trim())
  if (clean.length === 0) return
  const { error } = await supabase.from('financiers').insert(clean.map((r) => ({ ...r, intervention_id: interventionId })))
  if (error) throw error
}
