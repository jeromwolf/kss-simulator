/**
 * LLM Module Landing Page
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { Brain, Clock, Target, ChevronRight, BookOpen, Cpu, BarChart3 } from 'lucide-react';
import { LLM_MODULE_METADATA } from './metadata';
import { useProgress } from './hooks/useProgress';

export default function LLMModulePage() {
  const { moduleProgress } = useProgress(LLM_MODULE_METADATA.id);
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 bg-purple-100 dark:bg-purple-900 rounded-lg">
            <Brain className="w-8 h-8 text-purple-600 dark:text-purple-300" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              {LLM_MODULE_METADATA.title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
              {LLM_MODULE_METADATA.description}
            </p>
          </div>
        </div>

        {/* Module Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">총 챕터</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {LLM_MODULE_METADATA.totalChapters}개
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">예상 시간</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {LLM_MODULE_METADATA.estimatedTotalTime}시간
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">난이도</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                  {LLM_MODULE_METADATA.difficulty === 'intermediate' ? '중급' : LLM_MODULE_METADATA.difficulty}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {moduleProgress && moduleProgress.overallProgress > 0 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">전체 진도</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {moduleProgress.overallProgress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${moduleProgress.overallProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Learning Outcomes */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Target className="w-6 h-6" />
          학습 목표
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <ul className="space-y-3">
            {LLM_MODULE_METADATA.learningOutcomes.map((outcome, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="mt-1 w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-semibold text-purple-600 dark:text-purple-300">
                    {index + 1}
                  </span>
                </div>
                <span className="text-gray-700 dark:text-gray-300">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Prerequisites */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Cpu className="w-6 h-6" />
          선수 지식
        </h2>
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
          <p className="text-sm text-amber-800 dark:text-amber-200 mb-4">
            이 모듈을 효과적으로 학습하기 위해 다음 지식이 필요합니다:
          </p>
          <ul className="space-y-2">
            {LLM_MODULE_METADATA.prerequisites.map((prereq, index) => (
              <li key={index} className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
                <span className="w-1.5 h-1.5 bg-amber-600 dark:bg-amber-400 rounded-full" />
                {prereq}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Chapter List */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <BookOpen className="w-6 h-6" />
          커리큘럼
        </h2>
        <div className="space-y-4">
          {LLM_MODULE_METADATA.chapters.map((chapter) => {
            const isCompleted = moduleProgress?.chaptersProgress[chapter.id]?.completed;
            
            return (
              <Link
                key={chapter.id}
                href={`/modules/llm/${chapter.id}`}
                className="block bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:border-purple-300 dark:hover:border-purple-700 transition-colors group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 font-semibold text-sm">
                        {chapter.number}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {chapter.title}
                      </h3>
                      {isCompleted && (
                        <span className="px-2 py-1 text-xs font-medium text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900 rounded-full">
                          완료
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {chapter.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {chapter.estimatedTime}분
                      </span>
                      <span>•</span>
                      <span>{chapter.keywords.slice(0, 3).join(', ')}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors flex-shrink-0 mt-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <div className="text-center py-8">
        <Link
          href={`/modules/llm/${LLM_MODULE_METADATA.chapters[0].id}`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
        >
          학습 시작하기
          <ChevronRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}