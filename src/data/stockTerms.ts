// 주식 투자 용어 사전 데이터

export interface StockTerm {
  id: string;
  term: string;
  description: string;
  category: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  relatedTerms?: string[];
  example?: string;
}

export const stockTermsData: StockTerm[] = [
  // 기본 시장 용어
  {
    id: 'stock',
    term: '주식',
    description: '기업의 소유권을 나타내는 증권. 주식을 보유하면 해당 기업의 주주가 되어 의결권과 배당받을 권리를 갖게 됨',
    category: '기본 시장 용어',
    difficulty: 'basic',
    relatedTerms: ['주주', '증권', '지분'],
    example: '삼성전자 주식 100주를 보유하면 삼성전자의 주주가 됩니다'
  },
  {
    id: 'shareholder',
    term: '주주',
    description: '주식을 소유한 사람. 회사의 이익 배당을 받을 권리와 주주총회에서 의결권을 행사할 권리를 가짐',
    category: '기본 시장 용어',
    difficulty: 'basic',
    relatedTerms: ['주식', '의결권', '배당']
  },
  {
    id: 'dividend',
    term: '배당',
    description: '기업이 영업활동으로 얻은 이익의 일부를 주주들에게 나누어 주는 것. 현금배당과 주식배당으로 구분',
    category: '기본 시장 용어',
    difficulty: 'basic',
    relatedTerms: ['배당수익률', '배당락', '배당기준일'],
    example: '연간 주당 1,000원의 배당금을 지급'
  },
  {
    id: 'ipo',
    term: '상장 (IPO)',
    description: 'Initial Public Offering. 기업이 최초로 주식을 일반 대중에게 공개하고 증권거래소에서 거래되도록 하는 것',
    category: '기본 시장 용어',
    difficulty: 'intermediate',
    relatedTerms: ['공모가', '상장폐지', '코스피', '코스닥']
  },
  {
    id: 'delisting',
    term: '상장폐지',
    description: '상장된 기업이 일정 요건을 충족하지 못하거나 자진해서 증권거래소에서 퇴출되는 것',
    category: '기본 시장 용어',
    difficulty: 'intermediate',
    relatedTerms: ['관리종목', '투자주의종목', '정리매매']
  },
  {
    id: 'capital-increase',
    term: '유상증자',
    description: '기업이 새로운 주식을 발행하여 자금을 조달하는 것. 기존 주주나 일반 투자자에게 돈을 받고 주식을 발행',
    category: '기본 시장 용어',
    difficulty: 'intermediate',
    relatedTerms: ['무상증자', '주주배정', '제3자배정'],
    example: '주당 5,000원에 신주 100만주 발행'
  },
  {
    id: 'bonus-issue',
    term: '무상증자',
    description: '기업이 이익잉여금이나 자본잉여금을 자본금으로 전입하여 주주에게 무상으로 신주를 배정하는 것',
    category: '기본 시장 용어',
    difficulty: 'intermediate',
    relatedTerms: ['유상증자', '권리락', '주식분할']
  },
  {
    id: 'treasury-stock',
    term: '자사주',
    description: '기업이 자기 회사의 주식을 매입하여 보유하는 것. 주가 안정, 적대적 M&A 방어 등의 목적으로 활용',
    category: '기본 시장 용어',
    difficulty: 'intermediate',
    relatedTerms: ['자사주 매입', '자사주 소각', '주식가치']
  },

  // 거래 관련 용어
  {
    id: 'bid-ask',
    term: '호가',
    description: '주식을 사고자 하는 가격(매수호가)과 팔고자 하는 가격(매도호가). 매수/매도 주문이 대기하는 가격대',
    category: '거래 관련 용어',
    difficulty: 'basic',
    relatedTerms: ['매수호가', '매도호가', '호가창', '스프레드']
  },
  {
    id: 'spread',
    term: '스프레드',
    description: '매수호가와 매도호가의 차이. 스프레드가 좁을수록 유동성이 좋은 종목',
    category: '거래 관련 용어',
    difficulty: 'intermediate',
    relatedTerms: ['호가', '유동성', '매매체결']
  },
  {
    id: 'limit-up',
    term: '상한가',
    description: '하루 동안 주가가 오를 수 있는 최대 한도. 한국 주식시장은 전일 종가 대비 +30%',
    category: '거래 관련 용어',
    difficulty: 'basic',
    relatedTerms: ['하한가', '가격제한폭', '서킷브레이커']
  },
  {
    id: 'limit-down',
    term: '하한가',
    description: '하루 동안 주가가 내릴 수 있는 최대 한도. 한국 주식시장은 전일 종가 대비 -30%',
    category: '거래 관련 용어',
    difficulty: 'basic',
    relatedTerms: ['상한가', '가격제한폭', '패닉셀']
  },
  {
    id: 'market-order',
    term: '시장가 주문',
    description: '가격을 지정하지 않고 현재 시장에서 즉시 체결 가능한 가격으로 매매하는 주문',
    category: '거래 관련 용어',
    difficulty: 'basic',
    relatedTerms: ['지정가 주문', '조건부 주문', '체결']
  },
  {
    id: 'limit-order',
    term: '지정가 주문',
    description: '원하는 가격을 지정하여 그 가격 이하로 매수하거나 이상으로 매도하는 주문',
    category: '거래 관련 용어',
    difficulty: 'basic',
    relatedTerms: ['시장가 주문', 'IOC', 'FOK']
  },
  {
    id: 'volume',
    term: '거래량',
    description: '일정 기간 동안 거래된 주식의 수량. 시장의 관심도와 유동성을 나타내는 지표',
    category: '거래 관련 용어',
    difficulty: 'basic',
    relatedTerms: ['거래대금', '거래회전율', '평균거래량']
  },
  {
    id: 'turnover',
    term: '거래대금',
    description: '거래량에 주가를 곱한 금액. 실제로 거래된 금액의 총합',
    category: '거래 관련 용어',
    difficulty: 'basic',
    relatedTerms: ['거래량', '유동성', '시가총액']
  },

  // 기술적 분석 용어
  {
    id: 'candlestick',
    term: '캔들차트',
    description: '시가, 고가, 저가, 종가를 하나의 캔들 모양으로 표현한 차트. 주가의 움직임을 한눈에 파악 가능',
    category: '기술적 분석 용어',
    difficulty: 'basic',
    relatedTerms: ['양봉', '음봉', '도지', 'OHLC']
  },
  {
    id: 'bullish-candle',
    term: '양봉',
    description: '종가가 시가보다 높은 캔들. 주가가 상승한 것을 의미하며 보통 빨간색이나 흰색으로 표시',
    category: '기술적 분석 용어',
    difficulty: 'basic',
    relatedTerms: ['음봉', '캔들차트', '상승장']
  },
  {
    id: 'bearish-candle',
    term: '음봉',
    description: '종가가 시가보다 낮은 캔들. 주가가 하락한 것을 의미하며 보통 파란색이나 검은색으로 표시',
    category: '기술적 분석 용어',
    difficulty: 'basic',
    relatedTerms: ['양봉', '캔들차트', '하락장']
  },
  {
    id: 'moving-average',
    term: '이동평균선',
    description: '일정 기간 동안의 주가 평균을 선으로 연결한 것. 5일선, 20일선, 60일선, 120일선 등이 주로 사용됨',
    category: '기술적 분석 용어',
    difficulty: 'basic',
    relatedTerms: ['골든크로스', '데드크로스', '정배열', '역배열']
  },
  {
    id: 'golden-cross',
    term: '골든크로스',
    description: '단기 이동평균선이 장기 이동평균선을 아래에서 위로 돌파하는 현상. 상승 신호로 해석',
    category: '기술적 분석 용어',
    difficulty: 'intermediate',
    relatedTerms: ['데드크로스', '이동평균선', '매수신호']
  },
  {
    id: 'dead-cross',
    term: '데드크로스',
    description: '단기 이동평균선이 장기 이동평균선을 위에서 아래로 돌파하는 현상. 하락 신호로 해석',
    category: '기술적 분석 용어',
    difficulty: 'intermediate',
    relatedTerms: ['골든크로스', '이동평균선', '매도신호']
  },
  {
    id: 'support',
    term: '지지선',
    description: '주가가 하락하다가 멈추고 반등하는 가격대. 매수세가 강한 구간',
    category: '기술적 분석 용어',
    difficulty: 'intermediate',
    relatedTerms: ['저항선', '돌파', '되돌림', '추세선']
  },
  {
    id: 'resistance',
    term: '저항선',
    description: '주가가 상승하다가 멈추고 하락하는 가격대. 매도세가 강한 구간',
    category: '기술적 분석 용어',
    difficulty: 'intermediate',
    relatedTerms: ['지지선', '돌파', '매물대', '추세선']
  },
  {
    id: 'rsi',
    term: 'RSI',
    description: 'Relative Strength Index. 상대강도지수로 과매수/과매도 상태를 판단하는 지표. 70 이상은 과매수, 30 이하는 과매도',
    category: '기술적 분석 용어',
    difficulty: 'intermediate',
    relatedTerms: ['과매수', '과매도', '모멘텀', '다이버전스']
  },
  {
    id: 'macd',
    term: 'MACD',
    description: 'Moving Average Convergence Divergence. 단기와 장기 이동평균의 차이를 이용한 추세 추종 지표',
    category: '기술적 분석 용어',
    difficulty: 'advanced',
    relatedTerms: ['시그널선', '오실레이터', '다이버전스', '골든크로스']
  },
  {
    id: 'bollinger-bands',
    term: '볼린저밴드',
    description: '주가의 변동성을 나타내는 지표. 중심선과 상단밴드, 하단밴드로 구성되며 밴드 폭으로 변동성 판단',
    category: '기술적 분석 용어',
    difficulty: 'intermediate',
    relatedTerms: ['표준편차', '변동성', '스퀴즈', '확장']
  },

  // 기본적 분석 용어
  {
    id: 'per',
    term: 'PER',
    description: 'Price Earnings Ratio. 주가수익비율로 주가를 주당순이익으로 나눈 값. 낮을수록 저평가',
    category: '기본적 분석 용어',
    difficulty: 'basic',
    relatedTerms: ['EPS', 'PBR', '밸류에이션'],
    example: 'PER 10배 = 10년간 벌어들일 순이익으로 현재 시가총액 회수 가능'
  },
  {
    id: 'pbr',
    term: 'PBR',
    description: 'Price Book-value Ratio. 주가순자산비율로 주가를 주당순자산으로 나눈 값. 1배 미만은 청산가치보다 저평가',
    category: '기본적 분석 용어',
    difficulty: 'basic',
    relatedTerms: ['BPS', 'PER', '순자산가치']
  },
  {
    id: 'eps',
    term: 'EPS',
    description: 'Earnings Per Share. 주당순이익으로 당기순이익을 발행주식수로 나눈 값',
    category: '기본적 분석 용어',
    difficulty: 'basic',
    relatedTerms: ['PER', '당기순이익', '희석EPS']
  },
  {
    id: 'roe',
    term: 'ROE',
    description: 'Return On Equity. 자기자본이익률로 순이익을 자기자본으로 나눈 값. 자본 활용 효율성을 나타냄',
    category: '기본적 분석 용어',
    difficulty: 'intermediate',
    relatedTerms: ['ROA', 'ROIC', '수익성지표'],
    example: 'ROE 15% = 자기자본 100원으로 15원의 이익 창출'
  },
  {
    id: 'roa',
    term: 'ROA',
    description: 'Return On Assets. 총자산이익률로 순이익을 총자산으로 나눈 값. 자산 활용 효율성을 나타냄',
    category: '기본적 분석 용어',
    difficulty: 'intermediate',
    relatedTerms: ['ROE', 'ROIC', '자산회전율']
  },
  {
    id: 'debt-ratio',
    term: '부채비율',
    description: '부채를 자기자본으로 나눈 비율. 100% 미만이면 안정적, 200% 이상이면 재무구조 취약',
    category: '기본적 분석 용어',
    difficulty: 'basic',
    relatedTerms: ['자기자본비율', '유동비율', '재무건전성']
  },
  {
    id: 'current-ratio',
    term: '유동비율',
    description: '유동자산을 유동부채로 나눈 비율. 단기 지급능력을 나타내며 150% 이상이면 양호',
    category: '기본적 분석 용어',
    difficulty: 'intermediate',
    relatedTerms: ['당좌비율', '부채비율', '유동성']
  },
  {
    id: 'ebitda',
    term: 'EBITDA',
    description: 'Earnings Before Interest, Taxes, Depreciation and Amortization. 이자, 세금, 감가상각 전 영업이익',
    category: '기본적 분석 용어',
    difficulty: 'advanced',
    relatedTerms: ['EBIT', '영업이익', 'FCF']
  },

  // 파생상품 용어
  {
    id: 'etf',
    term: 'ETF',
    description: 'Exchange Traded Fund. 상장지수펀드로 특정 지수를 추종하며 주식처럼 실시간 거래 가능',
    category: '파생상품 용어',
    difficulty: 'basic',
    relatedTerms: ['인덱스펀드', 'ETN', '레버리지ETF'],
    example: 'KODEX 200은 KOSPI200 지수를 추종하는 ETF'
  },
  {
    id: 'leverage-etf',
    term: '레버리지 ETF',
    description: '기초지수의 일일 수익률을 2배로 추종하는 ETF. 단기 투자에 적합하며 장기 보유시 복리 효과로 손실 위험',
    category: '파생상품 용어',
    difficulty: 'intermediate',
    relatedTerms: ['인버스ETF', 'ETF', '변동성']
  },
  {
    id: 'inverse-etf',
    term: '인버스 ETF',
    description: '기초지수와 반대로 움직이는 ETF. 지수가 하락하면 상승하여 하락장에서 수익 추구',
    category: '파생상품 용어',
    difficulty: 'intermediate',
    relatedTerms: ['레버리지ETF', '공매도', '헤지']
  },
  {
    id: 'call-option',
    term: '콜옵션',
    description: '특정 가격에 기초자산을 매수할 수 있는 권리. 주가 상승을 예상할 때 매수',
    category: '파생상품 용어',
    difficulty: 'advanced',
    relatedTerms: ['풋옵션', '행사가', '프리미엄', '내재가치']
  },
  {
    id: 'put-option',
    term: '풋옵션',
    description: '특정 가격에 기초자산을 매도할 수 있는 권리. 주가 하락을 예상할 때 매수',
    category: '파생상품 용어',
    difficulty: 'advanced',
    relatedTerms: ['콜옵션', '행사가', '헤지', '보호적풋']
  },

  // 시장 상황 용어
  {
    id: 'bull-market',
    term: '불마켓 (강세장)',
    description: '주가가 지속적으로 상승하는 시장. 황소가 뿔을 위로 치켜올리는 모습에서 유래',
    category: '시장 상황 용어',
    difficulty: 'basic',
    relatedTerms: ['베어마켓', '상승장', '랠리', '버블']
  },
  {
    id: 'bear-market',
    term: '베어마켓 (약세장)',
    description: '주가가 지속적으로 하락하는 시장. 곰이 앞발로 아래를 내리치는 모습에서 유래',
    category: '시장 상황 용어',
    difficulty: 'basic',
    relatedTerms: ['불마켓', '하락장', '패닉셀', '침체']
  },
  {
    id: 'risk-on',
    term: '리스크온',
    description: '투자자들이 위험자산 선호하는 시장 분위기. 주식, 원자재 등 위험자산으로 자금 유입',
    category: '시장 상황 용어',
    difficulty: 'intermediate',
    relatedTerms: ['리스크오프', '위험선호', '유동성장세']
  },
  {
    id: 'risk-off',
    term: '리스크오프',
    description: '투자자들이 안전자산을 선호하는 시장 분위기. 달러, 엔화, 금 등으로 자금 이동',
    category: '시장 상황 용어',
    difficulty: 'intermediate',
    relatedTerms: ['리스크온', '안전자산', '변동성확대']
  },
  {
    id: 'short-squeeze',
    term: '숏스퀴즈',
    description: '공매도 포지션이 청산되면서 주가가 급등하는 현상. 공매도자들의 손절매가 추가 상승 유발',
    category: '시장 상황 용어',
    difficulty: 'advanced',
    relatedTerms: ['공매도', '숏커버링', '감마스퀴즈'],
    example: '게임스탑 사태가 대표적인 숏스퀴즈 사례'
  },
  {
    id: 'panic-selling',
    term: '패닉셀',
    description: '공포에 의한 무차별적 매도. 악재나 급락으로 투자자들이 공황 상태에서 투매하는 현상',
    category: '시장 상황 용어',
    difficulty: 'intermediate',
    relatedTerms: ['투항매도', '바닥매수', '변동성']
  },
  {
    id: 'rotation',
    term: '로테이션',
    description: '투자 자금이 특정 섹터나 종목에서 다른 곳으로 이동하는 현상. 업종 순환이라고도 함',
    category: '시장 상황 용어',
    difficulty: 'intermediate',
    relatedTerms: ['섹터로테이션', '스타일로테이션', '리밸런싱']
  },

  // 글로벌 시장 용어
  {
    id: 'fed',
    term: 'Fed (연준)',
    description: 'Federal Reserve. 미국 중앙은행으로 통화정책을 결정. 기준금리 결정이 글로벌 시장에 큰 영향',
    category: '글로벌 시장 용어',
    difficulty: 'intermediate',
    relatedTerms: ['FOMC', '기준금리', '테이퍼링', 'QE']
  },
  {
    id: 'fomc',
    term: 'FOMC',
    description: 'Federal Open Market Committee. 연방공개시장위원회로 미국의 통화정책을 결정하는 회의',
    category: '글로벌 시장 용어',
    difficulty: 'intermediate',
    relatedTerms: ['Fed', '금리인상', '점도표', '의사록']
  },
  {
    id: 'qe',
    term: 'QE (양적완화)',
    description: 'Quantitative Easing. 중앙은행이 국채 등을 매입해 시중에 돈을 푸는 정책',
    category: '글로벌 시장 용어',
    difficulty: 'advanced',
    relatedTerms: ['QT', '테이퍼링', '유동성', '인플레이션']
  },
  {
    id: 'tapering',
    term: '테이퍼링',
    description: '양적완화 정책을 점진적으로 축소하는 것. 자산 매입 규모를 줄여나가는 과정',
    category: '글로벌 시장 용어',
    difficulty: 'advanced',
    relatedTerms: ['QE', 'QT', '긴축', '출구전략']
  },
  {
    id: 'vix',
    term: 'VIX',
    description: 'Volatility Index. 변동성 지수로 공포지수라고도 불림. 20 이상이면 불안, 30 이상이면 공포 상태',
    category: '글로벌 시장 용어',
    difficulty: 'intermediate',
    relatedTerms: ['변동성', '옵션', 'S&P500', '헤지']
  },
  {
    id: 'cpi',
    term: 'CPI',
    description: 'Consumer Price Index. 소비자물가지수로 인플레이션을 측정하는 대표적 지표',
    category: '글로벌 시장 용어',
    difficulty: 'intermediate',
    relatedTerms: ['PPI', 'PCE', '인플레이션', '금리']
  },

  // 투자 전략 용어
  {
    id: 'value-investing',
    term: '가치투자',
    description: '기업의 내재가치보다 저평가된 종목을 매수하여 장기 보유하는 투자 전략. 워런 버핏이 대표적',
    category: '투자 전략 용어',
    difficulty: 'intermediate',
    relatedTerms: ['성장투자', '저PER', '안전마진', '펀더멘털']
  },
  {
    id: 'growth-investing',
    term: '성장투자',
    description: '높은 성장률이 예상되는 기업에 투자하는 전략. 현재 가치보다 미래 성장성에 중점',
    category: '투자 전략 용어',
    difficulty: 'intermediate',
    relatedTerms: ['가치투자', '고PER', '매출성장률', '기술주']
  },
  {
    id: 'momentum-investing',
    term: '모멘텀투자',
    description: '주가 상승 추세가 계속될 것으로 보고 추세를 따라가는 투자 전략',
    category: '투자 전략 용어',
    difficulty: 'intermediate',
    relatedTerms: ['추세추종', '상대강도', '52주신고가']
  },
  {
    id: 'dca',
    term: '적립식 투자',
    description: 'Dollar Cost Averaging. 일정 금액을 정기적으로 분할 매수하여 매입 단가를 평준화하는 전략',
    category: '투자 전략 용어',
    difficulty: 'basic',
    relatedTerms: ['분할매수', '물타기', '장기투자']
  },
  {
    id: 'stop-loss',
    term: '손절매',
    description: '손실을 제한하기 위해 일정 수준 이하로 하락하면 매도하는 것. 리스크 관리의 기본',
    category: '투자 전략 용어',
    difficulty: 'basic',
    relatedTerms: ['익절매', '손절선', '리스크관리'],
    example: '매수가 대비 -5% 하락시 손절매 실행'
  },
  {
    id: 'diversification',
    term: '분산투자',
    description: '여러 종목이나 자산에 나누어 투자하여 리스크를 줄이는 전략. 계란을 한 바구니에 담지 말라',
    category: '투자 전략 용어',
    difficulty: 'basic',
    relatedTerms: ['포트폴리오', '자산배분', '상관관계']
  },

  // 법규 및 제도 용어
  {
    id: 'disclosure',
    term: '공시',
    description: '상장기업이 투자자 보호를 위해 경영상 중요 정보를 공개하는 것. 수시공시와 정기공시로 구분',
    category: '법규 및 제도 용어',
    difficulty: 'basic',
    relatedTerms: ['수시공시', '정기공시', 'DART', '자율공시']
  },
  {
    id: '5-percent-rule',
    term: '5% 룰',
    description: '상장회사 주식을 5% 이상 보유하게 되면 5일 이내에 보고해야 하는 제도',
    category: '법규 및 제도 용어',
    difficulty: 'intermediate',
    relatedTerms: ['대량보유', '공시의무', '주식등의대량보유상황보고']
  },
  {
    id: 'short-swing-profit',
    term: '단기매매차익',
    description: '내부자가 6개월 이내에 매수 후 매도하여 얻은 차익을 회사에 반환해야 하는 제도',
    category: '법규 및 제도 용어',
    difficulty: 'advanced',
    relatedTerms: ['내부자거래', '임원', '주요주주']
  },
  {
    id: 'securities-tax',
    term: '증권거래세',
    description: '주식을 매도할 때 부과되는 세금. 코스피 0.08%, 코스닥 0.23% (2024년 기준)',
    category: '법규 및 제도 용어',
    difficulty: 'basic',
    relatedTerms: ['양도소득세', '배당소득세', '금융투자소득세']
  },
  {
    id: 'dividend-tax',
    term: '배당소득세',
    description: '배당금에 부과되는 세금. 원천징수 15.4%, 연간 2천만원 초과시 종합과세',
    category: '법규 및 제도 용어',
    difficulty: 'intermediate',
    relatedTerms: ['배당', '원천징수', '종합과세']
  }
];

