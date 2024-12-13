'use client'

import Favicon from '@/app/favicon.ico'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const pathname = usePathname()
  const firstComponent = 'bike-pump-slider'

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 md:px-24">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Image src={Favicon} alt="logo" className="size-6 dark:invert" />
          paukraft/ui
        </Link>
        <div className="flex-1 flex items-center justify-end gap-4">
          <div className="hidden md:flex items-center gap-4">
            <Link
              href={`/docs/components/${firstComponent}`}
              className={cn(
                'hover:text-primary transition-colors',
                pathname.includes('/docs') && 'text-primary'
              )}
            >
              Components
            </Link>
          </div>
          {/* <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <button className="p-2 hover:bg-accent rounded-md">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] pr-0">
              <MobileNav />
            </SheetContent>
          </Sheet> */}
        </div>
      </div>
    </div>
  )
}

export default Navbar
