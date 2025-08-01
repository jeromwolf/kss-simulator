'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Clock, BookOpen, CheckCircle } from 'lucide-react'
import { llmModule } from '../metadata'
import ChapterContent from '../components/ChapterContent'

export default function LLMChapterPage() {
  const params = useParams()
  const router = useRouter()
  const chapterId = params.chapterId as string
  
  const currentChapterIndex = llmModule.chapters.findIndex(ch => ch.id === chapterId)
  const currentChapter = llmModule.chapters[currentChapterIndex]
  const nextChapter = llmModule.chapters[currentChapterIndex + 1]
  const prevChapter = llmModule.chapters[currentChapterIndex - 1]

  if (!currentChapter) {
    router.push('/modules/llm')
    return null
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Chapter Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <Link href="/modules/llm" className="hover:text-indigo-600 dark:hover:text-indigo-400">
            LLM 모듈
          </Link>
          <span>/</span>
          <span>Chapter {currentChapterIndex + 1}</span>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {currentChapter.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
          {currentChapter.description}
        </p>
        
        <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{currentChapter.estimatedMinutes}분</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen size={16} />
            <span>{currentChapter.keywords.length}개 핵심 개념</span>
          </div>
        </div>
      </div>

      {/* Learning Objectives */}
      {currentChapter.learningObjectives && (
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <CheckCircle className="text-indigo-600 dark:text-indigo-400" size={20} />
            학습 목표
          </h2>
          <ul className="space-y-2">
            {currentChapter.learningObjectives.map((objective, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-indigo-600 dark:text-indigo-400 mt-1">•</span>
                <span className="text-gray-700 dark:text-gray-300">{objective}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Chapter Content */}
      <ChapterContent chapterId={chapterId} />

      {/* Navigation */}
      <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        {prevChapter ? (
          <Link
            href={`/modules/llm/${prevChapter.id}`}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <ChevronLeft size={20} />
            <div className="text-left">
              <div className="text-sm">이전 챕터</div>
              <div className="font-medium">{prevChapter.title}</div>
            </div>
          </Link>
        ) : (
          <div />
        )}
        
        {nextChapter ? (
          <Link
            href={`/modules/llm/${nextChapter.id}`}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <div className="text-right">
              <div className="text-sm">다음 챕터</div>
              <div className="font-medium">{nextChapter.title}</div>
            </div>
            <ChevronRight size={20} />
          </Link>
        ) : (
          <Link
            href="/modules/llm"
            className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-500 transition-colors"
          >
            <div className="text-right">
              <div className="text-sm">학습 완료!</div>
              <div className="font-medium">모듈 홈으로</div>
            </div>
            <CheckCircle size={20} />
          </Link>
        )}
      </div>
    </div>
  )
}