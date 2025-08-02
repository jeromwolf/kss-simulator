'use client';

import React, { useState, useEffect } from 'react';
import { Player } from '@remotion/player';
import { FinancialTermsShorts } from '@/remotion/compositions/FinancialTermsShorts';
import { 
  Video, 
  Download, 
  ChevronRight,
  TrendingUp,
  Loader,
  Clock,
  DollarSign,
  BookOpen,
  Laugh,
  Target,
  Volume2
} from 'lucide-react';
import { GoogleTTSPlayer } from './GoogleTTSPlayer';

interface FinancialTerm {
  id: string;
  term: string;
  funnyExplanation: string;
  seriousExplanation: string;
  example: {
    situation: string;
    result: string;
  };
  emoji: string;
  duration: number; // seconds
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
}

// 재미있는 금융 용어 설명 (1-2분)
const financialTerms: FinancialTerm[] = [
  {
    id: 'per',
    term: 'PER (주가수익비율)',
    funnyExplanation: '📊 충격! 삼성전자 PER 12배 vs 카카오 PER 30배. 같은 돈으로 뭘 살까? 치킨집으로 비유하면 "치킨 한 마리 팔아서 1만원 순수익 내는 가게"의 적정 가격을 매기는 것!',
    seriousExplanation: '주가 ÷ 주당순이익 = PER. 예: 삼성전자 7만원 ÷ 5천원 = 14배. 업종별 기준: 제조업 8-15배, IT 15-25배, 바이오 20-40배가 적정선',
    example: {
      situation: '🔥 실전 비교: A회사 PER 8배(저평가) vs B회사 PER 25배(고평가)',
      result: '⚠️ 주의! PER만 보면 안 돼요. 성장성, 부채비율, 업종 특성까지 고려해야 진짜 투자!'
    },
    emoji: '🏷️',
    duration: 90,
    difficulty: 'beginner',
    tags: ['PER', '가치평가', '기초', '실전투자']
  },
  {
    id: 'short-selling',
    term: '공매도',
    funnyExplanation: '없는 걸 팔고 나중에 사서 갚는 마법! 친구 게임기 빌려서 팔고, 가격 떨어지면 싸게 사서 돌려주는 거야',
    seriousExplanation: '주식을 빌려서 먼저 팔고, 가격이 하락하면 싸게 사서 갚는 투자 전략',
    example: {
      situation: '100만원에 빌린 주식을 팔고, 80만원에 떨어졌을 때 사서 갚기',
      result: '20만원 수익! (하지만 오르면 무한 손실 위험 😱)'
    },
    emoji: '📉',
    duration: 120,
    difficulty: 'intermediate',
    tags: ['공매도', '투자전략', '리스크']
  },
  {
    id: 'dividend',
    term: '배당금',
    funnyExplanation: '주식 가진 사람한테 회사가 주는 용돈! 마치 부모님이 성적표 보고 주시는 상금 같은 거야',
    seriousExplanation: '기업이 이익의 일부를 주주들에게 현금으로 나눠주는 것',
    example: {
      situation: '삼성전자 100주 보유, 주당 배당금 1,000원',
      result: '아무것도 안 해도 10만원이 통장에 입금! 💰'
    },
    emoji: '💸',
    duration: 90,
    difficulty: 'beginner',
    tags: ['배당', '수익', '패시브인컴']
  },
  {
    id: 'market-cap',
    term: '시가총액',
    funnyExplanation: '회사 전체의 가격표! 피자 한 조각 가격 × 전체 조각 수 = 피자 전체 가격',
    seriousExplanation: '발행 주식 수 × 현재 주가로 계산한 기업의 시장 가치',
    example: {
      situation: '주가 5만원, 발행주식 1억주',
      result: '시가총액 5조원! 이 회사를 통째로 사려면 5조원 필요'
    },
    emoji: '🏢',
    duration: 90,
    difficulty: 'beginner',
    tags: ['시가총액', '기업가치', '규모']
  },
  {
    id: 'ipo',
    term: 'IPO (기업공개)',
    funnyExplanation: '비공개 맛집이 프랜차이즈로 변신! 이제 누구나 이 가게의 주인이 될 수 있어',
    seriousExplanation: '비상장 기업이 주식을 일반에게 공개하고 거래소에 상장하는 것',
    example: {
      situation: '쿠팡이 2021년 뉴욕증시 상장',
      result: '첫날 주가 81% 상승! 초기 투자자들 대박 🚀'
    },
    emoji: '🎉',
    duration: 120,
    difficulty: 'intermediate',
    tags: ['IPO', '상장', '투자기회']
  },
  {
    id: 'bull-bear',
    term: '황소장 vs 곰장',
    funnyExplanation: '황소는 뿔로 위로 들이받고, 곰은 발로 아래로 내리친다! 주식시장도 똑같아',
    seriousExplanation: '황소장(Bull Market)은 상승장, 곰장(Bear Market)은 하락장을 의미',
    example: {
      situation: '코스피 2000 → 3000 (황소장) vs 3000 → 2000 (곰장)',
      result: '황소장에선 뭘 사도 오르고, 곰장에선 뭘 사도 떨어져'
    },
    emoji: '🐂🐻',
    duration: 90,
    difficulty: 'beginner',
    tags: ['시장동향', '황소장', '곰장']
  },
  {
    id: 'leverage',
    term: '레버리지',
    funnyExplanation: '돈을 빌려서 더 크게 베팅! 100만원으로 1000만원짜리 게임하는 거야',
    seriousExplanation: '자기 자본 대비 투자 규모를 늘리는 것. 수익도 손실도 배로 증폭',
    example: {
      situation: '내 돈 100만원 + 빌린 돈 900만원 = 총 1000만원 투자',
      result: '10% 오르면 100만원 수익 (내 돈 대비 100%!), 하지만 10% 떨어지면...'
    },
    emoji: '🎰',
    duration: 120,
    difficulty: 'advanced',
    tags: ['레버리지', '리스크', '고급전략']
  },
  {
    id: 'blue-chip',
    term: '블루칩',
    funnyExplanation: '주식계의 BTS! 세계적으로 인정받는 최고 등급 기업들',
    seriousExplanation: '재무 안정성과 성장성이 뛰어난 우량 대기업 주식',
    example: {
      situation: '삼성전자, SK하이닉스, 네이버 같은 대표 기업들',
      result: '안정적이지만 대박은 어려워. 로또보단 적금 느낌!'
    },
    emoji: '💎',
    duration: 90,
    difficulty: 'beginner',
    tags: ['블루칩', '우량주', '안정성']
  },
  {
    id: 'stop-loss',
    term: '손절 (Stop Loss)',
    funnyExplanation: '더 망하기 전에 탈출! 불타는 건물에서 빨리 나오는 것처럼',
    seriousExplanation: '손실이 더 커지기 전에 미리 정한 가격에서 매도하는 리스크 관리 전략',
    example: {
      situation: '10만원에 산 주식, 9만원에 자동 매도 설정',
      result: '10% 손실로 제한. 5만원까지 떨어지는 참사 방지!'
    },
    emoji: '🚪',
    duration: 90,
    difficulty: 'intermediate',
    tags: ['손절', '리스크관리', '전략']
  },
  {
    id: 'diversification',
    term: '분산투자',
    funnyExplanation: '계란을 한 바구니에 담지 마! 떨어뜨려도 몇 개는 살아남게',
    seriousExplanation: '여러 종목, 자산, 지역에 나눠 투자하여 위험을 줄이는 전략',
    example: {
      situation: '주식 40%, 채권 30%, 부동산 20%, 현금 10%',
      result: '한 곳이 망해도 다른 곳에서 방어! 안전제일 🛡️'
    },
    emoji: '🥚',
    duration: 90,
    difficulty: 'beginner',
    tags: ['분산투자', '포트폴리오', '안전']
  }
];

