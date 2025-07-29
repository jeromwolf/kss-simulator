'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';

interface VideoSection {
  title: string;
  content: string;
  narration: string;
  keyPoints?: string[];
  examples?: string[];
  charts?: {
    type: string;
    title: string;
    description: string;
  }[];
}

interface VideoPreviewProps {
  topicTitle: string;
  sections: VideoSection[];
  style: 'professional' | 'educational' | 'dynamic';
  moduleColor: string;
}

export const VideoPreview: React.FC<VideoPreviewProps> = ({
  topicTitle,
  sections,
  style,
  moduleColor
}) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            // 다음 섹션으로 이동
            if (currentSection < sections.length - 1) {
              setCurrentSection(currentSection + 1);
              return 0;
            } else {
              setIsPlaying(false);
              return 100;
            }
          }
          return prev + 2; // 5초에 100% 도달
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentSection, sections.length]);

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      setProgress(0);
    }
  };

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
      setProgress(0);
    }
  };

  const getGradientColors = () => {
    if (moduleColor.includes('blue')) return 'from-blue-600 to-indigo-600';
    if (moduleColor.includes('green')) return 'from-green-600 to-emerald-600';
    if (moduleColor.includes('purple')) return 'from-purple-600 to-pink-600';
    return 'from-gray-600 to-gray-800';
  };

  const section = sections[currentSection];

  if (!section || sections.length === 0) {
    return (
      <div className="w-full h-full bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4 mx-auto">
            <Play className="w-8 h-8 text-gray-600" />
          </div>
          <p className="text-gray-400">비디오 콘텐츠를 준비 중입니다...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-black relative overflow-hidden">
      {/* 배경 */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black">
        <div className="absolute inset-0 bg-grid-white/5" style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* 콘텐츠 */}
      <div className="relative h-full flex flex-col overflow-hidden">
        {/* 헤더 */}
        <div className="p-4">
          <div className={`inline-block px-3 py-1 rounded bg-gradient-to-r ${getGradientColors()} text-white text-xs font-medium mb-2`}>
            섹션 {currentSection + 1} / {sections.length}
          </div>
          <h1 className="text-xl font-bold text-white mb-1">{section.title}</h1>
          <p className="text-sm text-gray-400">{topicTitle}</p>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="flex-1 px-4 overflow-y-auto">
          <div className="text-sm text-gray-300 leading-relaxed mb-3">
            {section.content}
          </div>

          {/* 키포인트 */}
          {section.keyPoints && section.keyPoints.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-blue-400 mb-3">핵심 포인트</h3>
              <div className="space-y-2">
                {section.keyPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-3" style={{
                    opacity: progress > (index * 30) ? 1 : 0.3,
                    transition: 'opacity 0.5s'
                  }}>
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-gray-300 text-sm">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 차트 표시 */}
          {section.charts && section.charts.length > 0 && (
            <div className="mb-4 p-4 bg-gray-800/50 rounded-lg">
              <h3 className="text-lg font-semibold text-green-400 mb-2">차트 분석</h3>
              <div className="w-full h-32 bg-gray-900 rounded flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mb-3 mx-auto">
                    <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                  <p className="text-gray-400">{section.charts[0].title}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 컨트롤 바 */}
        <div className="p-4 bg-black/50 backdrop-blur">
          {/* 진행 바 */}
          <div className="mb-4">
            <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* 컨트롤 버튼 */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentSection === 0}
              className="p-2 text-white hover:bg-white/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-3 bg-white/20 hover:bg-white/30 rounded-full text-white"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
            </button>
            
            <button
              onClick={handleNext}
              disabled={currentSection === sections.length - 1}
              className="p-2 text-white hover:bg-white/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};