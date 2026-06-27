'use client'

import { createClient } from '@/lib/supabase/client'

export interface DbNotification {
  id: string
  type: string
  actor: string | null
  action: string
  target: string | null
  context: string | null
  read: boolean
  created_at: string
}

async function currentUid(): Promise<string | null> {
  const { data } = await createClient().auth.getUser()
  return data.user?.id ?? null
}

export async function listNotifications(): Promise<DbNotification[]> {
  const uid = await currentUid()
  if (!uid) return []
  const { data, error } = await createClient()
    .from('notifications')
    .select('*')
    .eq('user_id', uid)
    .order('created_at', { ascending: false })
    .limit(50)
  if (error) throw error
  return (data ?? []) as DbNotification[]
}

export async function markAllRead(): Promise<void> {
  const uid = await currentUid()
  if (!uid) return
  const { error } = await createClient().from('notifications').update({ read: true }).eq('user_id', uid).eq('read', false)
  if (error) throw error
}

export async function markRead(id: string): Promise<void> {
  const { error } = await createClient().from('notifications').update({ read: true }).eq('id', id)
  if (error) throw error
}
