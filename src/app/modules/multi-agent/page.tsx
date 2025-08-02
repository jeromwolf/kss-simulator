'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Users, ArrowRight, Clock, Target, BookOpen, Zap, Shield, Brain, MessageCircle, Network } from 'lucide-react';
import { multiAgentMetadata } from './metadata';

export default function MultiAgentPage() {
  const [progress, setProgress] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const savedProgress = localStorage.getItem('multi-agent-progress');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);

  const completedChapters = Object.values(progress).filter(Boolean).length;
  const progressPercentage = (completedChapters / multiAgentMetadata.chapters.length) * 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <Link 
          href="/"
          className="inline-flex items-center text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 mb-6"
        >
          <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
          홈으로 돌아가기
        </Link>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <Users className="w-8 h-8" />
            </div>
            <div className="ml-6">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                {multiAgentMetadata.title}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mt-2">
                {multiAgentMetadata.description}
              </p>
            </div>
          </div>

          {/* Module Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
              <div className="flex items-center text-orange-600 dark:text-orange-400">
                <Clock className="w-5 h-5 mr-2" />
                <span className="font-semibold">{multiAgentMetadata.duration}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">총 학습시간</p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
              <div className="flex items-center text-orange-600 dark:text-orange-400">
                <BookOpen className="w-5 h-5 mr-2" />
                <span className="font-semibold">{multiAgentMetadata.chapters.length}개 챕터</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">학습 콘텐츠</p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
              <div className="flex items-center text-orange-600 dark:text-orange-400">
                <Zap className="w-5 h-5 mr-2" />
                <span className="font-semibold">고급</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">난이도</p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
              <div className="flex items-center text-orange-600 dark:text-orange-400">
                <Shield className="w-5 h-5 mr-2" />
                <span className="font-semibold">{multiAgentMetadata.tools.length}개 도구</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">시뮬레이터</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">학습 진도</span>
              <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
                {completedChapters}/{multiAgentMetadata.chapters.length} 완료 ({Math.round(progressPercentage)}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Prerequisites */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">선수 지식</h3>
            <div className="flex flex-wrap gap-2">
              {multiAgentMetadata.prerequisites.map((prereq, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                >
                  {prereq}
                </span>
              ))}
            </div>
          </div>

          {/* Learning Outcomes */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">학습 목표</h3>
            <ul className="space-y-2">
              {multiAgentMetadata.learningOutcomes.map((outcome, index) => (
                <li key={index} className="flex items-start">
                  <Target className="w-5 h-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Chapters Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">학습 챕터</h2>
        <div className="grid gap-4">
          {multiAgentMetadata.chapters.map((chapter) => (
            <Link
              key={chapter.id}
              href={`/modules/multi-agent/${chapter.id}`}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl font-bold text-orange-500 mr-3">
                      {String(chapter.number).padStart(2, '0')}
                    </span>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                      {chapter.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    {chapter.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center text-gray-500 dark:text-gray-400">
                      <Clock className="w-4 h-4 mr-1" />
                      {chapter.duration}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {chapter.topics.slice(0, 3).map((topic, idx) => (
                        <span key={idx} className="px-2 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 rounded text-xs">
                          {topic}
                        </span>
                      ))}
                      {chapter.topics.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs">
                          +{chapter.topics.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="ml-4">
                  {progress[chapter.id] ? (
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center group-hover:bg-orange-100 dark:group-hover:bg-orange-900/20 transition-colors">
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-orange-600 dark:group-hover:text-orange-400" />
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Tools Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">실습 도구</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {multiAgentMetadata.tools.map((tool, index) => (
            <Link
              key={index}
              href={tool.path}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6"
            >
              <div className="flex items-center mb-3">
                {index === 0 ? (
                  <Network className="w-8 h-8 text-orange-500 mr-3" />
                ) : index === 1 ? (
                  <Brain className="w-8 h-8 text-orange-500 mr-3" />
                ) : (
                  <MessageCircle className="w-8 h-8 text-orange-500 mr-3" />
                )}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  {tool.name}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}