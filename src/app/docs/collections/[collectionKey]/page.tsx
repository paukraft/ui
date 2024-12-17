import { NewComponentBadge } from '@/components/new-component-badge'
import { registryCollections, registryComponents } from '@/components/registry'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { groupBy } from 'lodash'
import { ArrowUpRight } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{
    collectionKey: string
  }>
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { collectionKey } = await params

  const collection =
    registryCollections[collectionKey as keyof typeof registryCollections]
  if (!collection) {
    return {
      title: 'Collection Not Found',
    }
  }

  return {
    title: collection.name,
    description: collection.description,
  }
}

const CollectionPage = async ({ params }: Props) => {
  const { collectionKey } = await params

  const collection =
    registryCollections[collectionKey as keyof typeof registryCollections]

  if (!collection) {
    notFound()
  }

  const components = groupBy(registryComponents, (component) =>
    component.collections.includes(collectionKey as never)
  ).true?.sort((a, b) => a.name.localeCompare(b.name))

  return (
    <section className="w-full p-6 flex flex-col gap-6 md:gap-12">
      <div className="flex flex-col gap-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{collection.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-4xl md:text-6xl font-black mt-2">
          {collection.name}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          {collection.description}
        </p>
      </div>

      <div className="grid gap-8">
        {components?.map((component) => (
          <div
            key={component.name}
            className="rounded-lg border overflow-hidden flex flex-col"
          >
            <div className="relative">
              <Link
                href={`/docs/components/${component.path}`}
                className="group"
              >
                <div className="w-full p-4 border-b bg-card relative hover:bg-muted/20 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    {component.type === 'animated-icon' && (
                      <component.component />
                    )}
                    <h3 className="font-medium">{component.name}</h3>
                    <NewComponentBadge component={component} />
                    <ArrowUpRight className="w-5 h-5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all ml-auto" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {component.description}
                  </p>
                </div>
              </Link>
              {component.demo && (
                <div className="w-full aspect-[2/1] bg-muted/50 flex items-center justify-center p-8">
                  <component.demo />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default CollectionPage
