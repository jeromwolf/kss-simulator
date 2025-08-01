import { Module } from '@/types/module'

export const stockAnalysisModule: Module = {
  id: 'stock-analysis',
  name: 'Stock Analysis & Investment',
  nameKo: '주식투자분석',
  description: '체계적인 주식투자 방법론과 AI를 활용한 현대적 투자 전략을 마스터하는 종합 과정',
  version: '1.0.0',
  difficulty: 'intermediate',
  estimatedHours: 60,
  icon: '📈',
  color: '#059669',
  
  prerequisites: ['기본적인 경제 지식', '수학적 사고력'],
  
  chapters: [
    {
      id: 'foundation',
      title: '금융시장의 이해',
      description: '주식시장의 구조와 원리를 파악하고 투자의 기초를 다집니다',
      estimatedMinutes: 180,
      keywords: ['주식시장', '증권거래소', '시장참여자', '거래시스템'],
      learningObjectives: [
        '주식시장의 구조와 참여자들의 역할 이해',
        '거래 시스템과 주문 유형 완전 마스터',
        '시장 지수와 섹터 분류 체계 파악',
        '투자와 투기의 차이점 명확히 구분'
      ]
    },
    {
      id: 'fundamental-analysis',
      title: '기본적 분석 (Fundamental Analysis)',
      description: '기업의 재무제표와 경영현황을 분석하여 내재가치를 평가합니다',
      estimatedMinutes: 240,
      keywords: ['재무제표', 'PER', 'PBR', 'ROE', '현금흐름'],
      learningObjectives: [
        '재무제표 3요소(손익계산서, 대차대조표, 현금흐름표) 완전 해독',
        '주요 투자지표(PER, PBR, ROE, ROIC) 계산과 해석',
        '산업 분석과 경쟁사 비교 방법론',
        'DCF 모델을 이용한 기업가치 평가'
      ]
    },
    {
      id: 'technical-analysis',
      title: '기술적 분석 (Technical Analysis)',
      description: '차트와 기술적 지표를 활용한 주가 패턴 분석과 매매 타이밍 포착',
      estimatedMinutes: 210,
      keywords: ['차트패턴', '이동평균', 'RSI', 'MACD', '볼린저밴드'],
      learningObjectives: [
        '캔들스틱 차트와 주요 패턴 인식',
        '이동평균선과 추세 분석 기법',
        'RSI, MACD, 스토캐스틱 등 보조지표 활용',
        '지지선과 저항선을 이용한 매매 전략'
      ]
    },
    {
      id: 'portfolio-management',
      title: '포트폴리오 관리',
      description: '리스크 관리와 자산 배분을 통한 효율적인 포트폴리오 구성',
      estimatedMinutes: 150,
      keywords: ['자산배분', '분산투자', '리스크관리', '리밸런싱'],
      learningObjectives: [
        '현대 포트폴리오 이론(MPT) 이해와 적용',
        '효율적 프론티어와 최적 포트폴리오 구성',
        '상관계수를 이용한 분산투자 전략',
        '정기적 리밸런싱과 세금 효율성 고려'
      ]
    },
    {
      id: 'ai-quant-investing',
      title: 'AI & 퀀트 투자',
      description: '머신러닝과 빅데이터를 활용한 현대적 투자 전략',
      estimatedMinutes: 270,
      keywords: ['머신러닝', '알고리즘트레이딩', '백테스팅', 'AI투자'],
      learningObjectives: [
        '퀀트 투자의 기본 개념과 장단점',
        '머신러닝을 이용한 주가 예측 모델',
        '백테스팅을 통한 전략 검증',
        'AI 투자 플랫폼 활용 실습'
      ]
    }
  ],
  
  simulators: [
    {
      id: 'financial-calculator',
      name: '재무제표 분석기',
      description: '기업의 재무 데이터를 입력하여 주요 투자지표를 자동 계산',
      component: 'FinancialCalculator'
    },
    {
      id: 'chart-analyzer',
      name: '차트 패턴 분석기',
      description: '실시간 차트에서 기술적 패턴을 인식하고 매매 신호 생성',
      component: 'ChartAnalyzer'
    },
    {
      id: 'portfolio-optimizer',
      name: '포트폴리오 최적화기',
      description: '목표 수익률과 리스크 수준에 따른 최적 자산 배분 계산',
      component: 'PortfolioOptimizer'
    },
    {
      id: 'backtesting-engine',
      name: '백테스팅 엔진',
      description: '투자 전략을 과거 데이터로 검증하고 성과 분석',
      component: 'BacktestingEngine'
    },
    {
      id: 'ai-mentor',
      name: 'AI 투자 멘토',
      description: '개인화된 투자 조언과 학습 가이드 제공',
      component: 'AIMentor'
    }
  ],
  
  tools: [
    {
      id: 'stock-screener',
      name: '종목 스크리너',
      description: '조건에 맞는 투자 종목 발굴',
      url: '/modules/stock-analysis/tools/screener'
    },
    {
      id: 'financial-terms',
      name: '금융 용어 사전',
      description: '165개+ 핵심 금융 용어 학습',
      url: '/stock-dictionary'
    },
    {
      id: 'market-simulator',
      name: '모의투자 시뮬레이터',
      description: '가상 자금으로 실전 투자 연습',
      url: '/modules/stock-analysis/tools/simulator'
    }
  ]
}

export const getChapter = (chapterId: string) => {
  return stockAnalysisModule.chapters.find(chapter => chapter.id === chapterId)
}

export const getNextChapter = (currentChapterId: string) => {
  const currentIndex = stockAnalysisModule.chapters.findIndex(ch => ch.id === currentChapterId)
  return currentIndex < stockAnalysisModule.chapters.length - 1 ? stockAnalysisModule.chapters[currentIndex + 1] : undefined
}

export const getPrevChapter = (currentChapterId: string) => {
  const currentIndex = stockAnalysisModule.chapters.findIndex(ch => ch.id === currentChapterId)
  return currentIndex > 0 ? stockAnalysisModule.chapters[currentIndex - 1] : undefined
}