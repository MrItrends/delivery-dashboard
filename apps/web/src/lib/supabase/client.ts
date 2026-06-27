'use client'

import { createBrowserClient } from '@supabase/ssr'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(url && anon)

/** Browser Supabase client (singleton per tab). */
export function createClient() {
  if (!url || !anon) {
    throw new Error('Supabase env vars are not set (NEXT_PUBLIC_SUPABASE_URL / _ANON_KEY)')
  }
  return createBrowserClient(url, anon)
}
