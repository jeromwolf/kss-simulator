'use client';

import React, { useState } from 'react';
import { LineChart, RotateCcw, MessageSquare, Book, PlayCircle, Video } from 'lucide-react';
import { CurriculumRenderer } from './CurriculumRenderer';
import { AdvancedSimulator } from './AdvancedSimulator';
import { AIMentor } from './AIMentor';
import { VideoLearning } from './VideoLearning';
import { VideoCreator } from './VideoCreator';
import Link from 'next/link';

export function StockAnalysisHub() {
  const [viewMode, setViewMode] = useState<'overview' | 'detail' | 'simulator' | 'videos' | 'creator'>('overview');
  const [isMentorOpen, setIsMentorOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation Controls */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold">주식투자분석 시뮬레이터</h1>
              {viewMode !== 'overview' && (
                <button
                  onClick={() => setViewMode('overview')}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  홈으로
                </button>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('overview')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'overview'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                전체 보기
              </button>
              <button
                onClick={() => setViewMode('detail')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'detail'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                상세 커리큘럼
              </button>
              <button
                onClick={() => setViewMode('videos')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  viewMode === 'videos'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                <PlayCircle className="w-4 h-4" />
                비디오 강의
              </button>
              <button
                onClick={() => setViewMode('creator')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  viewMode === 'creator'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                <Video className="w-4 h-4" />
                비디오 생성
              </button>
              <Link
                href="/stock-dictionary"
                className="px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Book className="w-4 h-4" />
                용어 사전
              </Link>
              <button
                onClick={() => setViewMode('simulator')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  viewMode === 'simulator'
                    ? 'bg-green-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                <LineChart className="w-4 h-4" />
                AI 시뮬레이터
              </button>
              <button
                onClick={() => setIsMentorOpen(!isMentorOpen)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  isMentorOpen
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                AI 멘토
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {viewMode === 'simulator' ? (
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <LineChart className="w-8 h-8 text-green-600" />
              AI 기반 주식 투자 시뮬레이터
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              실시간 시장 데이터와 AI 분석을 통한 투자 시뮬레이션
            </p>
          </div>
          <AdvancedSimulator />
        </section>
      ) : viewMode === 'videos' ? (
        <section className="max-w-7xl mx-auto px-4 py-8">
          <VideoLearning />
        </section>
      ) : viewMode === 'creator' ? (
        <section className="max-w-7xl mx-auto px-4 py-8">
          <VideoCreator />
        </section>
      ) : (
        <CurriculumRenderer 
          viewMode={viewMode} 
          onSimulatorClick={() => setViewMode('simulator')}
          setViewMode={setViewMode}
        />
      )}
      
      {/* AI Mentor Chat */}
      <AIMentor 
        isOpen={isMentorOpen}
        onToggle={() => setIsMentorOpen(!isMentorOpen)}
      />
    </div>
  );
}