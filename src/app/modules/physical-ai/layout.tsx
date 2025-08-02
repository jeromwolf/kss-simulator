import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Physical AI & 실세계 지능 - KSS',
  description: '현실 세계와 상호작용하는 AI 시스템의 설계와 구현을 학습합니다.',
}

export default function PhysicalAILayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-gray-900 dark:via-gray-900 dark:to-slate-900">
      <div className="relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(51,65,85,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(71,85,105,0.15),transparent_50%)]" />
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  )
}