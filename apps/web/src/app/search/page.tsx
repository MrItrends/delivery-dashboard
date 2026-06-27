'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { AppShell } from '@/components/layout/AppShell'
import { PageHeader } from '@/components/layout/PageHeader'
import { Icon } from '@/components/primitives/Icon'
import { searchAll } from '@/lib/data/search'
import page from '@/components/portfolio/PortfolioWorkspace.module.css'
import s from '@/components/pages/pages.module.css'

export default function SearchPage() {
  const router = useRouter()
  const [q, setQ] = useState('')
  const { data, isFetching } = useQuery({
    queryKey: ['search', q],
    queryFn: () => searchAll(q),
    enabled: q.trim().length >= 2,
  })
  const results = data ?? []

  return (
    <AppShell>
      <div className={page.page}>
        <PageHeader title="Search" description="Find projects, priority areas, interventions and activities across the workspace." />
        <div className={page.body} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <input
            className={s.searchInput}
            placeholder="Search for anything…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            autoFocus
            aria-label="Search"
          />

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
                  <button type="button" className={`${s.row} ${s.rowButton}`} disabled={!r.href} onClick={() => r.href && router.push(r.href)}>
                    <Icon name="search" size={16} style={{ color: 'var(--color-text-tertiary)' }} />
                    <span className={s.rowMain}><span className={s.rowTitle}>{r.label}</span></span>
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
