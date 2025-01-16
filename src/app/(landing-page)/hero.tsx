import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const Hero = () => {
  return (
    <div className="flex flex-col items-center gap-8 py-12">
      <div className="rounded-full border bg-muted/50 px-4 py-1.5 text-sm md:text-base text-center backdrop-blur-sm">
        High-quality React components
      </div>

      <div className="flex flex-col items-center gap-6">
        <h1 className="text-5xl sm:text-7xl md:text-[8rem] font-black leading-none text-center bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
          paukraft/ui
        </h1>

        <p className="max-w-[600px] text-center text-muted-foreground text-lg">
          A collection of unique and playful UI components built with React and
          Tailwind CSS. Fully compatible with shadcn/ui and ready to use in your
          next project.
        </p>
      </div>

      <div className="flex gap-4 mt-4">
        <Link href="/docs">
          <Button className="group rounded-full" size="lg">
            Browse Components
            <ArrowRight
              className="-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
          </Button>
        </Link>
        <Link href="/tools">
          <Button className="group rounded-full" variant="outline" size="lg">
            Try Tools
          </Button>
        </Link>
      </div>
    </div>
  )
}
