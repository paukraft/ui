import { weirdComponents } from '@/components/weirdui'
import { NextResponse } from 'next/server'
import { createRequire } from 'node:module'
import path from 'path'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  try {
    const component = weirdComponents.find(
      (c) => c.name.toLowerCase().replace(/\s+/g, '-') === slug
    )

    if (!component || !component.path) {
      return NextResponse.json(
        { error: 'Component not found' },
        { status: 404 }
      )
    }

    // Read the component file using dynamic require
    const componentPath = path.join(
      process.cwd(),
      'src',
      'components',
      'weirdui',
      component.path,
      'component.tsx'
    )

    const require = createRequire(import.meta.url)
    const content = require('fs').readFileSync(componentPath, 'utf-8')

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
    return NextResponse.json({ error: 'Component not found' }, { status: 404 })
  }
}
