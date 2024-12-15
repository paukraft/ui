import { Button } from '@/components/ui/button'
import { AnimatedCopyIcon } from './component'

const AnimatedCopyIconDemo = () => {
  return (
    <Button
      variant="secondary"
      size="sm"
      // The group class is used to indicate where the hover listeners are attached
      // So in this case the animation is triggered when hovering over the button
      className="group flex items-center gap-2"
    >
      Copy
      <AnimatedCopyIcon />
    </Button>
  )
}

export { AnimatedCopyIconDemo }
