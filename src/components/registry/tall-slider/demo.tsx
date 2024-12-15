'use client'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Slider } from '@/components/ui/slider'
import { Play, Volume2 } from 'lucide-react'
import { useState } from 'react'
import { TallSlider } from './component'

export default function TallSliderDemo() {
  const [volume, setVolume] = useState<number[]>([50])
  const [progress, setProgress] = useState<number[]>([30])

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      <div className="w-full aspect-video bg-muted rounded-lg flex items-center justify-center">
        <span className="text-muted-foreground">Video Player</span>
      </div>

      <div className="flex items-center gap-4 px-2">
        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
          <Play className="w-5 h-5" />
        </button>

        <Popover defaultOpen>
          <PopoverTrigger asChild>
            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
              <Volume2 className="w-5 h-5" />
            </button>
          </PopoverTrigger>
          <PopoverContent side="top" className="w-fit p-3">
            <TallSlider
              value={volume}
              onValueChange={setVolume}
              className="w-8"
            />
          </PopoverContent>
        </Popover>

        <div className="text-sm text-muted-foreground">1:23 / 4:56</div>

        <div className="flex-1">
          <Slider value={progress} onValueChange={setProgress} />
        </div>
      </div>
    </div>
  )
}
