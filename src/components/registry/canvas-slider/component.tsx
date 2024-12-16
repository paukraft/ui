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

      // Calculate minimum points needed
      const pointDifference = Math.abs(
        targetFillPercentage - currentFillPercentage
      )
      const minPointsNeeded = Math.floor(pointDifference / pointPercentage)

      // Batch process points in chunks for better performance
      const BATCH_SIZE = 10
      const addPoints = (count: number) => {
        const points: [number, number][] = []
        for (let i = 0; i < count; i++) {
          points.push([
            Math.random() * canvas.width,
            Math.random() * canvas.height,
          ])
        }

        // Process points in batches
        for (let i = 0; i < points.length; i += BATCH_SIZE) {
          const batch = points.slice(i, i + BATCH_SIZE)
          ctx.beginPath()
          batch.forEach(([x, y]) => {
            ctx.moveTo(x + pointSize, y)
            ctx.arc(x, y, pointSize, 0, Math.PI * 2)
          })
          ctx.fill()
        }
      }

      const clearPoints = (count: number) => {
        const points: [number, number][] = []
        for (let i = 0; i < count; i++) {
          points.push([
            Math.random() * canvas.width,
            Math.random() * canvas.height,
          ])
        }

        // Process points in batches
        for (let i = 0; i < points.length; i += BATCH_SIZE) {
          const batch = points.slice(i, i + BATCH_SIZE)
          ctx.beginPath()
          batch.forEach(([x, y]) => {
            ctx.moveTo(x + pointSize, y)
            ctx.arc(x, y, pointSize, 0, Math.PI * 2)
          })
          ctx.fill()
        }
      }

      if (currentFillPercentage + pointPercentage < targetFillPercentage) {
        // Add points if we're under the controlled value
        ctx.fillStyle = `hsl(${getPrimaryColor()})`

        // Add all min needed points
        addPoints(minPointsNeeded)

        // Fine tune
        while (true) {
          const currentFill = calculateFillPercentage()
          if (currentFill + pointPercentage >= targetFillPercentage) break

          const remainingPercentage = targetFillPercentage - currentFill
          const pointsNeeded = Math.floor(remainingPercentage / pointPercentage)
          if (pointsNeeded === 0) break

          addPoints(pointsNeeded)
        }
      } else if (
        currentFillPercentage - pointPercentage >
        targetFillPercentage
      ) {
        // Remove points if we're over the controlled value
        const prevOperation = ctx.globalCompositeOperation
        ctx.globalCompositeOperation = 'destination-out'

        // Remove all min needed points
        clearPoints(minPointsNeeded)
        // Fine tune
        while (true) {
          const currentFill = calculateFillPercentage()
          if (currentFill - pointPercentage <= targetFillPercentage) break

          const remainingPercentage = currentFill - targetFillPercentage
          const pointsNeeded = Math.floor(remainingPercentage / pointPercentage)
          if (pointsNeeded === 0) break

          clearPoints(pointsNeeded)
        }

        ctx.globalCompositeOperation = prevOperation
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

    // Add resize observer to handle canvas resizing
    useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      const resizeObserver = new ResizeObserver(() => {
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Create a temporary canvas to store the current state
        const tempCanvas = document.createElement('canvas')
        const tempCtx = tempCanvas.getContext('2d')
        if (!tempCtx) return

        // Copy current canvas to temp
        tempCanvas.width = canvas.width
        tempCanvas.height = canvas.height
        tempCtx.drawImage(canvas, 0, 0)

        // Update main canvas dimensions
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight

        // Draw back the content stretched to new dimensions
        ctx.drawImage(
          tempCanvas,
          0,
          0,
          tempCanvas.width,
          tempCanvas.height,
          0,
          0,
          canvas.width,
          canvas.height
        )
      })

      resizeObserver.observe(canvas)

      return () => {
        resizeObserver.disconnect()
      }
    }, [])

    const handlePointerDown = (
      event: React.PointerEvent<HTMLCanvasElement>
    ) => {
      if (disabled) return
      setIsDrawing(true)
      draw(event)
    }

    const handlePointerMove = (
      event: React.PointerEvent<HTMLCanvasElement>
    ) => {
      if (disabled) return
      if (isDrawing) {
        draw(event)
      }
    }

    const handlePointerUp = () => {
      if (disabled) return
      setIsDrawing(false)
    }

    const draw = (event: React.PointerEvent<HTMLCanvasElement>) => {
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

      // Ensure canvas has dimensions
      if (canvas.width === 0 || canvas.height === 0) return 0

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
            'relative h-6 w-64 grow overflow-hidden border-[1px] bg-secondary',
            className
          )}
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full touch-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onPointerCancel={handlePointerUp}
            style={{ touchAction: 'none' }}
          />
        </div>
      </>
    )
  }
)

CanvasSlider.displayName = 'CanvasSlider'

export { CanvasSlider }
