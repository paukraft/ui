import { registryCollections } from '@/components/registry'
import Link from 'next/link'

const DocsPage = () => {
  const collections = Object.entries(registryCollections).map(
    ([key, collection]) => ({
      key,
      ...collection,
    })
  )

  return (
    <section className="w-full p-6 flex flex-col gap-6 md:gap-12">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl md:text-6xl font-black">Introduction</h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          paukraft/ui is a library of components meant to be an addon for
          shadcn/ui. It mostly consists of nice-to-have components that
          I&apos;ve missed in the base shadcn/ui. I create components for
          whatever I need, so it is not limited to base components. Really,
          anything I find useful and want to reuse in my own projects or I think
          could be useful to others.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Philosophy</h2>
          <p className="text-muted-foreground">
            These components closely follow shadcn/ui&apos;s design principles -
            clean, functional, and appearing as if they were part of the
            original library. This library continuously evolves as new
            components are added during development of my other ongoing
            projects.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Installation</h2>
          <p className="text-muted-foreground">
            Each component can be installed individually using the shadcn-ui
            CLI, just like official shadcn/ui components. Visit the specific
            component pages for installation instructions and customization
            options.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Features</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Seamless integration with shadcn/ui</li>
            <li>Consistent with shadcn/ui&apos;s design language</li>
            <li>Built on Radix UI primitives</li>
            <li>Styled with Tailwind CSS</li>
            <li>Full accessibility support</li>
            <li>TypeScript-first approach</li>
            <li>Server Component friendly</li>
            <li>Regular updates and new additions</li>
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Collections</h2>
          <p className="text-muted-foreground">
            The library is divided into collections. Each collection is a group
            of components that are related to each other in some way or another.
          </p>
          <div className="grid gap-4 md:grid-cols-2 auto-rows-fr">
            {collections.map((collection) => (
              <Link
                key={collection.key}
                href={`/docs/collections/${collection.key}`}
                className="rounded-lg border p-4 hover:bg-muted/50 transition-colors flex flex-col"
              >
                <h3 className="font-medium mb-2">{collection.name}</h3>
                <p className="text-sm text-muted-foreground flex-1">
                  {collection.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default DocsPage
