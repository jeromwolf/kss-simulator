'use client'

import { useState } from 'react'
import { Brain, Sparkles, Network, Rocket } from 'lucide-react'

export default function Home() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  const features = [
    {
      icon: Brain,
      title: '온톨로지 시뮬레이터',
      description: 'RDF Triple과 SPARQL을 시각적으로 학습하고 실습',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Sparkles,
      title: 'AI 학습 도우미',
      description: '개인화된 학습 경로와 실시간 피드백',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Network,
      title: '지식 그래프 탐색',
      description: '3D 인터랙티브 환경에서 개념 연결 시각화',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Rocket,
      title: '실전 프로젝트',
      description: '실제 데이터로 온톨로지 구축하고 활용',
      color: 'from-orange-500 to-red-500'
    }
  ]

  return (
    <main className="min-h-screen p-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-kss-primary to-kss-secondary bg-clip-text text-transparent mb-4">
            Knowledge Space Simulator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            복잡한 기술 개념을 시뮬레이션하며 체험하는 차세대 학습 플랫폼
          </p>
          
          <div className="mt-8 flex gap-4 justify-center">
            <a 
              href="/ontology" 
              className="px-6 py-3 bg-gradient-to-r from-kss-primary to-kss-secondary text-white rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all inline-block"
            >
              온톨로지 시작하기
            </a>
            <button className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-semibold border border-gray-200 dark:border-gray-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all">
              데모 보기
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity`} />
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-transparent transition-all">
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.color} text-white mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Stats Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-kss-primary">16+</div>
              <div className="text-gray-600 dark:text-gray-400">챕터</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-kss-secondary">100+</div>
              <div className="text-gray-600 dark:text-gray-400">인터랙티브 예제</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-kss-accent">∞</div>
              <div className="text-gray-600 dark:text-gray-400">학습 가능성</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}