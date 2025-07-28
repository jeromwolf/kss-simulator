'use client';

import dynamic from 'next/dynamic';
import { Loader, BookOpen, Film, Volume2 } from 'lucide-react';
import { useState } from 'react';

// Remotion은 클라이언트 사이드에서만 작동
const VideoCreator = dynamic(
  () => import('@/components/video-creator/VideoCreator').then(mod => ({ default: mod.VideoCreator })),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    )
  }
);

const ChapterVideoCreator = dynamic(
  () => import('@/components/video-creator/ChapterVideoCreator').then(mod => ({ default: mod.ChapterVideoCreator })),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    )
  }
);

const AudioTestComponent = dynamic(
  () => import('@/components/video-creator/AudioTestComponent').then(mod => ({ default: mod.AudioTestComponent })),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    )
  }
);

export default function VideoCreatorPage() {
  const [mode, setMode] = useState<'triple' | 'chapter' | 'audio-test'>('chapter');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 모드 선택 탭 */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <div className="flex gap-2 bg-white dark:bg-gray-800 p-1 rounded-lg shadow">
          <button
            onClick={() => setMode('chapter')}
            className={`flex-1 px-4 py-2 rounded-md transition-colors flex items-center justify-center gap-2 ${
              mode === 'chapter'
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            챕터별 비디오
          </button>
          <button
            onClick={() => setMode('triple')}
            className={`flex-1 px-4 py-2 rounded-md transition-colors flex items-center justify-center gap-2 ${
              mode === 'triple'
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Film className="w-4 h-4" />
            트리플 비디오
          </button>
          <button
            onClick={() => setMode('audio-test')}
            className={`flex-1 px-4 py-2 rounded-md transition-colors flex items-center justify-center gap-2 ${
              mode === 'audio-test'
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            오디오 테스트
          </button>
        </div>
      </div>

      {/* 선택된 모드에 따른 컴포넌트 렌더링 */}
      {mode === 'chapter' && <ChapterVideoCreator />}
      {mode === 'triple' && <VideoCreator />}
      {mode === 'audio-test' && (
        <div className="max-w-4xl mx-auto p-6">
          <AudioTestComponent />
        </div>
      )}
    </div>
  );
}