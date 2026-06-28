'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/primitives/Button'
import { Icon } from '@/components/primitives/Icon'
import { TextField } from '@/components/primitives/TextField'
import { Select } from '@/components/primitives/Select'
import { FormBanner } from '@/components/auth/AuthScaffold'
import { useToastStore } from '@/stores/useToastStore'
import { useParentOptions } from '@/lib/data/useEntity'
import { createEntity, updateEntity, getEntity, type Row } from '@/lib/data/crud'
import { ensureParentId } from '@/lib/data/setup'
import { useCapabilities } from '@/lib/data/roles'
import { LIFECYCLE_OPTIONS } from '@/lib/data/entities'
import { listFinanciers, replaceFinanciers, type Financier } from '@/lib/data/financiers'
import { listTargets, replaceTargets, type Target } from '@/lib/data/targets'
import page from '@/components/portfolio/PortfolioWorkspace.module.css'
import s from './InterventionEditor.module.css'

const FINANCE_METHODS = [
  { value: '', label: '—' }, { value: 'Grant', label: 'Grant' }, { value: 'Loan', label: 'Loan' },
  { value: 'Equity', label: 'Equity' }, { value: 'Other', label: 'Other' },
]
const PROCUREMENT_METHODS = [
  { value: '', label: '—' }, { value: 'Tender', label: 'Tender' }, { value: 'Direct', label: 'Direct' },
  { value: 'Framework', label: 'Framework' }, { value: 'Other', label: 'Other' },
]

type FinRow = { key: string; name: string; finance_method: string; procurement_method: string; amount: string }
type TgtRow = { key: string; name: string; target: string; start_amount: string; unit: string; start_date: string; deadline: string }
const uid = () => Math.random().toString(36).slice(2)
const numOrNull = (v: string) => (v.trim() === '' ? null : Number(v))

const emptyForm = { ref: '', name: '', owner: '', co_lead: '', programme: '', classification: '', region: '', status: 'planned', objective: '', description: '', budget: '', spent: '' }

