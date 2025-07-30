'use client';

import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Clock, ChevronRight, CheckCircle } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  watched?: boolean;
}

const stockVideos: Video[] = [
  // 금융시장의 이해
  {
    id: 'market-basics-1',
    title: '주식시장의 기본 구조 이해하기',
    description: 'KOSPI, KOSDAQ, KONEX 시장의 특징과 차이점을 알아봅니다',
    thumbnailUrl: 'https://img.youtube.com/vi/7lPn0vHzONE/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/7lPn0vHzONE',
    duration: '15:30',
    category: '금융시장의 이해',
    difficulty: 'beginner',
    tags: ['주식시장', 'KOSPI', 'KOSDAQ', '기초']
  },
  {
    id: 'market-basics-2',
    title: '주식 거래 시간과 호가 시스템',
    description: '정규시장, 시간외거래, 호가 체결 원리를 상세히 설명합니다',
    thumbnailUrl: 'https://img.youtube.com/vi/B7iFnHyM7jY/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/B7iFnHyM7jY',
    duration: '12:45',
    category: '금융시장의 이해',
    difficulty: 'beginner',
    tags: ['거래시간', '호가', '체결']
  },
  
  // 기본적 분석
  {
    id: 'fundamental-1',
    title: '재무제표 읽는 법 - 손익계산서 편',
    description: '매출, 영업이익, 순이익 등 손익계산서의 핵심 항목 분석',
    thumbnailUrl: 'https://img.youtube.com/vi/t_TYiz8VW74/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/t_TYiz8VW74',
    duration: '20:15',
    category: '기본적 분석',
    difficulty: 'intermediate',
    tags: ['재무제표', '손익계산서', '분석']
  },
  {
    id: 'fundamental-2',
    title: 'PER, PBR, ROE 완벽 이해',
    description: '주요 투자지표의 의미와 활용법을 실전 예시와 함께 설명',
    thumbnailUrl: 'https://img.youtube.com/vi/aTa6h37BbWE/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/aTa6h37BbWE',
    duration: '18:00',
    category: '기본적 분석',
    difficulty: 'intermediate',
    tags: ['PER', 'PBR', 'ROE', '투자지표']
  },
  {
    id: 'fundamental-3',
    title: 'DART 공시 활용하기',
    description: '전자공시시스템(DART)에서 중요 정보를 찾고 분석하는 방법',
    thumbnailUrl: 'https://img.youtube.com/vi/YoxAqBAjfLs/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/YoxAqBAjfLs',
    duration: '16:30',
    category: '기본적 분석',
    difficulty: 'intermediate',
    tags: ['DART', '공시', '정보수집']
  },
  
  // 기술적 분석
  {
    id: 'technical-1',
    title: '캔들차트 패턴 마스터하기',
    description: '망치형, 도지, 샛별형 등 주요 캔들 패턴과 매매 신호',
    thumbnailUrl: 'https://img.youtube.com/vi/W7x4gUG3iVQ/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/W7x4gUG3iVQ',
    duration: '22:00',
    category: '기술적 분석',
    difficulty: 'intermediate',
    tags: ['캔들차트', '패턴', '차트분석']
  },
  {
    id: 'technical-2',
    title: '이동평균선 활용 전략',
    description: '5일선, 20일선, 60일선을 활용한 매매 타이밍 포착',
    thumbnailUrl: 'https://img.youtube.com/vi/5y9V-R1Y4aE/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/5y9V-R1Y4aE',
    duration: '19:45',
    category: '기술적 분석',
    difficulty: 'intermediate',
    tags: ['이동평균선', '골든크로스', '데드크로스']
  },
  {
    id: 'technical-3',
    title: 'RSI와 MACD 실전 활용법',
    description: '모멘텀 지표를 활용한 과매수/과매도 구간 판단과 매매',
    thumbnailUrl: 'https://img.youtube.com/vi/2cXfgPxqnoA/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/2cXfgPxqnoA',
    duration: '24:30',
    category: '기술적 분석',
    difficulty: 'advanced',
    tags: ['RSI', 'MACD', '모멘텀지표']
  },
  
  // 실전 투자 전략
  {
    id: 'strategy-1',
    title: '가치투자 vs 성장투자 비교분석',
    description: '두 가지 투자 철학의 차이점과 각각의 장단점 분석',
    thumbnailUrl: 'https://img.youtube.com/vi/0ZBP34z9Vs0/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/0ZBP34z9Vs0',
    duration: '25:00',
    category: '실전 투자 전략',
    difficulty: 'advanced',
    tags: ['가치투자', '성장투자', '투자철학']
  },
  {
    id: 'strategy-2',
    title: '포트폴리오 구성의 기술',
    description: '분산투자와 리스크 관리를 위한 포트폴리오 구성 방법',
    thumbnailUrl: 'https://img.youtube.com/vi/L0fxX_tDSXg/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/L0fxX_tDSXg',
    duration: '21:15',
    category: '실전 투자 전략',
    difficulty: 'advanced',
    tags: ['포트폴리오', '분산투자', '리스크관리']
  },
  {
    id: 'strategy-3',
    title: '손절매와 익절매 타이밍',
    description: '성공적인 투자를 위한 매도 전략과 심리 관리',
    thumbnailUrl: 'https://img.youtube.com/vi/hCT_R9qI6kM/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/hCT_R9qI6kM',
    duration: '17:30',
    category: '실전 투자 전략',
    difficulty: 'intermediate',
    tags: ['손절매', '익절매', '매도전략']
  },
  
  // 투자 심리
  {
    id: 'psychology-1',
    title: '투자 심리 극복하기',
    description: '탐욕과 공포를 다스리는 투자 심리학',
    thumbnailUrl: 'https://img.youtube.com/vi/S0Q4gqBUs7c/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/S0Q4gqBUs7c',
    duration: '19:00',
    category: '투자 심리',
    difficulty: 'intermediate',
    tags: ['투자심리', '감정관리', '행동재무학']
  },
  {
    id: 'psychology-2',
    title: '군중심리와 역발상 투자',
    description: '시장의 과열과 공포 국면에서의 투자 전략',
    thumbnailUrl: 'https://img.youtube.com/vi/6wjmEQQ9YJg/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/6wjmEQQ9YJg',
    duration: '16:45',
    category: '투자 심리',
    difficulty: 'advanced',
    tags: ['군중심리', '역발상', '투자전략']
  }
];

