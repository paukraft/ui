import { weirdComponents } from '@/components/weirdui'
import fs from 'fs/promises'
import { NextResponse } from 'next/server'
import path from 'path'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params

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

    // Read the component file
    const componentPath = path.join(
      process.cwd(),
      'src',
      'components',
      'weirdui',
      component.path,
      'component.tsx'
    )

    const content = await fs.readFile(componentPath, 'utf-8')

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
