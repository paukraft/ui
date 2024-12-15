import { registryComponents } from '@/components/registry'
import { getComponentCode } from '@/lib/get-component-code'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  try {
    const component = registryComponents.find(
      (c) => c.name.toLowerCase().replace(/\s+/g, '-') === slug
    )

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
      files: [
        {
          path: `ui/${slug}.tsx`,
          content,
          type: 'registry:ui',
          target: '',
        },
      ],
    }

    return NextResponse.json(registryData)
  } catch (error) {
    console.error('Error fetching component:', error)
    return NextResponse.json({ error: 'Component not found' }, { status: 404 })
  }
}
