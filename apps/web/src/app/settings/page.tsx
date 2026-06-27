'use client'

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AppShell } from '@/components/layout/AppShell'
import { PageHeader } from '@/components/layout/PageHeader'
import { TextField } from '@/components/primitives/TextField'
import { Select } from '@/components/primitives/Select'
import { Button } from '@/components/primitives/Button'
import { useToastStore } from '@/stores/useToastStore'
import { useAppStore } from '@/stores/useAppStore'
import { getWorkspace, updateWorkspace } from '@/lib/data/admin'
import { TIMEZONES, COUNTRIES, CURRENCIES } from '@/lib/onboarding/options'
import page from '@/components/portfolio/PortfolioWorkspace.module.css'
import s from '@/components/pages/pages.module.css'

export default function SettingsPage() {
  const toast = useToastStore()
  const density = useAppStore((st) => st.density)
  const setDensity = useAppStore((st) => st.setDensity)
  const { data, refetch } = useQuery({ queryKey: ['workspace'], queryFn: getWorkspace })

  const [form, setForm] = useState({ name: '', organization: '', country: '', timezone: '', currency: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (data) setForm({ name: data.name ?? '', organization: data.organization ?? '', country: data.country ?? '', timezone: data.timezone ?? '', currency: data.currency ?? 'NGN' })
  }, [data])

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm((f) => ({ ...f, [k]: e.target.value }))

  async function save() {
    if (!data) return
    setSaving(true)
    try { await updateWorkspace(data.id, form); toast.success('Workspace settings saved'); refetch() }
    catch { toast.error('Could not save') }
    finally { setSaving(false) }
  }

  return (
    <AppShell>
      <div className={page.page}>
        <PageHeader title="Settings" description="Manage your workspace and preferences." />
        <div className={page.body} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <div className={s.card}>
            <h2 className={s.cardTitle}>Workspace</h2>
            <div className={s.fields}>
              <TextField label="Workspace name" value={form.name} onChange={set('name')} />
              <TextField label="Organisation" value={form.organization} onChange={set('organization')} />
              <Select label="Country" options={COUNTRIES} value={form.country} onChange={set('country')} placeholder="Select a country" />
              <Select label="Timezone" options={TIMEZONES} value={form.timezone} onChange={set('timezone')} placeholder="Select a timezone" />
              <Select label="Currency" options={CURRENCIES} value={form.currency} onChange={set('currency')} placeholder="Select a currency" />
            </div>
            <div className={s.formActions}>
              <Button variant="primary" size="md" loading={saving} onClick={save} disabled={!data}>Save changes</Button>
            </div>
          </div>

          <div className={s.card}>
            <h2 className={s.cardTitle}>Appearance</h2>
            <div className={s.fields}>
              <div>
                <label style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-2)' }}>Density</label>
                <div className={s.segmented} role="group" aria-label="Density">
                  {(['comfortable', 'compact'] as const).map((d) => (
                    <button key={d} type="button" className={`${s.segBtn} ${density === d ? s.segActive : ''}`} aria-pressed={density === d} onClick={() => setDensity(d)} style={{ textTransform: 'capitalize' }}>{d}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
