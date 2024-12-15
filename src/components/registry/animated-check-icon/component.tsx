'use client'

import { cn } from '@/lib/utils'
import { motion, useAnimation } from 'motion/react'
import { useEffect, useRef } from 'react'

const AnimatedCheckIcon = ({ className }: { className?: string }) => {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const parent = ref.current?.closest('.group')

    if (parent) {
      const handleMouseEnter = () => controls.start('animate')
      const handleMouseLeave = () => controls.start('normal')

      parent.addEventListener('mouseenter', handleMouseEnter)
      parent.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        parent.removeEventListener('mouseenter', handleMouseEnter)
        parent.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [controls])

  return (
    <div ref={ref} className={cn('size-4', className)}>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        transition={{ type: 'spring', stiffness: 250, damping: 25 }}
        variants={{
          normal: {
            scale: 1,
          },
          animate: {
            scale: 0.9,
          },
        }}
        animate={controls}
      >
        <motion.path
          d="M4 12 9 17L20 6"
          variants={{
            normal: {
              pathLength: 1,
            },
            animate: {
              pathLength: [0, 1],
            },
          }}
        />
      </motion.svg>
    </div>
  )
}

export { AnimatedCheckIcon }
