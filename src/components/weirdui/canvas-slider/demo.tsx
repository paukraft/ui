'use client'

import { useState } from 'react'
import { CanvasSlider } from './component'

export default function CanvasSliderDemo() {
  const [value, setValue] = useState<number[]>([0])
  const [isComplete, setIsComplete] = useState(false)

  const handleValueChange = (newValue: number[]) => {
    setValue(newValue)
    setIsComplete(newValue[0] >= 95)
  }

  return (
    <div className="w-full max-w-sm mx-auto space-y-4">
      <div className="text-sm font-medium text-center">Scratch to Reveal</div>
      <div className="relative">
        <CanvasSlider
          value={value}
          onValueChange={handleValueChange}
          pointSize={3}
        />
        {isComplete && (
          <div className="absolute inset-0 flex items-center justify-center animate-fade-in">
            <div className="text-sm font-medium text-background">
              🎉 You won 20% off!
            </div>
          </div>
        )}
      </div>
      <div className="text-center text-xs text-muted-foreground">
        {isComplete ? 'Coupon revealed!' : 'Keep scratching...'}
      </div>
    </div>
  )
}
