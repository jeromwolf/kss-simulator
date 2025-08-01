'use client'

import { ReactNode } from 'react'

interface ChapterContentProps {
  chapterId: string
}

// 챕터별 콘텐츠를 렌더링하는 컴포넌트
export default function ChapterContent({ chapterId }: ChapterContentProps) {
  // 챕터별 콘텐츠 매핑
  const renderContent = (): ReactNode => {
    switch (chapterId) {
      case 'foundation':
        return <FoundationContent />
      case 'fundamental-analysis':
        return <FundamentalAnalysisContent />
      case 'technical-analysis':
        return <TechnicalAnalysisContent />
      case 'portfolio-management':
        return <PortfolioManagementContent />
      case 'ai-quant-investing':
        return <AIQuantInvestingContent />
      default:
        return <ComingSoonContent />
    }
  }

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {renderContent()}
    </div>
  )
}

// Chapter 1: Foundation - 금융시장의 이해
function FoundationContent() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">주식시장의 구조</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          주식시장은 기업이 자금을 조달하고 투자자가 기업의 일부를 소유할 수 있게 해주는 
          중요한 금융 인프라입니다. 효율적인 시장에서 주가는 기업의 가치를 반영합니다.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
            <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">💼 기업 (발행자)</h3>
            <p className="text-gray-700 dark:text-gray-300">
              자금 조달을 위해 주식을 발행하고 기업 가치 증대를 통해 주주 이익 극대화
            </p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">👥 투자자 (구매자)</h3>
            <p className="text-gray-700 dark:text-gray-300">
              자본 증식을 목적으로 기업의 성장 가능성을 분석하여 투자 결정
            </p>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-6">
            <h3 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-2">🏦 증권거래소</h3>
            <p className="text-gray-700 dark:text-gray-300">
              공정하고 투명한 거래 환경을 제공하는 시장 운영 기관
            </p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
            <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">🔍 중개기관</h3>
            <p className="text-gray-700 dark:text-gray-300">
              투자자와 시장을 연결하는 증권회사, 자산운용사 등의 금융기관
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">거래 시스템과 주문 유형</h2>
        <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-red-800 dark:text-red-200 mb-4">호가창 (Order Book) 이해</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-red-600 dark:text-red-400 font-bold">📈</span>
              <div>
                <strong>매도호가</strong>: 판매자가 원하는 가격대별 물량 (Ask)
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-600 dark:text-blue-400 font-bold">📉</span>
              <div>
                <strong>매수호가</strong>: 구매자가 원하는 가격대별 물량 (Bid)
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">⚡</span>
              <div>
                <strong>체결</strong>: 매수호가와 매도호가가 만나는 지점에서 거래 성사
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">시장가 주문 (Market Order)</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• 현재 시장가격으로 즉시 체결</li>
              <li>• 체결 확실성 높음</li>
              <li>• 급한 거래 시 유리</li>
              <li>• 슬리피지 발생 가능</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">지정가 주문 (Limit Order)</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• 원하는 가격 지정 후 대기</li>
              <li>• 가격 통제 가능</li>
              <li>• 체결되지 않을 위험</li>
              <li>• 장기 전략에 적합</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">투자 vs 투기</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">구분</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">투자 (Investment)</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">투기 (Speculation)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-medium">시간 관점</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-emerald-600 dark:text-emerald-400">장기적 (1년+)</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-red-600 dark:text-red-400">단기적 (일~월)</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-medium">의사결정 기준</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-emerald-600 dark:text-emerald-400">기업 가치 분석</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-red-600 dark:text-red-400">가격 변동성</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-medium">위험 수준</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-emerald-600 dark:text-emerald-400">중간 위험</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-red-600 dark:text-red-400">고위험</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-medium">수익 원천</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-emerald-600 dark:text-emerald-400">기업 성장 + 배당</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-red-600 dark:text-red-400">시세 차익</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">주요 시장 지수</h2>
        <div className="grid gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🇰🇷 KOSPI (Korea Composite Stock Price Index)</h3>
            <p className="text-gray-600 dark:text-gray-400">
              한국거래소 유가증권시장의 대표 지수. 시가총액 가중평균 방식으로 계산.
              삼성전자, SK하이닉스 등 대형주의 영향이 큼.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🇺🇸 S&P 500</h3>
            <p className="text-gray-600 dark:text-gray-400">
              미국 주식시장의 대표 지수. 500개 대형주로 구성.
              Apple, Microsoft, Amazon 등 빅테크 기업이 상당 비중 차지.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🇺🇸 NASDAQ Composite</h3>
            <p className="text-gray-600 dark:text-gray-400">
              나스닥 거래소의 모든 종목을 포함한 지수. 기술주 비중이 높아 성장성 지향.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

