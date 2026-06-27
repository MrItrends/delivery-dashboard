import { SystemMessage } from '@/components/system/SystemMessage'

export default function ForbiddenPage() {
  return (
    <SystemMessage
      icon="shield"
      tone="warning"
      code="403"
      title="You don’t have access"
      description="You don’t have permission to view this page. If you think this is a mistake, ask your workspace administrator."
    />
  )
}
