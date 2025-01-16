import { NewBadge } from '@/components/new-badge'
import Image from 'next/image'
import Link from 'next/link'
import { tools } from '../tools/tools'

export const InteractiveTools = () => {
  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Tools</h2>
        <Link
          href="/tools"
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          View all →
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.path}
            href={`/tools/${tool.path}`}
            className="group relative w-full overflow-hidden rounded-xl border bg-card p-2 transition-colors hover:bg-accent"
            style={{ paddingTop: 'calc(100% / 1.91)' }}
          >
            <div className="absolute inset-2 flex items-center justify-center rounded-lg overflow-hidden">
              {tool.thumbnail && (
                <Image
                  src={tool.thumbnail}
                  alt={`${tool.name} Preview`}
                  width={1200}
                  height={630}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="absolute bottom-4 left-4 flex flex-row items-center gap-2">
              <div className="rounded-full border bg-background/95 px-3 py-1 text-sm backdrop-blur">
                {tool.name}
              </div>
              <NewBadge createdAt={tool.createdAt} />
            </div>
          </Link>
        ))}

        {tools.length < 2 && (
          <div
            className="relative w-full overflow-hidden rounded-xl border bg-card p-2"
            style={{ paddingTop: 'calc(100% / 1.91)' }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              More tools coming soon...
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