export function InterventionEditor({ id, parentId }: { id?: string; parentId?: string }) {
  const router = useRouter()
  const toast = useToastStore()
  const qc = useQueryClient()
  const caps = useCapabilities()
  const isEdit = !!id

  const [form, setForm] = useState<typeof emptyForm>(emptyForm)
  const [project, setProject] = useState('')
  const [financiers, setFinanciers] = useState<FinRow[]>([])
  const [targets, setTargets] = useState<TgtRow[]>([])
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [loading, setLoading] = useState(isEdit)

  const needsProject = !isEdit && !parentId
  const projectOptions = useParentOptions('projects', 'name', needsProject)
  const hasProjects = (projectOptions.data?.length ?? 0) > 0

  useEffect(() => {
    if (!isEdit || !id) return
    let active = true
    ;(async () => {
      const iv = await getEntity<Row>('interventions', id)
      const [fin, tgt] = await Promise.all([listFinanciers(id), listTargets(id)])
      if (!active) return
      if (iv) setForm({
        ref: String(iv.ref ?? ''), name: String(iv.name ?? ''), owner: String(iv.owner ?? ''), co_lead: String(iv.co_lead ?? ''),
        programme: String(iv.programme ?? ''), classification: String(iv.classification ?? ''), region: String(iv.region ?? ''),
        status: String(iv.status ?? 'planned'), objective: String(iv.objective ?? ''), description: String(iv.description ?? ''),
        budget: iv.budget == null ? '' : String(iv.budget), spent: iv.spent == null ? '' : String(iv.spent),
      })
      setFinanciers(fin.map((f: Financier) => ({ key: f.id, name: f.name, finance_method: f.finance_method ?? '', procurement_method: f.procurement_method ?? '', amount: f.amount == null ? '' : String(f.amount) })))
      setTargets(tgt.map((t: Target) => ({ key: t.id, name: t.name, target: t.target == null ? '' : String(t.target), start_amount: t.start_amount == null ? '' : String(t.start_amount), unit: t.unit ?? '', start_date: t.start_date ?? '', deadline: t.deadline ?? '' })))
      setLoading(false)
    })()
    return () => { active = false }
  }, [id, isEdit])

  const set = (k: keyof typeof emptyForm, v: string) => { setForm((f) => ({ ...f, [k]: v })); if (error) setError(null) }

  async function save() {
    if (form.name.trim().length < 2) { setError('Enter an intervention name'); return }
    if (needsProject && hasProjects && !project) { setError('Select a project'); return }
    setBusy(true)
    try {
      const scalar: Record<string, unknown> = {
        ref: form.ref || null, name: form.name.trim(), owner: form.owner || null, co_lead: form.co_lead || null,
        programme: form.programme || null, classification: form.classification || null, region: form.region || null,
        status: form.status, objective: form.objective || null, description: form.description || null,
        budget: numOrNull(form.budget), spent: numOrNull(form.spent),
      }

      let ivId = id
      if (isEdit && id) {
        await updateEntity('interventions', id, scalar)
      } else {
        let projectId = parentId || project
        if (!projectId) projectId = (await ensureParentId('intervention')) ?? ''
        const row = await createEntity<Row>('interventions', { ...scalar, project_id: projectId, health: 'healthy', budget_health: 'healthy' })
        ivId = row.id
      }
      if (!ivId) throw new Error('Could not save intervention')

      await replaceFinanciers(ivId, financiers.map((f) => ({ name: f.name, finance_method: f.finance_method || null, procurement_method: f.procurement_method || null, amount: numOrNull(f.amount) })))
      await replaceTargets(ivId, targets.map((t) => ({ name: t.name, target: numOrNull(t.target), start_amount: numOrNull(t.start_amount), unit: t.unit || null, start_date: t.start_date || null, deadline: t.deadline || null })))

      qc.invalidateQueries({ queryKey: ['interventions'] })
      toast.success(isEdit ? 'Intervention saved' : 'Intervention created')
      router.push(`/interventions/${ivId}`)
    } catch (e) {
      setBusy(false)
      setError(e instanceof Error ? e.message : 'Could not save')
    }
  }

  if (!caps.isLoading && ((isEdit && !caps.canEdit) || (!isEdit && !caps.canCreate))) {
    return <div className={page.page}><PageHeader title="Intervention" /><div className={page.body}><FormBanner tone="warning">You don’t have permission to do this. Ask an administrator.</FormBanner></div></div>
  }
  if (loading) return <div className={page.page}><div className={page.body}><div className="shimmer" style={{ height: 28, width: 280, borderRadius: 6 }} /></div></div>

  return (
    <div className={page.page}>
      <PageHeader title={isEdit ? 'Edit intervention' : 'Plan intervention'} description="Plan the intervention, its financiers and its targets." />
      <div className={page.body}>
        <div className={s.form}>
          {needsProject && (
            hasProjects ? <Select label="Project" options={projectOptions.data ?? []} value={project} onChange={(e) => setProject(e.target.value)} placeholder="Select a project" />
              : <p className={s.empty}>No project yet — a default one will be created for you.</p>
          )}

          <div className={s.grid}>
            <TextField label="Ref" placeholder="e.g. 1.1" value={form.ref} onChange={(e) => set('ref', e.target.value)} />
            <div />
            <div className={s.full}><TextField label="Name" placeholder="e.g. Indigenous chicken farming" value={form.name} onChange={(e) => set('name', e.target.value)} error={error ?? undefined} autoFocus /></div>
            <TextField label="Lead" value={form.owner} onChange={(e) => set('owner', e.target.value)} />
            <TextField label="Co-Lead" value={form.co_lead} onChange={(e) => set('co_lead', e.target.value)} />
            <TextField label="Programme" value={form.programme} onChange={(e) => set('programme', e.target.value)} />
            <Select label="Status" options={LIFECYCLE_OPTIONS} value={form.status} onChange={(e) => set('status', e.target.value)} />
            <TextField label="Classification" value={form.classification} onChange={(e) => set('classification', e.target.value)} />
            <TextField label="Region" value={form.region} onChange={(e) => set('region', e.target.value)} />
            <div className={s.full}>
              <label className={s.label}>Description</label>
              <textarea className={s.textarea} value={form.description} onChange={(e) => set('description', e.target.value)} />
            </div>
            <TextField label="Total budget (₦)" type="number" value={form.budget} onChange={(e) => set('budget', e.target.value)} />
            <TextField label="Amount spent (₦)" type="number" value={form.spent} onChange={(e) => set('spent', e.target.value)} />
          </div>

          {/* Financiers */}
          <div className={s.section}>
            <div className={s.sectionHead}>
              <span className={s.sectionTitle}>Financiers ({financiers.length})</span>
              <Button variant="secondary" size="sm" iconLeft={<Icon name="plus" size={14} />} onClick={() => setFinanciers((r) => [...r, { key: uid(), name: '', finance_method: '', procurement_method: '', amount: '' }])}>Add financier</Button>
            </div>
            {financiers.length === 0 ? <p className={s.empty}>No financiers yet.</p> : (
              <div className={s.table}>
                <div className={`${s.thead} ${s.financierGrid}`}><span className={s.th}>Name</span><span className={s.th}>Finance method</span><span className={s.th}>Procurement method</span><span className={s.th}>Amount (₦)</span><span /></div>
                {financiers.map((f, i) => (
                  <div key={f.key} className={`${s.row} ${s.financierGrid}`}>
                    <input className={s.input} value={f.name} placeholder="e.g. World Food Program" onChange={(e) => setFinanciers((r) => r.map((x, j) => j === i ? { ...x, name: e.target.value } : x))} />
                    <select className={s.select} value={f.finance_method} onChange={(e) => setFinanciers((r) => r.map((x, j) => j === i ? { ...x, finance_method: e.target.value } : x))}>{FINANCE_METHODS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select>
                    <select className={s.select} value={f.procurement_method} onChange={(e) => setFinanciers((r) => r.map((x, j) => j === i ? { ...x, procurement_method: e.target.value } : x))}>{PROCUREMENT_METHODS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select>
                    <input className={s.input} type="number" value={f.amount} onChange={(e) => setFinanciers((r) => r.map((x, j) => j === i ? { ...x, amount: e.target.value } : x))} />
                    <button type="button" className={s.del} aria-label="Remove financier" onClick={() => setFinanciers((r) => r.filter((_, j) => j !== i))}><Icon name="alert-circle" size={15} /></button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Targets */}
          <div className={s.section}>
            <div className={s.sectionHead}>
              <span className={s.sectionTitle}>Targets ({targets.length})</span>
              <Button variant="secondary" size="sm" iconLeft={<Icon name="plus" size={14} />} onClick={() => setTargets((r) => [...r, { key: uid(), name: '', target: '', start_amount: '', unit: '', start_date: '', deadline: '' }])}>Add target</Button>
            </div>
            {targets.length === 0 ? <p className={s.empty}>No targets yet.</p> : (
              <div className={s.table}>
                <div className={`${s.thead} ${s.targetGrid}`}><span className={s.th}>Target</span><span className={s.th}>Target amount</span><span className={s.th}>Start amount</span><span className={s.th}>Unit</span><span className={s.th}>Deadline</span><span /></div>
                {targets.map((t, i) => (
                  <div key={t.key} className={`${s.row} ${s.targetGrid}`}>
                    <input className={s.input} value={t.name} placeholder="e.g. 100% of rice produced locally" onChange={(e) => setTargets((r) => r.map((x, j) => j === i ? { ...x, name: e.target.value } : x))} />
                    <input className={s.input} type="number" value={t.target} onChange={(e) => setTargets((r) => r.map((x, j) => j === i ? { ...x, target: e.target.value } : x))} />
                    <input className={s.input} type="number" value={t.start_amount} onChange={(e) => setTargets((r) => r.map((x, j) => j === i ? { ...x, start_amount: e.target.value } : x))} />
                    <input className={s.input} value={t.unit} placeholder="e.g. kg" onChange={(e) => setTargets((r) => r.map((x, j) => j === i ? { ...x, unit: e.target.value } : x))} />
                    <input className={s.input} type="date" value={t.deadline} onChange={(e) => setTargets((r) => r.map((x, j) => j === i ? { ...x, deadline: e.target.value } : x))} />
                    <button type="button" className={s.del} aria-label="Remove target" onClick={() => setTargets((r) => r.filter((_, j) => j !== i))}><Icon name="alert-circle" size={15} /></button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={s.footer}>
            <Button variant="secondary" size="md" onClick={() => router.back()} disabled={busy}>Cancel</Button>
            <Button variant="primary" size="md" loading={busy} onClick={save}>{isEdit ? 'Save changes' : 'Create intervention'}</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
