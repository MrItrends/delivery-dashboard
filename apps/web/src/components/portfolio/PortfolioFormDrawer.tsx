'use client'

import { useState, useEffect } from 'react'
import { Drawer } from '@/components/overlay/Drawer'
import { TextField } from '@/components/primitives/TextField'
import { Select } from '@/components/primitives/Select'
import { Fields } from '@/components/onboarding/FormLayout'
import type { SelectOption } from '@/lib/onboarding/options'
import type { Portfolio, PortfolioInput } from '@/lib/data/portfolios'
import type { ObjectStatus } from '@/components/primitives/StatusChip'

const STATUS_OPTIONS: SelectOption[] = [
  { value: 'healthy', label: 'Healthy' },
  { value: 'at-risk', label: 'At risk' },
  { value: 'critical', label: 'Critical' },
]

interface PortfolioFormDrawerProps {
  open: boolean
  mode: 'create' | 'edit'
  initial?: Portfolio | null
  submitting?: boolean
  onClose: () => void
  onSubmit: (input: PortfolioInput) => void
}

const empty: PortfolioInput = {
  name: '', description: '', owner: '', reporting_period: '',
  health: 'healthy', budget_health: 'healthy', risk_level: 'healthy',
}

export function PortfolioFormDrawer({ open, mode, initial, submitting, onClose, onSubmit }: PortfolioFormDrawerProps) {
  const [form, setForm] = useState<PortfolioInput>(empty)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (open) {
      setError(null)
      setForm(initial ? {
        name: initial.name,
        description: initial.description ?? '',
        owner: initial.owner ?? '',
        reporting_period: initial.reporting_period ?? '',
        health: initial.health,
        budget_health: initial.budget_health,
        risk_level: initial.risk_level,
      } : empty)
    }
  }, [open, initial])

  const set = (k: keyof PortfolioInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    if (error) setError(null)
  }

  function submit() {
    if (form.name.trim().length < 2) { setError('Enter a portfolio name'); return }
    onSubmit({ ...form, name: form.name.trim() })
  }

  return (
    <Drawer
      open={open}
      onClose={onClose}
      variant={mode === 'create' ? 'create' : 'edit'}
      title={mode === 'create' ? 'Create portfolio' : 'Edit portfolio'}
      description={mode === 'create' ? 'A portfolio groups the strategic priorities you’re accountable for.' : undefined}
      primaryLabel={mode === 'create' ? 'Create portfolio' : 'Save changes'}
      onPrimary={submit}
      primaryLoading={submitting}
      secondaryLabel="Cancel"
      onSecondary={onClose}
    >
      <Fields>
        <TextField label="Name" placeholder="e.g. Healthcare Transformation" value={form.name} onChange={set('name')} error={error ?? undefined} autoFocus />
        <div>
          <label style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-2)' }}>Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="What does this portfolio set out to achieve?"
            rows={3}
            style={{ width: '100%', resize: 'vertical', padding: 'var(--space-3)', border: '1px solid var(--color-border-strong)', borderRadius: 'var(--radius-lg)', fontFamily: 'var(--font-family-sans)', fontSize: 'var(--font-size-md)', color: 'var(--color-text-primary)', outline: 'none' }}
          />
        </div>
        <TextField label="Owner" placeholder="e.g. Dr. Amara Okonkwo" value={form.owner ?? ''} onChange={set('owner')} />
        <TextField label="Reporting period" placeholder="e.g. Q2 2026 · Apr–Jun" value={form.reporting_period ?? ''} onChange={set('reporting_period')} />
        <Select label="Overall health" options={STATUS_OPTIONS} value={form.health} onChange={set('health') as (e: React.ChangeEvent<HTMLSelectElement>) => void} />
        <Select label="Budget health" options={STATUS_OPTIONS} value={form.budget_health} onChange={set('budget_health') as (e: React.ChangeEvent<HTMLSelectElement>) => void} />
        <Select label="Risk level" options={STATUS_OPTIONS} value={form.risk_level} onChange={set('risk_level') as (e: React.ChangeEvent<HTMLSelectElement>) => void} />
      </Fields>
    </Drawer>
  )
}

export type { ObjectStatus }
