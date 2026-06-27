import { AppShell } from '@/components/layout/AppShell'
import { EntityCollection } from '@/components/entity/EntityCollection'

export default function ProjectsPage() {
  return (
    <AppShell>
      <EntityCollection entityKey="project" descriptionOverride="Government programmes across the workspace." />
    </AppShell>
  )
}
