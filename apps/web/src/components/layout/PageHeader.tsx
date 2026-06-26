import { Breadcrumb, type BreadcrumbItem } from '@/components/navigation/Breadcrumb'
import { StatusChip, type ObjectStatus } from '@/components/primitives/StatusChip'
import styles from './PageHeader.module.css'

interface PageHeaderProps {
  breadcrumb?: BreadcrumbItem[]
  title: string
  description?: string
  status?: ObjectStatus
  metadata?: Array<{ label: string; value: React.ReactNode }>
  primaryAction?: React.ReactNode
  secondaryActions?: React.ReactNode
  tabs?: React.ReactNode
}

export function PageHeader({
  breadcrumb,
  title,
  description,
  status,
  metadata,
  primaryAction,
  secondaryActions,
  tabs,
}: PageHeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.inner}>
        {/* Breadcrumb */}
        {breadcrumb && breadcrumb.length > 0 && (
          <div className={styles.breadcrumb}>
            <Breadcrumb items={breadcrumb} />
          </div>
        )}

        {/* Title row */}
        <div className={styles.titleRow}>
          <div className={styles.titleLeft}>
            <h1 className={styles.title}>{title}</h1>
            {status && <StatusChip status={status} />}
          </div>
          <div className={styles.actions}>
            {secondaryActions && (
              <div className={styles.secondaryActions}>{secondaryActions}</div>
            )}
            {primaryAction && (
              <div className={styles.primaryAction}>{primaryAction}</div>
            )}
          </div>
        </div>

        {/* Description */}
        {description && (
          <p className={styles.description}>{description}</p>
        )}

        {/* Metadata row */}
        {metadata && metadata.length > 0 && (
          <div className={styles.metadataRow}>
            {metadata.map((item, i) => (
              <div key={i} className={styles.metadataItem}>
                <span className={styles.metadataLabel}>{item.label}</span>
                <span className={styles.metadataValue}>{item.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tabs */}
      {tabs && <div className={styles.tabs}>{tabs}</div>}
    </div>
  )
}
