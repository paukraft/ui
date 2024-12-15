'use client'

import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'

export const ComparisonSlider = ({
  firstComponent,
  secondComponent,
  className,
  autoHideSlider = false,
  defaultPosition = 50,
}: {
  firstComponent: React.ReactNode
  secondComponent: React.ReactNode
  className?: string
  autoHideSlider?: boolean
  defaultPosition?: number
}) => {
  const [isInteracting, setIsInteracting] = useState(false)
  const [position, setPosition] = useState(defaultPosition)
  const [clipPosition, setClipPosition] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth
      const newClipPosition = (position * containerWidth) / 100
      setClipPosition(newClipPosition)
    }
  }, [position])

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    const percentage = (x / rect.width) * 100
    setPosition(percentage)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault() // Prevent scrolling while dragging
    handleMove(e.touches[0].clientX)
  }

  return (
    <div ref={containerRef}>
      <div
        className={cn(
          'relative touch-none cursor-ew-resize overflow-hidden rounded-lg border',
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsInteracting(true)}
        onMouseLeave={() => setIsInteracting(false)}
        onTouchStart={() => setIsInteracting(true)}
        onTouchEnd={() => setIsInteracting(false)}
        onTouchMove={handleTouchMove}
      >
        <div className="grid grid-cols-1 grid-rows-1">
          {/* Second Component (Right side) */}
          <div
            className="col-start-1 row-start-1"
            style={{
              clipPath:
                clipPosition !== null
                  ? `inset(0 0 0 ${clipPosition}px)`
                  : `inset(0 0 0 ${position}%)`,
            }}
          >
            {secondComponent}
          </div>

          {/* First Component (Left side) */}
          <div
            className="col-start-1 row-start-1"
            style={{
              clipPath:
                clipPosition !== null
                  ? `inset(0 calc(100% - ${clipPosition}px) 0 0)`
                  : `inset(0 ${100 - position}% 0 0)`,
            }}
          >
            {firstComponent}
          </div>

          {/* Divider Line */}
          <div
            className={cn(
              'absolute top-0 h-full w-0.5 -translate-x-1/2 bg-primary transition-opacity',
              isInteracting || !autoHideSlider ? 'opacity-100' : 'opacity-0'
            )}
            style={{ left: `${position}%` }}
          >
            <div className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
          </div>
        </div>
      </div>
    </div>
  )
}
