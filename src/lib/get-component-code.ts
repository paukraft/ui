import { registryComponents } from '@/components/registry'
import fs from 'fs'
import path from 'path'

type GetComponentCodeOptions = {
  component: (typeof registryComponents)[number]
  type: 'demo' | 'component'
}

export const getComponentCode = ({
  component,
  type,
}: GetComponentCodeOptions) => {
  if (!component.path) {
    return ''
  }

  // Determine the environment
  const isProd = process.env.NODE_ENV === 'production'
  const basePath = isProd ? 'public' : 'src/components'

  const fileName = `${type}.tsx`
  const filePath = path.join(
    process.cwd(),
    basePath,
    'registry',
    component.path,
    fileName
  )

  try {
    let code = fs.readFileSync(filePath, 'utf-8')

    if (!component.clientComponent && type === 'component') {
      code = code.replace("'use client'", '').trim()
    }

    return code
  } catch (error) {
    console.error(`Failed to read ${type} file for ${component.name}:`, error)
    return ''
  }
}
