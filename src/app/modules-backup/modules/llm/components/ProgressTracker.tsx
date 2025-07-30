/**
 * Progress Tracker Component
 * Displays overall module progress and statistics
 */

'use client';

import React from 'react';
import { Trophy, Clock, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProgressTrackerProps } from '../types/components';
import { useProgress } from '../hooks/useProgress';

export function ProgressTracker({ 
  moduleId, 
  className,
  showDetails = true 
}: ProgressTrackerProps) {
  const { moduleProgress } = useProgress(moduleId);

  if (!moduleProgress) {
    return (
      <div className={cn("p-4 bg-gray-100 dark:bg-gray-800 rounded-lg", className)}>
        <div className="animate-pulse">
          <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
        </div>
      </div>
    );
  }

  const completedChapters = Object.values(moduleProgress.chaptersProgress).filter(
    chapter => chapter.completed
  ).length;
  const totalChapters = Object.keys(moduleProgress.chaptersProgress).length || 12; // fallback to metadata
  const hoursSpent = Math.round(moduleProgress.totalTimeSpent / 3600);
  const minutesSpent = Math.round((moduleProgress.totalTimeSpent % 3600) / 60);

  return (
    <div className={cn("space-y-4", className)}>
      {/* Progress Bar */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            진행률
          </span>
          <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
            {moduleProgress.overallProgress}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${moduleProgress.overallProgress}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      {showDetails && (
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="space-y-1">
            <div className="flex justify-center">
              <Trophy className="w-5 h-5 text-amber-500" />
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {completedChapters}/{totalChapters}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">완료</p>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-center">
              <Clock className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {hoursSpent > 0 ? `${hoursSpent}시간` : `${minutesSpent}분`}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">학습</p>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-center">
              <Target className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {totalChapters - completedChapters}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">남음</p>
          </div>
        </div>
      )}

      {/* Motivational Message */}
      {moduleProgress.overallProgress > 0 && moduleProgress.overallProgress < 100 && (
        <div className="text-center">
          <p className="text-xs text-gray-600 dark:text-gray-400 italic">
            {moduleProgress.overallProgress < 25 && "좋은 시작입니다! 계속 진행해보세요."}
            {moduleProgress.overallProgress >= 25 && moduleProgress.overallProgress < 50 && "순조롭게 진행중입니다!"}
            {moduleProgress.overallProgress >= 50 && moduleProgress.overallProgress < 75 && "절반 이상 완료했습니다. 훌륭해요!"}
            {moduleProgress.overallProgress >= 75 && "거의 다 왔습니다. 조금만 더 힘내세요!"}
          </p>
        </div>
      )}
    </div>
  );
}