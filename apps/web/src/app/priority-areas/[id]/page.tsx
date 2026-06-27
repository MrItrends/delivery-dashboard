import { AppShell } from '@/components/layout/AppShell'
import { EntityDetail } from '@/components/entity/EntityDetail'

export default function PriorityAreaDetailPage({ params }: { params: { id: string } }) {
  return (<AppShell><EntityDetail entityKey="priorityArea" id={params.id} /></AppShell>)
}
