'use client';

import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface AudioControlsProps {
  onPlay?: () => void;
  onPause?: () => void;
  onToggleMute?: () => void;
  isPlaying?: boolean;
  isMuted?: boolean;
}

export const AudioControls: React.FC<AudioControlsProps> = ({
  onPlay,
  onPause,
  onToggleMute,
  isPlaying = false,
  isMuted = false
}) => {
  return (
    <div className="flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
      <button
        onClick={isPlaying ? onPause : onPlay}
        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
        title={isPlaying ? "일시정지" : "재생"}
      >
        {isPlaying ? (
          <Pause className="w-4 h-4" />
        ) : (
          <Play className="w-4 h-4" />
        )}
      </button>
      
      <button
        onClick={onToggleMute}
        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
        title={isMuted ? "음소거 해제" : "음소거"}
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4" />
        ) : (
          <Volume2 className="w-4 h-4" />
        )}
      </button>
      
      <div className="text-xs text-gray-500 dark:text-gray-400 ml-2">
        <span className="line-through">나레이션 음성</span> (품질 개선 중 🚧)
      </div>
    </div>
  );
};