import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Party Planner',
  description: 'Plan the perfect home party with AI specialists for food, themes, and activities. Perfect for July 4th celebrations!',
  keywords: ['party planning', 'AI', 'home parties', 'July 4th', 'food planning', 'party themes', 'activities']
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
