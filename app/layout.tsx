import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import CustomCursor from '../components/custom-cursor'
import { PremiumBackground } from '../components/premium-background'
import ScrollProgress from '../components/scroll-progress'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
})

export const metadata: Metadata = {
  title: 'Ruma Enterprises | Smart Distribution Solutions',
  description:
    'Ruma Enterprises helps brands scale through smart distribution, wholesale sourcing, marketplace execution, and fulfillment coordination.',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark scroll-smooth bg-background">
      <body className={`${inter.variable} ${jetbrainsMono.variable} relative min-h-screen`}>
        <CustomCursor />
        <ScrollProgress />
        <PremiumBackground />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
