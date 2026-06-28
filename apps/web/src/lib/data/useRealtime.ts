'use client'

import { useEffect } from 'react'
import { useQueryClient, type QueryKey } from '@tanstack/react-query'
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client'

interface RealtimeFilter { column: string; value: string }

/**
 * Subscribes to Postgres changes on a table and invalidates a React Query key
 * so the UI updates live. No-ops when Supabase isn't configured.
 */
export function useRealtime(table: string, queryKey: QueryKey, filter?: RealtimeFilter) {
  const qc = useQueryClient()
  const keyStr = JSON.stringify(queryKey)
  const filterVal = filter?.value

  useEffect(() => {
    if (!isSupabaseConfigured) return
    const supabase = createClient()
    // Unique channel per query key so two components watching the same table
    // don't collide on the same channel topic.
    const topic = `rt:${table}:${keyStr}:${filterVal ?? 'all'}`
    let channel: ReturnType<typeof supabase.channel> | null = null
    try {
      channel = supabase
        .channel(topic)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table,
            ...(filter ? { filter: `${filter.column}=eq.${filter.value}` } : {}),
          },
          () => qc.invalidateQueries({ queryKey }),
        )
        .subscribe()
    } catch {
      // Realtime is non-critical — never let it take down the page.
      channel = null
    }
    return () => { if (channel) supabase.removeChannel(channel) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, keyStr, filterVal])
}
