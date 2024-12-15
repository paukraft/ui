'use client'

import Favicon from '@/app/favicon.ico'
import { Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { DocsNav } from './docs-nav'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <button className="p-2 hover:bg-accent rounded-md">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[300px] sm:w-[400px] pr-0 max-h-[100dvh]"
      >
        <SheetHeader>
          <SheetTitle>
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl"
            >
              <Image src={Favicon} alt="logo" className="size-6 dark:invert" />
              paukraft/ui
            </Link>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 pr-6 pt-6 flex-1 max-h-full overflow-y-auto">
          <DocsNav closeNav={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
