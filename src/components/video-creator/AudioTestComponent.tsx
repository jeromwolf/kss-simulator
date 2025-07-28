'use client';

import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Download } from 'lucide-react';

export const AudioTestComponent: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const testTexts = [
    "안녕하세요. KSS 온톨로지 강의입니다.",
    "온톨로지는 지식을 체계적으로 표현하는 방법입니다.",
    "RDF 트리플은 주어, 서술어, 목적어로 구성됩니다.",
  ];

  const playTestAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  const generateTTS = async (text: string) => {
    try {
      const response = await fetch('/api/generate-audio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice: 'female' }),
      });
      const data = await response.json();
      alert(`TTS 생성 완료: ${data.message}`);
    } catch (error) {
      console.error('TTS 생성 실패:', error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
      <h2 className="text-xl font-semibold mb-4">오디오 테스트</h2>
      
      <div className="space-y-4">
        {/* 오디오 플레이어 */}
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={playTestAudio}
              className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            
            <div className="flex items-center gap-2 flex-1">
              <button onClick={toggleMute}>
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="flex-1"
              />
              <span className="text-sm">{Math.round(volume * 100)}%</span>
            </div>
          </div>
          
          <audio
            ref={audioRef}
            src="/sounds/silence.mp3"
            onEnded={() => setIsPlaying(false)}
          />
        </div>

        {/* TTS 테스트 */}
        <div className="space-y-3">
          <h3 className="font-medium">TTS 테스트 텍스트</h3>
          {testTexts.map((text, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
              <p className="text-sm flex-1">{text}</p>
              <button
                onClick={() => generateTTS(text)}
                className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
              >
                생성
              </button>
            </div>
          ))}
        </div>

        {/* 오디오 파일 요구사항 */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
          <h3 className="font-medium mb-2">필요한 오디오 파일</h3>
          <ul className="text-sm space-y-1">
            <li>✅ /public/sounds/silence.mp3 - 무음 파일 (테스트용)</li>
            <li>📢 /public/sounds/narration-*.mp3 - TTS 생성 파일들</li>
            <li>🎵 /public/sounds/background-music.mp3 - 배경음악</li>
            <li>🔊 /public/sounds/whoosh.mp3 - 효과음</li>
          </ul>
          <p className="mt-3 text-xs text-gray-600 dark:text-gray-400">
            실제 오디오를 재생하려면 위 경로에 MP3 파일을 추가해야 합니다.
          </p>
        </div>

        {/* 구현 가이드 */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <h3 className="font-medium mb-2">TTS 구현 방법</h3>
          <ol className="text-sm space-y-2 list-decimal list-inside">
            <li>Google Cloud Text-to-Speech API 키 설정</li>
            <li>API 엔드포인트에서 텍스트를 오디오로 변환</li>
            <li>생성된 오디오 파일을 public/sounds에 저장</li>
            <li>Remotion 컴포지션에서 해당 파일 경로 사용</li>
          </ol>
        </div>
      </div>
    </div>
  );
};