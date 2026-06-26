import Link from 'next/link'
import styles from './Breadcrumb.module.css'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const MAX_VISIBLE = 4

  const visible =
    items.length > MAX_VISIBLE
      ? [
          items[0]!,
          { label: '···', href: undefined },
          ...items.slice(-(MAX_VISIBLE - 2)),
        ]
      : items

  return (
    <nav aria-label="Breadcrumb" className={styles.nav}>
      <ol className={styles.list} role="list">
        {visible.map((item, index) => {
          const isLast = index === visible.length - 1
          const isCollapsed = item.label === '···'

          return (
            <li key={`${item.label}-${index}`} className={styles.item}>
              {index > 0 && (
                <span className={styles.separator} aria-hidden="true">/</span>
              )}
              {isLast ? (
                <span className={styles.current} aria-current="page">
                  {item.label}
                </span>
              ) : isCollapsed ? (
                <span className={styles.collapsed} aria-label="More levels">
                  {item.label}
                </span>
              ) : item.href ? (
                <Link href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              ) : (
                <span className={styles.text}>{item.label}</span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
