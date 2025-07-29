'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Video, 
  Download, 
  ChevronRight,
  Settings,
  Loader,
  Play,
  Pause,
  Volume2,
  Edit3,
  Save,
  X,
  AlertCircle
} from 'lucide-react';
import { stockCurriculumData } from '@/data/stockCurriculum';
import { VideoPreview } from './VideoPreview';

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

interface VideoSettings {
  duration: number;
  style: 'professional' | 'educational' | 'dynamic';
  includeCharts: boolean;
  includeExamples: boolean;
  narrationSpeed: number;
  backgroundMusic: boolean;
  voice: 'male' | 'female' | 'ai';
  language: 'ko' | 'en';
}

export const VideoCreator: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState(stockCurriculumData[0]);
  const [selectedTopic, setSelectedTopic] = useState(selectedModule.topics[0]);
  const [videoSections, setVideoSections] = useState<VideoSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [editingSection, setEditingSection] = useState<number | null>(null);
  const [editedNarration, setEditedNarration] = useState('');
  const [playingSection, setPlayingSection] = useState<number | null>(null);
  const [ttsLoading, setTtsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [videoSettings, setVideoSettings] = useState<VideoSettings>({
    duration: 5,
    style: 'educational',
    includeCharts: true,
    includeExamples: true,
    narrationSpeed: 1.0,
    backgroundMusic: true,
    voice: 'female',
    language: 'ko'
  });

  useEffect(() => {
    generateVideoSections();
  }, [selectedTopic, videoSettings]);

  const generateVideoSections = () => {
    setIsLoading(true);
    
    // 상세 콘텐츠 매핑
    const detailedContent: { [key: string]: { [key: string]: string } } = {
      '주식시장의 기본 구조': {
        'KOSPI와 KOSDAQ의 차이': `KOSPI는 한국거래소의 유가증권시장으로, 대기업과 우량기업이 상장되어 있습니다. 삼성전자, SK하이닉스 같은 대형주가 여기에 속합니다. KOSDAQ은 코스닥시장으로, 기술력 있는 중소·벤처기업이 주로 상장됩니다. 카카오, 네이버 같은 IT기업들이 대표적입니다.`,
        '거래 시간과 시스템': `정규시장은 오전 9시부터 오후 3시 30분까지 운영됩니다. 장 시작 전 8시부터 8시 30분까지는 시간외 단일가 매매가 있고, 장 종료 후 3시 40분부터 4시까지도 시간외 거래가 가능합니다. 동시호가는 개장 전 10분간 주문을 모아 단일가격으로 거래하는 방식입니다.`,
        '시장 참여자의 역할': `개인투자자는 주로 단기 매매를 선호하며 시장의 유동성을 제공합니다. 기관투자자는 연기금, 보험사 등으로 장기 투자 관점에서 시장 안정화 역할을 합니다. 외국인투자자는 글로벌 자금 흐름에 따라 움직이며 시장에 큰 영향력을 행사합니다.`
      },
      '기술적 분석 기초': {
        '차트의 기본 이해': `캔들차트는 시가, 고가, 저가, 종가를 한눈에 보여주는 차트입니다. 빨간색은 상승(양봉), 파란색은 하락(음봉)을 나타냅니다. 몸통은 시가와 종가의 차이, 꼬리는 고가와 저가를 표시합니다. 긴 꼬리는 매수세와 매도세의 힘겨루기를 보여줍니다.`,
        '주요 지표 활용법': `이동평균선은 일정 기간 주가의 평균을 이은 선으로, 20일선은 단기, 60일선은 중기, 120일선은 장기 추세를 나타냅니다. 골든크로스는 단기 이평선이 장기 이평선을 상향 돌파할 때 매수 신호로 봅니다. RSI는 과매수·과매도를 판단하는 지표로 70 이상이면 과매수, 30 이하면 과매도로 봅니다.`,
        '지지선과 저항선': `지지선은 주가가 하락하다가 멈추는 가격대로, 매수세가 강한 구간입니다. 저항선은 주가가 상승하다가 멈추는 가격대로, 매도세가 강한 구간입니다. 이전 고점이나 저점, 심리적 가격대(1만원, 5만원 등)가 주요 지지·저항선이 됩니다.`
      },
      '기업 분석과 가치투자': {
        '재무제표 읽기': `손익계산서는 기업의 수익성을 보여줍니다. 매출액에서 비용을 빼면 영업이익이 나오고, 여기서 금융비용 등을 빼면 순이익이 됩니다. 재무상태표는 기업의 자산과 부채 상황을 보여줍니다. 현금흐름표는 실제 현금의 유입과 유출을 나타내 기업의 자금 상황을 파악할 수 있습니다.`,
        'PER과 PBR 분석': `PER(주가수익비율)은 주가를 주당순이익으로 나눈 값으로, 낮을수록 저평가되었다고 봅니다. 업종 평균과 비교하는 것이 중요합니다. PBR(주가순자산비율)은 주가를 주당순자산으로 나눈 값으로, 1 미만이면 청산가치보다 낮게 거래된다는 의미입니다.`,
        '성장성과 수익성': `매출액 성장률은 기업의 성장성을 보여주는 핵심 지표입니다. 영업이익률은 본업의 수익성을 나타내며, ROE(자기자본이익률)는 주주 자본 대비 수익창출 능력을 보여줍니다. 이들 지표의 추세를 3~5년간 관찰하여 기업의 성장 궤적을 파악합니다.`
      },
      '포트폴리오 구성': {
        '자산 배분 전략': `포트폴리오는 위험을 분산하고 수익을 극대화하기 위한 자산 배분 전략입니다. 일반적으로 주식 60%, 채권 30%, 현금 10%의 비율을 기본으로 하되, 나이와 위험 성향에 따라 조정합니다. 젊을수록 주식 비중을 높이고, 은퇴가 가까울수록 안전자산 비중을 늘립니다.`,
        '섹터별 분산투자': `한 업종에 집중 투자하는 것은 위험합니다. IT, 제조업, 금융, 바이오, 소비재 등 다양한 섹터에 분산 투자하세요. 경기 순환에 따라 섹터별 성과가 달라지므로, 경기 방어주(필수소비재, 유틸리티)와 경기 민감주(IT, 금융)를 적절히 섞어 구성합니다.`,
        '리밸런싱의 중요성': `정기적인 리밸런싱은 포트폴리오의 위험과 수익을 관리하는 핵심입니다. 분기별 또는 반기별로 목표 비중과 실제 비중을 비교하여 조정합니다. 상승한 자산은 일부 매도하고, 하락한 자산은 추가 매수하여 목표 비중을 유지합니다.`
      },
      'AI & 퀀트 투자': {
        '알고리즘 트레이딩': `알고리즘 트레이딩은 컴퓨터 프로그램이 사전에 정해진 규칙에 따라 자동으로 매매하는 방식입니다. 감정을 배제하고 일관된 전략을 실행할 수 있습니다. 이동평균 돌파, 페어 트레이딩, 차익거래 등 다양한 전략이 있습니다.`,
        '백테스팅과 최적화': `백테스팅은 과거 데이터를 이용해 투자 전략의 성과를 검증하는 과정입니다. 수익률, 최대 낙폭, 샤프 비율 등을 분석합니다. 과최적화를 피하기 위해 인샘플과 아웃샘플 데이터를 구분하여 테스트하고, 거래 비용과 슬리피지를 반영해야 합니다.`,
        'AI 기반 종목 추천': `머신러닝 알고리즘은 방대한 데이터에서 패턴을 찾아 종목을 추천합니다. 재무 데이터, 뉴스 감성 분석, 기술적 지표 등을 종합 분석합니다. 랜덤 포레스트, XGBoost, LSTM 등의 모델을 활용하여 주가 예측과 종목 선정을 수행합니다.`
      }
    };
    
    // 주제 내용을 비디오 섹션으로 변환
    const sections: VideoSection[] = [
      {
        title: `${selectedTopic.title} 소개`,
        content: detailedContent[selectedTopic.title]?.[selectedTopic.subtopics[0]] || 
                `이번 시간에는 ${selectedTopic.title}에 대해 깊이 있게 알아보겠습니다. 이 주제는 성공적인 주식 투자를 위해 반드시 이해해야 할 핵심 개념입니다.`,
        narration: `안녕하세요. 오늘은 주식 투자의 중요한 주제인 ${selectedTopic.title}에 대해 자세히 살펴보겠습니다. 이 내용을 잘 이해하시면 투자 실력이 한 단계 업그레이드될 것입니다.`,
        keyPoints: selectedTopic.keyPoints || [
          '핵심 개념의 이해',
          '실전 적용 방법',
          '주의해야 할 포인트'
        ]
      }
    ];

    // 서브토픽별 섹션 생성
    selectedTopic.subtopics.forEach((subtopic, index) => {
      const content = detailedContent[selectedTopic.title]?.[subtopic] || 
        `${subtopic}는 ${selectedTopic.title}의 핵심 요소입니다. 실제 투자에서 어떻게 활용하는지 구체적인 예시와 함께 설명드리겠습니다.`;
      
      sections.push({
        title: subtopic,
        content: content,
        narration: `이제 ${subtopic}에 대해 자세히 알아보겠습니다. 실제 사례를 통해 이해를 돕겠습니다.`,
        keyPoints: selectedTopic.keyPoints?.slice(index * 2, (index + 1) * 2) || [
          `${subtopic}의 핵심 개념`,
          '실전 활용 방법',
          '투자 시 체크포인트'
        ]
      });
    });

    // 차트 예시가 있으면 추가
    if (videoSettings.includeCharts && selectedTopic.chartExamples) {
      selectedTopic.chartExamples.forEach(chart => {
        sections.push({
          title: chart.title,
          content: chart.description,
          narration: `이제 ${chart.title}를 차트로 살펴보겠습니다. ${chart.description}`,
          charts: [{
            type: 'stock-chart',
            title: chart.title,
            description: chart.description
          }]
        });
      });
    }

    // 실전 예제가 있으면 추가
    if (videoSettings.includeExamples && selectedTopic.practiceCase) {
      const practicalExamples: { [key: string]: string[] } = {
        '주식시장의 기본 구조': [
          '삼성전자 주식을 사려면: 증권사 앱을 열고 → 삼성전자 검색 → 현재가 확인 → 수량 입력 → 매수 주문',
          '호가창 읽기: 매도 호가(빨간색)는 팔려는 가격, 매수 호가(파란색)는 사려는 가격. 잔량은 각 가격대의 주문 수량',
          '시장가 vs 지정가: 시장가는 즉시 체결되지만 가격이 불리할 수 있고, 지정가는 원하는 가격에 거래 가능하지만 체결이 안될 수도 있음'
        ],
        '기술적 분석 기초': [
          '골든크로스 실전: 삼성전자 20일선이 60일선을 상향 돌파 → 상승 추세 전환 신호 → 매수 타이밍',
          'RSI 70 돌파 시: 과매수 구간 진입 → 단기 조정 가능성 → 분할 매도 고려',
          '거래량 급증 패턴: 주가 상승 + 거래량 증가 = 강한 상승세, 주가 상승 + 거래량 감소 = 상승 동력 약화'
        ],
        '기업 분석과 가치투자': [
          'PER 활용 예시: A기업 PER 10배, 업종 평균 15배 → 상대적 저평가 → 재무제표 추가 분석 필요',
          '배당주 투자: 배당수익률 4% 이상 + 5년 연속 배당 + 부채비율 100% 미만 기업 선별',
          '성장주 발굴: 매출 성장률 20% 이상 + 영업이익률 개선 + 신사업 진출 기업 주목'
        ]
      };
      
      sections.push({
        title: '실전 투자 예제',
        content: `${selectedTopic.practiceCase.scenario} 이제 배운 내용을 실제 투자에 적용하는 방법을 구체적인 사례로 알아보겠습니다.`,
        narration: `실전 투자에서는 이론을 어떻게 적용하는지가 중요합니다. 실제 사례를 통해 자세히 설명드리겠습니다.`,
        examples: practicalExamples[selectedTopic.title] || [
          selectedTopic.practiceCase.task,
          '실제 매매 시뮬레이션',
          '리스크 관리 실습'
        ]
      });
    }

    // 마무리 섹션
    sections.push({
      title: '정리',
      content: `오늘은 ${selectedTopic.title}에 대해 알아보았습니다.`,
      narration: `지금까지 ${selectedTopic.title}에 대해 살펴보았습니다. 다음 시간에는 더 심화된 내용으로 찾아뵙겠습니다.`,
      keyPoints: ['핵심 내용 복습', '실전 적용 방법', '다음 학습 예고']
    });

    setVideoSections(sections);
    setIsLoading(false);
  };

  const generateVideo = async () => {
    setIsGenerating(true);
    // 실제 구현에서는 서버 API 호출하여 비디오 생성
    // 각 섹션의 narration을 TTS로 변환하여 오디오 파일 생성
    // Remotion을 사용하여 비디오 렌더링
    setTimeout(() => {
      setIsGenerating(false);
      alert(`${selectedTopic.title} 비디오가 생성되었습니다! (데모)`);
    }, 3000);
  };

  const playNarration = async (text: string, sectionIndex?: number) => {
    try {
      setTtsLoading(true);
      stopNarration();
      
      // Google TTS API 호출
      const response = await fetch('/api/tts/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          voice: videoSettings.voice,
          language: videoSettings.language,
          speed: videoSettings.narrationSpeed
        })
      });

      if (!response.ok) {
        throw new Error('TTS 생성 실패');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      audioRef.current = new Audio(audioUrl);
      audioRef.current.playbackRate = 1.0; // Google TTS에서 이미 속도 조절됨
      
      audioRef.current.onended = () => {
        setIsPlaying(false);
        setPlayingSection(null);
        URL.revokeObjectURL(audioUrl);
      };
      
      await audioRef.current.play();
      setIsPlaying(true);
      if (sectionIndex !== undefined) {
        setPlayingSection(sectionIndex);
      }
      
    } catch (error) {
      console.error('TTS 재생 오류:', error);
      alert('음성 재생에 실패했습니다. API 키를 확인해주세요.');
    } finally {
      setTtsLoading(false);
    }
  };

  const stopNarration = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsPlaying(false);
    setPlayingSection(null);
  };

  const saveEditedNarration = (index: number) => {
    const updatedSections = [...videoSections];
    updatedSections[index].narration = editedNarration;
    setVideoSections(updatedSections);
    setEditingSection(null);
    setEditedNarration('');
  };

  const totalFrames = 90 + (videoSections.length * 180) + 120; // 인트로 + 섹션당 6초 + 아웃트로

  // 컴포넌트가 언마운트될 때 오디오 중지
  useEffect(() => {
    return () => {
      stopNarration();
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">주식 투자 비디오 생성기</h1>
        <p className="text-gray-600 dark:text-gray-400">
          커리큘럼 내용을 기반으로 자동으로 교육 비디오를 생성합니다
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 설정 패널 */}
        <div className="lg:col-span-1 space-y-6">
          {/* 모듈 선택 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Video className="w-5 h-5 text-blue-600" />
              모듈 선택
            </h3>
            <select
              value={selectedModule.id}
              onChange={(e) => {
                const module = stockCurriculumData.find(m => m.id === e.target.value)!;
                setSelectedModule(module);
                setSelectedTopic(module.topics[0]);
              }}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            >
              {stockCurriculumData.map(module => (
                <option key={module.id} value={module.id}>
                  {module.title}
                </option>
              ))}
            </select>
          </div>

          {/* 주제 선택 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="font-semibold mb-4">주제 선택</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {selectedModule.topics.map((topic, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedTopic(topic)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    selectedTopic === topic
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="font-medium">{topic.title}</div>
                  <div className="text-sm opacity-75">{topic.duration}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 비디오 설정 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-gray-600" />
              비디오 설정
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">스타일</label>
                <select
                  value={videoSettings.style}
                  onChange={(e) => setVideoSettings({...videoSettings, style: e.target.value as any})}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="professional">전문적</option>
                  <option value="educational">교육적</option>
                  <option value="dynamic">다이나믹</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  재생 속도: {videoSettings.narrationSpeed}x
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={videoSettings.narrationSpeed}
                  onChange={(e) => setVideoSettings({...videoSettings, narrationSpeed: parseFloat(e.target.value)})}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={videoSettings.includeCharts}
                    onChange={(e) => setVideoSettings({...videoSettings, includeCharts: e.target.checked})}
                    className="rounded"
                  />
                  <span className="text-sm">차트 포함</span>
                </label>
                
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={videoSettings.includeExamples}
                    onChange={(e) => setVideoSettings({...videoSettings, includeExamples: e.target.checked})}
                    className="rounded"
                  />
                  <span className="text-sm">실전 예제 포함</span>
                </label>
                
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={videoSettings.backgroundMusic}
                    onChange={(e) => setVideoSettings({...videoSettings, backgroundMusic: e.target.checked})}
                    className="rounded"
                  />
                  <span className="text-sm">배경음악</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">음성 설정</label>
                <select
                  value={videoSettings.voice}
                  onChange={(e) => setVideoSettings({...videoSettings, voice: e.target.value as any})}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="male">남성</option>
                  <option value="female">여성</option>
                  <option value="ai">AI 음성</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">언어</label>
                <select
                  value={videoSettings.language}
                  onChange={(e) => setVideoSettings({...videoSettings, language: e.target.value as any})}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="ko">한국어</option>
                  <option value="en">영어</option>
                </select>
              </div>
            </div>
          </div>

          {/* 생성 버튼 */}
          <button
            onClick={generateVideo}
            disabled={isGenerating || isPlaying}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                비디오 생성 중...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                비디오 생성하기
              </>
            )}
          </button>
        </div>

        {/* 비디오 프리뷰 */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 border-b dark:border-gray-700">
              <h3 className="font-semibold flex items-center gap-2">
                <Play className="w-5 h-5 text-green-600" />
                비디오 미리보기
              </h3>
            </div>
            
            <div className="relative bg-black" style={{ height: '400px' }}>
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader className="w-12 h-12 text-white animate-spin" />
                </div>
              ) : (
                <VideoPreview
                  topicTitle={selectedTopic.title}
                  sections={videoSections}
                  style={videoSettings.style}
                  moduleColor={selectedModule.color}
                />
              )}
            </div>
            
            {/* 비디오 정보 */}
            <div className="p-4 bg-gray-50 dark:bg-gray-900">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{selectedTopic.title}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  약 {Math.ceil(totalFrames / 30 / 60)}분 {Math.ceil((totalFrames / 30) % 60)}초
                </span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {videoSections.length}개 섹션 • {selectedTopic.difficulty === 1 ? '초급' : selectedTopic.difficulty === 2 ? '중급' : '고급'}
              </div>
            </div>
          </div>

          {/* 섹션 목록 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="font-semibold mb-4">비디오 구성 및 스크립트</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {videoSections.map((section, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden"
                >
                  <div className="flex items-center gap-3 p-3">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{section.title}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {section.charts && '차트 포함'} {section.examples && '• 예제 포함'}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (editingSection === index) {
                            saveEditedNarration(index);
                          } else {
                            setEditingSection(index);
                            setEditedNarration(section.narration);
                          }
                        }}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                      >
                        {editingSection === index ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => {
                          if (playingSection === index) {
                            stopNarration();
                          } else {
                            playNarration(section.narration, index);
                          }
                        }}
                        disabled={ttsLoading}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors disabled:opacity-50"
                        title={playingSection === index ? '정지' : '재생'}
                      >
                        {ttsLoading && playingSection === index ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : playingSection === index ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {/* 스크립트 편집 영역 */}
                  {editingSection === index && (
                    <div className="p-3 border-t dark:border-gray-600">
                      <textarea
                        value={editedNarration}
                        onChange={(e) => setEditedNarration(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600 resize-none"
                        rows={4}
                        placeholder="나레이션 스크립트를 입력하세요..."
                      />
                      <div className="flex items-center justify-end gap-2 mt-2">
                        <button
                          onClick={() => {
                            setEditingSection(null);
                            setEditedNarration('');
                          }}
                          className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => playNarration(editedNarration)}
                          disabled={ttsLoading || !editedNarration.trim()}
                          className="px-3 py-1 text-sm bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          미리듣기
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* 현재 스크립트 표시 */}
                  {editingSection !== index && (
                    <div className="px-3 pb-3">
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {section.narration}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};