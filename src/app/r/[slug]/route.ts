import { registryComponents } from '@/components/registry'
import fs from 'fs'
import { NextResponse } from 'next/server'
import path from 'path'

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

    // Determine the environment
    const isProd = process.env.NODE_ENV === 'production'
    const basePath = isProd ? 'public' : 'src/components'

    const componentPath = path.join(
      process.cwd(),
      basePath,
      'registry',
      component.path,
      'component.tsx'
    )

    const content = fs.readFileSync(componentPath, 'utf-8')

    const registryData = {
      name: slug,
      type: 'registry:ui',
      dependencies: component.dependencies,
      files: [
        {
          path: `ui/${slug}.tsx`,
          content: content,
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
