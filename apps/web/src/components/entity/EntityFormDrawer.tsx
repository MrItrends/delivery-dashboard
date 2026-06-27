'use client'

import { useState, useEffect } from 'react'
import { Drawer } from '@/components/overlay/Drawer'
import { TextField } from '@/components/primitives/TextField'
import { Select } from '@/components/primitives/Select'
import { Fields } from '@/components/onboarding/FormLayout'
import { useParentOptions } from '@/lib/data/useEntity'
import type { EntityConfig, FieldDef } from '@/lib/data/entities'
import type { Row } from '@/lib/data/crud'

interface EntityFormDrawerProps {
  open: boolean
  mode: 'create' | 'edit'
  config: EntityConfig
  initial?: Row | null
  /** When set, the parent is fixed (scoped detail view) and not asked for. */
  parentId?: string
  submitting?: boolean
  onClose: () => void
  onSubmit: (input: Record<string, unknown>) => void
}

const textareaStyle: React.CSSProperties = {
  width: '100%', resize: 'vertical', padding: 'var(--space-3)',
  border: '1px solid var(--color-border-strong)', borderRadius: 'var(--radius-lg)',
  fontFamily: 'var(--font-family-sans)', fontSize: 'var(--font-size-md)',
  color: 'var(--color-text-primary)', outline: 'none',
}
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)',
  color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)',
}

export function EntityFormDrawer({ open, mode, config, initial, parentId, submitting, onClose, onSubmit }: EntityFormDrawerProps) {
  const [form, setForm] = useState<Record<string, unknown>>({})
  const [parent, setParent] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  const needsParentPicker = !!config.parent && !parentId
  const parentOptions = useParentOptions(config.parent?.table, 'name', open && needsParentPicker)

  useEffect(() => {
    if (!open) return
    setError(null)
    const base: Record<string, unknown> = { ...config.defaults }
    if (initial) for (const f of config.fields) base[f.name] = initial[f.name] ?? ''
    setForm(base)
    setParent(initial && config.parent ? String(initial[config.parent.key] ?? '') : '')
  }, [open, initial, config])

  const setField = (name: string, value: unknown) => {
    setForm((f) => ({ ...f, [name]: value }))
    if (error) setError(null)
  }

  function submit() {
    if (String(form.name ?? '').trim().length < 2) { setError(`Enter a ${config.singular.toLowerCase()} name`); return }
    if (needsParentPicker && !parent) { setError(`Select a ${config.parent!.label.toLowerCase()}`); return }

    const input: Record<string, unknown> = {}
    for (const f of config.fields) {
      let v = form[f.name]
      if (f.type === 'number') v = v === '' || v == null ? null : Number(v)
      if (f.type === 'date') v = v === '' ? null : v
      input[f.name] = v
    }
    if (config.parent) input[config.parent.key] = parentId ?? parent
    onSubmit(input)
  }

  function renderField(f: FieldDef) {
    const value = (form[f.name] ?? '') as string
    if (f.type === 'textarea') {
      return (
        <div key={f.name}>
          <label style={labelStyle} htmlFor={`f-${f.name}`}>{f.label}</label>
          <textarea id={`f-${f.name}`} value={value} placeholder={f.placeholder} rows={3} style={textareaStyle}
            onChange={(e) => setField(f.name, e.target.value)} />
        </div>
      )
    }
    if (f.type === 'select') {
      return (
        <Select key={f.name} label={f.label} options={f.options ?? []} value={value}
          onChange={(e) => setField(f.name, e.target.value)} />
      )
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
    <Drawer
      open={open}
      onClose={onClose}
      variant={mode}
      title={mode === 'create' ? `Create ${config.singular.toLowerCase()}` : `Edit ${config.singular.toLowerCase()}`}
      primaryLabel={mode === 'create' ? `Create ${config.singular.toLowerCase()}` : 'Save changes'}
      onPrimary={submit}
      primaryLoading={submitting}
      secondaryLabel="Cancel"
      onSecondary={onClose}
    >
      <Fields>
        {needsParentPicker && (
          <Select
            label={config.parent!.label}
            options={parentOptions.data ?? []}
            value={parent}
            onChange={(e) => { setParent(e.target.value); if (error) setError(null) }}
            placeholder={parentOptions.isLoading ? 'Loading…' : `Select a ${config.parent!.label.toLowerCase()}`}
          />
        )}
        {config.fields.map(renderField)}
      </Fields>
    </Drawer>
  )
}
