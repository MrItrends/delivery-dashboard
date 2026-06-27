'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { AppShell } from '@/components/layout/AppShell'
import { PageHeader } from '@/components/layout/PageHeader'
import { Avatar } from '@/components/primitives/Avatar'
import { useToastStore } from '@/stores/useToastStore'
import { getWorkspace, listMembers, updateMemberRole } from '@/lib/data/admin'
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
    </AppShell>
  )
}
