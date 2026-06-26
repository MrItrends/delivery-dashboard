import { AppShell } from '@/components/layout/AppShell'

export default function Home() {
  return (
    <AppShell>
      <div style={{ padding: 'var(--space-8)' }}>
        <h1>Delivery Dashboard</h1>
        <p style={{ marginTop: 'var(--space-4)', color: 'var(--color-text-secondary)' }}>
          Foundation loaded. Ready to build screens.
        </p>
      </div>
    </AppShell>
  )
}
