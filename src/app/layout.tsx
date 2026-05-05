import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Inexora — Le réseau qui pense',
  description: 'Inexora est le réseau social nouvelle génération pour les créateurs, penseurs et innovateurs du futur.',
  keywords: ['réseau social', 'futuriste', 'créateurs', 'innovation'],
  openGraph: {
    title: 'Inexora',
    description: 'Le réseau qui pense.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="dark">
      <body className="bg-void text-text-primary font-body antialiased">
        {children}
      </body>
    </html>
  )
}
