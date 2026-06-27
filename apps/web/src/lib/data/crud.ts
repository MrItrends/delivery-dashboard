'use client'

import { createClient } from '@/lib/supabase/client'

/** Generic Supabase CRUD for any table with `id`, `archived`, `created_at`. */

export interface Row {
  id: string
  archived?: boolean
  created_at?: string
  updated_at?: string
  [key: string]: unknown
}

export interface ListOpts {
  parentKey?: string
  parentId?: string | null
  includeArchived?: boolean
}

export async function listEntities<T extends Row>(table: string, opts: ListOpts = {}): Promise<T[]> {
  const supabase = createClient()
  let q = supabase.from(table).select('*').order('created_at', { ascending: false })
  if (opts.parentKey && opts.parentId) q = q.eq(opts.parentKey, opts.parentId)
  if (!opts.includeArchived) q = q.eq('archived', false)
  const { data, error } = await q
  if (error) throw error
  return (data ?? []) as T[]
}

export async function getEntity<T extends Row>(table: string, id: string): Promise<T | null> {
  const supabase = createClient()
  const { data, error } = await supabase.from(table).select('*').eq('id', id).maybeSingle()
  if (error) throw error
  return (data as T) ?? null
}

export async function createEntity<T extends Row>(table: string, input: Record<string, unknown>): Promise<T> {
  const supabase = createClient()
  const { data, error } = await supabase.from(table).insert(input).select('*').single()
  if (error) throw error
  return data as T
}

export async function updateEntity<T extends Row>(table: string, id: string, patch: Record<string, unknown>): Promise<T> {
  const supabase = createClient()
  const { data, error } = await supabase.from(table).update(patch).eq('id', id).select('*').single()
  if (error) throw error
  return data as T
}

export async function setEntityArchived(table: string, id: string, archived: boolean): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase.from(table).update({ archived }).eq('id', id)
  if (error) throw error
}

/** Options for a parent <select> (e.g. choosing the portfolio for a priority area). */
export async function listParentOptions(table: string, labelField = 'name'): Promise<{ value: string; label: string }[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from(table)
    .select(`id, ${labelField}`)
    .eq('archived', false)
    .order('created_at', { ascending: false })
  if (error) throw error
  const rows = (data ?? []) as unknown as Record<string, unknown>[]
  return rows.map((r) => ({
    value: String(r.id),
    label: String(r[labelField] ?? '—'),
  }))
}
