'use client'

import { createClient } from '@/lib/supabase/client'

export interface TargetUpdate {
  id: string
  value: number
  note: string | null
  created_at: string
  author: string
}

export interface SeriesPoint { value: number; at: string }

export async function listTargetUpdates(targetId: string): Promise<TargetUpdate[]> {
  const { data, error } = await createClient()
    .from('target_updates').select('id, value, note, created_at, author:profiles(name)')
    .eq('target_id', targetId).order('created_at', { ascending: true })
  if (error) throw error
  return ((data ?? []) as unknown as Record<string, unknown>[]).map((u) => ({
    id: String(u.id), value: Number(u.value ?? 0), note: (u.note as string) ?? null,
    created_at: String(u.created_at ?? ''), author: String((u.author as Record<string, unknown> | null)?.name ?? 'Someone'),
  }))
}

export async function createTargetUpdate(targetId: string, value: number, note: string | null): Promise<void> {
  const supabase = createClient()
  const { data: a } = await supabase.auth.getUser()
  const { error } = await supabase.from('target_updates').insert({ target_id: targetId, value, note, created_by: a.user?.id })
  if (error) throw error
}

/** Update series for a set of targets, grouped by target id (for sparklines). */
export async function getTargetSeries(targetIds: string[]): Promise<Record<string, SeriesPoint[]>> {
  if (targetIds.length === 0) return {}
  const { data } = await createClient()
    .from('target_updates').select('target_id, value, created_at').in('target_id', targetIds).order('created_at', { ascending: true })
  const map: Record<string, SeriesPoint[]> = {}
  for (const u of (data ?? []) as { target_id: string; value: number; created_at: string }[]) {
    ;(map[u.target_id] ??= []).push({ value: Number(u.value), at: u.created_at })
  }
  return map
}
