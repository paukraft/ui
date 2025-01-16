import { cn } from '@/lib/utils'
import { differenceInDays } from 'date-fns'
import { Badge } from './ui/badge'

export const NewBadge = ({
  createdAt,
  className,
}: {
  createdAt?: string
  className?: string
}) => {
  if (!createdAt) return null

  const difference = differenceInDays(new Date(), new Date(createdAt))
  const isNew = difference <= 14
  if (!isNew) return null

  return <Badge className={cn('px-1.5 py-0 text-[10px]', className)}>New</Badge>
}
