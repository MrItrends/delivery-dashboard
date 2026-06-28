import { AppShell } from '@/components/layout/AppShell'
import { EntityEditor } from '@/components/entity/EntityEditor'
import { InterventionEditor } from '@/components/intervention/InterventionEditor'

export default function NewEntityPage({
  params,
  searchParams,
}: {
  params: { entity: string }
  searchParams: { parent?: string; pa?: string }
}) {
  return (
    <AppShell>
      {params.entity === 'intervention'
        ? <InterventionEditor parentId={searchParams.parent} paId={searchParams.pa} />
        : <EntityEditor entityKey={params.entity} parentId={searchParams.parent} />}
    </AppShell>
  )
}
