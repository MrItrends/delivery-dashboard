'use client'

import { createClient } from '@/lib/supabase/client'
import { getMyProfile } from './admin'
import type { ObjectStatus } from '@/components/primitives/StatusChip'

export interface TrackerActivity {
  id: string
  name: string
  owner: string | null
  status: ObjectStatus
  priority: string
  dueDate: string | null
  dueLabel: string | null
  progress: number
  archived: boolean
  intervention: string | null
  interventionId: string | null
  overdue: boolean
  createdAt: string
  updatedAt: string
}

export interface TrackerData {
  activities: TrackerActivity[]
  myName: string | null
}

const today = () => new Date().toISOString().slice(0, 10)

/** Every activity across the workspace, with its intervention and a derived
 *  overdue flag (past due date and not complete). Powers the Activity Tracker. */
export async function getTrackerData(): Promise<TrackerData> {
  const supabase = createClient()
  const me = await getMyProfile()
  const { data } = await supabase
    .from('activities')
    .select('id, name, owner, status, priority, due_date, due_label, progress, archived, intervention_id, created_at, updated_at, intervention:interventions(name)')
    .order('created_at', { ascending: false })
    .limit(1000)

  const t = today()
  const activities: TrackerActivity[] = ((data ?? []) as unknown as Record<string, unknown>[]).map((a) => {
    const status = (a.status as ObjectStatus) ?? 'planned'
    const dueDate = (a.due_date as string) ?? null
    const overdue = !!dueDate && dueDate < t && status !== 'complete'
    return {
      id: String(a.id), name: String(a.name ?? ''), owner: (a.owner as string) ?? null,
      status, priority: String(a.priority ?? 'medium'), dueDate, dueLabel: (a.due_label as string) ?? null,
      progress: Number(a.progress ?? 0), archived: !!a.archived,
      intervention: String((a.intervention as Record<string, unknown> | null)?.name ?? '') || null,
      interventionId: (a.intervention_id as string) ?? null, overdue,
      createdAt: String(a.created_at ?? ''), updatedAt: String(a.updated_at ?? ''),
    }
  })

  return { activities, myName: me?.name ?? null }
}
