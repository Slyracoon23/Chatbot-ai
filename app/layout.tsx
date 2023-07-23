import '@/app/globals.css'

import { Metadata } from 'next'
import { fontMono, fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { Providers } from '@/components/providers'
import { Header } from '@/components/header'
import { Neo4jContextProvider } from '@/components/neo4j-provider'

export const metadata: Metadata = {
  title: {
    default: 'GraphID',
    template: `%s - GraphID`
  },
  description: 'A Self-Sovereign Knowledge Graph',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  },
  metadataBase: new URL('https://graphid.vercel.app/'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE'
    }
  }
  // openGraph: {
  //   images: '/og-image.png'
  // }
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html className="dark" lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'font-sans antialiased',
          fontSans.variable,
          fontMono.variable
        )}
      >
        {/* <Toaster /> */}
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <Neo4jContextProvider>
            <div className="flex min-h-screen flex-col">
              {/* @ts-ignore */}
              <Header />
              <main className="flex flex-1 flex-col bg-muted/50">
                {children}
              </main>
            </div>
            <TailwindIndicator />
          </Neo4jContextProvider>
        </Providers>
      </body>
    </html>
  )
}
