import { AppShell } from '@/components/layout/AppShell'
import { PageHeader } from '@/components/layout/PageHeader'
import page from '@/components/portfolio/PortfolioWorkspace.module.css'
import s from '@/components/pages/pages.module.css'

const RELEASES = [
  { version: '0.4', date: 'June 2026', notes: ['Settings, Team, Profile, Reports, Search and Calendar pages', 'Audit log and help centre'] },
  { version: '0.3', date: 'June 2026', notes: ['Comments, @mentions and notifications', 'Realtime updates', 'Evidence & document uploads'] },
  { version: '0.2', date: 'June 2026', notes: ['Full delivery hierarchy on Supabase with create, edit, archive', 'Real session authentication'] },
  { version: '0.1', date: 'June 2026', notes: ['Workspace frame, design system and onboarding'] },
]

export default function ReleaseNotesPage() {
  return (
    <AppShell>
      <div className={page.page}>
        <PageHeader title="Release notes" description="What’s new in the platform." />
        <div className={page.body} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {RELEASES.map((r) => (
            <div key={r.version} className={s.card}>
              <h2 className={s.cardTitle}>Version {r.version} <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-regular)', color: 'var(--color-text-tertiary)' }}>· {r.date}</span></h2>
              <ul style={{ listStyle: 'disc', paddingLeft: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                {r.notes.map((n, i) => <li key={i} style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>{n}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
