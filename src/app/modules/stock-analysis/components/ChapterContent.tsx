'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { 
  TrendingUp, 
  Calculator, 
  BarChart3, 
  Target, 
  Brain,
  DollarSign,
  PieChart,
  Activity,
  Lightbulb,
  AlertCircle,
  CheckCircle,
  BookOpen
} from 'lucide-react'

// Note: Dynamic imports will be added when actual simulator components are created

interface ChapterContentProps {
  chapterId: string
}

export default function ChapterContent({ chapterId }: ChapterContentProps) {
  const renderChapterContent = () => {
    switch (chapterId) {
      case 'foundation':
        return <FoundationChapter />
      case 'fundamental-analysis':
        return <FundamentalAnalysisChapter />
      case 'technical-analysis':
        return <TechnicalAnalysisChapter />
      case 'portfolio-management':
        return <PortfolioManagementChapter />
      case 'ai-quant-investing':
        return <AIQuantInvestingChapter />
      default:
        return <div>Content not found</div>
    }
  }

  return (
    <div className="prose prose-lg max-w-none dark:prose-invert">
      {renderChapterContent()}
    </div>
  )
}

// Foundation Chapter: 금융시장의 이해
function FoundationChapter() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6" />
          주식시장의 구조와 원리
        </h2>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 mb-6">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            주식시장은 기업이 자금을 조달하고 투자자가 기업의 소유권을 거래하는 장소입니다.
            효율적인 시장에서는 모든 정보가 주가에 반영된다는 것이 기본 전제입니다.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">발행시장</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">기업이 새로운 주식을 발행하여 자금을 조달하는 시장</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">유통시장</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">이미 발행된 주식이 거래되는 시장</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">장외시장</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">거래소를 통하지 않고 직접 거래하는 시장</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">주요 시장 참여자</h3>
        <div className="space-y-4">
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-semibold text-gray-900 dark:text-white">개인투자자</h4>
            <p className="text-gray-600 dark:text-gray-400">
              개별 투자자들로, 시장의 가장 기본적인 참여자
            </p>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-semibold text-gray-900 dark:text-white">기관투자자</h4>
            <p className="text-gray-600 dark:text-gray-400">
              연기금, 보험사, 자산운용사 등 대규모 자금을 운용하는 전문기관
            </p>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-semibold text-gray-900 dark:text-white">외국인투자자</h4>
            <p className="text-gray-600 dark:text-gray-400">
              해외 자본으로 국내 주식시장에 참여하는 투자자
            </p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">거래 시스템과 주문 유형</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">주문 유형</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">설명</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">특징</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">시장가 주문</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">현재 시장 가격으로 즉시 거래</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">빠른 체결, 가격 변동 위험</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">지정가 주문</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">특정 가격을 지정하여 주문</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">가격 보장, 체결 불확실성</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">조건부 주문</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">특정 조건 달성 시 주문 발동</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">자동화, 리스크 관리</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2 flex items-center gap-2">
            <Lightbulb size={20} />
            투자 vs 투기
          </h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-semibold text-green-700 dark:text-green-300 mb-2">투자 (Investment)</h5>
              <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>• 기업의 내재가치 분석 기반</li>
                <li>• 장기적 관점에서 접근</li>
                <li>• 위험 관리와 분산투자</li>
                <li>• 체계적인 전략과 계획</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-red-700 dark:text-red-300 mb-2">투기 (Speculation)</h5>
              <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>• 단기적 가격 변동에 의존</li>
                <li>• 높은 수익률 추구</li>
                <li>• 과도한 레버리지 사용</li>
                <li>• 감정적 판단에 의존</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Fundamental Analysis Chapter
function FundamentalAnalysisChapter() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-4 flex items-center gap-2">
          <Calculator className="w-6 h-6" />
          재무제표의 이해와 분석
        </h2>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 mb-6">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            기본적 분석은 기업의 재무상태와 성장성을 분석하여 주식의 내재가치를 평가하는 방법입니다.
          </p>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">재무제표 3요소</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
            <h4 className="font-semibold text-green-600 dark:text-green-400 mb-3">손익계산서</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              특정 기간 동안의 수익과 비용을 나타내는 재무제표
            </p>
            <ul className="text-xs text-gray-500 dark:text-gray-500 space-y-1">
              <li>• 매출액 (Revenue)</li>
              <li>• 영업이익 (Operating Income)</li>
              <li>• 순이익 (Net Income)</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
            <h4 className="font-semibold text-green-600 dark:text-green-400 mb-3">대차대조표</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              특정 시점의 자산, 부채, 자본 상태를 나타내는 재무제표
            </p>
            <ul className="text-xs text-gray-500 dark:text-gray-500 space-y-1">
              <li>• 자산 (Assets)</li>
              <li>• 부채 (Liabilities)</li>
              <li>• 자본 (Equity)</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
            <h4 className="font-semibold text-green-600 dark:text-green-400 mb-3">현금흐름표</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              현금의 유입과 유출을 활동별로 구분하여 나타내는 재무제표
            </p>
            <ul className="text-xs text-gray-500 dark:text-gray-500 space-y-1">
              <li>• 영업 현금흐름</li>
              <li>• 투자 현금흐름</li>
              <li>• 재무 현금흐름</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">주요 투자지표</h3>
        <FinancialCalculator />
      </section>
    </div>
  )
}

