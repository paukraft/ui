'use client'

import { cn } from '@/lib/utils'
import { motion, useAnimation } from 'motion/react'
import { useEffect, useRef } from 'react'

const AnimatedCopyIcon = ({ className }: { className?: string }) => {
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
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        transition={{ type: 'spring', stiffness: 250, damping: 25 }}
      >
        <motion.rect
          width="14"
          height="14"
          x="8"
          y="8"
          rx="2"
          ry="2"
          variants={{
            normal: { translateY: 0, translateX: 0 },
            animate: { translateY: -3, translateX: -3 },
          }}
          animate={controls}
        />
        <motion.path
          d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
          variants={{
            normal: { x: 0, y: 0 },
            animate: { x: 3, y: 3 },
          }}
          animate={controls}
        />
      </motion.svg>
    </div>
  )
}

export { AnimatedCopyIcon }
