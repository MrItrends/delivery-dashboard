'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import { Button } from '@/components/primitives/Button'
import styles from './Drawer.module.css'

type DrawerVariant = 'create' | 'edit' | 'wizard' | 'review'

interface DrawerStep {
  id: string
  label: string
}

interface DrawerProps {
  open: boolean
  onClose: () => void
  variant?: DrawerVariant
  title: string
  description?: string

  // Multi-step support
  steps?: DrawerStep[]
  currentStep?: number
  onNextStep?: () => void
  onPrevStep?: () => void

  // Actions
  primaryLabel?: string
  onPrimary?: () => void
  primaryLoading?: boolean
  primaryDisabled?: boolean
  secondaryLabel?: string
  onSecondary?: () => void
  destructiveLabel?: string
  onDestructive?: () => void

  children: React.ReactNode
  hasUnsavedChanges?: boolean
}

export function Drawer({
  open,
  onClose,
  variant = 'create',
  title,
  description,
  steps,
  currentStep = 0,
  onNextStep,
  onPrevStep,
  primaryLabel = 'Save',
  onPrimary,
  primaryLoading = false,
  primaryDisabled = false,
  secondaryLabel = 'Cancel',
  onSecondary,
  destructiveLabel,
  onDestructive,
  children,
  hasUnsavedChanges = false,
}: DrawerProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const [confirmingClose, setConfirmingClose] = useState(false)

  const handleClose = useCallback(() => {
    if (hasUnsavedChanges && !confirmingClose) {
      setConfirmingClose(true)
      return
    }
    setConfirmingClose(false)
    onClose()
  }, [hasUnsavedChanges, confirmingClose, onClose])

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current) handleClose()
    },
    [handleClose]
  )

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) handleClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, handleClose])

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  const isWizard = variant === 'wizard' && steps && steps.length > 0
  const isLastStep = isWizard && currentStep === (steps?.length ?? 1) - 1
  const isFirstStep = currentStep === 0

  return (
    <div
      ref={overlayRef}
      className={`${styles.overlay} ${open ? styles.overlayVisible : ''}`}
      onClick={handleOverlayClick}
      aria-hidden={!open}
      role="presentation"
    >
      <div
        ref={drawerRef}
        className={`${styles.drawer} ${open ? styles.drawerOpen : styles.drawerClosed}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        aria-hidden={!open}
        inert={!open ? '' : undefined}
      >
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <h2 className={styles.title}>{title}</h2>
            {description && <p className={styles.description}>{description}</p>}
          </div>
          <button
            className={styles.closeBtn}
            onClick={handleClose}
            aria-label="Close drawer"
          >
            ✕
          </button>
        </div>

        {/* Wizard progress */}
        {isWizard && (
          <div className={styles.steps} aria-label="Progress">
            {steps!.map((step, i) => (
              <div
                key={step.id}
                className={`${styles.step} ${
                  i === currentStep
                    ? styles.stepActive
                    : i < currentStep
                    ? styles.stepDone
                    : styles.stepFuture
                }`}
              >
                <div className={styles.stepDot} aria-hidden="true">
                  {i < currentStep ? '✓' : i + 1}
                </div>
                <span className={styles.stepLabel}>{step.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Confirm close banner */}
        {confirmingClose && (
          <div className={styles.confirmBanner} role="alert">
            <span>You have unsaved changes. Discard them?</span>
            <div className={styles.confirmActions}>
              <Button size="sm" variant="danger" onClick={() => { setConfirmingClose(false); onClose() }}>
                Discard
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setConfirmingClose(false)}>
                Keep editing
              </Button>
            </div>
          </div>
        )}

        {/* Body */}
        <div className={styles.body}>{children}</div>

        {/* Footer */}
        <div className={styles.footer}>
          {destructiveLabel && onDestructive && (
            <Button variant="danger" size="md" onClick={onDestructive}>
              {destructiveLabel}
            </Button>
          )}
          <div className={styles.footerActions}>
            {isWizard && !isFirstStep && onPrevStep && (
              <Button variant="ghost" size="md" onClick={onPrevStep}>
                Back
              </Button>
            )}
            {onSecondary && (
              <Button variant="secondary" size="md" onClick={onSecondary ?? handleClose}>
                {secondaryLabel}
              </Button>
            )}
            {isWizard && !isLastStep && onNextStep ? (
              <Button variant="primary" size="md" onClick={onNextStep}>
                Continue
              </Button>
            ) : (
              onPrimary && (
                <Button
                  variant="primary"
                  size="md"
                  onClick={onPrimary}
                  loading={primaryLoading}
                  disabled={primaryDisabled}
                >
                  {primaryLabel}
                </Button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
