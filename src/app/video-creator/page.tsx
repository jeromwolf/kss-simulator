'use client';

import dynamic from 'next/dynamic';
import { Loader, BookOpen, Film, Volume2, Zap, TrendingUp, Users, Flame, Youtube } from 'lucide-react';
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

const OntologyShortsCreator = dynamic(
  () => import('@/components/video-creator/OntologyShortsCreator').then(mod => ({ default: mod.OntologyShortsCreator })),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    )
  }
);

const FinancialTermsShortsCreator = dynamic(
  () => import('@/components/video-creator/FinancialTermsShortsCreator').then(mod => ({ default: mod.FinancialTermsShortsCreator })),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    )
  }
);

const FinancialTermsGroupCreator = dynamic(
  () => import('@/components/video-creator/FinancialTermsGroupCreator').then(mod => ({ default: mod.FinancialTermsGroupCreator })),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    )
  }
);

const ViralContentCreator = dynamic(
  () => import('@/components/video-creator/ViralContentCreator').then(mod => ({ default: mod.ViralContentCreator })),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    )
  }
);

const YouTubeContentCreator = dynamic(
  () => import('@/components/video-creator/YouTubeContentCreator').then(mod => ({ default: mod.YouTubeContentCreator })),
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
  const [mode, setMode] = useState<'financial' | 'groups' | 'viral' | 'youtube' | 'shorts' | 'triple' | 'chapter' | 'audio-test'>('viral');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 모드 선택 탭 */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <div className="flex gap-1 bg-white dark:bg-gray-800 p-1 rounded-lg shadow overflow-x-auto">
          <button
            onClick={() => setMode('financial')}
            className={`flex-1 min-w-0 px-3 py-2 rounded-md transition-colors flex items-center justify-center gap-2 text-sm ${
              mode === 'financial'
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            금융 용어
          </button>
          <button
            onClick={() => setMode('groups')}
            className={`flex-1 min-w-0 px-3 py-2 rounded-md transition-colors flex items-center justify-center gap-2 text-sm ${
              mode === 'groups'
                ? 'bg-green-500 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Users className="w-4 h-4" />
            3종 세트
          </button>
          <button
            onClick={() => setMode('viral')}
            className={`flex-1 min-w-0 px-3 py-2 rounded-md transition-colors flex items-center justify-center gap-2 text-sm ${
              mode === 'viral'
                ? 'bg-red-500 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Flame className="w-4 h-4" />
            교육 콘텐츠
          </button>
          <button
            onClick={() => setMode('youtube')}
            className={`flex-1 min-w-0 px-3 py-2 rounded-md transition-colors flex items-center justify-center gap-2 text-sm ${
              mode === 'youtube'
                ? 'bg-red-600 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Youtube className="w-4 h-4" />
            YouTube 자동화
          </button>
          <button
            onClick={() => setMode('shorts')}
            className={`flex-1 min-w-0 px-3 py-2 rounded-md transition-colors flex items-center justify-center gap-2 text-sm ${
              mode === 'shorts'
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Zap className="w-4 h-4" />
            온톨로지 단편
          </button>
          <button
            onClick={() => setMode('chapter')}
            className={`flex-1 min-w-0 px-3 py-2 rounded-md transition-colors flex items-center justify-center gap-2 text-sm ${
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
            className={`flex-1 min-w-0 px-3 py-2 rounded-md transition-colors flex items-center justify-center gap-2 text-sm ${
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
            className={`flex-1 min-w-0 px-3 py-2 rounded-md transition-colors flex items-center justify-center gap-2 text-sm ${
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
      {mode === 'financial' && <FinancialTermsShortsCreator />}
      {mode === 'groups' && <FinancialTermsGroupCreator />}
      {mode === 'viral' && <ViralContentCreator />}
      {mode === 'youtube' && <YouTubeContentCreator />}
      {mode === 'shorts' && <OntologyShortsCreator />}
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