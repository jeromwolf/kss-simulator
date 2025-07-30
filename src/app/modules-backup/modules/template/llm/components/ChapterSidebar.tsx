/**
 * Chapter Sidebar Component
 * Displays the list of chapters with their completion status
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Check, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChapterSidebarProps } from '../types/components';

export function ChapterSidebar({
  chapters,
  currentChapterId,
  onChapterSelect,
  className
}: ChapterSidebarProps) {
  const pathname = usePathname();
  const currentId = currentChapterId || pathname?.split('/').pop();

  return (
    <div className={cn("space-y-1", className)}>
      {chapters.map((chapter, index) => {
        const isActive = chapter.id === currentId;
        const isLocked = index > 0 && !chapters[index - 1].completed && !chapter.completed;
        
        return (
          <button
            key={chapter.id}
            onClick={() => !isLocked && onChapterSelect(chapter.id)}
            disabled={isLocked}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors group",
              isActive
                ? "bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100"
                : isLocked
                ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            )}
          >
            {/* Chapter Number */}
            <div className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold flex-shrink-0",
              isActive
                ? "bg-purple-600 text-white"
                : chapter.completed
                ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                : isLocked
                ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600"
                : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 group-hover:bg-gray-300 dark:group-hover:bg-gray-600"
            )}>
              {chapter.completed ? (
                <Check className="w-4 h-4" />
              ) : isLocked ? (
                <Lock className="w-3 h-3" />
              ) : (
                chapter.number
              )}
            </div>

            {/* Chapter Title */}
            <span className={cn(
              "flex-1 text-left font-medium",
              isActive && "font-semibold"
            )}>
              {chapter.title}
            </span>
          </button>
        );
      })}
    </div>
  );
}