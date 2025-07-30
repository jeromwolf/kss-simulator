'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { ChevronLeft, Brain, Clock, Star } from 'lucide-react'
import { llmModule } from './metadata'
import './styles/chapter.css'

interface LLMLayoutProps {
  children: ReactNode
}

export default function LLMLayout({ children }: LLMLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900/20">
      {/* Header */}
      <header className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-b border-indigo-200/30 dark:border-indigo-700/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link 
                href="/"
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <ChevronLeft size={20} />
                <span>홈으로</span>
              </Link>
              
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl">
                  {llmModule.icon}
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    {llmModule.nameKo}
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {llmModule.description}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>{llmModule.estimatedHours}시간</span>
              </div>
              <div className="flex items-center gap-1">
                <Star size={16} />
                <span className="capitalize">{llmModule.difficulty}</span>
              </div>
              <div className="flex items-center gap-1">
                <Brain size={16} />
                <span>{llmModule.chapters.length}개 챕터</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}