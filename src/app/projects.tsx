import AutoRedditShorts from '@/assets/autoredditshorts-webposter.png'
import BrandixAI from '@/assets/brandixai-webposter.png'
import Sharrings from '@/assets/sharrings-webposter.png'
import WebposterLab from '@/assets/webposterlab-webposter.png'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { ArrowRight, Github } from 'lucide-react'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'

interface Project {
  title: string
  url: string
  description: string
  year: string
  githubLink?: string
  image?: StaticImageData
}

const projects: Project[] = [
  {
    title: 'AutoRedditShorts',
    url: 'https://autoredditshorts.com',
    description:
      'An automation service for creating and posting TikTok videos using content from chosen subreddits. Users can select a subreddit, set a posting schedule, and generate video shorts based on popular posts, with various customization options.',
    year: '2024 (Available but still under active development)',
    image: AutoRedditShorts,
  },
  {
    title: 'Brandix AI',
    url: 'https://brandix.ai',
    description:
      'AI-Powered Brand Name Generator that assists users in creating brand names based on selected categories or input messages, while checking domain name availability and allowing users to save their favorite options.',
    year: '2023',
    image: BrandixAI,
  },
  {
    title: 'Webposter Lab',
    url: 'https://webposterlab.com',
    description:
      "An AI-powered service that automatically generates beautiful posters by analyzing website content. Simply input a URL and get a custom poster that captures your website's essence, perfect for marketing and social media.",
    year: '2024',
    githubLink: 'https://github.com/DerZerstampfer/webposter-lab',
    image: WebposterLab,
  },
  {
    title: 'Sharrings',
    url: 'https://sharrin.gs',
    description:
      'A service that consolidates all user links into a single manageable link, making it easier to share multiple social media and content links without clutter.',
    year: '2021',
    image: Sharrings,
  },
]

export default function Projects() {
  return (
    <section
      id="projects"
      className="w-full max-w-5xl mx-auto px-6 md:px-24 py-12 md:py-24 flex flex-col gap-12 md:gap-24"
    >
      <h2 className="text-4xl md:text-6xl font-black">Projects</h2>
      <div className="grid gap-12 md:gap-16">
        {projects.map((project) => (
          <HoverCard key={project.url.replace('https://', '')} openDelay={200}>
            <HoverCardTrigger asChild>
              <Link href={project.url} target="_blank" className="group">
                <article className="flex flex-col gap-4 hover:translate-x-1 transition-transform">
                  <div className="flex gap-2">
                    <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground w-fit">
                      {project.year}
                    </span>
                    {project.githubLink && (
                      <Link
                        href={project.githubLink}
                        target="_blank"
                        className="group/github rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground w-fit flex items-center gap-1"
                      >
                        <Github className="inline-block h-3 w-3 mr-0.5" />
                        <span className="max-sm:hidden">Open Source</span>
                        <span className="sm:hidden">OS</span>
                        <ArrowRight
                          className="sm:block size-3 -translate-x-1 transition-transform group-hover/github:translate-x-0"
                          strokeWidth={1.5}
                        />
                      </Link>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                    <h3 className="text-2xl md:text-3xl group-hover:italic">
                      {project.title}
                    </h3>
                    <span className="text-sm md:text-base text-muted-foreground">
                      {project.url.replace('https://', '')}
                    </span>
                    <ArrowRight
                      className="hidden sm:block w-5 h-5 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0"
                      strokeWidth={1.5}
                    />
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
                    {project.description}
                  </p>
                </article>
              </Link>
            </HoverCardTrigger>
            {project.image && (
              <HoverCardContent
                className="w-80 p-0"
                side="left"
                sideOffset={40}
              >
                <Image
                  src={project.image}
                  alt={`${project.title} preview`}
                  className="rounded-md object-cover"
                  priority
                />
              </HoverCardContent>
            )}
          </HoverCard>
        ))}
      </div>
    </section>
  )
}
