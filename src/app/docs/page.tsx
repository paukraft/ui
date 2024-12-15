import { registryCollections } from '@/components/registry'

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
          Welcome to my actively maintained collection of components that
          I&apos;ve developed and continue to develop across various projects.
          This library grows organically as I build new features and solve
          unique challenges in my day-to-day development work. Each component is
          carefully crafted to seamlessly integrate with shadcn/ui, maintaining
          its clean and minimal design philosophy.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Philosophy</h2>
          <p className="text-muted-foreground">
            These components follow shadcn/ui&apos;s design principles - clean,
            functional, and looking like they could be part of the original
            library. The collection is continuously evolving, with new
            components being added as I develop solutions for real-world
            problems in my ongoing projects. Each addition maintains the same
            high standards of quality and design consistency.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Collections</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {collections.map((collection) => (
              <div key={collection.key} className="rounded-lg border p-4">
                <h3 className="font-medium mb-2">{collection.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {collection.description}
                </p>
              </div>
            ))}
          </div>
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
      </div>
    </section>
  )
}

export default DocsPage
