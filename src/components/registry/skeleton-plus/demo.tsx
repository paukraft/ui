'use client'

import { ComparisonSlider } from '../comparison-slider/component'
import { SeededAvatar } from '../seeded-avatar/component'
import { Skeleton } from './component'

const UserProfile = () => (
  <div className="flex items-center gap-4 p-6">
    <SeededAvatar seed="john.doe@company.com" size="lg" variant="user" />
    <div className="flex flex-col gap-1">
      <span className="font-medium">John Doe</span>
      <span className="text-sm text-muted-foreground">Product Designer</span>
      <div className="flex items-center gap-2 text-xs text-muted-foreground whitespace-nowrap">
        <span>San Francisco, CA</span>
        <span>•</span>
        <span>Available for hire</span>
      </div>
    </div>
  </div>
)

const LoadingUserProfile = () => (
  <div className="flex items-center gap-4 p-6">
    <Skeleton className="size-10 rounded-full" />
    <div className="flex flex-col gap-1">
      <Skeleton className="w-16" />
      <Skeleton className="w-24 text-sm" />
      <div className="flex items-center gap-2 whitespace-nowrap">
        <Skeleton className="w-20 text-xs" />
        <span className="text-xs text-muted-foreground">•</span>
        <Skeleton className="w-24 text-xs" />
      </div>
    </div>
  </div>
)

const SkeletonDemo = () => {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-sm text-muted-foreground">
        Slide to compare states
      </span>
      <div className="flex">
        <ComparisonSlider
          firstComponent={<UserProfile />}
          secondComponent={<LoadingUserProfile />}
        />
      </div>
    </div>
  )
}

export default SkeletonDemo
