'use client';

import React, { useState } from 'react';
import { 
  GraduationCap, Target, Clock, CheckCircle2, Circle,
  TrendingUp, Calculator, BarChart3, Brain, Shield,
  BookOpen, Users, Award, Star, ChevronRight, Lock,
  Zap, Activity, DollarSign, PieChart
} from 'lucide-react';

interface Module {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  duration: string;
  topics: Topic[];
  learningOutcomes: string[];
  prerequisites?: string[];
  tools?: string[];
}

interface Topic {
  title: string;
  duration: string;
  difficulty: 1 | 2 | 3;
  subtopics: string[];
  completed?: boolean;
}

const curriculum: Module[] = [
  {
    id: 'foundation',
    title: '금융시장의 이해',
    subtitle: '투자의 첫걸음, 기초 다지기',
    icon: BookOpen,
    color: 'from-blue-500 to-indigo-600',
    duration: '2주',
    topics: [
      {
        title: '주식시장의 구조와 원리',
        duration: '3일',
        difficulty: 1,
        subtopics: [
          '증권거래소의 역할과 기능',
          'KOSPI vs KOSDAQ vs KONEX',
          '주식 거래 시간과 매매 체결 원리',
          '시장 참여자들의 역할'
        ]
      },
      {
        title: '필수 금융 용어 마스터',
        duration: '2일',
        difficulty: 1,
        subtopics: [
          '시가, 종가, 고가, 저가의 의미',
          '거래량과 거래대금 분석',
          '호가창 읽기와 매수/매도 잔량',
          '시가총액과 유통주식수'
        ]
      },
      {
        title: '주문 유형과 거래 전략',
        duration: '2일',
        difficulty: 2,
        subtopics: [
          '시장가 vs 지정가 주문',
          'IOC, FOK 등 특수 주문',
          '프리마켓과 애프터마켓',
          '거래 수수료와 세금'
        ]
      }
    ],
    learningOutcomes: [
      '주식시장의 기본 구조를 이해하고 설명할 수 있다',
      '주요 금융 용어를 정확히 사용할 수 있다',
      '다양한 주문 방식을 상황에 맞게 활용할 수 있다'
    ],
    tools: ['증권사 HTS/MTS', '네이버 금융', '한국거래소']
  },
  {
    id: 'fundamental',
    title: '기본적 분석',
    subtitle: '기업의 진짜 가치 찾기',
    icon: Calculator,
    color: 'from-green-500 to-emerald-600',
    duration: '3주',
    topics: [
      {
        title: '재무제표 완전 정복',
        duration: '1주',
        difficulty: 2,
        subtopics: [
          '손익계산서 읽기와 분석',
          '재무상태표의 구성 요소',
          '현금흐름표의 중요성',
          '주석 사항 해석하기'
        ]
      },
      {
        title: '가치평가 지표 활용',
        duration: '4일',
        difficulty: 2,
        subtopics: [
          'PER (주가수익비율) 심화 분석',
          'PBR (주가순자산비율)과 ROE의 관계',
          'EV/EBITDA와 기업가치',
          'PSR과 성장주 평가'
        ]
      },
      {
        title: '산업 분석과 경쟁력 평가',
        duration: '3일',
        difficulty: 3,
        subtopics: [
          'Porter의 5 Forces 분석',
          '산업 생명주기와 투자 전략',
          '경쟁사 비교 분석 (Peer Analysis)',
          'SWOT 분석 실습'
        ]
      }
    ],
    learningOutcomes: [
      '재무제표를 읽고 기업의 재무 건전성을 평가할 수 있다',
      '다양한 가치평가 지표를 활용해 적정 주가를 산출할 수 있다',
      '산업 분석을 통해 기업의 성장 가능성을 예측할 수 있다'
    ],
    prerequisites: ['금융시장의 이해'],
    tools: ['DART', 'FnGuide', 'Excel/Google Sheets']
  },
  {
    id: 'technical',
    title: '기술적 분석',
    subtitle: '차트가 말하는 시장의 심리',
    icon: BarChart3,
    color: 'from-purple-500 to-pink-600',
    duration: '3주',
    topics: [
      {
        title: '차트의 기본과 캔들스틱',
        duration: '3일',
        difficulty: 2,
        subtopics: [
          '캔들스틱 패턴 20가지',
          '추세선과 지지/저항선',
          '갭(Gap) 이론과 활용',
          '거래량 분석의 중요성'
        ]
      },
      {
        title: '주요 기술적 지표',
        duration: '1주',
        difficulty: 3,
        subtopics: [
          '이동평균선 (SMA, EMA, WMA)',
          'RSI와 과매수/과매도 구간',
          'MACD의 해석과 매매 신호',
          '볼린저 밴드와 변동성'
        ]
      },
      {
        title: '고급 패턴과 전략',
        duration: '4일',
        difficulty: 3,
        subtopics: [
          '엘리엇 파동 이론',
          '피보나치 되돌림',
          '하모닉 패턴',
          '다이버전스 매매법'
        ]
      }
    ],
    learningOutcomes: [
      '다양한 차트 패턴을 인식하고 해석할 수 있다',
      '기술적 지표를 조합하여 매매 신호를 포착할 수 있다',
      '차트 분석을 통해 진입/청산 시점을 결정할 수 있다'
    ],
    prerequisites: ['금융시장의 이해'],
    tools: ['TradingView', '증권사 차트', 'Python (TA-Lib)']
  },
  {
    id: 'portfolio',
    title: '포트폴리오 관리',
    subtitle: '수익과 리스크의 균형 잡기',
    icon: PieChart,
    color: 'from-orange-500 to-red-600',
    duration: '2주',
    topics: [
      {
        title: '현대 포트폴리오 이론',
        duration: '3일',
        difficulty: 3,
        subtopics: [
          '효율적 투자선과 최적 포트폴리오',
          '베타와 상관계수의 이해',
          '샤프 비율과 성과 측정',
          'CAPM 모델 활용'
        ]
      },
      {
        title: '자산 배분 전략',
        duration: '3일',
        difficulty: 2,
        subtopics: [
          '전략적 vs 전술적 자산배분',
          '리밸런싱의 타이밍과 방법',
          '섹터 로테이션 전략',
          '해외 투자와 환헤지'
        ]
      },
      {
        title: '리스크 관리',
        duration: '1일',
        difficulty: 3,
        subtopics: [
          'VaR (Value at Risk) 계산',
          '손절매와 익절매 전략',
          '포지션 사이징 기법',
          '헤지 전략과 옵션 활용'
        ]
      }
    ],
    learningOutcomes: [
      '효율적인 포트폴리오를 구성할 수 있다',
      '리스크를 정량화하고 관리할 수 있다',
      '시장 상황에 맞는 자산 배분 전략을 수립할 수 있다'
    ],
    prerequisites: ['기본적 분석', '기술적 분석'],
    tools: ['Portfolio Visualizer', 'Excel VBA', 'Python']
  },
  {
    id: 'advanced',
    title: 'AI & 퀀트 투자',
    subtitle: '데이터가 만드는 수익',
    icon: Brain,
    color: 'from-indigo-500 to-purple-600',
    duration: '4주',
    topics: [
      {
        title: '퀀트 투자의 기초',
        duration: '1주',
        difficulty: 3,
        subtopics: [
          '팩터 투자의 이해',
          '백테스팅과 전략 검증',
          '알고리즘 트레이딩 입문',
          'API를 활용한 자동매매'
        ]
      },
      {
        title: '머신러닝 투자 전략',
        duration: '2주',
        difficulty: 3,
        subtopics: [
          '주가 예측 모델 구축',
          '감성 분석과 뉴스 트레이딩',
          '딥러닝을 활용한 패턴 인식',
          '강화학습과 포트폴리오 최적화'
        ]
      },
      {
        title: '실전 프로젝트',
        duration: '1주',
        difficulty: 3,
        subtopics: [
          '나만의 투자 전략 개발',
          '실시간 모니터링 시스템',
          '성과 분석과 개선',
          '리스크 관리 자동화'
        ]
      }
    ],
    learningOutcomes: [
      '퀀트 전략을 설계하고 백테스팅할 수 있다',
      'AI를 활용한 투자 모델을 구축할 수 있다',
      '자동화된 투자 시스템을 운영할 수 있다'
    ],
    prerequisites: ['포트폴리오 관리'],
    tools: ['Python', 'Jupyter Notebook', 'QuantLib', 'TensorFlow']
  }
];

