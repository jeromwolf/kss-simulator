'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, BookOpen, Star, Filter, ChevronRight, 
  TrendingUp, BarChart3, Calculator, Shield, 
  DollarSign, Lightbulb, Award, Volume2,
  PlayCircle, CheckCircle, Circle, Zap,
  Brain, Eye, Coins, PieChart, Target
} from 'lucide-react';

interface FinancialTerm {
  id: string;
  term: string;
  pronunciation?: string;
  category: string;
  definition: string;
  detailedExplanation: string;
  examples: Example[];
  relatedTerms: string[];
  difficulty: 'basic' | 'intermediate' | 'advanced';
  importance: number;
  visualAid?: string;
  formula?: string;
  tips?: string[];
  commonMistakes?: string[];
  realWorldCase?: string;
}

interface Example {
  situation: string;
  calculation?: string;
  interpretation: string;
}

interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  description: string;
  termCount: number;
}

const categories: Category[] = [
  {
    id: 'basic',
    name: '기초 개념',
    icon: BookOpen,
    color: 'from-blue-500 to-blue-600',
    description: '주식 투자의 첫걸음',
    termCount: 25
  },
  {
    id: 'trading',
    name: '거래/매매',
    icon: TrendingUp,
    color: 'from-green-500 to-green-600',
    description: '실전 거래 용어',
    termCount: 30
  },
  {
    id: 'valuation',
    name: '가치평가',
    icon: Calculator,
    color: 'from-purple-500 to-purple-600',
    description: '기업 가치 분석',
    termCount: 20
  },
  {
    id: 'financial',
    name: '재무/회계',
    icon: DollarSign,
    color: 'from-yellow-500 to-yellow-600',
    description: '재무제표 관련',
    termCount: 35
  },
  {
    id: 'technical',
    name: '기술적분석',
    icon: BarChart3,
    color: 'from-red-500 to-red-600',
    description: '차트와 지표',
    termCount: 40
  },
  {
    id: 'risk',
    name: '리스크관리',
    icon: Shield,
    color: 'from-gray-500 to-gray-600',
    description: '위험 관리 전략',
    termCount: 15
  }
];

