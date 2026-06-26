import styles from './Avatar.module.css'

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg'

interface AvatarProps {
  name: string
  src?: string
  size?: AvatarSize
  online?: boolean
}

const SIZES: Record<AvatarSize, number> = { xs: 20, sm: 24, md: 32, lg: 40 }

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

function getColor(name: string): string {
  const COLORS = [
    '#4f46e5', '#0891b2', '#059669', '#d97706',
    '#dc2626', '#7c3aed', '#db2777', '#0284c7',
  ]
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return COLORS[Math.abs(hash) % COLORS.length] ?? COLORS[0]!
}

export function Avatar({ name, src, size = 'md', online }: AvatarProps) {
  const px = SIZES[size]

  return (
    <div
      className={styles.avatar}
      style={{ width: px, height: px, minWidth: px }}
      title={name}
      role="img"
      aria-label={name}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={name} className={styles.image} />
      ) : (
        <span
          className={styles.initials}
          style={{
            backgroundColor: getColor(name),
            fontSize: size === 'xs' ? 9 : size === 'sm' ? 10 : size === 'md' ? 12 : 14,
          }}
        >
          {getInitials(name)}
        </span>
      )}
      {online !== undefined && (
        <span
          className={`${styles.indicator} ${online ? styles.online : styles.offline}`}
          aria-hidden="true"
        />
      )}
    </div>
  )
}

interface AvatarStackProps {
  users: Array<{ name: string; src?: string }>
  max?: number
  size?: AvatarSize
}

export function AvatarStack({ users, max = 5, size = 'sm' }: AvatarStackProps) {
  const visible = users.slice(0, max)
  const overflow = users.length - max

  return (
    <div
      className={styles.stack}
      aria-label={`${users.length} ${users.length === 1 ? 'person' : 'people'}: ${users.map((u) => u.name).join(', ')}`}
    >
      {visible.map((user, i) => (
        <div
          key={user.name}
          className={styles.stackItem}
          style={{ zIndex: visible.length - i }}
        >
          <Avatar name={user.name} src={user.src} size={size} />
        </div>
      ))}
      {overflow > 0 && (
        <div className={`${styles.stackItem} ${styles.overflow}`} style={{ zIndex: 0 }}>
          <span className={styles.overflowLabel} style={{ width: SIZES[size], height: SIZES[size] }}>
            +{overflow}
          </span>
        </div>
      )}
    </div>
  )
}
