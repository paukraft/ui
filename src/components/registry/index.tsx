import { BikePumpSlider } from './bike-pump-slider/component'
import BikePumpSliderDemo from './bike-pump-slider/demo'
import { CanvasSlider } from './canvas-slider/component'
import CanvasSliderDemo from './canvas-slider/demo'
import { SlingshotSlider } from './slingshot-slider/component'
import SlingshotSliderDemo from './slingshot-slider/demo'
import { TallSlider } from './tall-slider/component'
import TallSliderDemo from './tall-slider/demo'

export const registryCollections = {
  weirdui: {
    name: 'Weird UI',
    description: 'A collection of weird UI components',
  },
} as const

export const registryComponents = [
  {
    name: 'Bike Pump Slider',
    description: 'A slider that behaves like a bike pump.',
    component: BikePumpSlider,
    demo: BikePumpSliderDemo,
    customProps: {
      pumpSpeed: {
        description: 'The speed at which the pump inflates.',
        type: 'number',
        required: false,
        defaultValue: 10,
      },
      leakSpeed: {
        description: 'The speed at which the pump leaks.',
        type: 'number',
        required: false,
        defaultValue: 10,
      },
    },
    path: 'bike-pump-slider',
    dependencies: ['motion', '@radix-ui/react-slider'],
    collections: ['weirdui'],
  },
  {
    name: 'Canvas Slider',
    description: 'A slider that fills with dots as you draw on it.',
    component: CanvasSlider,
    demo: CanvasSliderDemo,
    customProps: {
      pointSize: {
        description: 'The size of the dots.',
        type: 'number',
        required: false,
        defaultValue: 2,
      },
    },
    path: 'canvas-slider',
    dependencies: ['@radix-ui/react-slider'],
    collections: ['weirdui'],
  },
  {
    name: 'Slingshot Slider',
    description: 'Pull back and release to set the value.',
    component: SlingshotSlider,
    demo: SlingshotSliderDemo,
    customProps: {
      icon: {
        description: 'The lucide icon to use for the slingshot.',
        type: 'LucideIcon',
        required: false,
        defaultValue: 'Volume2',
      },
      maxAngle: {
        description: 'The maximum angle the slingshot can be pulled back.',
        type: 'number',
        required: false,
        defaultValue: 35,
      },
      fullPowerTime: {
        description: 'The time it takes to reach full power in milliseconds.',
        type: 'number',
        required: false,
        defaultValue: 1000,
      },
      flyTime: {
        description:
          'The time it takes for the dot to fly from the icon to the destination point on the slider in milliseconds.',
        type: 'number',
        required: false,
        defaultValue: 400,
      },
    },
    path: 'slingshot-slider',
    dependencies: ['motion', '@radix-ui/react-slider', 'lucide-react'],
    collections: ['weirdui'],
  },
  {
    name: 'Tall Slider',
    description: 'A vertical slider component.',
    component: TallSlider,
    demo: TallSliderDemo,
    customProps: {},
    path: 'tall-slider',
    dependencies: ['@radix-ui/react-slider'],
    collections: ['weirdui'],
  },
] satisfies {
  name: string
  description: string
  component: React.ComponentType<any>
  demo?: React.ComponentType<any>
  customProps: Record<string, any>
  path: string
  dependencies: string[]
  collections: (keyof typeof registryCollections)[]
}[]
