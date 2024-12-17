import { differenceInWeeks } from 'date-fns'
import { Component } from './registry'
import { Badge } from './ui/badge'

export const NewComponentBadge = ({
  component: { createdAt },
}: {
  component: Component
}) => {
  if (!createdAt) return null

  const isNew = differenceInWeeks(new Date(), new Date(createdAt)) <= 2
  if (!isNew) return null

  return <Badge className="px-1.5 py-0 text-[10px]">New</Badge>
}
