'use client'

import { createClient } from '@/lib/supabase/client'

export interface SearchResult {
  id: string
  type: string
  label: string
  href: string | null
}

const SOURCES: { table: string; type: string; route: string | null }[] = [
  { table: 'portfolios', type: 'Portfolio', route: '/portfolio' },
  { table: 'priority_areas', type: 'Priority area', route: '/priority-areas' },
  { table: 'projects', type: 'Project', route: '/projects' },
  { table: 'interventions', type: 'Intervention', route: '/interventions' },
  { table: 'activities', type: 'Activity', route: null },
]

export async function searchAll(query: string): Promise<SearchResult[]> {
  const q = query.trim()
  if (!q) return []
  const supabase = createClient()
  const results: SearchResult[] = []
  await Promise.all(
    SOURCES.map(async (s) => {
      const { data } = await supabase.from(s.table).select('id, name').ilike('name', `%${q}%`).eq('archived', false).limit(8)
      for (const r of (data ?? []) as { id: string; name: string }[]) {
        results.push({ id: r.id, type: s.type, label: r.name, href: s.route ? `${s.route}/${r.id}` : null })
      }
    })
  )
  return results
}
