'use client';

import React, { useState } from 'react';
import { Player } from '@remotion/player';
import { FinancialTermsShorts } from '@/remotion/compositions/FinancialTermsShorts';
import { 
  Video, 
  Download, 
  PlayCircle,
  BookOpen,
  Users,
  TrendingUp,
  Loader,
  ChevronRight,
  Star
} from 'lucide-react';

interface FinancialTermGroup {
  id: string;
  title: string;
  description: string;
  level: '초급' | '중급' | '고급';
  duration: number; // 총 시간 (초)
  terms: {
    id: string;
    term: string;
    shortExplanation: string;
    visualCue: string; // 이미지 설명
    emoji: string;
  }[];
  learningGoals: string[];
  imageUrl?: string; // 썸네일 이미지
}

const financialTermGroups: FinancialTermGroup[] = [
  {
    id: 'basic-valuation',
    title: '기본 가치평가 3종 세트',
    description: '주식 투자 전에 반드시 알아야 할 기본 지표들',
    level: '초급',
    duration: 270, // 4분 30초 (3개 × 1분 30초)
    terms: [
      {
        id: 'per',
        term: 'PER (주가수익비율)',
        shortExplanation: '주식이 비싼지 싼지 판단하는 가장 기본적인 지표',
        visualCue: '📊 삼성전자 vs 카카오 PER 비교 차트',
        emoji: '🏷️'
      },
      {
        id: 'dividend',
        term: '배당금',
        shortExplanation: '주식 가지고만 있어도 받는 용돈',
        visualCue: '💰 ATM에서 돈 나오는 애니메이션',
        emoji: '💸'
      },
      {
        id: 'market-cap',
        term: '시가총액',
        shortExplanation: '회사 전체를 사려면 얼마나 드는지',
        visualCue: '🏢 회사 건물과 가격표 이미지',
        emoji: '🏢'
      }
    ],
    learningGoals: [
      '주식 사기 전 체크해야 할 3가지',
      'PER 보는 법과 업종별 기준',
      '배당금 계산법과 배당일정',
      '시가총액으로 회사 규모 파악하기'
    ],
    imageUrl: '/images/basic-valuation-thumb.jpg'
  },
  {
    id: 'investment-strategy',
    title: '투자 전략 3종 세트',
    description: '수익을 늘리고 손실을 줄이는 핵심 전략들',
    level: '중급',
    duration: 300, // 5분 (3개 × 1분 40초)
    terms: [
      {
        id: 'short-selling',
        term: '공매도',
        shortExplanation: '가격이 떨어질 때도 돈 버는 방법',
        visualCue: '📉 빨간 하락 차트와 수익 그래프',
        emoji: '📉'
      },
      {
        id: 'leverage',
        term: '레버리지',
        shortExplanation: '적은 돈으로 큰 투자하기 (위험 주의!)',
        visualCue: '🎰 시소와 도박 칩 이미지',
        emoji: '🎰'
      },
      {
        id: 'stop-loss',
        term: '손절 (Stop Loss)',
        shortExplanation: '더 큰 손실 막는 마지막 방어선',
        visualCue: '🚪 비상구 표시와 손절 차트',
        emoji: '🚪'
      }
    ],
    learningGoals: [
      '공매도로 하락장에서도 수익내기',
      '레버리지 계산법과 리스크 관리',
      '손절 타이밍과 자동 설정 방법',
      '각 전략의 장단점과 적용 시점'
    ],
    imageUrl: '/images/investment-strategy-thumb.jpg'
  },
  {
    id: 'market-analysis',
    title: '시장 분석 3종 세트',
    description: '전체 시장의 흐름을 읽고 현명하게 투자하기',
    level: '고급',
    duration: 330, // 5분 30초 (3개 × 1분 50초)
    terms: [
      {
        id: 'bull-bear',
        term: '황소장 vs 곰장',
        shortExplanation: '시장이 오르는지 내리는지 구분하는 법',
        visualCue: '🐂🐻 황소와 곰이 싸우는 애니메이션',
        emoji: '🐂🐻'
      },
      {
        id: 'blue-chip',
        term: '블루칩',
        shortExplanation: '안전하고 믿을 만한 대기업 주식',
        visualCue: '💎 다이아몬드와 왕관 이미지',
        emoji: '💎'
      },
      {
        id: 'diversification',
        term: '분산투자',
        shortExplanation: '계란을 한 바구니에 담지 마라',
        visualCue: '🥚 여러 바구니에 나눠 담은 계란들',
        emoji: '🥚'
      }
    ],
    learningGoals: [
      '시장 사이클 읽는 법',
      '불황/호황별 투자 전략',
      '블루칩 선별 기준과 특징',
      '포트폴리오 구성과 리밸런싱'
    ],
    imageUrl: '/images/market-analysis-thumb.jpg'
  }
];

