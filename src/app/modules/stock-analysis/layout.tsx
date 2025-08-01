// import { Toaster } from 'react-hot-toast' // Will be added when needed

export default function StockAnalysisLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
      
      {/* Toast notifications will be added when needed */}
    </div>
  )
}