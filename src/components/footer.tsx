import Link from 'next/link'
import { ModeToggle } from './theme-toggle'

export default function Footer() {
  return (
    <>
      <div className="h-[100px] sm:h-[72px]" />
      <footer className="w-full flex-1 flex flex-col justify-end absolute bottom-0">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 py-6 px-6">
          <Link href="https://paukraft.com" target="_blank">
            <p className="text-xs text-muted-foreground">by Pau Kraft</p>
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <ModeToggle />
            <Link href="https://twitter.com/paukraft" target="_blank">
              <p className="text-sm text-muted-foreground hover:underline">
                Twitter / X
              </p>
            </Link>
            <Link href="https://bsky.app/profile/paukraft.com" target="_blank">
              <p className="text-sm text-muted-foreground hover:underline">
                Bluesky
              </p>
            </Link>
          </div>
        </div>
      </footer>
    </>
  )
}
