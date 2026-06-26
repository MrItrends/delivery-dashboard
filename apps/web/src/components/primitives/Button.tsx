import { forwardRef } from 'react'
import styles from './Button.module.css'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'text' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      iconLeft,
      iconRight,
      disabled,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading

    return (
      <button
        ref={ref}
        className={[
          styles.button,
          styles[variant],
          styles[size],
          loading ? styles.loading : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading}
        {...props}
      >
        {loading && (
          <span className={styles.spinner} aria-hidden="true">
            <span className={styles.spinnerInner} />
          </span>
        )}
        {!loading && iconLeft && (
          <span className={styles.iconLeft} aria-hidden="true">
            {iconLeft}
          </span>
        )}
        {children && <span className={styles.label}>{children}</span>}
        {!loading && iconRight && (
          <span className={styles.iconRight} aria-hidden="true">
            {iconRight}
          </span>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
