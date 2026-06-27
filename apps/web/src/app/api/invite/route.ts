import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient, hasServiceRole } from '@/lib/supabase/admin'

const CANON_ROLES = ['admin', 'priority-area-lead', 'intervention-lead', 'regular']
const ADMIN_VALUES = ['admin', 'administrator', 'executive']
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

export async function POST(req: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Not signed in' }, { status: 401 })

  let body: { email?: string; role?: string }
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid request' }, { status: 400 }) }

  const email = (body.email ?? '').trim().toLowerCase()
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: 'Enter a valid email address' }, { status: 400 })
  const role = CANON_ROLES.includes(body.role ?? '') ? body.role! : 'regular'

  // The caller must be an admin of their workspace.
  const { data: membership } = await supabase
    .from('memberships').select('workspace_id, role').eq('user_id', user.id).limit(1).maybeSingle()
  if (!membership) return NextResponse.json({ error: 'No workspace found' }, { status: 400 })
  if (!ADMIN_VALUES.includes(membership.role as string)) {
    return NextResponse.json({ error: 'Only an administrator can invite people' }, { status: 403 })
  }

  // Record the pending invite (RLS allows admin members). The sign-up trigger
  // consumes it so the invitee joins this workspace.
  const { error: insErr } = await supabase
    .from('workspace_invites')
    .upsert({ workspace_id: membership.workspace_id, email, role, invited_by: user.id }, { onConflict: 'workspace_id,email' })
  if (insErr) return NextResponse.json({ error: insErr.message }, { status: 400 })

  // Best-effort: send the invitation email via the service-role admin API.
  let emailed = false
  if (hasServiceRole()) {
    try {
      const admin = createAdminClient()
      const origin = req.headers.get('origin') ?? new URL(req.url).origin
      const { error } = await admin.auth.admin.inviteUserByEmail(email, { redirectTo: `${origin}/welcome` })
      emailed = !error
    } catch { emailed = false }
  }

  return NextResponse.json({ ok: true, emailed })
}
