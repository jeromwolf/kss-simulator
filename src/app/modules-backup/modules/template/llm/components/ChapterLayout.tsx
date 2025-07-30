/**
 * Chapter Layout Component
 * Wraps chapter content with navigation and progress tracking
 */

'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Clock, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChapterLayoutProps } from '../types/components';
import { getChapterById, getNextChapter, getPreviousChapter } from '../metadata';
import { useProgress } from '../hooks/useProgress';

export function ChapterLayout({ 
  children, 
  chapterId,
  showToc = true,
  showProgress = true 
}: ChapterLayoutProps) {
  const router = useRouter();
  const { updateTimeSpent, markChapterComplete, getChapterProgress } = useProgress('llm');
  
  const chapter = getChapterById(chapterId);
  const nextChapter = getNextChapter(chapterId);
  const previousChapter = getPreviousChapter(chapterId);
  const chapterProgress = getChapterProgress(chapterId);

  // Track time spent on chapter
  useEffect(() => {
    const startTime = Date.now();
    
    return () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      updateTimeSpent(chapterId, timeSpent);
    };
  }, [chapterId, updateTimeSpent]);

  if (!chapter) {
    return <div>챕터를 찾을 수 없습니다.</div>;
  }

  const handleComplete = () => {
    markChapterComplete(chapterId);
    if (nextChapter) {
      router.push(`/modules/llm/${nextChapter.id}`);
    } else {
      router.push('/modules/llm');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Chapter Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 mb-8">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => router.push('/modules/llm')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 font-semibold">
                  {chapter.number}
                </span>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {chapter.title}
                </h1>
                {chapterProgress?.completed && (
                  <span className="px-2 py-1 text-xs font-medium text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900 rounded-full">
                    완료
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 ml-14">
            {chapter.description}
          </p>

          <div className="flex items-center gap-6 mt-4 ml-14 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              예상 시간: {chapter.estimatedTime}분
            </span>
            <span className="flex items-center gap-1">
              <Target className="w-4 h-4" />
              학습 목표: {chapter.objectives.length}개
            </span>
          </div>
        </div>
      </header>

      {/* Learning Objectives */}
      {showProgress && (
        <div className="max-w-4xl mx-auto px-4 mb-8">
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-3 flex items-center gap-2">
              <Target className="w-5 h-5" />
              학습 목표
            </h2>
            <ul className="space-y-2">
              {chapter.objectives.map((objective, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-purple-200 dark:bg-purple-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-purple-700 dark:text-purple-200">
                      {index + 1}
                    </span>
                  </div>
                  <span className="text-purple-800 dark:text-purple-200">{objective}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 pb-20">
        {children}
      </main>

      {/* Chapter Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Previous Chapter */}
            {previousChapter ? (
              <button
                onClick={() => router.push(`/modules/llm/${previousChapter.id}`)}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="hidden sm:inline">{previousChapter.title}</span>
                <span className="sm:hidden">이전</span>
              </button>
            ) : (
              <div />
            )}

            {/* Complete Chapter */}
            {!chapterProgress?.completed && (
              <button
                onClick={handleComplete}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
              >
                챕터 완료
              </button>
            )}

            {/* Next Chapter */}
            {nextChapter ? (
              <button
                onClick={() => router.push(`/modules/llm/${nextChapter.id}`)}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <span className="hidden sm:inline">{nextChapter.title}</span>
                <span className="sm:hidden">다음</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={() => router.push('/modules/llm')}
                className="flex items-center gap-2 px-4 py-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
              >
                모듈 홈으로
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}