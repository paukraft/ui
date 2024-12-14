import { registryComponents } from '@/components/registry'
import { redirect } from 'next/navigation'

export default function DocsPage() {
  const firstComponent = [...registryComponents]
    .sort((a, b) => a.name.localeCompare(b.name))[0]
    .name.toLowerCase()
    .replace(/\s+/g, '-')

  redirect(`/docs/components/${firstComponent}`)
}
