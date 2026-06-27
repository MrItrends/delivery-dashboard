'use client'

import { createClient } from '@/lib/supabase/client'

export type DocType = 'pdf' | 'image' | 'doc' | 'sheet' | 'slides' | 'other'

export interface DocumentRow {
  id: string
  name: string
  type: DocType
  version: number
  size: string | null
  storage_path: string | null
  object_type: string | null
  object_id: string | null
  uploaded_by: string | null
  created_at: string
  uploader?: { name: string } | null
}

const BUCKET = 'documents'
const SELECT = '*, uploader:profiles(name)'

function typeFromName(name: string): DocType {
  const ext = name.split('.').pop()?.toLowerCase() ?? ''
  if (ext === 'pdf') return 'pdf'
  if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(ext)) return 'image'
  if (['doc', 'docx', 'txt', 'rtf'].includes(ext)) return 'doc'
  if (['xls', 'xlsx', 'csv'].includes(ext)) return 'sheet'
  if (['ppt', 'pptx'].includes(ext)) return 'slides'
  return 'other'
}

function humanSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export async function listDocuments(objectType: string, objectId: string): Promise<DocumentRow[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('documents')
    .select(SELECT)
    .eq('object_type', objectType)
    .eq('object_id', objectId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data ?? []) as unknown as DocumentRow[]
}

export async function uploadDocument(objectType: string, objectId: string, file: File): Promise<DocumentRow> {
  const supabase = createClient()
  const { data: auth } = await supabase.auth.getUser()
  const uid = auth.user?.id
  if (!uid) throw new Error('You need to be signed in to upload.')

  const path = `${objectType}/${objectId}/${crypto.randomUUID()}-${file.name}`
  const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, file, { upsert: false })
  if (upErr) throw upErr

  // Version = how many docs already share this name on this object, + 1.
  const { count } = await supabase
    .from('documents')
    .select('id', { count: 'exact', head: true })
    .eq('object_type', objectType).eq('object_id', objectId).eq('name', file.name)
  const version = (count ?? 0) + 1

  const { data, error } = await supabase
    .from('documents')
    .insert({
      name: file.name, type: typeFromName(file.name), version, size: humanSize(file.size),
      storage_path: path, object_type: objectType, object_id: objectId, uploaded_by: uid,
    })
    .select(SELECT)
    .single()
  if (error) throw error
  return data as unknown as DocumentRow
}

export async function getDocumentUrl(path: string): Promise<string> {
  const supabase = createClient()
  const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(path, 3600)
  if (error) throw error
  return data.signedUrl
}

export async function deleteDocument(id: string, path: string | null): Promise<void> {
  const supabase = createClient()
  if (path) await supabase.storage.from(BUCKET).remove([path])
  const { error } = await supabase.from('documents').delete().eq('id', id)
  if (error) throw error
}
