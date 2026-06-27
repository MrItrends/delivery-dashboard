'use client'

import { createClient } from '@/lib/supabase/client'

export interface CalItem {
  id: string
  title: string
  when: string
  kind: 'Milestone' | 'Activity'
  context: string
}

export async function listUpcoming(): Promise<CalItem[]> {
  const supabase = createClient()
  const items: CalItem[] = []

  const { data: ms } = await supabase.from('milestones').select('id, name, due, group_label').limit(100)
  for (const m of (ms ?? []) as { id: string; name: string; due: string | null; group_label: string }[]) {
    items.push({ id: m.id, title: m.name, when: m.due ?? '—', kind: 'Milestone', context: m.group_label })
  }

  const { data: acts } = await supabase.from('activities').select('id, name, due_label').not('due_label', 'is', null).eq('archived', false).limit(100)
  for (const a of (acts ?? []) as { id: string; name: string; due_label: string | null }[]) {
    items.push({ id: a.id, title: a.name, when: a.due_label ?? '—', kind: 'Activity', context: '' })
  }

  return items
}
