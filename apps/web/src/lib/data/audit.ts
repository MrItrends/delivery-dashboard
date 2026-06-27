'use client'

import { createClient } from '@/lib/supabase/client'

export interface AuditEntry {
  id: string
  object_type: string
  object_id: string
  action: string
  field: string | null
  previous: string | null
  next: string | null
  created_at: string
  actor?: { name: string } | null
}

export async function listAudit(): Promise<AuditEntry[]> {
  const { data, error } = await createClient()
    .from('audit_log')
    .select('*, actor:profiles(name)')
    .order('created_at', { ascending: false })
    .limit(100)
  if (error) throw error
  return (data ?? []) as unknown as AuditEntry[]
}
