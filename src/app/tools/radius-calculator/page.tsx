import { Metadata } from 'next'
import { tools } from '../tools'
import { RadiusCalculator } from './radius-calculator'

const tool = tools.find((tool) => tool.path === 'radius-calculator')

export const metadata: Metadata = {
  title: tool?.name,
  description: tool?.description,
  openGraph: {
    images: [
      {
        url: `/thumbnails/${tool?.path}.png`,
        width: 1200,
        height: 630,
        alt: tool?.name,
      },
    ],
  },
}

export default function Page() {
  return <RadiusCalculator />
}
