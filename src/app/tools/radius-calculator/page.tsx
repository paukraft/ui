'use client'

import { CopyButton } from '@/components/registry/copy-button/component'
import { cn } from '@/lib/utils'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { Moon, Sun, ZoomIn, ZoomOut } from 'lucide-react'
import { useTheme } from 'next-themes'
import * as React from 'react'
import { useState } from 'react'

export default function RadiusCalculator() {
  const { setTheme, resolvedTheme } = useTheme()

  const [padding, setPadding] = useState(36)
  const [outerRadius, setOuterRadius] = useState(63)
  const [innerRadius, setInnerRadius] = useState(27)
  const [minRadius, setMinRadius] = useState(16)

  const [isZoomedIn, setIsZoomedIn] = useState(false)

  const calculateValues = (
    value: number,
    type: 'padding' | 'outer' | 'inner'
  ) => {
    switch (type) {
      case 'padding':
        // When padding changes, update inner radius based on outer radius
        setPadding(value)
        setInnerRadius(Math.max(minRadius, outerRadius - value))
        break
      case 'outer':
        // When outer radius changes, update inner radius
        setOuterRadius(Math.max(value, padding + minRadius))
        setInnerRadius(Math.max(minRadius, value - padding))
        break
      case 'inner':
        // When inner radius changes, update outer radius
        const newInnerRadius = Math.max(minRadius, value)
        setInnerRadius(newInnerRadius)
        setOuterRadius(newInnerRadius + padding)
        break
    }
  }

  return (
    <div className="bg-white dark:bg-[#121212] w-full min-h-full flex-1 flex">
      <div className="flex-1 relative overflow-hidden">
        {/* Preview */}
        <div
          className={cn(
            'size-full flex items-center justify-center pointer-events-none transition-transform duration-300 ease-in-out relative',
            isZoomedIn && 'scale-[240%] translate-x-[40%] translate-y-1/2'
          )}
        >
          {/* Grid */}
          <div
            className={cn(
              'absolute inset-0 w-full h-full',
              isZoomedIn ? 'opacity-100' : 'opacity-0'
            )}
            style={{
              backgroundSize: '40px 40px',
              backgroundImage:
                resolvedTheme === 'dark'
                  ? `
                linear-gradient(to right, #1C1C1C 1px, transparent 0),
                linear-gradient(to bottom, #1C1C1C 1px, transparent 0)
              `
                  : `
                linear-gradient(to right, #F5F5F5 1px, transparent 0),
                linear-gradient(to bottom, #F5F5F5 1px, transparent 0)
              `,
            }}
          />

          {/* Outer Box */}
          <div
            className="border-4 border-gray-300 dark:border-[#444] w-8/12 h-3/5 relative"
            style={{
              borderRadius: `${outerRadius}px`,
              padding: `${padding}px`,
            }}
          >
            <div
              className="absolute top-0 left-0 border-t-4 border-l-4 border-purple-500 dark:border-[#C895F8] z-10 w-[25%] aspect-square -ml-1 -mt-1"
              style={{
                borderTopLeftRadius: `${outerRadius}px`,
              }}
            >
              <div
                className={cn(
                  'text-purple-500 dark:text-[#C895F8] leading-none transition-opacity duration-300',
                  isZoomedIn ? 'opacity-100' : 'opacity-0'
                )}
                style={{
                  transform: `translate(${-20 + outerRadius / 5}px, ${
                    -20 + outerRadius / 5
                  }px)`,
                }}
              >
                {outerRadius}
              </div>
            </div>

            {/* Inner Box */}
            <div
              className="border-4 border-gray-300 dark:border-[#444] h-full w-1/2 relative"
              style={{
                borderRadius: `${innerRadius}px`,
              }}
            >
              <div
                className="absolute top-0 right-0 border-t-4 border-r-4 border-orange-500 dark:border-[#FCBB95] z-10 w-[45%] aspect-square -mr-1 -mt-1 flex justify-end"
                style={{
                  borderTopRightRadius: `${innerRadius}px`,
                }}
              >
                <div
                  className={cn(
                    'text-orange-500 dark:text-[#FCBB95] leading-none transition-opacity duration-300',
                    isZoomedIn ? 'opacity-100' : 'opacity-0'
                  )}
                  style={{
                    transform: `translate(${(-20 + innerRadius / 5) * -1}px, ${
                      -20 + innerRadius / 5
                    }px)`,
                  }}
                >
                  {innerRadius}
                </div>
              </div>
            </div>
            <div
              className={cn(
                'absolute left-1/4 -translate-y-full transition-opacity duration-300',
                isZoomedIn ? 'opacity-100' : 'opacity-0'
              )}
              style={{
                top: `${padding / 1.5}px`,
              }}
            >
              {padding}
            </div>
          </div>
        </div>

        {/* Cluster */}
        <div className="absolute top-6 left-6 flex gap-1 text-sm">
          <div className="flex flex-col gap-1">
            <div className="bg-gray-100 dark:bg-[#3A3D3F] size-7 rounded-lg flex items-center justify-center">
              R1
            </div>
            <div className="w-full text-center text-amber-700 dark:text-[#906A53]">
              {innerRadius}
            </div>
          </div>
          <div className="size-7 flex items-center justify-center">+</div>
          <div className="flex flex-col gap-1">
            <div className="bg-gray-100 dark:bg-[#3A3D3F] size-7 rounded-lg flex items-center justify-center">
              D
            </div>
            <div className="w-full text-center text-gray-700 dark:text-[#D2D2D2]">
              {padding}
            </div>
          </div>
          <div className="size-7 flex items-center justify-center">=</div>
          <div className="flex flex-col gap-1">
            <div className="bg-gray-100 dark:bg-[#3A3D3F] size-7 rounded-lg flex items-center justify-center">
              R2
            </div>
            <div className="w-full text-center text-purple-600 dark:text-[#A188C2]">
              {outerRadius}
            </div>
          </div>
        </div>

        {/* Toggles */}
        <div className="absolute bottom-6 left-6 flex gap-4 text-sm">
          <button onClick={() => setIsZoomedIn(!isZoomedIn)}>
            {isZoomedIn ? <ZoomOut size={16} /> : <ZoomIn size={16} />}
          </button>
          <button
            onClick={() =>
              setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
            }
          >
            {resolvedTheme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <a
            href="https://x.com/drudiedo/status/1878790137997627661"
            target="_blank"
            className="text-xs text-gray-500 dark:text-gray-400 hover:underline"
          >
            original from @drudiedo
          </a>
        </div>
      </div>

      {/* Sheet */}
      <div className="p-3 m-6 ml-0 bg-gray-100 dark:bg-[#222226] min-h-full w-full max-w-sm rounded-3xl flex flex-col gap-8">
        <div className="flex p-2 flex-col gap-6 flex-1">
          <p className="text-2xl">Configure</p>

          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-8 text-sm">
              <div className="flex justify-between">
                <p>Padding</p>
                <p>{padding}px</p>
              </div>
              <CustomSlider
                value={[padding]}
                onValueChange={(value) => calculateValues(value[0], 'padding')}
                min={3}
                max={100}
              />
            </div>
            <div className="flex flex-col gap-8 text-sm">
              <div className="flex justify-between">
                <p>Outer Radius</p>
                <p>{outerRadius}px</p>
              </div>
              <CustomSlider
                value={[outerRadius]}
                onValueChange={(value) => calculateValues(value[0], 'outer')}
                min={minRadius}
                max={150}
              />
            </div>
            <div className="flex flex-col gap-8 text-sm">
              <div className="flex justify-between">
                <p>Inner Radius</p>
                <p>{innerRadius}px</p>
              </div>
              <CustomSlider
                value={[innerRadius]}
                onValueChange={(value) => calculateValues(value[0], 'inner')}
                min={minRadius}
                max={150}
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2">
                <p className="text-sm">min-radius</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Prevents radius from going below
                </p>
              </div>
              <div className="flex items-center bg-white dark:bg-[#2E2E31] rounded-md px-2 py-1">
                <div className="relative">
                  <p className="opacity-0 text-end">{minRadius}</p>
                  <input
                    type="number"
                    value={minRadius}
                    onChange={(e) => {
                      const newMinRadius = parseInt(e.target.value)
                      setMinRadius(newMinRadius)
                      if (innerRadius < newMinRadius) {
                        calculateValues(newMinRadius, 'inner')
                      }
                      if (outerRadius < newMinRadius) {
                        calculateValues(newMinRadius, 'outer')
                      }
                    }}
                    className="absolute inset-0 bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-end w-full"
                  />
                </div>
                <span>px</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full space-y-1">
          {/* header */}
          <div className="w-full p-3 flex justify-between items-center bg-gray-200 dark:bg-[#2D3032] rounded-t-[13px] rounded-b-sm">
            <p>CSS</p>
            <CopyButton
              text={`.outer-box {
  border-radius: ${outerRadius}px;
}

.inner-box {
  border-radius: ${innerRadius}px;
}`}
              className="size-4"
            />
          </div>

          {/* body */}
          <div className="w-full p-3.5 bg-gray-200 dark:bg-[#2D3032] rounded-b-[13px] rounded-t-sm font-mono text-sm">
            <div className="space-y-4">
              <div>
                <span className="text-purple-600 dark:text-purple-400">
                  .outer-box
                </span>{' '}
                {'{'}
                <div className="pl-4">
                  <span>border-radius: </span>
                  <span className="text-orange-600 dark:text-orange-400">
                    {outerRadius}px
                  </span>
                  <span>;</span>
                </div>
                {'}'}
              </div>

              <div>
                <span className="text-purple-600 dark:text-purple-400">
                  .inner-box
                </span>{' '}
                {'{'}
                <div className="pl-4">
                  <span>border-radius: </span>
                  <span className="text-orange-600 dark:text-orange-400">
                    {innerRadius}px
                  </span>
                  <span>;</span>
                </div>
                {'}'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const CustomSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex w-full touch-none select-none items-center',
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary"></SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-8 w-1 bg-primary rounded-full disabled:pointer-events-none disabled:opacity-50 cursor-pointer" />
  </SliderPrimitive.Root>
))
CustomSlider.displayName = SliderPrimitive.Root.displayName
