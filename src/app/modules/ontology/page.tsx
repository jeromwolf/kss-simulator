'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Play, Clock, Target, BookOpen, Network, Database, Search, Sparkles, CheckCircle2 } from 'lucide-react'
import { ontologyModule } from './metadata'
import dynamic from 'next/dynamic'

// Lazy load simulators
const RDFTripleEditor = dynamic(() => 
  import('@/components/rdf-editor/RDFTripleEditor').then(mod => ({ default: mod.RDFTripleEditor })), 
  { 
    ssr: false,
    loading: () => <div className="h-96 flex items-center justify-center">RDF Editor 로딩 중...</div>
  }
)

export default function OntologyMainPage() {
  const [completedChapters, setCompletedChapters] = useState<string[]>([])
  const [showRDFEditor, setShowRDFEditor] = useState(false)
  
  const progress = (completedChapters.length / ontologyModule.chapters.length) * 100

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Hero Section */}
      <section className="text-center py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/50 to-purple-100/50 dark:from-indigo-900/20 dark:to-purple-900/20 -z-10"></div>
        
        <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl mb-6 shadow-lg">
          {ontologyModule.icon}
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {ontologyModule.nameKo}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          {ontologyModule.description}
        </p>
        
        {/* Progress */}
        <div className="max-w-md mx-auto mb-8">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>학습 진도</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <Link
          href={`/modules/ontology/${ontologyModule.chapters[0].id}`}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
        >
          <Play size={20} />
          학습 시작하기
        </Link>
      </section>

      {/* Quick Demo Section */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <Network className="text-indigo-500" size={24} />
          빠른 체험: RDF Triple Editor
        </h2>
        <button
          onClick={() => setShowRDFEditor(!showRDFEditor)}
          className="mb-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
        >
          {showRDFEditor ? '에디터 숨기기' : '에디터 열기'}
        </button>
        {showRDFEditor && <RDFTripleEditor />}
      </section>

      {/* 학습 목표 */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <Target className="text-indigo-500" size={24} />
          학습 목표
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">이론적 기초</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-green-500 mt-1" />
                온톨로지의 철학적 배경과 개념
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-green-500 mt-1" />
                RDF, RDFS, OWL 표준 이해
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-green-500 mt-1" />
                시맨틱 웹과 링크드 데이터
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">실전 역량</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-green-500 mt-1" />
                실제 온톨로지 설계 및 구축
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-green-500 mt-1" />
                SPARQL 쿼리 작성
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-green-500 mt-1" />
                지식 그래프 시각화
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Ontology Pipeline Visualization */}
      <section className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <Sparkles className="text-indigo-500" size={24} />
          온톨로지 구축 파이프라인
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1 text-center">
            <div className="w-16 h-16 mx-auto bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md mb-2">
              <Database className="text-indigo-500" size={24} />
            </div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">지식 모델링</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">도메인 분석 & 개념화</p>
          </div>
          
          <div className="text-gray-400 dark:text-gray-600">→</div>
          
          <div className="flex-1 text-center">
            <div className="w-16 h-16 mx-auto bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md mb-2">
              <Network className="text-indigo-500" size={24} />
            </div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">온톨로지 구축</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">RDF/OWL 작성</p>
          </div>
          
          <div className="text-gray-400 dark:text-gray-600">→</div>
          
          <div className="flex-1 text-center">
            <div className="w-16 h-16 mx-auto bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md mb-2">
              <Search className="text-indigo-500" size={24} />
            </div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">추론 & 검증</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Reasoner 활용</p>
          </div>
          
          <div className="text-gray-400 dark:text-gray-600">→</div>
          
          <div className="flex-1 text-center">
            <div className="w-16 h-16 mx-auto bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md mb-2">
              <Sparkles className="text-indigo-500" size={24} />
            </div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">활용 & 통합</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">응용 시스템 연동</p>
          </div>
        </div>
      </section>

      {/* 챕터 목록 */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <BookOpen className="text-indigo-500" size={24} />
          챕터 목록
        </h2>
        <div className="grid gap-4">
          {ontologyModule.chapters.map((chapter, index) => {
            const isCompleted = completedChapters.includes(chapter.id)
            const isLocked = index > 0 && !completedChapters.includes(ontologyModule.chapters[index - 1].id)
            
            // Part 구분
            const isNewPart = 
              (index === 1) || // Part 1
              (index === 4) || // Part 2
              (index === 8) || // Part 3
              (index === 11) || // Part 4
              (index === 14)   // Part 5
            
            const partTitles = {
              1: 'Part 1. 온톨로지의 이해',
              4: 'Part 2. 온톨로지 기술 표준',
              8: 'Part 3. 온톨로지 설계와 구축',
              11: 'Part 4. 실전 프로젝트',
              14: 'Part 5. 온톨로지의 미래'
            }
            
            return (
              <div key={chapter.id}>
                {isNewPart && (
                  <div className="text-xs font-medium text-indigo-500 dark:text-indigo-400 uppercase tracking-wide mt-4 mb-2 px-2 py-1">
                    {partTitles[index as keyof typeof partTitles]}
                  </div>
                )}
                <Link
                  href={isLocked ? '#' : `/modules/ontology/${chapter.id}`}
                  className={`block p-6 rounded-xl border transition-all duration-200 ${
                    isLocked 
                      ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 cursor-not-allowed opacity-60'
                      : isCompleted
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700 hover:shadow-md'
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-600'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          isCompleted 
                            ? 'bg-green-500 text-white'
                            : isLocked
                            ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
                            : 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400'
                        }`}>
                          {isCompleted ? <CheckCircle2 size={16} /> : chapter.id === 'intro' ? '시작' : index}
                        </span>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {chapter.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        {chapter.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{chapter.estimatedMinutes}분</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {chapter.keywords.slice(0, 3).map((keyword, i) => (
                            <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    {!isLocked && (
                      <div className="text-indigo-500">
                        <Play size={20} />
                      </div>
                    )}
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </section>

      {/* 시뮬레이터 미리보기 */}
      <section className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <Sparkles className="text-indigo-500" size={24} />
          챕터별 시뮬레이터
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              RDF Triple Editor
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              주어-술어-목적어 구조의 RDF 트리플을 시각적으로 생성하고 편집
            </p>
            <span className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
              Chapter 4에서 체험 가능
            </span>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              3D Knowledge Graph
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              복잡한 지식 관계를 3차원 공간에서 직관적으로 탐색
            </p>
            <span className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
              Chapter 12에서 체험 가능
            </span>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              SPARQL Playground
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              실시간으로 SPARQL 쿼리를 작성하고 결과 확인
            </p>
            <span className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
              Chapter 7에서 체험 가능
            </span>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              추론 엔진 시뮬레이터
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              온톨로지 추론 과정을 단계별로 시각화하여 이해
            </p>
            <span className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
              Chapter 6에서 체험 가능
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}