// 확장된 금융 용어 데이터베이스
const financialTermsDB: FinancialTerm[] = [
  // 기초 개념
  {
    id: '1',
    term: '주식 (Stock/Equity)',
    pronunciation: '주식 [ju-sik]',
    category: 'basic',
    definition: '기업의 소유권을 나타내는 증권',
    detailedExplanation: '주식은 기업의 자본을 구성하는 단위로, 주식을 보유한 사람은 그 기업의 일부를 소유하게 됩니다. 주주는 기업의 이익 배분(배당)을 받을 권리와 주주총회에서 의결권을 행사할 권리를 갖습니다.',
    examples: [
      {
        situation: '삼성전자 주식 100주 보유',
        calculation: '주가 70,000원 × 100주 = 7,000,000원',
        interpretation: '당신은 삼성전자의 주주이며, 700만원어치의 지분을 보유하고 있습니다.'
      }
    ],
    relatedTerms: ['주주', '보통주', '우선주', '액면가'],
    difficulty: 'basic',
    importance: 5,
    tips: [
      '주식은 채권과 달리 만기가 없습니다',
      '주가는 시장의 수요와 공급에 따라 실시간으로 변동합니다',
      '주식 투자는 원금 손실 가능성이 있습니다'
    ],
    commonMistakes: [
      '주식을 사면 회사를 경영할 수 있다고 생각하는 것 (대주주가 아닌 이상 경영권은 없습니다)',
      '주가가 싸다고 무조건 좋은 투자라고 생각하는 것'
    ]
  },
  {
    id: '2',
    term: '시가총액 (Market Capitalization)',
    pronunciation: '시가총액 [si-ga-chong-aek]',
    category: 'basic',
    definition: '기업의 전체 주식 가치',
    detailedExplanation: '시가총액은 현재 주가에 발행된 총 주식수를 곱한 값으로, 시장이 평가하는 기업의 전체 가치를 나타냅니다. 기업의 규모를 비교하는 가장 일반적인 지표입니다.',
    formula: '시가총액 = 현재 주가 × 발행주식수',
    examples: [
      {
        situation: 'A기업: 주가 50,000원, 발행주식 1,000만주',
        calculation: '50,000원 × 10,000,000주 = 5,000억원',
        interpretation: 'A기업의 시가총액은 5,000억원으로, 중형주에 해당합니다.'
      }
    ],
    relatedTerms: ['대형주', '중형주', '소형주', '시가총액 순위'],
    difficulty: 'basic',
    importance: 5,
    visualAid: 'market-cap-comparison',
    tips: [
      '시가총액이 크다고 항상 좋은 투자는 아닙니다',
      'KOSPI 시가총액 상위 10개 기업이 전체의 약 50%를 차지합니다'
    ]
  },
  {
    id: '3',
    term: '배당 (Dividend)',
    pronunciation: '배당 [bae-dang]',
    category: 'basic',
    definition: '기업이 이익의 일부를 주주에게 분배하는 것',
    detailedExplanation: '배당은 기업이 영업활동으로 얻은 이익 중 일부를 주주들에게 현금이나 주식으로 나누어 주는 것입니다. 안정적인 배당은 기업의 수익성과 재무 건전성을 보여주는 지표가 됩니다.',
    examples: [
      {
        situation: '주당 배당금 1,000원, 100주 보유',
        calculation: '1,000원 × 100주 = 100,000원',
        interpretation: '연간 10만원의 배당금을 받게 됩니다. (세전 기준)'
      },
      {
        situation: '배당수익률 계산',
        calculation: '(연간 배당금 ÷ 주가) × 100 = 배당수익률(%)',
        interpretation: '주가 대비 배당금의 비율을 확인할 수 있습니다.'
      }
    ],
    relatedTerms: ['배당수익률', '배당성향', '배당락', '중간배당'],
    difficulty: 'basic',
    importance: 4,
    tips: [
      '한국은 주로 연 1회 배당, 일부 기업은 분기 배당 실시',
      '배당소득세 15.4%(지방세 포함)가 원천징수됩니다',
      '배당락일에는 배당금만큼 주가가 하락하는 경향이 있습니다'
    ],
    realWorldCase: '삼성전자는 2023년 주당 361원의 배당금을 지급했으며, 이는 약 2.5조원 규모입니다.'
  },

  // 거래/매매 관련
  {
    id: '4',
    term: '호가 (Order Book)',
    pronunciation: '호가 [ho-ga]',
    category: 'trading',
    definition: '매수/매도 주문이 대기하고 있는 가격대',
    detailedExplanation: '호가는 현재 시장에서 매수하려는 사람과 매도하려는 사람이 제시한 가격과 수량을 보여주는 창입니다. 매수호가와 매도호가의 차이를 스프레드라고 합니다.',
    examples: [
      {
        situation: '매도호가: 10,100원(500주), 매수호가: 10,000원(300주)',
        interpretation: '현재 10,100원에 팔려는 물량이 500주, 10,000원에 사려는 물량이 300주 있습니다.'
      }
    ],
    relatedTerms: ['매수벽', '매도벽', '호가창', '스프레드'],
    difficulty: 'intermediate',
    importance: 5,
    visualAid: 'order-book-visualization',
    tips: [
      '호가창의 잔량 변화를 보면 매수/매도 세력을 파악할 수 있습니다',
      '큰 호가 잔량은 지지선이나 저항선 역할을 할 수 있습니다'
    ]
  },
  {
    id: '5',
    term: '상한가/하한가',
    pronunciation: '상한가 [sang-han-ga] / 하한가 [ha-han-ga]',
    category: 'trading',
    definition: '하루 동안 상승/하락할 수 있는 최대 가격',
    detailedExplanation: '주식시장의 급격한 가격 변동을 방지하기 위해 전일 종가 대비 ±30%로 가격 변동폭을 제한합니다. 이를 가격제한폭이라고 합니다.',
    examples: [
      {
        situation: '전일 종가 10,000원인 주식',
        calculation: '상한가: 13,000원(+30%), 하한가: 7,000원(-30%)',
        interpretation: '이 주식은 당일 7,000원~13,000원 사이에서만 거래 가능합니다.'
      }
    ],
    relatedTerms: ['가격제한폭', '상한가 따라잡기', 'VI(변동성완화장치)'],
    difficulty: 'basic',
    importance: 4,
    tips: [
      '상한가에서는 매도 물량이 없어 매수가 어렵습니다',
      '연속 상한가는 강한 호재의 신호일 수 있습니다',
      '신규 상장 종목은 첫날 가격제한폭이 없습니다'
    ]
  },

  // 가치평가 지표
  {
    id: '6',
    term: 'PER (주가수익비율)',
    pronunciation: 'PER [피이알]',
    category: 'valuation',
    definition: '주가를 주당순이익으로 나눈 값',
    detailedExplanation: 'PER은 현재 주가가 1주당 순이익의 몇 배인지를 나타내는 지표입니다. 투자금 회수에 걸리는 기간으로 해석할 수 있으며, 기업의 성장성과 시장의 기대를 반영합니다.',
    formula: 'PER = 주가 ÷ EPS(주당순이익)',
    examples: [
      {
        situation: '주가 50,000원, EPS 5,000원',
        calculation: 'PER = 50,000 ÷ 5,000 = 10배',
        interpretation: '현재 주가는 연간 순이익의 10배 수준이며, 이론적으로 10년이면 투자금을 회수할 수 있습니다.'
      }
    ],
    relatedTerms: ['EPS', 'Forward PER', 'PEG', '업종 평균 PER'],
    difficulty: 'intermediate',
    importance: 5,
    tips: [
      '업종별로 적정 PER 수준이 다릅니다 (성장주 vs 가치주)',
      'PER이 낮다고 무조건 저평가는 아닙니다',
      '적자 기업은 PER을 계산할 수 없습니다'
    ],
    commonMistakes: [
      'PER만으로 투자 결정을 하는 것',
      '다른 업종 간 PER을 직접 비교하는 것'
    ]
  },
  {
    id: '7',
    term: 'ROE (자기자본이익률)',
    pronunciation: 'ROE [알오이]',
    category: 'valuation',
    definition: '자기자본 대비 순이익의 비율',
    detailedExplanation: 'ROE는 주주가 투자한 자본으로 얼마나 효율적으로 이익을 창출하는지를 보여주는 수익성 지표입니다. 워런 버핏이 중시하는 지표로도 유명합니다.',
    formula: 'ROE = (당기순이익 ÷ 자기자본) × 100',
    examples: [
      {
        situation: '당기순이익 100억원, 자기자본 500억원',
        calculation: 'ROE = (100 ÷ 500) × 100 = 20%',
        interpretation: '투자한 자본 100원당 20원의 이익을 창출합니다.'
      }
    ],
    relatedTerms: ['ROA', 'ROIC', '듀폰분석', '자기자본'],
    difficulty: 'intermediate',
    importance: 5,
    visualAid: 'roe-comparison-chart',
    tips: [
      'ROE 15% 이상이면 우수한 기업으로 평가됩니다',
      'ROE가 지속적으로 높은 기업을 찾는 것이 중요합니다',
      '부채를 늘려 ROE를 높이는 경우도 있으니 주의해야 합니다'
    ],
    realWorldCase: '삼성전자의 최근 5년 평균 ROE는 약 15%로, 업계 평균을 상회합니다.'
  },

  // 재무/회계
  {
    id: '8',
    term: '매출액 (Revenue/Sales)',
    pronunciation: '매출액 [mae-chul-aek]',
    category: 'financial',
    definition: '기업이 상품이나 서비스를 판매하여 얻은 총 수입',
    detailedExplanation: '매출액은 손익계산서의 첫 번째 항목으로, 기업의 사업 규모와 성장성을 파악하는 기본 지표입니다. 매출액에서 비용을 차감하면 이익이 됩니다.',
    examples: [
      {
        situation: '분기 매출액 전년 동기 대비 분석',
        calculation: '(올해 매출 - 작년 매출) ÷ 작년 매출 × 100 = 성장률(%)',
        interpretation: '매출 성장률을 통해 기업의 성장세를 확인할 수 있습니다.'
      }
    ],
    relatedTerms: ['매출총이익', '영업이익', '순이익', '매출원가'],
    difficulty: 'basic',
    importance: 5,
    tips: [
      '매출액만 보지 말고 이익률도 함께 확인해야 합니다',
      '계절성이 있는 업종은 전년 동기와 비교해야 합니다',
      '일회성 매출은 제외하고 분석해야 합니다'
    ]
  },
  {
    id: '9',
    term: '영업이익 (Operating Profit)',
    pronunciation: '영업이익 [yeong-eop-i-ik]',
    category: 'financial',
    definition: '본업에서 발생한 이익',
    detailedExplanation: '영업이익은 매출액에서 매출원가와 판매관리비를 차감한 것으로, 기업의 본업 수익성을 나타내는 핵심 지표입니다. 영업외 손익은 포함되지 않습니다.',
    formula: '영업이익 = 매출액 - 매출원가 - 판매관리비',
    examples: [
      {
        situation: '매출액 1,000억, 매출원가 600억, 판관비 200억',
        calculation: '영업이익 = 1,000 - 600 - 200 = 200억원',
        interpretation: '영업이익률은 20%로 본업에서 안정적인 수익을 창출하고 있습니다.'
      }
    ],
    relatedTerms: ['영업이익률', 'EBIT', 'EBITDA', '영업레버리지'],
    difficulty: 'intermediate',
    importance: 5,
    tips: [
      '영업이익률이 꾸준히 개선되는 기업이 좋습니다',
      '업종별로 평균 영업이익률이 다릅니다',
      '영업이익이 음수면 본업에서 손실이 발생한 것입니다'
    ]
  },

  // 기술적 분석
  {
    id: '10',
    term: '이동평균선 (Moving Average)',
    pronunciation: '이동평균선 [i-dong-pyeong-gyun-seon]',
    category: 'technical',
    definition: '일정 기간의 주가를 평균한 선',
    detailedExplanation: '이동평균선은 주가의 평균적인 흐름을 보여주는 추세 지표입니다. 단기(5일, 20일), 중기(60일), 장기(120일, 240일) 이동평균선을 함께 활용합니다.',
    examples: [
      {
        situation: '5일 이동평균선 계산',
        calculation: '(1일전 + 2일전 + 3일전 + 4일전 + 5일전 종가) ÷ 5',
        interpretation: '최근 5일간의 평균 주가를 나타내며, 단기 추세를 파악할 수 있습니다.'
      }
    ],
    relatedTerms: ['골든크로스', '데드크로스', 'SMA', 'EMA'],
    difficulty: 'intermediate',
    importance: 5,
    visualAid: 'moving-average-chart',
    tips: [
      '주가가 이동평균선 위에 있으면 상승 추세로 봅니다',
      '이동평균선이 지지선이나 저항선 역할을 합니다',
      '여러 이동평균선이 정배열되면 강한 상승 신호입니다'
    ]
  },
  {
    id: '11',
    term: 'RSI (상대강도지수)',
    pronunciation: 'RSI [알에스아이]',
    category: 'technical',
    definition: '가격의 상승압력과 하락압력 간의 상대적인 강도',
    detailedExplanation: 'RSI는 0~100 사이의 값으로 표시되며, 70 이상이면 과매수, 30 이하면 과매도 상태로 판단합니다. 추세의 강도와 전환점을 파악하는 데 유용합니다.',
    formula: 'RSI = 100 - (100 ÷ (1 + RS)), RS = 평균상승폭 ÷ 평균하락폭',
    examples: [
      {
        situation: 'RSI 75',
        interpretation: '과매수 구간으로 단기 조정 가능성이 있습니다.'
      },
      {
        situation: 'RSI 25',
        interpretation: '과매도 구간으로 반등 가능성이 있습니다.'
      }
    ],
    relatedTerms: ['다이버전스', '스토캐스틱', 'MACD', '모멘텀'],
    difficulty: 'intermediate',
    importance: 4,
    tips: [
      '강한 상승/하락 추세에서는 RSI가 극단값을 유지할 수 있습니다',
      'RSI 다이버전스는 추세 전환 신호로 활용됩니다',
      '단독으로 사용하기보다 다른 지표와 함께 활용하세요'
    ]
  },

  // 리스크 관리
  {
    id: '12',
    term: '손절매 (Stop Loss)',
    pronunciation: '손절매 [son-jeol-mae]',
    category: 'risk',
    definition: '손실을 제한하기 위해 정해진 가격에서 매도하는 것',
    detailedExplanation: '손절매는 투자에서 가장 중요한 리스크 관리 방법입니다. 감정적인 판단을 배제하고 기계적으로 손실을 제한함으로써 큰 손실을 방지합니다.',
    examples: [
      {
        situation: '10,000원에 매수, -5% 손절선 설정',
        calculation: '손절가 = 10,000 × 0.95 = 9,500원',
        interpretation: '주가가 9,500원에 도달하면 자동으로 매도하여 5% 이상의 손실을 방지합니다.'
      }
    ],
    relatedTerms: ['익절매', '트레일링 스톱', '손익비', '리스크 관리'],
    difficulty: 'basic',
    importance: 5,
    tips: [
      '손절매는 투자의 필수 요소입니다',
      '매수 전에 손절가를 미리 정해두세요',
      '손절 후 다시 오르더라도 후회하지 마세요'
    ],
    commonMistakes: [
      '손절선을 지키지 않고 보유하다 더 큰 손실을 보는 것',
      '너무 타이트한 손절선으로 자주 손절당하는 것'
    ]
  },
  {
    id: '13',
    term: '분산투자 (Diversification)',
    pronunciation: '분산투자 [bun-san-tu-ja]',
    category: 'risk',
    definition: '여러 종목이나 자산에 나누어 투자하는 전략',
    detailedExplanation: '분산투자는 "계란을 한 바구니에 담지 말라"는 격언처럼, 투자 위험을 여러 자산에 분산시켜 전체 포트폴리오의 위험을 줄이는 전략입니다.',
    examples: [
      {
        situation: '1,000만원 투자금',
        calculation: '주식 60%(600만원) + 채권 30%(300만원) + 현금 10%(100만원)',
        interpretation: '자산군별로 분산하여 시장 변동성에 대응합니다.'
      }
    ],
    relatedTerms: ['포트폴리오', '자산배분', '상관계수', '리밸런싱'],
    difficulty: 'intermediate',
    importance: 5,
    tips: [
      '과도한 분산은 수익률을 희석시킬 수 있습니다',
      '상관관계가 낮은 자산에 분산투자하는 것이 효과적입니다',
      '정기적인 리밸런싱이 필요합니다'
    ],
    realWorldCase: '2008년 금융위기 때 주식에만 투자한 사람들은 큰 손실을 봤지만, 채권과 금 등에 분산투자한 사람들은 손실이 제한적이었습니다.'
  }
];

