import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { ThemeProvider } from '@/components/theme-provider'
import { TrackiTrack } from '@/components/tracki-track'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'
import './globals.css'

const urbanist = Urbanist({
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--urbanist',
})

export const metadata: Metadata = {
  title: {
    default: 'paukraft/ui',
    template: '%s - paukraft/ui',
  },
  description: 'A collection of weird UI components',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn('antialiased font-urbanist', urbanist.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-[100dvh] relative flex flex-col">
            <Navbar />
            {children}
            <Footer />
            <TrackiTrack />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
