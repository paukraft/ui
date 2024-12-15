'use client'

import { cn } from '@/lib/utils'
import { groupBy } from 'lodash'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PropsWithChildren, ReactNode } from 'react'
import { registryCollections, registryComponents } from './registry'

export const DocsNav = ({ closeNav }: { closeNav?: () => void }) => {
  const componentsByCollection = Object.entries(registryCollections).map(
    ([key, collection]) => ({
      ...collection,
      key,
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
          <NavGroupTitle>
            <Link
              href={`/docs/collections/${collection.key}`}
              onClick={closeNav}
            >
              {collection.name}
            </Link>
          </NavGroupTitle>
          <NavGroupItemList>
            {collection.components.map((component) => {
              const slug = component.path
              return (
                <NavItem
                  key={component.name}
                  name={
                    <>
                      {component.type === 'animated-icon' && (
                        <component.component />
                      )}
                      {component.name}
                    </>
                  }
                  href={`/docs/components/${slug}`}
                  closeNav={closeNav}
                  className="group"
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
  className,
}: {
  name: ReactNode
  href: string
  closeNav?: () => void
  isActive?: boolean
  className?: string
}) => {
  const pathname = usePathname()

  const isActive = isActiveProp !== undefined ? isActiveProp : pathname === href

  return (
    <Link
      href={href}
      className={cn(
        'py-1 px-2 rounded-md hover:bg-secondary transition-colors flex items-center gap-2',
        isActive && 'bg-secondary',
        className
      )}
      onClick={closeNav}
    >
      {name}
    </Link>
  )
}

export const NavGroupTitle = ({ children }: PropsWithChildren) => {
  return <div className="font-bold mb-4">{children}</div>
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
