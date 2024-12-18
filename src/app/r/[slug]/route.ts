import { registryComponents } from '@/components/registry'
import { getComponentCode } from '@/lib/get-component-code'
import { op } from '@/lib/op'
import { parseRegistryDependency } from '@/lib/registry-utils'
import { waitUntil } from '@vercel/functions'
import { map } from 'lodash'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  try {
    const component = registryComponents.find((c) => c.path === slug)

    if (!component || !component.path) {
      return NextResponse.json(
        { error: 'Component not found' },
        { status: 404 }
      )
    }

    const content = getComponentCode({ component, type: 'component' })

    const registryData = {
      name: slug,
      type: 'registry:ui',
      dependencies: component.dependencies,
      registryDependencies: map(component.registryDependencies, (dep) =>
        parseRegistryDependency({ dependency: dep })
      ),
      files: [
        {
          path: `ui/${slug}.tsx`,
          content,
          type: 'registry:ui',
          target: '',
        },
      ],
    }

    waitUntil(
      op.track('installed_component', {
        component: component.path,
        methode: 'shadcn/ui cli',
      })
    )

    return NextResponse.json(registryData)
  } catch (error) {
    console.error('Error fetching component:', error)
    return NextResponse.json({ error: 'Component not found' }, { status: 404 })
  }
}
