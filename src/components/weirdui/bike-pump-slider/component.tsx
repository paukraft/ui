'use client'

import { cn } from '@/lib/utils'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { motion, useMotionValue, useTransform } from 'motion/react'
import React, { useEffect, useState } from 'react'

interface BikePumpSliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  // Custom props
  pumpSpeed?: number
  leakSpeed?: number
}

const BikePumpSlider = React.forwardRef<HTMLInputElement, BikePumpSliderProps>(
  (
    {
      className,
      defaultValue,
      value,
      onValueChange,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      pumpSpeed = 10,
      leakSpeed = 1,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue || [0])
    const controlledValue = value !== undefined ? value : internalValue
    const [isHandleActive, setIsHandleActive] = useState(false)

    const handleY = useMotionValue(0)
    const pressureValue = useMotionValue(controlledValue[0])
    const pressureHeight = useTransform(
      pressureValue,
      [min, max],
      ['0%', '100%']
    )

    useEffect(() => {
      const leakInterval = setInterval(() => {
        const newValue = Math.max(min, controlledValue[0] - leakSpeed)
        if (value === undefined) {
          setInternalValue([newValue])
        }
        onValueChange?.([newValue])
        pressureValue.set(newValue)
      }, 100)

      return () => clearInterval(leakInterval)
    }, [controlledValue, min, onValueChange, value, leakSpeed, pressureValue])

    useEffect(() => {
      const handleGlobalMouseUp = () => {
        setIsHandleActive(false)
      }

      window.addEventListener('mouseup', handleGlobalMouseUp)

      return () => {
        window.removeEventListener('mouseup', handleGlobalMouseUp)
      }
    }, [])

    const handleDrag = (event: any, info: any) => {
      if (disabled) return
      const newY = Math.max(0, Math.min(50, handleY.get() + info.delta.y))
      handleY.set(newY)
      if (info.delta.y > 0) {
        // Only increase pressure when moving down
        const pumpValue = (Math.abs(info.delta.y) / 50) * pumpSpeed
        const newValue = Math.min(max, controlledValue[0] + pumpValue)
        if (value === undefined) {
          setInternalValue([newValue])
        }
        onValueChange?.([newValue])
        pressureValue.set(newValue)
      }
    }

    return (
      <>
        <input
          ref={ref}
          type="range"
          className="hidden"
          {...props}
          value={controlledValue[0]}
        />
        <div
          className={cn(
            'relative flex w-full touch-none select-none items-center',
            className
          )}
        >
          <div className="relative flex flex-col items-center h-[200px]">
            <motion.div
              drag="y"
              dragConstraints={{ top: 0, bottom: 50 }}
              dragElastic={0}
              onDrag={handleDrag}
              onMouseDown={() => setIsHandleActive(true)}
              style={{ y: handleY }}
              className="absolute top-0 flex flex-col items-center cursor-grab active:cursor-grabbing"
            >
              <div className="w-16 h-2 bg-muted-foreground" />
              <div className="w-1.5 h-[120px] bg-muted-foreground" />
            </motion.div>
            <div className="absolute bottom-0 w-8 h-32 bg-secondary overflow-hidden flex">
              <motion.div
                className="w-full bg-primary absolute bottom-0 left-0"
                style={{ height: pressureHeight }}
              />
            </div>
          </div>
        </div>
      </>
    )
  }
)

BikePumpSlider.displayName = 'BikePumpSlider'

export { BikePumpSlider }
