import { AppShell } from '@/components/layout/AppShell'
import { PageHeader } from '@/components/layout/PageHeader'
import page from '@/components/portfolio/PortfolioWorkspace.module.css'
import s from '@/components/pages/pages.module.css'

const SERVICES = ['Application', 'Database', 'Authentication', 'File storage', 'Realtime']

export default function StatusPage() {
  return (
    <AppShell>
      <div className={page.page}>
        <PageHeader title="System status" description="Live status of platform services." />
        <div className={page.body}>
          <div className={s.card} style={{ maxWidth: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
              <span style={{ width: 10, height: 10, borderRadius: 9999, background: 'var(--color-status-healthy-dot)' }} />
              <span style={{ fontSize: 'var(--font-size-md)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)' }}>All systems operational</span>
            </div>
            <ul style={{ listStyle: 'none' }}>
              {SERVICES.map((svc) => (
                <li key={svc} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-3) 0', borderBottom: '1px solid var(--color-border-subtle)' }}>
                  <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-primary)' }}>{svc}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 'var(--font-size-xs)', color: 'var(--color-status-healthy-text)' }}>
                    <span style={{ width: 7, height: 7, borderRadius: 9999, background: 'var(--color-status-healthy-dot)' }} /> Operational
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
