import Clapper from '@/components/clapper'
import { CopyDropdown } from '@/components/copy-dropdown'
import { registryCollections, registryComponents } from '@/components/registry'
import { CustomPropsDemo } from '@/components/registry/custom-props-demo'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { CodeBlock } from '@/components/ui/code-block'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getComponentCode } from '@/lib/get-component-code'
import { op } from '@/lib/op'
import {
  getRegistryUrlFromComponent,
  parseRegistryDependency,
} from '@/lib/registry-utils'
import { waitUntil } from '@vercel/functions'
import { ExternalLink, Info } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return registryComponents.map((component) => ({
    slug: component.path.toLowerCase().replace(/\s+/g, '-'),
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const component = registryComponents.find((c) => c.path === slug)
  return {
    title: component?.name,
    description: component?.description,
  }
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const component = registryComponents.find(
    (c) => c.name.toLowerCase().replace(/\s+/g, '-') === slug
  )

  if (!component) {
    notFound()
  }

  // Get demo and component code
  const demoCode = component.demo
    ? await getComponentCode({ component, type: 'demo' })
    : ''
  const componentCode = await getComponentCode({ component, type: 'component' })

  const DemoComponent = component.demo
  const hasDemo = !!component.demo

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
              {component.collections.map((collection) => (
                <BreadcrumbLink
                  key={collection}
                  href={`/docs/collections/${collection}`}
                >
                  {registryCollections[collection].name}
                </BreadcrumbLink>
              ))}
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{component.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-4xl md:text-6xl font-black mt-2">
          {component.name}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          {component.description}
        </p>
        {component.links?.length && component.links.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {component.links?.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="secondary"
                  className="py-1 h-auto rounded-md px-2 text-xs [&_svg]:size-3.5 gap-1"
                >
                  {link.label}
                  <ExternalLink />
                </Button>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-10">
        <div className="rounded-lg border bg-card">
          <Tabs
            defaultValue={hasDemo ? 'demo' : 'playground'}
            className="w-full"
          >
            <TabsList className="w-full justify-start rounded-b-none border-b bg-transparent p-0 h-auto overflow-hidden">
              <TabsTrigger
                value="playground"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground"
              >
                Playground
              </TabsTrigger>
              {hasDemo && (
                <>
                  <TabsTrigger
                    value="demo"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground"
                  >
                    Demo
                  </TabsTrigger>
                  <TabsTrigger
                    value="code"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground"
                  >
                    Demo Code
                  </TabsTrigger>
                </>
              )}
            </TabsList>
            <TabsContent value="demo" className="p-6">
              {DemoComponent ? <DemoComponent /> : <component.component />}
            </TabsContent>
            <TabsContent value="playground" className="p-6">
              <CustomPropsDemo
                component={component.component}
                customProps={component.customProps as any}
                type={component.type}
              />
            </TabsContent>
            <TabsContent value="code" className="p-6">
              <CodeBlock code={component.path && demoCode} />
            </TabsContent>
          </Tabs>
        </div>

        {component.type === 'animated-icon' && (
          <Alert>
            <Info className="size-4" />
            <AlertTitle>Usage Note</AlertTitle>
            <AlertDescription>
              All animated icons add their hover listnerers on the closest
              element with class &quot;group&quot;.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl md:text-3xl font-bold">Installation</h2>
          <div className="rounded-lg border bg-card">
            <Tabs
              defaultValue="cli"
              className="w-full max-w-full overflow-x-hidden"
            >
              <TabsList className="w-full justify-start rounded-b-none border-b bg-transparent p-0 h-auto overflow-hidden">
                <TabsTrigger
                  value="cli"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground"
                >
                  CLI
                </TabsTrigger>
                <TabsTrigger
                  value="manual"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground"
                >
                  Manual
                </TabsTrigger>
              </TabsList>
              <TabsContent value="cli" className="p-6">
                <div className="flex justify-between gap-4">
                  <p className="text-sm overflow-x-auto whitespace-nowrap">
                    npx shadcn@latest add &quot;
                    {getRegistryUrlFromComponent({ component })}
                    &quot;
                  </p>
                  <CopyDropdown
                    items={[
                      {
                        label: 'npm',
                        value: `npx shadcn@latest add "${getRegistryUrlFromComponent(
                          { component }
                        )}"`,
                      },
                      {
                        label: 'yarn',
                        value: `yarn dlx shadcn@latest add "${getRegistryUrlFromComponent(
                          { component }
                        )}"`,
                      },
                      {
                        label: 'pnpm',
                        value: `pnpm dlx shadcn@latest add "${getRegistryUrlFromComponent(
                          { component }
                        )}"`,
                      },
                      {
                        label: 'bun',
                        value: `bunx --bun shadcn@latest add "${getRegistryUrlFromComponent(
                          { component }
                        )}"`,
                      },
                      {
                        label: 'deno',
                        value: `deno run npm:shadcn@latest add "${getRegistryUrlFromComponent(
                          { component }
                        )}"`,
                      },
                    ]}
                  />
                </div>
              </TabsContent>
              <TabsContent value="manual" className="p-6 max-w-full">
                <CodeBlock
                  code={componentCode}
                  onCopy={async () => {
                    'use server'

                    waitUntil(
                      op.track('installed_component', {
                        component: component.path,
                        methode: 'manual copy',
                      })
                    )
                  }}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl md:text-3xl font-bold">Custom Props</h2>
          <div className="grid gap-4">
            {Object.entries(component.customProps).map(([key, prop]) => (
              <div key={key} className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold">{key}</h3>
                <p className="text-muted-foreground">{prop.description}</p>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span>Type: {prop.type}</span>
                  <span>Required: {prop.required ? 'Yes' : 'No'}</span>
                  {prop.defaultValue && (
                    <span>Default: {String(prop.defaultValue)}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          {Object.entries(component.customProps).length === 0 && (
            <p className="text-sm text-muted-foreground">
              This component has no custom props
            </p>
          )}
        </div>

        {(component.dependencies?.length ||
          0 > 0 ||
          component.registryDependencies?.length ||
          0 > 0) && (
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl md:text-3xl font-bold">Dependencies</h2>
            <div className="grid gap-4">
              {component.dependencies?.length > 0 && (
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold">NPM Dependencies</h3>
                  <div className="flex flex-wrap gap-2">
                    {component.dependencies.map((dep) => (
                      <div
                        key={dep}
                        className="rounded-md bg-muted px-2.5 py-0.5 text-sm font-mono"
                      >
                        {dep}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {component.registryDependencies?.length &&
                component.registryDependencies.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold">
                      Registry Dependencies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {component.registryDependencies.map((dep) => (
                        <div
                          key={dep}
                          className="rounded-md bg-muted px-2.5 py-0.5 text-sm font-mono"
                        >
                          {parseRegistryDependency({ dependency: dep })}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </div>
        )}
      </div>
      <Clapper clapperId={`component-${component.path}`} />
    </section>
  )
}
