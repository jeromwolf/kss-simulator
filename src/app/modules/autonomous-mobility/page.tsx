'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Car, Zap, Code, Navigation, Wifi, TestTube,
  ChevronRight, Clock, BookOpen, Play, Star,
  Cpu, Eye, Route, Radio, Target, Battery
} from 'lucide-react'
import { moduleMetadata } from './metadata'

export default function AutonomousMobilityPage() {
  const [progress, setProgress] = useState<Record<number, boolean>>({})
  const [completedChapters, setCompletedChapters] = useState(0)

  useEffect(() => {
    const saved = localStorage.getItem('autonomous-mobility-progress')
    if (saved) {
      const parsed = JSON.parse(saved)
      setProgress(parsed)
      setCompletedChapters(Object.values(parsed).filter(Boolean).length)
    }
  }, [])

  return (
    <>
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-700 p-12 mb-12">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Car className="w-12 h-12 text-white" />
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
                <Target className="w-5 h-5" />
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

      {/* Technology Showcase */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🚗 핵심 기술 스택</h2>
        <div className="grid md:grid-cols-6 gap-4">
          <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl p-6 text-white">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <Eye className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg mb-2">LiDAR</h3>
            <p className="text-sm text-white/90">3D 포인트클라우드</p>
            <div className="mt-4 text-xs bg-white/20 rounded px-2 py-1 inline-block">Velodyne</div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <Cpu className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg mb-2">AI 인지</h3>
            <p className="text-sm text-white/90">딥러닝 객체 인식</p>
            <div className="mt-4 text-xs bg-white/20 rounded px-2 py-1 inline-block">YOLO</div>
          </div>
          
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-6 text-white">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <Route className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg mb-2">경로 계획</h3>
            <p className="text-sm text-white/90">실시간 의사결정</p>
            <div className="mt-4 text-xs bg-white/20 rounded px-2 py-1 inline-block">RRT*</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <Radio className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg mb-2">V2X 통신</h3>
            <p className="text-sm text-white/90">차량간 협력</p>
            <div className="mt-4 text-xs bg-white/20 rounded px-2 py-1 inline-block">5G</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <TestTube className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg mb-2">시뮬레이션</h3>
            <p className="text-sm text-white/90">가상 테스트</p>
            <div className="mt-4 text-xs bg-white/20 rounded px-2 py-1 inline-block">CARLA</div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <Battery className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg mb-2">전동화</h3>
            <p className="text-sm text-white/90">EV 파워트레인</p>
            <div className="mt-4 text-xs bg-white/20 rounded px-2 py-1 inline-block">BMS</div>
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
              href={`/modules/autonomous-mobility/${chapter.id}`}
              className="block group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-cyan-500 dark:hover:border-cyan-400 transition-all hover:shadow-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center">
                        <span className="text-cyan-600 dark:text-cyan-400 font-bold">
                          {chapter.id}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
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
                          <Star className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" />
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
                  
                  <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors ml-4" />
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
              href={`/modules/autonomous-mobility/simulators/${simulator.id}`}
              className="group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-cyan-500 dark:hover:border-cyan-400 transition-all hover:shadow-lg h-full">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center">
                    <Car className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors mb-2">
                      {simulator.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {simulator.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
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
      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">✨ 이 모듈의 특별함</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-700 rounded-xl p-6">
            <Car className="w-10 h-10 text-cyan-600 dark:text-cyan-400 mb-4" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">실제 자율주행 기술</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Tesla, Waymo, Cruise가 사용하는 실제 알고리즘과 센서 기술 학습
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-700 rounded-xl p-6">
            <TestTube className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-4" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">CARLA 시뮬레이션</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              업계 표준 CARLA 시뮬레이터로 실제와 같은 가상 테스트 환경 체험
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-700 rounded-xl p-6">
            <Zap className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mb-4" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">미래 모빌리티</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              UAM, 하이퍼루프, MaaS까지 차세대 교통 패러다임 완전 분석
            </p>
          </div>
        </div>
      </div>
    </>
  )
}