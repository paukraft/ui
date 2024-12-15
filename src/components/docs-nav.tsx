'use client'

import { cn } from '@/lib/utils'
import { groupBy } from 'lodash'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PropsWithChildren } from 'react'
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
      <NavGroup>
        <NavGroupTitle>Getting Started</NavGroupTitle>
        <NavGroupItemList>
          <NavItem name="Introduction" href="/docs" closeNav={closeNav} />
        </NavGroupItemList>
      </NavGroup>
      {componentsByCollection.map((collection) => (
        <NavGroup key={collection.name}>
          <NavGroupTitle>{collection.name}</NavGroupTitle>
          <NavGroupItemList>
            {collection.components.map((component) => {
              const slug = component.name.toLowerCase().replace(/\s+/g, '-')
              return (
                <NavItem
                  key={component.name}
                  name={component.name}
                  href={`/docs/components/${slug}`}
                  closeNav={closeNav}
                />
              )
            })}
          </NavGroupItemList>
        </NavGroup>
      ))}
    </>
  )
}

export const NavItem = ({
  name,
  href,
  closeNav,
  isActive: isActiveProp,
}: {
  name: string
  href: string
  closeNav?: () => void
  isActive?: boolean
}) => {
  const pathname = usePathname()

  const isActive = isActiveProp !== undefined ? isActiveProp : pathname === href

  return (
    <Link
      href={href}
      className={cn(
        'block py-1 px-2 rounded-md hover:bg-secondary transition-colors',
        isActive && 'bg-secondary'
      )}
      onClick={closeNav}
    >
      {name}
    </Link>
  )
}

export const NavGroupTitle = ({ children }: PropsWithChildren) => {
  return <div className="font-medium mb-4">{children}</div>
}

export const NavGroupItemList = ({ children }: PropsWithChildren) => {
  return <div className="space-y-1">{children}</div>
}

export const NavGroup = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return <div className={cn('mb-6', className)}>{children}</div>
}
