'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Bot, Cpu, Eye, Brain, Wifi, Car, Factory, 
  Users, Clock, BookOpen, TrendingUp, Zap,
  ArrowRight, CheckCircle, Play, Settings
} from 'lucide-react'
import { moduleMetadata } from './metadata'

export default function PhysicalAIModule() {
  const [progress, setProgress] = useState<Record<number, boolean>>({})
  const [completedCount, setCompletedCount] = useState(0)

  useEffect(() => {
    const saved = localStorage.getItem('physical-ai-progress')
    if (saved) {
      const parsed = JSON.parse(saved)
      setProgress(parsed)
      setCompletedCount(Object.values(parsed).filter(Boolean).length)
    }
  }, [])

  const progressPercentage = (completedCount / moduleMetadata.chapters.length) * 100

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-600 to-gray-700 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-500/20 to-gray-600/20" />
        
        <div className="relative z-10 grid lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Bot className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">{moduleMetadata.title}</h1>
                <p className="text-xl text-white/90">{moduleMetadata.description}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold">{moduleMetadata.chapters.length}</div>
                <div className="text-white/80">챕터</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{moduleMetadata.duration}</div>
                <div className="text-white/80">학습시간</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{moduleMetadata.simulators.length}</div>
                <div className="text-white/80">시뮬레이터</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div className="text-center mb-4">
              <div className="text-2xl font-bold">{progressPercentage.toFixed(0)}%</div>
              <div className="text-white/80">학습 진도</div>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3 mb-4">
              <div 
                className="bg-white rounded-full h-3 transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="text-sm text-white/80 text-center">
              {completedCount}/{moduleMetadata.chapters.length} 챕터 완료
            </div>
          </div>
        </div>
      </div>

      {/* Key Concepts */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <Brain className="w-7 h-7 text-slate-600" />
          Physical AI 핵심 개념
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl">
            <Bot className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Embodied AI</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">물리적 몸체를 가진 지능 시스템</p>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-b from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl">
            <Eye className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Perception</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">실시간 환경 인식과 이해</p>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-b from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl">
            <Zap className="w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Real-time Control</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">실시간 의사결정과 제어</p>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-b from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl">
            <Wifi className="w-12 h-12 text-orange-600 dark:text-orange-400 mx-auto mb-4" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Edge Computing</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">분산 지능과 엣지 AI</p>
          </div>
        </div>
      </div>

      {/* Application Domains */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🚀 주요 응용 분야</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-700 dark:to-slate-700 rounded-xl p-6">
            <Car className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">자율주행</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Tesla FSD, Waymo, 완전 자율주행</p>
            <div className="text-xs text-gray-500 dark:text-gray-400">• LiDAR/Camera 융합 • HD맵 • V2X</div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-700 dark:to-slate-700 rounded-xl p-6">
            <Bot className="w-8 h-8 text-green-600 dark:text-green-400 mb-4" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">휴머노이드</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Tesla Bot, Boston Dynamics</p>
            <div className="text-xs text-gray-500 dark:text-gray-400">• 이족보행 • 조작 • 인간협업</div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-700 dark:to-slate-700 rounded-xl p-6">
            <Factory className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-4" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">스마트 팩토리</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Industry 4.0, 디지털 트윈</p>
            <div className="text-xs text-gray-500 dark:text-gray-400">• 예측유지보수 • 품질관리 • 협동로봇</div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-700 dark:to-slate-700 rounded-xl p-6">
            <Cpu className="w-8 h-8 text-red-600 dark:text-red-400 mb-4" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Edge AI</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">실시간 AI 추론, IoT</p>
            <div className="text-xs text-gray-500 dark:text-gray-400">• 모델경량화 • 하드웨어가속 • 분산처리</div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-700 dark:to-slate-700 rounded-xl p-6">
            <Eye className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-4" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">컴퓨터 비전</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">실시간 인식, 3D 인식</p>
            <div className="text-xs text-gray-500 dark:text-gray-400">• 객체탐지 • SLAM • 깊이추정</div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-700 dark:to-slate-700 rounded-xl p-6">
            <Settings className="w-8 h-8 text-cyan-600 dark:text-cyan-400 mb-4" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">제어 시스템</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">로봇 제어, 강화학습</p>
            <div className="text-xs text-gray-500 dark:text-gray-400">• PID/MPC • RL • Sim2Real</div>
          </div>
        </div>
      </div>

      {/* Chapters */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <BookOpen className="w-7 h-7 text-slate-600" />
          학습 커리큘럼
        </h2>
        
        <div className="grid gap-4">
          {moduleMetadata.chapters.map((chapter) => {
            const isCompleted = progress[chapter.id]
            
            return (
              <Link
                key={chapter.id}
                href={`/modules/physical-ai/${chapter.id}`}
                className="block p-6 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-slate-400 dark:hover:border-slate-500 transition-all hover:shadow-lg group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`
                      w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg
                      ${isCompleted 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }
                    `}>
                      {isCompleted ? <CheckCircle className="w-6 h-6" /> : chapter.id}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors">
                        {chapter.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        {chapter.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {chapter.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          {chapter.learningObjectives.length}개 목표
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Simulators */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <Play className="w-7 h-7 text-slate-600" />
          인터랙티브 시뮬레이터
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {moduleMetadata.simulators.map((simulator) => (
            <Link
              key={simulator.id}
              href={`/modules/physical-ai/simulators/${simulator.id}`}
              className="block p-6 bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-800 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-slate-400 dark:hover:border-slate-500 transition-all hover:shadow-lg group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-xl flex items-center justify-center">
                  <Play className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                </div>
                <span className={`
                  px-3 py-1 rounded-full text-xs font-medium
                  ${simulator.difficulty === 'advanced' 
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' 
                    : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                  }
                `}>
                  {simulator.difficulty === 'advanced' ? '고급' : '중급'}
                </span>
              </div>
              
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors">
                {simulator.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {simulator.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Learning Path */}
      <div className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800 dark:to-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <TrendingUp className="w-7 h-7 text-slate-600" />
          학습 로드맵
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">1</span>
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">기초 이론</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Physical AI 개념, 로보틱스, 컴퓨터 비전 기초</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">2</span>
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">실습 프로젝트</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">강화학습, IoT, 자율주행 실습과 시뮬레이터</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">3</span>
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">고급 응용</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">스마트 팩토리, 휴머노이드, AGI와의 융합</p>
          </div>
        </div>
      </div>

      {/* Prerequisites and Tools */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">📚 사전 요구사항</h3>
          <ul className="space-y-2">
            {moduleMetadata.prerequisites.map((prereq, index) => (
              <li key={index} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <CheckCircle className="w-4 h-4 text-green-500" />
                {prereq}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🛠️ 사용 도구</h3>
          <div className="flex flex-wrap gap-2">
            {moduleMetadata.tools.map((tool, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}