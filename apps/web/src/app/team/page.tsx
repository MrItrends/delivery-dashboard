'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { AppShell } from '@/components/layout/AppShell'
import { PageHeader } from '@/components/layout/PageHeader'
import { Avatar } from '@/components/primitives/Avatar'
import { Button } from '@/components/primitives/Button'
import { Icon } from '@/components/primitives/Icon'
import { useToastStore } from '@/stores/useToastStore'
import { getWorkspace, listMembers, updateMemberRole, ROLE_OPTIONS } from '@/lib/data/admin'
import page from '@/components/portfolio/PortfolioWorkspace.module.css'
import s from '@/components/pages/pages.module.css'

export default function TeamPage() {
  const toast = useToastStore()
  const qc = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: ['team'],
    queryFn: async () => {
      const ws = await getWorkspace()
      if (!ws) return { members: [] }
      return { members: await listMembers(ws.id) }
    },
  })
  const roleMut = useMutation({
    mutationFn: ({ id, role }: { id: string; role: string }) => updateMemberRole(id, role),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['team'] }); toast.success('Role updated') },
    onError: () => toast.error('Could not update role'),
  })

  const members = data?.members ?? []

  return (
    <AppShell>
      <div className={page.page}>
        <PageHeader
          title="Team"
          description="People in this workspace and what they can do."
          primaryAction={<Button variant="primary" size="md" iconLeft={<Icon name="plus" size={16} />} onClick={() => toast.info('Invite by email — coming soon')}>Invite</Button>}
        />
        <div className={page.body}>
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
                      <select className={s.roleSelect} value={m.role} onChange={(e) => roleMut.mutate({ id: m.membershipId, role: e.target.value })} aria-label={`Role for ${m.name}`}>
                        {ROLE_OPTIONS.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
                      </select>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AppShell>
  )
}
