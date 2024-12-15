import { BikePumpSlider } from './bike-pump-slider/component'
import BikePumpSliderDemo from './bike-pump-slider/demo'
import { CanvasSlider } from './canvas-slider/component'
import CanvasSliderDemo from './canvas-slider/demo'
import { ComparisonSlider } from './comparison-slider/component'
import ComparisonSliderDemo from './comparison-slider/demo'
import { Skeleton } from './skeleton-plus/component'
import SkeletonPlusDemo from './skeleton-plus/demo'
import { SlingshotSlider } from './slingshot-slider/component'
import SlingshotSliderDemo from './slingshot-slider/demo'
import { TallSlider } from './tall-slider/component'
import TallSliderDemo from './tall-slider/demo'

export const registryCollections = {
  paukraftui: {
    name: 'paukraft UI',
    description:
      'A collection of high-quality, reusable components built with Shadcn principles while working on various projects',
  },
  weirdui: {
    name: 'Weird UI',
    description: 'A collection of weird UI components',
  },
} as const

export const registryComponents: {
  name: string
  description: string
  component: React.ComponentType<any>
  demo?: React.ComponentType<any>
  customProps: Record<string, any>
  path: string
  dependencies: string[]
  collections: (keyof typeof registryCollections)[]
  type?: 'slider'
  clientComponent?: boolean // TODO: remove if we have a better solution!
  // This is a workaround because all component.tsx files need to be client components in order to work in custom-props-demo.tsx
}[] = [
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
        defaultValue: 1,
      },
    },
    path: 'bike-pump-slider',
    dependencies: ['motion', '@radix-ui/react-slider'],
    collections: ['weirdui'],
    type: 'slider',
    clientComponent: true,
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
    type: 'slider',
    clientComponent: true,
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
    type: 'slider',
    clientComponent: true,
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
    type: 'slider',
    clientComponent: false,
  },
  {
    name: 'Skeleton Plus',
    description:
      'Improved shadcn/ui skeleton with added text-based sizing support (text-sm, text-lg etc)',
    component: Skeleton,
    demo: SkeletonPlusDemo,
    customProps: {
      variant: {
        description: 'The variant of the skeleton. dark | bright',
        type: 'string',
        required: false,
        defaultValue: 'dark',
      },
    },
    path: 'skeleton-plus',
    dependencies: [],
    collections: ['paukraftui'],
    clientComponent: false,
  },
  {
    name: 'Comparison Slider',
    description:
      'A slider component that allows comparison between two elements with a draggable divider.',
    component: ComparisonSlider,
    demo: ComparisonSliderDemo,
    customProps: {
      firstComponent: {
        description: 'The component to show on the left side',
        type: 'React.ReactNode',
        required: true,
      },
      secondComponent: {
        description: 'The component to show on the right side',
        type: 'React.ReactNode',
        required: true,
      },
      autoHideSlider: {
        description:
          'Whether the slider line should disappear when not interacting',
        type: 'boolean',
        required: false,
        defaultValue: false,
      },
      defaultPosition: {
        description: 'The default position of the slider in % from 0 to 100',
        type: 'number',
        required: false,
        defaultValue: 50,
      },
    },
    path: 'comparison-slider',
    dependencies: [],
    collections: ['paukraftui'],
    clientComponent: true,
  },
]
