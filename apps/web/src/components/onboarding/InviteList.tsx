'use client'

import { useState } from 'react'
import { Button } from '@/components/primitives/Button'
import { Icon } from '@/components/primitives/Icon'
import { Avatar } from '@/components/primitives/Avatar'
import { inviteEmailSchema } from '@/lib/validation/onboarding'
import { ROLES, INVITE_PERMISSIONS } from '@/lib/onboarding/options'
import type { Invite } from '@/stores/useOnboardingStore'
import styles from './InviteList.module.css'

interface InviteListProps {
  invites: Invite[]
  onAdd: (invite: Omit<Invite, 'id'>) => void
  onUpdate: (id: string, data: Partial<Invite>) => void
  onRemove: (id: string) => void
  /** Simulated permission ceiling — e.g. non-admins can't grant Full access. */
  canGrantAdmin?: boolean
}

const roleOptions = ROLES.map((r) => ({ value: r.id, label: r.title }))

export function InviteList({
  invites,
  onAdd,
  onUpdate,
  onRemove,
  canGrantAdmin = true,
}: InviteListProps) {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('delivery-team')
  const [permission, setPermission] = useState('edit')
  const [error, setError] = useState<string | null>(null)

  const permissionOptions = canGrantAdmin
    ? INVITE_PERMISSIONS
    : INVITE_PERMISSIONS.filter((p) => p.value !== 'admin')

  function handleAdd() {
    const result = inviteEmailSchema.safeParse(email.trim())
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? 'Enter a valid email address')
      return
    }
    if (invites.some((i) => i.email.toLowerCase() === email.trim().toLowerCase())) {
      setError('That person has already been invited')
      return
    }
    onAdd({ email: email.trim(), role, permission })
    setEmail('')
    setError(null)
  }

  return (
    <div className={styles.wrap}>
      {/* Add row */}
      <div className={styles.addRow}>
        <div className={`${styles.emailWrap} ${error ? styles.emailError : ''}`}>
          <Icon name="mail" size={18} className={styles.emailIcon} />
          <input
            type="email"
            className={styles.emailInput}
            placeholder="firstname.lastname@health.gov.ng"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(null) }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') { e.preventDefault(); handleAdd() }
            }}
            aria-label="Email address to invite"
            aria-invalid={!!error}
          />
          <select
            className={styles.inlineSelect}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            aria-label="Role"
          >
            {roleOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <select
            className={styles.inlineSelect}
            value={permission}
            onChange={(e) => setPermission(e.target.value)}
            aria-label="Permission"
          >
            {permissionOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        <Button variant="secondary" size="md" onClick={handleAdd} type="button">
          Invite
        </Button>
      </div>

      {error && (
        <p className={styles.error} role="alert">{error}</p>
      )}

      {/* Pending invites */}
      {invites.length > 0 ? (
        <ul className={styles.list} role="list">
          {invites.map((invite) => (
            <li key={invite.id} className={styles.inviteRow}>
              <Avatar name={invite.email} size="sm" />
              <span className={styles.inviteEmail} title={invite.email}>
                {invite.email}
              </span>
              <select
                className={styles.rowSelect}
                value={invite.role}
                onChange={(e) => onUpdate(invite.id, { role: e.target.value })}
                aria-label={`Role for ${invite.email}`}
              >
                {roleOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <select
                className={styles.rowSelect}
                value={invite.permission}
                onChange={(e) => onUpdate(invite.id, { permission: e.target.value })}
                aria-label={`Permission for ${invite.email}`}
              >
                {permissionOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => onRemove(invite.id)}
                aria-label={`Remove ${invite.email}`}
              >
                <span aria-hidden="true">✕</span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>
          No invitations yet. Add colleagues above — you can always invite more later.
        </p>
      )}

      {/* CSV import — future-ready placeholder */}
      <div className={styles.csvRow}>
        <button type="button" className={styles.csvBtn} disabled>
          <Icon name="arrow-right" size={16} className={styles.csvIcon} />
          Import from CSV
        </button>
        <span className={styles.csvHint}>Coming soon</span>
      </div>
    </div>
  )
}
