'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Bot, Zap, Code2, Terminal, Workflow, Brain,
  ChevronRight, Clock, BookOpen, Play, Star,
  Sparkles, Cpu, GitBranch, Settings
} from 'lucide-react'
import { moduleMetadata } from './metadata'

export default function AIAutomationPage() {
  const [progress, setProgress] = useState<Record<number, boolean>>({})
  const [completedChapters, setCompletedChapters] = useState(0)

  useEffect(() => {
    const saved = localStorage.getItem('ai-automation-progress')
    if (saved) {
      const parsed = JSON.parse(saved)
      setProgress(parsed)
      setCompletedChapters(Object.values(parsed).filter(Boolean).length)
    }
  }, [])

  const totalDuration = moduleMetadata.chapters.reduce((acc, chapter) => {
    const duration = parseInt(chapter.duration)
    return acc + (isNaN(duration) ? 30 : duration)
  }, 0)

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}시간 ${mins > 0 ? mins + '분' : ''}` : `${mins}분`
  }

  return (
    <>
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 p-12 mb-12">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Bot className="w-12 h-12 text-white" />
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
                <Zap className="w-5 h-5" />
                <span className="font-semibold">시뮬레이터</span>
              </div>
              <div className="text-2xl font-bold text-white mt-1">{moduleMetadata.simulators.length}개</div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Tools Showcase */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🚀 주요 AI 도구</h2>
        <div className="grid md:grid-cols-5 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <Terminal className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg mb-2">Claude Code</h3>
            <p className="text-sm text-white/90">Anthropic 공식 CLI</p>
            <div className="mt-4 text-xs bg-white/20 rounded px-2 py-1 inline-block">MCP 지원</div>
          </div>
          
          <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl p-6 text-white">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg mb-2">Gemini CLI</h3>
            <p className="text-sm text-white/90">Google AI 멀티모달</p>
            <div className="mt-4 text-xs bg-white/20 rounded px-2 py-1 inline-block">Grounding</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <Code2 className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg mb-2">Cursor</h3>
            <p className="text-sm text-white/90">AI-First IDE</p>
            <div className="mt-4 text-xs bg-white/20 rounded px-2 py-1 inline-block">Copilot++</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <Workflow className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg mb-2">Windsurf</h3>
            <p className="text-sm text-white/90">Cascade 플로우</p>
            <div className="mt-4 text-xs bg-white/20 rounded px-2 py-1 inline-block">Codeium</div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <GitBranch className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg mb-2">GitHub Copilot</h3>
            <p className="text-sm text-white/90">Workspace & Chat</p>
            <div className="mt-4 text-xs bg-white/20 rounded px-2 py-1 inline-block">GPT-4</div>
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
              href={`/modules/ai-automation/${chapter.id}`}
              className="block group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-violet-500 dark:hover:border-violet-400 transition-all hover:shadow-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-violet-100 dark:bg-violet-900/30 rounded-lg flex items-center justify-center">
                        <span className="text-violet-600 dark:text-violet-400 font-bold">
                          {chapter.id}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
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
                          <Star className="w-4 h-4 text-violet-500 mt-0.5 flex-shrink-0" />
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
                  
                  <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors ml-4" />
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
              href={`/modules/ai-automation/simulators/${simulator.id}`}
              className="group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-violet-500 dark:hover:border-violet-400 transition-all hover:shadow-lg h-full">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/30 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors mb-2">
                      {simulator.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {simulator.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-violet-600 dark:text-violet-400">
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
      <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">✨ 이 모듈의 특별함</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-700 rounded-xl p-6">
            <Cpu className="w-10 h-10 text-violet-600 dark:text-violet-400 mb-4" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">최신 AI 도구 총망라</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Claude Code, Cursor, Windsurf 등 2024년 최신 AI 코딩 도구 완벽 정리
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-700 rounded-xl p-6">
            <Brain className="w-10 h-10 text-purple-600 dark:text-purple-400 mb-4" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">실전 워크플로우</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              실제 프로젝트에서 바로 적용 가능한 자동화 워크플로우와 베스트 프랙티스
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-700 rounded-xl p-6">
            <Settings className="w-10 h-10 text-pink-600 dark:text-pink-400 mb-4" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">커스터마이징 가이드</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              각 도구별 최적 설정과 커스텀 룰 작성법까지 상세히 다룹니다
            </p>
          </div>
        </div>
      </div>
    </>
  )
}