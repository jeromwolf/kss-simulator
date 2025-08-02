'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bot, Server, ArrowRight, Clock, Target, BookOpen, Zap, Shield } from 'lucide-react';
import { MODULE_METADATA, CHAPTERS, SIMULATORS } from './metadata';

export default function AgentMCPPage() {
  const [progress, setProgress] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const savedProgress = localStorage.getItem('agent-mcp-progress');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);

  const completedChapters = Object.values(progress).filter(Boolean).length;
  const progressPercentage = (completedChapters / CHAPTERS.length) * 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <Link 
          href="/"
          className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 mb-6"
        >
          <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
          홈으로 돌아가기
        </Link>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg">
              {MODULE_METADATA.icon}
            </div>
            <div className="ml-6">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                {MODULE_METADATA.name}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mt-2">
                {MODULE_METADATA.description}
              </p>
            </div>
          </div>

          {/* Module Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
              <div className="flex items-center text-purple-600 dark:text-purple-400">
                <Clock className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">{MODULE_METADATA.totalDuration}</span>
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
              <div className="flex items-center text-purple-600 dark:text-purple-400">
                <BookOpen className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">{CHAPTERS.length}개 챕터</span>
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
              <div className="flex items-center text-purple-600 dark:text-purple-400">
                <Zap className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">{SIMULATORS.length}개 시뮬레이터</span>
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
              <div className="flex items-center text-purple-600 dark:text-purple-400">
                <Target className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">{MODULE_METADATA.level}</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">학습 진도</span>
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                {completedChapters}/{CHAPTERS.length} 완료
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Agent + MCP Architecture */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          🏗️ Agent + MCP 아키텍처
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-4">
                <Bot className="w-10 h-10" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">AI Agent</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                ReAct 패턴과 Tool Use로 자율적 작업 수행
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-4">
                <Server className="w-10 h-10" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">MCP Protocol</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                표준화된 도구/리소스 통합 프로토콜
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-4">
                <Zap className="w-10 h-10" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Integration</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                LangChain + MCP 통합 아키텍처
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chapters */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          📚 학습 챕터
        </h2>
        <div className="grid gap-4">
          {CHAPTERS.map((chapter) => (
            <Link
              key={chapter.id}
              href={`/modules/agent-mcp/${chapter.id}`}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="text-purple-600 dark:text-purple-400 font-bold mr-3">
                      Chapter {chapter.id}
                    </span>
                    {progress[chapter.id] && (
                      <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs px-2 py-1 rounded-full">
                        완료
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {chapter.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    {chapter.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4 mr-1" />
                    {chapter.duration}
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mt-6" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Simulators */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          🎮 인터랙티브 시뮬레이터
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SIMULATORS.map((simulator) => (
            <Link
              key={simulator.id}
              href={`/modules/agent-mcp/simulators/${simulator.id}`}
              className="block"
            >
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white hover:shadow-2xl transition-all">
                <h3 className="text-xl font-bold mb-2">{simulator.name}</h3>
                <p className="text-purple-100 mb-4">{simulator.description}</p>
                <div className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg transition-colors inline-block">
                  시뮬레이터 실행 →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Key Features */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          ✨ 핵심 학습 내용
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <Bot className="w-10 h-10 text-purple-600 dark:text-purple-400 mb-4" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Advanced Agent Patterns</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ReAct, Plan-and-Execute, Self-Reflection 등 고급 패턴
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <Server className="w-10 h-10 text-purple-600 dark:text-purple-400 mb-4" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">MCP Integration</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Claude Desktop과 커스텀 클라이언트에 MCP 통합
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <Shield className="w-10 h-10 text-purple-600 dark:text-purple-400 mb-4" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Production Ready</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              실제 서비스를 위한 배포, 모니터링, 최적화
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}