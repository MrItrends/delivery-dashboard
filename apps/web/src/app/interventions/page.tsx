import { AppShell } from '@/components/layout/AppShell'
import { EntityCollection } from '@/components/entity/EntityCollection'

export default function InterventionsPage() {
  return (
    <AppShell>
      <EntityCollection entityKey="intervention" descriptionOverride="Coordinated delivery initiatives across the workspace." />
    </AppShell>
  )
}