// Chapter 2: Fundamental Analysis
function FundamentalAnalysisContent() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">재무제표 3요소</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          기업의 재무 상태를 정확히 파악하려면 3가지 핵심 재무제표를 종합적으로 분석해야 합니다.
          각 재무제표는 기업의 다른 측면을 보여줍니다.
        </p>
        
        <div className="grid gap-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">📊 손익계산서 (Income Statement)</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              일정 기간(분기/연간) 동안의 수익과 비용을 나타내는 실적표
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>매출액 (Revenue)</span><span>기업이 벌어들인 총 수익</span></div>
              <div className="flex justify-between"><span>영업이익 (Operating Income)</span><span>본업으로 얻은 순수익</span></div>
              <div className="flex justify-between"><span>당기순이익 (Net Income)</span><span>모든 비용 차감 후 최종 이익</span></div>
            </div>
          </div>
          
          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-6">
            <h3 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-3">🏦 대차대조표 (Balance Sheet)</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              특정 시점의 자산, 부채, 자본 현황을 나타내는 재무상태표
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>자산 (Assets)</span><span>기업이 소유한 모든 경제적 자원</span></div>
              <div className="flex justify-between"><span>부채 (Liabilities)</span><span>기업이 갚아야 할 채무</span></div>
              <div className="flex justify-between"><span>자본 (Equity)</span><span>자산에서 부채를 뺀 순자산</span></div>
            </div>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
            <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-3">💰 현금흐름표 (Cash Flow Statement)</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              실제 현금의 유입과 유출을 보여주는 가장 조작하기 어려운 재무제표
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>영업 현금흐름</span><span>본업 활동으로 벌어들인 현금</span></div>
              <div className="flex justify-between"><span>투자 현금흐름</span><span>투자 활동으로 인한 현금 변화</span></div>
              <div className="flex justify-between"><span>재무 현금흐름</span><span>자금조달 활동으로 인한 현금 변화</span></div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">핵심 투자 지표</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-red-600 dark:text-red-400 mb-3">PER (Price-to-Earnings Ratio)</h3>
            <div className="text-2xl font-mono font-bold mb-2">주가 ÷ 주당순이익</div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
              현재 주가가 1주당 순이익의 몇 배인지를 나타내는 가장 기본적인 밸류에이션 지표
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 rounded p-3 text-sm">
              <strong>해석</strong>: PER 15배 → 현재 수익률로 15년간 벌어야 투자원금 회수
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-red-600 dark:text-red-400 mb-3">PBR (Price-to-Book Ratio)</h3>
            <div className="text-2xl font-mono font-bold mb-2">주가 ÷ 주당순자산</div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
              현재 주가가 1주당 순자산(장부가치)의 몇 배인지를 나타내는 청산가치 기준 지표
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 rounded p-3 text-sm">
              <strong>해석</strong>: PBR 1배 미만 → 장부상 자산가치보다 저평가
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-red-600 dark:text-red-400 mb-3">ROE (Return on Equity)</h3>
            <div className="text-2xl font-mono font-bold mb-2">당기순이익 ÷ 자본총계 × 100</div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
              기업이 자본을 얼마나 효율적으로 활용하여 이익을 창출하는지를 나타내는 수익성 지표
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 rounded p-3 text-sm">
              <strong>우수기준</strong>: 15% 이상 시 양호, 20% 이상 시 우수
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-red-600 dark:text-red-400 mb-3">ROIC (Return on Invested Capital)</h3>
            <div className="text-2xl font-mono text-xs font-bold mb-2">영업이익×(1-세율) ÷ 투하자본</div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
              기업이 투자한 모든 자본(차입금 포함)을 얼마나 효율적으로 활용하는지를 측정
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 rounded p-3 text-sm">
              <strong>투자판단</strong>: ROIC {'>'} WACC 인 기업이 가치창조
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Chapter 3: Technical Analysis  
function TechnicalAnalysisContent() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">기술적 분석의 3대 가정</h2>
        <div className="grid gap-4 mb-6">
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
            <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">1. 시장은 모든 것을 반영한다</h3>
            <p className="text-gray-700 dark:text-gray-300">
              주가에는 이미 모든 정보(기업 실적, 경제 상황, 투자심리 등)가 반영되어 있다.
            </p>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6">
            <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">2. 가격은 추세를 따라 움직인다</h3>
            <p className="text-gray-700 dark:text-gray-300">
              주가는 무작위로 움직이지 않고 일정한 패턴과 추세를 보인다.
            </p>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6">
            <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">3. 역사는 반복된다</h3>
            <p className="text-gray-700 dark:text-gray-300">
              과거의 패턴은 미래에도 반복될 가능성이 높다.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">캔들스틱 패턴</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          캔들스틱 차트는 일정 기간의 시가, 고가, 저가, 종가 정보를 하나의 캔들로 표현합니다.
          캔들의 모양과 조합으로 시장 심리와 향후 방향을 예측할 수 있습니다.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-emerald-600 dark:text-emerald-400 mb-3">🟢 강세 반전 패턴</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
              <li><strong>해머:</strong> 하락 후 나타나는 긴 아래꼬리</li>
              <li><strong>불룩한 바닥:</strong> 연속된 두 개의 상승 캔들</li>
              <li><strong>조조별:</strong> 갭 하락 후 상승 마감</li>
              <li><strong>역망치:</strong> 긴 위꼬리를 가진 작은 몸통</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-red-600 dark:text-red-400 mb-3">🔴 약세 반전 패턴</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
              <li><strong>교수형:</strong> 상승 후 나타나는 긴 아래꼬리</li>
              <li><strong>먹구름:</strong> 연속된 두 개의 하락 캔들</li>
              <li><strong>저녁별:</strong> 갭 상승 후 하락 마감</li>
              <li><strong>유성:</strong> 긴 위꼬리를 가진 작은 몸통</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">주요 기술적 지표</h2>
        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">📈 이동평균선 (Moving Average)</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              일정 기간의 주가를 평균내어 추세를 파악하는 가장 기본적인 지표
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong>단기 이평선 (5일, 20일)</strong><br/>
                <span className="text-gray-600 dark:text-gray-400">단기 추세와 지지/저항</span>
              </div>
              <div>
                <strong>중기 이평선 (60일, 120일)</strong><br/>
                <span className="text-gray-600 dark:text-gray-400">중기 추세 판단</span>
              </div>
              <div>
                <strong>장기 이평선 (200일, 300일)</strong><br/>
                <span className="text-gray-600 dark:text-gray-400">장기 추세와 강력한 지지/저항</span>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
            <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-3">⚡ RSI (Relative Strength Index)</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              0~100 사이 값으로 과매수/과매도 상태를 판단하는 모멘텀 오실레이터
            </p>
            <div className="flex items-center justify-between text-sm">
              <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-3 py-1 rounded">
                과매도 (30 이하)
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                적정 구간 (30-70)
              </span>
              <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-3 py-1 rounded">
                과매수 (70 이상)
              </span>
            </div>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-6">
            <h3 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-3">🌊 MACD (Moving Average Convergence Divergence)</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              단기 이평선과 장기 이평선의 차이로 추세 변화를 포착하는 지표
            </p>
            <div className="space-y-2 text-sm">
              <div><strong>MACD 선:</strong> 12일 지수이평 - 26일 지수이평</div>
              <div><strong>시그널 선:</strong> MACD의 9일 지수이평</div>
              <div><strong>매매 신호:</strong> MACD가 시그널 선을 상향/하향 돌파</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">지지선과 저항선</h2>
        <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10 rounded-xl p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-red-800 dark:text-red-200 mb-3">📈 지지선 (Support Line)</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                주가 하락을 막아주는 가격대. 매수세가 강해지는 구간
              </p>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>• 과거 저점들을 연결한 선</li>
                <li>• 심리적 가격대 (1만원, 5만원 등)</li>
                <li>• 주요 이동평균선</li>
                <li>• 돌파 시 추가 하락 가능성</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-red-800 dark:text-red-200 mb-3">📉 저항선 (Resistance Line)</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                주가 상승을 막는 가격대. 매도세가 강해지는 구간
              </p>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>• 과거 고점들을 연결한 선</li>
                <li>• 심리적 저항 가격대</li>
                <li>• 기술적 지표의 과매수 구간</li>
                <li>• 돌파 시 추가 상승 가능성</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">💡 실전 매매 전략</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong className="text-emerald-600 dark:text-emerald-400">매수 타이밍</strong>
                <ul className="mt-1 space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• 지지선 근처에서 반등 확인</li>
                  <li>• 저항선 돌파 후 재테스트</li>
                  <li>• 거래량 증가와 함께 신호 확인</li>
                </ul>
              </div>
              <div>
                <strong className="text-red-600 dark:text-red-400">매도 타이밍</strong>
                <ul className="mt-1 space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• 저항선 근처에서 상승 둔화</li>
                  <li>• 지지선 하향 돌파</li>
                  <li>• 거래량 감소와 함께 약세 확인</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Chapter 4: Portfolio Management
