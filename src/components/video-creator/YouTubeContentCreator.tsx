'use client';

import React, { useState } from 'react';
import { 
  Youtube, 
  Download, 
  Upload, 
  PlayCircle,
  Film,
  Loader,
  CheckCircle,
  AlertCircle,
  Settings,
  Eye
} from 'lucide-react';

type VideoProcessingStep = 'idle' | 'combining' | 'optimizing' | 'metadata' | 'uploading' | 'completed';

interface YouTubeVideoData {
  title: string;
  description: string;
  tags: string[];
  thumbnail: string;
  category: string;
  privacy: 'public' | 'unlisted' | 'private';
}

interface ProcessedVideo {
  id: string;
  originalFiles: string[];
  combinedFile: string;
  duration: number;
  size: string;
  youtubeData: YouTubeVideoData;
}

export const YouTubeContentCreator: React.FC = () => {
  const [step, setStep] = useState<VideoProcessingStep>('idle');
  const [progress, setProgress] = useState(0);
  const [processedVideo, setProcessedVideo] = useState<ProcessedVideo | null>(null);
  const [uploadStrategy, setUploadStrategy] = useState<'individual' | 'combined'>('combined');

  // 3개 WebM을 하나의 유튜브 콘텐츠로 결합
  const createYouTubeContent = async () => {
    setStep('combining');
    setProgress(0);

    try {
      // 1단계: 비디오 결합 (3초 → 5분으로 확장)
      setStep('combining');
      setProgress(20);
      await simulateVideoProcessing('비디오 결합 중...', 3000);

      // 2단계: 유튜브 최적화 (해상도, 비트레이트 조정)
      setStep('optimizing');
      setProgress(50);
      await simulateVideoProcessing('유튜브 최적화 중...', 2000);

      // 3단계: 메타데이터 생성 (제목, 설명, 태그, 썸네일)
      setStep('metadata');
      setProgress(70);
      const youtubeData = generateYouTubeMetadata();
      await simulateVideoProcessing('메타데이터 생성 중...', 1500);

      // 4단계: 완성된 비디오 생성
      const finalVideo: ProcessedVideo = {
        id: `kss-financial-${Date.now()}`,
        originalFiles: [
          'KSS_basic-valuation_per_2025-08-01.webm',
          'KSS_basic-valuation_dividend_2025-08-01.webm',
          'KSS_basic-valuation_market-cap_2025-08-01.webm'
        ],
        combinedFile: 'KSS_금융용어_기본가치평가_3종세트_완성본.mp4',
        duration: 285, // 4분 45초
        size: '45.2MB',
        youtubeData
      };

      setProcessedVideo(finalVideo);
      setStep('completed');
      setProgress(100);

    } catch (error) {
      console.error('비디오 처리 오류:', error);
      alert('비디오 처리 중 오류가 발생했습니다.');
      setStep('idle');
    }
  };

  // 유튜브 업로드 시뮬레이션
  const uploadToYouTube = async () => {
    if (!processedVideo) return;

    setStep('uploading');
    setProgress(0);

    try {
      // 업로드 진행률 시뮬레이션
      for (let i = 0; i <= 100; i += 5) {
        setProgress(i);
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // 실제로는 YouTube Data API v3 사용
      const youtubeUrl = `https://youtube.com/watch?v=${generateVideoId()}`;
      
      alert(`🎉 유튜브 업로드 완료!\n\n📺 제목: ${processedVideo.youtubeData.title}\n🔗 URL: ${youtubeUrl}\n\n💡 실제 구현 시 YouTube Data API v3 사용`);
      
      setStep('completed');
      
    } catch (error) {
      console.error('업로드 오류:', error);
      alert('유튜브 업로드 중 오류가 발생했습니다.');
      setStep('completed');
    }
  };

  // 비디오 처리 시뮬레이션
  const simulateVideoProcessing = (message: string, duration: number) => {
    console.log(message);
    return new Promise(resolve => setTimeout(resolve, duration));
  };

  // 유튜브 메타데이터 자동 생성
  const generateYouTubeMetadata = (): YouTubeVideoData => {
    return {
      title: '💰 금융 문맹 탈출! PER, 배당금, 시가총액 3분 완벽 정리 | KSS 금융 교육',
      description: `🎯 금융 초보자를 위한 필수 용어 3종 세트!

📚 이 영상에서 배울 내용:
• PER (주가수익비율) - 주식이 비싼지 싼지 판단하는 법
• 배당금 - 주식 가져만 있어도 받는 용돈
• 시가총액 - 회사 전체 가치 계산법

⏰ 타임라인:
00:00 인트로
00:30 PER 완벽 정리
01:45 배당금 이해하기
03:00 시가총액 개념
04:15 실전 활용법
04:35 퀴즈 & 마무리

🔥 이런 분께 강력 추천:
✅ 주식 투자 시작하고 싶은 분
✅ 경제 뉴스 이해하고 싶은 분  
✅ 금융 용어가 어려운 분
✅ 3분만에 핵심만 배우고 싶은 분

💡 KSS (Knowledge Space Simulator)는 복잡한 개념을 쉽게 시뮬레이션하여 학습할 수 있는 차세대 교육 플랫폼입니다.

#금융교육 #주식투자 #PER #배당금 #시가총액 #금융문맹탈출 #주식초보 #투자기초 #경제공부 #재테크

📱 KSS 플랫폼: https://kss-simulator.com
📧 문의: contact@kss-simulator.com`,
      tags: [
        '금융교육', '주식투자', 'PER', '배당금', '시가총액', 
        '금융문맹', '투자기초', '주식초보', '경제공부', '재테크',
        'KSS', '금융용어', '투자', '주식', '경제', '재무분석'
      ],
      thumbnail: '🏷️💸🏢', // 실제로는 이미지 URL
      category: 'Education',
      privacy: 'public'
    };
  };

  const generateVideoId = () => {
    return Math.random().toString(36).substring(2, 13);
  };

  const getStepIcon = (currentStep: VideoProcessingStep) => {
    switch (currentStep) {
      case 'combining': return <Film className="w-5 h-5 animate-pulse" />;
      case 'optimizing': return <Settings className="w-5 h-5 animate-spin" />;
      case 'metadata': return <Eye className="w-5 h-5 animate-bounce" />;
      case 'uploading': return <Upload className="w-5 h-5 animate-pulse" />;
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-500" />;
      default: return <Youtube className="w-5 h-5" />;
    }
  };

  const getStepDescription = (currentStep: VideoProcessingStep) => {
    switch (currentStep) {
      case 'combining': return '3개 비디오를 하나로 결합하고 인트로/아웃트로 추가 중...';
      case 'optimizing': return '유튜브 최적화: 해상도 조정, 비트레이트 최적화 중...';
      case 'metadata': return 'SEO 최적화된 제목, 설명, 태그, 썸네일 자동 생성 중...';
      case 'uploading': return 'YouTube Data API를 통해 업로드 중...';
      case 'completed': return '유튜브 콘텐츠 준비 완료!';
      default: return '3개의 WebM 파일을 하나의 완성된 유튜브 콘텐츠로 변환합니다.';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-3 mb-2">
          <Youtube className="w-8 h-8 text-red-500" />
          유튜브 콘텐츠 자동 생성
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          3개의 WebM 파일을 완성도 높은 유튜브 영상으로 변환하세요
        </p>
      </div>

      {/* 업로드 전략 선택 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
        <h3 className="font-semibold mb-4">📺 업로드 전략 선택</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setUploadStrategy('combined')}
            className={`p-4 rounded-lg border-2 transition-colors ${
              uploadStrategy === 'combined'
                ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <div className="text-center">
              <Film className="w-8 h-8 mx-auto mb-2 text-red-500" />
              <h4 className="font-medium">통합 업로드 (추천)</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                3개를 하나의 완성된 교육 영상으로 결합
              </p>
              <div className="mt-2 text-xs">
                <div className="text-green-600">• 4-5분 완성본</div>
                <div className="text-green-600">• 인트로/아웃트로 추가</div>
                <div className="text-green-600">• SEO 최적화</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => setUploadStrategy('individual')}
            className={`p-4 rounded-lg border-2 transition-colors ${
              uploadStrategy === 'individual'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <div className="text-center">
              <PlayCircle className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <h4 className="font-medium">개별 업로드</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                각각을 독립적인 Shorts로 업로드
              </p>
              <div className="mt-2 text-xs">
                <div className="text-blue-600">• YouTube Shorts 3개</div>
                <div className="text-blue-600">• 각각 60초로 확장</div>
                <div className="text-blue-600">• 알고리즘 노출 3배</div>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* 진행 상황 */}
      {step !== 'idle' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <div className="flex items-center gap-3 mb-4">
            {getStepIcon(step)}
            <h3 className="font-semibold">처리 진행 상황</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>{getStepDescription(step)}</span>
              <span>{progress}%</span>
            </div>
            
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div 
                className="bg-red-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* 완성된 비디오 정보 */}
      {processedVideo && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            완성된 유튜브 콘텐츠
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">📹 비디오 정보</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>파일명:</span>
                  <span className="font-medium">{processedVideo.combinedFile}</span>
                </div>
                <div className="flex justify-between">
                  <span>길이:</span>
                  <span>{Math.floor(processedVideo.duration / 60)}분 {processedVideo.duration % 60}초</span>
                </div>
                <div className="flex justify-between">
                  <span>크기:</span>
                  <span>{processedVideo.size}</span>
                </div>
                <div className="flex justify-between">
                  <span>원본 파일:</span>
                  <span>{processedVideo.originalFiles.length}개</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">📊 유튜브 메타데이터</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-500">제목:</span>
                  <p className="font-medium">{processedVideo.youtubeData.title.substring(0, 60)}...</p>
                </div>
                <div>
                  <span className="text-gray-500">태그:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {processedVideo.youtubeData.tags.slice(0, 5).map((tag, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                        #{tag}
                      </span>
                    ))}
                    <span className="text-xs text-gray-500">+{processedVideo.youtubeData.tags.length - 5}개</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 액션 버튼 */}
      <div className="flex gap-4 justify-center">
        {step === 'idle' && (
          <button
            onClick={createYouTubeContent}
            className="px-8 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2"
          >
            <Film className="w-5 h-5" />
            {uploadStrategy === 'combined' ? '통합 콘텐츠 생성' : 'Shorts 3개 생성'}
          </button>
        )}

        {step === 'completed' && processedVideo && (
          <>
            <button
              onClick={() => {
                // 실제로는 파일 다운로드
                alert(`📁 "${processedVideo.combinedFile}" 다운로드 시작!\n\n크기: ${processedVideo.size}\n길이: ${Math.floor(processedVideo.duration / 60)}분 ${processedVideo.duration % 60}초`);
              }}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              파일 다운로드
            </button>
            
            <button
              onClick={uploadToYouTube}
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2"
            >
              <Upload className="w-5 h-5" />
              유튜브 업로드
            </button>
          </>
        )}
      </div>

      {/* 오픈소스 도구 소개 */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-blue-500" />
          🚀 추천 오픈소스 도구들
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-blue-600 mb-2">🐍 Python 기반</h4>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300">
              <li>• <strong>MoviePy</strong>: 비디오 편집 자동화</li>
              <li>• <strong>YouTubeLabs</strong>: 구글 공식 스크립트</li>
              <li>• <strong>yt-dlp</strong>: 동영상 다운로드</li>
              <li>• <strong>Pillow</strong>: 썸네일 자동 생성</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-green-600 mb-2">🛠️ 유용한 라이브러리</h4>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300">
              <li>• <strong>FFmpeg</strong>: 비디오 변환/압축</li>
              <li>• <strong>OpenCV</strong>: 영상 분석/편집</li>
              <li>• <strong>Whisper</strong>: 자막 자동 생성</li>
              <li>• <strong>TTS</strong>: 음성 합성</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-purple-600 mb-2">📊 API & 도구</h4>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300">
              <li>• <strong>YouTube Data API</strong>: 업로드 자동화</li>
              <li>• <strong>ChatGPT API</strong>: 제목/설명 생성</li>
              <li>• <strong>Selenium</strong>: 브라우저 자동화</li>
              <li>• <strong>GitHub Actions</strong>: CI/CD 자동화</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-blue-700">
          <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">💡 성공적인 자동화 전략</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>콘텐츠 품질 우선:</strong>
              <ul className="mt-1 space-y-1 text-gray-600 dark:text-gray-400">
                <li>• 자동화는 보조 수단, 품질이 핵심</li>
                <li>• 실제 정보와 가치 있는 교육 콘텐츠</li>
                <li>• 시청자 피드백 적극 반영</li>
              </ul>
            </div>
            <div>
              <strong>단계별 접근:</strong>
              <ul className="mt-1 space-y-1 text-gray-600 dark:text-gray-400">
                <li>• 1단계: 스크립트/메타데이터 자동화</li>
                <li>• 2단계: 영상 편집 자동화</li>
                <li>• 3단계: 업로드/스케줄링 자동화</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* 실제 구현 예시 */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg p-6">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Settings className="w-5 h-5 text-gray-500" />
          📝 MoviePy 기반 자동화 예시
        </h3>
        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre className="text-green-400 text-sm">
{`# KSS 교육 콘텐츠 자동 생성 예시
import moviepy.editor as mp
from moviepy.config import check

# 1. 기본 영상 생성
def create_educational_video(title, content, duration=30):
    # 배경 생성
    bg = mp.ColorClip(size=(1920,1080), color=(30,41,59), duration=duration)
    
    # 제목 텍스트
    title_txt = mp.TextClip(title, fontsize=80, color='white', 
                           font='Noto-Sans-KR-Bold')
    title_txt = title_txt.set_position('center').set_duration(5)
    
    # 내용 텍스트
    content_txt = mp.TextClip(content, fontsize=50, color='#e5e7eb',
                             font='Noto-Sans-KR')
    content_txt = content_txt.set_position('center').set_duration(duration-5)
    
    # 합성
    video = mp.CompositeVideoClip([bg, title_txt, content_txt])
    return video

# 2. 배치 처리
educational_contents = [
    ("PER이란?", "주가 ÷ 주당순이익 = PER"),
    ("배당금이란?", "주식 보유 시 받는 배당금"),
    ("시가총액이란?", "회사 전체 가치 = 주가 × 발행주식수")
]

final_clips = []
for title, content in educational_contents:
    clip = create_educational_video(title, content)
    final_clips.append(clip)

# 3. 최종 영상 생성
final_video = mp.concatenate_videoclips(final_clips)
final_video.write_videofile("KSS_금융교육_자동생성.mp4", fps=30)`}
          </pre>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs">
            Python + MoviePy
          </span>
          <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs">
            자동 배치 처리
          </span>
          <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs">
            한글 폰트 지원
          </span>
        </div>
      </div>
    </div>
  );
};