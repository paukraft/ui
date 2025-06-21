'use client'

import { cn } from '@/lib/utils'
import { useState } from 'react'

export const Expander = ({
  children,
  maxHeight = 200,
  className,
  overlayClassName,
  showAllText = 'Show All',
  showLessText = 'Show Less',
}: {
  children: React.ReactNode
  maxHeight?: number
  className?: string
  overlayClassName?: string
  showAllText?: string
  showLessText?: string
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div
      className={cn('relative rounded-lg overflow-hidden', className)}
      data-state={isExpanded ? 'open' : 'closed'}
    >
      <div
        className={cn(
          'overflow-hidden',
          !isExpanded && `max-h-[${maxHeight}px]`
        )}
        style={!isExpanded ? { maxHeight: `${maxHeight}px` } : undefined}
      >
        {children}
      </div>

      {!isExpanded && (
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-b from-transparent to-background flex items-end justify-center pointer-events-none',
            overlayClassName
          )}
        >
          <button
            onClick={toggleExpanded}
            className="px-3 py-1.5 rounded-full bg-muted/80 backdrop-blur-sm text-xs font-medium text-foreground hover:bg-muted transition-colors pointer-events-auto"
          >
            {showAllText}
          </button>
        </div>
      )}

      {isExpanded && (
        <div className="flex justify-center mt-2">
          <button
            onClick={toggleExpanded}
            className="px-3 py-1.5 rounded-full bg-muted/80 backdrop-blur-sm text-xs font-medium text-foreground hover:bg-muted transition-colors"
          >
            {showLessText}
          </button>
        </div>
      )}
    </div>
  )
}
