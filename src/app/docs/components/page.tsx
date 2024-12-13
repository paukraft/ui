import { weirdComponents } from '@/components/weirdui'
import { redirect } from 'next/navigation'

export default function DocsPage() {
  const firstComponent = [...weirdComponents]
    .sort((a, b) => a.name.localeCompare(b.name))[0]
    .name.toLowerCase()
    .replace(/\s+/g, '-')

  redirect(`/docs/components/${firstComponent}`)
}