export const FinancialTermsShortsCreator: React.FC = () => {
  const [selectedTerm, setSelectedTerm] = useState<FinancialTerm>(financialTerms[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  // 음성 로딩 초기화
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          setVoicesLoaded(true);
          console.log('음성 로딩 완료:', voices.length, '개');
        }
      };

      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
      
      // 컴포넌트 언마운트 시 음성 정리
      return () => {
        window.speechSynthesis.cancel();
      };
    }
  }, []);

  const generateVideo = async () => {
    setIsGenerating(true);
    // 실제 구현에서는 서버 API 호출
    setTimeout(() => {
      setIsGenerating(false);
      alert(`"${selectedTerm.term}" 비디오 생성 완료! (데모)`);
    }, 3000);
  };

  const handlePlayNarration = () => {
    // 음성 품질이 너무 구려서 일단 비활성화하고 대체 방안 제시
    alert(`🎤 현재 브라우저 기본 TTS는 음질이 좋지 않습니다.

더 나은 음성을 위한 해결책:

1️⃣ **실제 제작 시**: 
   - Google Cloud TTS (자연스러운 한국어)
   - AWS Polly (Seoyeon, Jihun 음성)
   - ElevenLabs (가장 자연스러운 AI 음성)

2️⃣ **현재 데모**: 
   - 자막만 보시거나
   - 음성 없이 비주얼만 확인

3️⃣ **개선 예정**:
   - 프리미엄 TTS API 연동
   - 실제 성우 녹음 버전

지금은 비주얼 미리보기만 즐겨주세요! 😊`);
  };

  const handlePauseNarration = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsAudioPlaying(false);
    }
  };

  const handleToggleMute = () => {
    setIsAudioMuted(!isAudioMuted);
    if (!isAudioMuted) {
      handlePauseNarration();
    }
  };

  const totalFrames = selectedTerm.duration * 30; // 30fps

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-500 bg-green-100 dark:bg-green-900/20';
      case 'intermediate': return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20';
      case 'advanced': return 'text-red-500 bg-red-100 dark:bg-red-900/20';
      default: return '';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '초급';
      case 'intermediate': return '중급';
      case 'advanced': return '고급';
      default: return '';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <TrendingUp className="w-8 h-8 text-green-500" />
          금융 용어 재미있게 배우기
        </h1>
        <button
          onClick={generateVideo}
          disabled={isGenerating}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isGenerating ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              생성 중...
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              비디오 생성
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 용어 선택 */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="p-4 bg-gray-50 dark:bg-gray-700">
              <h2 className="font-semibold flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                금융 용어 선택
              </h2>
            </div>
            <div className="max-h-[600px] overflow-y-auto">
              {financialTerms.map((term) => (
                <button
                  key={term.id}
                  onClick={() => setSelectedTerm(term)}
                  className={`w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    selectedTerm.id === term.id
                      ? 'bg-green-50 dark:bg-green-900/30 border-l-4 border-green-500'
                      : ''
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 flex-1">
                        <span className="text-2xl">{term.emoji}</span>
                        <h3 className="font-medium text-sm">{term.term}</h3>
                      </div>
                      {selectedTerm.id === term.id && (
                        <ChevronRight className="w-5 h-5 text-green-500 flex-shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-500 dark:text-gray-400">
                          {Math.floor(term.duration / 60)}:{String(term.duration % 60).padStart(2, '0')}
                        </span>
                      </div>
                      <div className={`px-2 py-0.5 rounded-full ${getDifficultyColor(term.difficulty)}`}>
                        {getDifficultyText(term.difficulty)}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {term.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-600 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 비디오 설정 및 미리보기 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 용어 정보 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              용어 정보
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{selectedTerm.emoji}</span>
                <h3 className="text-2xl font-bold">{selectedTerm.term}</h3>
              </div>
              
              <div className="space-y-3">
                <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Laugh className="w-5 h-5 text-pink-500" />
                    <span className="font-medium text-pink-700 dark:text-pink-300">재미있게 설명하면</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{selectedTerm.funnyExplanation}</p>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-blue-500" />
                    <span className="font-medium text-blue-700 dark:text-blue-300">진짜 의미는</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{selectedTerm.seriousExplanation}</p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="font-medium mb-2">실전 예시</div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-500">상황:</span> {selectedTerm.example.situation}
                    </div>
                    <div>
                      <span className="text-gray-500">결과:</span> <span className="text-green-600 dark:text-green-400 font-medium">{selectedTerm.example.result}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 비디오 미리보기 */}
          <div className="bg-black rounded-lg overflow-hidden shadow-xl">
            <div className="p-4 bg-gray-900 flex items-center justify-between">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <Video className="w-5 h-5" />
                미리보기
              </h3>
              <span className="text-gray-400 text-sm">
                1920 x 1080 | 30fps | {Math.floor(selectedTerm.duration / 60)}:{String(selectedTerm.duration % 60).padStart(2, '0')}
              </span>
            </div>
            <div className="relative" style={{ paddingBottom: '56.25%' }}>
              <div className="absolute inset-0">
                <Player
                  component={FinancialTermsShorts as any}
                  inputProps={{
                    term: selectedTerm.term,
                    funnyExplanation: selectedTerm.funnyExplanation,
                    seriousExplanation: selectedTerm.seriousExplanation,
                    example: selectedTerm.example,
                    emoji: selectedTerm.emoji,
                    duration: selectedTerm.duration
                  }}
                  durationInFrames={totalFrames}
                  fps={30}
                  compositionWidth={1920}
                  compositionHeight={1080}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  controls
                  loop
                  autoPlay={true}
                  clickToPlay={true}
                />
              </div>
            </div>

            {/* Google TTS 나레이션 */}
            <div className="mt-4">
              <GoogleTTSPlayer 
                text={`${selectedTerm.term}에 대해 알아보겠습니다. ${selectedTerm.funnyExplanation} 정확히 말하면, ${selectedTerm.seriousExplanation}`}
                termId={selectedTerm.id}
                onAudioReady={(audioUrl) => {
                  console.log('Google TTS 오디오 생성 완료:', audioUrl);
                }}
              />
            </div>
          </div>

          {/* 디버그 정보 */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h4 className="font-medium mb-2 text-sm">디버그 정보</h4>
            <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              <div>총 프레임: {totalFrames}</div>
              <div>FPS: 30</div>
              <div>비디오 길이: {selectedTerm.duration}초</div>
              <div>브라우저 TTS 지원: {typeof window !== 'undefined' && 'speechSynthesis' in window ? '✅' : '❌'}</div>
              <div>음성 로딩 상태: {voicesLoaded ? '✅ 완료' : '⏳ 로딩 중...'}</div>
              <div>현재 재생 상태: {isAudioPlaying ? '🔊 재생 중' : '⏸️ 정지'}</div>
            </div>
            
            {/* 음성 테스트 버튼 */}
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => {
                  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                    const testUtterance = new SpeechSynthesisUtterance('안녕하세요. 음성 테스트입니다.');
                    testUtterance.lang = 'ko-KR';
                    testUtterance.rate = 0.8;
                    testUtterance.volume = 1.0;
                    window.speechSynthesis.speak(testUtterance);
                  }
                }}
                className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
              >
                음성 테스트
              </button>
              <button
                onClick={() => {
                  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                    const voices = window.speechSynthesis.getVoices();
                    console.log('음성 목록:', voices);
                    alert(`사용 가능한 음성: ${voices.length}개\n\n${voices.slice(0, 5).map(v => `${v.name} (${v.lang})`).join('\n')}`);
                  }
                }}
                className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
              >
                음성 목록 확인
              </button>
            </div>
          </div>

          {/* 사용 안내 */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              금융 문맹 탈출 프로젝트!
            </h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-green-500">💡</span>
                <span>어려운 금융 용어를 재미있게 설명해서 누구나 이해할 수 있게!</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">🎯</span>
                <span>1-2분 짧은 영상으로 부담 없이 시청</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">😄</span>
                <span>비유와 예시로 쉽게 설명 → 실제 의미 → 실전 활용까지!</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">📈</span>
                <span>시리즈로 제작하여 "금융 용어 마스터" 재생목록 구성</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">🔥</span>
                <span>댓글로 다음에 알고 싶은 용어 받기 → 시청자 참여 유도</span>
              </li>
            </ul>
          </div>

          {/* Google TTS 설정 가이드 */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">G</span>
              </div>
              Google Cloud TTS 연동 완료! 🎉
            </h3>
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <div>
                <strong className="text-blue-600 dark:text-blue-400">현재 상태:</strong> 
                Google Wavenet 한국어 음성 사용 준비 완료
              </div>
              
              <div>
                <strong className="text-green-600 dark:text-green-400">지원 음성:</strong>
                <ul className="mt-2 space-y-1 pl-4">
                  <li>• <strong>ko-KR-Wavenet-A</strong> - 자연스러운 여성 음성 (기본)</li>
                  <li>• <strong>ko-KR-Wavenet-B</strong> - 따뜻한 남성 음성</li>
                  <li>• <strong>ko-KR-Wavenet-C</strong> - 신뢰감 있는 여성 음성</li>
                  <li>• <strong>ko-KR-Wavenet-D</strong> - 명확한 남성 음성</li>
                </ul>
              </div>
              
              <div>
                <strong className="text-purple-600 dark:text-purple-400">특별 기능:</strong>
                <ul className="mt-2 space-y-1 pl-4">
                  <li>• <strong>SSML 지원</strong> - 감정, 속도, 피치 조절</li>
                  <li>• <strong>용어별 최적화</strong> - 금융 용어에 맞는 음성 선택</li>
                  <li>• <strong>MP3 다운로드</strong> - 생성된 음성 파일 저장 가능</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 p-3 rounded">
                <strong>🚀 사용 방법:</strong>
                <br />1. 위의 파란색 Google TTS 플레이어에서 재생 버튼 클릭
                <br />2. 고품질 Wavenet 음성으로 나레이션 들어보기
                <br />3. 다운로드 버튼으로 MP3 파일 저장
              </div>

              <div className="text-xs text-gray-500 mt-3">
                <strong>💡 현재 상태:</strong> API 키가 없어서 데모 모드로 작동 중
                <br />• 데모 모드: 개선된 브라우저 TTS 사용 (Premium/Neural 음성 우선 선택)
                <br />• 실제 Google TTS 사용하려면: .env.local 파일에 NEXT_PUBLIC_GOOGLE_TTS_API_KEY 설정
                <br />• Google Cloud Console → Text-to-Speech API 활성화 → API 키 생성
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};