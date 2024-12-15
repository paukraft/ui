import { registryCollections, registryComponents } from '@/components/registry'
import { redirect } from 'next/navigation'

export default function DocsPage() {
  const firstCollection = Object.keys(registryCollections)[0]
  const firstComponent = [...registryComponents]
    .filter((component) =>
      component.collections.includes(firstCollection as never)
    )
    .sort((a, b) => a.name.localeCompare(b.name))[0].path

  redirect(`/docs/components/${firstComponent}`)
}
