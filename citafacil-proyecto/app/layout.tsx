import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CitaFácil · Agenda médica',
  description: 'Agenda tus citas médicas de forma fácil, rápida y segura.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/medico.jpg',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/medico.jpg',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/medico.jpg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <meta name="darkreader-lock" />
      </head>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
