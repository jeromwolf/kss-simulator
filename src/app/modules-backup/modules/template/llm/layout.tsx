/**
 * LLM Module Layout Component
 */

import React from 'react';
import { ChapterSidebar } from './components/ChapterSidebar';
import { ProgressTracker } from './components/ProgressTracker';
import { LLM_MODULE_METADATA } from './metadata';

interface LLMLayoutProps {
  children: React.ReactNode;
}

export default function LLMLayout({ children }: LLMLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex w-72 flex-col">
            <div className="flex min-h-0 flex-1 flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
              <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                {/* Module Header */}
                <div className="px-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {LLM_MODULE_METADATA.title}
                  </h2>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {LLM_MODULE_METADATA.totalChapters}개 챕터 • {LLM_MODULE_METADATA.estimatedTotalTime}시간
                  </p>
                </div>

                {/* Progress Tracker */}
                <div className="px-6 mb-6">
                  <ProgressTracker moduleId={LLM_MODULE_METADATA.id} />
                </div>

                {/* Chapter Navigation */}
                <nav className="flex-1 px-3">
                  <ChapterSidebar
                    chapters={LLM_MODULE_METADATA.chapters.map(chapter => ({
                      id: chapter.id,
                      number: chapter.number,
                      title: chapter.title,
                    }))}
                    currentChapterId=""
                    onChapterSelect={(chapterId) => {
                      // Navigation will be handled by Next.js router
                      window.location.href = `/modules/llm/${chapterId}`;
                    }}
                  />
                </nav>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}