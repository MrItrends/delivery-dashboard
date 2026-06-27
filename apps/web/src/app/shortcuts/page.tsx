import { AppShell } from '@/components/layout/AppShell'
import { PageHeader } from '@/components/layout/PageHeader'
import page from '@/components/portfolio/PortfolioWorkspace.module.css'
import s from '@/components/pages/pages.module.css'

const GROUPS: { title: string; items: { keys: string[]; label: string }[] }[] = [
  { title: 'Global', items: [
    { keys: ['⌘', 'K'], label: 'Open command palette' },
    { keys: ['Esc'], label: 'Close panel / dialog' },
  ] },
  { title: 'Navigate', items: [
    { keys: ['G', 'H'], label: 'Go to Home' },
    { keys: ['G', 'P'], label: 'Go to Portfolio' },
    { keys: ['G', 'R'], label: 'Go to Projects' },
    { keys: ['G', 'I'], label: 'Go to Interventions' },
    { keys: ['G', 'C'], label: 'Go to Calendar' },
    { keys: ['G', 'T'], label: 'Go to Team' },
    { keys: ['G', 'N'], label: 'Go to Notifications' },
  ] },
  { title: 'Create', items: [
    { keys: ['C', 'P'], label: 'Create Project' },
    { keys: ['C', 'I'], label: 'Create Intervention' },
    { keys: ['C'], label: 'Create Activity' },
  ] },
]

const kbd: React.CSSProperties = {
  fontFamily: 'var(--font-family-mono)', fontSize: '11px', color: 'var(--color-text-secondary)',
  background: 'var(--color-neutral-100)', border: '1px solid var(--color-border-default)',
  borderRadius: 'var(--radius-xs)', padding: '2px 6px', minWidth: 22, textAlign: 'center', display: 'inline-block',
}

export default function ShortcutsPage() {
  return (
    <AppShell>
      <div className={page.page}>
        <PageHeader title="Keyboard shortcuts" description="Work faster without leaving the keyboard." />
        <div className={page.body} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {GROUPS.map((g) => (
            <div key={g.title} className={s.card}>
              <h2 className={s.cardTitle}>{g.title}</h2>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column' }}>
                {g.items.map((it) => (
                  <li key={it.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-3) 0', borderBottom: '1px solid var(--color-border-subtle)' }}>
                    <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-primary)' }}>{it.label}</span>
                    <span style={{ display: 'inline-flex', gap: 4 }}>{it.keys.map((k, i) => <kbd key={i} style={kbd}>{k}</kbd>)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
