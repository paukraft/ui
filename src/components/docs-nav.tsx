'use client'

import { cn } from '@/lib/utils'
import { groupBy } from 'lodash'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { registryCollections, registryComponents } from './registry'

export const DocsNav = ({ closeNav }: { closeNav?: () => void }) => {
  const pathname = usePathname()

  const componentsByCollection = Object.entries(registryCollections).map(
    ([key, collection]) => ({
      ...collection,
      components:
        groupBy(registryComponents, (component) =>
          component.collections.includes(key as never)
        ).true?.sort((a, b) => a.name.localeCompare(b.name)) || [],
    })
  )

  return (
    <>
      {componentsByCollection.map((collection) => (
        <div key={collection.name} className="mb-6">
          <div className="font-medium mb-4">{collection.name}</div>
          <div className="space-y-1">
            {collection.components.map((component) => {
              const slug = component.name.toLowerCase().replace(/\s+/g, '-')
              return (
                <Link
                  key={component.name}
                  href={`/docs/components/${slug}`}
                  className={cn(
                    'block py-1 px-2 rounded-md hover:bg-secondary transition-colors',
                    pathname === `/docs/components/${slug}` && 'bg-secondary'
                  )}
                  onClick={closeNav}
                >
                  {component.name}
                </Link>
              )
            })}
          </div>
        </div>
      ))}
    </>
  )
}
