'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, BookOpen, Clock, CheckCircle } from 'lucide-react'
import { moduleMetadata } from '../metadata'
import ChapterContent from '../components/ChapterContent'

interface ChapterPageProps {
  params: {
    chapterId: string
  }
}

export default function ChapterPage({ params }: ChapterPageProps) {
  const [progress, setProgress] = useState<Record<number, boolean>>({})
  const [isCompleted, setIsCompleted] = useState(false)
  
  const chapterId = parseInt(params.chapterId)
  const chapter = moduleMetadata.chapters.find(c => c.id === chapterId)
  
  const currentIndex = moduleMetadata.chapters.findIndex(c => c.id === chapterId)
  const previousChapter = currentIndex > 0 ? moduleMetadata.chapters[currentIndex - 1] : null
  const nextChapter = currentIndex < moduleMetadata.chapters.length - 1 ? moduleMetadata.chapters[currentIndex + 1] : null

  useEffect(() => {
    const saved = localStorage.getItem('physical-ai-progress')
    if (saved) {
      const parsed = JSON.parse(saved)
      setProgress(parsed)
      setIsCompleted(parsed[chapterId] || false)
    }
  }, [chapterId])

  const markAsCompleted = () => {
    const newProgress = { ...progress, [chapterId]: true }
    setProgress(newProgress)
    setIsCompleted(true)
    localStorage.setItem('physical-ai-progress', JSON.stringify(newProgress))
  }

  if (!chapter) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">챕터를 찾을 수 없습니다</h1>
          <Link 
            href="/modules/physical-ai"
            className="text-slate-600 dark:text-slate-400 hover:underline"
          >
            모듈로 돌아가기
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Chapter Header */}
      <div className="bg-gradient-to-br from-slate-600 to-gray-700 rounded-2xl p-8 mb-8 text-white">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <span className="text-2xl font-bold">{chapter.id}</span>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{chapter.title}</h1>
            <p className="text-xl text-white/90">{chapter.description}</p>
          </div>
          {isCompleted && (
            <div className="flex items-center gap-2 bg-green-500/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">완료</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span className="font-semibold">학습 시간: {chapter.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            <span className="font-semibold">{chapter.learningObjectives.length}개 학습 목표</span>
          </div>
        </div>
      </div>

      {/* Learning Objectives */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 학습 목표</h2>
        <ul className="space-y-3">
          {chapter.learningObjectives.map((objective, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-6 h-6 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-slate-600 dark:text-slate-400 text-sm font-bold">{index + 1}</span>
              </div>
              <span className="text-gray-700 dark:text-gray-300">{objective}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Chapter Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        <ChapterContent chapterId={chapterId} />
      </div>

      {/* Completion Button */}
      {!isCompleted && (
        <div className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-6 mb-8 text-center">
          <button
            onClick={markAsCompleted}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-600 to-gray-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-slate-700 hover:to-gray-800 transition-all transform hover:scale-105"
          >
            <CheckCircle className="w-5 h-5" />
            챕터 완료 표시
          </button>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            학습을 마쳤으면 완료 표시를 해주세요
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <div>
          {previousChapter && (
            <Link
              href={`/modules/physical-ai/${previousChapter.id}`}
              className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 font-medium"
            >
              <ChevronLeft className="w-5 h-5" />
              <div className="text-left">
                <div className="text-sm text-gray-500 dark:text-gray-400">이전 챕터</div>
                <div>{previousChapter.title}</div>
              </div>
            </Link>
          )}
        </div>
        
        <Link
          href="/modules/physical-ai"
          className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          목차로 돌아가기
        </Link>
        
        <div>
          {nextChapter && (
            <Link
              href={`/modules/physical-ai/${nextChapter.id}`}
              className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 font-medium"
            >
              <div className="text-right">
                <div className="text-sm text-gray-500 dark:text-gray-400">다음 챕터</div>
                <div>{nextChapter.title}</div>
              </div>
              <ChevronRight className="w-5 h-5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}