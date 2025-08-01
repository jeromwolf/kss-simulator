'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Play, Clock, Target, BookOpen, FileText, Search, Database, Sparkles, CheckCircle2 } from 'lucide-react'
import { ragModule } from './metadata'
import DocumentUploader from './components/DocumentUploader'
import RAGPlayground from './components/RAGPlayground'

export default function RAGMainPage() {
  const [completedChapters, setCompletedChapters] = useState<string[]>([])
  
  const progress = (completedChapters.length / ragModule.chapters.length) * 100

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/50 to-green-100/50 dark:from-emerald-900/20 dark:to-green-900/20 -z-10"></div>
        
        <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white text-4xl mb-6 shadow-lg">
          {ragModule.icon}
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {ragModule.nameKo}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          {ragModule.description}
        </p>
        
        {/* Progress */}
        <div className="max-w-md mx-auto mb-8">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>학습 진도</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-green-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <Link
          href={`/modules/rag/${ragModule.chapters[0].id}`}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
        >
          <Play size={20} />
          학습 시작하기
        </Link>
      </section>

      {/* Quick Demo Section */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <FileText className="text-emerald-500" size={24} />
          빠른 체험: 문서 업로드
        </h2>
        <DocumentUploader />
      </section>

      {/* 학습 목표 */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <Target className="text-emerald-500" size={24} />
          학습 목표
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">핵심 개념 이해</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-green-500 mt-1" />
                LLM의 한계점과 RAG의 필요성
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-green-500 mt-1" />
                문서 청킹과 임베딩 전략
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-green-500 mt-1" />
                벡터 검색의 작동 원리
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">실전 구현</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-green-500 mt-1" />
                실제 RAG 시스템 구축
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-green-500 mt-1" />
                성능 최적화 기법
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-green-500 mt-1" />
                프로덕션 배포 전략
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* RAG Pipeline Visualization */}
      <section className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <Sparkles className="text-emerald-500" size={24} />
          RAG 파이프라인
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1 text-center">
            <div className="w-16 h-16 mx-auto bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md mb-2">
              <FileText className="text-emerald-500" size={24} />
            </div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">문서 입력</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">PDF, Word, HTML</p>
          </div>
          
          <div className="text-gray-400 dark:text-gray-600">→</div>
          
          <div className="flex-1 text-center">
            <div className="w-16 h-16 mx-auto bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md mb-2">
              <Search className="text-emerald-500" size={24} />
            </div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">임베딩 & 검색</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">벡터화 및 유사도 검색</p>
          </div>
          
          <div className="text-gray-400 dark:text-gray-600">→</div>
          
          <div className="flex-1 text-center">
            <div className="w-16 h-16 mx-auto bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md mb-2">
              <Database className="text-emerald-500" size={24} />
            </div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">컨텍스트 생성</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">관련 정보 추출</p>
          </div>
          
          <div className="text-gray-400 dark:text-gray-600">→</div>
          
          <div className="flex-1 text-center">
            <div className="w-16 h-16 mx-auto bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md mb-2">
              <Sparkles className="text-emerald-500" size={24} />
            </div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">답변 생성</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">LLM 기반 응답</p>
          </div>
        </div>
      </section>

      {/* 챕터 목록 */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <BookOpen className="text-emerald-500" size={24} />
          챕터 목록
        </h2>
        <div className="grid gap-4">
          {ragModule.chapters.map((chapter, index) => {
            const isCompleted = completedChapters.includes(chapter.id)
            const isLocked = index > 0 && !completedChapters.includes(ragModule.chapters[index - 1].id)
            
            return (
              <Link
                key={chapter.id}
                href={isLocked ? '#' : `/modules/rag/${chapter.id}`}
                className={`block p-6 rounded-xl border transition-all duration-200 ${
                  isLocked 
                    ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 cursor-not-allowed opacity-60'
                    : isCompleted
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700 hover:shadow-md'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-600'
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
                          : 'bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400'
                      }`}>
                        {isCompleted ? <CheckCircle2 size={16} /> : index + 1}
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
                    <div className="text-emerald-500">
                      <Play size={20} />
                    </div>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* RAG Pipeline Playground */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <Database className="text-emerald-500" size={24} />
          RAG 파이프라인 체험
        </h2>
        <RAGPlayground />
      </section>

      {/* 시뮬레이터 미리보기 */}
      <section className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <Sparkles className="text-emerald-500" size={24} />
          챕터별 시뮬레이터
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              청킹 데모
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              5가지 청킹 전략을 실시간으로 비교하고 최적의 방법을 선택
            </p>
            <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
              Chapter 2에서 체험 가능
            </span>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              임베딩 시각화
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              텍스트가 벡터 공간에서 어떻게 표현되는지 2D로 시각화
            </p>
            <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
              Chapter 3에서 체험 가능
            </span>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              벡터 검색 데모
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              벡터, 키워드, 하이브리드 검색 방식을 비교 체험
            </p>
            <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
              Chapter 4에서 체험 가능
            </span>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              전체 파이프라인
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              문서 업로드부터 답변 생성까지 전 과정을 한눈에
            </p>
            <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
              이 페이지에서 바로 체험
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}