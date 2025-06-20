'use client'

import { Expander } from './component'

const ExpanderDemo = () => {
  // Sample images - using unique placeholder images for demo
  const images = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      alt: 'Mountain landscape',
      title: 'Mountain Peak',
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
      alt: 'Forest path',
      title: 'Forest Trail',
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=300&fit=crop',
      alt: 'Ocean waves',
      title: 'Ocean View',
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=300&fit=crop',
      alt: 'Desert sunset',
      title: 'Desert Sunset',
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
      alt: 'City skyline',
      title: 'City Lights',
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1551582045-6ec9c11d8697?w=400&h=300&fit=crop',
      alt: 'Snowy mountains',
      title: 'Winter Peaks',
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop',
      alt: 'Tropical beach',
      title: 'Paradise Beach',
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&h=300&fit=crop',
      alt: 'Northern lights',
      title: 'Aurora Borealis',
    },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Photo Gallery</h3>
        <p className="text-sm text-muted-foreground">
          A collection of stunning landscape photography from around the world.
        </p>
      </div>

      <Expander maxHeight={400} className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-lg bg-muted aspect-[4/3]"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="font-medium text-sm">{image.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </Expander>
    </div>
  )
}

export default ExpanderDemo