// Technical Analysis Chapter  
function TechnicalAnalysisChapter() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-4 flex items-center gap-2">
          <BarChart3 className="w-6 h-6" />
          차트 분석과 기술적 지표
        </h2>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 mb-6">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            기술적 분석은 과거 주가와 거래량 데이터를 분석하여 미래 주가 방향을 예측하는 방법입니다.
          </p>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">차트 패턴 분석기</h3>
        <ChartAnalyzer />
      </section>
    </div>
  )
}

// Portfolio Management Chapter
function PortfolioManagementChapter() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-4 flex items-center gap-2">
          <PieChart className="w-6 h-6" />
          포트폴리오 이론과 자산배분
        </h2>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 mb-6">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            현대 포트폴리오 이론(MPT)을 기반으로 한 효율적인 자산배분 전략을 학습합니다.
          </p>
        </div>
      </section>

      <section>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-4 flex items-center gap-2">
            <AlertCircle size={20} />
            분산투자의 원칙
          </h4>
          <div className="space-y-3 text-gray-700 dark:text-gray-300">
            <div>• <strong>상관계수 고려</strong>: 서로 다른 움직임을 보이는 자산 조합</div>
            <div>• <strong>지역 분산</strong>: 국내외 시장에 분산 투자</div>
            <div>• <strong>섹터 분산</strong>: 다양한 산업군에 투자</div>
            <div>• <strong>시간 분산</strong>: 시기를 나누어 투자 (달러 코스트 애버리징)</div>
          </div>
        </div>
      </section>
    </div>
  )
}

// AI & Quant Investing Chapter
function AIQuantInvestingChapter() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-4 flex items-center gap-2">
          <Brain className="w-6 h-6" />
          AI와 빅데이터를 활용한 투자
        </h2>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 mb-6">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            머신러닝과 인공지능 기술을 활용한 현대적 투자 전략과 퀀트 투자를 학습합니다.
          </p>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">퀀트 투자의 장단점</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              장점
            </h4>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• 객관적이고 체계적인 투자 접근</li>
              <li>• 감정적 판단 배제</li>
              <li>• 대량 데이터 처리 가능</li>
              <li>• 백테스팅을 통한 전략 검증</li>
            </ul>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
            <h4 className="font-semibold text-red-800 dark:text-red-200 mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              단점
            </h4>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• 과적합(Overfitting) 위험</li>
              <li>• 시장 구조 변화에 취약</li>
              <li>• 높은 초기 구축 비용</li>
              <li>• 블랙박스 문제</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

// Placeholder simulator components
function FinancialCalculator() {
  const [per, setPer] = useState('')
  const [pbr, setPbr] = useState('')
  const [roe, setRoe] = useState('')

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <h4 className="font-semibold text-gray-900 dark:text-white mb-4">투자지표 계산기</h4>
      <div className="grid md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            PER (주가수익비율)
          </label>
          <input
            type="number"
            value={per}
            onChange={(e) => setPer(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="예: 15.5"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            PBR (주가순자산비율)
          </label>
          <input
            type="number"
            value={pbr}
            onChange={(e) => setPbr(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="예: 1.2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            ROE (자기자본이익률)
          </label>
          <input
            type="number"
            value={roe}
            onChange={(e) => setRoe(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="예: 12.5"
          />
        </div>
      </div>
      
      {(per || pbr || roe) && (
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <h5 className="font-semibold text-green-800 dark:text-green-200 mb-2">분석 결과</h5>
          <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
            {per && <div>PER {per}: {parseFloat(per) < 15 ? '저평가' : parseFloat(per) > 25 ? '고평가' : '적정 수준'}</div>}
            {pbr && <div>PBR {pbr}: {parseFloat(pbr) < 1 ? '저평가' : parseFloat(pbr) > 2 ? '고평가' : '적정 수준'}</div>}
            {roe && <div>ROE {roe}%: {parseFloat(roe) > 15 ? '우수' : parseFloat(roe) > 10 ? '양호' : '개선 필요'}</div>}
          </div>
        </div>
      )}
    </div>
  )
}

function ChartAnalyzer() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <h4 className="font-semibold text-gray-900 dark:text-white mb-4">차트 패턴 분석</h4>
      <div className="bg-gray-50 dark:bg-gray-900 h-64 rounded-lg flex items-center justify-center">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <BarChart3 className="w-12 h-12 mx-auto mb-2" />
          <p>차트 분석 도구 (개발 예정)</p>
          <p className="text-sm">실시간 차트 데이터와 패턴 인식 기능</p>
        </div>
      </div>
    </div>
  )
}