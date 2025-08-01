'use client'

import Link from 'next/link'
import { CheckCircle2, Menu, X } from 'lucide-react'

interface Chapter {
  id: string
  title: string
}

interface ChapterSidebarProps {
  chapters: Chapter[]
  currentChapterId: string
  completedChapters: string[]
  isOpen: boolean
  onToggle: () => void
}

export default function ChapterSidebar({
  chapters,
  currentChapterId,
  completedChapters,
  isOpen,
  onToggle
}: ChapterSidebarProps) {
  // Part 구분
  const getPartTitle = (index: number): string | null => {
    const partTitles: { [key: number]: string } = {
      1: 'Part 1. 온톨로지의 이해',
      4: 'Part 2. 온톨로지 기술 표준',
      8: 'Part 3. 온톨로지 설계와 구축',
      11: 'Part 4. 실전 프로젝트',
      14: 'Part 5. 온톨로지의 미래'
    }
    return partTitles[index] || null
  }
  
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`${
        isOpen ? 'w-80' : 'w-0'
      } transition-all duration-300 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-r border-indigo-200/30 dark:border-indigo-700/30 overflow-hidden shadow-xl
      fixed md:relative inset-y-0 left-0 z-40 md:z-auto`}>
        <div className="p-6 h-full overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              온톨로지 시뮬레이터
            </h2>
            <button
              onClick={onToggle}
              className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>
          
          <nav className="space-y-1">
            {chapters.map((chapter, index) => {
              const partTitle = getPartTitle(index)
              const isCompleted = completedChapters.includes(chapter.id)
              const isCurrent = chapter.id === currentChapterId
              
              return (
                <div key={chapter.id}>
                  {partTitle && (
                    <div className="text-xs font-medium text-indigo-500 dark:text-indigo-400 uppercase tracking-wide mt-4 mb-2 px-2 py-1">
                      {partTitle}
                    </div>
                  )}
                  <Link
                    href={`/modules/ontology/${chapter.id}`}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 ${
                      isCurrent
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-[1.02]'
                        : 'hover:bg-indigo-50/80 dark:hover:bg-indigo-900/20 hover:translate-x-1'
                    }`}
                  >
                    <span className={`text-sm font-bold rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0 ${
                      isCurrent
                        ? 'bg-white/20 text-white'
                        : isCompleted
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}>
                      {isCompleted ? <CheckCircle2 size={16} /> : chapter.id === 'intro' ? '시작' : index}
                    </span>
                    <span className={`text-sm font-medium ${
                      isCurrent ? 'text-white' : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {chapter.title}
                    </span>
                  </Link>
                </div>
              )
            })}
          </nav>
        </div>
      </aside>
      
      {/* Toggle button for desktop */}
      <button
        onClick={onToggle}
        className={`hidden md:block fixed left-4 top-4 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all ${
          isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <Menu size={20} />
      </button>
    </>
  )
}