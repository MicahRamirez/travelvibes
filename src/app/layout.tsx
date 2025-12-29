import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TravelVibes - Discover Your Next Adventure',
  description: 'Plan your perfect trip with TravelVibes. Discover amazing destinations, create itineraries, and share your travel experiences.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
