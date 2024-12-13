'use client'

import { useState } from 'react'
import { TallSlider } from './component'

export default function TallSliderDemo() {
  const [value, setValue] = useState<number[]>([50])

  return (
    <div className="w-full max-w-sm mx-auto space-y-4">
      <div className="flex flex-col items-center gap-2">
        <div className="text-sm font-medium">Building Height Visualizer</div>
        <div className="flex items-end gap-4">
          <div className="flex justify-center">
            <TallSlider value={value} onValueChange={setValue} />
          </div>
          <div
            className="relative w-16 bg-secondary/30"
            style={{ height: `${value[0]}%` }}
          >
            <div className="absolute -left-16 top-1/2 text-xs text-muted-foreground whitespace-nowrap">
              {Math.round(value[0] * 3.28084)} ft
            </div>
          </div>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          {value[0]}m tall
        </div>
      </div>
    </div>
  )
}
