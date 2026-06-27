'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { isSupabaseConfigured } from '@/lib/supabase/client'
import { listNotifications, markAllRead, markRead } from './notifications'

const KEY = ['notifications'] as const

export function useNotifications() {
  return useQuery({
    queryKey: KEY,
    queryFn: listNotifications,
    enabled: isSupabaseConfigured,
    refetchInterval: 30_000,
  })
}

export function useUnreadCount() {
  const { data } = useNotifications()
  return (data ?? []).filter((n) => !n.read).length
}

export function useNotificationMutations() {
  const qc = useQueryClient()
  const invalidate = () => qc.invalidateQueries({ queryKey: KEY })
  const readAll = useMutation({ mutationFn: markAllRead, onSuccess: invalidate })
  const readOne = useMutation({ mutationFn: (id: string) => markRead(id), onSuccess: invalidate })
  return { readAll, readOne }
}
