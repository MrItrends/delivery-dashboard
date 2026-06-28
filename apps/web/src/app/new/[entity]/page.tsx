import { AppShell } from '@/components/layout/AppShell'
import { EntityEditor } from '@/components/entity/EntityEditor'

export default function NewEntityPage({
  params,
  searchParams,
}: {
  params: { entity: string }
  searchParams: { parent?: string }
}) {
  return (
    <AppShell>
      <EntityEditor entityKey={params.entity} parentId={searchParams.parent} />
    </AppShell>
  )
}
