import { AppShell } from '@/components/layout/AppShell'
import { EntityDetail } from '@/components/entity/EntityDetail'

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  return (<AppShell><EntityDetail entityKey="project" id={params.id} /></AppShell>)
}
