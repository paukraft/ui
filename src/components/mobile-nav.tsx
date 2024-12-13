'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { weirdComponents } from './weirdui'

export function MobileNav() {
  const pathname = usePathname()
  const sortedComponents = [...weirdComponents].sort((a, b) =>
    a.name.localeCompare(b.name)
  )

  return (
    <div className="flex flex-col gap-4 pr-6">
      <Link
        href="/docs/components/bike-pump-slider"
        className={cn(
          'text-lg font-semibold hover:text-primary transition-colors',
          pathname.includes('/docs') && 'text-primary'
        )}
      >
        Weird Components
      </Link>

      {pathname.includes('/docs') && (
        <div className="space-y-1">
          {sortedComponents.map((component) => {
            const slug = component.name.toLowerCase().replace(/\s+/g, '-')
            return (
              <Link
                key={component.name}
                href={`/docs/components/${slug}`}
                className={cn(
                  'block py-1 px-2 rounded-md hover:bg-secondary transition-colors text-sm',
                  pathname === `/docs/components/${slug}` && 'bg-secondary'
                )}
              >
                {component.name}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
