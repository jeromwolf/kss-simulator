import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import DarkModeToggle from '@/components/DarkModeToggle'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'KSS - Knowledge Space Simulator',
  description: '복잡한 기술 개념을 시뮬레이션하며 체험하는 차세대 학습 플랫폼',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={inter.variable}>
      <body className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <Navigation />
        <div className="pt-16">
          {children}
        </div>
        <DarkModeToggle />
      </body>
    </html>
  )
}