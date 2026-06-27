'use client'

import { createClient } from '@/lib/supabase/client'

export interface SearchResult {
  id: string
  type: string
  label: string
  href: string | null
}

const SOURCES: { table: string; type: string; column: string; route: string | null }[] = [
  { table: 'portfolios', type: 'Portfolio', column: 'name', route: '/portfolio' },
  { table: 'priority_areas', type: 'Priority area', column: 'name', route: '/priority-areas' },
  { table: 'projects', type: 'Project', column: 'name', route: '/projects' },
  { table: 'interventions', type: 'Intervention', column: 'name', route: '/interventions' },
  { table: 'activities', type: 'Activity', column: 'name', route: null },
  { table: 'reports', type: 'Report', column: 'title', route: '/reports' },
  { table: 'profiles', type: 'Person', column: 'name', route: null },
  { table: 'decisions', type: 'Decision', column: 'decision', route: null },
  { table: 'comments', type: 'Comment', column: 'body', route: null },
]

export async function searchAll(query: string): Promise<SearchResult[]> {
  const q = query.trim()
  if (q.length < 1) return []
  const ql = q.toLowerCase()
  const supabase = createClient()
  const all: (SearchResult & { score: number })[] = []

  await Promise.all(
    SOURCES.map(async (src) => {
      const { data } = await supabase.from(src.table).select(`id, ${src.column}`).ilike(src.column, `%${q}%`).limit(6)
      const rows = (data ?? []) as unknown as Record<string, unknown>[]
      for (const row of rows) {
        const label = String(row[src.column] ?? '')
        const lower = label.toLowerCase()
        const score = lower === ql ? 4 : lower.startsWith(ql) ? 3 : 2
        all.push({
          id: String(row.id),
          type: src.type,
          label,
          href: src.route ? `${src.route}/${row.id}` : null,
          score,
        })
      }
    })
  )

  all.sort((a, b) => b.score - a.score)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return all.slice(0, 30).map(({ score, ...rest }) => rest)
}
