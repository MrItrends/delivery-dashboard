'use client'

import { createClient } from '@/lib/supabase/client'
import type { Report } from './reports'
import type { ObjectStatus } from '@/components/primitives/StatusChip'

export interface ReportMetric { label: string; value: number }
export interface ReportRisk { id: string; title: string; severity: ObjectStatus; owner: string | null; mitigation: string | null }
export interface ReportComment { id: string; author: string; body: string; created_at: string }

export interface ComposedReport {
  scopeName: string
  scopeStatus?: ObjectStatus
  scopeOwner?: string | null
  metrics: ReportMetric[]
  healthDist?: { healthy: number; atRisk: number; critical: number }
  risks: ReportRisk[]
  recent: ReportComment[]
}

const SCOPE_TABLE: Record<string, string> = {
  portfolio: 'portfolios', priority_area: 'priority_areas', project: 'projects',
  intervention: 'interventions', activity: 'activities',
}

async function count(table: string, col?: string, val?: string): Promise<number> {
  const supabase = createClient()
  let q = supabase.from(table).select('id', { count: 'exact', head: true }).eq('archived', false)
  if (col && val) q = q.eq(col, val)
  const { count } = await q
  return count ?? 0
}

async function healthDist(table: string, col: string, val: string) {
  const supabase = createClient()
  const { data } = await supabase.from(table).select('health').eq(col, val).eq('archived', false)
  const rows = (data ?? []) as { health: string }[]
  return {
    healthy: rows.filter((r) => r.health === 'healthy').length,
    atRisk: rows.filter((r) => r.health === 'at-risk').length,
    critical: rows.filter((r) => r.health === 'critical').length,
  }
}

export async function composeReport(report: Report): Promise<ComposedReport> {
  const supabase = createClient()
  const { scope_type: scope, scope_id: id } = report

  // Scope identity
  let scopeName = 'Workspace'
  let scopeStatus: ObjectStatus | undefined
  let scopeOwner: string | null | undefined
  if (id && SCOPE_TABLE[scope]) {
    const { data } = await supabase.from(SCOPE_TABLE[scope]!).select('name, health, status, owner').eq('id', id).maybeSingle()
    if (data) {
      const d = data as Record<string, unknown>
      scopeName = String(d.name ?? scopeName)
      scopeStatus = (d.health ?? d.status) as ObjectStatus | undefined
      scopeOwner = (d.owner as string) ?? null
    }
  }

  // Metrics + health distribution, scoped
  let metrics: ReportMetric[] = []
  let dist: ComposedReport['healthDist']
  if (scope === 'workspace' || scope === 'custom') {
    metrics = [
      { label: 'Portfolios', value: await count('portfolios') },
      { label: 'Priority areas', value: await count('priority_areas') },
      { label: 'Projects', value: await count('projects') },
      { label: 'Interventions', value: await count('interventions') },
      { label: 'Activities', value: await count('activities') },
    ]
  } else if (scope === 'portfolio' && id) {
    metrics = [{ label: 'Priority areas', value: await count('priority_areas', 'portfolio_id', id) }]
    dist = await healthDist('priority_areas', 'portfolio_id', id)
  } else if (scope === 'priority_area' && id) {
    metrics = [{ label: 'Projects', value: await count('projects', 'priority_area_id', id) }]
    dist = await healthDist('projects', 'priority_area_id', id)
  } else if (scope === 'project' && id) {
    metrics = [
      { label: 'Interventions', value: await count('interventions', 'project_id', id) },
      { label: 'Risks', value: await count('risks', 'project_id', id) },
    ]
    dist = await healthDist('interventions', 'project_id', id)
  } else if (scope === 'intervention' && id) {
    metrics = [{ label: 'Activities', value: await count('activities', 'intervention_id', id) }]
  }

  // Risks — scoped to project, else workspace-wide top
  let riskQuery = supabase.from('risks').select('id, title, severity, owner, mitigation').limit(10)
  if (scope === 'project' && id) riskQuery = riskQuery.eq('project_id', id)
  const { data: riskData } = await riskQuery
  const risks = (riskData ?? []) as ReportRisk[]

  // Recent activity — recent comments (scoped to object if available, else global)
  let commentQuery = supabase.from('comments').select('id, body, created_at, author:profiles(name)').order('created_at', { ascending: false }).limit(8)
  if (id) commentQuery = commentQuery.eq('object_id', id)
  const { data: cData } = await commentQuery
  const recent = ((cData ?? []) as unknown as Record<string, unknown>[]).map((c) => ({
    id: String(c.id),
    body: String(c.body ?? ''),
    created_at: String(c.created_at ?? ''),
    author: String((c.author as Record<string, unknown> | null)?.name ?? 'Someone'),
  }))

  return { scopeName, scopeStatus, scopeOwner, metrics, healthDist: dist, risks, recent }
}
