'use client'

import { Button } from '@/components/primitives/Button'
import { useTourStore } from '@/lib/coachmarks/tour'

export function TourLaunchButton() {
  const start = useTourStore((s) => s.start)
  return <Button variant="secondary" size="md" onClick={start}>Take the tour</Button>
}
