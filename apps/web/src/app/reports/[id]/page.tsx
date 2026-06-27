import { AppShell } from '@/components/layout/AppShell'
import { ReportViewer } from '@/components/reports/ReportViewer'

export default function ReportDetailPage({ params }: { params: { id: string } }) {
  return (
    <AppShell>
      <ReportViewer id={params.id} />
    </AppShell>
  )
}
