'use client'

import { cn } from '@/lib/utils'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { LucideIcon, Volume2 } from 'lucide-react'
import { motion } from 'motion/react'
import React, { useEffect, useRef, useState } from 'react'

interface SlingshotSliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  // Custom props
  icon?: LucideIcon
  maxAngle?: number
  fullPowerTime?: number
  flyTime?: number
}

const SlingshotSlider = React.forwardRef<
  HTMLInputElement,
  SlingshotSliderProps
>(
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

      icon: Icon = Volume2,
      maxAngle = 35,
      fullPowerTime = 1000,
      flyTime = 400,
      ...props
    },
    ref
  ) => {
    const [angle, setAngle] = useState(0)
    const [isHolding, setIsHolding] = useState(false)
    const [rotation, setRotation] = useState(180)
    const startTimeRef = useRef<number | null>(null)
    const iconRef = useRef<HTMLDivElement>(null)
    const [internalValue, setInternalValue] = useState(defaultValue || [0])

    const controlledValue = value !== undefined ? value : internalValue

    useEffect(() => {
      let animationFrameId: number

      const updateAngle = (timestamp: number) => {
        if (startTimeRef.current === null) {
          startTimeRef.current = timestamp
        }

        const elapsedTime = timestamp - startTimeRef.current
        const progress = Math.min(elapsedTime / fullPowerTime, 1)
        const newAngle = progress * maxAngle

        setAngle(newAngle)

        if (progress < 1 && isHolding) {
          animationFrameId = requestAnimationFrame(updateAngle)
        }
      }

      if (isHolding) {
        animationFrameId = requestAnimationFrame(updateAngle)
      } else {
        startTimeRef.current = null
        setAngle(0)
      }

      return () => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId)
        }
      }
    }, [isHolding, maxAngle, fullPowerTime])

    useEffect(() => {
      const handleEnd = () => {
        if (isHolding) {
          setIsHolding(false)
          const percentage = (angle / maxAngle) * 100
          const newValue = min + (percentage / 100) * (max - min)
          const roundedValue = Math.round(newValue / step) * step
          if (value === undefined) {
            setInternalValue([roundedValue])
          }
          onValueChange?.([roundedValue])
          setRotation(180)
        }
      }

      document.addEventListener('mouseup', handleEnd)
      document.addEventListener('touchend', handleEnd)
      return () => {
        document.removeEventListener('mouseup', handleEnd)
        document.removeEventListener('touchend', handleEnd)
      }
    }, [isHolding, angle, maxAngle, min, max, step, onValueChange, value])

    const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault() // Prevent default touch behavior
      setIsHolding(true)
      setRotation(0)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = [Number(e.target.value)]
      if (value === undefined) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
    }

    return (
      <>
        <input
          ref={ref}
          type="range"
          min={min}
          max={max}
          step={step}
          className="hidden"
          {...props}
          onChange={handleChange}
          {...(value !== undefined
            ? { value: controlledValue[0] }
            : { defaultValue: defaultValue?.[0] })}
        />
        <div className="relative flex gap-3 overflow-visible">
          <div
            ref={iconRef}
            className="size-9 cursor-pointer touch-none"
            onMouseDown={handleStart}
            onTouchStart={handleStart}
            style={{
              transform: `rotate(${-angle}deg) translateY(-${angle / 5}px)`,
              transition: isHolding ? 'none' : 'transform 0.2s ease-out',
            }}
          >
            <Icon className="w-full h-full" strokeWidth={1.5} />
          </div>
          <div
            className={cn(
              'relative flex w-full touch-none select-none items-center',
              className
            )}
          >
            <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
              <div
                className="absolute h-full bg-primary"
                style={{ width: `${controlledValue[0]}%` }}
              />
            </div>

            <motion.div
              className={cn(
                'absolute aspect-square flex items-center pointer-events-none',
                isHolding && 'invisible'
              )}
              style={{
                width: `${
                  isHolding
                    ? Math.round(
                        min +
                          ((((angle / maxAngle) * 100) / 100) * (max - min)) /
                            step
                      ) * step
                    : controlledValue[0]
                }%`,
              }}
              animate={{ rotate: rotation }}
              transition={{ duration: rotation === 0 ? 0 : flyTime / 1000 }}
            >
              <div className="h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 -translate-x-1/2 shrink-0" />
            </motion.div>
          </div>
        </div>
      </>
    )
  }
)

SlingshotSlider.displayName = 'SlingshotSlider'

export { SlingshotSlider }
