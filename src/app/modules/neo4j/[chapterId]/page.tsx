'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Clock, Target, CheckCircle } from 'lucide-react'
import { neo4jModule, getChapter, getNextChapter, getPrevChapter } from '../metadata'
import ChapterContent from '../components/ChapterContent'

export default function Neo4jChapterPage({ 
  params 
}: { 
  params: { chapterId: string } 
}) {
  const [completed, setCompleted] = useState(false)
  const chapter = getChapter(params.chapterId)
  const nextChapter = getNextChapter(params.chapterId)
  const prevChapter = getPrevChapter(params.chapterId)

  useEffect(() => {
    const savedProgress = localStorage.getItem('neo4j-progress')
    if (savedProgress) {
      const progress = JSON.parse(savedProgress)
      setCompleted(progress[params.chapterId] || false)
    }
  }, [params.chapterId])

  const markAsComplete = () => {
    const savedProgress = localStorage.getItem('neo4j-progress') || '{}'
    const progress = JSON.parse(savedProgress)
    progress[params.chapterId] = true
    localStorage.setItem('neo4j-progress', JSON.stringify(progress))
    setCompleted(true)
  }

  if (!chapter) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <p className="text-center text-gray-600 dark:text-gray-400">챕터를 찾을 수 없습니다.</p>
        <Link href="/modules/neo4j" className="block text-center mt-4 text-blue-600 hover:text-blue-700">
          모듈로 돌아가기
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/modules/neo4j"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
        >
          <ChevronLeft className="w-4 h-4" />
          모듈로 돌아가기
        </Link>
        
        <div className="flex items-center gap-4">
          {prevChapter && (
            <Link
              href={`/modules/neo4j/${prevChapter.id}`}
              className="inline-flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <ChevronLeft className="w-4 h-4" />
              이전
            </Link>
          )}
          {nextChapter && (
            <Link
              href={`/modules/neo4j/${nextChapter.id}`}
              className="inline-flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              다음
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>

      {/* Chapter Header */}
      <header className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center gap-2 text-white/80 text-sm mb-4">
          <span>Neo4j Knowledge Graph</span>
          <ChevronRight className="w-4 h-4" />
          <span>Chapter {params.chapterId.split('-')[0]}</span>
        </div>
        
        <h1 className="text-3xl font-bold mb-2">{chapter.title}</h1>
        <p className="text-white/90 text-lg">{chapter.description}</p>
        
        <div className="flex items-center gap-6 mt-6 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{chapter.estimatedMinutes}분</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            <span>{chapter.keywords.length}개 핵심 개념</span>
          </div>
          {completed && (
            <div className="flex items-center gap-2 text-green-300">
              <CheckCircle className="w-4 h-4" />
              <span>완료됨</span>
            </div>
          )}
        </div>
      </header>

      {/* Learning Objectives */}
      <section className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          🎯 학습 목표
        </h2>
        <ul className="space-y-2">
          {chapter.learningObjectives?.map((objective, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-bold">
                {index + 1}
              </span>
              <span className="text-gray-700 dark:text-gray-300">{objective}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Chapter Content */}
      <section className="bg-white dark:bg-gray-800 rounded-xl p-8 mb-8">
        <ChapterContent chapterId={params.chapterId} />
      </section>

      {/* Keywords */}
      <section className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          🏷️ 핵심 키워드
        </h3>
        <div className="flex flex-wrap gap-2">
          {chapter.keywords.map((keyword) => (
            <span
              key={keyword}
              className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm"
            >
              {keyword}
            </span>
          ))}
        </div>
      </section>

      {/* Complete Button */}
      {!completed && (
        <div className="text-center mb-8">
          <button
            onClick={markAsComplete}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transition-colors"
          >
            챕터 완료하기
          </button>
        </div>
      )}

      {/* Chapter Navigation */}
      <div className="flex items-center justify-between pb-8">
        {prevChapter ? (
          <Link
            href={`/modules/neo4j/${prevChapter.id}`}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <div className="text-left">
              <div className="text-xs text-gray-500 dark:text-gray-400">이전 챕터</div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">{prevChapter.title}</div>
            </div>
          </Link>
        ) : (
          <div />
        )}
        
        {nextChapter ? (
          <Link
            href={`/modules/neo4j/${nextChapter.id}`}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-colors"
          >
            <div className="text-right">
              <div className="text-xs text-white/80">다음 챕터</div>
              <div className="text-sm font-medium">{nextChapter.title}</div>
            </div>
            <ChevronRight className="w-4 h-4" />
          </Link>
        ) : (
          <Link
            href="/modules/neo4j"
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <CheckCircle className="w-4 h-4" />
            모듈 완료
          </Link>
        )}
      </div>
    </div>
  )
}