// 카테고리별 용어 개수 계산
export const termCategories = [...Array.from(new Set(stockTermsData.map(term => term.category)))];
export const termsByCategory = termCategories.reduce((acc, category) => {
  acc[category] = stockTermsData.filter(term => term.category === category);
  return acc;
}, {} as Record<string, StockTerm[]>);

// 난이도별 용어 분류
export const termsByDifficulty = {
  basic: stockTermsData.filter(term => term.difficulty === 'basic'),
  intermediate: stockTermsData.filter(term => term.difficulty === 'intermediate'),
  advanced: stockTermsData.filter(term => term.difficulty === 'advanced')
};

// 검색 함수
export function searchTerms(query: string): StockTerm[] {
  const lowercaseQuery = query.toLowerCase();
  return stockTermsData.filter(term => 
    term.term.toLowerCase().includes(lowercaseQuery) ||
    term.description.toLowerCase().includes(lowercaseQuery) ||
    term.category.toLowerCase().includes(lowercaseQuery) ||
    (term.example && term.example.toLowerCase().includes(lowercaseQuery)) ||
    (term.relatedTerms && term.relatedTerms.some(rt => rt.toLowerCase().includes(lowercaseQuery)))
  );
}

// 관련 용어 찾기
export function getRelatedTerms(termId: string): StockTerm[] {
  const term = stockTermsData.find(t => t.id === termId);
  if (!term || !term.relatedTerms) return [];
  
  return term.relatedTerms
    .map(relatedTerm => stockTermsData.find(t => t.term === relatedTerm))
    .filter(Boolean) as StockTerm[];
}