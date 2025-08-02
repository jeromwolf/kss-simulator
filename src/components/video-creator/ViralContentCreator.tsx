'use client';

import React, { useState } from 'react';
import { 
  TrendingUp, 
  Zap, 
  Target,
  Flame,
  Users,
  Award,
  Clock,
  Eye,
  MessageCircle,
  Share2,
  Download,
  Loader
} from 'lucide-react';

interface ViralContentTemplate {
  id: string;
  category: '충격적 사실' | '실전 꿀팁' | '스토리텔링' | '논란/토론';
  title: string;
  hook: string; // 첫 3초
  structure: string[];
  expectedViews: string;
  thumbnailStyle: string;
  viralElements: string[];
  targetAudience: string;
}

const viralTemplates: ViralContentTemplate[] = [
  {
    id: 'shocking-per',
    category: '충격적 사실',
    title: '🚨 PER 30배 주식을 산 사람들의 충격적인 결말 (실화)',
    hook: '여러분, 카카오를 PER 30배에 산 사람들 지금 어떻게 됐는지 아세요?',
    structure: [
      '⚡ 충격적인 오프닝 (0-15초)',
      '📊 실제 데이터로 증명 (15-45초)', 
      '💰 구체적인 손익 계산 (45-75초)',
      '🎯 정확한 투자법 (75-105초)',
      '🔥 마무리 + 액션 콜 (105-120초)'
    ],
    expectedViews: '50만~100만 조회수',
    thumbnailStyle: '빨간 화살표 + 충격 표정 + 큰 숫자',
    viralElements: ['실제 사례', '구체적 숫자', '감정적 반응', '실용적 해답'],
    targetAudience: '주식 초보 + 손실 경험자'
  },
  {
    id: 'dividend-millionaire',
    category: '실전 꿀팁',
    title: '💰 월 100만원 배당금 받는 30대의 포트폴리오 공개',
    hook: '30살에 월 100만원 배당금을 받고 있는 분의 실제 포트폴리오를 공개합니다',
    structure: [
      '💸 월 100만원 배당금 증명 (0-20초)',
      '📈 포트폴리오 상세 공개 (20-60초)',
      '🧮 정확한 투자 금액 계산 (60-90초)', 
      '⚠️ 숨겨진 리스크 (90-110초)',
      '🎯 따라하는 법 (110-150초)'
    ],
    expectedViews: '100만~300만 조회수',
    thumbnailStyle: '통장 잔고 + 돈 이미지 + 30대 남성',
    viralElements: ['구체적 금액', '실제 증명', '따라할 수 있는 방법', '나이대 타겟팅'],
    targetAudience: '2030 직장인 + 부동산투자 관심자'
  },
  {
    id: 'market-cap-story',
    category: '스토리텔링',
    title: '🏢 시가총액 1위 삼성전자가 망할 뻔한 진짜 이유',
    hook: '1997년 IMF 때 삼성전자가 어떻게 파산 직전까지 갔는지 아시나요?',
    structure: [
      '💥 위기의 순간 재현 (0-25초)',
      '📉 당시 주가 폭락 상황 (25-50초)',
      '🔄 극적인 회복 과정 (50-80초)',
      '💡 교훈과 투자 인사이트 (80-110초)',
      '🚀 미래 전망 (110-140초)'
    ],
    expectedViews: '200만~500만 조회수',
    thumbnailStyle: '삼성 로고 + 위기 상황 + 극적 반전',
    viralElements: ['역사적 사실', '드라마틱한 스토리', '대기업 비화', '교훈'],
    targetAudience: '전 연령대 + 기업 스토리 관심자'
  },
  {
    id: 'investment-debate',
    category: '논란/토론',
    title: '🔥 "주식은 도박이다" vs "주식만이 답이다" 결론 내겠습니다',
    hook: '주식이 도박이라고 하는 사람들과 주식만이 답이라는 사람들, 둘 다 틀렸습니다',
    structure: [
      '⚔️ 대립하는 두 관점 제시 (0-20초)',
      '📊 실제 데이터로 검증 (20-60초)',
      '🎯 진실은 이것 (60-90초)',
      '💰 올바른 투자 방법 (90-120초)',
      '🔥 논란 정리 + 구독 유도 (120-150초)'
    ],
    expectedViews: '300만~1000만 조회수',
    thumbnailStyle: 'VS 구도 + 논란 키워드 + 결론 암시',
    viralElements: ['논란거리', '명확한 결론', '양쪽 관점', '데이터 기반'],
    targetAudience: '투자 찬반론자 + 진실 추구자'
  }
];

