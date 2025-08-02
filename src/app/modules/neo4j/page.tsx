'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Network, 
  Code, 
  Database, 
  Cpu, 
  Zap, 
  BookOpen,
  PlayCircle,
  Clock,
  Star,
  ChevronRight,
  ArrowLeft,
  GitBranch,
  Search,
  Share2,
  Layers
} from 'lucide-react'
import { neo4jModule } from './metadata'

export default function Neo4jModulePage() {
  const [progress, setProgress] = useState<Record<string, boolean>>({})
  const [completedChapters, setCompletedChapters] = useState(0)

  useEffect(() => {
    const savedProgress = localStorage.getItem('neo4j-progress')
    if (savedProgress) {
      const parsed = JSON.parse(savedProgress)
      setProgress(parsed)
      setCompletedChapters(Object.values(parsed).filter(Boolean).length)
    }
  }, [])

  const completionRate = Math.round((completedChapters / neo4jModule.chapters.length) * 100)

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
        >
          <ArrowLeft className="w-4 h-4" />
          홈으로 돌아가기
        </Link>
      </div>

      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
          <Network className="w-4 h-4" />
          그래프 데이터베이스의 정점
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          {neo4jModule.nameKo}
          <span className="block text-lg md:text-xl font-normal text-gray-600 dark:text-gray-400 mt-2">
            {neo4jModule.description}
          </span>
        </h1>
        
        <div className="flex items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{neo4jModule.estimatedHours}시간</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{neo4jModule.chapters.length}개 챕터</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4" />
            <span>{neo4jModule.difficulty === 'intermediate' ? '중급' : neo4jModule.difficulty}</span>
          </div>
        </div>
      </section>

      {/* Progress Tracker */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">학습 진도</h3>
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{completionRate}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${completionRate}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          {completedChapters} / {neo4jModule.chapters.length} 챕터 완료
        </p>
      </section>

      {/* Key Features */}
      <section className="grid md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6">
          <GitBranch className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">연결된 데이터</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            노드와 관계로 표현되는 직관적인 데이터 모델
          </p>
        </div>
        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl p-6">
          <Search className="w-8 h-8 text-cyan-600 dark:text-cyan-400 mb-3" />
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Cypher 쿼리</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            SQL보다 직관적인 그래프 패턴 매칭 언어
          </p>
        </div>
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-xl p-6">
          <Share2 className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-3" />
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">그래프 알고리즘</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            PageRank, 커뮤니티 탐지, 최단 경로 등
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-6">
          <Layers className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-3" />
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">KSS 통합</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            온톨로지, LLM, RAG와 완벽한 통합
          </p>
        </div>
      </section>

      {/* Learning Path */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
          학습 로드맵
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {neo4jModule.chapters.map((chapter, index) => (
            <Link
              key={chapter.id}
              href={`/modules/neo4j/${chapter.id}`}
              className="group relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {chapter.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {chapter.description}
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-500 dark:text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{chapter.estimatedMinutes}분</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Code className="w-3 h-3" />
                      <span>{chapter.keywords.length}개 핵심개념</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
              </div>
              {progress[chapter.id] && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* Interactive Simulators */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            인터랙티브 시뮬레이터
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            실시간으로 그래프 데이터베이스를 체험하세요
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {neo4jModule.simulators.map(simulator => (
            <Link
              key={simulator.id}
              href={`/modules/neo4j/simulators/${simulator.id}`}
              className="group bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm flex items-center justify-center">
                  {simulator.id === 'cypher-playground' && <Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
                  {simulator.id === 'graph-visualizer' && <Network className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
                  {simulator.id === 'node-editor' && <Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
                  {simulator.id === 'algorithm-lab' && <Cpu className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
                  {simulator.id === 'import-wizard' && <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {simulator.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {simulator.description}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <PlayCircle className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                      시뮬레이터 실행
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Neo4j 활용 사례</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <h3 className="font-semibold mb-2">추천 시스템</h3>
            <p className="text-sm text-white/80">
              사용자-아이템 관계를 분석하여 개인화된 추천 제공
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <h3 className="font-semibold mb-2">사기 탐지</h3>
            <p className="text-sm text-white/80">
              네트워크 패턴 분석으로 이상 거래 실시간 탐지
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <h3 className="font-semibold mb-2">지식 그래프</h3>
            <p className="text-sm text-white/80">
              복잡한 도메인 지식을 연결하여 AI 추론 강화
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}