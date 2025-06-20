import { cn } from '@/lib/utils'

type InlineCodeProps = {
  children: React.ReactNode
  className?: string
}

export const InlineCode = ({ children, className }: InlineCodeProps) => {
  return (
    <code
      className={cn('text-sm bg-muted px-2 py-1 rounded font-mono', className)}
    >
      {children}
    </code>
  )
}
