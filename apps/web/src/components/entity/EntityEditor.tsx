'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/primitives/Button'
import { TextField } from '@/components/primitives/TextField'
import { MoneyField } from '@/components/primitives/MoneyField'
import { Select } from '@/components/primitives/Select'
import { FormBanner } from '@/components/auth/AuthScaffold'
import { useToastStore } from '@/stores/useToastStore'
import { useEntityMutations, useParentOptions } from '@/lib/data/useEntity'
import { ensureParentId } from '@/lib/data/setup'
import { useCapabilities } from '@/lib/data/roles'
import { ENTITIES, type FieldDef } from '@/lib/data/entities'
import type { Row } from '@/lib/data/crud'
import page from '@/components/portfolio/PortfolioWorkspace.module.css'
import s from './EntityEditor.module.css'

/** Pull a readable message out of an Error or a Supabase error object. */
function errorMessage(e: unknown): string {
  if (e instanceof Error) return e.message
  if (e && typeof e === 'object' && 'message' in e) return String((e as { message: unknown }).message)
  return 'Could not create'
}

/** Full-page create editor (Notion/Linear style). Save lands you in the new
 *  item's workspace. The creation "journey" the client expects. */
export function EntityEditor({ entityKey, parentId }: { entityKey: string; parentId?: string }) {
  const router = useRouter()
  const toast = useToastStore()
  const caps = useCapabilities()
  const config = ENTITIES[entityKey]
  const { create } = useEntityMutations(config?.table ?? '')

  const [form, setForm] = useState<Record<string, unknown>>({})
  const [parent, setParent] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const needsParentPicker = !!config?.parent && !parentId
  const parentOptions = useParentOptions(config?.parent?.table, 'name', needsParentPicker)
  const hasParentOptions = (parentOptions.data?.length ?? 0) > 0

  useEffect(() => { if (config) setForm({ ...config.defaults }) }, [config])

  if (!config) return <div className={page.page}><div className={page.body}>Unknown type.</div></div>

  const setField = (name: string, value: unknown) => { setForm((f) => ({ ...f, [name]: value })); if (error) setError(null) }

  async function submit() {
    if (!config) return
    if (String(form.name ?? '').trim().length < 2) { setError(`Enter a ${config.singular.toLowerCase()} name`); return }
    if (needsParentPicker && hasParentOptions && !parent) { setError(`Select a ${config.parent!.label.toLowerCase()}`); return }

    const input: Record<string, unknown> = {}
    for (const f of config.fields) {
      let v = form[f.name]
      if (f.type === 'number' || f.type === 'money') v = v === '' || v == null ? null : Number(v)
      if (f.type === 'date') v = v === '' ? null : v
      input[f.name] = v
    }

    setBusy(true)
    try {
      if (config.parent) {
        let pid = parentId ?? parent
        if (!pid) pid = (await ensureParentId(config.key)) ?? ''
        input[config.parent.key] = pid
      }
      const row = await new Promise<Row>((resolve, reject) =>
        create.mutate(input, { onSuccess: (r) => resolve(r as Row), onError: reject })
      )
      toast.success(`${config.singular} created`)
      if (entityKey === 'activity' && row.intervention_id) router.push(`/interventions/${String(row.intervention_id)}`)
      else router.push(`${config.route}/${row.id}`)
    } catch (e) {
      setBusy(false)
      setError(errorMessage(e))
    }
  }

  if (!caps.isLoading && !caps.canCreate) {
    return (
      <div className={page.page}>
        <PageHeader title={`Create ${config.singular.toLowerCase()}`} />
        <div className={page.body}><FormBanner tone="warning">You don’t have permission to create this. Ask an administrator.</FormBanner></div>
      </div>
    )
  }

  function renderField(f: FieldDef) {
    const value = (form[f.name] ?? '') as string
    if (f.type === 'textarea') {
      return (
        <div key={f.name}>
          <label className={s.label} htmlFor={`f-${f.name}`}>{f.label}</label>
          <textarea id={`f-${f.name}`} className={s.textarea} value={value} placeholder={f.placeholder} onChange={(e) => setField(f.name, e.target.value)} />
        </div>
      )
    }
    if (f.type === 'select') {
      return <Select key={f.name} label={f.label} options={f.options ?? []} value={value} onChange={(e) => setField(f.name, e.target.value)} />
    }
    if (f.type === 'money') {
      return <MoneyField key={f.name} label={f.label} value={value} placeholder={f.placeholder} onChange={(d) => setField(f.name, d)} />
    }
    return (
      <TextField key={f.name} label={f.label} type={f.type === 'number' ? 'number' : f.type === 'date' ? 'date' : 'text'}
        placeholder={f.placeholder} value={value}
        onChange={(e) => setField(f.name, e.target.value)}
        error={f.name === 'name' ? (error ?? undefined) : undefined}
        autoFocus={f.name === 'name'} />
    )
  }

  return (
    <div className={page.page}>
      <PageHeader title={`Create ${config.singular.toLowerCase()}`} description={`Fill in the details, then save to open the ${config.singular.toLowerCase()}.`} />
      <div className={page.body}>
        <div className={s.form}>
          {needsParentPicker && (
            parentOptions.isLoading ? null : hasParentOptions ? (
              <Select label={config.parent!.label} options={parentOptions.data ?? []} value={parent} onChange={(e) => { setParent(e.target.value); if (error) setError(null) }} placeholder={`Select a ${config.parent!.label.toLowerCase()}`} />
            ) : (
              <div>
                <label className={s.label}>{config.parent!.label}</label>
                <p className={s.hint}>No {config.parent!.label.toLowerCase()} yet — a default one will be created for you.</p>
              </div>
            )
          )}
          {config.fields.map(renderField)}

          <div className={s.footer}>
            <Button variant="secondary" size="md" onClick={() => router.back()} disabled={busy}>Cancel</Button>
            <Button variant="primary" size="md" loading={busy} onClick={submit}>Create {config.singular.toLowerCase()}</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
