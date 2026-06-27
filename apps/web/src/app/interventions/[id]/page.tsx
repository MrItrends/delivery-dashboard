import { AppShell } from '@/components/layout/AppShell'
import { EntityDetail } from '@/components/entity/EntityDetail'

export default function InterventionDetailPage({ params }: { params: { id: string } }) {
  return (<AppShell><EntityDetail entityKey="intervention" id={params.id} /></AppShell>)
}
