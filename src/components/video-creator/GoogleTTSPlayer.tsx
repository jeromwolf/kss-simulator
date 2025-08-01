'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Download, Loader } from 'lucide-react';
import { GoogleTTS } from '@/lib/google-tts';

interface GoogleTTSPlayerProps {
  text: string;
  termId?: string;
  onAudioReady?: (audioUrl: string) => void;
  className?: string;
}

export const GoogleTTSPlayer: React.FC<GoogleTTSPlayerProps> = ({
  text,
  termId,
  onAudioReady,
  className = ''
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // 오디오 생성 (안전한 버전)
  const generateAudio = async () => {
    if (audioUrl) return; // 이미 생성됨

    setIsGenerating(true);
    setError(null);

    try {
      // 🚨 크래시 방지: 복잡한 SSML 대신 단순한 텍스트 사용
      console.log('TTS 요청 텍스트 길이:', text.length);
      
      // 텍스트 길이 제한 (크래시 방지)
      const safeText = text.length > 500 ? text.substring(0, 500) + '...' : text;
      
      // 단순한 TTS 호출 (SSML 제거)
      const audioData = await GoogleTTS.synthesize(safeText, {
        voice: {
          languageCode: 'ko-KR',
          name: 'ko-KR-Wavenet-A',
          ssmlGender: 'FEMALE'
        },
        audioConfig: {
          audioEncoding: 'MP3',
          speakingRate: 0.9,
          pitch: 0.0,
          volumeGainDb: 0.0
        }
      });

      if (audioData) {
        if (audioData === 'demo-audio-simulated' || audioData === 'demo-audio-fallback') {
          // 데모 모드: 브라우저 TTS 직접 재생
          setError('데모 모드: 브라우저 TTS 사용');
          setAudioUrl('demo-mode');
          onAudioReady?.('demo-mode');
        } else {
          // 실제 Google TTS 오디오
          console.log('Google TTS 성공:', audioData.substring(0, 50) + '...');
          setAudioUrl(audioData);
          onAudioReady?.(audioData);
        }
      } else {
        setError('음성 생성 실패. 다시 시도해주세요.');
      }
    } catch (err) {
      setError('음성 생성에 실패했습니다.');
      console.error('TTS 오류:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // 재생/일시정지
  const togglePlayback = async () => {
    if (!audioUrl) {
      await generateAudio();
      return;
    }

    // 데모 모드인 경우 브라우저 TTS 직접 재생
    if (audioUrl === 'demo-mode') {
      if (isPlaying) {
        // 일시정지
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          setIsPlaying(false);
        }
      } else {
        // 재생
        playBrowserTTS();
      }
      return;
    }

    // 실제 오디오 파일 재생
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  // 브라우저 TTS 직접 재생
  const playBrowserTTS = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setError('브라우저가 음성 기능을 지원하지 않습니다.');
      return;
    }

    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // 최고 품질 음성 찾기
    const voices = window.speechSynthesis.getVoices();
    const bestVoice = findBestVoice(voices);
    
    if (bestVoice) {
      utterance.voice = bestVoice;
      console.log('데모 모드 음성:', bestVoice.name);
    }
    
    utterance.lang = 'ko-KR';
    utterance.rate = 0.85;
    utterance.pitch = 1.1;
    utterance.volume = 1.0;
    
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => {
      setIsPlaying(false);
      setError('음성 재생 중 오류가 발생했습니다.');
    };
    
    window.speechSynthesis.speak(utterance);
  };

  // 최고 품질 음성 찾기
  const findBestVoice = (voices: SpeechSynthesisVoice[]) => {
    const priorities = [
      (v: SpeechSynthesisVoice) => v.lang.includes('ko') && v.name.toLowerCase().includes('premium'),
      (v: SpeechSynthesisVoice) => v.lang.includes('ko') && v.name.toLowerCase().includes('neural'),
      (v: SpeechSynthesisVoice) => v.lang === 'ko-KR',
      (v: SpeechSynthesisVoice) => v.lang.includes('ko'),
      (v: SpeechSynthesisVoice) => v.name.toLowerCase().includes('samantha'),
      (v: SpeechSynthesisVoice) => v.lang === 'en-US' && v.localService,
    ];

    for (const priority of priorities) {
      const voice = voices.find(priority);
      if (voice) return voice;
    }

    return voices[0];
  };

  // 오디오 이벤트 핸들러
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioUrl]);

  return (
    <div className={`flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-700 ${className}`}>
      {/* Google TTS 로고 */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">G</span>
        </div>
        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
          Google TTS
        </span>
      </div>

      {/* 재생 컨트롤 */}
      <button
        onClick={togglePlayback}
        disabled={isGenerating}
        className="p-2 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-md transition-colors disabled:opacity-50"
        title={isPlaying ? "일시정지" : "재생"}
      >
        {isGenerating ? (
          <Loader className="w-5 h-5 animate-spin text-blue-600" />
        ) : isPlaying ? (
          <Pause className="w-5 h-5 text-blue-600" />
        ) : (
          <Play className="w-5 h-5 text-blue-600" />
        )}
      </button>

      {/* 음소거 */}
      <button
        onClick={() => {
          setIsMuted(!isMuted);
          if (audioRef.current) {
            audioRef.current.muted = !isMuted;
          }
        }}
        className="p-2 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-md transition-colors"
        title={isMuted ? "음소거 해제" : "음소거"}
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4 text-blue-600" />
        ) : (
          <Volume2 className="w-4 h-4 text-blue-600" />
        )}
      </button>

      {/* 다운로드 (실제 오디오 파일이 생성된 경우만) */}
      {audioUrl && audioUrl !== 'demo-mode' && (
        <a
          href={audioUrl}
          download={`tts-${termId || 'audio'}.mp3`}
          className="p-2 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-md transition-colors"
          title="오디오 다운로드"
        >
          <Download className="w-4 h-4 text-blue-600" />
        </a>
      )}

      {/* 상태 표시 */}
      <div className="flex-1 text-xs text-gray-600 dark:text-gray-400">
        {isGenerating && "음성 생성 중..."}
        {error && <span className="text-blue-600">{error}</span>}
        {audioUrl === 'demo-mode' && !isGenerating && (
          <span className="text-green-600">데모 모드 준비 완료 🎤</span>
        )}
        {audioUrl && audioUrl !== 'demo-mode' && !isGenerating && !error && (
          <span className="text-green-600">Wavenet 음성 준비 완료 ✨</span>
        )}
        {!audioUrl && !isGenerating && !error && "재생 버튼을 눌러 음성 생성"}
      </div>

      {/* 숨겨진 오디오 엘리먼트 (실제 오디오 파일만) */}
      {audioUrl && audioUrl !== 'demo-mode' && (
        <audio
          ref={audioRef}
          src={audioUrl}
          muted={isMuted}
          preload="metadata"
        />
      )}
    </div>
  );
};