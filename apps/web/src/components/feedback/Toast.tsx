'use client'

import { useToastStore, type Toast } from '@/stores/useToastStore'
import styles from './Toast.module.css'

const ICONS: Record<Toast['type'], string> = {
  success: '✓',
  error:   '✕',
  warning: '⚠',
  info:    'ℹ',
}

export function ToastRegion() {
  const toasts = useToastStore((s) => s.toasts)
  const remove = useToastStore((s) => s.remove)

  return (
    <div
      className={styles.region}
      role="region"
      aria-label="Notifications"
      aria-live="polite"
      aria-atomic="false"
      aria-relevant="additions"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={() => remove(toast.id)} />
      ))}
    </div>
  )
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
  return (
    <div
      className={`${styles.toast} ${styles[toast.type]}`}
      role="alert"
      aria-live={toast.type === 'error' ? 'assertive' : 'polite'}
    >
      <span className={styles.icon} aria-hidden="true">
        {ICONS[toast.type]}
      </span>
      <span className={styles.message}>{toast.message}</span>
      <button
        className={styles.dismiss}
        onClick={onDismiss}
        aria-label="Dismiss notification"
      >
        ✕
      </button>
    </div>
  )
}
