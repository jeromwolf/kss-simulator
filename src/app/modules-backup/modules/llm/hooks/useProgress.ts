/**
 * Progress Management Hook
 * Handles reading and updating module progress from localStorage
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { ModuleProgress, ChapterProgress } from '../types';
import { LLM_MODULE_METADATA } from '../metadata';

const STORAGE_KEY_PREFIX = 'kss_progress_';

export function useProgress(moduleId: string) {
  const [moduleProgress, setModuleProgress] = useState<ModuleProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize progress data
  const initializeProgress = useCallback((): ModuleProgress => {
    const now = new Date();
    const chaptersProgress: Record<string, ChapterProgress> = {};

    // Initialize all chapters with default progress
    LLM_MODULE_METADATA.chapters.forEach(chapter => {
      chaptersProgress[chapter.id] = {
        chapterId: chapter.id,
        completed: false,
        timeSpent: 0,
        lastAccessedAt: now,
      };
    });

    return {
      moduleId,
      startedAt: now,
      lastAccessedAt: now,
      totalTimeSpent: 0,
      chaptersProgress,
      overallProgress: 0,
    };
  }, [moduleId]);

  // Load progress from localStorage
  useEffect(() => {
    const loadProgress = () => {
      try {
        const storageKey = `${STORAGE_KEY_PREFIX}${moduleId}`;
        const stored = localStorage.getItem(storageKey);
        
        if (stored) {
          const parsed = JSON.parse(stored);
          // Convert date strings back to Date objects
          parsed.startedAt = new Date(parsed.startedAt);
          parsed.lastAccessedAt = new Date(parsed.lastAccessedAt);
          
          Object.values(parsed.chaptersProgress).forEach((chapter: any) => {
            chapter.lastAccessedAt = new Date(chapter.lastAccessedAt);
            if (chapter.completedAt) {
              chapter.completedAt = new Date(chapter.completedAt);
            }
          });
          
          setModuleProgress(parsed);
        } else {
          // Initialize new progress
          const newProgress = initializeProgress();
          setModuleProgress(newProgress);
          localStorage.setItem(storageKey, JSON.stringify(newProgress));
        }
      } catch (error) {
        console.error('Error loading progress:', error);
        const newProgress = initializeProgress();
        setModuleProgress(newProgress);
      } finally {
        setIsLoading(false);
      }
    };

    loadProgress();
  }, [moduleId, initializeProgress]);

  // Update chapter progress
  const updateChapterProgress = useCallback((
    chapterId: string,
    updates: Partial<ChapterProgress>
  ) => {
    if (!moduleProgress) return;

    const updatedProgress = { ...moduleProgress };
    const currentChapter = updatedProgress.chaptersProgress[chapterId];
    
    if (!currentChapter) {
      console.error(`Chapter ${chapterId} not found`);
      return;
    }

    // Update chapter data
    updatedProgress.chaptersProgress[chapterId] = {
      ...currentChapter,
      ...updates,
      lastAccessedAt: new Date(),
    };

    // If marking as completed, set completedAt
    if (updates.completed && !currentChapter.completed) {
      updatedProgress.chaptersProgress[chapterId].completedAt = new Date();
    }

    // Update module-level data
    updatedProgress.lastAccessedAt = new Date();
    
    // Recalculate total time spent
    updatedProgress.totalTimeSpent = Object.values(updatedProgress.chaptersProgress)
      .reduce((total, chapter) => total + chapter.timeSpent, 0);

    // Recalculate overall progress
    const completedCount = Object.values(updatedProgress.chaptersProgress)
      .filter(chapter => chapter.completed).length;
    updatedProgress.overallProgress = Math.round(
      (completedCount / LLM_MODULE_METADATA.totalChapters) * 100
    );

    // Save to localStorage
    const storageKey = `${STORAGE_KEY_PREFIX}${moduleId}`;
    localStorage.setItem(storageKey, JSON.stringify(updatedProgress));
    
    setModuleProgress(updatedProgress);
  }, [moduleProgress, moduleId]);

  // Mark chapter as completed
  const markChapterComplete = useCallback((chapterId: string) => {
    updateChapterProgress(chapterId, { completed: true });
  }, [updateChapterProgress]);

  // Update time spent on a chapter
  const updateTimeSpent = useCallback((chapterId: string, additionalTime: number) => {
    if (!moduleProgress?.chaptersProgress[chapterId]) return;
    
    const currentTime = moduleProgress.chaptersProgress[chapterId].timeSpent;
    updateChapterProgress(chapterId, { timeSpent: currentTime + additionalTime });
  }, [moduleProgress, updateChapterProgress]);

  // Add quiz score
  const addQuizScore = useCallback((chapterId: string, quizScore: any) => {
    if (!moduleProgress?.chaptersProgress[chapterId]) return;
    
    const currentScores = moduleProgress.chaptersProgress[chapterId].quizScores || [];
    updateChapterProgress(chapterId, { 
      quizScores: [...currentScores, quizScore] 
    });
  }, [moduleProgress, updateChapterProgress]);

  // Add exercise result
  const addExerciseResult = useCallback((chapterId: string, exerciseResult: any) => {
    if (!moduleProgress?.chaptersProgress[chapterId]) return;
    
    const currentResults = moduleProgress.chaptersProgress[chapterId].exerciseResults || [];
    updateChapterProgress(chapterId, { 
      exerciseResults: [...currentResults, exerciseResult] 
    });
  }, [moduleProgress, updateChapterProgress]);

  // Reset progress
  const resetProgress = useCallback(() => {
    const newProgress = initializeProgress();
    const storageKey = `${STORAGE_KEY_PREFIX}${moduleId}`;
    localStorage.setItem(storageKey, JSON.stringify(newProgress));
    setModuleProgress(newProgress);
  }, [moduleId, initializeProgress]);

  // Get chapter progress
  const getChapterProgress = useCallback((chapterId: string): ChapterProgress | null => {
    return moduleProgress?.chaptersProgress[chapterId] || null;
  }, [moduleProgress]);

  return {
    moduleProgress,
    isLoading,
    updateChapterProgress,
    markChapterComplete,
    updateTimeSpent,
    addQuizScore,
    addExerciseResult,
    resetProgress,
    getChapterProgress,
  };
}