export function VideoLearning() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [watchedVideos, setWatchedVideos] = useState<Set<string>>(new Set());
  
  const categories = ['all', ...Array.from(new Set(stockVideos.map(v => v.category)))];
  
  const filteredVideos = selectedCategory === 'all' 
    ? stockVideos 
    : stockVideos.filter(v => v.category === selectedCategory);
    
  const difficultyColors = {
    beginner: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    intermediate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    advanced: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
  };
  
  const difficultyLabels = {
    beginner: '초급',
    intermediate: '중급',
    advanced: '고급'
  };

  const handleVideoComplete = (videoId: string) => {
    setWatchedVideos(prev => new Set([...Array.from(prev), videoId]));
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">비디오 강의</h2>
        <p className="text-gray-600 dark:text-gray-400">
          전문가의 설명과 함께 주식 투자를 체계적으로 학습하세요
        </p>
      </div>
      
      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category === 'all' ? '전체' : category}
            </button>
          ))}
        </div>
      </div>
      
      {/* Progress Summary */}
      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">학습 진행률</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {Math.round((watchedVideos.size / stockVideos.length) * 100)}%
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 dark:text-gray-400">시청 완료</p>
            <p className="text-lg font-semibold">
              {watchedVideos.size} / {stockVideos.length}
            </p>
          </div>
        </div>
      </div>
      
      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map(video => (
          <div
            key={video.id}
            onClick={() => setSelectedVideo(video)}
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video bg-gray-200 dark:bg-gray-700 overflow-hidden">
              <img 
                src={video.thumbnailUrl} 
                alt={video.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/640x360?text=Video+Thumbnail';
                }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <Play className="w-8 h-8 text-gray-800 ml-1" fill="currentColor" />
                </div>
              </div>
              {watchedVideos.has(video.id) && (
                <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
                  <CheckCircle className="w-5 h-5" />
                </div>
              )}
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </div>
            </div>
            
            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {video.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                {video.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded ${difficultyColors[video.difficulty]}`}>
                  {difficultyLabels[video.difficulty]}
                </span>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  {video.duration}
                </div>
              </div>
              
              {/* Tags */}
              <div className="mt-3 flex flex-wrap gap-1">
                {video.tags.slice(0, 3).map(tag => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Video Player Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Video Player Area */}
            <div className="relative aspect-video bg-black">
              <iframe
                src={selectedVideo.videoUrl}
                title={selectedVideo.title}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            
            {/* Video Info */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">{selectedVideo.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedVideo.description}
                  </p>
                </div>
                <button
                  onClick={() => {
                    handleVideoComplete(selectedVideo.id);
                    setSelectedVideo(null);
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  시청 완료
                </button>
              </div>
              
              <div className="flex items-center gap-4">
                <span className={`text-sm px-3 py-1 rounded ${difficultyColors[selectedVideo.difficulty]}`}>
                  {difficultyLabels[selectedVideo.difficulty]}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedVideo.category}
                </span>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedVideo.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}