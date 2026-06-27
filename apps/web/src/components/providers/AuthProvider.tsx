'use client'

import { useEffect } from 'react'
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client'
import { useAppStore } from '@/stores/useAppStore'
import type { User } from '@supabase/supabase-js'

function toAppUser(u: User | null) {
  if (!u) return null
  return {
    id: u.id,
    name: (u.user_metadata?.name as string) || u.email || 'User',
    email: u.email || '',
    role: (u.user_metadata?.role as string) || 'contributor',
  }
}

/** Keeps the app store's `user` in sync with the Supabase session. */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAppStore((s) => s.setUser)

  useEffect(() => {
    if (!isSupabaseConfigured) return
    const supabase = createClient()
    let active = true

    supabase.auth.getUser().then(({ data }) => {
      if (active) setUser(toAppUser(data.user))
    })

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(toAppUser(session?.user ?? null))
    })

    return () => {
      active = false
      sub.subscription.unsubscribe()
    }
  }, [setUser])

  return <>{children}</>
}
