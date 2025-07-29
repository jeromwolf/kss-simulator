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

export interface ChartExample {
  title: string;
  description: string;
  imageUrl: string;
  notes?: string[];
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
  chartExamples?: ChartExample[];
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
      },
      {
        title: '업종과 섹터의 이해',
        duration: '3일',
        difficulty: 2,
        subtopics: [
          'GICS 산업 분류 체계',
          '경기민감주 vs 경기방어주',
          '성장주 vs 가치주 vs 배당주',
          '테마주와 모멘텀 투자'
        ],
        keyPoints: [
          'GICS: 11개 섹터로 구분된 글로벌 산업 분류',
          '경기민감주: 자동차, 건설, 금융 등',
          '경기방어주: 필수소비재, 유틸리티, 헬스케어',
          '테마주 투자시 펀더멘털 확인 필수'
        ],
        quiz: {
          questions: [
            {
              id: 'q8',
              question: '경기 침체기에 상대적으로 안정적인 섹터는?',
              options: [
                '자동차',
                '필수소비재',
                '건설',
                'IT'
              ],
              correctAnswer: 1,
              explanation: '필수소비재는 경기와 관계없이 꾸준한 수요가 있어 경기 침체기에도 상대적으로 안정적입니다.',
              difficulty: 'medium',
              category: 'sector'
            }
          ]
        }
      },
      {
        title: '글로벌 시장과 환율',
        duration: '2일',
        difficulty: 3,
        subtopics: [
          '미국, 중국, 일본 시장의 특징',
          '환율이 주가에 미치는 영향',
          'ADR과 해외주식 투자',
          '글로벌 경제지표 읽기'
        ],
        keyPoints: [
          '미국 시장: 세계 최대, 기술주 중심',
          '중국 시장: 성장 잠재력, 정책 리스크',
          '원/달러 환율 상승 → 수출주 유리',
          'ADR: 한국 기업의 미국 상장 증권'
        ],
        practiceCase: {
          title: '환율 변동과 투자 전략',
          scenario: '원/달러 환율이 급등하고 있습니다. 어떤 종목에 투자해야 할까요?',
          task: '환율 상승 수혜주와 피해주를 구분하고 투자 전략을 세워보세요.',
          hints: [
            '수출 비중이 높은 기업 찾기',
            '원재료 수입 의존도 확인',
            '외화 부채 규모 점검'
          ],
          solution: '환율 상승시 수출 기업(삼성전자, 현대차 등)은 수혜를 받고, 수입 의존도가 높은 기업(항공사 등)은 피해를 받습니다. 포트폴리오의 환 헤지 전략도 고려해야 합니다.'
        }
      }
    ],
    learningOutcomes: [
      '주식시장의 기본 구조를 이해하고 설명할 수 있다',
      '주요 금융 용어를 정확히 사용할 수 있다',
      '다양한 주문 방식을 상황에 맞게 활용할 수 있다',
      '업종별 특성을 파악하고 순환 투자를 할 수 있다',
      '글로벌 시장 동향을 분석하고 환 리스크를 관리할 수 있다'
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
    id: 'stock-dictionary',
    title: '주식 투자 용어 사전',
    subtitle: '알아야 할 모든 투자 용어 총정리',
    icon: 'BookOpen',
    color: 'from-purple-500 to-pink-600',
    duration: '3주',
    topics: [
      {
        title: '기본 시장 용어',
        duration: '2일',
        difficulty: 1,
        subtopics: [
          '주식, 주주, 배당, 액면가의 개념',
          '상장, 상장폐지, 관리종목, 투자주의종목',
          '증자(유상/무상), 감자, 액면분할/병합',
          '주주총회, 의결권, 소액주주',
          '대주주, 최대주주, 특수관계인',
          '자사주, 자사주 매입/소각'
        ],
        keyPoints: [
          '주식: 기업 소유권을 나타내는 증권',
          '배당: 기업 이익을 주주에게 분배',
          '유상증자: 신주 발행으로 자금 조달',
          '무상증자: 이익잉여금을 자본금으로 전입',
          '관리종목: 상장폐지 위험이 있는 종목',
          '자사주: 회사가 자기 주식을 매입하여 보유'
        ],
        quiz: {
          questions: [
            {
              id: 'dict-q1',
              question: '무상증자 후 주가는 일반적으로 어떻게 변동하나요?',
              options: [
                '상승한다',
                '변동 없다',
                '권리락으로 하락한다',
                '예측 불가능하다'
              ],
              correctAnswer: 2,
              explanation: '무상증자 시 주식수가 증가하므로 권리락이 발생하여 주가가 이론적으로 하락합니다. 예를 들어 1:1 무상증자 시 주가는 절반으로 조정됩니다.',
              difficulty: 'medium',
              category: 'corporate_action'
            }
          ]
        },
        exercises: [
          {
            id: 'dict-ex1',
            title: '용어 매칭 게임',
            description: '주요 용어와 정의를 연결하는 연습',
            type: 'simulation',
            data: {
              terms: ['배당', '증자', '감자', '자사주', '관리종목'],
              definitions: ['이익 분배', '자본금 증가', '자본금 감소', '자기주식', '상장폐지 위험']
            }
          }
        ]
      },
      {
        title: '거래 관련 용어',
        duration: '3일',
        difficulty: 1,
        subtopics: [
          '호가, 매수호가, 매도호가, 스프레드',
          '체결, 미체결, 정정, 취소',
          '상한가, 하한가, 가격제한폭',
          '시가, 종가, 고가, 저가, 전일대비',
          '거래량, 거래대금, 거래회전율',
          '매집, 분산, 세력, 작전'
        ],
        keyPoints: [
          '호가: 매수/매도 주문 가격',
          '스프레드: 매수/매도 호가 차이',
          '가격제한폭: ±30% (코스피/코스닥)',
          '거래회전율: 거래량/상장주식수',
          '매집: 특정 세력이 주식을 모으는 행위',
          '작전: 인위적 시세 조작 (불법)'
        ],
        practiceCase: {
          title: '호가창 분석하기',
          scenario: '특정 종목의 호가창에서 매도 물량이 특정 가격대에 집중되어 있습니다.',
          task: '이러한 현상의 의미와 대응 전략을 분석하세요.',
          hints: [
            '매도 벽의 의미를 생각해보세요',
            '돌파 시 주가 움직임을 예상해보세요',
            '세력의 의도를 추측해보세요'
          ],
          solution: '특정 가격대의 대량 매도 물량은 저항선 역할을 하며, 이를 돌파하면 상승 모멘텀이 강화될 수 있습니다. 다만 허수 주문일 가능성도 있으므로 실제 체결 여부를 확인해야 합니다.'
        }
      },
      {
        title: '기술적 분석 용어',
        duration: '4일',
        difficulty: 2,
        subtopics: [
          '캔들차트: 양봉, 음봉, 십자선, 도지',
          '이동평균선: 단순, 지수, 가중이동평균',
          '추세: 상승, 하락, 박스권, 추세선',
          '지지선, 저항선, 돌파, 이탈',
          '거래량 지표: OBV, VR, AD Line',
          '모멘텀 지표: RSI, 스토캐스틱, MACD'
        ],
        keyPoints: [
          '양봉: 종가 > 시가 (상승)',
          '음봉: 종가 < 시가 (하락)',
          '골든크로스: 단기이평 > 장기이평',
          '데드크로스: 단기이평 < 장기이평',
          'RSI 70 이상: 과매수 구간',
          'RSI 30 이하: 과매도 구간'
        ],
        chartExamples: [
          {
            title: '주요 캔들 패턴',
            description: '망치형, 역망치형, 도지, 샛별형 등 주요 캔들 패턴',
            imageUrl: '/chart/candle-patterns',
            notes: [
              '망치형: 바닥에서 반전 신호',
              '샛별형: 천정에서 하락 전환 신호',
              '도지: 매수/매도 세력 균형'
            ]
          }
        ],
        quiz: {
          questions: [
            {
              id: 'dict-q2',
              question: 'MACD 지표에서 시그널선을 상향 돌파하는 것을 무엇이라 하나요?',
              options: [
                '데드크로스',
                '골든크로스',
                '다이버전스',
                '컨버전스'
              ],
              correctAnswer: 1,
              explanation: 'MACD선이 시그널선을 상향 돌파하는 것을 골든크로스라 하며, 매수 신호로 해석됩니다.',
              difficulty: 'medium',
              category: 'technical_indicator'
            }
          ]
        }
      },
      {
        title: '기본적 분석 용어',
        duration: '4일',
        difficulty: 2,
        subtopics: [
          '재무제표: BS, IS, CF, 주석',
          'PER, PBR, PSR, PCR, PEG',
          'ROE, ROA, ROIC, ROI',
          'EPS, BPS, DPS, CPS',
          '부채비율, 유동비율, 당좌비율',
          'EBITDA, EBIT, FCF'
        ],
        keyPoints: [
          'PER = 주가 / 주당순이익',
          'PBR = 주가 / 주당순자산',
          'ROE = 순이익 / 자기자본',
          'EPS = 순이익 / 발행주식수',
          'EBITDA = 세전영업이익 + 감가상각비',
          'FCF = 영업현금흐름 - 자본적지출'
        ],
        exercises: [
          {
            id: 'dict-ex2',
            title: '재무비율 계산 연습',
            description: '실제 기업 데이터로 주요 비율 계산하기',
            type: 'calculation',
            data: {
              company: '삼성전자',
              netIncome: 40000,
              equity: 300000,
              shares: 6000,
              price: 70000
            }
          }
        ]
      },
      {
        title: '파생상품 용어',
        duration: '3일',
        difficulty: 3,
        subtopics: [
          '선물: 만기, 롤오버, 베이시스',
          '옵션: 콜, 풋, 행사가, 프리미엄',
          'ETF, ETN, ELS, ELW',
          '레버리지, 인버스, 인버스2X',
          '헤지, 차익거래, 페어트레이딩',
          '콘탱고, 백워데이션'
        ],
        keyPoints: [
          '콜옵션: 매수할 권리',
          '풋옵션: 매도할 권리',
          'ETF: 상장지수펀드',
          'ELS: 주가연계증권',
          '레버리지: 지수 2배 추종',
          '인버스: 지수 반대 추종'
        ],
        practiceCase: {
          title: 'ETF 활용 전략',
          scenario: 'KOSPI200이 하락할 것으로 예상됩니다.',
          task: '어떤 ETF를 활용하여 수익을 낼 수 있을까요?',
          hints: [
            '인버스 ETF의 특성을 활용하세요',
            '레버리지 상품의 위험성을 고려하세요',
            '단기/장기 투자 전략을 구분하세요'
          ],
          solution: 'KODEX 인버스 또는 TIGER 인버스 ETF를 매수하여 지수 하락 시 수익 실현 가능. 단, 장기 보유 시 복리 효과로 손실 위험이 있으므로 단기 매매에 적합.'
        }
      },
      {
        title: '시장 상황 용어',
        duration: '2일',
        difficulty: 2,
        subtopics: [
          '강세장(Bull), 약세장(Bear), 횡보장',
          '리스크온, 리스크오프',
          '쇼트커버링, 숏스퀴즈',
          '패닉셀, 투항매도, 역발상투자',
          '로테이션, 스위칭, 리밸런싱',
          '어닝시즌, 블랙아웃, 윈도우드레싱'
        ],
        keyPoints: [
          '불마켓: 상승장 (황소처럼 뿔을 위로)',
          '베어마켓: 하락장 (곰이 아래로 할퀴듯)',
          '숏스퀴즈: 공매도 청산으로 급등',
          '패닉셀: 공포에 의한 투매',
          '로테이션: 업종/종목 간 자금 이동',
          '어닝시즌: 기업 실적 발표 집중 기간'
        ],
        quiz: {
          questions: [
            {
              id: 'dict-q3',
              question: '리스크오프 장세에서 선호되는 자산은?',
              options: [
                '성장주',
                '안전자산',
                '신흥국 주식',
                '원자재'
              ],
              correctAnswer: 1,
              explanation: '리스크오프는 위험 회피 심리가 강한 상황으로, 달러, 엔화, 금 등 안전자산이 선호됩니다.',
              difficulty: 'medium',
              category: 'market_condition'
            }
          ]
        }
      },
      {
        title: '글로벌 시장 용어',
        duration: '3일',
        difficulty: 3,
        subtopics: [
          'Fed, FOMC, 테이퍼링, QE/QT',
          '기준금리, 정책금리, 금리인상/인하',
          'CPI, PPI, PCE, 고용지표',
          '달러인덱스, VIX, 공포탐욕지수',
          'ADR, GDR, 듀얼리스팅',
          '핫머니, 캐리트레이드, 환헤지'
        ],
        keyPoints: [
          'FOMC: 미국 연방공개시장위원회',
          'QE: 양적완화 (돈 풀기)',
          'QT: 양적긴축 (돈 거둬들이기)',
          'VIX: 변동성 지수 (공포지수)',
          'ADR: 미국예탁증권',
          '캐리트레이드: 저금리 통화 차입 투자'
        ],
        exercises: [
          {
            id: 'dict-ex3',
            title: '글로벌 지표 모니터링',
            description: '주요 경제지표가 주식시장에 미치는 영향 분석',
            type: 'analysis',
            data: {
              indicators: ['CPI', 'FOMC 의사록', '실업률', 'GDP']
            }
          }
        ]
      },
      {
        title: '투자 전략 용어',
        duration: '3일',
        difficulty: 2,
        subtopics: [
          '가치투자, 성장투자, 모멘텀투자',
          '적립식, 거치식, 분할매수',
          '손절매, 익절매, 추격매수',
          '분산투자, 집중투자, 인덱스투자',
          '리스크 관리: VaR, 샤프지수',
          '알파, 베타, 트래킹에러'
        ],
        keyPoints: [
          '가치투자: 저평가 종목 장기 투자',
          '성장투자: 고성장 기업 투자',
          '적립식: 정기적 분할 매수',
          '손절매: 손실 제한 매도',
          '알파: 시장 대비 초과 수익',
          '베타: 시장 대비 변동성'
        ],
        practiceCase: {
          title: '나만의 투자 전략 수립',
          scenario: '월 200만원을 5년간 투자할 계획입니다.',
          task: '자신에게 맞는 투자 전략을 선택하고 포트폴리오를 구성하세요.',
          hints: [
            '투자 성향을 먼저 파악하세요',
            '분산투자 비중을 정하세요',
            '리밸런싱 주기를 설정하세요'
          ],
          solution: '적립식 투자로 시간 분산, 성장주 40% + 가치주 30% + 배당주 20% + 현금 10%로 자산 분산, 분기별 리밸런싱으로 리스크 관리'
        }
      },
      {
        title: '업종별 전문 용어',
        duration: '2일',
        difficulty: 3,
        subtopics: [
          'IT/반도체: 파운드리, 팹리스, D램, 낸드',
          '바이오: 임상, FDA, 기술이전, CMO',
          '2차전지: 양극재, 음극재, 전해질, 분리막',
          '엔터: IP, 플랫폼, 컨텐츠, 팬덤',
          '금융: BIS, NIM, 대손충당금',
          '건설: 수주잔고, 공정률, 분양률'
        ],
        keyPoints: [
          '임상 1/2/3상: 신약 개발 단계',
          'FDA 승인: 미국 의약품 허가',
          'BIS 비율: 은행 자기자본비율',
          'NIM: 순이자마진',
          '수주잔고: 미래 매출 예상치',
          'IP: 지적재산권 (캐릭터, 스토리 등)'
        ],
        quiz: {
          questions: [
            {
              id: 'dict-q4',
              question: '바이오 기업의 임상 3상 성공 시 주가는?',
              options: [
                '소폭 상승',
                '대폭 상승',
                '변동 없음',
                '하락'
              ],
              correctAnswer: 1,
              explanation: '임상 3상은 신약 승인 전 마지막 단계로, 성공 시 상업화 가능성이 높아져 주가가 대폭 상승하는 경향이 있습니다.',
              difficulty: 'hard',
              category: 'sector_specific'
            }
          ]
        }
      },
      {
        title: '법규 및 제도 용어',
        duration: '2일',
        difficulty: 2,
        subtopics: [
          '공시: 수시공시, 정기공시, 자율공시',
          '내부자거래, 단기매매차익, 5%룰',
          '적대적 M&A, 경영권 방어',
          '배당: 현금배당, 주식배당, 배당락',
          '스톡옵션, RSU, 우리사주',
          '증권거래세, 배당소득세, 양도소득세'
        ],
        keyPoints: [
          '5%룰: 5% 이상 지분 보유 시 공시',
          '단기매매차익: 6개월 내 매매 차익 반환',
          '배당락: 배당 기준일 다음날 주가 조정',
          '증권거래세: 매도 시 0.23%',
          '배당소득세: 15.4% (2천만원 초과 시 종합과세)',
          '대주주 양도세: 1년 미만 보유 시 과세'
        ],
        exercises: [
          {
            id: 'dict-ex4',
            title: '세금 계산 시뮬레이터',
            description: '주식 거래 시 발생하는 세금 계산 연습',
            type: 'calculation',
            data: {
              scenarios: ['일반 매도', '배당 수령', '대주주 양도']
            }
          }
        ]
      },
      {
        title: '최신 트렌드 용어',
        duration: '2일',
        difficulty: 3,
        subtopics: [
          'ESG: 환경, 사회, 지배구조',
          '메타버스, NFT, 블록체인',
          '탄소중립, RE100, 그린뉴딜',
          'DeFi, 스테이킹, 크립토',
          'SPAC, 유니콘, 데카콘',
          '디지털 전환, AI, 빅데이터'
        ],
        keyPoints: [
          'ESG: 지속가능경영 평가 기준',
          'RE100: 재생에너지 100% 사용',
          'SPAC: 기업인수목적회사',
          '유니콘: 기업가치 1조원 이상 스타트업',
          '메타버스: 가상현실 기반 플랫폼',
          'NFT: 대체불가토큰'
        ],
        practiceCase: {
          title: 'ESG 투자 포트폴리오',
          scenario: 'ESG 우수 기업에 투자하는 펀드를 구성하려 합니다.',
          task: 'ESG 평가 기준과 투자 전략을 수립하세요.',
          hints: [
            '각 ESG 요소별 가중치를 정하세요',
            '업종별 ESG 특성을 고려하세요',
            '그린워싱 리스크를 점검하세요'
          ],
          solution: 'MSCI ESG 등급 A 이상 기업 선별, E(40%):S(30%):G(30%) 가중치, 분기별 ESG 보고서 모니터링, 부정적 스크리닝으로 논란 기업 제외'
        }
      }
    ],
    learningOutcomes: [
      '500개 이상의 주식 투자 용어를 완벽하게 이해할 수 있다',
      '재무제표와 투자지표를 읽고 해석할 수 있다',
      '기술적 분석 용어를 활용하여 차트를 분석할 수 있다',
      '글로벌 시장 동향을 이해하고 투자에 활용할 수 있다',
      '최신 투자 트렌드와 관련 용어를 파악할 수 있다'
    ],
    prerequisites: ['금융시장의 이해'],
    tools: ['용어 사전 앱', '플래시카드', '용어 검색 도구'],
    industryConnections: ['증권사 리서치', '투자 컨설팅', '금융 미디어'],
    certificationPath: ['투자자산운용사', '증권투자권유대행인'],
    projectIdeas: [
      '나만의 투자 용어집 만들기',
      '용어 기반 투자 체크리스트 작성',
      '초보자를 위한 용어 설명 영상 제작'
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
          '주석 사항 해석하기',
          '분식회계 적발 방법',
          'DART 공시 200% 활용법'
        ],
        keyPoints: [
          '손익계산서: 매출 - 비용 = 순이익',
          '재무상태표: 자산 = 부채 + 자본',
          '현금흐름표: 영업/투자/재무 활동',
          'DART에서 공시 자료 확인 필수',
          '분식회계 신호: 매출채권 급증, 재고자산 증가',
          '주요 공시: 잠정실적, 영업정지, 유상증자'
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
        ],
        chartExamples: [
          {
            title: '재무제표 추이 분석',
            description: '매출액과 순이익의 연도별 추이를 한눈에 파악',
            imageUrl: '/charts/financial-statement.png',
            notes: [
              '매출액의 꾸준한 성장 추세 확인',
              '순이익률(순이익/매출액) 개선 여부 체크',
              '매출과 이익의 괴리 발생시 원인 분석',
              '동종업계 대비 성장률 비교 필요'
            ]
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
        },
        chartExamples: [
          {
            title: '동종업계 PER 비교',
            description: '업계 평균 대비 개별 종목의 밸류에이션 수준 파악',
            imageUrl: '/charts/valuation.png',
            notes: [
              '업계 평균 PER 대비 저평가/고평가 판단',
              '저PER 종목이 항상 좋은 것은 아님',
              '성장성과 함께 고려해야 함',
              'PEG 비율로 성장 대비 가치 평가'
            ]
          }
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
      },
      {
        title: '기업 분석 심화',
        duration: '4일',
        difficulty: 3,
        subtopics: [
          '사업보고서 완독법',
          'CEO와 지배구조 분석',
          '배당정책과 주주환원',
          'M&A와 기업가치 변화',
          'ESG 투자와 지속가능성'
        ],
        keyPoints: [
          '사업보고서: 사업개요, 위험요소, MD&A 중점 분석',
          '대주주 지분율과 경영권 안정성',
          '배당성향과 자사주 매입 정책',
          'M&A 시너지 효과와 PMI',
          'ESG 등급과 장기 투자가치'
        ],
        quiz: {
          questions: [
            {
              id: 'q10',
              question: '배당성향이 80%인 기업의 특징은?',
              options: [
                '성장 투자가 활발함',
                '주주 환원에 적극적',
                '재무구조가 불안정',
                '신생 기업일 가능성 높음'
              ],
              correctAnswer: 1,
              explanation: '배당성향이 높다는 것은 순이익의 대부분을 주주에게 환원한다는 의미로, 성숙기 기업이나 현금창출능력이 우수한 기업의 특징입니다.',
              difficulty: 'medium',
              category: 'corporate_analysis'
            }
          ]
        }
      },
      {
        title: '실적 분석과 전망',
        duration: '3일',
        difficulty: 3,
        subtopics: [
          '분기/연간 실적 발표 읽기',
          '컨센서스와 서프라이즈',
          '가이던스와 실적 전망',
          '계절성과 산업 사이클'
        ],
        keyPoints: [
          '실적발표: 매출, 영업이익, 순이익 YoY/QoQ 비교',
          '어닝 서프라이즈와 주가 반응',
          '경영진 가이던스의 신뢰성 평가',
          '계절적 요인과 기저효과 고려'
        ],
        practiceCase: {
          title: '실적 발표 분석',
          scenario: 'B기업이 분기 실적을 발표했습니다. 매출은 전년 대비 15% 증가했지만 영업이익은 5% 감소했습니다.',
          task: '이 실적을 어떻게 해석하고 투자 판단을 내릴지 분석해보세요.',
          hints: [
            '매출 증가에도 이익 감소 원인 파악',
            '원가율 상승이나 판관비 증가 확인',
            '일회성 요인인지 구조적 문제인지 구분',
            '경쟁사 대비 실적 비교'
          ],
          solution: '매출 증가에도 영업이익이 감소한 것은 1) 원가율 상승, 2) 마케팅비 증가, 3) 신사업 투자 등이 원인일 수 있습니다. 일회성 요인이라면 단기 조정 후 회복 가능하지만, 구조적 문제라면 장기적 수익성 악화를 의미할 수 있습니다.'
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
        },
        chartExamples: [
          {
            title: '주요 캔들스틱 패턴',
            description: '도지, 해머, 슈팅스타, 엔굴핑 등 주요 캔들스틱 패턴의 모양과 의미',
            imageUrl: '/charts/candlestick-patterns.png',
            notes: [
              '해머: 하락 추세 후 나타나면 반등 신호',
              '슈팅스타: 상승 추세 후 나타나면 하락 전환 신호',
              '도지: 매수세와 매도세가 균형을 이루는 상태',
              '엔굴핑: 이전 캔들을 완전히 감싸는 강한 전환 신호'
            ]
          },
          {
            title: '지지선과 저항선',
            description: '주가의 하락을 막는 지지선과 상승을 막는 저항선의 실제 차트 예시',
            imageUrl: '/charts/support-resistance.png',
            notes: [
              '지지선: 과거 저점들을 연결한 선',
              '저항선: 과거 고점들을 연결한 선',
              '돌파시 추세 전환 가능성',
              '여러 번 테스트할수록 강력한 지지/저항'
            ]
          }
        ]
      },
      {
        title: '기술적 지표 마스터',
        duration: '4일',
        difficulty: 2,
        subtopics: [
          '이동평균선 (MA, EMA)',
          'MACD와 신호선 해석',
          'RSI와 과매수/과매도',
          '볼린저밴드와 변동성',
          '스토캐스틱과 모멘텀'
        ],
        keyPoints: [
          '이동평균선: 5일, 20일, 60일, 120일선',
          'MACD: 단기-장기 이평선의 차이',
          'RSI 70 이상: 과매수, 30 이하: 과매도',
          '볼린저밴드: 주가 변동성의 범위 표시',
          '다중 지표 조합으로 신뢰도 향상'
        ],
        quiz: {
          questions: [
            {
              id: 'q9',
              question: 'RSI가 75를 나타낼 때 일반적인 해석은?',
              options: [
                '매수 신호',
                '과매수 구간',
                '과매도 구간',
                '중립 구간'
              ],
              correctAnswer: 1,
              explanation: 'RSI 70 이상은 과매수 구간으로, 단기적인 조정 가능성이 있습니다.',
              difficulty: 'easy',
              category: 'indicator'
            }
          ]
        },
        practiceCase: {
          title: '복합 지표 활용',
          scenario: 'A 종목의 RSI는 30, MACD는 골든크로스, 주가는 볼린저밴드 하단에 있습니다.',
          task: '이 상황을 종합적으로 분석하고 매매 전략을 세워보세요.',
          hints: [
            'RSI 30은 과매도 신호',
            'MACD 골든크로스는 상승 전환 신호',
            '볼린저밴드 하단은 반등 가능성'
          ],
          solution: '세 지표 모두 매수 신호를 나타내므로 단기 반등을 노린 매수 전략이 유효합니다. 다만 손절선을 설정하고 분할 매수를 고려하세요.'
        },
        chartExamples: [
          {
            title: '이동평균선 활용',
            description: '5일, 20일, 60일 이동평균선의 배열과 골든크로스/데드크로스',
            imageUrl: '/charts/moving-averages.png',
            notes: [
              '정배열: 단기 > 중기 > 장기 이평선 (상승 추세)',
              '역배열: 장기 > 중기 > 단기 이평선 (하락 추세)',
              '골든크로스: 단기선이 장기선을 상향 돌파',
              '데드크로스: 단기선이 장기선을 하향 돌파'
            ]
          },
          {
            title: 'MACD 지표',
            description: 'MACD선과 신호선의 교차를 통한 매매 타이밍 포착',
            imageUrl: '/charts/macd-indicator.png',
            notes: [
              'MACD = 12일 EMA - 26일 EMA',
              '신호선 = MACD의 9일 EMA',
              'MACD > 신호선: 매수 신호',
              '다이버전스 발생시 추세 전환 가능성'
            ]
          },
          {
            title: 'RSI와 볼린저밴드',
            description: 'RSI의 과매수/과매도 구간과 볼린저밴드의 활용',
            imageUrl: '/charts/rsi-bollinger.png',
            notes: [
              'RSI 70 이상: 과매수 (조정 가능성)',
              'RSI 30 이하: 과매도 (반등 가능성)',
              '볼린저밴드 상단 터치: 과열 신호',
              '볼린저밴드 하단 터치: 과도한 하락'
            ]
          }
        ]
      },
      {
        title: '차트 패턴과 매매 타이밍',
        duration: '3일',
        difficulty: 3,
        subtopics: [
          '헤드앤숄더와 역헤드앤숄더',
          '삼각수렴과 깃발형',
          '이중천정과 이중바닥',
          '엘리엇 파동 이론',
          '피보나치 되돌림'
        ],
        keyPoints: [
          '패턴 완성 후 돌파시 매매',
          '거래량 증가로 패턴 확인',
          '목표가 = 패턴 높이만큼 연장',
          '엘리엇 5파동 상승, 3파동 조정',
          '피보나치: 38.2%, 50%, 61.8% 되돌림'
        ],
        exercises: [
          {
            id: 'ex2',
            title: '실제 차트에서 패턴 찾기',
            description: '최근 6개월 차트에서 주요 패턴을 찾아보세요',
            type: 'analysis',
            data: {
              charts: ['삼성전자', 'SK하이닉스', 'NAVER']
            }
          }
        ],
        chartExamples: [
          {
            title: '헤드앤숄더 패턴',
            description: '대표적인 하락 전환 패턴인 헤드앤숄더의 형태와 매매 포인트',
            imageUrl: '/charts/head-shoulders.png',
            notes: [
              '왼쪽 어깨 - 머리 - 오른쪽 어깨 형성',
              '넥라인 하향 돌파시 매도',
              '목표가 = 머리에서 넥라인까지 거리',
              '역헤드앤숄더는 상승 전환 신호'
            ]
          },
          {
            title: '삼각수렴 패턴',
            description: '상승/하락 삼각형과 대칭 삼각형 패턴',
            imageUrl: '/charts/triangle-patterns.png',
            notes: [
              '상승 삼각형: 저점은 높아지고 고점은 수평',
              '하락 삼각형: 고점은 낮아지고 저점은 수평',
              '대칭 삼각형: 고점과 저점 모두 수렴',
              '돌파 방향으로 추세 지속'
            ]
          },
          {
            title: '피보나치 되돌림',
            description: '피보나치 수열을 활용한 지지/저항 레벨 찾기',
            imageUrl: '/charts/fibonacci.png',
            notes: [
              '주요 되돌림 비율: 23.6%, 38.2%, 50%, 61.8%',
              '강한 추세일수록 얕은 되돌림',
              '61.8% 이상 되돌림시 추세 전환 가능성',
              '확장 레벨로 목표가 설정'
            ]
          }
        ]
      }
    ],
    learningOutcomes: [
      '다양한 차트 패턴을 인식하고 해석할 수 있다',
      '기술적 지표를 조합하여 매매 신호를 포착할 수 있다',
      '차트 분석을 통해 진입/청산 시점을 결정할 수 있다',
      '복합 지표를 활용한 정확도 높은 분석이 가능하다',
      '시장 심리를 차트로 읽고 대응할 수 있다'
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
        ],
        quiz: {
          questions: [
            {
              id: 'q7',
              question: '포트폴리오의 베타가 1.5라면 시장이 10% 상승할 때 포트폴리오의 기대 수익률은?',
              options: [
                '10%',
                '15%',
                '5%',
                '20%'
              ],
              correctAnswer: 1,
              explanation: '베타가 1.5라는 것은 시장 대비 1.5배의 변동성을 가진다는 의미입니다. 따라서 시장이 10% 상승하면 포트폴리오는 15%(10% × 1.5) 상승할 것으로 기대됩니다.',
              difficulty: 'medium',
              category: 'portfolio'
            }
          ]
        },
        practiceCase: {
          title: '포트폴리오 구성하기',
          scenario: '1억원의 투자금으로 주식 포트폴리오를 구성하려고 합니다. 성장주, 가치주, 배당주를 적절히 배분하려고 합니다.',
          task: '리스크 대비 수익을 최적화하는 포트폴리오를 구성해보세요.',
          hints: [
            '각 자산군의 상관계수를 고려하세요',
            '개인의 위험 선호도를 반영하세요',
            '리밸런싱 전략을 수립하세요'
          ],
          solution: '효율적인 포트폴리오 구성을 위해 1) 성장주 40% (높은 수익 기대), 2) 가치주 30% (안정성), 3) 배당주 30% (현금흐름) 배분을 고려할 수 있습니다. 정기적인 리밸런싱으로 목표 비중을 유지하세요.'
        },
        chartExamples: [
          {
            title: '포트폴리오 구성 비중',
            description: '성장주, 가치주, 배당주의 최적 배분 시각화',
            imageUrl: '/charts/portfolio.png',
            notes: [
              '투자 목적에 따른 비중 조절',
              '나이가 많을수록 안정적 자산 비중 증가',
              '시장 상황에 따른 전술적 조정',
              '핵심-위성 전략으로 리스크 관리'
            ]
          }
        ]
      },
      {
        title: '리스크 관리 전략',
        duration: '3일',
        difficulty: 3,
        subtopics: [
          'VaR(Value at Risk) 이해',
          '헤지 전략과 파생상품 활용',
          '시스템 리스크와 개별 리스크',
          '포지션 사이징과 켈리 공식',
          '손절매와 수익 실현 전략'
        ],
        keyPoints: [
          'VaR: 특정 신뢰수준에서 최대 손실 추정',
          '헤지: 선물, 옵션을 활용한 위험 관리',
          '베타 헤지로 시장 리스크 제거',
          '켈리 공식: 최적 베팅 사이즈 계산',
          '2% 룰: 한 종목 최대 손실 2% 제한'
        ],
        quiz: {
          questions: [
            {
              id: 'q11',
              question: '포트폴리오의 95% VaR이 -5%라면?',
              options: [
                '95% 확률로 5% 이상 수익',
                '95% 확률로 손실이 5% 이내',
                '5% 확률로 95% 손실',
                '평균 수익률이 -5%'
              ],
              correctAnswer: 1,
              explanation: '95% VaR이 -5%는 95% 신뢰수준에서 최대 손실이 5%를 넘지 않는다는 의미입니다.',
              difficulty: 'hard',
              category: 'risk_management'
            }
          ]
        }
      },
      {
        title: '자산 배분과 리밸런싱',
        duration: '2일',
        difficulty: 2,
        subtopics: [
          '전략적 자산배분 vs 전술적 자산배분',
          '코어-위성 전략',
          '리밸런싱 주기와 방법',
          '세금을 고려한 포트폴리오 관리'
        ],
        keyPoints: [
          '전략적 배분: 장기 목표 비중 설정',
          '전술적 배분: 시장 상황에 따른 조정',
          '코어: 안정적 자산, 위성: 알파 추구',
          '리밸런싱: 목표 비중 ±5% 이탈시 조정',
          '세금 효율적인 손실 실현 전략'
        ],
        practiceCase: {
          title: '리밸런싱 실습',
          scenario: '초기 배분 주식 60%, 채권 40%였으나 주식 상승으로 현재 70%, 30%가 되었습니다.',
          task: '리밸런싱 전략을 수립하고 실행 방안을 제시하세요.',
          hints: [
            '목표 비중과 현재 비중의 차이 계산',
            '거래 비용과 세금 고려',
            '시장 상황에 따른 점진적 조정',
            '신규 자금 유입시 활용 방안'
          ],
          solution: '주식 10%를 매도하여 채권에 재배분해야 합니다. 단, 1) 세금 최소화를 위해 손실 종목부터 매도, 2) 거래비용 고려하여 2-3회 분할 실행, 3) 신규 자금은 채권에 우선 배분하여 자연스러운 리밸런싱을 유도합니다.'
        }
      }
    ],
    learningOutcomes: [
      '효율적인 포트폴리오를 구성할 수 있다',
      '리스크를 정량화하고 관리할 수 있다',
      '시장 상황에 맞는 자산 배분 전략을 수립할 수 있다',
      '체계적인 리스크 관리로 안정적인 수익을 추구할 수 있다',
      '세금과 비용을 고려한 효율적인 포트폴리오 운용이 가능하다'
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
        ],
        quiz: {
          questions: [
            {
              id: 'q12',
              question: '백테스팅에서 과적합(Overfitting)을 방지하는 방법은?',
              options: [
                '더 많은 변수 추가',
                'Out-of-sample 테스트',
                '더 짧은 기간 테스트',
                '더 복잡한 모델 사용'
              ],
              correctAnswer: 1,
              explanation: 'Out-of-sample 테스트는 훈련에 사용하지 않은 데이터로 검증하여 과적합을 방지하는 핵심 방법입니다.',
              difficulty: 'hard',
              category: 'quant'
            }
          ]
        },
        practiceCase: {
          title: '간단한 팩터 전략 구현',
          scenario: 'PBR이 낮고 ROE가 높은 종목에 투자하는 전략을 구현하려 합니다.',
          task: '이 전략의 백테스팅 프로세스를 설계해보세요.',
          hints: [
            '유니버스 정의 (KOSPI200 등)',
            '팩터 스코어 계산 방법',
            '리밸런싱 주기 설정',
            '거래비용과 슬리피지 고려'
          ],
          solution: '1) KOSPI200 종목 대상, 2) PBR 하위 30% & ROE 상위 30% 교집합 선택, 3) 월별 리밸런싱, 4) 거래비용 0.3% 가정, 5) 3년 이상 백테스팅으로 연평균 수익률과 샤프비율 계산'
        },
        chartExamples: [
          {
            title: '백테스팅 수익률 곡선',
            description: '전략 수익률과 시장 수익률의 누적 성과 비교',
            imageUrl: '/charts/backtest.png',
            notes: [
              '전략이 시장을 아웃퍼폼하는지 확인',
              'MDD(최대낙폭)와 변동성 체크',
              '샤프비율로 위험조정 수익률 평가',
              '과적합 방지를 위한 아웃샘플 테스트'
            ]
          }
        ]
      },
      {
        title: 'AI/ML 투자 모델',
        duration: '1주',
        difficulty: 3,
        subtopics: [
          '머신러닝 기초와 금융 적용',
          '시계열 예측 모델',
          '자연어 처리와 뉴스 분석',
          '딥러닝을 활용한 패턴 인식'
        ],
        keyPoints: [
          '지도학습: 분류(상승/하락), 회귀(가격예측)',
          'LSTM, GRU로 시계열 예측',
          'NLP로 뉴스 감성 분석',
          'CNN으로 차트 패턴 인식'
        ],
        exercises: [
          {
            id: 'ex3',
            title: 'Python으로 주가 예측 모델 만들기',
            description: 'scikit-learn을 활용한 간단한 예측 모델 구현',
            type: 'simulation',
            data: {
              libraries: ['pandas', 'numpy', 'scikit-learn', 'matplotlib']
            }
          }
        ]
      },
      {
        title: '시스템 트레이딩 구축',
        duration: '1주',
        difficulty: 3,
        subtopics: [
          '트레이딩 시스템 아키텍처',
          '실시간 데이터 처리',
          '주문 관리 시스템(OMS)',
          '리스크 관리 자동화'
        ],
        keyPoints: [
          '이벤트 기반 시스템 설계',
          'WebSocket으로 실시간 데이터',
          '주문 라우팅과 체결 관리',
          '실시간 포지션 모니터링'
        ],
        practiceCase: {
          title: '자동 매매 시스템 설계',
          scenario: '이동평균 크로스 전략을 자동으로 실행하는 시스템을 만들려 합니다.',
          task: '시스템 구성 요소와 처리 흐름을 설계해보세요.',
          hints: [
            '데이터 수집 모듈',
            '신호 생성 엔진',
            '주문 실행 모듈',
            '모니터링 대시보드'
          ],
          solution: '1) 실시간 가격 수집 → 2) 이동평균 계산 → 3) 크로스 신호 감지 → 4) 포지션 확인 → 5) 주문 생성/전송 → 6) 체결 확인 → 7) 로그 기록 및 모니터링'
        }
      },
      {
        title: '퀀트 전략 고도화',
        duration: '1주',
        difficulty: 3,
        subtopics: [
          '멀티팩터 모델 구축',
          '페어 트레이딩과 차익거래',
          '옵션 전략과 변동성 거래',
          '포트폴리오 최적화 알고리즘'
        ],
        keyPoints: [
          '팩터 결합과 가중치 최적화',
          '공적분 검정과 스프레드 거래',
          '변동성 스마일과 그릭스',
          '평균-분산 최적화, 블랙-리터만 모델'
        ],
        quiz: {
          questions: [
            {
              id: 'q13',
              question: '페어 트레이딩에서 가장 중요한 통계적 검정은?',
              options: [
                't-검정',
                '공적분 검정',
                '카이제곱 검정',
                'F-검정'
              ],
              correctAnswer: 1,
              explanation: '공적분 검정은 두 종목 간 장기적 균형관계를 확인하여 페어 트레이딩의 기초가 됩니다.',
              difficulty: 'hard',
              category: 'advanced_quant'
            }
          ]
        }
      }
    ],
    learningOutcomes: [
      '퀀트 전략을 설계하고 백테스팅할 수 있다',
      'AI를 활용한 투자 모델을 구축할 수 있다',
      '자동화된 투자 시스템을 운영할 수 있다'
    ],
    prerequisites: ['포트폴리오 관리'],
    tools: ['Python', 'Jupyter Notebook', 'QuantLib', 'TensorFlow', 'PyTorch']
  },

  {
    id: 'practical-strategy',
    title: '실전 투자 전략',
    subtitle: '돈 버는 투자의 핵심 전략',
    icon: 'TrendingUp',
    color: 'from-yellow-500 to-orange-600',
    duration: '4주',
    topics: [
      {
        title: '시장 사이클과 섹터 로테이션',
        duration: '5일',
        difficulty: 3,
        subtopics: [
          '경기 사이클의 4단계와 투자 전략',
          '금리 인상/인하기 수혜 섹터',
          '인플레이션 시대의 투자 전략',
          '달러 강세/약세와 투자 포지션',
          '원자재 슈퍼사이클 활용법'
        ],
        keyPoints: [
          '회복기: 금융, 부동산 / 호황기: 기술, 소비재',
          '후퇴기: 필수소비재, 헬스케어 / 침체기: 유틸리티, 채권',
          '금리인상기: 은행주 / 금리인하기: 성장주, 부동산',
          '인플레이션: 원자재, 에너지, 실물자산',
          '섹터 ETF를 활용한 효율적 로테이션'
        ],
        practiceCase: {
          title: '2024년 시장 전망과 포지셔닝',
          scenario: '미국 금리 인하 전환, 중국 경기 부양책, 국내 총선 등 주요 이벤트가 예정되어 있습니다.',
          task: '현재 경기 사이클 위치를 판단하고 향후 6개월 투자 전략을 수립하세요.',
          hints: [
            '미국 금리 정점 통과 여부 확인',
            '중국 부동산 시장 회복 신호 체크',
            '국내 정치 리스크와 정책 수혜주',
            '글로벌 공급망 재편 수혜 섹터'
          ],
          solution: '금리 정점 통과시 성장주 비중 확대, 중국 회복시 소재/산업재 편입, 정책 테마주는 단기 매매로 접근, 공급망 재편 수혜주(배터리, 반도체)는 장기 보유'
        },
        chartExamples: [
          {
            title: '경기 사이클별 섹터 성과',
            description: '각 경기 국면별 섹터 수익률 히트맵',
            imageUrl: '/charts/sector-rotation.png',
            notes: [
              '경기 국면별 아웃퍼폼 섹터 확인',
              '섹터 간 상관관계 파악',
              '선행/후행 섹터 구분',
              'ETF로 섹터 베팅 실행'
            ]
          }
        ]
      },
      {
        title: '종목 발굴과 스크리닝',
        duration: '1주',
        difficulty: 2,
        subtopics: [
          '재무 스크리닝 조건 설정',
          '모멘텀 스크리닝 기법',
          '저평가 가치주 발굴법',
          '성장주 필터링 조건',
          '턴어라운드 종목 찾기',
          '테마주 선별 기준'
        ],
        keyPoints: [
          'ROE > 15%, 부채비율 < 100%, 영업이익률 개선',
          '52주 신고가 근접, 거래량 급증, 상대강도 상위',
          'PBR < 1, PER < 10, 배당수익률 > 3%',
          '매출성장률 > 20%, 영업이익 증가율 > 매출증가율',
          '적자 → 흑자 전환, 매출 턴어라운드, 신사업 진출',
          '정책 수혜, 신기술, 글로벌 트렌드 연관성'
        ],
        exercises: [
          {
            id: 'screening-practice',
            title: '종목 스크리닝 실습',
            description: '조건을 설정하여 투자 후보 종목을 발굴해보세요',
            type: 'simulation',
            data: {
              conditions: ['ROE', 'PER', '매출성장률', '거래량']
            }
          }
        ],
        quiz: {
          questions: [
            {
              id: 'q14',
              question: '턴어라운드 종목의 대표적인 신호는?',
              options: [
                '매출 감소 지속',
                '영업이익 적자 전환',
                '분기 흑자 전환',
                'CEO 교체'
              ],
              correctAnswer: 2,
              explanation: '적자에서 흑자로 전환하는 시점이 주가 상승의 중요한 변곡점이 됩니다.',
              difficulty: 'medium',
              category: 'stock_picking'
            }
          ]
        }
      },
      {
        title: '매매 타이밍과 포지션 관리',
        duration: '1주',
        difficulty: 3,
        subtopics: [
          '분할 매수/매도 전략',
          '물타기 vs 불타기 판단',
          '손절매 원칙과 기준',
          '이익 실현 타이밍',
          '포지션 사이징 공식',
          '리스크/리워드 비율 설정'
        ],
        keyPoints: [
          '3분할 매수: 1차 40%, 2차 30%, 3차 30%',
          '물타기: 펀더멘털 불변시만, 최대 1회',
          '손절매: -7~10% 또는 매수 근거 소멸시',
          '이익실현: 목표가 도달 또는 +20% 분할 매도',
          '켈리 공식: f = (p×b - q)/b (최적 베팅 비율)',
          '리스크/리워드 최소 1:2 이상'
        ],
        practiceCase: {
          title: '포지션 관리 시뮬레이션',
          scenario: '1억원으로 5개 종목에 투자하려 합니다. 각 종목의 확신도와 리스크가 다릅니다.',
          task: '켈리 공식을 활용하여 각 종목별 투자 비중을 결정하세요.',
          hints: [
            '확신도 높은 종목에 더 많은 비중',
            '상관관계 낮은 종목으로 분산',
            '한 종목 최대 30% 제한',
            '현금 비중 10~20% 유지'
          ],
          solution: '고확신 2종목 각 25%, 중확신 2종목 각 15%, 저확신 1종목 10%, 현금 20%. 손실 시 추가 매수 여력 확보'
        }
      },
      {
        title: '실전 케이스 스터디',
        duration: '1주',
        difficulty: 3,
        subtopics: [
          '2020년 코로나 폭락장 대응',
          '2021년 성장주 버블과 붕괴',
          '2022년 금리 인상기 전략',
          '테슬라, 엔비디아 성공 사례',
          '한국 배터리 3사 투자 분석',
          '실패 사례와 교훈'
        ],
        keyPoints: [
          '폭락장: 우량주 분할 매수, 레버리지 ETF 활용',
          '버블: 차익 실현, 가치주 전환, 현금 비중 확대',
          '금리 인상: 성장주 축소, 금융주/달러 확대',
          '메가 트렌드 올인의 위험성과 수익성',
          '산업 분석의 중요성과 timing의 어려움',
          '손절매 미루기, FOMO, 과도한 레버리지의 위험'
        ],
        chartExamples: [
          {
            title: '주요 투자 실패/성공 패턴',
            description: '역사적 사례를 통한 투자 교훈',
            imageUrl: '/charts/case-studies.png',
            notes: [
              'FOMO로 고점 매수의 위험',
              '공포에 저점 매도의 실수',
              '장기 보유의 힘',
              '적절한 리밸런싱의 중요성'
            ]
          }
        ]
      }
    ],
    learningOutcomes: [
      '시장 사이클을 읽고 섹터 로테이션을 실행할 수 있다',
      '체계적인 종목 발굴 프로세스를 구축할 수 있다',
      '리스크 관리와 포지션 사이징을 전문가 수준으로 할 수 있다',
      '과거 사례를 통해 실수를 피하고 기회를 포착할 수 있다'
    ],
    prerequisites: ['기본적 분석', '기술적 분석', '포트폴리오 관리'],
    tools: ['네이버 증권', 'Investing.com', 'TradingView', 'DART'],
    certificationPath: ['투자자산운용사', 'CFA Level 1'],
    projectIdeas: [
      '나만의 투자 일지 작성',
      '모의 포트폴리오 6개월 운용',
      '투자 스터디 그룹 운영'
    ]
  },

  {
    id: 'psychology-risk',
    title: '투자 심리와 행동재무학',
    subtitle: '시장을 이기는 마인드셋',
    icon: 'Brain',
    color: 'from-purple-500 to-indigo-600',
    duration: '2주',
    topics: [
      {
        title: '투자자의 심리적 함정',
        duration: '3일',
        difficulty: 2,
        subtopics: [
          '확증 편향과 선택적 정보 해석',
          '손실 회피와 처분 효과',
          '과신과 통제 착각',
          '군중 심리와 버블',
          '앵커링과 프레이밍 효과',
          '후회 회피와 현상 유지 편향'
        ],
        keyPoints: [
          '확증 편향: 자신의 믿음을 지지하는 정보만 수용',
          '처분 효과: 이익은 빨리, 손실은 늦게 실현',
          '과신: 자신의 능력을 과대평가하는 경향',
          '군중 심리: 다수를 따라가는 행동',
          '앵커링: 초기 정보에 과도하게 의존',
          '매몰 비용의 오류: 이미 투입한 비용에 집착'
        ],
        quiz: {
          questions: [
            {
              id: 'q15',
              question: '손실 회피 성향이 강한 투자자의 전형적인 행동은?',
              options: [
                '손절매를 빠르게 실행',
                '수익 종목을 장기 보유',
                '손실 종목을 계속 보유',
                '분산 투자를 선호'
              ],
              correctAnswer: 2,
              explanation: '손실 회피 성향이 강하면 손실을 확정짓는 것을 꺼려 손실 종목을 계속 보유하게 됩니다.',
              difficulty: 'medium',
              category: 'psychology'
            }
          ]
        },
        practiceCase: {
          title: '나의 투자 성향 진단',
          scenario: '최근 1년간 당신의 투자 기록을 분석해보세요.',
          task: '자신의 투자 패턴에서 나타나는 심리적 편향을 찾아보세요.',
          hints: [
            '수익/손실 종목의 보유 기간 비교',
            '매수/매도 결정의 근거 분석',
            '시장 급변동시 행동 패턴',
            '정보 수집 채널의 편향성'
          ],
          solution: '투자 일지를 작성하여 매매 시점의 감정과 근거를 기록하고, 주기적으로 리뷰하여 반복되는 실수 패턴을 발견하고 개선'
        }
      },
      {
        title: '성공하는 투자자의 습관',
        duration: '3일',
        difficulty: 2,
        subtopics: [
          '투자 일지 작성법',
          '감정 통제와 명상',
          '지속적인 학습 시스템',
          '멘토와 투자 커뮤니티',
          '건강한 투자 루틴',
          '워라밸과 투자의 균형'
        ],
        keyPoints: [
          '매매 일지: 진입/청산 이유, 감정 상태 기록',
          '감정 통제: 공포/탐욕 지수 체크, 호흡법',
          '학습: 주 1권 독서, 분기별 세미나 참석',
          '네트워킹: 투자 스터디, 멘토링 참여',
          '루틴: 아침 시황 체크, 주말 포트폴리오 리뷰',
          '휴식: 분기별 투자 안식월 운영'
        ],
        exercises: [
          {
            id: 'habit-tracker',
            title: '21일 투자 습관 만들기',
            description: '성공적인 투자 습관을 21일간 실천해보세요',
            type: 'simulation',
            data: {
              habits: ['일지 작성', '뉴스 읽기', '차트 분석', '명상']
            }
          }
        ]
      }
    ],
    learningOutcomes: [
      '자신의 투자 심리와 편향을 인식하고 통제할 수 있다',
      '체계적인 투자 프로세스로 감정적 매매를 방지할 수 있다',
      '장기적으로 성공하는 투자 습관을 형성할 수 있다'
    ],
    prerequisites: ['금융시장의 이해'],
    tools: ['투자 일지 앱', '마인드맵 도구', '명상 앱'],
    projectIdeas: [
      '나만의 투자 철학 정립하기',
      '투자 심리 체크리스트 만들기',
      '실수 사례집 작성하기'
    ]
  }
];

export const difficultyLabels = ['초급', '중급', '고급'];
export const difficultyColors = ['text-green-600', 'text-yellow-600', 'text-red-600'];