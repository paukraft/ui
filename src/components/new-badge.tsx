import { differenceInWeeks } from 'date-fns'
import { Badge } from './ui/badge'

export const NewBadge = ({ createdAt }: { createdAt?: string }) => {
  if (!createdAt) return null

  const isNew = differenceInWeeks(new Date(), new Date(createdAt)) <= 2
  if (!isNew) return null

  return <Badge className="px-1.5 py-0 text-[10px]">New</Badge>
}