function PortfolioManagementContent() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">현대 포트폴리오 이론 (MPT)</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          해리 마코위츠가 개발한 MPT는 동일한 위험 수준에서 최대 수익을, 
          또는 동일한 수익 수준에서 최소 위험을 추구하는 최적 포트폴리오 구성 이론입니다.
        </p>
        
        <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-red-800 dark:text-red-200 mb-4">MPT의 핵심 개념</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-red-600 dark:text-red-400 font-bold">📊</span>
              <div>
                <strong>분산투자</strong>: 서로 다른 자산에 투자하여 위험 분산
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-red-600 dark:text-red-400 font-bold">📈</span>
              <div>
                <strong>효율적 프론티어</strong>: 각 위험 수준에서 최대 수익을 제공하는 포트폴리오들의 집합
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-red-600 dark:text-red-400 font-bold">⚖️</span>
              <div>
                <strong>위험-수익 트레이드오프</strong>: 높은 수익을 위해서는 높은 위험을 감수해야 함
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">포트폴리오 수익률</h3>
            <div className="text-lg font-mono font-bold mb-2 text-center">
              R(p) = Σ w(i) × R(i)
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              각 자산의 가중평균으로 계산. w(i)는 자산 i의 비중, R(i)는 자산 i의 수익률
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">포트폴리오 위험</h3>
            <div className="text-lg font-mono font-bold mb-2 text-center">
              σ(p) = √(Σ w(i)² × σ(i)² + 2Σ w(i)w(j)σ(ij))
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              개별 자산의 위험과 상관관계를 고려한 포트폴리오 전체의 위험
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">상관계수와 분산효과</h2>
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            상관계수는 두 자산의 가격 움직임이 얼마나 유사한지를 나타내는 지표입니다.
            -1과 +1 사이의 값을 가지며, 분산투자 효과는 상관계수가 낮을수록 커집니다.
          </p>
          
          <div className="grid gap-4">
            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-6">
              <h3 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-2">
                완전 음의 상관관계 (ρ = -1)
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                한 자산이 오를 때 다른 자산은 정확히 반대로 움직임. 
                이론적으로 위험을 완전히 제거할 수 있으나 현실에서는 거의 존재하지 않음.
              </p>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6">
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                무상관 (ρ = 0)
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                두 자산의 움직임이 독립적. 
                분산투자 효과가 가장 명확하게 나타나는 이상적인 경우.
              </p>
            </div>
            
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
              <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                완전 양의 상관관계 (ρ = +1)
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                두 자산이 완전히 동일하게 움직임. 
                분산투자 효과가 전혀 없어 위험 감소 불가능.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">자산 배분 전략</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-3">전략적 자산 배분 (SAA)</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
              장기적 관점에서 투자 목표와 위험 성향에 따라 자산군별 비중을 결정
            </p>
            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>• 투자자의 나이, 투자기간 고려</li>
              <li>• 주식 : 채권 = (100-나이) : 나이</li>
              <li>• 정기적 리밸런싱으로 비중 유지</li>
              <li>• 장기적 안정성 추구</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-purple-600 dark:text-purple-400 mb-3">전술적 자산 배분 (TAA)</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
              시장 상황과 경제 전망에 따라 단기적으로 자산 비중을 조정
            </p>
            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>• 시장 사이클과 밸류에이션 고려</li>
              <li>• 경기 국면별 자산 비중 조정</li>
              <li>• 능동적 관리로 초과 수익 추구</li>
              <li>• 더 높은 거래 비용과 위험</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">리밸런싱 전략</h2>
        <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10 rounded-xl p-6">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            시간이 지나면서 자산별 성과 차이로 인해 목표 비중에서 벗어나게 됩니다.
            정기적인 리밸런싱을 통해 목표 비중을 유지하는 것이 중요합니다.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">📅 시간 기준</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                분기별, 반기별, 연 1회 등 정해진 주기마다 리밸런싱
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">📊 비중 기준</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                목표 비중에서 ±5% 이상 벗어날 때 리밸런싱
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">🔄 혼합 기준</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                시간과 비중 기준을 함께 고려하는 방식
              </p>
            </div>
          </div>
          
          <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">💡 리밸런싱의 효과</h4>
            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>• 고평가된 자산은 매도, 저평가된 자산은 매수 (Buy Low, Sell High)</li>
              <li>• 장기적으로 변동성 감소와 수익률 향상 효과</li>
              <li>• 감정적 판단을 배제한 기계적 거래</li>
              <li>• 거래 비용과 세금 비용 고려 필요</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

