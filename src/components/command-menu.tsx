'use client'

import { tools } from '@/app/tools/tools'
import { registryCollections, registryComponents } from '@/components/registry'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { groupBy } from 'lodash'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const CommandMenu = () => {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const [isMac, setIsMac] = useState(true)

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0)
  }, [])

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
      <button
        onClick={() => setOpen(true)}
        className="text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        Search components...
        <kbd className="pointer-events-none ml-2 inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">{isMac ? '⌘' : 'Ctrl'}</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search components and tools..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {componentsByCollection.map((collection) => (
            <CommandGroup key={collection.name} heading={collection.name}>
              {collection.components.map((component) => (
                <CommandItem
                  key={component.path}
                  onSelect={() => {
                    router.push(`/docs/components/${component.path}`)
                    setOpen(false)
                  }}
                >
                  {component.name}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
          <CommandGroup heading="Tools">
            {tools.map((tool) => (
              <CommandItem
                key={tool.path}
                onSelect={() => {
                  router.push(`/tools/${tool.path}`)
                  setOpen(false)
                }}
              >
                {tool.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

export default CommandMenu
