'use client'

import { useRef, useState, useId } from 'react'
import { Icon } from '@/components/primitives/Icon'
import styles from './AvatarUpload.module.css'

interface AvatarUploadProps {
  label: string
  value: string | null
  onChange: (dataUrl: string | null) => void
  hint?: string
}

const MAX_BYTES = 2 * 1024 * 1024 // 2MB

export function AvatarUpload({ label, value, onChange, hint }: AvatarUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const id = useId()
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleFile(file: File | undefined) {
    setError(null)
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('Choose an image file (PNG, JPG or SVG).')
      return
    }
    if (file.size > MAX_BYTES) {
      setError('Image must be under 2MB.')
      return
    }
    const reader = new FileReader()
    reader.onload = () => onChange(reader.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <div className={styles.wrap}>
      <span className={styles.label} id={`${id}-label`}>{label}</span>

      <div className={styles.row}>
        <div className={styles.preview} aria-hidden="true">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className={styles.previewImg} />
          ) : (
            <Icon name="shield" size={22} className={styles.previewIcon} />
          )}
        </div>

        <div
          className={`${styles.dropzone} ${dragOver ? styles.dragOver : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragOver(false)
            handleFile(e.dataTransfer.files[0])
          }}
        >
          <input
            ref={inputRef}
            id={id}
            type="file"
            accept="image/*"
            className={styles.input}
            aria-labelledby={`${id}-label`}
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <button
            type="button"
            className={styles.uploadBtn}
            onClick={() => inputRef.current?.click()}
          >
            {value ? 'Replace' : 'Upload logo'}
          </button>
          {value && (
            <button
              type="button"
              className={styles.removeBtn}
              onClick={() => { onChange(null); setError(null) }}
            >
              Remove
            </button>
          )}
          <span className={styles.dropHint}>or drag and drop</span>
        </div>
      </div>

      {(error ?? hint) && (
        <p className={`${styles.hint} ${error ? styles.hintError : ''}`} role={error ? 'alert' : undefined}>
          {error ?? hint}
        </p>
      )}
    </div>
  )
}