// Chapter 5: AI & Quant Investing
function AIQuantInvestingContent() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">퀀트 투자의 진화</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          퀀트 투자는 수학적, 통계적 모델을 사용하여 투자 결정을 내리는 방법론입니다.
          최근 AI와 머신러닝 기술의 발전으로 더욱 정교한 전략이 가능해졌습니다.
        </p>
        
        <div className="grid gap-4 mb-6">
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
            <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">1세대: 통계적 모델</h3>
            <p className="text-gray-700 dark:text-gray-300">
              회귀분석, 팩터 모델 등 전통적 통계 기법을 활용한 체계적 투자
            </p>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6">
            <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">2세대: 머신러닝</h3>
            <p className="text-gray-700 dark:text-gray-300">
              랜덤포레스트, SVM, XGBoost 등을 활용한 비선형 패턴 발굴
            </p>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6">
            <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">3세대: 딥러닝 & AI</h3>
            <p className="text-gray-700 dark:text-gray-300">
              CNN, LSTM, Transformer 등을 활용한 복잡한 패턴 인식과 예측
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">머신러닝을 이용한 주가 예측</h2>
        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">🧠 LSTM (Long Short-Term Memory)</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              시계열 데이터의 장기 의존성을 학습할 수 있는 순환 신경망의 한 종류
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">장점</h4>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li>• 장기간의 패턴 학습 가능</li>
                  <li>• 시계열 데이터에 특화</li>
                  <li>• 기울기 소실 문제 해결</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">활용 사례</h4>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li>• 주가 방향성 예측</li>
                  <li>• 변동성 예측</li>
                  <li>• 거래량 패턴 분석</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
            <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-3">🔄 Transformer for Finance</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              어텐션 메커니즘을 활용하여 다양한 시점의 정보를 종합적으로 분석
            </p>
            <div className="space-y-2 text-sm">
              <div><strong>Time Series Transformer:</strong> 과거 가격 패턴의 어텐션 가중치 학습</div>
              <div><strong>Multi-Modal Transformer:</strong> 가격, 뉴스, 거래량 등 다중 정보 통합</div>
              <div><strong>Cross-Asset Attention:</strong> 다른 자산 간의 상관관계 학습</div>
            </div>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-6">
            <h3 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-3">📊 앙상블 모델링</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              여러 모델의 예측을 결합하여 더 안정적이고 정확한 예측 달성
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong>Voting:</strong><br/>
                <span className="text-gray-600 dark:text-gray-400">다수결 원리</span>
              </div>
              <div>
                <strong>Weighted Average:</strong><br/>
                <span className="text-gray-600 dark:text-gray-400">성과 기반 가중평균</span>
              </div>
              <div>
                <strong>Stacking:</strong><br/>
                <span className="text-gray-600 dark:text-gray-400">메타모델 학습</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">뉴스와 소셜미디어 감정 분석</h2>
        <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-red-800 dark:text-red-200 mb-4">NLP 기반 감정 분석</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            뉴스 기사, 소셜미디어, 애널리스트 리포트 등 텍스트 데이터에서 시장 감정을 추출하여 
            투자 신호로 활용하는 기법입니다.
          </p>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded text-sm font-medium">
                Step 1
              </span>
              <div>
                <strong>데이터 수집</strong>: 뉴스 API, 트위터 API, Reddit 등에서 실시간 텍스트 수집
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded text-sm font-medium">
                Step 2
              </span>
              <div>
                <strong>전처리</strong>: 불용어 제거, 정규화, 토큰화 등 텍스트 정제
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded text-sm font-medium">
                Step 3
              </span>
              <div>
                <strong>감정 분석</strong>: BERT, FinBERT 등을 활용한 감정 점수 계산
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded text-sm font-medium">
                Step 4
              </span>
              <div>
                <strong>투자 신호</strong>: 감정 점수를 기술적/기본적 지표와 결합하여 매매 신호 생성
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">📰 뉴스 감정 분석</h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• 실적 발표, 공시 내용 분석</li>
              <li>• 애널리스트 리포트 감정 추출</li>
              <li>• 경제 뉴스의 시장 영향도 측정</li>
              <li>• CEO 발언, 컨퍼런스콜 분석</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">📱 소셜미디어 분석</h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• 트위터, 레딧의 종목 관련 언급</li>
              <li>• 밈주식 현상 조기 감지</li>
              <li>• 인플루언서 의견의 영향력 측정</li>
              <li>• 소매투자자 심리 파악</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">대체 데이터 활용</h2>
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            전통적인 재무 데이터 외에 다양한 대체 데이터를 활용하여 
            경쟁 우위를 확보하는 것이 현대 퀀트 투자의 핵심입니다.
          </p>
          
          <div className="grid gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">🛰️ 위성 이미지 데이터</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                위성에서 촬영한 이미지를 분석하여 경제 활동 지표를 추출
              </p>
              <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                <li>• 쇼핑몰, 공장 주차장의 차량 수 변화</li>
                <li>• 유전, 항구의 활동량 모니터링</li>
                <li>• 농작물 수확량 예측</li>
                <li>• 도시 개발, 건설 현황 파악</li>
              </ul>
            </div>
            
            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-6">
              <h3 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-2">💳 신용카드 데이터</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                익명화된 소비 패턴 데이터로 기업 실적을 선행 예측
              </p>
              <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                <li>• 소매업체별 매출 추이 추적</li>
                <li>• 업종별 소비 트렌드 파악</li>
                <li>• 지역별 경제 활동 측정</li>
                <li>• 계절성, 이벤트 영향 분석</li>
              </ul>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
              <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">📊 웹 스크래핑 데이터</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                온라인에서 수집 가능한 모든 데이터를 투자 신호로 변환
              </p>
              <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                <li>• 구인구직 사이트의 채용 공고 수</li>
                <li>• 부동산 사이트의 매물 정보</li>
                <li>• 앱스토어 다운로드 순위</li>
                <li>• 검색 키워드 트렌드</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">백테스팅과 성과 평가</h2>
        <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10 rounded-xl p-6">
          <h3 className="font-semibold text-red-800 dark:text-red-200 mb-4">견고한 백테스팅 프레임워크</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            AI 투자 전략의 실효성을 검증하기 위해서는 과거 데이터를 활용한 
            체계적이고 엄격한 백테스팅 과정이 필수입니다.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">⚠️ 백테스팅 함정들</h4>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li><strong>Look-ahead Bias:</strong> 미래 정보를 과거에 사용</li>
                <li><strong>Survivorship Bias:</strong> 상장폐지된 종목 제외</li>
                <li><strong>Data Snooping:</strong> 과도한 최적화로 인한 과적합</li>
                <li><strong>Transaction Cost:</strong> 수수료, 슬리피지 미반영</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">✅ 올바른 백테스팅</h4>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li><strong>Walk-Forward Analysis:</strong> 점진적 학습과 검증</li>
                <li><strong>Out-of-Sample Test:</strong> 별도 검증 데이터셋 활용</li>
                <li><strong>Cross-Validation:</strong> 시계열 교차검증</li>
                <li><strong>Monte Carlo:</strong> 다양한 시나리오 시뮬레이션</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">성과 지표</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">공식</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">해석</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-medium">Sharpe Ratio</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-xs">(수익률 - 무위험수익률) / 변동성</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-xs">위험 대비 수익률. 1 이상이면 양호</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-medium">Maximum Drawdown</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-xs">최고점 대비 최대 하락률</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-xs">심리적 견딜 수 있는 손실 수준</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-medium">Calmar Ratio</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-xs">연간 수익률 / MDD</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-xs">하락 위험 대비 수익률</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-medium">Information Ratio</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-xs">초과수익률 / 추적오차</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-xs">벤치마크 대비 일관된 초과 성과</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

// Coming Soon
function ComingSoonContent() {
  return (
    <div className="text-center py-16">
      <div className="text-6xl mb-4">🚧</div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        콘텐츠 준비 중
      </h2>
      <p className="text-gray-600 dark:text-gray-400">
        이 챕터의 콘텐츠는 곧 업데이트될 예정입니다.
      </p>
    </div>
  )
}