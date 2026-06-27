import { SystemMessage } from '@/components/system/SystemMessage'

export default function OfflinePage() {
  return (
    <SystemMessage
      icon="link-broken"
      tone="warning"
      title="You’re offline"
      description="We can’t reach the network right now. Check your connection — your changes are saved on this device and will sync when you reconnect."
    />
  )
}
