'use client'

import { cn } from '@/lib/utils'

function Skeleton({
  variant = 'dark',
  className,
  ...props
}: { variant?: 'dark' | 'bright' } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex items-center')} {...props}>
      <div
        className={cn(
          'w-32 animate-pulse rounded-md',
          variant === 'dark' && 'bg-muted',
          variant === 'bright' && 'bg-muted-foreground',
          className
        )}
      >
        {/* Invisible space fo height 5Head, please dont delete it :) */}
        <div className="invisible">​</div>
      </div>
    </div>
  )
}

export { Skeleton }
