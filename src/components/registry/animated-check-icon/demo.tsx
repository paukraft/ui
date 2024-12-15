import { Button } from '@/components/ui/button'
import { AnimatedCheckIcon } from './component'

const AnimatedCheckIconDemo = () => {
  return (
    <Button
      variant="secondary"
      size="sm"
      // The group class is used to indicate where the hover listeners are attached
      // So in this case the animation is triggered when hovering over the button
      className="group flex items-center gap-2"
    >
      Done
      <AnimatedCheckIcon />
    </Button>
  )
}

export { AnimatedCheckIconDemo }
