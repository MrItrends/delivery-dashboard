import { createClient as createSupabaseClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

/** True when the service-role key is available (server, e.g. Vercel). */
export function hasServiceRole() {
  return !!url && !!serviceKey
}

/** Service-role Supabase client. SERVER-ONLY — never import into client code. */
export function createAdminClient() {
  if (!url || !serviceKey) throw new Error('Service role key not configured')
  return createSupabaseClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}
