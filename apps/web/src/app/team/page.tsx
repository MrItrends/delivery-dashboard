'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { AppShell } from '@/components/layout/AppShell'
import { PageHeader } from '@/components/layout/PageHeader'
import { Avatar } from '@/components/primitives/Avatar'
import { Button } from '@/components/primitives/Button'
import { TextField } from '@/components/primitives/TextField'
import { Select } from '@/components/primitives/Select'
import { Icon } from '@/components/primitives/Icon'
import { useToastStore } from '@/stores/useToastStore'
import { getWorkspace, listMembers, updateMemberRole, listInvites, createInvite, deleteInvite } from '@/lib/data/admin'
import { ROLE_OPTIONS, roleLabel, useCapabilities } from '@/lib/data/roles'
import page from '@/components/portfolio/PortfolioWorkspace.module.css'
import s from '@/components/pages/pages.module.css'

export default function TeamPage() {
  const toast = useToastStore()
  const qc = useQueryClient()
  const caps = useCapabilities()

  const { data, isLoading } = useQuery({
    queryKey: ['team'],
    queryFn: async () => {
      const ws = await getWorkspace()
      if (!ws) return { wsId: null, members: [], invites: [] }
      const [members, invites] = await Promise.all([listMembers(ws.id), listInvites(ws.id)])
      return { wsId: ws.id, members, invites }
    },
  })

  const roleMut = useMutation({
    mutationFn: ({ id, role }: { id: string; role: string }) => updateMemberRole(id, role),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['team'] }); toast.success('Role updated') },
    onError: () => toast.error('Could not update role'),
  })
  const inviteMut = useMutation({
    mutationFn: ({ wsId, email, role }: { wsId: string; email: string; role: string }) => createInvite(wsId, email, role),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['team'] }); toast.success('Invitation sent'); setEmail('') },
    onError: () => toast.error('Could not invite'),
  })
  const removeInvite = useMutation({
    mutationFn: (id: string) => deleteInvite(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['team'] }); toast.success('Invitation removed') },
  })

  const [email, setEmail] = useState('')
  const [role, setRole] = useState('regular')

  const members = data?.members ?? []
  const invites = data?.invites ?? []

  function submitInvite() {
    if (!data?.wsId) return
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) { toast.error('Enter a valid email address'); return }
    inviteMut.mutate({ wsId: data.wsId, email, role })
  }

  return (
    <AppShell>
      <div className={page.page}>
        <PageHeader title="Team" description="People in this workspace and what they can do." />
        <div className={page.body} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {/* Invite (admins only) */}
          {caps.canManageUsers && (
            <div className={s.card} style={{ maxWidth: 'none' }}>
              <h2 className={s.cardTitle}>Invite people</h2>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)', marginBottom: 'var(--space-4)' }}>
                They join this workspace as soon as they sign up with the invited email.
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 240 }}>
                  <TextField label="Work email" placeholder="firstname.lastname@health.gov.ng" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div style={{ width: 180 }}>
                  <Select label="Role" options={ROLE_OPTIONS} value={role} onChange={(e) => setRole(e.target.value)} />
                </div>
                <Button variant="primary" size="md" loading={inviteMut.isPending} onClick={submitInvite}>Send invite</Button>
              </div>

              {invites.length > 0 && (
                <ul className={s.list} role="list" style={{ marginTop: 'var(--space-5)' }}>
                  {invites.map((inv) => (
                    <li key={inv.id}>
                      <div className={s.row}>
                        <Icon name="mail" size={16} style={{ color: 'var(--color-text-tertiary)' }} />
                        <span className={s.rowMain}>
                          <span className={s.rowTitle}>{inv.email}</span>
                          <span className={s.rowSub}>Invited as {roleLabel(inv.role)} · pending</span>
                        </span>
                        <button type="button" className={s.roleSelect} style={{ width: 32, padding: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }} aria-label="Remove invitation" onClick={() => removeInvite.mutate(inv.id)}><Icon name="alert-circle" size={15} /></button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Members */}
          <div>
            <h2 className={s.cardTitle} style={{ marginBottom: 'var(--space-3)' }}>Members</h2>
            {isLoading ? (
              <div className={s.empty}>Loading…</div>
            ) : members.length === 0 ? (
              <div className={s.empty}>No members yet.</div>
            ) : (
              <ul className={s.list} role="list">
                {members.map((m) => (
                  <li key={m.membershipId}>
                    <div className={s.row}>
                      <Avatar name={m.name} size="sm" />
                      <span className={s.rowMain}>
                        <span className={s.rowTitle}>{m.name}</span>
                        <span className={s.rowSub}>{m.email}</span>
                      </span>
                      <span className={s.rowRight}>
                        {caps.canManageUsers ? (
                          <select className={s.roleSelect} value={m.role} onChange={(e) => roleMut.mutate({ id: m.membershipId, role: e.target.value })} aria-label={`Role for ${m.name}`}>
                            {ROLE_OPTIONS.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
                          </select>
                        ) : (
                          <span className={s.tag}>{roleLabel(m.role)}</span>
                        )}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
