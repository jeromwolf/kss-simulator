'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Home, BookOpen, Clock, Target, Menu } from 'lucide-react'
import { ontologyModule } from '../metadata'
import ChapterContent from '../components/ChapterContent'
import ChapterSidebar from '../components/ChapterSidebar'

export default function ChapterPage() {
  const router = useRouter()
  const params = useParams()
  const chapterId = params.chapterId as string
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [completedChapters, setCompletedChapters] = useState<string[]>([])
  
  const currentChapterIndex = ontologyModule.chapters.findIndex(ch => ch.id === chapterId)
  const currentChapter = ontologyModule.chapters[currentChapterIndex]
  
  if (!currentChapter) {
    router.push('/modules/ontology')
    return null
  }
  
  const prevChapter = currentChapterIndex > 0 ? ontologyModule.chapters[currentChapterIndex - 1] : null
  const nextChapter = currentChapterIndex < ontologyModule.chapters.length - 1 ? ontologyModule.chapters[currentChapterIndex + 1] : null
  
  useEffect(() => {
    // Load progress from localStorage
    const saved = localStorage.getItem('ontology-progress')
    if (saved) {
      setCompletedChapters(JSON.parse(saved))
    }
  }, [])
  
  const markAsCompleted = () => {
    if (!completedChapters.includes(chapterId)) {
      const updated = [...completedChapters, chapterId]
      setCompletedChapters(updated)
      localStorage.setItem('ontology-progress', JSON.stringify(updated))
    }
  }
  
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <ChapterSidebar 
        chapters={ontologyModule.chapters}
        currentChapterId={chapterId}
        completedChapters={completedChapters}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-b border-indigo-200/30 dark:border-indigo-700/30 px-8 py-5 shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2.5 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-colors md:hidden"
              >
                <Menu size={20} />
              </button>
              <Link 
                href="/modules/ontology"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                <Home size={20} />
              </Link>
              <div className="h-6 w-px bg-indigo-200 dark:bg-indigo-700" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {currentChapter.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {currentChapter.estimatedMinutes}분
                  </span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                    {chapterId === 'intro' ? '시작하기' : `Chapter ${currentChapterIndex} / ${ontologyModule.chapters.length - 1}`}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex items-center gap-2">
              <Link
                href={prevChapter ? `/modules/ontology/${prevChapter.id}` : '#'}
                className={`p-2.5 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-colors ${
                  !prevChapter && 'opacity-50 cursor-not-allowed'
                }`}
              >
                <ChevronLeft size={20} />
              </Link>
              <Link
                href={nextChapter ? `/modules/ontology/${nextChapter.id}` : '#'}
                className={`p-2.5 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-colors ${
                  !nextChapter && 'opacity-50 cursor-not-allowed'
                }`}
              >
                <ChevronRight size={20} />
              </Link>
            </div>
          </div>
        </header>
        
        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="max-w-5xl mx-auto px-8 py-12">
            {/* Learning Objectives */}
            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 mb-8">
              <h2 className="font-semibold text-indigo-900 dark:text-indigo-200 mb-3 flex items-center gap-2">
                <Target size={20} />
                학습 목표
              </h2>
              <p className="text-indigo-800 dark:text-indigo-300">
                {currentChapter.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {currentChapter.keywords.map((keyword, i) => (
                  <span key={i} className="px-3 py-1 bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-300 rounded-full text-sm">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Chapter Content */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
              <ChapterContent chapterId={chapterId} />
            </div>
            
            {/* Complete Button */}
            <div className="mt-12 flex justify-between items-center">
              <button
                onClick={markAsCompleted}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  completedChapters.includes(chapterId)
                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {completedChapters.includes(chapterId) ? '✓ 완료됨' : '학습 완료'}
              </button>
              
              {nextChapter && (
                <Link
                  href={`/modules/ontology/${nextChapter.id}`}
                  className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  다음 챕터로
                  <ChevronRight size={16} />
                </Link>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}