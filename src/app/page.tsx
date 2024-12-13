import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="h-[80dvh] p-6 md:p-24 flex flex-col items-center gap-6 justify-center">
      <div className="rounded-full border px-2.5 py-1 bg-muted text-sm md:text-base text-center">
        A collection of weird UI components
      </div>
      <div className="text-5xl sm:text-7xl md:text-[8rem] font-black leading-none text-center">
        paukraft/ui
      </div>
      <div className="max-w-[600px] text-center text-muted-foreground">
        A collection of unique and playful UI components built with React and
        Tailwind CSS. Fully compatible with shadcn/ui and ready to use in your
        next project.
      </div>
      <Link href="/docs/components">
        <Button className="group rounded-full" variant="outline" size="sm">
          Components
          <ArrowRight
            className="-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
        </Button>
      </Link>
    </main>
  )
}
