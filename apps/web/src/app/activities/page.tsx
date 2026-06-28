import { AppShell } from '@/components/layout/AppShell'
import { ActivityTracker } from '@/components/activity/ActivityTracker'

export default function ActivitiesPage() {
  return (
    <AppShell>
      <ActivityTracker />
    </AppShell>
  )
}
