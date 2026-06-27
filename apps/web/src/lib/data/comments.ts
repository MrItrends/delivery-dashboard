'use client'

import { createClient } from '@/lib/supabase/client'

export interface Comment {
  id: string
  object_type: string
  object_id: string
  author_id: string | null
  body: string
  resolved: boolean
  pinned: boolean
  created_at: string
  author?: { name: string; avatar_color: string | null } | null
}

const SELECT = '*, author:profiles(name, avatar_color)'

export async function listComments(objectType: string, objectId: string): Promise<Comment[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('comments')
    .select(SELECT)
    .eq('object_type', objectType)
    .eq('object_id', objectId)
    .order('created_at', { ascending: true })
  if (error) throw error
  return (data ?? []) as unknown as Comment[]
}

/** Names like "@Ahmed Yusuf". */
function extractMentions(body: string): string[] {
  return [...body.matchAll(/@([A-Z][a-z]+ [A-Z][a-z]+)/g)].map((m) => m[1]!)
}

export async function createComment(objectType: string, objectId: string, body: string): Promise<Comment> {
  const supabase = createClient()
  const { data: auth } = await supabase.auth.getUser()
  const uid = auth.user?.id
  if (!uid) throw new Error('You need to be signed in to comment.')
  const authorName = (auth.user?.user_metadata?.name as string) || auth.user?.email || 'Someone'

  const { data, error } = await supabase
    .from('comments')
    .insert({ object_type: objectType, object_id: objectId, author_id: uid, body })
    .select(SELECT)
    .single()
  if (error) throw error

  // Fire mention notifications (best-effort — never block the comment).
  try {
    const mentions = extractMentions(body)
    if (mentions.length) {
      const { data: profs } = await supabase.from('profiles').select('id, name').in('name', mentions)
      const recipients = (profs ?? []).filter((p) => p.id !== uid)
      if (recipients.length) {
        await supabase.from('notifications').insert(
          recipients.map((p) => ({
            user_id: p.id,
            type: 'mention',
            actor: authorName,
            action: 'mentioned you in a comment',
            target: objectType,
            context: body.slice(0, 80),
          }))
        )
      }
    }
  } catch {
    /* ignore mention failures */
  }

  return data as unknown as Comment
}

export async function setCommentFlags(id: string, patch: { resolved?: boolean; pinned?: boolean }): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase.from('comments').update(patch).eq('id', id)
  if (error) throw error
}
