import { Hero } from './hero'
import { InteractiveTools } from './interactive-tools'

export default function Home() {
  return (
    <main className="relative min-h-[85dvh] p-6 md:p-12 flex flex-col items-center overflow-hidden">
      {/* Background Grid - similar to radius calculator */}
      <div
        className="absolute inset-0 w-full h-full opacity-[0.03] dark:opacity-[0.07]"
        style={{
          backgroundSize: '40px 40px',
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 0),
            linear-gradient(to bottom, currentColor 1px, transparent 0)
          `,
        }}
      />

      <div className="relative flex flex-col items-center gap-16 w-full">
        <div className="max-w-4xl w-full mx-auto">
          <Hero />
        </div>
        <div className="max-w-5xl w-full mx-auto">
          <InteractiveTools />
        </div>
      </div>
    </main>
  )
}
