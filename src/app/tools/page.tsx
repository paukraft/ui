import { NewBadge } from '@/components/new-badge'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { tools } from './tools'

const ToolsPage = () => {
  return (
    <section className="w-full p-6 flex flex-col gap-6 md:gap-12 max-w-4xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl md:text-6xl font-black mt-2">Tools</h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          A collection of useful tools I&apos;ve built over time.
        </p>
      </div>

      <div className="grid gap-8">
        {tools.map((tool) => (
          <div
            key={tool.name}
            className="rounded-lg border overflow-hidden flex flex-col"
          >
            <Link href={`/tools/${tool.path}`} className="group">
              <div className="w-full p-4 border-b bg-card relative hover:bg-muted/20 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-medium">{tool.name}</h3>
                  <NewBadge createdAt={tool.createdAt} />

                  <ArrowUpRight className="w-5 h-5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all ml-auto" />
                </div>
                <p className="text-sm text-muted-foreground">
                  {tool.description}
                </p>
              </div>
              {tool.thumbnail && (
                <div className="w-full aspect-[2/1] relative">
                  <Image
                    src={tool.thumbnail}
                    alt={`${tool.name} preview`}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </Link>
            {tool.links && tool.links.length > 0 && (
              <div className="p-4 bg-muted/50 flex gap-4 text-sm text-muted-foreground">
                {tool.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors hover:underline flex items-center gap-1"
                  >
                    {link.label}
                    <ArrowUpRight className="size-3" />
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default ToolsPage
