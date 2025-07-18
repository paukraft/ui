'use client'

import { CopyButton } from '@/components/registry/copy-button/component'
import { cn } from '@/lib/utils'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { Moon, Sun, ZoomIn, ZoomOut } from 'lucide-react'
import { useTheme } from 'next-themes'
import * as React from 'react'
import { useState } from 'react'

export const RadiusCalculator = ({
  ClapperComponent,
}: {
  ClapperComponent?: React.ReactNode
}) => {
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
        const newInnerFromPadding = outerRadius - value
        if (newInnerFromPadding >= minRadius) {
          setInnerRadius(newInnerFromPadding)
        }
        break
      case 'outer':
        // When outer radius changes, update inner radius if possible
        const safeOuterRadius = Math.max(value, minRadius)
        setOuterRadius(safeOuterRadius)
        const newInnerFromOuter = safeOuterRadius - padding
        if (newInnerFromOuter >= minRadius) {
          setInnerRadius(newInnerFromOuter)
        }
        break
      case 'inner':
        // When inner radius changes, update outer radius if possible
        const safeInnerRadius = Math.max(value, minRadius)
        setInnerRadius(safeInnerRadius)
        setOuterRadius(Math.max(safeInnerRadius + padding, minRadius))
        break
    }
  }

  return (
    <div className="bg-white dark:bg-[#121212] w-full min-h-full flex-1 flex font-sans">
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
                linear-gradient(to right, #F0F0F0 1px, transparent 0),
                linear-gradient(to bottom, #F0F0F0 1px, transparent 0)
              `,
            }}
          />

          {/* Outer Box */}
          <div
            className={cn(
              'border-4 border-gray-200 dark:border-[rgba(255,255,255,0.17)] w-8/12 max-w-[800px] min-[2000px]:max-w-[1000px] aspect-[342/215] relative min-h-[400px]'
            )}
            style={{
              borderRadius: `${outerRadius}px`,
              padding: `${padding}px`,
            }}
          >
            <div
              className="absolute top-0 left-0 border-t-4 border-l-4 border-purple-500 dark:border-[#C288F5] z-10 w-[25%] aspect-square -ml-1 -mt-1"
              style={{
                borderTopLeftRadius: `${outerRadius}px`,
                minWidth: `${outerRadius}px`,
              }}
            >
              <div
                className={cn(
                  'text-purple-500 dark:text-[#C288F5] leading-none transition-opacity duration-300',
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
              className="border-4 border-gray-200 dark:border-[rgba(255,255,255,0.17)] h-full w-1/2 relative"
              style={{
                borderRadius: `${innerRadius}px`,
                minWidth: `${innerRadius}px`,
              }}
            >
              <div
                className="absolute top-0 right-0 border-t-4 border-r-4 border-orange-500 dark:border-[#FFAF7C] z-10 w-[45%] aspect-square -mr-1 -mt-1 flex justify-end"
                style={{
                  borderTopRightRadius: `${innerRadius}px`,
                }}
              >
                <div
                  className={cn(
                    'text-orange-500 dark:text-[#FFAF7C] leading-none transition-opacity duration-300',
                    isZoomedIn ? 'opacity-100' : 'opacity-0'
                  )}
                  style={{
                    transform: `translate(${(20 + innerRadius / 5) * -1}px, ${
                      20 + innerRadius / 5
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
            <div className="w-full text-center text-amber-700 dark:text-[#FFAF7C]">
              {innerRadius}
            </div>
          </div>
          <div className="size-7 flex items-center justify-center">+</div>
          <div className="flex flex-col gap-1">
            <div className="bg-gray-100 dark:bg-[#3A3D3F] size-7 rounded-lg flex items-center justify-center">
              D
            </div>
            <div className="w-full text-center text-gray-700 dark:text-white">
              {padding}
            </div>
          </div>
          <div className="size-7 flex items-center justify-center">=</div>
          <div className="flex flex-col gap-1">
            <div className="bg-gray-100 dark:bg-[#3A3D3F] size-7 rounded-lg flex items-center justify-center">
              R2
            </div>
            <div className="w-full text-center text-purple-600 dark:text-[#C288F5]">
              {outerRadius}
            </div>
          </div>
        </div>

        {/* Toggles */}
        <div className="absolute bottom-6 left-6 flex gap-[22px] text-sm items-center">
          {ClapperComponent}
          <button onClick={() => setIsZoomedIn(!isZoomedIn)}>
            {isZoomedIn ? <ZoomOut size={17} /> : <ZoomIn size={17} />}
          </button>
          <button
            onClick={() =>
              setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
            }
          >
            {resolvedTheme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
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
      <div className="m-[26px] ml-0 bg-gray-100 dark:bg-[#222226] min-h-full w-full max-w-[360px] rounded-3xl flex flex-col gap-8 dark:text-[#E3E3E3]">
        <div className="flex p-6 flex-col gap-9 flex-1">
          <p className="text-2xl">Configure</p>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5 text-sm">
              <div className="flex justify-between">
                <p>Padding</p>
                <CustomInput
                  value={padding}
                  onChange={(value) =>
                    calculateValues(parseInt(value), 'padding')
                  }
                  className="-mt-1"
                />
              </div>
              <CustomSlider
                value={[padding]}
                onValueChange={(value) => calculateValues(value[0], 'padding')}
                min={3}
                max={100}
              />
            </div>
            <div className="flex flex-col gap-5 text-sm">
              <div className="flex justify-between">
                <p>Outer Radius</p>
                <CustomInput
                  value={outerRadius}
                  onChange={(value) =>
                    calculateValues(parseInt(value), 'outer')
                  }
                  className="-mt-1"
                />
              </div>
              <CustomSlider
                value={[outerRadius]}
                onValueChange={(value) => calculateValues(value[0], 'outer')}
                min={minRadius}
                max={150}
              />
            </div>
            <div className="flex flex-col gap-5 text-sm">
              <div className="flex justify-between">
                <p>Inner Radius</p>
                <CustomInput
                  value={innerRadius}
                  onChange={(value) =>
                    calculateValues(parseInt(value), 'inner')
                  }
                  className="-mt-1"
                />
              </div>
              <CustomSlider
                value={[innerRadius]}
                onValueChange={(value) => calculateValues(value[0], 'inner')}
                min={minRadius}
                max={150}
              />
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <p className="text-sm">min-radius</p>
                <p className="text-xs opacity-50">
                  Prevents radius from going below
                </p>
              </div>
              <CustomInput
                value={minRadius}
                onChange={(value) => {
                  const newMinRadius = parseInt(value)
                  setMinRadius(newMinRadius)
                  if (innerRadius < newMinRadius) {
                    calculateValues(newMinRadius, 'inner')
                  }
                  if (outerRadius < newMinRadius) {
                    calculateValues(newMinRadius, 'outer')
                  }
                }}
                className="-mt-1 h-min"
              />
            </div>
          </div>
        </div>

        <div className="w-full space-y-1 p-3">
          {/* header */}
          <div className="w-full py-[14px] pl-4 pr-[11px] flex justify-between items-center bg-gray-200 dark:bg-[#2D3032] rounded-t-2xl rounded-b-sm">
            <p className="leading-none">CSS</p>
            <CopyButton
              text={`.outer-box {
  border-radius: ${outerRadius}px;
}

.inner-box {
  border-radius: ${innerRadius}px;
}`}
              className="size-[19px]"
            />
          </div>

          {/* body */}
          <div className="w-full p-4 bg-gray-200 dark:bg-[#2D3032] rounded-b-2xl rounded-t-sm font-mono text-sm">
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
    <SliderPrimitive.Track className="relative h-[6px] w-full grow overflow-hidden rounded-full bg-gray-200 dark:bg-[#3A3A3A]"></SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-7 w-[3px] bg-primary rounded-full disabled:pointer-events-none disabled:opacity-50 cursor-grab active:cursor-grabbing" />
  </SliderPrimitive.Root>
))
CustomSlider.displayName = SliderPrimitive.Root.displayName

const TextLikeInput = React.forwardRef<
  HTMLInputElement,
  {
    value: number | string
    onChange: (value: string) => void
    className?: string
  }
>(({ value, onChange, className }, ref) => {
  return (
    <div className="relative">
      <p className="opacity-0 text-end">{value}</p>
      <input
        ref={ref}
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'absolute inset-0 bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-end w-full',
          className
        )}
      />
    </div>
  )
})
TextLikeInput.displayName = 'TextLikeInput'

const CustomInput = ({
  value,
  onChange,
  className,
  suffix = 'px',
}: {
  value: number | string
  onChange: (value: string) => void
  className?: string
  suffix?: string
}) => {
  return (
    <div
      className={cn(
        'flex items-center bg-white dark:bg-[#2E2E31] rounded-md px-2 py-1 text-sm',
        className
      )}
    >
      <TextLikeInput value={value} onChange={onChange} />
      <span>{suffix}</span>
    </div>
  )
}
