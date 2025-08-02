'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  TrendingUp, 
  Calculator, 
  BarChart3, 
  Target, 
  Brain, 
  BookOpen,
  PlayCircle,
  Clock,
  Star,
  ChevronRight,
  DollarSign,
  PieChart,
  Activity,
  MessageSquare,
  Video,
  Book,
  LineChart,
  ArrowLeft
} from 'lucide-react'
import { stockAnalysisModule } from './metadata'
import dynamic from 'next/dynamic'

// Dynamic imports for legacy components
const AdvancedSimulator = dynamic(
  () => import('@/components/stock-analysis/AdvancedSimulator').then(mod => mod.AdvancedSimulator),
  { ssr: false }
)
const AIMentor = dynamic(
  () => import('@/components/stock-analysis/AIMentor').then(mod => mod.AIMentor),
  { ssr: false }
)
const VideoLearning = dynamic(
  () => import('@/components/stock-analysis/VideoLearning').then(mod => mod.VideoLearning),
  { ssr: false }
)
const VideoCreator = dynamic(
  () => import('@/components/stock-analysis/VideoCreator').then(mod => mod.VideoCreator),
  { ssr: false }
)

export default function StockAnalysisModulePage() {
  const [viewMode, setViewMode] = useState<'overview' | 'simulator' | 'videos' | 'creator' | 'mentor'>('overview')
  const [isMentorOpen, setIsMentorOpen] = useState(false)

  // If in special view mode, render that component
  if (viewMode === 'simulator') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <button
            onClick={() => setViewMode('overview')}
            className="mb-6 inline-flex items-center gap-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
          >
            <ArrowLeft className="w-4 h-4" />
            모듈로 돌아가기
          </button>
          <div className="mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <LineChart className="w-8 h-8 text-green-600" />
              AI 기반 주식 투자 시뮬레이터
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              실시간 시장 데이터와 AI 분석을 통한 투자 시뮬레이션
            </p>
          </div>
          <AdvancedSimulator />
        </div>
      </div>
    )
  }

  if (viewMode === 'videos') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <button
            onClick={() => setViewMode('overview')}
            className="mb-6 inline-flex items-center gap-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
          >
            <ArrowLeft className="w-4 h-4" />
            모듈로 돌아가기
          </button>
          <VideoLearning />
        </div>
      </div>
    )
  }

  if (viewMode === 'creator') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <button
            onClick={() => setViewMode('overview')}
            className="mb-6 inline-flex items-center gap-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
          >
            <ArrowLeft className="w-4 h-4" />
            모듈로 돌아가기
          </button>
          <VideoCreator />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
        >
          <ArrowLeft className="w-4 h-4" />
          홈으로 돌아가기
        </Link>
        
        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('simulator')}
            className="px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 bg-green-600 text-white hover:bg-green-700"
          >
            <LineChart className="w-4 h-4" />
            AI 시뮬레이터
          </button>
          <button
            onClick={() => setViewMode('videos')}
            className="px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
          >
            <PlayCircle className="w-4 h-4" />
            비디오 강의
          </button>
          <button
            onClick={() => setViewMode('creator')}
            className="px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 bg-purple-600 text-white hover:bg-purple-700"
          >
            <Video className="w-4 h-4" />
            비디오 생성
          </button>
          <Link
            href="/stock-dictionary"
            className="px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 bg-gray-600 text-white hover:bg-gray-700"
          >
            <Book className="w-4 h-4" />
            용어 사전
          </Link>
          <button
            onClick={() => setIsMentorOpen(!isMentorOpen)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              isMentorOpen
                ? 'bg-orange-600 text-white'
                : 'bg-orange-600 text-white hover:bg-orange-700'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            AI 멘토
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 rounded-full text-sm font-medium">
          <TrendingUp className="w-4 h-4" />
          체계적인 투자 교육
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          {stockAnalysisModule.nameKo}
          <span className="block text-lg md:text-xl font-normal text-gray-600 dark:text-gray-400 mt-2">
            {stockAnalysisModule.description}
          </span>
        </h1>
        
        <div className="flex items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{stockAnalysisModule.estimatedHours}시간</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{stockAnalysisModule.chapters.length}개 모듈</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4" />
            <span>{stockAnalysisModule.difficulty === 'intermediate' ? '중급' : stockAnalysisModule.difficulty}</span>
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
          학습 로드맵
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stockAnalysisModule.chapters.map((chapter, index) => (
            <Link
              key={chapter.id}
              href={`/modules/stock-analysis/${chapter.id}`}
              className="group relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-red-300 dark:hover:border-red-600 transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
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
                      <Target className="w-3 h-3" />
                      <span>{chapter.keywords.length}개 핵심개념</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Interactive Simulators */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            실습 시뮬레이터
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            실제 데이터를 활용한 투자 전략 시뮬레이션
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {stockAnalysisModule.simulators.map(simulator => (
            <Link
              key={simulator.id}
              href={`/modules/stock-analysis/simulators/${simulator.id}`}
              className="group bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl p-6 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm flex items-center justify-center">
                  {simulator.id === 'financial-calculator' && <Calculator className="w-6 h-6 text-red-600 dark:text-red-400" />}
                  {simulator.id === 'chart-analyzer' && <BarChart3 className="w-6 h-6 text-red-600 dark:text-red-400" />}
                  {simulator.id === 'portfolio-optimizer' && <PieChart className="w-6 h-6 text-red-600 dark:text-red-400" />}
                  {simulator.id === 'backtesting-engine' && <Activity className="w-6 h-6 text-red-600 dark:text-red-400" />}
                  {simulator.id === 'ai-mentor' && <Brain className="w-6 h-6 text-red-600 dark:text-red-400" />}
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                    {simulator.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {simulator.description}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <PlayCircle className="w-4 h-4 text-red-500" />
                    <span className="text-xs font-medium text-red-600 dark:text-red-400">
                      시뮬레이터 실행
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Tools & Resources */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            도구 및 리소스
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            투자 분석을 위한 필수 도구 모음
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Link
            href="/stock-analysis/curriculum"
            className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-red-300 dark:hover:border-red-600 transition-all duration-200"
          >
            <BookOpen className="w-8 h-8 text-red-600 dark:text-red-400 mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
              전체 커리큘럼
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              체계적인 학습 경로 확인
            </p>
          </Link>
          
          <Link
            href="/stock-analysis/terms"
            className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-red-300 dark:hover:border-red-600 transition-all duration-200"
          >
            <Book className="w-8 h-8 text-red-600 dark:text-red-400 mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
              금융 용어사전
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              필수 투자 용어 정리
            </p>
          </Link>
          
          <Link
            href="/stock-dictionary"
            className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-red-300 dark:hover:border-red-600 transition-all duration-200"
          >
            <DollarSign className="w-8 h-8 text-red-600 dark:text-red-400 mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
              실시간 시장 데이터
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              최신 시장 동향 분석
            </p>
          </Link>
        </div>
      </section>

      {/* AI Mentor Chat */}
      {isMentorOpen && (
        <AIMentor 
          isOpen={isMentorOpen}
          onToggle={() => setIsMentorOpen(!isMentorOpen)}
        />
      )}
    </div>
  )
}