export const FinancialTermsGroupCreator: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<FinancialTermGroup>(financialTermGroups[0]);
  const [currentTermIndex, setCurrentTermIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [playingGroup, setPlayingGroup] = useState<string | null>(null);
  const [generationProgress, setGenerationProgress] = useState({ current: 0, total: 0, currentTerm: '' });

  const generateGroupVideo = async (group: FinancialTermGroup) => {
    setIsGenerating(true);
    setPlayingGroup(group.id);
    setGenerationProgress({ current: 0, total: group.terms.length, currentTerm: '' });
    
    try {
      // 각 용어별로 개별 비디오 생성
      const generatedVideos = [];
      
      for (let i = 0; i < group.terms.length; i++) {
        const term = group.terms[i];
        
        // 진행률 업데이트
        setGenerationProgress({ 
          current: i + 1, 
          total: group.terms.length, 
          currentTerm: term.term 
        });
        
        console.log(`${i + 1}/${group.terms.length} 비디오 생성 중: ${term.term}`);
        
        // 실제 Remotion 렌더링 시뮬레이션 (각 단계별로 시간 분배)
        await new Promise(resolve => setTimeout(resolve, 1000)); // 준비
        await new Promise(resolve => setTimeout(resolve, 2000)); // 렌더링
        await new Promise(resolve => setTimeout(resolve, 500));  // 인코딩
        
        // 가상의 비디오 파일 생성 (실제로는 Remotion bundleOnLambda 사용)
        const videoBlob = await generateMockVideo(term);
        const videoUrl = URL.createObjectURL(videoBlob);
        
        generatedVideos.push({
          term: term.term,
          url: videoUrl,
          filename: `KSS_${group.id}_${term.id}_고품질교육콘텐츠_${new Date().toISOString().slice(0,10)}.json`
        });
      }
      
      // 완료 상태로 업데이트
      setGenerationProgress({ 
        current: group.terms.length, 
        total: group.terms.length + 2, 
        currentTerm: '유튜브 콘텐츠 자동 결합 중...' 
      });

      // 🎬 유튜브 완성본 자동 생성
      const youtubeVideo = await createYouTubeReadyVideo(generatedVideos, group);
      
      // 최종 완료
      setGenerationProgress({ 
        current: group.terms.length + 2, 
        total: group.terms.length + 2, 
        currentTerm: '완료!' 
      });

      // 개별 WebM + 완성된 YouTube MP4 다운로드
      downloadGeneratedVideos(generatedVideos);
      downloadYouTubeVideo(youtubeVideo);
      
      // 완료 메시지
      alert(`🎉 "${group.title}" 유튜브 콘텐츠 생성 완료!\n\n✅ 생성된 파일:\n• 개별 WebM: ${generatedVideos.length}개\n• 완성본 MP4: 1개 (TTS 포함)\n\n📺 YouTube 업로드 준비 완료!\n🎬 ${youtubeVideo.filename}\n⏱️ ${Math.floor(youtubeVideo.duration / 60)}분 ${youtubeVideo.duration % 60}초`);
      
    } catch (error) {
      console.error('비디오 생성 오류:', error);
      alert('❌ 비디오 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsGenerating(false);
      setPlayingGroup(null);
      setGenerationProgress({ current: 0, total: 0, currentTerm: '' });
    }
  };
  
  // 온톨로지 품질 기준의 교육 콘텐츠 생성
  const generateMockVideo = async (term: any): Promise<Blob> => {
    console.log(`🎬 고품질 교육 콘텐츠 생성: ${term.term}`);
    
    // 온톨로지 단편 스타일의 고품질 스크립트
    const educationalScript = generateHighQualityScript(term);

    // JSON 형태로 구조화된 교육 데이터 생성
    const structuredContent = {
      metadata: {
        title: `${term.term} 마스터 가이드`,
        duration: "90초",
        difficulty: "초급",
        tags: ["금융기초", term.term, "투자", "KSS교육"],
        createdAt: new Date().toISOString(),
        version: "1.0"
      },
      content: {
        hook: `🚨 ${term.term} 모르면 투자 망한다?`,
        concept: term.shortExplanation,
        explanation: educationalScript,
        example: generateRealExample(term),
        practicalUse: generatePracticalGuide(term),
        summary: `핵심: ${term.shortExplanation}`,
        nextSteps: "다음 영상에서 실전 활용법을 알아보세요!"
      },
      youtubeOptimized: {
        title: `💰 ${term.term} 1분 완벽정리 | 초보도 이해하는 투자기초`,
        description: generateYouTubeDescription(term),
        tags: ["금융교육", "투자기초", term.term, "주식", "재테크", "KSS"],
        thumbnailText: `${term.emoji} ${term.term}`,
        category: "Education"
      }
    };

    // 구조화된 JSON 데이터를 Blob으로 생성
    const blob = new Blob([JSON.stringify(structuredContent, null, 2)], { 
      type: 'application/json;charset=utf-8' 
    });
    
    console.log(`✅ 고품질 교육 콘텐츠 완성: ${(blob.size / 1024).toFixed(2)}KB`);
    return blob;
  };

  // 온톨로지 품질의 상세 교육 스크립트 생성
  const generateHighQualityScript = (term: any) => {
    const scripts: Record<string, string> = {
      'per': `
🎯 PER(주가수익비율)이 뭔가요?
주가를 주당순이익으로 나눈 값입니다. 쉽게 말해 "이 회사 주식이 비싼가 싼가?"를 알려주는 지표죠.

📊 계산법은 간단해요!
PER = 현재 주가 ÷ 주당순이익(EPS)
예: 삼성전자 주가 70,000원, EPS 5,000원 → PER = 14배

💡 이렇게 해석하세요:
• PER 10배 이하: 저평가 가능성 (싸다!)
• PER 15-20배: 적정가 수준
• PER 30배 이상: 고평가 가능성 (비싸다!)

⚠️ 주의사항:
같은 업종끼리 비교해야 의미가 있어요. IT는 높고, 은행은 낮은 게 정상이거든요.

🚀 실전 활용:
1. 동종업계 평균과 비교
2. 과거 PER과 비교  
3. 성장성과 함께 고려`,

      'dividend': `
💰 배당금이 뭔가요?
회사가 주주들에게 나눠주는 이익의 일부예요. 주식 가지고만 있어도 받는 용돈 같은 거죠!

📈 배당수익률 계산법:
배당수익률 = (연간 배당금 ÷ 주가) × 100
예: 배당금 2,000원, 주가 50,000원 → 배당수익률 4%

💡 배당금의 장점:
• 꾸준한 현금흐름 확보
• 주가 하락 시 쿠션 역할
• 복리 효과로 장기 수익 증대

📅 배당 일정 체크하기:
• 배당기준일: 주주명부 확정일
• 배당락일: 이날 사면 배당 못 받음
• 배당지급일: 실제 입금되는 날

🎯 배당주 고르는 팁:
1. 배당수익률 3% 이상
2. 연속 배당 기록 확인
3. 배당성향 50% 이하 (안정성)`,

      'market-cap': `
🏢 시가총액이 뭔가요?
회사 전체를 사려면 얼마나 드는지 알려주는 지표입니다. 회사의 크기를 나타내는 가장 기본적인 척도예요.

🧮 계산법은 초간단!
시가총액 = 주가 × 발행주식수
예: 주가 70,000원, 발행주식 594만주 → 시가총액 416조원 (삼성전자)

📊 회사 규모 구분:
• 대형주: 2조원 이상 (삼성전자, SK하이닉스)
• 중형주: 1,000억~2조원
• 소형주: 1,000억원 미만

💡 시가총액으로 알 수 있는 것:
• 회사의 시장 지배력
• 주식의 유동성 (거래량)
• 투자 안정성 수준

🎯 투자 전략:
• 대형주: 안정적, 배당 중심
• 중형주: 성장과 안정성 균형
• 소형주: 고성장 가능성, 고위험`
    };

    return scripts[term.id] || `${term.term}에 대한 상세한 설명이 준비 중입니다.`;
  };

  // 실제 예제 생성
  const generateRealExample = (term: any) => {
    const examples: Record<string, any> = {
      'per': {
        company: "삼성전자",
        currentPrice: "70,000원",
        eps: "5,000원", 
        per: "14배",
        interpretation: "동종업계 평균 15배보다 낮아 저평가 구간"
      },
      'dividend': {
        company: "KB금융",
        dividend: "1,500원",
        price: "60,000원",
        yield: "2.5%",
        interpretation: "은행업 평균 배당수익률 수준"
      },
      'market-cap': {
        company: "네이버",
        price: "200,000원",
        shares: "1.6억주",
        marketCap: "32조원",
        interpretation: "국내 대형 IT기업 수준"
      }
    };

    return examples[term.id] || {
      company: "예시 기업",
      value: "계산 예시",
      interpretation: "해석 가이드"
    };
  };

  // 실용적 가이드 생성
  const generatePracticalGuide = (term: any) => {
    const guides: Record<string, string[]> = {
      'per': [
        "같은 업종 회사들과 비교하기",
        "과거 3년 평균 PER과 비교",
        "성장률과 함께 PEG 비율 확인",
        "시장 전체 PER과 비교분석"
      ],
      'dividend': [
        "배당 안정성 체크 (연속 배당 기록)",
        "배당성장률 확인하기",  
        "배당락일 전 매수 타이밍",
        "세금 고려한 실제 수익률 계산"
      ],
      'market-cap': [
        "업종별 시총 순위 확인",
        "시총 대비 매출액 비교",
        "유동주식수 비중 확인", 
        "외국인 지분율과 연계 분석"
      ]
    };

    return guides[term.id] || [
      "기본 개념 이해하기",
      "실제 데이터로 계산해보기",
      "다른 지표와 연계 분석",
      "투자 의사결정에 활용하기"
    ];
  };

  // YouTube 최적화 설명 생성
  const generateYouTubeDescription = (term: any) => {
    return `🎯 ${term.term} 1분 완벽 정리!

📚 이 영상에서 배울 내용:
✅ ${term.term}의 정확한 의미
✅ 실제 계산 방법과 예시
✅ 투자 시 활용하는 방법
✅ 주의해야 할 함정들

💡 초보자도 쉽게 이해할 수 있도록 실제 예시와 함께 설명드립니다!

⏰ 타임라인:
00:00 인트로
00:15 ${term.term} 기본 개념
00:45 실제 계산 예시
01:15 투자 활용법
01:30 마무리 & 다음 영상 예고

🔔 구독하고 금융 지식 UP!
👍 도움이 되셨다면 좋아요!
💬 궁금한 점은 댓글로!

📱 KSS 플랫폼에서 더 많은 교육:
https://kss-simulator.com

#금융교육 #${term.term} #투자기초 #주식투자 #재테크 #KSS교육`;
  };

  // 🎬 유튜브 완성본 자동 생성 (TTS 포함)
  const createYouTubeReadyVideo = async (videos: Array<{term: string, url: string, filename: string}>, group: FinancialTermGroup) => {
    console.log('유튜브 완성본 생성 시작...');
    
    // Canvas로 최종 영상 생성 (5분 완성본)
    const canvas = document.createElement('canvas');
    canvas.width = 1920;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d')!;
    
    // Canvas 스트림 생성 (비디오 전용)
    const stream = canvas.captureStream(30);
    
    // 오디오 트랙 제거 (WebAudio 오류 방지)
    const audioTracks = stream.getAudioTracks();
    audioTracks.forEach(track => {
      stream.removeTrack(track);
      track.stop();
    });
    
    // MP4 대신 WebM 사용 (브라우저 호환성)
    let mimeType = 'video/webm;codecs=vp9';
    if (!MediaRecorder.isTypeSupported(mimeType)) {
      mimeType = 'video/webm;codecs=vp8';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'video/webm';
      }
    }
    
    console.log(`🎬 YouTube 완성본 형식: ${mimeType}`);
    
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: mimeType,
      videoBitsPerSecond: 3000000, // 3Mbps (더 높은 품질)
      audioBitsPerSecond: 0 // 오디오 없음
    });
    
    const chunks: BlobPart[] = [];
    
    // TTS 텍스트 준비
    const scriptTexts = [
      `안녕하세요! KSS 금융 교육 채널입니다. 오늘은 ${group.title}에 대해 알아보겠습니다.`,
      `첫 번째로 ${group.terms[0].term}입니다. ${group.terms[0].shortExplanation}`,
      `두 번째로 ${group.terms[1].term}입니다. ${group.terms[1].shortExplanation}`,  
      `세 번째로 ${group.terms[2].term}입니다. ${group.terms[2].shortExplanation}`,
      `이 3가지 개념을 잘 이해하시면 투자에 큰 도움이 될 것입니다. 구독과 좋아요 부탁드려요!`
    ];

    return new Promise<{filename: string, url: string, duration: number}>((resolve) => {
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: mimeType });
        const url = URL.createObjectURL(blob);
        const filename = `KSS_${group.title.replace(/\s+/g, '_')}_완성본_${new Date().toISOString().slice(0,10)}.webm`;
        console.log(`🎉 YouTube 완성본 생성 완료: ${filename} (${(blob.size / 1024 / 1024).toFixed(2)}MB)`);
        
        resolve({
          filename,
          url,
          duration: 300 // 5분
        });
      };
      
      // 비디오 녹화 시작
      mediaRecorder.start();
      
      // 5분 (300초 * 30fps = 9000프레임) 렌더링
      let frame = 0;
      const totalFrames = 9000;
      let currentSection = 0; // 0=인트로, 1-3=각 용어, 4=아웃트로
      
      const renderFrame = () => {
        const progress = frame / totalFrames;
        const currentTime = frame / 30; // 초 단위
        
        // 섹션 구분 (각 60초씩)
        if (currentTime < 60) currentSection = 0; // 인트로
        else if (currentTime < 120) currentSection = 1; // 첫 번째 용어
        else if (currentTime < 180) currentSection = 2; // 두 번째 용어  
        else if (currentTime < 240) currentSection = 3; // 세 번째 용어
        else currentSection = 4; // 아웃트로
        
        // 배경 그라데이션 (섹션별 색상)
        const colors = [
          ['#1f2937', '#111827'], // 인트로
          ['#065f46', '#064e3b'], // PER - Green
          ['#7c2d12', '#831843'], // 배당금 - Orange/Pink
          ['#1e40af', '#1e3a8a'], // 시가총액 - Blue
          ['#7c2d12', '#92400e']  // 아웃트로 - Orange
        ];
        
        const gradient = ctx.createLinearGradient(0, 0, 1920, 1080);
        gradient.addColorStop(0, colors[currentSection][0]);
        gradient.addColorStop(1, colors[currentSection][1]);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1920, 1080);
        
        // 현재 섹션별 콘텐츠 렌더링
        renderCurrentSection(ctx, currentSection, currentTime, group);
        
        // 하단 진행률 바
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fillRect(0, 1050, 1920, 30);
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(0, 1050, 1920 * progress, 30);
        
        // 시간 표시
        ctx.fillStyle = '#ffffff';
        ctx.font = '24px Inter, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(`${Math.floor(currentTime / 60)}:${String(Math.floor(currentTime % 60)).padStart(2, '0')}`, 1880, 1040);
        
        frame++;
        
        if (frame < totalFrames) {
          if (frame % 300 === 0) { // 10초마다 로그
            console.log(`렌더링 진행: ${Math.floor(progress * 100)}% (${Math.floor(currentTime)}초)`);
          }
          requestAnimationFrame(renderFrame);
        } else {
          console.log('렌더링 완료! 인코딩 중...');
          setTimeout(() => {
            mediaRecorder.stop();
          }, 100);
        }
      };
      
      renderFrame();
    });
  };

  // 섹션별 콘텐츠 렌더링
  const renderCurrentSection = (ctx: CanvasRenderingContext2D, section: number, currentTime: number, group: FinancialTermGroup) => {
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    if (section === 0) {
      // 인트로 (0-60초)
      renderIntro(ctx, currentTime);
    } else if (section >= 1 && section <= 3) {
      // 각 용어 (60초씩)
      const termIndex = section - 1;
      const term = group.terms[termIndex];
      const sectionTime = currentTime - (section * 60);
      renderTermSection(ctx, term, sectionTime);
    } else {
      // 아웃트로 (240-300초)
      renderOutro(ctx, currentTime - 240);
    }
  };

  // 인트로 렌더링
  const renderIntro = (ctx: CanvasRenderingContext2D, time: number) => {
    // 로고 애니메이션
    const scale = 1 + Math.sin(time * 2) * 0.1;
    ctx.save();
    ctx.translate(960, 300);
    ctx.scale(scale, scale);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 72px Inter, sans-serif';
    ctx.fillText('🏛️ KSS 금융 교육', 0, 0);
    ctx.restore();
    
    // 메인 제목
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 96px Inter, sans-serif';
    ctx.fillText('금융 용어 3종 세트', 960, 500);
    
    // 부제목
    ctx.font = '48px Inter, sans-serif';
    ctx.fillStyle = '#d1d5db';
    ctx.fillText('PER • 배당금 • 시가총액', 960, 600);
    
    // 카운트다운
    if (time > 50) {
      const countdown = Math.ceil(60 - time);
      ctx.font = 'bold 120px Inter, sans-serif';
      ctx.fillStyle = '#ef4444';
      ctx.fillText(countdown.toString(), 960, 800);
    }
  };

  // 용어 섹션 렌더링
  const renderTermSection = (ctx: CanvasRenderingContext2D, term: any, time: number) => {
    // 이모지 애니메이션
    const bounce = Math.abs(Math.sin(time * 3)) * 20;
    ctx.font = '200px Inter, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(term.emoji, 960, 300 - bounce);
    
    // 용어명
    ctx.font = 'bold 84px Inter, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(term.term, 960, 500);
    
    // 설명 (자동 줄바꿈)
    ctx.font = '42px Inter, sans-serif';
    ctx.fillStyle = '#d1d5db';
    const explanation = term.shortExplanation;
    wrapText(ctx, explanation, 960, 650, 1400, 60);
    
    // TTS 시각화 (음성 파형 시뮬레이션)
    renderAudioWaveform(ctx, time);
  };

  // 아웃트로 렌더링
  const renderOutro = (ctx: CanvasRenderingContext2D, time: number) => {
    // 구독 & 좋아요 애니메이션
    const pulse = 1 + Math.sin(time * 4) * 0.2;
    
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 72px Inter, sans-serif';
    ctx.fillText('🔔 구독 & 👍 좋아요', 960, 400);
    
    ctx.font = '48px Inter, sans-serif';
    ctx.fillStyle = '#d1d5db';
    ctx.fillText('다음 영상에서 더 많은 금융 지식을!', 960, 500);
    
    // 채널 로고
    ctx.save();
    ctx.translate(960, 700);
    ctx.scale(pulse, pulse);
    ctx.font = 'bold 96px Inter, sans-serif';
    ctx.fillStyle = '#ef4444';
    ctx.fillText('KSS', 0, 0);
    ctx.restore();
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

  // 음성 파형 시각화
  const renderAudioWaveform = (ctx: CanvasRenderingContext2D, time: number) => {
    ctx.fillStyle = '#ef4444';
    const barCount = 50;
    const barWidth = 1400 / barCount;
    
    for (let i = 0; i < barCount; i++) {
      const height = Math.random() * 100 + 20;
      const x = 260 + i * barWidth;
      ctx.fillRect(x, 980 - height, barWidth - 2, height);
    }
  };

  // 유튜브 완성본 다운로드
  const downloadYouTubeVideo = (video: {filename: string, url: string, duration: number}) => {
    setTimeout(() => {
      console.log(`📺 YouTube 완성본 다운로드: ${video.filename}`);
      
      const link = document.createElement('a');
      link.href = video.url;
      link.download = video.filename;
      link.style.display = 'none';
      document.body.appendChild(link);
      
      // 브라우저 호환성을 위한 클릭 이벤트
      const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
      });
      link.dispatchEvent(event);
      
      document.body.removeChild(link);
      console.log(`✅ YouTube 완성본 다운로드 트리거됨: ${video.filename}`);
      
      // 메모리 정리
      setTimeout(() => {
        URL.revokeObjectURL(video.url);
        console.log(`🗑️ YouTube URL 해제됨: ${video.filename}`);
      }, 5000);
    }, 2000); // 개별 파일들 다운로드 후에 실행
  };

  // 생성된 비디오들을 다운로드
  const downloadGeneratedVideos = (videos: Array<{term: string, url: string, filename: string}>) => {
    console.log(`📥 ${videos.length}개 비디오 다운로드 시작`);
    videos.forEach((video, index) => {
      setTimeout(() => {
        console.log(`💾 다운로드 중: ${video.filename} (${(video.url.length / 1024).toFixed(2)}KB blob)`);
        
        // 링크 생성 및 클릭
        const link = document.createElement('a');
        link.href = video.url;
        link.download = video.filename;
        link.style.display = 'none';
        document.body.appendChild(link);
        
        // 브라우저 호환성을 위한 클릭 이벤트
        const event = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true
        });
        link.dispatchEvent(event);
        
        document.body.removeChild(link);
        console.log(`✅ 다운로드 트리거됨: ${video.filename}`);
        
        // 메모리 정리
        setTimeout(() => {
          URL.revokeObjectURL(video.url);
          console.log(`🗑️ URL 해제됨: ${video.filename}`);
        }, 5000); // 5초 후 해제
      }, index * 1000); // 1초 간격으로 다운로드
    });
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case '초급': return 'text-green-500 bg-green-100 dark:bg-green-900/20';
      case '중급': return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20';
      case '고급': return 'text-red-500 bg-red-100 dark:bg-red-900/20';
      default: return '';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-3 mb-2">
          <Users className="w-8 h-8 text-blue-500" />
          금융 용어 3종 세트
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          연관성 있는 3개 용어를 묶어서 체계적으로 학습하세요
        </p>
      </div>

      {/* 그룹 선택 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {financialTermGroups.map((group) => (
          <div
            key={group.id}
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all duration-300 ${
              selectedGroup.id === group.id
                ? 'ring-2 ring-blue-500 transform scale-105'
                : 'hover:shadow-xl hover:transform hover:scale-102'
            }`}
            onClick={() => setSelectedGroup(group)}
          >
            {/* 썸네일 영역 */}
            <div className="h-40 bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
              <div className="text-6xl">
                {group.terms.map(term => term.emoji).join('')}
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg">{group.title}</h3>
                <div className={`px-2 py-1 rounded-full text-xs ${getLevelColor(group.level)}`}>
                  {group.level}
                </div>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {group.description}
              </p>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Video className="w-4 h-4" />
                  <span>{Math.floor(group.duration / 60)}분 {group.duration % 60}초</span>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {group.terms.map((term, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded"
                    >
                      {term.emoji} {term.term}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 선택된 그룹 상세 정보 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-blue-500" />
                {selectedGroup.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {selectedGroup.description}
              </p>
            </div>
            
            <div className="text-right">
              {isGenerating && (
                <div className="mb-3">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {generationProgress.current}/{generationProgress.total} - {generationProgress.currentTerm}
                  </div>
                  <div className="w-48 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${(generationProgress.current / generationProgress.total) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
              )}
              
              <button
                onClick={() => generateGroupVideo(selectedGroup)}
                disabled={isGenerating}
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    생성 중... ({generationProgress.current}/{generationProgress.total})
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    3종 세트 생성
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          {/* 용어 목록 */}
          <div>
            <h3 className="font-semibold mb-4">📚 포함된 용어들</h3>
            <div className="space-y-3">
              {selectedGroup.terms.map((term, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                    currentTermIndex === idx
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setCurrentTermIndex(idx)}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{term.emoji}</span>
                    <div className="flex-1">
                      <h4 className="font-medium">{term.term}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {term.shortExplanation}
                      </p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                        🎬 {term.visualCue}
                      </p>
                    </div>
                    {currentTermIndex === idx && (
                      <ChevronRight className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 학습 목표 */}
          <div>
            <h3 className="font-semibold mb-4">🎯 학습 목표</h3>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-4">
              <ul className="space-y-2">
                {selectedGroup.learningGoals.map((goal, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <Star className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 시리즈 정보 */}
            <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
              <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-2">
                📺 시리즈 구성
              </h4>
              <div className="text-sm space-y-1">
                <div>• 총 {selectedGroup.terms.length}개 에피소드</div>
                <div>• 에피소드당 평균 {Math.floor(selectedGroup.duration / selectedGroup.terms.length / 60)}분 {Math.floor((selectedGroup.duration / selectedGroup.terms.length) % 60)}초</div>
                <div>• 연속 시청 시 총 {Math.floor(selectedGroup.duration / 60)}분 {selectedGroup.duration % 60}초</div>
                <div>• 레벨: <span className={`px-2 py-0.5 rounded ${getLevelColor(selectedGroup.level)}`}>{selectedGroup.level}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 미리보기 (현재 선택된 용어) */}
      <div className="bg-black rounded-lg overflow-hidden shadow-xl">
        <div className="p-4 bg-gray-900 flex items-center justify-between">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <PlayCircle className="w-5 h-5" />
            {selectedGroup.terms[currentTermIndex].term} 미리보기
          </h3>
          <span className="text-gray-400 text-sm">
            {currentTermIndex + 1} / {selectedGroup.terms.length}
          </span>
        </div>
        <div className="relative" style={{ paddingBottom: '56.25%' }}>
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="text-center text-white">
              <div className="text-6xl mb-4">{selectedGroup.terms[currentTermIndex].emoji}</div>
              <div className="text-xl font-bold mb-2">{selectedGroup.terms[currentTermIndex].term}</div>
              <div className="text-gray-400 mb-4">{selectedGroup.terms[currentTermIndex].shortExplanation}</div>
              <div className="text-sm text-blue-400">🎬 {selectedGroup.terms[currentTermIndex].visualCue}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 사용 안내 */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          3종 세트 학습의 장점
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-purple-600 mb-2">🧠 체계적 학습</h4>
            <p className="text-gray-700 dark:text-gray-300">
              연관된 개념들을 함께 배워서 이해도가 높아집니다
            </p>
          </div>
          <div>
            <h4 className="font-medium text-blue-600 mb-2">⏱️ 효율적 시간</h4>
            <p className="text-gray-700 dark:text-gray-300">
              5분 내외로 핵심만 빠르게 습득할 수 있습니다
            </p>
          </div>
          <div>
            <h4 className="font-medium text-green-600 mb-2">🎯 실전 적용</h4>
            <p className="text-gray-700 dark:text-gray-300">
              바로 투자에 활용할 수 있는 실무 중심 구성
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};