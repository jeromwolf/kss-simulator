'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, ChevronLeft, ChevronRight, Clock, Target, CheckCircle } from 'lucide-react'
import { moduleMetadata } from '../metadata'
import ChapterContent from '../components/ChapterContent'

interface PageProps {
  params: {
    chapterId: string
  }
}

export default function AutonomousMobilityChapterPage({ params }: PageProps) {
  const [progress, setProgress] = useState<Record<number, boolean>>({})
  const chapterId = parseInt(params.chapterId)
  const chapter = moduleMetadata.chapters.find(c => c.id === chapterId)

  useEffect(() => {
    const saved = localStorage.getItem('autonomous-mobility-progress')
    if (saved) {
      setProgress(JSON.parse(saved))
    }
  }, [])

  const markAsCompleted = () => {
    const newProgress = { ...progress, [chapterId]: true }
    setProgress(newProgress)
    localStorage.setItem('autonomous-mobility-progress', JSON.stringify(newProgress))
  }

  const markAsIncomplete = () => {
    const newProgress = { ...progress, [chapterId]: false }
    setProgress(newProgress)
    localStorage.setItem('autonomous-mobility-progress', JSON.stringify(newProgress))
  }

  if (!chapter) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">챕터를 찾을 수 없습니다</h1>
          <Link 
            href="/modules/autonomous-mobility"
            className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300"
          >
            자율주행 모듈로 돌아가기
          </Link>
        </div>
      </div>
    )
  }

  const prevChapter = moduleMetadata.chapters.find(c => c.id === chapterId - 1)
  const nextChapter = moduleMetadata.chapters.find(c => c.id === chapterId + 1)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link 
                href="/modules/autonomous-mobility"
                className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>자율주행 모듈로 돌아가기</span>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              {progress[chapterId] ? (
                <button
                  onClick={markAsIncomplete}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <CheckCircle className="w-4 h-4" />
                  완료됨
                </button>
              ) : (
                <button
                  onClick={markAsCompleted}
                  className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
                >
                  <Target className="w-4 h-4" />
                  완료 표시
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Chapter Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">{chapter.id}</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{chapter.title}</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">{chapter.description}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{chapter.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              <span>{chapter.learningObjectives.length}개 학습 목표</span>
            </div>
            {progress[chapterId] && (
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <CheckCircle className="w-4 h-4" />
                <span>완료</span>
              </div>
            )}
          </div>
        </div>

        {/* Learning Objectives */}
        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 학습 목표</h2>
          <div className="grid gap-3">
            {chapter.learningObjectives.map((objective, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  {idx + 1}
                </div>
                <span className="text-gray-700 dark:text-gray-300">{objective}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chapter Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 mb-8">
          <ChapterContent chapterId={chapterId} />
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <div>
            {prevChapter ? (
              <Link
                href={`/modules/autonomous-mobility/${prevChapter.id}`}
                className="flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                <div className="text-left">
                  <div className="text-sm text-gray-500 dark:text-gray-400">이전 챕터</div>
                  <div className="font-medium">{prevChapter.title}</div>
                </div>
              </Link>
            ) : (
              <div></div>
            )}
          </div>

          <div>
            {nextChapter ? (
              <Link
                href={`/modules/autonomous-mobility/${nextChapter.id}`}
                className="flex items-center gap-2 px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
              >
                <div className="text-right">
                  <div className="text-sm text-cyan-100">다음 챕터</div>
                  <div className="font-medium">{nextChapter.title}</div>
                </div>
                <ChevronRight className="w-5 h-5" />
              </Link>
            ) : (
              <Link
                href="/modules/autonomous-mobility"
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <div className="text-right">
                  <div className="text-sm text-green-100">완료</div>
                  <div className="font-medium">모듈로 돌아가기</div>
                </div>
                <CheckCircle className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}