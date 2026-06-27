import { AppShell } from '@/components/layout/AppShell'
import { EntityDetail } from '@/components/entity/EntityDetail'

export default function PortfolioDetailPage({ params }: { params: { id: string } }) {
  return (<AppShell><EntityDetail entityKey="portfolio" id={params.id} /></AppShell>)
}
