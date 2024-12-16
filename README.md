# Paukraft UI

A collection of components meant to be an addon for shadcn/ui, providing additional nice-to-have components that complement the base library. Built with Next.js 15, React 19, and TypeScript, these components maintain shadcn/ui's design principles while expanding its functionality.

## 🚀 Features

- **Seamless shadcn/ui Integration**: Components designed to work perfectly with shadcn/ui
- **Consistent Design Language**: Follows shadcn/ui's clean and functional design principles
- **Built on Strong Foundations**:
  - Radix UI primitives for robust accessibility
  - Tailwind CSS for styling
  - TypeScript-first approach
  - Server Component friendly
- **Regular Updates**: Continuously evolving with new components
- **Individual Installation**: Components can be installed separately using the shadcn-ui CLI

## 🎯 Philosophy

These components closely follow shadcn/ui's design principles - clean, functional, and appearing as if they were part of the original library. This library continuously evolves as new components are added during development of ongoing projects.

## 🚦 Getting Started

### Installing components into your own project

Components can be installed individually using the shadcn-ui CLI, just like official shadcn/ui components. Visit [ui.paukraft.com/docs](https://ui.paukraft.com/docs) for component-specific installation instructions and live examples.

The documentation and component playground will be available at `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── app/           # Next.js App Router pages and documentation
└── components/    # Component library source code
    └── registry/  # Component collections
```

## 🔨 Component Development

### Component Structure

To add a new component:

1. Create a new folder in `src/components/registry/` with your component name:
```
src/components/registry/
└── your-component/
    ├── component.tsx        # Main component implementation
    └── demo.tsx (optional)  # Component demo and examples
```

2. Add `"use client"` directive to your component:
```typescript
"use client"

// Your component implementation
export const YourComponent = () => {
  // ...
}
```

> **Note**: The `"use client"` directive is required in `component.tsx` for the playground to work correctly. However, when installing the component via shadcn-ui CLI, this directive will be automatically removed if `clientComponent: false` is set in the registry.

3. Add your component to `src/components/registry/index.tsx`:
```typescript
export const registryComponents = [
  {
    name: 'Your Component',
    description: 'A brief description of your component',
    component: YourComponent,
    demo: YourComponentDemo,
    customProps: {
      // Document your component's props here
      propName: {
        description: 'Prop description',
        type: 'string',
        required: false,
        defaultValue: 'default',
      },
    },
    path: 'your-component',
    dependencies: ['required-packages'],
    collections: ['paukraftui'], // or any other collections
    clientComponent: false, // Controls whether "use client" is included when installed via CLI
  },
  // ... existing components ...
]
```

### Component Guidelines

1. Follow shadcn/ui design principles
2. Ensure full TypeScript support
3. Include proper prop documentation
4. Add a meaningful demo
5. List all required dependencies
6. Add `"use client"` directive to all `component.tsx` files
7. Set `clientComponent` correctly based on component requirements
8. Choose appropriate collection(s)

## Contributing

Contributions are welcome! Feel free to submit a Pull Request with new components or improvements that align with shadcn/ui's design principles.
