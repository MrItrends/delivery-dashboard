'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { AppShell } from '@/components/layout/AppShell'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/primitives/Button'
import { Icon } from '@/components/primitives/Icon'
import { StatusChip, type ObjectStatus } from '@/components/primitives/StatusChip'
import { Drawer } from '@/components/overlay/Drawer'
import { TextField } from '@/components/primitives/TextField'
import { Select } from '@/components/primitives/Select'
import { Fields } from '@/components/onboarding/FormLayout'
import { useToastStore } from '@/stores/useToastStore'
import { listReports, createReport, deleteReport, type ReportInput } from '@/lib/data/reports'
import { timeAgo } from '@/lib/format'
import page from '@/components/portfolio/PortfolioWorkspace.module.css'
import s from '@/components/pages/pages.module.css'

const SCOPE_OPTIONS = [
  { value: 'workspace', label: 'Workspace' },
  { value: 'portfolio', label: 'Portfolio' },
  { value: 'priority_area', label: 'Priority area' },
  { value: 'project', label: 'Project' },
  { value: 'intervention', label: 'Intervention' },
  { value: 'activity', label: 'Activity' },
  { value: 'custom', label: 'Custom' },
]
const STATUS_MAP: Record<string, { status: ObjectStatus; label: string }> = {
  draft: { status: 'draft', label: 'Draft' },
  review: { status: 'active', label: 'In review' },
  published: { status: 'approved', label: 'Published' },
}

export default function ReportsPage() {
  const toast = useToastStore()
  const qc = useQueryClient()
  const { data, isLoading } = useQuery({ queryKey: ['reports'], queryFn: listReports })
  const create = useMutation({ mutationFn: (input: ReportInput) => createReport(input), onSuccess: () => { qc.invalidateQueries({ queryKey: ['reports'] }); toast.success('Report draft created'); setOpen(false) }, onError: () => toast.error('Could not create') })
  const remove = useMutation({ mutationFn: (id: string) => deleteReport(id), onSuccess: () => { qc.invalidateQueries({ queryKey: ['reports'] }); toast.success('Report deleted') } })

  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ title: '', scope_type: 'workspace', period: '', audience: '' })
  const reports = data ?? []

  return (
    <AppShell>
      <div className={page.page}>
        <PageHeader
          title="Reports"
          description="Generated reports across the workspace — drafts, reviews and published."
          primaryAction={<Button variant="primary" size="md" iconLeft={<Icon name="plus" size={16} />} onClick={() => { setForm({ title: '', scope_type: 'workspace', period: '', audience: '' }); setOpen(true) }}>New report</Button>}
        />
        <div className={page.body}>
          {isLoading ? (
            <div className={s.empty}>Loading…</div>
          ) : reports.length === 0 ? (
            <div className={s.empty}>No reports yet. Create your first to get started.</div>
          ) : (
            <ul className={s.list} role="list">
              {reports.map((r) => {
                const st = STATUS_MAP[r.status] ?? STATUS_MAP.draft!
                return (
                  <li key={r.id}>
                    <div className={s.row}>
                      <Icon name="document" size={18} style={{ color: 'var(--color-text-tertiary)' }} />
                      <span className={s.rowMain}>
                        <span className={s.rowTitle}>{r.title}</span>
                        <span className={s.rowSub}>{r.scope_type} · {r.period || 'No period'} · {timeAgo(r.created_at)}</span>
                      </span>
                      <span className={s.rowRight}>
                        <StatusChip status={st.status} size="sm" label={st.label} />
                        <button type="button" className={s.roleSelect} style={{ width: 32, padding: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }} aria-label="Delete report" onClick={() => remove.mutate(r.id)}><Icon name="alert-circle" size={15} /></button>
                      </span>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        variant="create"
        title="New report"
        description="Create a draft. The full builder (KPIs, charts, PDF) comes next."
        primaryLabel="Create draft"
        onPrimary={() => { if (form.title.trim().length < 2) { toast.error('Enter a report title'); return } create.mutate(form) }}
        primaryLoading={create.isPending}
        secondaryLabel="Cancel"
        onSecondary={() => setOpen(false)}
      >
        <Fields>
          <TextField label="Title" placeholder="e.g. Q2 Portfolio Report" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} autoFocus />
          <Select label="Scope" options={SCOPE_OPTIONS} value={form.scope_type} onChange={(e) => setForm((f) => ({ ...f, scope_type: e.target.value }))} />
          <TextField label="Period" placeholder="e.g. Q2 2026 · Apr–Jun" value={form.period} onChange={(e) => setForm((f) => ({ ...f, period: e.target.value }))} />
          <TextField label="Audience" placeholder="e.g. Executive board" value={form.audience} onChange={(e) => setForm((f) => ({ ...f, audience: e.target.value }))} />
        </Fields>
      </Drawer>
    </AppShell>
  )
}
