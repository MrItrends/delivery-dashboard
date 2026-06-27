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
    const channel = supabase
      .channel(`rt:${table}:${filterVal ?? 'all'}`)
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
    return () => { supabase.removeChannel(channel) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, keyStr, filterVal])
}
