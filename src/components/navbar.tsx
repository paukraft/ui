import Favicon from '@/app/favicon.ico'
import Image from 'next/image'
import Link from 'next/link'
import CommandMenu from './command-menu'
import GithubButton from './github-button'
import { MobileNav } from './mobile-nav'

const Navbar = () => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 md:px-24">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Image src={Favicon} alt="logo" className="size-6 dark:invert" />
            paukraft/ui
          </Link>
          <Link
            href={`/docs`}
            className="hover:text-primary transition-colors hidden md:block"
          >
            Components
          </Link>
          <Link
            href="/tools"
            className="hover:text-primary transition-colors hidden md:block"
          >
            Tools
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-end gap-4">
          <div className="hidden md:flex items-center gap-4">
            <CommandMenu />
            <GithubButton />
          </div>
          <MobileNav />
        </div>
      </div>
    </div>
  )
}

export default Navbar
