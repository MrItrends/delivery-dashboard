'use client'

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AppShell } from '@/components/layout/AppShell'
import { PageHeader } from '@/components/layout/PageHeader'
import { TextField } from '@/components/primitives/TextField'
import { Button } from '@/components/primitives/Button'
import { Avatar } from '@/components/primitives/Avatar'
import { useToastStore } from '@/stores/useToastStore'
import { getMyProfile, updateMyProfile, roleLabel } from '@/lib/data/admin'
import page from '@/components/portfolio/PortfolioWorkspace.module.css'
import s from '@/components/pages/pages.module.css'

export default function ProfilePage() {
  const toast = useToastStore()
  const { data, refetch } = useQuery({ queryKey: ['profile'], queryFn: getMyProfile })
  const [name, setName] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => { if (data) setName(data.name) }, [data])

  async function save() {
    setSaving(true)
    try { await updateMyProfile({ name }); toast.success('Profile updated'); refetch() }
    catch { toast.error('Could not save') }
    finally { setSaving(false) }
  }

  return (
    <AppShell>
      <div className={page.page}>
        <PageHeader title="Profile" description="Your personal details across the workspace." />
        <div className={page.body}>
          <div className={s.card}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
              <Avatar name={data?.name || 'You'} size="lg" />
              <div>
                <div style={{ fontSize: 'var(--font-size-md)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)' }}>{data?.name || '—'}</div>
                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)' }}>{data ? roleLabel(data.role) : ''}</div>
              </div>
            </div>
            <div className={s.fields}>
              <TextField label="Full name" value={name} onChange={(e) => setName(e.target.value)} />
              <TextField label="Email" value={data?.email ?? ''} disabled />
            </div>
            <div className={s.formActions}>
              <Button variant="primary" size="md" loading={saving} onClick={save}>Save changes</Button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
