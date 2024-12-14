'use client'

import Favicon from '@/app/favicon.ico'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import GithubButton from './github-button'
import { MobileNav } from './mobile-nav'

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
            <GithubButton />
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
          <MobileNav />
        </div>
      </div>
    </div>
  )
}

export default Navbar
