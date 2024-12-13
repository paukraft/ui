import { CopyDropdown } from '@/components/copy-dropdown'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { weirdComponents } from '@/components/weirdui'
import { CustomPropsDemo } from '@/components/weirdui/custom-props-demo'
import fs from 'fs'
import { notFound } from 'next/navigation'
import path from 'path'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const component = weirdComponents.find(
    (c) => c.name.toLowerCase().replace(/\s+/g, '-') === slug
  )
  return {
    title: `${component?.name}`,
  }
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const component = weirdComponents.find(
    (c) => c.name.toLowerCase().replace(/\s+/g, '-') === slug
  )

  if (!component) {
    notFound()
  }

  const hasCustomProps = Object.keys(component.customProps).length > 0

  // Determine the environment
  const isProd = process.env.NODE_ENV === 'production'
  const basePath = isProd ? 'public' : 'src/components'

  // Read demo file content if path exists
  let demoCode = ''
  if (component.path) {
    const demoPath = path.join(
      process.cwd(),
      basePath,
      'weirdui',
      component.path,
      'demo.tsx'
    )
    try {
      demoCode = fs.readFileSync(demoPath, 'utf-8')
    } catch (error) {
      console.error(`Failed to read demo file for ${component.name}:`, error)
    }
  }

  // Read component file content if path exists
  let componentCode = ''
  if (component.path) {
    const componentPath = path.join(
      process.cwd(),
      basePath,
      'weirdui',
      component.path,
      'component.tsx'
    )
    try {
      componentCode = fs.readFileSync(componentPath, 'utf-8')
    } catch (error) {
      console.error(
        `Failed to read component file for ${component.name}:`,
        error
      )
    }
  }

  const DemoComponent = component.demo

  return (
    <section className="w-full p-6 flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl md:text-6xl font-black">{component.name}</h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          {component.description}
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <div className="rounded-lg border bg-card">
          <Tabs defaultValue="demo" className="w-full">
            <TabsList className="w-full justify-start rounded-b-none border-b bg-transparent p-0 h-auto overflow-hidden">
              <TabsTrigger
                value="playground"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground"
              >
                Playground
              </TabsTrigger>
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
            </TabsList>
            <TabsContent value="demo" className="p-6">
              {DemoComponent ? (
                <DemoComponent />
              ) : (
                <component.component defaultValue={[50]} />
              )}
            </TabsContent>
            <TabsContent value="playground" className="p-6">
              <CustomPropsDemo
                component={component.component}
                customProps={component.customProps as any}
              />
            </TabsContent>
            <TabsContent value="code" className="p-6">
              <pre className="p-4 rounded-lg bg-secondary overflow-x-auto">
                <code className="text-sm">{component.path && demoCode}</code>
              </pre>
            </TabsContent>
          </Tabs>
        </div>

        <div className="rounded-lg border bg-card">
          <Tabs defaultValue="cli" className="w-full">
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
                <p className="text-sm">
                  npx shadcn@latest add &quot;https://ui.paukraft.com/r/{slug}
                  &quot;
                </p>
                <CopyDropdown
                  items={[
                    {
                      label: 'npm',
                      value: `npx shadcn@latest add "https://ui.paukraft.com/r/${slug}"`,
                    },
                    {
                      label: 'yarn',
                      value: `yarn dlx shadcn@latest add "https://ui.paukraft.com/r/${slug}"`,
                    },
                    {
                      label: 'pnpm',
                      value: `pnpm dlx shadcn@latest add "https://ui.paukraft.com/r/${slug}"`,
                    },
                    {
                      label: 'bun',
                      value: `bunx --bun shadcn@latest add "https://ui.paukraft.com/r/${slug}"`,
                    },
                    {
                      label: 'deno',
                      value: `deno run npm:shadcn@latest add "https://ui.paukraft.com/r/${slug}"`,
                    },
                  ]}
                />
              </div>
            </TabsContent>
            <TabsContent value="manual" className="p-6">
              <pre className="p-4 rounded-lg bg-secondary overflow-x-auto">
                <code className="text-sm">{componentCode}</code>
              </pre>
            </TabsContent>
          </Tabs>
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
                    <span>Default: {prop.defaultValue.toString()}</span>
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
      </div>
    </section>
  )
}
