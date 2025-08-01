'use client'

import { useState } from 'react'
import { Calculator, TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface FinancialData {
  stockPrice: number
  eps: number
  bps: number
  roe: number
  revenue: number
  operatingIncome: number
  netIncome: number
  totalAssets: number
  totalDebt: number
  equity: number
}

interface AnalysisResult {
  per: number
  pbr: number
  roic: number
  debtRatio: number
  operatingMargin: number
  netMargin: number
  recommendation: 'buy' | 'hold' | 'sell'
  score: number
}

export default function FinancialAnalyzer() {
  const [financialData, setFinancialData] = useState<FinancialData>({
    stockPrice: 0,
    eps: 0,
    bps: 0,
    roe: 0,
    revenue: 0,
    operatingIncome: 0,
    netIncome: 0,
    totalAssets: 0,
    totalDebt: 0,
    equity: 0
  })

  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)

  const handleInputChange = (field: keyof FinancialData, value: string) => {
    setFinancialData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }))
  }

  const calculateAnalysis = (): AnalysisResult => {
    const per = financialData.stockPrice / financialData.eps
    const pbr = financialData.stockPrice / financialData.bps
    const roic = (financialData.operatingIncome * 0.75) / (financialData.totalDebt + financialData.equity) * 100
    const debtRatio = (financialData.totalDebt / financialData.totalAssets) * 100
    const operatingMargin = (financialData.operatingIncome / financialData.revenue) * 100
    const netMargin = (financialData.netIncome / financialData.revenue) * 100

    // 투자 점수 계산 (100점 만점)
    let score = 50 // 기본 점수

    // PER 평가 (20점)
    if (per < 10) score += 20
    else if (per < 15) score += 15
    else if (per < 20) score += 10
    else if (per < 25) score += 5
    else score -= 10

    // PBR 평가 (15점)
    if (pbr < 1) score += 15
    else if (pbr < 1.5) score += 10
    else if (pbr < 2) score += 5
    else score -= 5

    // ROE 평가 (20점)
    if (financialData.roe > 20) score += 20
    else if (financialData.roe > 15) score += 15
    else if (financialData.roe > 10) score += 10
    else if (financialData.roe > 5) score += 5
    else score -= 10

    // 영업이익률 평가 (15점)
    if (operatingMargin > 20) score += 15
    else if (operatingMargin > 15) score += 12
    else if (operatingMargin > 10) score += 8
    else if (operatingMargin > 5) score += 4
    else score -= 5

    // 부채비율 평가 (10점)
    if (debtRatio < 30) score += 10
    else if (debtRatio < 50) score += 5
    else if (debtRatio < 70) score += 0
    else score -= 10

    score = Math.max(0, Math.min(100, score))

    let recommendation: 'buy' | 'hold' | 'sell'
    if (score >= 70) recommendation = 'buy'
    else if (score >= 50) recommendation = 'hold'
    else recommendation = 'sell'

    return {
      per,
      pbr,
      roic,
      debtRatio,
      operatingMargin,
      netMargin,
      recommendation,
      score
    }
  }

  const runAnalysis = () => {
    const result = calculateAnalysis()
    setAnalysis(result)
  }

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'buy': return 'text-emerald-600 dark:text-emerald-400'
      case 'hold': return 'text-yellow-600 dark:text-yellow-400'
      case 'sell': return 'text-red-600 dark:text-red-400'
      default: return 'text-gray-600 dark:text-gray-400'
    }
  }

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case 'buy': return <TrendingUp className="w-5 h-5" />
      case 'hold': return <Minus className="w-5 h-5" />
      case 'sell': return <TrendingDown className="w-5 h-5" />
      default: return null
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="w-6 h-6 text-red-600 dark:text-red-400" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">재무제표 분석기</h3>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            주가 (원)
          </label>
          <input
            type="number"
            value={financialData.stockPrice || ''}
            onChange={(e) => handleInputChange('stockPrice', e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="50000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            주당순이익 (EPS)
          </label>
          <input
            type="number"
            value={financialData.eps || ''}
            onChange={(e) => handleInputChange('eps', e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="3000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            주당순자산 (BPS)
          </label>
          <input
            type="number"
            value={financialData.bps || ''}
            onChange={(e) => handleInputChange('bps', e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="25000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            ROE (%)
          </label>
          <input
            type="number"
            value={financialData.roe || ''}
            onChange={(e) => handleInputChange('roe', e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="15"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            매출액 (억원)
          </label>
          <input
            type="number"
            value={financialData.revenue || ''}
            onChange={(e) => handleInputChange('revenue', e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="10000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            영업이익 (억원)
          </label>
          <input
            type="number"
            value={financialData.operatingIncome || ''}
            onChange={(e) => handleInputChange('operatingIncome', e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="1500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            순이익 (억원)
          </label>
          <input
            type="number"
            value={financialData.netIncome || ''}
            onChange={(e) => handleInputChange('netIncome', e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="1200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            총자산 (억원)
          </label>
          <input
            type="number"
            value={financialData.totalAssets || ''}
            onChange={(e) => handleInputChange('totalAssets', e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="20000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            총부채 (억원)
          </label>
          <input
            type="number"
            value={financialData.totalDebt || ''}
            onChange={(e) => handleInputChange('totalDebt', e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="8000"
          />
        </div>
      </div>

      <button
        onClick={runAnalysis}
        className="w-full px-4 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors mb-6"
      >
        재무분석 실행
      </button>

      {analysis && (
        <div className="space-y-6">
          {/* 주요 지표 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">PER</h4>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {analysis.per.toFixed(1)}배
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {analysis.per < 15 ? '저평가' : analysis.per > 25 ? '고평가' : '적정'}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">PBR</h4>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {analysis.pbr.toFixed(1)}배
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {analysis.pbr < 1 ? '저평가' : analysis.pbr > 2 ? '고평가' : '적정'}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">ROE</h4>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {financialData.roe.toFixed(1)}%
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {financialData.roe > 15 ? '우수' : financialData.roe > 10 ? '양호' : '개선필요'}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">영업이익률</h4>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {analysis.operatingMargin.toFixed(1)}%
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {analysis.operatingMargin > 15 ? '우수' : analysis.operatingMargin > 10 ? '양호' : '보통'}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">부채비율</h4>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {analysis.debtRatio.toFixed(1)}%
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {analysis.debtRatio < 50 ? '안전' : analysis.debtRatio < 70 ? '보통' : '위험'}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">순이익률</h4>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {analysis.netMargin.toFixed(1)}%
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {analysis.netMargin > 10 ? '우수' : analysis.netMargin > 5 ? '양호' : '보통'}
              </p>
            </div>
          </div>

          {/* 종합 평가 */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">종합 투자 평가</h4>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                {analysis.score}점
              </div>
              <div className={`flex items-center gap-2 text-lg font-semibold ${getRecommendationColor(analysis.recommendation)}`}>
                {getRecommendationIcon(analysis.recommendation)}
                <span className="uppercase">{analysis.recommendation}</span>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 dark:text-white mb-2">투자 의견</h5>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {analysis.recommendation === 'buy' && 
                  '재무 지표가 양호하여 투자를 권장합니다. 특히 밸류에이션과 수익성 지표가 우수합니다.'}
                {analysis.recommendation === 'hold' && 
                  '현재 수준에서 보유를 권장합니다. 일부 지표는 양호하나 전반적으로 중간 수준입니다.'}
                {analysis.recommendation === 'sell' && 
                  '재무 지표가 부진하여 신중한 검토가 필요합니다. 투자 전 추가 분석을 권장합니다.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}