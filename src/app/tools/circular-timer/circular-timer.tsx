'use client'

import { Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const MAX_TIME = 60
const MODULO_FOR_TICKS = 5

// Calculate number of major ticks based on MAX_TIME and MODULO
const NUMBERS = Array.from(
  { length: MAX_TIME / MODULO_FOR_TICKS },
  (_, i) => i * MODULO_FOR_TICKS
)
const TICKS = Array.from({ length: MAX_TIME }, (_, i) => i)

// Helper function to calculate angle from mouse position
const calculateAngle = (
  event: MouseEvent | TouchEvent,
  element: HTMLDivElement
) => {
  const rect = element.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  // Get clientX and clientY based on event type
  const clientX =
    'touches' in event
      ? event.touches[0].clientX
      : (event as MouseEvent).clientX
  const clientY =
    'touches' in event
      ? event.touches[0].clientY
      : (event as MouseEvent).clientY

  const deltaX = clientX - centerX
  const deltaY = clientY - centerY

  // Calculate angle in degrees (inverted)
  let angle = -Math.atan2(deltaY, deltaX) * (180 / Math.PI)

  // Adjust angle to start from top (-90 degrees offset) and ensure positive values
  angle = (angle - 90 + 360) % 360

  return angle
}

// Helper function to check vibration support
const canVibrate = () => {
  return typeof window !== 'undefined' && 'vibrate' in navigator
}

export const CircularTimer = () => {
  const [currentTime, setCurrentTime] = useState(10)
  const [isPaused, setIsPaused] = useState(true)
  const [isMinutes, setIsMinutes] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [showZeroIndicator, setShowZeroIndicator] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const previousTimeRef = useRef(currentTime)

  // Calculate the rotation to put current time at top
  const baseRotation = (currentTime / MAX_TIME) * 360

  // Calculate progress from current time to 0 (clockwise)
  const progressDegrees = (currentTime / MAX_TIME) * 360

  // Add useEffect for vibration
  useEffect(() => {
    // Only vibrate if the value has actually changed
    if (previousTimeRef.current !== currentTime && canVibrate()) {
      navigator.vibrate(10)
    }
    previousTimeRef.current = currentTime
  }, [currentTime])

  // Timer countdown effect
  useEffect(() => {
    if (!isPaused && currentTime > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev <= 0) {
            clearInterval(intervalRef.current!)
            setIsPaused(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPaused])

  // Add effect to handle zero indicator animation
  useEffect(() => {
    if (currentTime === 0) {
      // Small delay to let the play button animate out first
      const timer = setTimeout(() => setShowZeroIndicator(true), 150)
      return () => clearTimeout(timer)
    } else {
      setShowZeroIndicator(false)
    }
  }, [currentTime])

  const handlePlayPause = (event: React.MouseEvent | React.TouchEvent) => {
    // Prevent event from bubbling up to the drag handler
    event.stopPropagation()

    if (currentTime === 0) {
      // Reset to max time when starting from 0
      setCurrentTime(MAX_TIME)
    }
    setIsPaused(!isPaused)
  }

  const handleUnitClick = () => {
    if (currentTime > MAX_TIME) {
      setCurrentTime(MAX_TIME)
    }
    setIsMinutes(!isMinutes)
  }

  const handleDragStart = (event: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return
    setIsDragging(true)
    setIsPaused(true) // Pause timer while dragging

    // Prevent text selection and default touch behaviors
    event.preventDefault()
    if ('touches' in event) {
      document.body.style.overflow = 'hidden' // Prevent scrolling on mobile
      event.stopPropagation()
    }
  }

  const handleDrag = (event: MouseEvent | TouchEvent) => {
    if (!isDragging || !containerRef.current) return

    // Prevent default touch behavior
    if ('touches' in event) {
      event.preventDefault()
      event.stopPropagation()
    }

    const angle = calculateAngle(event, containerRef.current)
    const newTime = Math.round((angle / 360) * MAX_TIME)
    setCurrentTime(newTime)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
    document.body.style.overflow = '' // Restore scrolling
  }

  // Add and remove event listeners for drag
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => handleDrag(e)
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault() // Prevent scrolling while dragging
      handleDrag(e)
    }

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('touchmove', handleTouchMove, { passive: false })
      window.addEventListener('mouseup', handleDragEnd)
      window.addEventListener('touchend', handleDragEnd)
      window.addEventListener('touchcancel', handleDragEnd)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('mouseup', handleDragEnd)
      window.removeEventListener('touchend', handleDragEnd)
      window.removeEventListener('touchcancel', handleDragEnd)
      document.body.style.overflow = ''
    }
  }, [isDragging])

  return (
    <div className="bg-[#E2E7F0] dark:bg-[#1A1A1A] w-full min-h-full flex-1 flex items-center justify-center font-mono">
      <div className="flex flex-col items-center gap-24 py-12">
        <div className="flex flex-col items-center font-medium gap-2.5">
          <div className="flex flex-col items-center gap-3 text-6xl sm:text-7xl leading-none">
            <span>{currentTime}</span>
            <button
              onClick={handleUnitClick}
              className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              aria-label={`Switch to ${isMinutes ? 'seconds' : 'minutes'}`}
            >
              {isMinutes ? 'MIN' : 'SEC'}
            </button>
          </div>
          <span className="text-xs font-bold opacity-85">SETUP TIME</span>
        </div>

        <div className="flex flex-col items-center gap-2.5 touch-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="16"
            viewBox="0 0 32 16"
            fill="currentColor"
            className="absolute -translate-y-full -mt-1"
          >
            <path d="M2 2 L30 2 L16 14 Q16 14 15.9 14 L2 2 Q2 2 2.1 2" />
          </svg>
          {/* Circular Timer */}
          <div
            ref={containerRef}
            className="relative size-[300px] sm:size-[365px] cursor-grab active:cursor-grabbing overflow-hidden"
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
          >
            {/* Container for rotation */}
            <div
              className="absolute inset-0 origin-center"
              style={{
                transform: `rotate(${-baseRotation}deg)`,
              }}
            >
              {/* Progress Circle with Pointer */}
              <div className="absolute inset-0 z-0">
                <div
                  className="absolute inset-0 origin-center rounded-full"
                  style={{
                    background: `conic-gradient(#F23631 0deg ${progressDegrees}deg, transparent ${progressDegrees}deg 360deg)`,
                  }}
                />
                {/* Zero position indicator */}
                {currentTime === 0 && (
                  <>
                    {/* Center dot */}
                    <div
                      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-4 rounded-full bg-[#F23631] z-20 transition-transform duration-100 ${
                        showZeroIndicator ? 'scale-100' : 'scale-0'
                      }`}
                    />
                    {/* Line to top */}
                    <div
                      className={`absolute left-1/2 top-[15%] -translate-x-1/2 w-px h-[35%] bg-[#F23631] z-0 transition-transform duration-100 origin-bottom ${
                        showZeroIndicator ? 'scale-y-100' : 'scale-y-0'
                      }`}
                    />
                  </>
                )}
                {/* Center hole */}
                <div
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[80px] rounded-full bg-[#E2E7F0] dark:bg-[#1A1A1A] transition-all duration-300 z-10 ${
                    currentTime === 0
                      ? 'scale-0 opacity-0'
                      : 'scale-100 opacity-100'
                  }`}
                />
              </div>

              {/* SVG Container with proper scaling */}
              <div className="absolute inset-0">
                <svg
                  className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full z-10"
                  viewBox="0 0 400 400"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* Ticks */}
                  {TICKS.map((tick) => {
                    const angle = (tick * 360) / MAX_TIME - 90 // Adjust angle calculation based on MAX_TIME
                    const centerX = 200
                    const centerY = 200
                    const outerRadius = 160
                    const innerRadius =
                      tick % MODULO_FOR_TICKS === 0
                        ? outerRadius - 10
                        : outerRadius - 5

                    const x1 =
                      centerX + outerRadius * Math.cos((angle * Math.PI) / 180)
                    const y1 =
                      centerY + outerRadius * Math.sin((angle * Math.PI) / 180)
                    const x2 =
                      centerX + innerRadius * Math.cos((angle * Math.PI) / 180)
                    const y2 =
                      centerY + innerRadius * Math.sin((angle * Math.PI) / 180)

                    return (
                      <line
                        key={tick}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={
                          tick % MODULO_FOR_TICKS === 0
                            ? 'currentColor'
                            : '#9CA3AF'
                        }
                        strokeWidth={1}
                        opacity={tick % MODULO_FOR_TICKS === 0 ? '1' : '0.5'}
                        vectorEffect="non-scaling-stroke"
                      />
                    )
                  })}

                  {/* Numbers */}
                  {NUMBERS.map((number, index) => {
                    const angle =
                      (index * 360) / (MAX_TIME / MODULO_FOR_TICKS) - 90 // Adjust angle calculation
                    const radius = 175
                    const x = 200 + radius * Math.cos((angle * Math.PI) / 180)
                    const y = 200 + radius * Math.sin((angle * Math.PI) / 180)

                    return (
                      <text
                        key={number}
                        x={x}
                        y={y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-2xl font-medium font-urbanist fill-current"
                        transform={`rotate(${angle + 90}, ${x}, ${y})`}
                      >
                        {number}
                      </text>
                    )
                  })}
                </svg>
              </div>
            </div>

            {/* Center Button */}
            <button
              onClick={handlePlayPause}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 size-14 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center hover:bg-gray-800 dark:hover:bg-gray-200 transition-all z-30 ${
                currentTime === 0
                  ? 'scale-0 opacity-0'
                  : 'scale-100 opacity-100'
              }`}
              aria-label={isPaused ? 'Start timer' : 'Pause timer'}
            >
              {isPaused ? (
                <Play className="size-6" fill="currentColor" />
              ) : (
                <Pause className="size-6" fill="currentColor" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
