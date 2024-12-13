'use client'

import { cn } from '@/lib/utils'
import * as SliderPrimitive from '@radix-ui/react-slider'
import React, { useEffect, useRef, useState } from 'react'

interface CanvasSliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  // Custom props
  pointSize?: number
}

const CanvasSlider = React.forwardRef<HTMLInputElement, CanvasSliderProps>(
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

      pointSize = 2,
      ...props
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [internalValue, setInternalValue] = useState(defaultValue || [0])
    const [isInitialized, setIsInitialized] = useState(false)

    const controlledValue = value !== undefined ? value : internalValue
    const POINT_AREA = Math.PI * pointSize * pointSize

    const getPrimaryColor = () => {
      const rootStyles = getComputedStyle(document.documentElement)
      return rootStyles.getPropertyValue('--primary').trim()
    }

    const adjustFillToControlledValue = React.useCallback(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const currentFillPercentage = calculateFillPercentage()
      const targetFillPercentage = controlledValue[0]
      const canvasArea = canvas.width * canvas.height
      const pointPercentage = (POINT_AREA / canvasArea) * 100

      if (currentFillPercentage < targetFillPercentage) {
        // Add points if we're under the controlled value
        const pointsToAdd = Math.ceil(
          (targetFillPercentage - currentFillPercentage) / pointPercentage
        )
        let addedPoints = 0
        while (
          calculateFillPercentage() < targetFillPercentage &&
          addedPoints < pointsToAdd * 2
        ) {
          const x = Math.random() * canvas.width
          const y = Math.random() * canvas.height

          ctx.fillStyle = `hsl(${getPrimaryColor()})`
          ctx.beginPath()
          ctx.arc(x, y, pointSize, 0, Math.PI * 2)
          ctx.fill()

          addedPoints++
        }
      } else if (currentFillPercentage > targetFillPercentage) {
        // Remove points if we're over the controlled value
        const pointsToRemove = Math.ceil(
          (currentFillPercentage - targetFillPercentage) / pointPercentage
        )
        let removedPoints = 0
        while (
          calculateFillPercentage() > targetFillPercentage &&
          removedPoints < pointsToRemove * 2
        ) {
          const x = Math.random() * canvas.width
          const y = Math.random() * canvas.height

          ctx.clearRect(
            x - pointSize,
            y - pointSize,
            pointSize * 2,
            pointSize * 2
          )

          removedPoints++
        }
      }
    }, [controlledValue, POINT_AREA, pointSize])

    useEffect(() => {
      if (!isInitialized) {
        const canvas = canvasRef.current
        if (canvas) {
          canvas.width = canvas.offsetWidth
          canvas.height = canvas.offsetHeight
          adjustFillToControlledValue()
          setIsInitialized(true)
        }
      }
    }, [isInitialized, adjustFillToControlledValue])

    useEffect(() => {
      if (isInitialized) {
        const calculatedValue = calculateFillPercentage()
        if (calculatedValue !== controlledValue[0]) {
          adjustFillToControlledValue()
        }
      }
    }, [controlledValue, isInitialized, adjustFillToControlledValue])

    const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
      if (disabled) return
      setIsDrawing(true)
      draw(event)
    }

    const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
      if (disabled) return
      if (isDrawing) {
        draw(event)
      }
    }

    const handleMouseUp = () => {
      if (disabled) return
      setIsDrawing(false)
    }

    const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      ctx.fillStyle = `hsl(${getPrimaryColor()})`
      ctx.beginPath()
      ctx.arc(x, y, pointSize, 0, Math.PI * 2)
      ctx.fill()

      const newValue = calculateFillPercentage()
      if (newValue && newValue !== controlledValue[0]) {
        if (value === undefined) {
          setInternalValue([newValue])
        }
        onValueChange?.([newValue])
      }
    }

    const calculateFillPercentage = () => {
      const canvas = canvasRef.current
      if (!canvas) return 0

      const ctx = canvas.getContext('2d')
      if (!ctx) return 0

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      let filledPixels = 0

      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] > 0) {
          filledPixels++
        }
      }

      const totalPixels = canvas.width * canvas.height
      const fillPercentage = (filledPixels / totalPixels) * 100
      const scaledValue = min + (fillPercentage / 100) * (max - min)
      const newValue = Math.min(
        max,
        Math.max(min, Math.round(scaledValue / step) * step)
      )

      return newValue
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
          <div className="relative h-6 w-full grow overflow-hidden border-[1px] bg-secondary">
            <canvas
              ref={canvasRef}
              className="absolute inset-0 h-full w-full"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            />
          </div>
        </div>
      </>
    )
  }
)

CanvasSlider.displayName = 'CanvasSlider'

export { CanvasSlider }
