import { Icon, type IconName } from '@/components/primitives/Icon'
import styles from './WorkspaceSummary.module.css'

export interface SummaryItem {
  icon: IconName
  label: string
  value: string
}

export function WorkspaceSummary({ items }: { items: SummaryItem[] }) {
  return (
    <dl className={styles.summary}>
      {items.map((item, i) => (
        <div key={i} className={styles.row}>
          <span className={styles.icon} aria-hidden="true">
            <Icon name={item.icon} size={18} />
          </span>
          <dt className={styles.label}>{item.label}</dt>
          <dd className={styles.value}>{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}
