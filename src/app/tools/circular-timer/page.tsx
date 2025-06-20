import Clapper from '@/components/clapper'
import { Metadata } from 'next'
import { tools } from '../tools'
import { CircularTimer } from './circular-timer'

const tool = tools.find((tool) => tool.path === 'circular-timer')

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
  return (
    <>
      <CircularTimer />
      <Clapper clapperId="circular-timer" />
    </>
  )
}
