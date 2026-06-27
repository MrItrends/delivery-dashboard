'use client'

import { createClient } from '@/lib/supabase/client'

export interface CalEvent {
  id: string
  title: string
  date: string // YYYY-MM-DD
  kind: 'Milestone' | 'Activity'
  href: string | null
}

/** All dated events across the workspace (activities + milestones with a due date). */
export async function listEvents(): Promise<CalEvent[]> {
  const supabase = createClient()
  const events: CalEvent[] = []

  const { data: acts } = await supabase
    .from('activities')
    .select('id, name, due_date, intervention_id')
    .not('due_date', 'is', null)
    .eq('archived', false)
    .limit(500)
  for (const a of (acts ?? []) as { id: string; name: string; due_date: string; intervention_id: string | null }[]) {
    events.push({ id: a.id, title: a.name, date: a.due_date, kind: 'Activity', href: a.intervention_id ? `/interventions/${a.intervention_id}` : null })
  }

  const { data: ms } = await supabase
    .from('milestones')
    .select('id, name, due_date, intervention_id')
    .not('due_date', 'is', null)
    .limit(500)
  for (const m of (ms ?? []) as { id: string; name: string; due_date: string; intervention_id: string | null }[]) {
    events.push({ id: m.id, title: m.name, date: m.due_date, kind: 'Milestone', href: m.intervention_id ? `/interventions/${m.intervention_id}` : null })
  }

  return events
}