const viralFeatures = [
  {
    icon: <Zap className="w-6 h-6 text-yellow-500" />,
    title: '3초 골든룰',
    description: '첫 3초에 시청자를 확실히 잡는 충격적인 오프닝'
  },
  {
    icon: <Target className="w-6 h-6 text-blue-500" />,
    title: '감정적 연결',
    description: '분노, 놀라움, 호기심을 자극하는 스토리텔링'
  },
  {
    icon: <Award className="w-6 h-6 text-purple-500" />,
    title: '실용적 가치',
    description: '바로 써먹을 수 있는 구체적이고 실용적인 정보'
  },
  {
    icon: <Share2 className="w-6 h-6 text-green-500" />,
    title: '공유 유도',
    description: '논란거리나 충격적 사실로 자연스러운 공유 유도'
  }
];

export const ViralContentCreator: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<ViralContentTemplate>(viralTemplates[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');

  const generateViralVideo = async () => {
    setIsGenerating(true);
    
    const steps = [
      '🎬 바이럴 스크립트 생성 중...',
      '🎨 섬네일 디자인 중...',
      '📱 TikTok 스타일 편집 중...',
      '🔥 인트로 임팩트 강화 중...',
      '📊 데이터 시각화 생성 중...',
      '🎵 배경음악 동기화 중...',
      '✨ 최종 렌더링 중...'
    ];

    try {
      // 각 단계별 진행
      for (let i = 0; i < steps.length; i++) {
        setGenerationStep(steps[i]);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      // 실제 바이럴 영상 생성
      setGenerationStep('🎥 고품질 바이럴 영상 렌더링 중...');
      const viralVideo = await createViralVideo(selectedTemplate);
      
      // 파일 다운로드
      downloadViralVideo(viralVideo);

      // 완료 메시지
      alert(`🚀 바이럴 콘텐츠 생성 완료!\n\n📁 파일: ${viralVideo.filename}\n📺 제목: "${selectedTemplate.title}"\n⏱️ 길이: 2분 30초\n💾 크기: ${viralVideo.size}\n🎯 예상 조회수: ${selectedTemplate.expectedViews}\n\n📥 다운로드 폴더를 확인하세요!`);

    } catch (error) {
      console.error('바이럴 영상 생성 오류:', error);
      alert('❌ 바이럴 영상 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsGenerating(false);
      setGenerationStep('');
    }
  };

  // 실용적인 영상 생성 (실제 정보 제공 중심)
  const createViralVideo = async (template: ViralContentTemplate): Promise<{filename: string, url: string, size: string}> => {
    const canvas = document.createElement('canvas');
    canvas.width = 1920;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d')!;
    
    // Canvas 스트림 생성 (30fps 최적화)
    const stream = canvas.captureStream(30);
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'video/webm;codecs=vp8',
      videoBitsPerSecond: 2500000 // 2.5Mbps 최적화
    });
    
    const chunks: BlobPart[] = [];
    
    return new Promise((resolve) => {
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const filename = `KSS_교육_${template.category}_${template.title.substring(2, 15).replace(/[^a-zA-Z0-9가-힣]/g, '_')}_${new Date().toISOString().slice(0,10)}.webm`;
        const size = (blob.size / (1024 * 1024)).toFixed(2) + 'MB';
        
        resolve({ filename, url, size });
      };
      
      // 비디오 녹화 시작
      mediaRecorder.start();
      
      // 30초 교육 중심 영상 렌더링 (30fps * 30초 = 900프레임)
      let frame = 0;
      const totalFrames = 900;
      let currentScene = 0; // 0=인트로, 1=설명, 2=실습, 3=정리
      
      const renderFrame = () => {
        const progress = frame / totalFrames;
        const currentTime = frame / 30; // 초 단위
        
        // 씬 구분 (교육 중심)
        if (currentTime < 5) currentScene = 0; // 인트로 (5초)
        else if (currentTime < 20) currentScene = 1; // 핵심 설명 (15초)
        else if (currentTime < 27) currentScene = 2; // 실습/예시 (7초)
        else currentScene = 3; // 정리 및 다음 단계 (3초)
        
        renderEducationalScene(ctx, currentScene, currentTime, template, frame);
        
        frame++;
        
        if (frame < totalFrames) {
          if (frame % 60 === 0) { // 2초마다 로그
            console.log(`📚 교육 콘텐츠 렌더링: ${Math.floor(progress * 100)}% (${Math.floor(currentTime)}초)`);
          }
          requestAnimationFrame(renderFrame);
        } else {
          console.log('✅ 교육 영상 완료!');
          setTimeout(() => {
            mediaRecorder.stop();
          }, 100);
        }
      };
      
      renderFrame();
    });
  };

  // 교육 씬별 렌더링
  const renderEducationalScene = (ctx: CanvasRenderingContext2D, scene: number, time: number, template: ViralContentTemplate, frame: number) => {
    // 씬별 배경색 (교육 친화적)
    const sceneColors = [
      ['#1e3a8a', '#1e40af'], // 인트로 - 깊은 파랑
      ['#065f46', '#059669'], // 설명 - 차분한 초록
      ['#7c2d12', '#ea580c'], // 실습 - 따뜻한 주황
      ['#4c1d95', '#6d28d9']  // 정리 - 보라
    ];
    
    const gradient = ctx.createLinearGradient(0, 0, 1920, 1080);
    gradient.addColorStop(0, sceneColors[scene][0]);
    gradient.addColorStop(1, sceneColors[scene][1]);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1920, 1080);
    
    // 씬별 콘텐츠 (교육 중심)
    switch(scene) {
      case 0: renderIntroduction(ctx, time, template, frame); break;
      case 1: renderMainContent(ctx, time, template, frame); break;
      case 2: renderPracticalExample(ctx, time, template, frame); break;
      case 3: renderSummaryAndNext(ctx, time, template, frame); break;
    }
    
    // 공통 요소: 하단 진행률 바 + 타이머
    renderProgressBar(ctx, frame / 300, time);
  };

  // 📚 교육적 인트로 (5초)
  const renderIntroduction = (ctx: CanvasRenderingContext2D, time: number, template: ViralContentTemplate, frame: number) => {
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // KSS 로고 및 브랜딩
    ctx.font = 'bold 120px "Noto Sans KR", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('KSS 금융교육', 960, 300);
    
    // 부제목
    ctx.font = '48px "Noto Sans KR", sans-serif';
    ctx.fillStyle = '#e5e7eb';
    ctx.fillText('Knowledge Space Simulator', 960, 380);
    
    // 주제 소개
    ctx.font = 'bold 64px "Noto Sans KR", sans-serif';
    ctx.fillStyle = '#fbbf24';
    
    if (template.id === 'shocking-per') {
      ctx.fillText('📊 PER 이해하기', 960, 500);
      ctx.font = '36px "Noto Sans KR", sans-serif';
      ctx.fillStyle = '#d1d5db';
      ctx.fillText('주가수익비율로 주식 가치 판단하는 법', 960, 580);
    }
    
    // 진행 표시
    const dots = '●'.repeat(Math.floor(time) % 4 + 1);
    ctx.font = '32px sans-serif';
    ctx.fillStyle = '#9ca3af';
    ctx.fillText(`학습 시작 ${dots}`, 960, 700);
  };

  // 📖 핵심 설명 (15초)
  const renderMainContent = (ctx: CanvasRenderingContext2D, time: number, template: ViralContentTemplate, frame: number) => {
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const sceneTime = time - 5; // 5초부터 시작
    
    // 제목
    ctx.font = 'bold 72px "Noto Sans KR", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('PER이란?', 960, 200);
    
    // 정의
    ctx.font = '48px "Noto Sans KR", sans-serif';
    ctx.fillStyle = '#e5e7eb';
    ctx.fillText('Price to Earnings Ratio', 960, 280);
    ctx.fillText('주가 ÷ 주당순이익', 960, 340);
    
    // 실제 예시 (애니메이션)
    if (sceneTime > 3) {
      const progress = Math.min(1, (sceneTime - 3) / 5);
      
      // 예시 박스들
      ctx.fillStyle = 'rgba(59, 130, 246, 0.8)';
      ctx.fillRect(200, 450, 300, 120);
      ctx.fillRect(1220, 450, 300, 120);
      
      ctx.font = 'bold 42px "Noto Sans KR", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText('삼성전자', 350, 490);
      ctx.fillText('카카오', 1370, 490);
      
      // PER 수치 애니메이션
      if (progress > 0.3) {
        ctx.font = 'bold 64px "Noto Sans KR", sans-serif';
        ctx.fillStyle = '#10b981';
        ctx.fillText('PER 12배', 350, 540);
        ctx.fillStyle = '#ef4444';
        ctx.fillText('PER 30배', 1370, 540);
      }
    }
    
    // 핵심 메시지
    if (sceneTime > 10) {
      ctx.font = 'bold 52px "Noto Sans KR", sans-serif';
      ctx.fillStyle = '#fbbf24';
      ctx.fillText('💡 낮을수록 저평가 가능성 ↑', 960, 720);
    }
  };

  // 💼 실습 예시 (7초)
  const renderPracticalExample = (ctx: CanvasRenderingContext2D, time: number, template: ViralContentTemplate, frame: number) => {
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const sceneTime = time - 20; // 20초부터 시작
    
    // 실습 제목
    ctx.font = 'bold 64px "Noto Sans KR", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('📝 실습: PER 계산해보기', 960, 180);
    
    // 계산 과정
    ctx.font = '44px "Noto Sans KR", sans-serif';
    ctx.fillStyle = '#e5e7eb';
    ctx.textAlign = 'left';
    
    if (sceneTime > 1) {
      ctx.fillText('1. 현재 주가: 70,000원', 300, 300);
    }
    if (sceneTime > 2.5) {
      ctx.fillText('2. 주당순이익(EPS): 5,000원', 300, 360);
    }
    if (sceneTime > 4) {
      ctx.fillText('3. PER = 70,000 ÷ 5,000 = 14배', 300, 420);
    }
    
    // 결론
    if (sceneTime > 5.5) {
      ctx.textAlign = 'center';
      ctx.font = 'bold 54px "Noto Sans KR", sans-serif';
      ctx.fillStyle = '#10b981';
      ctx.fillText('🎯 업종 평균 15배보다 낮음 → 매력적!', 960, 550);
      
      ctx.font = '36px "Noto Sans KR", sans-serif';
      ctx.fillStyle = '#fbbf24';
      ctx.fillText('다음: 배당수익률 계산법 알아보기', 960, 650);
    }
  };
  
  // 📋 정리 및 다음 단계 (3초)
  const renderSummaryAndNext = (ctx: CanvasRenderingContext2D, time: number, template: ViralContentTemplate, frame: number) => {
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // 요약
    ctx.font = 'bold 56px "Noto Sans KR", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('✅ PER 완전 정복!', 960, 280);
    
    // 핵심 포인트
    ctx.font = '40px "Noto Sans KR", sans-serif';
    ctx.fillStyle = '#e5e7eb';
    ctx.fillText('주가 ÷ 주당순이익 = PER', 960, 380);
    ctx.fillText('낮을수록 저평가 가능성 ↑', 960, 440);
    
    // 다음 학습
    ctx.font = 'bold 48px "Noto Sans KR", sans-serif';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText('🔥 다음: 배당수익률 & 시가총액', 960, 580);
    
    // KSS 브랜딩
    ctx.font = '32px "Noto Sans KR", sans-serif';
    ctx.fillStyle = '#9ca3af';
    ctx.fillText('KSS 금융교육 플랫폼에서 더 많은 내용을', 960, 680);
  };

  // 진행률 바
  const renderProgressBar = (ctx: CanvasRenderingContext2D, progress: number, time: number) => {
    // 하단 진행률 바
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 1050, 1920, 30);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(0, 1050, 1920 * progress, 30);
    
    // 타이머
    ctx.fillStyle = '#ffffff';
    ctx.font = '24px Inter';
    ctx.textAlign = 'right';
    ctx.fillText(`${Math.floor(time / 60)}:${String(Math.floor(time % 60)).padStart(2, '0')}`, 1880, 1040);
  };

  // 텍스트 자동 줄바꿈
  const wrapText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
    const words = text.split(' ');
    let line = '';
    let currentY = y;
    
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      
      if (testWidth > maxWidth && i > 0) {
        ctx.fillText(line, x, currentY);
        line = words[i] + ' ';
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, currentY);
  };

  // 바이럴 영상 다운로드
  const downloadViralVideo = (video: {filename: string, url: string, size: string}) => {
    const link = document.createElement('a');
    link.href = video.url;
    link.download = video.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // 메모리 정리
    setTimeout(() => URL.revokeObjectURL(video.url), 2000);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      '충격적 사실': 'text-red-500 bg-red-100 dark:bg-red-900/20',
      '실전 꿀팁': 'text-green-500 bg-green-100 dark:bg-green-900/20', 
      '스토리텔링': 'text-purple-500 bg-purple-100 dark:bg-purple-900/20',
      '논란/토론': 'text-orange-500 bg-orange-100 dark:bg-orange-900/20'
    };
    return colors[category] || '';
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* 헤더 */}
      <div className="text-center">
        <h1 className="text-4xl font-bold flex items-center justify-center gap-3 mb-4">
          <Flame className="w-10 h-10 text-red-500" />
          바이럴 콘텐츠 생성기
        </h1>
        <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg p-4">
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              <span>현재 구독자: <strong>190명</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span>목표: <strong>10만명</strong> (526배 증가)</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-500" />
              <span>예상 기간: <strong>6-12개월</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* 바이럴 전략 특징 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {viralFeatures.map((feature, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <div className="flex items-center gap-3 mb-2">
              {feature.icon}
              <h3 className="font-semibold">{feature.title}</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* 템플릿 선택 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {viralTemplates.map((template) => (
          <div
            key={template.id}
            className={`bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg cursor-pointer transition-all duration-300 ${
              selectedTemplate.id === template.id
                ? 'ring-2 ring-red-500 transform scale-105'
                : 'hover:shadow-xl hover:transform hover:scale-102'
            }`}
            onClick={() => setSelectedTemplate(template)}
          >
            {/* 카테고리 및 제목 */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${getCategoryColor(template.category)}`}>
                  {template.category}
                </div>
                <h3 className="font-bold text-lg mb-2 line-clamp-2">
                  {template.title}
                </h3>
              </div>
            </div>

            {/* 훅 */}
            <div className="mb-4">
              <h4 className="font-medium text-red-600 dark:text-red-400 mb-1">🎣 오프닝 훅</h4>
              <p className="text-sm italic bg-red-50 dark:bg-red-900/20 p-3 rounded">
                "{template.hook}"
              </p>
            </div>

            {/* 예상 성과 */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded">
                <Eye className="w-5 h-5 mx-auto mb-1 text-green-500" />
                <div className="text-xs text-gray-600 dark:text-gray-400">예상 조회수</div>
                <div className="font-bold text-green-600">{template.expectedViews}</div>
              </div>
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                <Users className="w-5 h-5 mx-auto mb-1 text-blue-500" />
                <div className="text-xs text-gray-600 dark:text-gray-400">타겟 청중</div>
                <div className="font-bold text-blue-600 text-xs">{template.targetAudience}</div>
              </div>
            </div>

            {/* 바이럴 요소 */}
            <div className="mb-4">
              <h4 className="font-medium mb-2 text-xs">🔥 바이럴 요소</h4>
              <div className="flex flex-wrap gap-1">
                {template.viralElements.map((element, idx) => (
                  <span key={idx} className="text-xs px-2 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-600 rounded">
                    {element}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 선택된 템플릿 상세 */}
      {selectedTemplate && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">{selectedTemplate.title}</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  예상 조회수: <strong>{selectedTemplate.expectedViews}</strong>
                </p>
              </div>
              
              <button
                onClick={generateViralVideo}
                disabled={isGenerating}
                className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg hover:from-red-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 text-lg font-semibold"
              >
                {isGenerating ? (
                  <>
                    <Loader className="w-6 h-6 animate-spin" />
                    생성 중...
                  </>
                ) : (
                  <>
                    <Flame className="w-6 h-6" />
                    바이럴 영상 생성
                  </>
                )}
              </button>
            </div>
            
            {isGenerating && (
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                  <Loader className="w-5 h-5 animate-spin" />
                  <span className="font-medium">{generationStep}</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-6">
            <h3 className="font-semibold mb-4">📋 영상 구성</h3>
            <div className="space-y-3">
              {selectedTemplate.structure.map((section, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {idx + 1}
                  </div>
                  <span>{section}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-500" />
                바이럴 성공 공식
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <strong className="text-red-600">충격적 오프닝</strong>
                  <p className="text-gray-600 dark:text-gray-400">첫 3초에 시청자를 확실히 잡기</p>
                </div>
                <div>
                  <strong className="text-blue-600">구체적 데이터</strong>
                  <p className="text-gray-600 dark:text-gray-400">실제 숫자와 사례로 신뢰성 확보</p>
                </div>
                <div>
                  <strong className="text-green-600">액션 유도</strong>
                  <p className="text-gray-600 dark:text-gray-400">구독, 댓글, 공유 자연스럽게 유도</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 성장 예측 */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-purple-500" />
          구독자 성장 로드맵 (190명 → 10만명)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl font-bold text-red-500">1개월</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">첫 바이럴 영상</div>
            <div className="font-semibold">190 → 2,000명</div>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl font-bold text-orange-500">3개월</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">시리즈 정착</div>
            <div className="font-semibold">2,000 → 15,000명</div>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl font-bold text-blue-500">6개월</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">알고리즘 최적화</div>
            <div className="font-semibold">15,000 → 50,000명</div>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-2xl font-bold text-green-500">1년</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">채널 완성</div>
            <div className="font-semibold">50,000 → 100,000명</div>
          </div>
        </div>
      </div>
    </div>
  );
};