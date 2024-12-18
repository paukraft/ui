import { AnimatedCheckIcon } from './animated-check-icon/component'
import { AnimatedCheckIconDemo } from './animated-check-icon/demo'
import { AnimatedCopyIcon } from './animated-copy-icon/component'
import { AnimatedCopyIconDemo } from './animated-copy-icon/demo'
import { BikePumpSlider } from './bike-pump-slider/component'
import BikePumpSliderDemo from './bike-pump-slider/demo'
import { CanvasSlider } from './canvas-slider/component'
import CanvasSliderDemo from './canvas-slider/demo'
import { ComparisonSlider } from './comparison-slider/component'
import ComparisonSliderDemo from './comparison-slider/demo'
import { CopyButton } from './copy-button/component'
import { CopyButtonDemo } from './copy-button/demo'
import { SeededAvatar } from './seeded-avatar/component'
import { SeededAvatarDemo } from './seeded-avatar/demo'
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
      'A collection of high-quality, reusable components built with Shadcn principles that I build for my own projects',
  },
  weirdui: {
    name: 'Weird UI',
    description: 'A collection of weird UI components',
  },
  animatedicons: {
    name: 'Animated Icons',
    description:
      'A collection of animated icons with smooth interactions. Based on icons from lucide.dev',
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
  registryDependencies?: string[] // prefix with pau- to point to components from paukraft/ui
  collections: (keyof typeof registryCollections)[]
  type?: 'slider' | 'animated-icon'
  clientComponent?: boolean // TODO: remove if we have a better solution!
  // This is a workaround because all component.tsx files need to be client components in order to work in custom-props-demo.tsx
  createdAt?: string
  updatedAt?: string
  links?: {
    label: string
    href: string
  }[]
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
    links: [
      {
        label: 'Original',
        href: 'https://ui.shadcn.com/docs/components/skeleton',
      },
    ],
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
  {
    name: 'Animated Copy Icon',
    description:
      'A copy icon that animates on hover with a smooth spring effect. Originally from icons.pqoqubbw.dev but with modified animation logic.',
    component: AnimatedCopyIcon,
    demo: AnimatedCopyIconDemo,
    customProps: {},
    path: 'animated-copy-icon',
    dependencies: ['motion'],
    collections: ['animatedicons'],
    type: 'animated-icon',
    clientComponent: true,
    links: [
      {
        label: 'Original',
        href: 'https://icons.pqoqubbw.dev/?q=copy',
      },
    ],
  },
  {
    name: 'Animated Check Icon',
    description:
      'A check icon that animates on hover with a smooth spring effect. Originally from icons.pqoqubbw.dev but with modified animation logic.',
    component: AnimatedCheckIcon,
    demo: AnimatedCheckIconDemo,
    customProps: {},
    path: 'animated-check-icon',
    dependencies: ['motion'],
    collections: ['animatedicons'],
    type: 'animated-icon',
    clientComponent: true,
    links: [
      {
        label: 'Original',
        href: 'https://icons.pqoqubbw.dev/?q=check',
      },
    ],
  },
  {
    name: 'Copy Button',
    description:
      'A button that copies text to clipboard with animated feedback using animated icons.',
    component: CopyButton,
    demo: CopyButtonDemo,
    customProps: {
      text: {
        description: 'The text to copy to clipboard.',
        type: 'string',
        required: true,
      },
      stopPropagation: {
        description:
          'Whether to stop event propagation when clicking the button.',
        type: 'boolean',
        required: false,
        defaultValue: false,
      },
      animationTime: {
        description:
          'Duration in milliseconds for how long the check icon is shown after copying.',
        type: 'number',
        required: false,
        defaultValue: 3000,
      },
    },
    path: 'copy-button',
    dependencies: [],
    registryDependencies: ['pau-animated-copy-icon', 'pau-animated-check-icon'],
    collections: ['paukraftui'],
    clientComponent: true,
  },
  {
    name: 'Seeded Avatar',
    description:
      'A customizable avatar component that generates consistent avatars based on a seed value, with built-in dark mode support. Originally from avvvatars.com.',
    component: SeededAvatar,
    demo: SeededAvatarDemo,
    customProps: {
      seed: {
        description: 'The seed value used to generate the avatar.',
        type: 'string',
        required: true,
      },
      variant: {
        description:
          'The variant of the avatar (shape, character, marble or user).',
        type: 'string',
        required: false,
        defaultValue: 'shape',
      },
      size: {
        description: 'The size of the avatar. (sm, default or lg)',
        type: 'string',
        required: false,
        defaultValue: 'default',
      },
      displayValue: {
        description:
          'Override the value displayed in the character variant. (still only the first two characters are shown, does not affect the seed)',
        type: 'string',
        required: false,
      },
    },
    path: 'seeded-avatar',
    dependencies: [],
    collections: ['paukraftui'],
    clientComponent: false,
    createdAt: '2024-12-17',
    links: [
      {
        label: 'Original',
        href: 'https://avvvatars.com/',
      },
    ],
  },
]

export type Component = (typeof registryComponents)[number]
