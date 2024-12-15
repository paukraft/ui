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

    // Format the code
    code = code.trim()

    // Convert all string literals to double quotes
    code = code.replace(/(['"])(.*?)\1/g, (match, quote, content) => {
      return `"${content}"`
    })

    // Handle client directive
    if (component.clientComponent && type === 'component') {
      // Remove any existing 'use client' directive
      code = code.replace(/"use client"\n*/g, '')
      // Add properly formatted directive
      code = `"use client"\n\n${code}`
    } else {
      // Remove client directive if it exists
      code = code.replace(/"use client"\n*/g, '').trim()
    }

    return code
  } catch (error) {
    console.error(`Failed to read ${type} file for ${component.name}:`, error)
    return ''
  }
}
