import { Redis } from '@upstash/redis'
import { ThumbsUp } from 'lucide-react'
import { revalidateTag, unstable_cache } from 'next/cache'
import { headers } from 'next/headers'
import { Suspense } from 'react'
import { Button } from './ui/button'

const redis = Redis.fromEnv()

type ClapperProps = {
  clapperId: string
  fixedDefaultPosi?: boolean
}

const ClapperInner = async ({
  clapperId,
  fixedDefaultPosi = true,
}: ClapperProps) => {
  const getCachedClaps = unstable_cache(
    async () => {
      return (await redis.get<number>(`claps:${clapperId}`)) || 0
    },
    [clapperId],
    {
      tags: ['claps', clapperId],
    }
  )

  const claps = await getCachedClaps()

  async function clap() {
    'use server'

    // Get the IP address of the user
    const header = await headers()
    const ip = (header.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]
    // Hash the IP address
    const buf = await crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(ip)
    )
    const hash = Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
    // Deduplicate claps
    const newClap = await redis.set(
      `deduplicate:claps:${hash}:${clapperId}`,
      true,
      {
        nx: true, // Only set the key if it doesn't exist
        ex: 24 * 60 * 60, // Expire the key after 24 hours
      }
    )
    if (newClap) {
      await redis.incr(`claps:${clapperId}`) // Increment the clap count
      revalidateTag(clapperId) // Revalidate the cache using tag
    }
  }
  const clapButton = (
    <form action={clap}>
      <Button size="sm" type="submit" className="rounded-full">
        <ThumbsUp /> {claps}
      </Button>
    </form>
  )

  return fixedDefaultPosi ? (
    <div className="fixed bottom-8 right-0 w-full z-50 pl-6">
      <div className="container mx-auto">{clapButton}</div>
    </div>
  ) : (
    clapButton
  )
}

export default async function Clapper(props: ClapperProps) {
  return (
    <Suspense fallback={null}>
      <ClapperInner {...props} />
    </Suspense>
  )
}
