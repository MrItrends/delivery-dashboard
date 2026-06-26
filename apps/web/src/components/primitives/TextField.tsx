'use client'

import { forwardRef, useId, useState } from 'react'
import { Icon, type IconName } from './Icon'
import styles from './TextField.module.css'

type ValidationState = 'default' | 'error' | 'success'

interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string
  icon?: IconName
  /** When type is "password", renders a show/hide toggle. */
  hint?: string
  error?: string
  success?: string
  /** Visually hide the label but keep it for screen readers. */
  hideLabel?: boolean
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      icon,
      hint,
      error,
      success,
      hideLabel = false,
      type = 'text',
      id: providedId,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const id = providedId ?? generatedId
    const messageId = `${id}-message`
    const [showPassword, setShowPassword] = useState(false)

    const isPassword = type === 'password'
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

    const state: ValidationState = error ? 'error' : success ? 'success' : 'default'
    // Only render a message line when there is real text — a success indicator
    // can be requested with success=" " to style the field without a caption.
    const rawMessage = error ?? success ?? hint
    const message = rawMessage && rawMessage.trim() ? rawMessage : undefined

    return (
      <div className={`${styles.field} ${className}`}>
        <label
          htmlFor={id}
          className={`${styles.label} ${hideLabel ? styles.labelHidden : ''}`}
        >
          {label}
        </label>

        <div
          className={[
            styles.inputWrap,
            state === 'error' ? styles.error : '',
            state === 'success' ? styles.success : '',
            disabled ? styles.disabled : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {icon && (
            <span className={styles.leadingIcon} aria-hidden="true">
              <Icon name={icon} size={18} />
            </span>
          )}

          <input
            ref={ref}
            id={id}
            type={inputType}
            className={styles.input}
            disabled={disabled}
            aria-invalid={state === 'error'}
            aria-describedby={message ? messageId : undefined}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              className={styles.toggle}
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              aria-pressed={showPassword}
              tabIndex={0}
            >
              <Icon name={showPassword ? 'eye-off' : 'eye'} size={18} />
            </button>
          )}

          {state === 'success' && !isPassword && (
            <span className={styles.statusIcon} aria-hidden="true">
              <Icon name="check-circle" size={18} />
            </span>
          )}
          {state === 'error' && !isPassword && (
            <span className={styles.statusIcon} aria-hidden="true">
              <Icon name="alert-circle" size={18} />
            </span>
          )}
        </div>

        {message && (
          <p
            id={messageId}
            className={[
              styles.message,
              state === 'error' ? styles.messageError : '',
              state === 'success' ? styles.messageSuccess : '',
            ]
              .filter(Boolean)
              .join(' ')}
            role={state === 'error' ? 'alert' : undefined}
          >
            {message}
          </p>
        )}
      </div>
    )
  }
)

TextField.displayName = 'TextField'
