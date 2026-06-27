'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { AppShell } from '@/components/layout/AppShell'
import { PageHeader } from '@/components/layout/PageHeader'
import { Icon } from '@/components/primitives/Icon'
import { searchAll } from '@/lib/data/search'
import { pushRecent } from '@/lib/data/recents'
import { highlight } from '@/lib/highlight'
import page from '@/components/portfolio/PortfolioWorkspace.module.css'
import s from '@/components/pages/pages.module.css'

export default function SearchPage() {
  const router = useRouter()
  const [q, setQ] = useState('')
  const [type, setType] = useState<string | null>(null)
  const { data, isFetching } = useQuery({
    queryKey: ['search', q],
    queryFn: () => searchAll(q),
    enabled: q.trim().length >= 2,
  })
  const all = data ?? []
  const types = useMemo(() => Array.from(new Set(all.map((r) => r.type))), [all])
  const results = type ? all.filter((r) => r.type === type) : all

  return (
    <AppShell>
      <div className={page.page}>
        <PageHeader title="Search" description="Find anything across the workspace — projects, people, reports, decisions and more." />
        <div className={page.body} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <input
            className={s.searchInput}
            placeholder="Search for anything…"
            value={q}
            onChange={(e) => { setQ(e.target.value); setType(null) }}
            autoFocus
            aria-label="Search"
          />

          {types.length > 1 && (
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              <button type="button" className={`${s.tag} ${s.rowButton}`} style={{ cursor: 'pointer', fontWeight: !type ? 600 : 400, borderColor: !type ? 'var(--color-border-focus)' : undefined }} onClick={() => setType(null)}>All ({all.length})</button>
              {types.map((t) => (
                <button key={t} type="button" className={`${s.tag} ${s.rowButton}`} style={{ cursor: 'pointer', fontWeight: type === t ? 600 : 400, borderColor: type === t ? 'var(--color-border-focus)' : undefined }} onClick={() => setType(t)}>
                  {t} ({all.filter((r) => r.type === t).length})
                </button>
              ))}
            </div>
          )}

          {q.trim().length < 2 ? (
            <div className={s.empty}>Type at least 2 characters to search.</div>
          ) : isFetching ? (
            <div className={s.empty}>Searching…</div>
          ) : results.length === 0 ? (
            <div className={s.empty}>No results for &ldquo;{q}&rdquo;.</div>
          ) : (
            <ul className={s.list} role="list">
              {results.map((r) => (
                <li key={`${r.type}-${r.id}`}>
                  <button type="button" className={`${s.row} ${s.rowButton}`} disabled={!r.href} onClick={() => { if (r.href) { pushRecent({ label: r.label, href: r.href, type: r.type }); router.push(r.href) } }}>
                    <Icon name="search" size={16} style={{ color: 'var(--color-text-tertiary)' }} />
                    <span className={s.rowMain}><span className={s.rowTitle}>{highlight(r.label, q)}</span></span>
                    <span className={s.tag}>{r.type}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AppShell>
  )
}
