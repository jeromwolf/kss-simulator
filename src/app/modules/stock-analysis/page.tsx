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
  Activity
} from 'lucide-react'
import { stockAnalysisModule } from './metadata'

export default function StockAnalysisModulePage() {

  return (
    <div className="max-w-6xl mx-auto space-y-12">
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
            인터랙티브 시뮬레이터
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            실전과 같은 환경에서 투자 전략을 체험하고 학습하세요
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {stockAnalysisModule.simulators.map((simulator) => {
            const Icon = getSimulatorIcon(simulator.id)
            return (
              <div
                key={simulator.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {simulator.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {simulator.description}
                    </p>
                    <Link
                      href={`/modules/stock-analysis/simulators/${simulator.id}`}
                      className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <PlayCircle className="w-4 h-4" />
                      시뮬레이터 실행
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Tools & Resources */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            투자 도구 & 자료
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            실전 투자에 활용할 수 있는 전문 도구들
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {stockAnalysisModule.tools.map((tool) => (
            <Link
              key={tool.id}
              href={tool.url}
              className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-red-300 dark:hover:border-red-600 transition-all duration-200"
            >
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  {getToolIcon(tool.id)}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {tool.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Start Learning CTA */}
      <section className="text-center space-y-6 py-12">
        <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">지금 바로 시작하세요!</h2>
          <p className="text-red-100 mb-6">
            체계적인 커리큘럼과 실전 시뮬레이터로 투자 전문가가 되어보세요
          </p>
          <Link
            href={`/modules/stock-analysis/${stockAnalysisModule.chapters[0].id}`}
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            <PlayCircle className="w-5 h-5" />
            첫 번째 모듈 시작하기
          </Link>
        </div>
      </section>
    </div>
  )
}

function getSimulatorIcon(simulatorId: string) {
  switch (simulatorId) {
    case 'financial-calculator':
      return Calculator
    case 'chart-analyzer':
      return BarChart3
    case 'portfolio-optimizer':
      return PieChart
    case 'backtesting-engine':
      return Activity
    case 'ai-mentor':
      return Brain
    default:
      return TrendingUp
  }
}

function getToolIcon(toolId: string) {
  switch (toolId) {
    case 'stock-screener':
      return <Target className="w-6 h-6" />
    case 'financial-terms':
      return <BookOpen className="w-6 h-6" />
    case 'market-simulator':
      return <DollarSign className="w-6 h-6" />
    default:
      return <TrendingUp className="w-6 h-6" />
  }
}