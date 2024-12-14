'use client'

import { cn } from '@/lib/utils'
import { useState } from 'react'
import { BikePumpSlider } from './component'

export default function BikePumpSliderDemo() {
  const [value, setValue] = useState<number[]>([50])
  const [isOptimal, setIsOptimal] = useState(false)

  const handleValueChange = (newValue: number[]) => {
    setValue(newValue)
    setIsOptimal(newValue[0] >= 85 && newValue[0] <= 95)
  }

  return (
    <div className="w-full max-w-sm mx-auto space-y-4">
      <div className="text-sm font-medium text-center">Bike Tire Pressure</div>
      <BikePumpSlider
        value={value}
        onValueChange={handleValueChange}
        pumpSpeed={8}
        leakSpeed={0.5}
      />
      <div className="flex flex-col items-center gap-1">
        <div className="text-center text-sm">
          <span
            className={cn(
              'font-medium',
              isOptimal ? 'text-green-500' : 'text-muted-foreground'
            )}
          >
            {value[0]} PSI
          </span>
        </div>
        <div className="text-xs text-muted-foreground">
          {isOptimal ? '✨ Optimal pressure range' : 'Target: 85-95 PSI'}
        </div>
      </div>
    </div>
  )
}
