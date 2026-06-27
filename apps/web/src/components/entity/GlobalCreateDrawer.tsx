'use client'

import { useRouter } from 'next/navigation'
import { EntityFormDrawer } from './EntityFormDrawer'
import { useEntityMutations } from '@/lib/data/useEntity'
import { ENTITIES } from '@/lib/data/entities'
import { useToastStore } from '@/stores/useToastStore'
import type { Row } from '@/lib/data/crud'

/** Create any hierarchy object from anywhere (e.g. the header Create menu).
 *  The parent is optional — an empty workspace provisions a default. */
export function GlobalCreateDrawer({ entityKey, open, onClose }: { entityKey: string; open: boolean; onClose: () => void }) {
  const router = useRouter()
  const toast = useToastStore()
  const config = ENTITIES[entityKey]
  const { create } = useEntityMutations(config?.table ?? '')

  if (!config) return null

  function handleSubmit(input: Record<string, unknown>) {
    create.mutate(input, {
      onSuccess: (row: Row) => {
        onClose()
        toast.success(`${config!.singular} created`)
        if (entityKey === 'activity' && row.intervention_id) router.push(`/interventions/${String(row.intervention_id)}`)
        else router.push(config!.route)
      },
      onError: () => toast.error(`Could not create ${config!.singular.toLowerCase()}`),
    })
  }

  return (
    <EntityFormDrawer
      open={open}
      mode="create"
      config={config}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitting={create.isPending}
    />
  )
}
