'use client'

import { createClient } from '@/lib/supabase/client'

export interface Report {
  id: string
  scope_type: string
  scope_id: string | null
  title: string
  period: string | null
  audience: string | null
  status: string
  version: number
  narrative: string | null
  recommendations: string | null
  created_at: string
}

export interface ReportInput {
  title: string
  scope_type: string
  scope_id?: string | null
  period?: string
  audience?: string
  narrative?: string
  recommendations?: string
  status?: string
}

export async function getReport(id: string): Promise<Report | null> {
  const { data, error } = await createClient().from('reports').select('*').eq('id', id).maybeSingle()
  if (error) throw error
  return (data as Report) ?? null
}

export async function publishReport(id: string, currentVersion: number): Promise<void> {
  const { error } = await createClient().from('reports').update({ status: 'published', version: currentVersion + 1 }).eq('id', id)
  if (error) throw error
}

export async function listReports(): Promise<Report[]> {
  const { data, error } = await createClient().from('reports').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return (data ?? []) as Report[]
}

export async function createReport(input: ReportInput): Promise<Report> {
  const supabase = createClient()
  const { data: a } = await supabase.auth.getUser()
  const { data, error } = await supabase
    .from('reports')
    .insert({ status: 'draft', ...input, created_by: a.user?.id })
    .select('*').single()
  if (error) throw error
  return data as Report
}

export async function updateReport(id: string, patch: Partial<ReportInput>): Promise<void> {
  const { error } = await createClient().from('reports').update(patch).eq('id', id)
  if (error) throw error
}

export async function deleteReport(id: string): Promise<void> {
  const { error } = await createClient().from('reports').delete().eq('id', id)
  if (error) throw error
}
