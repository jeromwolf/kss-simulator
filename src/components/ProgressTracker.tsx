'use client'

import { useEffect, useState } from 'react'

interface ProgressTrackerProps {
  currentChapter: string
  totalChapters: number
}

export default function ProgressTracker({ currentChapter, totalChapters }: ProgressTrackerProps) {
  const [readChapters, setReadChapters] = useState<Set<string>>(new Set())
  
  useEffect(() => {
    // Load progress from localStorage
    const saved = localStorage.getItem('readChapters')
    if (saved) {
      setReadChapters(new Set(JSON.parse(saved)))
    }
  }, [])
  
  useEffect(() => {
    // Mark current chapter as read
    if (currentChapter && currentChapter !== 'intro') {
      setReadChapters(prev => {
        const newSet = new Set(prev)
        newSet.add(currentChapter)
        localStorage.setItem('readChapters', JSON.stringify(Array.from(newSet)))
        return newSet
      })
    }
  }, [currentChapter])
  
  const progress = Math.round((readChapters.size / (totalChapters - 1)) * 100)
  
  return (
    <div className="fixed bottom-6 left-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 z-40">
      <div className="flex items-center gap-3">
        <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
          학습 진도
        </div>
        <div className="flex items-center gap-2">
          <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
            {progress}%
          </span>
        </div>
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        {readChapters.size} / {totalChapters - 1} 챕터 완료
      </div>
    </div>
  )
}