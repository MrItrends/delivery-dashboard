import { AppShell } from '@/components/layout/AppShell'
import { PageHeader } from '@/components/layout/PageHeader'
import { TourLaunchButton } from '@/components/coachmarks/TourLaunchButton'
import page from '@/components/portfolio/PortfolioWorkspace.module.css'
import s from '@/components/pages/pages.module.css'

const SECTIONS = [
  { title: 'Getting started', body: 'Set up your workspace, create your first portfolio, and invite your team from Settings → Team.' },
  { title: 'The delivery hierarchy', body: 'Workspace → Portfolio → Priority Area → Project → Intervention → Activity. Drill down by clicking any row; create children from a parent’s detail page.' },
  { title: 'Collaboration', body: 'Comment and @mention teammates on any object, attach evidence and documents, and track decisions and approvals — all without leaving the workspace.' },
  { title: 'Keyboard & search', body: 'Press ⌘K / Ctrl+K anywhere to search and run commands. See all shortcuts on the Keyboard shortcuts page.' },
]

export default function HelpPage() {
  return (
    <AppShell>
      <div className={page.page}>
        <PageHeader title="Help centre" description="Guides and answers for getting the most out of the platform." primaryAction={<TourLaunchButton />} />
        <div className={page.body} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {SECTIONS.map((sec) => (
            <div key={sec.title} className={s.card}>
              <h2 className={s.cardTitle}>{sec.title}</h2>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)' }}>{sec.body}</p>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
