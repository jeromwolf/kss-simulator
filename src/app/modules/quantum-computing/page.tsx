'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Atom, Zap, Calculator, 
  ChevronRight, Clock, BookOpen, Play, Star, Brain,
  Cpu, Shield, Network, Gauge
} from 'lucide-react'
import { moduleMetadata } from './metadata'

export default function QuantumComputingPage() {
  const [progress, setProgress] = useState<Record<number, boolean>>({})
  const [completedChapters, setCompletedChapters] = useState(0)

  useEffect(() => {
    const saved = localStorage.getItem('quantum-computing-progress')
    if (saved) {
      const parsed = JSON.parse(saved)
      setProgress(parsed)
      setCompletedChapters(Object.values(parsed).filter(Boolean).length)
    }
  }, [])

  return (
    <>
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-700 p-12 mb-12">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Atom className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{moduleMetadata.title}</h1>
              <p className="text-xl text-white/90">{moduleMetadata.description}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4">
              <div className="flex items-center gap-2 text-white">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">총 학습 시간</span>
              </div>
              <div className="text-2xl font-bold text-white mt-1">{moduleMetadata.duration}</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4">
              <div className="flex items-center gap-2 text-white">
                <BookOpen className="w-5 h-5" />
                <span className="font-semibold">학습 진도</span>
              </div>
              <div className="text-2xl font-bold text-white mt-1">
                {completedChapters} / {moduleMetadata.chapters.length} 완료
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4">
              <div className="flex items-center gap-2 text-white">
                <Gauge className="w-5 h-5" />
                <span className="font-semibold">난이도</span>
              </div>
              <div className="text-2xl font-bold text-white mt-1">고급</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4">
              <div className="flex items-center gap-2 text-white">
                <Zap className="w-5 h-5" />
                <span className="font-semibold">시뮬레이터</span>
              </div>
              <div className="text-2xl font-bold text-white mt-1">{moduleMetadata.simulators.length}개</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quantum Technology Showcase */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">⚛️ 양자 기술 스택</h2>
        <div className="grid md:grid-cols-6 gap-4">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <Atom className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg mb-2">큐비트</h3>
            <p className="text-sm text-white/90">양자 상태</p>
            <div className="mt-4 text-xs bg-white/20 rounded px-2 py-1 inline-block">Superposition</div>
          </div>
          
          <div className="bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl p-6 text-white">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <Network className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg mb-2">양자 얽힘</h3>
            <p className="text-sm text-white/90">비국소적 상관</p>
            <div className="mt-4 text-xs bg-white/20 rounded px-2 py-1 inline-block">Entanglement</div>
          </div>
          
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-6 text-white">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <Calculator className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg mb-2">양자 게이트</h3>
            <p className="text-sm text-white/90">유니터리 연산</p>
            <div className="mt-4 text-xs bg-white/20 rounded px-2 py-1 inline-block">Hadamard</div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg mb-2">양자 알고리즘</h3>
            <p className="text-sm text-white/90">지수적 가속</p>
            <div className="mt-4 text-xs bg-white/20 rounded px-2 py-1 inline-block">Grover</div>
          </div>
          
          <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl p-6 text-white">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg mb-2">오류 정정</h3>
            <p className="text-sm text-white/90">내결함성</p>
            <div className="mt-4 text-xs bg-white/20 rounded px-2 py-1 inline-block">Surface Code</div>
          </div>
          
          <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl p-6 text-white">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <Brain className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg mb-2">양자 ML</h3>
            <p className="text-sm text-white/90">NISQ 응용</p>
            <div className="mt-4 text-xs bg-white/20 rounded px-2 py-1 inline-block">VQE</div>
          </div>
        </div>
      </div>

      {/* Chapters */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">📚 학습 커리큘럼</h2>
        <div className="space-y-4">
          {moduleMetadata.chapters.map((chapter) => (
            <Link
              key={chapter.id}
              href={`/modules/quantum-computing/${chapter.id}`}
              className="block group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-400 transition-all hover:shadow-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                        <span className="text-purple-600 dark:text-purple-400 font-bold">
                          {chapter.id}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {chapter.title}
                      </h3>
                      {progress[chapter.id] && (
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-full">
                          완료
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {chapter.description}
                    </p>
                    
                    <div className="space-y-2">
                      {chapter.learningObjectives.map((objective, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Star className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{objective}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-4 mt-4">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="w-4 h-4 inline mr-1" />
                        {chapter.duration}
                      </span>
                    </div>
                  </div>
                  
                  <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors ml-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Simulators */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🎮 인터랙티브 시뮬레이터</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {moduleMetadata.simulators.map((simulator) => (
            <Link
              key={simulator.id}
              href={`/modules/quantum-computing/simulators/${simulator.id}`}
              className="group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-400 transition-all hover:shadow-lg h-full">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                    <Atom className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-2">
                      {simulator.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {simulator.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-purple-600 dark:text-purple-400">
                      <Play className="w-4 h-4" />
                      <span className="text-sm font-semibold">시뮬레이터 실행</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Key Features */}
      <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">✨ 이 모듈의 특별함</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-700 rounded-xl p-6">
            <Atom className="w-10 h-10 text-purple-600 dark:text-purple-400 mb-4" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">실제 양자 컴퓨터</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              IBM Quantum, IonQ 등 실제 양자 컴퓨터에서 실행 가능한 코드 학습
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-700 rounded-xl p-6">
            <Calculator className="w-10 h-10 text-violet-600 dark:text-violet-400 mb-4" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">수학적 엄밀성</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              선형대수와 양자역학 이론을 시각적으로 직관적으로 이해
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-700 rounded-xl p-6">
            <Cpu className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mb-4" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">NISQ 시대 대비</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              현재 양자 컴퓨터의 한계와 실용적인 양자 머신러닝 알고리즘
            </p>
          </div>
        </div>
      </div>
    </>
  )
}