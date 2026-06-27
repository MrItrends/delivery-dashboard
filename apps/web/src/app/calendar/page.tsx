'use client'

import { AppShell } from '@/components/layout/AppShell'
import { CalendarView } from '@/components/calendar/CalendarView'

export default function CalendarPage() {
  return (
    <AppShell>
      <CalendarView />
    </AppShell>
  )
}
