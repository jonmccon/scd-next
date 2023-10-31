import { Analytics } from '@vercel/analytics/react';
import './globals.css'
import { Inter } from 'next/font/google'

export const metadata = {
  metadataBase: new URL('https://seattlecreative.directory'),
  title: 'Seattle Creative Directory',
  description: 'A phonebook of studios in the Pacific Northwest',
  keywords: ['seattle', 'design', 'studio', 'agency', 'interview', 'aiga'],
  authors: [{ name: 'Jonny McConnell', url: 'https://jonmccon.com' }],
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}<Analytics /></body>
    </html>
  )
}
