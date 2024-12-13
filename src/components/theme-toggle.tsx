'use client'

import { cn } from '@/lib/utils'
import { LaptopMinimal, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  if (!theme) return null

  return (
    <div className="flex rounded-full border border-border text-muted-foreground">
      <button
        className={cn(
          'rounded-full p-1 border border-transparent',
          theme === 'system' && 'text-foreground border-border'
        )}
        onClick={() => setTheme('system')}
      >
        <LaptopMinimal className="size-3" />
      </button>
      <button
        className={cn(
          'rounded-full p-1 border border-transparent',
          theme === 'light' && 'text-foreground border-border'
        )}
        onClick={() => setTheme('light')}
      >
        <Sun className="size-3" />
      </button>
      <button
        className={cn(
          'rounded-full p-1 border border-transparent',
          theme === 'dark' && 'text-foreground border-border'
        )}
        onClick={() => setTheme('dark')}
      >
        <Moon className="size-3" />
      </button>
    </div>
  )
}
