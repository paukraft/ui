'use client'

import { cn } from '@/lib/utils'
import { useState } from 'react'
import { AnimatedCheckIcon } from '../animated-check-icon/component'
import { AnimatedCopyIcon } from '../animated-copy-icon/component'

export const CopyButton = ({
  text,
  className,
  stopPropagation = false,
  animationTime = 3000,
  onCopy,
}: {
  text: string
  className?: string
  stopPropagation?: boolean
  animationTime?: number
  onCopy?: () => void
}) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (stopPropagation) {
      e.stopPropagation()
      e.preventDefault()
    }
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), animationTime)
    onCopy?.()
  }

  return (
    <button
      onClick={handleCopy}
      className={cn('cursor-pointer size-3 group', className)}
    >
      {copied ? (
        <AnimatedCheckIcon className="size-full" />
      ) : (
        <AnimatedCopyIcon className="size-full" />
      )}
    </button>
  )
}
