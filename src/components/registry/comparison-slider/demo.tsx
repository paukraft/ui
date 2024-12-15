'use client'

import { ComparisonSlider } from './component'

const ComparisonSliderDemo = () => {
  const basicCode = `const getUserStatus = (user: User) => {
  if (user.isActive) {
    if (user.hasVerifiedEmail) {
      if (user.hasPremium) {
        return 'premium'
      } else {
        return 'active'
      }
    } else {
      return 'unverified'
    }
  } else {
    return 'inactive'
  }
}`

  const earlyReturnCode = `const getUserStatus = (user: User) => {
  if (!user.isActive) return 'inactive'
  if (!user.hasVerifiedEmail) return 'unverified'
  if (!user.hasPremium) return 'active'
  return 'premium'
}`

  return (
    <ComparisonSlider
      className="font-mono"
      firstComponent={
        <div className="flex h-full w-full flex-col gap-2 rounded-lg bg-card p-6">
          <p className="text-sm text-muted-foreground">
            ❌ Nested Conditionals
          </p>
          <pre className="whitespace-pre text-sm">{basicCode}</pre>
        </div>
      }
      secondComponent={
        <div className="flex h-full w-full flex-col gap-2 rounded-lg bg-secondary/30 p-6">
          <p className="text-sm text-muted-foreground">✅ Early Returns</p>
          <pre className="whitespace-pre text-sm">{earlyReturnCode}</pre>
        </div>
      }
      defaultPosition={20}
    />
  )
}

export default ComparisonSliderDemo
