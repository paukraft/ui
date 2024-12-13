'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { weirdComponents } from './weirdui'

const DocsSidebar = () => {
  const pathname = usePathname()
  const sortedComponents = [...weirdComponents].sort((a, b) =>
    a.name.localeCompare(b.name)
  )

  return (
    <div className="hidden md:block w-64 border-r">
      <div className="sticky top-0 p-6">
        <div className="font-medium mb-4">Weird Components</div>
        <div className="space-y-1">
          {sortedComponents.map((component) => {
            const slug = component.name.toLowerCase().replace(/\s+/g, '-')
            return (
              <Link
                key={component.name}
                href={`/docs/components/${slug}`}
                className={cn(
                  'block py-1 px-2 rounded-md hover:bg-secondary transition-colors',
                  pathname === `/docs/components/${slug}` && 'bg-secondary'
                )}
              >
                {component.name}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default DocsSidebar