const difficultyLabels = ['초급', '중급', '고급'];
const difficultyColors = ['text-green-600', 'text-yellow-600', 'text-red-600'];

export function StockCurriculum() {
  const [selectedModule, setSelectedModule] = useState<Module>(curriculum[0]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>([]);

  const toggleTopic = (topicTitle: string) => {
    setExpandedTopics(prev =>
      prev.includes(topicTitle)
        ? prev.filter(t => t !== topicTitle)
        : [...prev, topicTitle]
    );
  };

  const totalDuration = curriculum.reduce((acc, module) => {
    const weeks = parseInt(module.duration);
    return acc + weeks;
  }, 0);

  const totalTopics = curriculum.reduce((acc, module) => {
    return acc + module.topics.length;
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">
              주식투자분석 마스터 과정
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              초보자부터 전문가까지, 체계적인 8주 완성 커리큘럼
            </p>
            
            <div className="flex justify-center gap-8 mb-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">{totalDuration}주</div>
                <div className="text-sm">총 학습 기간</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">{curriculum.length}개</div>
                <div className="text-sm">핵심 모듈</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">{totalTopics}개</div>
                <div className="text-sm">세부 주제</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave Effect */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-20">
            <path
              fill="currentColor"
              className="text-gray-50 dark:text-gray-900"
              d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            />
          </svg>
        </div>
      </section>

      {/* Curriculum Timeline */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">학습 로드맵</h2>
        
        {/* Module Selection */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
          {curriculum.map((module, index) => {
            const Icon = module.icon;
            const isSelected = selectedModule.id === module.id;
            const isLocked = index > 0 && !curriculum[index - 1].topics.every(t => t.completed);
            
            return (
              <button
                key={module.id}
                onClick={() => !isLocked && setSelectedModule(module)}
                disabled={isLocked}
                className={`
                  relative p-6 rounded-xl transition-all text-left
                  ${isSelected 
                    ? 'bg-white dark:bg-gray-800 shadow-xl scale-105' 
                    : 'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800'
                  }
                  ${isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                {isLocked && (
                  <div className="absolute top-2 right-2">
                    <Lock className="w-4 h-4 text-gray-400" />
                  </div>
                )}
                
                <div className={`
                  w-12 h-12 rounded-lg flex items-center justify-center mb-3
                  bg-gradient-to-r ${module.color} text-white
                `}>
                  <Icon className="w-6 h-6" />
                </div>
                
                <h3 className="font-semibold text-sm mb-1">{module.title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  {module.duration}
                </p>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full bg-gradient-to-r ${module.color}`}
                    style={{ width: '0%' }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Module Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Module Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Module Header */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className={`
                  w-16 h-16 rounded-xl flex items-center justify-center
                  bg-gradient-to-r ${selectedModule.color} text-white
                `}>
                  <selectedModule.icon className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-1">{selectedModule.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedModule.subtitle}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">예상 학습 기간</div>
                  <div className="text-xl font-semibold">{selectedModule.duration}</div>
                </div>
              </div>

              {/* Learning Outcomes */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  학습 목표
                </h3>
                <ul className="space-y-2">
                  {selectedModule.learningOutcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prerequisites */}
              {selectedModule.prerequisites && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-purple-600" />
                    선수 과목
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedModule.prerequisites.map((prereq, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm"
                      >
                        {prereq}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tools */}
              {selectedModule.tools && (
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-orange-600" />
                    사용 도구
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedModule.tools.map((tool, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Topics */}
            <div className="space-y-4">
              {selectedModule.topics.map((topic, topicIndex) => (
                <div
                  key={topicIndex}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleTopic(topic.title)}
                    className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 text-sm font-semibold">
                          {topicIndex + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{topic.title}</h3>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-sm text-gray-500 flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {topic.duration}
                            </span>
                            <span className={`text-sm font-medium ${difficultyColors[topic.difficulty - 1]}`}>
                              {difficultyLabels[topic.difficulty - 1]}
                            </span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className={`
                        w-5 h-5 text-gray-400 transition-transform
                        ${expandedTopics.includes(topic.title) ? 'rotate-90' : ''}
                      `} />
                    </div>
                  </button>

                  {/* Subtopics */}
                  {expandedTopics.includes(topic.title) && (
                    <div className="px-6 pb-6">
                      <div className="border-t dark:border-gray-700 pt-4">
                        <h4 className="font-medium mb-3 text-sm text-gray-600 dark:text-gray-400">
                          세부 학습 내용
                        </h4>
                        <ul className="space-y-2">
                          {topic.subtopics.map((subtopic, subIndex) => (
                            <li key={subIndex} className="flex items-start gap-2">
                              <Circle className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300">
                                {subtopic}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Progress and Stats */}
          <div className="space-y-6">
            {/* Progress Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                학습 진행 상황
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>전체 진도율</span>
                    <span className="font-semibold">0%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{ width: '0%' }} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">0</div>
                    <div className="text-xs text-gray-500">완료한 주제</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">0h</div>
                    <div className="text-xs text-gray-500">학습 시간</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievement Card */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-orange-600" />
                획득 가능 배지
              </h3>
              
              <div className="grid grid-cols-3 gap-3">
                {['주식 입문자', '차트 분석가', 'AI 트레이더'].map((badge, index) => (
                  <div
                    key={index}
                    className="aspect-square bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shadow-md"
                  >
                    <Star className="w-8 h-8 text-gray-300" />
                  </div>
                ))}
              </div>
            </div>

            {/* Study Tips */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                학습 팁
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    매일 1-2시간씩 꾸준히 학습하세요
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    실제 차트를 보며 실습하세요
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    모의투자로 리스크 없이 연습하세요
                  </span>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-600" />
                학습 커뮤니티
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                함께 학습하는 동료들과 소통하고 질문을 나누세요
              </p>
              <button className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                커뮤니티 참여하기
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}