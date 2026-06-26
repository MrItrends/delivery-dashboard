'use client'

import { useState, useRef } from 'react'
import { Avatar } from '@/components/primitives/Avatar'
import { Icon, type IconName } from '@/components/primitives/Icon'
import { useToastStore } from '@/stores/useToastStore'
import { EVIDENCE, type EvidenceItem, type EvidenceType } from '@/lib/mock/intervention'
import styles from './EvidenceList.module.css'

const TYPE_ICON: Record<EvidenceType, IconName> = {
  pdf: 'document', image: 'grid', doc: 'document', sheet: 'grid', link: 'arrow-right',
}
const TYPE_LABEL: Record<EvidenceType, string> = { pdf: 'PDF', image: 'Image', doc: 'Doc', sheet: 'Sheet', link: 'Link' }

interface Uploading { id: string; name: string; progress: number }

export function EvidenceList({ loading }: { loading?: boolean }) {
  const toast = useToastStore()
  const [items] = useState<EvidenceItem[]>(EVIDENCE)
  const [dragOver, setDragOver] = useState(false)
  const [uploading, setUploading] = useState<Uploading[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  function simulateUpload(name: string) {
    const id = `up${Date.now()}`
    setUploading((u) => [...u, { id, name, progress: 0 }])
    const timer = setInterval(() => {
      setUploading((u) => {
        const next = u.map((x) => x.id === id ? { ...x, progress: Math.min(100, x.progress + 20) } : x)
        if (next.find((x) => x.id === id)?.progress === 100) {
          clearInterval(timer)
          setTimeout(() => { setUploading((cur) => cur.filter((x) => x.id !== id)); toast.success(`${name} uploaded`) }, 400)
        }
        return next
      })
    }, 250)
  }

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) { simulateUpload('document.pdf'); return }
    Array.from(files).forEach((f) => simulateUpload(f.name))
  }

  if (loading) {
    return <div className={styles.wrap}>{Array.from({ length: 3 }).map((_, i) => <div key={i} className={`${styles.skeleton} shimmer`} />)}</div>
  }

  return (
    <div className={styles.wrap}>
      {/* Dropzone */}
      <div
        className={`${styles.dropzone} ${dragOver ? styles.dragOver : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files) }}
      >
        <input ref={inputRef} type="file" multiple className={styles.input} onChange={(e) => handleFiles(e.target.files)} aria-label="Upload evidence" />
        <Icon name="inbox" size={20} className={styles.dropIcon} />
        <span className={styles.dropText}>
          <button type="button" className={styles.dropBtn} onClick={() => inputRef.current?.click()}>Upload evidence</button>
          <span className={styles.dropHint}>or drag &amp; drop · every upload links to an activity</span>
        </span>
      </div>

      {/* Uploading state */}
      {uploading.map((u) => (
        <div key={u.id} className={styles.uploadingRow}>
          <Icon name="spinner" size={16} className={`spin ${styles.uploadingIcon}`} />
          <span className={styles.fileName}>{u.name}</span>
          <span className={styles.uploadBar}><span className={styles.uploadFill} style={{ width: `${u.progress}%` }} /></span>
          <span className={styles.uploadPct}>{u.progress}%</span>
        </div>
      ))}

      {/* File list */}
      <ul className={styles.list} role="list">
        {items.map((f) => (
          <li key={f.id} className={styles.row}>
            <span className={styles.typeIcon} aria-hidden="true"><Icon name={TYPE_ICON[f.type]} size={16} /></span>
            <span className={styles.fileMain}>
              <span className={styles.fileTop}>
                <span className={styles.fileName}>{f.name}</span>
                {f.version > 1 && <span className={styles.version} title={`Version ${f.version}`}>v{f.version}</span>}
              </span>
              <span className={styles.linked}>{TYPE_LABEL[f.type]} · linked to {f.linkedActivity}</span>
            </span>
            <span className={styles.uploader}><Avatar name={f.uploadedBy} size="xs" /><span className={styles.uploaderMeta}>{f.time}</span></span>
            <span className={styles.size}>{f.size}</span>
            <span className={styles.rowActions}>
              <button type="button" className={styles.actionBtn} aria-label="Preview" onClick={() => toast.info(`Preview ${f.name}`)}><Icon name="eye" size={15} /></button>
              {f.version > 1 && <button type="button" className={styles.actionBtn} aria-label="Version history" onClick={() => toast.info(`${f.version} versions`)}><Icon name="clock" size={15} /></button>}
              <button type="button" className={styles.actionBtn} aria-label="Download" onClick={() => toast.info(`Download ${f.name}`)}><Icon name="arrow-right" size={15} /></button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
