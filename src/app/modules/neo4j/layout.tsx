import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import { neo4jModule } from './metadata'

export const metadata: Metadata = {
  title: `${neo4jModule.nameKo} - KSS`,
  description: neo4jModule.description,
}

export default function Neo4jLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </main>
    </>
  )
}