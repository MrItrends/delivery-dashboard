'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
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
import { useParentOptions } from '@/lib/data/useEntity'
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
const SCOPE_TABLE: Record<string, string> = {
  portfolio: 'portfolios', priority_area: 'priority_areas', project: 'projects',
  intervention: 'interventions', activity: 'activities',
}
const STATUS_MAP: Record<string, { status: ObjectStatus; label: string }> = {
  draft: { status: 'draft', label: 'Draft' },
  review: { status: 'active', label: 'In review' },
  published: { status: 'approved', label: 'Published' },
}

export default function ReportsPage() {
  const router = useRouter()
  const toast = useToastStore()
  const qc = useQueryClient()
  const { data, isLoading } = useQuery({ queryKey: ['reports'], queryFn: listReports })
  const create = useMutation({ mutationFn: (input: ReportInput) => createReport(input), onSuccess: (rep) => { qc.invalidateQueries({ queryKey: ['reports'] }); setOpen(false); toast.success('Report draft created'); router.push(`/reports/${rep.id}`) }, onError: () => toast.error('Could not create') })
  const remove = useMutation({ mutationFn: (id: string) => deleteReport(id), onSuccess: () => { qc.invalidateQueries({ queryKey: ['reports'] }); toast.success('Report deleted') } })

  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ title: '', scope_type: 'workspace', scope_id: '', period: '', audience: '' })
  const scopeTable = SCOPE_TABLE[form.scope_type]
  const needsScope = !!scopeTable
  const scopeOptions = useParentOptions(scopeTable, 'name', open && needsScope)
  const reports = data ?? []

  function submit() {
    if (form.title.trim().length < 2) { toast.error('Enter a report title'); return }
    if (needsScope && !form.scope_id) { toast.error('Select which item to report on'); return }
    create.mutate({ title: form.title.trim(), scope_type: form.scope_type, scope_id: needsScope ? form.scope_id : null, period: form.period, audience: form.audience })
  }

  return (
    <AppShell>
      <div className={page.page}>
        <PageHeader
          title="Reports"
          description="Generated reports across the workspace — drafts, reviews and published."
          primaryAction={<Button variant="primary" size="md" iconLeft={<Icon name="plus" size={16} />} onClick={() => { setForm({ title: '', scope_type: 'workspace', scope_id: '', period: '', audience: '' }); setOpen(true) }}>New report</Button>}
        />
        <div className={page.body}>
          {isLoading ? (
            <div className={s.empty}>Loading…</div>
          ) : reports.length === 0 ? (
            <div className={s.empty}>No reports yet. Create your first to get started.</div>
          ) : (
            <ul className={s.list} role="list">
              {reports.map((rep) => {
                const st = STATUS_MAP[rep.status] ?? STATUS_MAP.draft!
                return (
                  <li key={rep.id}>
                    <button type="button" className={`${s.row} ${s.rowButton}`} onClick={() => router.push(`/reports/${rep.id}`)}>
                      <Icon name="document" size={18} style={{ color: 'var(--color-text-tertiary)' }} />
                      <span className={s.rowMain}>
                        <span className={s.rowTitle}>{rep.title}</span>
                        <span className={s.rowSub}>{rep.scope_type} · {rep.period || 'No period'} · v{rep.version} · {timeAgo(rep.created_at)}</span>
                      </span>
                      <span className={s.rowRight}>
                        <StatusChip status={st.status} size="sm" label={st.label} />
                        <span role="button" tabIndex={0} className={s.roleSelect} style={{ width: 32, padding: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }} aria-label="Delete report"
                          onClick={(e) => { e.stopPropagation(); remove.mutate(rep.id) }}
                          onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); remove.mutate(rep.id) } }}><Icon name="alert-circle" size={15} /></span>
                      </span>
                    </button>
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
        description="Create a draft generated from live data. Edit the narrative, then publish or export."
        primaryLabel="Create draft"
        onPrimary={submit}
        primaryLoading={create.isPending}
        secondaryLabel="Cancel"
        onSecondary={() => setOpen(false)}
      >
        <Fields>
          <TextField label="Title" placeholder="e.g. Q2 Portfolio Report" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} autoFocus />
          <Select label="Scope" options={SCOPE_OPTIONS} value={form.scope_type} onChange={(e) => setForm((f) => ({ ...f, scope_type: e.target.value, scope_id: '' }))} />
          {needsScope && (
            <Select label="Which item" options={scopeOptions.data ?? []} value={form.scope_id} onChange={(e) => setForm((f) => ({ ...f, scope_id: e.target.value }))} placeholder={scopeOptions.isLoading ? 'Loading…' : 'Select an item'} />
          )}
          <TextField label="Period" placeholder="e.g. Q2 2026 · Apr–Jun" value={form.period} onChange={(e) => setForm((f) => ({ ...f, period: e.target.value }))} />
          <TextField label="Audience" placeholder="e.g. Executive board" value={form.audience} onChange={(e) => setForm((f) => ({ ...f, audience: e.target.value }))} />
        </Fields>
      </Drawer>
    </AppShell>
  )
}
