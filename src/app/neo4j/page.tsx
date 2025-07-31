'use client'

import { useState } from 'react'
import { 
  Network, Search, Database, GitBranch, 
  Zap, Globe, Filter, Settings,
  ChevronRight, Code, BookOpen, Layers
} from 'lucide-react'
import Link from 'next/link'

export default function Neo4jPage() {
  const [activeTab, setActiveTab] = useState('overview')

  const features = [
    {
      icon: GitBranch,
      title: '지식 연결 시각화',
      description: '모든 도메인의 지식을 하나의 거대한 그래프로 연결하여 새로운 인사이트 발견'
    },
    {
      icon: Search,
      title: '크로스 도메인 검색',
      description: '온톨로지, LLM, 주식 등 여러 도메인을 넘나들며 통합 검색'
    },
    {
      icon: Zap,
      title: '실시간 추론 엔진',
      description: '그래프 알고리즘을 활용한 지식 추론 및 패턴 발견'
    },
    {
      icon: Layers,
      title: '다층 지식 구조',
      description: '개념, 관계, 속성을 다층적으로 구조화하여 깊이 있는 이해'
    }
  ]

  const useCases = [
    {
      domain: '온톨로지 × Neo4j',
      example: 'RDF 트리플을 그래프 구조로 저장하고 SPARQL과 Cypher를 함께 활용',
      benefit: '시맨틱 웹 기술과 그래프 DB의 시너지'
    },
    {
      domain: 'LLM × Neo4j',
      example: 'Transformer 아키텍처의 개념들을 노드로 연결하여 학습 경로 최적화',
      benefit: '개인화된 AI 학습 커리큘럼 생성'
    },
    {
      domain: '주식 × Neo4j',
      example: '기업-산업-경제지표를 그래프로 연결하여 투자 기회 발견',
      benefit: '숨겨진 상관관계와 투자 인사이트'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            >
              KSS
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Neo4j Knowledge Graph
            </h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-6">
            <Network className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            모든 지식을 연결하는 통합 지식 그래프
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
            Neo4j 그래프 데이터베이스로 KSS의 모든 도메인 지식을 연결하고, 
            새로운 패턴과 인사이트를 발견하세요
          </p>
        </div>
      </section>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex gap-8">
            {[
              { id: 'overview', label: '개요' },
              { id: 'features', label: '주요 기능' },
              { id: 'use-cases', label: '활용 사례' },
              { id: 'start', label: '시작하기' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                왜 Neo4j인가?
              </h3>
              <div className="prose prose-gray dark:prose-invert">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  KSS 플랫폼의 핵심은 서로 다른 도메인의 지식을 연결하는 것입니다. 
                  Neo4j는 이러한 복잡한 관계를 자연스럽게 표현하고 탐색할 수 있는 
                  최적의 솔루션입니다.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• 수십억 개의 노드와 관계를 빠르게 탐색</li>
                  <li>• Cypher 쿼리 언어로 직관적인 그래프 탐색</li>
                  <li>• 실시간 그래프 알고리즘 실행</li>
                  <li>• 시각적 그래프 탐색 도구 제공</li>
                </ul>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 rounded-lg">
              <h4 className="font-bold text-gray-900 dark:text-white mb-4">
                통합 지식 그래프 아키텍처
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Database className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">데이터 레이어</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      각 도메인의 지식을 노드와 관계로 저장
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-purple-600 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">API 레이어</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      GraphQL/REST API로 통합 접근
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Filter className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">애플리케이션 레이어</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      각 시뮬레이터가 필요한 지식을 실시간 활용
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'features' && (
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div 
                  key={idx}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 rounded-lg hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {activeTab === 'use-cases' && (
          <div className="space-y-8">
            {useCases.map((useCase, idx) => (
              <div 
                key={idx}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 rounded-lg"
              >
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {useCase.domain}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  {useCase.example}
                </p>
                <div className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                  <Zap className="w-4 h-4" />
                  {useCase.benefit}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'start' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">시작할 준비가 되셨나요?</h3>
              <p className="mb-6">
                Neo4j 지식 그래프로 KSS의 모든 지식을 연결하고 탐색해보세요
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  튜토리얼 시작
                </button>
                <button className="px-6 py-3 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition-colors flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Cypher 쿼리 배우기
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-lg">
                <Settings className="w-8 h-8 text-gray-600 dark:text-gray-400 mb-3" />
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                  설치 및 설정
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Neo4j Desktop 설치 및 KSS 데이터베이스 초기 설정
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-lg">
                <Database className="w-8 h-8 text-gray-600 dark:text-gray-400 mb-3" />
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                  데이터 모델링
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  도메인별 노드와 관계 설계 가이드
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-lg">
                <Network className="w-8 h-8 text-gray-600 dark:text-gray-400 mb-3" />
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                  그래프 탐색
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Neo4j Browser로 시각적 탐색 시작하기
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}