// 주식투자분석 커리큘럼 데이터 구조

export interface Quiz {
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  category?: string;
}

export interface PracticeCase {
  title: string;
  scenario: string;
  task: string;
  hints: string[];
  solution: string;
  realWorldContext?: string;
  followUpQuestions?: string[];
}

export interface Topic {
  title: string;
  duration: string;
  difficulty: 1 | 2 | 3;
  subtopics: string[];
  completed?: boolean;
  quiz?: Quiz;
  practiceCase?: PracticeCase;
  keyPoints?: string[];
  videoResources?: VideoResource[];
  readingMaterials?: ReadingMaterial[];
  exercises?: Exercise[];
}

export interface VideoResource {
  title: string;
  url: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

export interface ReadingMaterial {
  title: string;
  author?: string;
  url?: string;
  type: 'article' | 'book' | 'report' | 'research';
  estimatedTime: string;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  type: 'calculation' | 'analysis' | 'strategy' | 'simulation';
  data?: any;
  solution?: string;
}

export interface Module {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  color: string;
  duration: string;
  topics: Topic[];
  learningOutcomes: string[];
  prerequisites?: string[];
  tools?: string[];
  industryConnections?: string[];
  certificationPath?: string[];
  projectIdeas?: string[];
}

export const stockCurriculumData: Module[] = [
  {
    id: 'foundation',
    title: '금융시장의 이해',
    subtitle: '투자의 첫걸음, 기초 다지기',
    icon: 'BookOpen',
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
        ],
        keyPoints: [
          '한국거래소(KRX)는 유가증권시장과 코스닥시장을 운영',
          'KOSPI는 대기업, KOSDAQ은 중소/벤처기업 중심',
          '정규시장: 09:00~15:30 (동시호가 09:00, 15:20~15:30)',
          '기관투자자, 외국인, 개인투자자의 투자 패턴 차이'
        ],
        quiz: {
          questions: [
            {
              id: 'q1',
              question: 'KOSPI 시장의 정규 거래 시간은?',
              options: [
                '08:00 ~ 15:00',
                '09:00 ~ 15:30',
                '09:30 ~ 16:00',
                '10:00 ~ 17:00'
              ],
              correctAnswer: 1,
              explanation: 'KOSPI 시장은 09:00에 개장하여 15:30에 폐장합니다. 09:00는 시가 결정을 위한 동시호가이며, 15:20~15:30은 종가 결정을 위한 동시호가 시간입니다.',
              difficulty: 'easy',
              category: 'market_structure'
            },
            {
              id: 'q2',
              question: '다음 중 KOSDAQ 시장에 상장된 기업의 특징은?',
              options: [
                '대기업 위주',
                '중소·벤처기업 위주',
                '외국 기업 위주',
                '금융 기업 위주'
              ],
              correctAnswer: 1,
              explanation: 'KOSDAQ은 중소기업과 벤처기업을 위한 시장으로, 성장 가능성이 높은 기술 기업들이 많이 상장되어 있습니다.',
              difficulty: 'easy',
              category: 'market_structure'
            }
          ]
        },
        practiceCase: {
          title: '시장 선택하기',
          scenario: '당신은 AI 기술을 개발하는 스타트업의 대표입니다. 회사가 성장하여 상장을 고려하고 있습니다.',
          task: 'KOSPI와 KOSDAQ 중 어느 시장에 상장하는 것이 적합할까요?',
          hints: [
            '회사의 규모와 업력을 고려하세요',
            '각 시장의 상장 요건을 비교해보세요',
            '투자자들의 선호도를 생각해보세요'
          ],
          solution: '기술 스타트업의 경우 일반적으로 KOSDAQ 시장이 적합합니다. KOSDAQ은 상장 요건이 상대적으로 완화되어 있고, 성장 가능성이 높은 기술 기업에 대한 투자자들의 관심이 높습니다.',
          realWorldContext: '네이버, 카카오, 셀트리온 등 많은 기술 기업들이 KOSDAQ에서 시작하여 성장했습니다.',
          followUpQuestions: [
            '상장 후 KOSPI로 이전상장하는 조건은 무엇일까요?',
            '각 시장별 투자자 구성의 차이점은?'
          ]
        },
        videoResources: [
          {
            title: '한국 주식시장의 이해',
            url: 'https://example.com/video1',
            duration: '15분',
            level: 'beginner'
          }
        ],
        readingMaterials: [
          {
            title: '한국거래소 시장구조 가이드',
            author: '한국거래소',
            type: 'article',
            estimatedTime: '20분'
          }
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
        ],
        keyPoints: [
          '시가총액 = 현재 주가 × 발행주식수',
          '거래량은 주식의 유동성을 나타내는 중요 지표',
          '호가창의 매수/매도 잔량으로 단기 수급 파악 가능',
          'OHLC(시고저종)는 캔들차트의 기본 구성 요소'
        ],
        quiz: {
          questions: [
            {
              id: 'q3',
              question: '주식의 시가총액이 1조원이고 발행주식수가 1억주라면, 현재 주가는?',
              options: [
                '1,000원',
                '10,000원',
                '100,000원',
                '1,000,000원'
              ],
              correctAnswer: 1,
              explanation: '시가총액 = 주가 × 발행주식수이므로, 주가 = 시가총액 ÷ 발행주식수 = 1조원 ÷ 1억주 = 10,000원입니다.',
              difficulty: 'easy',
              category: 'basic_terms'
            }
          ]
        },
        exercises: [
          {
            id: 'ex1',
            title: '시가총액 계산 연습',
            description: '다양한 기업의 시가총액을 계산해보세요',
            type: 'calculation',
            data: {
              companies: [
                { name: '삼성전자', price: 70000, shares: 5969782550 },
                { name: 'SK하이닉스', price: 120000, shares: 728002365 }
              ]
            }
          }
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
        ],
        keyPoints: [
          '시장가: 즉시 체결, 지정가: 원하는 가격에 체결',
          'IOC(즉시체결취소), FOK(전량체결취소)',
          '프리마켓(08:30~09:00), 애프터마켓(15:30~16:00)',
          '매매수수료 0.015%, 거래세 0.23% (매도시)'
        ],
        practiceCase: {
          title: '최적의 주문 방식 선택',
          scenario: '삼성전자 주식을 매수하려고 합니다. 현재가는 70,000원이며, 장중 변동성이 큰 상황입니다.',
          task: '어떤 주문 방식을 선택하는 것이 좋을까요?',
          hints: [
            '가격 변동성이 클 때의 리스크를 고려하세요',
            '체결 확실성 vs 가격 유리함을 비교하세요',
            '투자 목적(단기/장기)을 생각해보세요'
          ],
          solution: '변동성이 큰 상황에서는 지정가 주문이 유리합니다. 원하는 가격에 매수할 수 있어 비싸게 사는 것을 방지할 수 있습니다. 단, 체결이 안 될 수도 있으므로 시장 상황을 보며 가격을 조정해야 합니다.'
        }
      }
    ],
    learningOutcomes: [
      '주식시장의 기본 구조를 이해하고 설명할 수 있다',
      '주요 금융 용어를 정확히 사용할 수 있다',
      '다양한 주문 방식을 상황에 맞게 활용할 수 있다'
    ],
    tools: ['증권사 HTS/MTS', '네이버 금융', '한국거래소'],
    industryConnections: ['증권회사', '자산운용사', '금융데이터 제공업체'],
    certificationPath: ['투자상담사', '펀드투자권유대행인'],
    projectIdeas: [
      '개인 포트폴리오 구성하기',
      '모의투자 대회 참여',
      '주식 투자 블로그 운영'
    ]
  },
  
  {
    id: 'fundamental',
    title: '기본적 분석',
    subtitle: '기업의 진짜 가치 찾기',
    icon: 'Calculator',
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
        ],
        keyPoints: [
          '손익계산서: 매출 - 비용 = 순이익',
          '재무상태표: 자산 = 부채 + 자본',
          '현금흐름표: 영업/투자/재무 활동',
          'DART에서 공시 자료 확인 필수'
        ],
        quiz: {
          questions: [
            {
              id: 'q4',
              question: '다음 중 기업의 수익성을 판단하는 데 가장 유용한 재무제표는?',
              options: [
                '재무상태표',
                '손익계산서',
                '현금흐름표',
                '자본변동표'
              ],
              correctAnswer: 1,
              explanation: '손익계산서는 일정 기간 동안의 매출과 비용, 그리고 순이익을 보여주어 기업의 수익성을 판단하는 데 가장 유용합니다.',
              difficulty: 'medium',
              category: 'financial_statements'
            },
            {
              id: 'q5',
              question: '영업활동현금흐름이 순이익보다 낮은 경우의 의미는?',
              options: [
                '회계상 이익보다 실제 현금 창출이 적음',
                '기업이 적자를 기록함',
                '투자가 과도함',
                '재무 상태가 양호함'
              ],
              correctAnswer: 0,
              explanation: '영업활동현금흐름이 순이익보다 낮다는 것은 회계상 이익이 실제 현금 창출로 이어지지 않고 있음을 의미하며, 매출채권 증가나 재고 증가 등이 원인일 수 있습니다.',
              difficulty: 'hard',
              category: 'cash_flow'
            }
          ]
        },
        practiceCase: {
          title: '재무제표 분석 실습',
          scenario: 'A기업의 최근 3년간 재무제표를 분석해야 합니다.',
          task: '이 기업의 재무 건전성과 수익성을 평가해보세요.',
          hints: [
            '매출액과 순이익의 증감 추이를 확인하세요',
            '부채비율과 유동비율을 계산해보세요',
            '영업활동현금흐름과 순이익을 비교하세요'
          ],
          solution: '재무제표 분석시에는 1) 수익성 지표(매출총이익률, 영업이익률, 순이익률), 2) 안정성 지표(부채비율, 유동비율), 3) 활동성 지표(총자산회전율, 재고자산회전율), 4) 성장성 지표(매출액증가율, 순이익증가율)를 종합적으로 검토해야 합니다.'
        },
        exercises: [
          {
            id: 'ex2',
            title: '재무비율 계산기',
            description: '주요 재무비율을 직접 계산해보세요',
            type: 'calculation'
          }
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
        ],
        keyPoints: [
          'PER = 주가 ÷ 주당순이익(EPS)',
          'PBR = 주가 ÷ 주당순자산(BPS)',
          'ROE = 순이익 ÷ 자기자본',
          'EV/EBITDA = 기업가치 ÷ EBITDA'
        ],
        practiceCase: {
          title: '적정 주가 계산하기',
          scenario: 'A기업의 주당순이익(EPS)은 5,000원, 동종업계 평균 PER은 15배입니다. 현재 주가는 90,000원입니다.',
          task: '이 주식이 고평가되었는지, 저평가되었는지 판단해보세요.',
          hints: [
            '적정 주가 = EPS × 업계 평균 PER',
            '현재 PER = 현재 주가 ÷ EPS',
            '업계 평균과 비교해 투자 판단'
          ],
          solution: '적정 주가 = 5,000원 × 15배 = 75,000원. 현재 주가 90,000원은 적정 주가보다 20% 높아 고평가 상태입니다. 현재 PER은 18배(90,000÷5,000)로 업계 평균보다 높습니다.'
        }
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
        ],
        keyPoints: [
          'Porter 5 Forces: 경쟁업체, 신규진입, 대체재, 공급업체, 구매업체의 힘',
          '산업 생명주기: 도입기, 성장기, 성숙기, 쇠퇴기',
          'Peer Analysis로 상대적 밸류에이션 평가',
          'SWOT: 강점, 약점, 기회, 위협 분석'
        ],
        practiceCase: {
          title: '전기차 산업 분석',
          scenario: '전기차 산업에 투자를 고려하고 있습니다.',
          task: 'Porter의 5 Forces를 활용해 전기차 산업의 매력도를 분석해보세요.',
          hints: [
            '기존 자동차 업체들의 전기차 진출 현황',
            '배터리 기술의 중요성',
            '정부 정책과 환경 규제',
            '충전 인프라 구축 현황'
          ],
          solution: '전기차 산업은 1) 높은 진입장벽(대규모 투자 필요), 2) 강한 공급업체 파워(배터리), 3) 높은 대체재 위협(기존 내연기관), 4) 강한 구매업체 파워(정부 정책 의존), 5) 치열한 경쟁(기존 업체 + 신규 업체)을 특징으로 합니다.'
        }
      }
    ],
    learningOutcomes: [
      '재무제표를 읽고 기업의 재무 건전성을 평가할 수 있다',
      '다양한 가치평가 지표를 활용해 적정 주가를 산출할 수 있다',
      '산업 분석을 통해 기업의 성장 가능성을 예측할 수 있다'
    ],
    prerequisites: ['금융시장의 이해'],
    tools: ['DART', 'FnGuide', 'Excel/Google Sheets', 'Bloomberg Terminal'],
    industryConnections: ['투자은행', 'PEF', '신용평가회사', '회계법인'],
    certificationPath: ['재무분석사(CFA)', '공인회계사(CPA)']
  },

  {
    id: 'technical',
    title: '기술적 분석',
    subtitle: '차트가 말하는 시장의 심리',
    icon: 'BarChart3',
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
        ],
        keyPoints: [
          '캔들스틱: 시가, 고가, 저가, 종가 정보 포함',
          '지지선: 하락을 막는 가격대, 저항선: 상승을 막는 가격대',
          '갭: 전일 종가와 금일 시가의 차이',
          '거래량은 가격 움직임의 신뢰도를 높임'
        ],
        quiz: {
          questions: [
            {
              id: 'q6',
              question: '다음 중 강세 반전 신호로 해석되는 캔들 패턴은?',
              options: [
                '도지(Doji)',
                '해머(Hammer)',
                '슈팅스타(Shooting Star)',
                '베어링 엔굴핑(Bearish Engulfing)'
              ],
              correctAnswer: 1,
              explanation: '해머는 하락 추세에서 나타나는 강세 반전 신호로, 긴 아래꼬리와 작은 몸통이 특징입니다.',
              difficulty: 'medium',
              category: 'candlestick'
            }
          ]
        },
        practiceCase: {
          title: '차트 패턴 인식',
          scenario: '삼성전자 일봉 차트에서 여러 캔들스틱 패턴이 나타났습니다.',
          task: '차트에서 주요 지지/저항선을 찾고 매매 신호를 분석해보세요.',
          hints: [
            '최근 고점과 저점을 연결해 추세선 그리기',
            '거래량 증가와 함께 나타나는 패턴에 주목',
            '여러 패턴의 조합으로 신호 강도 판단'
          ],
          solution: '차트 분석시 1) 전체적인 추세 파악, 2) 주요 지지/저항선 확인, 3) 캔들스틱 패턴 분석, 4) 거래량 확인, 5) 종합적 매매 신호 도출 순서로 진행합니다.'
        }
      }
    ],
    learningOutcomes: [
      '다양한 차트 패턴을 인식하고 해석할 수 있다',
      '기술적 지표를 조합하여 매매 신호를 포착할 수 있다',
      '차트 분석을 통해 진입/청산 시점을 결정할 수 있다'
    ],
    prerequisites: ['금융시장의 이해'],
    tools: ['TradingView', '증권사 차트', 'Python (TA-Lib)', 'MetaTrader']
  },

  {
    id: 'portfolio',
    title: '포트폴리오 관리',
    subtitle: '수익과 리스크의 균형 잡기',
    icon: 'PieChart',
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
        ],
        keyPoints: [
          '분산투자를 통한 리스크 감소',
          '베타: 시장 대비 변동성 측정',
          '샤프 비율: 위험 대비 수익률',
          'CAPM: 자본자산가격모델'
        ]
      }
    ],
    learningOutcomes: [
      '효율적인 포트폴리오를 구성할 수 있다',
      '리스크를 정량화하고 관리할 수 있다',
      '시장 상황에 맞는 자산 배분 전략을 수립할 수 있다'
    ],
    prerequisites: ['기본적 분석', '기술적 분석'],
    tools: ['Portfolio Visualizer', 'Excel VBA', 'Python', 'R']
  },

  {
    id: 'advanced',
    title: 'AI & 퀀트 투자',
    subtitle: '데이터가 만드는 수익',
    icon: 'Brain',
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
        ],
        keyPoints: [
          '팩터: 가치, 성장, 모멘텀, 퀄리티 등',
          '백테스팅: 과거 데이터로 전략 검증',
          '알고 트레이딩: 자동화된 매매 시스템',
          'API: 실시간 데이터 수집과 주문 실행'
        ]
      }
    ],
    learningOutcomes: [
      '퀀트 전략을 설계하고 백테스팅할 수 있다',
      'AI를 활용한 투자 모델을 구축할 수 있다',
      '자동화된 투자 시스템을 운영할 수 있다'
    ],
    prerequisites: ['포트폴리오 관리'],
    tools: ['Python', 'Jupyter Notebook', 'QuantLib', 'TensorFlow', 'PyTorch']
  }
];

export const difficultyLabels = ['초급', '중급', '고급'];
export const difficultyColors = ['text-green-600', 'text-yellow-600', 'text-red-600'];