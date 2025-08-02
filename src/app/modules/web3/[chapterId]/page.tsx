'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle, Clock, ChevronRight } from 'lucide-react'
import { moduleMetadata } from '../metadata'
import ChapterContent from '../components/ChapterContent'

export default function ChapterPage({ params }: { params: { chapterId: string } }) {
  const chapterId = parseInt(params.chapterId)
  const chapter = moduleMetadata.chapters.find(c => c.id === chapterId)
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('web3-progress')
    if (saved) {
      const progress = JSON.parse(saved)
      setCompleted(progress[chapterId] || false)
    }
  }, [chapterId])

  const markAsComplete = () => {
    const saved = localStorage.getItem('web3-progress')
    const progress = saved ? JSON.parse(saved) : {}
    progress[chapterId] = true
    localStorage.setItem('web3-progress', JSON.stringify(progress))
    setCompleted(true)
  }

  if (!chapter) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          챕터를 찾을 수 없습니다
        </h1>
        <Link href="/modules/web3" className="text-indigo-600 dark:text-indigo-400 hover:underline">
          모듈 홈으로 돌아가기
        </Link>
      </div>
    )
  }

  const prevChapter = moduleMetadata.chapters.find(c => c.id === chapterId - 1)
  const nextChapter = moduleMetadata.chapters.find(c => c.id === chapterId + 1)

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
        <Link href="/modules/web3" className="hover:text-indigo-600 dark:hover:text-indigo-400">
          Web3 & Blockchain
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 dark:text-white">Chapter {chapter.id}</span>
      </div>

      {/* Chapter Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-8 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">
              {chapter.id}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {chapter.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {chapter.description}
              </p>
            </div>
          </div>
          {completed && (
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <CheckCircle className="w-6 h-6" />
              <span className="font-semibold">완료</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {chapter.duration}
          </span>
        </div>

        {/* Learning Objectives */}
        <div className="mt-6 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
          <h3 className="font-bold text-gray-900 dark:text-white mb-3">🎯 학습 목표</h3>
          <ul className="space-y-2">
            {chapter.learningObjectives.map((objective, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-indigo-600 dark:text-indigo-400 mt-1">•</span>
                <span className="text-gray-700 dark:text-gray-300">{objective}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Chapter Content */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-8 border border-gray-200 dark:border-gray-700">
        <ChapterContent chapterId={chapterId} />
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mb-8">
        {prevChapter ? (
          <Link
            href={`/modules/web3/${prevChapter.id}`}
            className="flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>이전: {prevChapter.title}</span>
          </Link>
        ) : (
          <div />
        )}

        {!completed && (
          <button
            onClick={markAsComplete}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-colors font-semibold"
          >
            학습 완료
          </button>
        )}

        {nextChapter ? (
          <Link
            href={`/modules/web3/${nextChapter.id}`}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
          >
            <span>다음: {nextChapter.title}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        ) : (
          <Link
            href="/modules/web3"
            className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
          >
            모듈 완료! 홈으로
          </Link>
        )}
      </div>
    </div>
  )
}