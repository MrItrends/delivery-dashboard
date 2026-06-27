'use client'

import { useState, useRef } from 'react'
import { Avatar } from '@/components/primitives/Avatar'
import { Icon, type IconName } from '@/components/primitives/Icon'
import { useToastStore } from '@/stores/useToastStore'
import { useDocuments, useDocumentMutations } from '@/lib/data/useDocuments'
import { getDocumentUrl, type DocType } from '@/lib/data/documents'
import styles from '@/components/intervention/EvidenceList.module.css'

const TYPE_ICON: Record<DocType, IconName> = {
  pdf: 'document', image: 'grid', doc: 'document', sheet: 'grid', slides: 'document', other: 'document',
}

function timeAgo(iso: string) {
  const m = Math.floor((Date.now() - new Date(iso).getTime()) / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })
}

interface DocumentListProps {
  objectType: string
  objectId: string
}

export function DocumentList({ objectType, objectId }: DocumentListProps) {
  const toast = useToastStore()
  const { data, isLoading } = useDocuments(objectType, objectId)
  const { upload, remove } = useDocumentMutations(objectType, objectId)
  const [dragOver, setDragOver] = useState(false)
  const [uploadingName, setUploadingName] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return
    Array.from(files).forEach((file) => {
      setUploadingName(file.name)
      upload.mutate(file, {
        onSuccess: () => { toast.success(`${file.name} uploaded`); setUploadingName(null) },
        onError: (e) => { toast.error(e instanceof Error ? e.message : 'Upload failed'); setUploadingName(null) },
      })
    })
  }

  async function open(path: string | null, name: string) {
    if (!path) return
    try { window.open(await getDocumentUrl(path), '_blank', 'noopener') }
    catch { toast.error(`Couldn’t open ${name}`) }
  }

  const items = data ?? []

  return (
    <div className={styles.wrap}>
      <div
        className={`${styles.dropzone} ${dragOver ? styles.dragOver : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files) }}
      >
        <input ref={inputRef} type="file" multiple className={styles.input} onChange={(e) => handleFiles(e.target.files)} aria-label="Upload document" />
        <Icon name="inbox" size={20} className={styles.dropIcon} />
        <span className={styles.dropText}>
          <button type="button" className={styles.dropBtn} onClick={() => inputRef.current?.click()}>Upload document</button>
          <span className={styles.dropHint}>or drag &amp; drop · PDF, DOCX, XLSX, PPT, images</span>
        </span>
      </div>

      {upload.isPending && uploadingName && (
        <div className={styles.uploadingRow}>
          <Icon name="spinner" size={16} className={`spin ${styles.uploadingIcon}`} />
          <span className={styles.fileName}>{uploadingName}</span>
          <span className={styles.uploadPct}>Uploading…</span>
        </div>
      )}

      {isLoading ? (
        <div className={`${styles.skeleton} shimmer`} />
      ) : items.length === 0 ? (
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)', padding: 'var(--space-3) 0' }}>No documents yet. Upload evidence and files here.</p>
      ) : (
        <ul className={styles.list} role="list">
          {items.map((f) => (
            <li key={f.id} className={styles.row}>
              <span className={styles.typeIcon} aria-hidden="true"><Icon name={TYPE_ICON[f.type]} size={16} /></span>
              <span className={styles.fileMain}>
                <span className={styles.fileTop}>
                  <span className={styles.fileName}>{f.name}</span>
                  {f.version > 1 && <span className={styles.version} title={`Version ${f.version}`}>v{f.version}</span>}
                </span>
                <span className={styles.linked}>{f.uploader?.name ?? 'Someone'} · {timeAgo(f.created_at)}</span>
              </span>
              <span className={styles.uploader}><Avatar name={f.uploader?.name ?? 'Someone'} size="xs" /></span>
              <span className={styles.size}>{f.size ?? '—'}</span>
              <span className={styles.rowActions}>
                <button type="button" className={styles.actionBtn} aria-label="Open" onClick={() => open(f.storage_path, f.name)}><Icon name="eye" size={15} /></button>
                <button type="button" className={styles.actionBtn} aria-label="Delete" onClick={() => remove.mutate({ id: f.id, path: f.storage_path }, { onSuccess: () => toast.success('Deleted'), onError: () => toast.error('Could not delete') })}><Icon name="alert-circle" size={15} /></button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