// 학습 진도 관리
interface LearningProgress {
  termId: string;
  studied: boolean;
  masteryLevel: number; // 0-100
  lastStudied?: Date;
}

export function FinancialTermsModule() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTerm, setSelectedTerm] = useState<FinancialTerm | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'study'>('grid');
  const [studyProgress, setStudyProgress] = useState<LearningProgress[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);

  // 카테고리별 용어 필터링
  const filteredTerms = financialTermsDB.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // 학습 진도 업데이트
  const markAsStudied = (termId: string) => {
    setStudyProgress(prev => {
      const existing = prev.find(p => p.termId === termId);
      if (existing) {
        return prev.map(p => 
          p.termId === termId 
            ? { ...p, studied: true, lastStudied: new Date() }
            : p
        );
      }
      return [...prev, {
        termId,
        studied: true,
        masteryLevel: 20,
        lastStudied: new Date()
      }];
    });
  };

  // 전체 학습 통계
  const totalTerms = financialTermsDB.length;
  const studiedTerms = studyProgress.filter(p => p.studied).length;
  const masteredTerms = studyProgress.filter(p => p.masteryLevel >= 80).length;
  const progressPercentage = (studiedTerms / totalTerms) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* 헤더 섹션 */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Coins className="w-10 h-10" />
              금융 용어 마스터
            </h1>
            <p className="text-xl text-indigo-100 mb-8">
              금융 문맹 탈출! 체계적으로 배우는 {totalTerms}개의 필수 금융 용어
            </p>
            
            {/* 학습 통계 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">{totalTerms}</div>
                <div className="text-sm">전체 용어</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">{studiedTerms}</div>
                <div className="text-sm">학습한 용어</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">{masteredTerms}</div>
                <div className="text-sm">마스터한 용어</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">{Math.round(progressPercentage)}%</div>
                <div className="text-sm">학습 진도</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 진도 바 */}
        <div className="px-4 pb-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/20 rounded-full h-3">
              <div 
                className="bg-white h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 필터 및 검색 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* 카테고리 선택 */}
            <div className="flex-1">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                카테고리별 학습
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`p-3 rounded-lg transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  전체 ({totalTerms})
                </button>
                {categories.map(cat => {
                  const Icon = cat.icon;
                  const count = financialTermsDB.filter(t => t.category === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`p-3 rounded-lg transition-all flex items-center justify-center gap-2 ${
                        selectedCategory === cat.id
                          ? 'bg-gradient-to-r text-white ' + cat.color
                          : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{cat.name} ({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* 검색 */}
            <div className="md:w-80">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Search className="w-5 h-5" />
                용어 검색
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="용어나 설명을 검색하세요..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* 학습 모드 전환 */}
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-lg transition-all ${
                viewMode === 'grid'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}
            >
              <Eye className="w-4 h-4 inline mr-2" />
              용어 목록
            </button>
            <button
              onClick={() => setViewMode('study')}
              className={`px-4 py-2 rounded-lg transition-all ${
                viewMode === 'study'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}
            >
              <Brain className="w-4 h-4 inline mr-2" />
              학습 모드
            </button>
            <button
              onClick={() => setShowQuiz(true)}
              className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
            >
              <Target className="w-4 h-4 inline mr-2" />
              퀴즈 풀기
            </button>
          </div>
        </div>

        {/* 용어 목록 또는 학습 모드 */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTerms.map((term) => {
              const progress = studyProgress.find(p => p.termId === term.id);
              const isStudied = progress?.studied || false;
              const category = categories.find(c => c.id === term.category);
              const Icon = category?.icon || BookOpen;
              
              return (
                <div
                  key={term.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
                  onClick={() => setSelectedTerm(term)}
                >
                  {/* 카드 헤더 */}
                  <div className={`p-4 bg-gradient-to-r ${category?.color || 'from-gray-500 to-gray-600'}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-lg">{term.term}</h3>
                          {term.pronunciation && (
                            <p className="text-white/80 text-sm">{term.pronunciation}</p>
                          )}
                        </div>
                      </div>
                      {isStudied && (
                        <CheckCircle className="w-6 h-6 text-white" />
                      )}
                    </div>
                  </div>
                  
                  {/* 카드 본문 */}
                  <div className="p-6">
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {term.definition}
                    </p>
                    
                    {/* 메타 정보 */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          term.difficulty === 'basic' 
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : term.difficulty === 'intermediate'
                            ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {term.difficulty === 'basic' ? '초급' : term.difficulty === 'intermediate' ? '중급' : '고급'}
                        </span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < term.importance 
                                  ? 'fill-yellow-400 text-yellow-400' 
                                  : 'text-gray-300 dark:text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                    </div>
                    
                    {/* 학습 진도 */}
                    {progress && (
                      <div className="mt-4">
                        <div className="flex justify-between text-xs mb-1">
                          <span>숙련도</span>
                          <span>{progress.masteryLevel}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all"
                            style={{ width: `${progress.masteryLevel}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // 학습 모드
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Brain className="w-8 h-8 text-indigo-600" />
              오늘의 학습 용어
            </h2>
            
            {/* 학습 카드 스타일로 용어 표시 */}
            <div className="space-y-6">
              {filteredTerms.slice(0, 5).map((term, index) => (
                <div 
                  key={term.id}
                  className="border-l-4 border-indigo-600 pl-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-r-lg transition-colors cursor-pointer"
                  onClick={() => setSelectedTerm(term)}
                >
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-3xl font-bold text-gray-300">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-xl font-semibold">{term.term}</h3>
                    <Volume2 className="w-5 h-5 text-gray-400 hover:text-indigo-600 cursor-pointer" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {term.definition}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                <PlayCircle className="w-5 h-5 inline mr-2" />
                전체 용어 학습 시작
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 상세 용어 뷰 (사이드 패널) */}
      {selectedTerm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <div className="w-full max-w-3xl bg-white dark:bg-gray-800 h-full overflow-y-auto animate-slide-in-right">
            {/* 헤더 */}
            <div className={`sticky top-0 bg-gradient-to-r ${
              categories.find(c => c.id === selectedTerm.category)?.color || 'from-gray-500 to-gray-600'
            } text-white p-6 z-10`}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{selectedTerm.term}</h2>
                  {selectedTerm.pronunciation && (
                    <p className="text-white/80 flex items-center gap-2">
                      {selectedTerm.pronunciation}
                      <Volume2 className="w-5 h-5 cursor-pointer hover:text-white" />
                    </p>
                  )}
                </div>
                <button
                  onClick={() => {
                    setSelectedTerm(null);
                    markAsStudied(selectedTerm.id);
                  }}
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* 콘텐츠 */}
            <div className="p-6 space-y-8">
              {/* 정의 */}
              <section>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-yellow-500" />
                  핵심 정의
                </h3>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                  <p className="text-lg">{selectedTerm.definition}</p>
                </div>
              </section>

              {/* 상세 설명 */}
              <section>
                <h3 className="text-xl font-semibold mb-4">상세 설명</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {selectedTerm.detailedExplanation}
                </p>
              </section>

              {/* 공식 */}
              {selectedTerm.formula && (
                <section>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Calculator className="w-6 h-6 text-purple-500" />
                    계산 공식
                  </h3>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 font-mono text-lg">
                    {selectedTerm.formula}
                  </div>
                </section>
              )}

              {/* 예시 */}
              <section>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <PieChart className="w-6 h-6 text-blue-500" />
                  실전 예시
                </h3>
                <div className="space-y-4">
                  {selectedTerm.examples.map((example, index) => (
                    <div key={index} className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                      <p className="font-semibold mb-2">{example.situation}</p>
                      {example.calculation && (
                        <p className="font-mono text-sm mb-2 text-blue-700 dark:text-blue-300">
                          {example.calculation}
                        </p>
                      )}
                      <p className="text-gray-700 dark:text-gray-300">
                        💡 {example.interpretation}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* 팁 */}
              {selectedTerm.tips && (
                <section>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Zap className="w-6 h-6 text-green-500" />
                    실전 팁
                  </h3>
                  <ul className="space-y-2">
                    {selectedTerm.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* 흔한 실수 */}
              {selectedTerm.commonMistakes && (
                <section>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Shield className="w-6 h-6 text-red-500" />
                    주의사항
                  </h3>
                  <ul className="space-y-2">
                    {selectedTerm.commonMistakes.map((mistake, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-red-500">⚠️</span>
                        <span className="text-gray-700 dark:text-gray-300">{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* 실제 사례 */}
              {selectedTerm.realWorldCase && (
                <section>
                  <h3 className="text-xl font-semibold mb-4">실제 사례</h3>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-gray-700 dark:text-gray-300">
                      📰 {selectedTerm.realWorldCase}
                    </p>
                  </div>
                </section>
              )}

              {/* 관련 용어 */}
              <section>
                <h3 className="text-xl font-semibold mb-4">관련 용어</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedTerm.relatedTerms.map((related, index) => (
                    <button
                      key={index}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-sm hover:bg-indigo-100 dark:hover:bg-indigo-900/30 hover:text-indigo-600 transition-colors"
                      onClick={() => {
                        const relatedTerm = financialTermsDB.find(t => 
                          t.term.includes(related) || related.includes(t.term.split(' ')[0])
                        );
                        if (relatedTerm) {
                          setSelectedTerm(relatedTerm);
                        }
                      }}
                    >
                      {related}
                      <ChevronRight className="inline w-3 h-3 ml-1" />
                    </button>
                  ))}
                </div>
              </section>

              {/* 학습 완료 버튼 */}
              <div className="pt-8 border-t dark:border-gray-700">
                <button
                  onClick={() => {
                    markAsStudied(selectedTerm.id);
                    setSelectedTerm(null);
                  }}
                  className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  <CheckCircle className="w-5 h-5 inline mr-2" />
                  학습 완료
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}