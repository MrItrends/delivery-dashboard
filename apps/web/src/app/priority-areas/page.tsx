import { AppShell } from '@/components/layout/AppShell'
import { EntityCollection } from '@/components/entity/EntityCollection'

export default function PriorityAreasPage() {
  return (
    <AppShell>
      <EntityCollection
        entityKey="priorityArea"
        descriptionOverride="Strategic priority areas across the workspace. Each delivers one national objective."
      />
    </AppShell>
  )
}
