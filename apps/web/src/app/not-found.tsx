import { SystemMessage } from '@/components/system/SystemMessage'

export default function NotFound() {
  return (
    <SystemMessage
      icon="search"
      code="404"
      title="Page not found"
      description="The page you’re looking for doesn’t exist or may have moved. Check the link, or head back to your workspace."
    />
  )
}
