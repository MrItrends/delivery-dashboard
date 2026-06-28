import { AppShell } from '@/components/layout/AppShell'
import { InterventionEditor } from '@/components/intervention/InterventionEditor'

export default function EditInterventionPage({ params }: { params: { id: string } }) {
  return (
    <AppShell>
      <InterventionEditor id={params.id} />
    </AppShell>
  )
}
