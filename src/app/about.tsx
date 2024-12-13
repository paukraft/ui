import { FC } from 'react'

const About: FC = () => {
  return (
    <section
      id="about"
      className="w-full max-w-5xl mx-auto px-6 md:px-24 flex flex-col gap-12 md:gap-24 mb-24 md:mb-72"
    >
      <h2 className="text-4xl md:text-6xl font-black">About</h2>
      <div className="grid gap-6 md:gap-8 text-lg md:text-xl text-muted-foreground">
        <p>
          I&apos;m a fullstack web developer based in Germany. My expertise lies
          deep within the Next.js ecosystem, where I build digital experiences
          that bridge functionality and user experience.
        </p>
        <p>
          While I primarily identify as a developer, I&apos;ve cultivated an eye
          for UI design—creating interfaces that are both functional and
          aesthetically pleasing. Though I wouldn&apos;t call myself a designer,
          I understand the principles that make digital products feel right.
        </p>
        <p>
          My curiosity extends beyond code. I&apos;m fascinated by everything
          tech and science, always eager to explore new technologies and
          understand how things work at their core.
        </p>
      </div>
    </section>
  )
}

export default About
