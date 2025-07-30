/**
 * Module Layout Template
 * Customize this layout for your specific module needs
 */

import React from 'react';
import { ChapterSidebar } from '../llm/components/ChapterSidebar';
import { ProgressTracker } from '../llm/components/ProgressTracker';
import { MODULE_METADATA } from './metadata';

interface ModuleLayoutProps {
  children: React.ReactNode;
}

export default function ModuleLayout({ children }: ModuleLayoutProps) {
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
                    {MODULE_METADATA.title}
                  </h2>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {MODULE_METADATA.totalChapters}개 챕터 • {MODULE_METADATA.estimatedTotalTime}시간
                  </p>
                </div>

                {/* Progress Tracker */}
                <div className="px-6 mb-6">
                  <ProgressTracker moduleId={MODULE_METADATA.id} />
                </div>

                {/* Chapter Navigation */}
                <nav className="flex-1 px-3">
                  <ChapterSidebar
                    chapters={MODULE_METADATA.chapters.map(chapter => ({
                      id: chapter.id,
                      number: chapter.number,
                      title: chapter.title,
                    }))}
                    currentChapterId=""
                    onChapterSelect={(chapterId) => {
                      window.location.href = `/modules/${MODULE_METADATA.id}/${chapterId}`;
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