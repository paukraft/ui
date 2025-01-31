import CircularTimerThumbnail from '@/../public/thumbnails/circular-timer.png'
import RadiusCalculatorThumbnail from '@/../public/thumbnails/radius-calculator.png'
import { StaticImageData } from 'next/image'

export const tools: {
  name: string
  description: string
  path: string
  createdAt?: string
  updatedAt?: string
  thumbnail?: StaticImageData
  links?: {
    label: string
    href: string
  }[]
}[] = [
  {
    name: 'Radius Calculator',
    description:
      'Calculate and visualize the perfect corner radius for your design.',
    path: 'radius-calculator',
    createdAt: '2025-01-13',
    thumbnail: RadiusCalculatorThumbnail,
    links: [
      {
        label: 'original from @drudiedo',
        href: 'https://x.com/drudiedo/status/1878790137997627661',
      },
    ],
  },
  {
    name: 'Circular Timer',
    description:
      'A circular timer with intuitive drag controls and haptic feedback.',
    path: 'circular-timer',
    createdAt: '2025-01-30',
    thumbnail: CircularTimerThumbnail,
    links: [
      {
        label: 'original from @boredpxnda',
        href: 'https://x.com/boredpxnda/status/1884668748331659631',
      },
    ],
  },
] as const
