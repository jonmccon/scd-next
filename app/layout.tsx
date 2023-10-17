import { Analytics } from '@vercel/analytics/react';
import './globals.css'
import { Inter } from 'next/font/google'

export const metadata = {
  title: 'Seattle Creative Directory',
  description:
    'A phonebook of studios for the Pacific Northwest',
}

// const inter = Inter({
//   variable: '--font-inter',
//   subsets: ['latin'],
//   display: 'swap',
// })

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
