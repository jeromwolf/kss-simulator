'use client'

import { useState, useEffect } from 'react'
import { PieChart, Target, TrendingUp, Shield, AlertTriangle } from 'lucide-react'

interface Asset {
  symbol: string
  name: string
  expectedReturn: number
  volatility: number
  price: number
  allocation: number
}

interface PortfolioMetrics {
  expectedReturn: number
  volatility: number
  sharpeRatio: number
  beta: number
  maxDrawdown: number
  var95: number
}

interface OptimizationResult {
  assets: Asset[]
  metrics: PortfolioMetrics
  recommendation: string
  riskLevel: 'conservative' | 'moderate' | 'aggressive'
}

export default function PortfolioOptimizer() {
  const [portfolio, setPortfolio] = useState<Asset[]>([
    { symbol: 'KOSPI', name: '국내 대형주', expectedReturn: 8.5, volatility: 18.2, price: 100, allocation: 30 },
    { symbol: 'KOSDAQ', name: '국내 중소형주', expectedReturn: 12.1, volatility: 24.7, price: 100, allocation: 20 },
    { symbol: 'S&P500', name: '미국 주식', expectedReturn: 10.2, volatility: 16.8, price: 100, allocation: 25 },
    { symbol: 'BOND', name: '채권', expectedReturn: 4.2, volatility: 4.1, price: 100, allocation: 15 },
    { symbol: 'REIT', name: '리츠', expectedReturn: 7.8, volatility: 20.3, price: 100, allocation: 10 }
  ])

  const [totalInvestment, setTotalInvestment] = useState(10000000) // 1천만원
  const [riskTolerance, setRiskTolerance] = useState<'conservative' | 'moderate' | 'aggressive'>('moderate')
  const [optimizationResult, setOptimizationResult] = useState<OptimizationResult | null>(null)
  const [isOptimizing, setIsOptimizing] = useState(false)

  // 포트폴리오 메트릭 계산
  const calculatePortfolioMetrics = (assets: Asset[]): PortfolioMetrics => {
    const totalAllocation = assets.reduce((sum, asset) => sum + asset.allocation, 0)
    
    // 정규화된 가중치
    const weights = assets.map(asset => asset.allocation / totalAllocation)
    
    // 기대수익률 (가중평균)
    const expectedReturn = assets.reduce((sum, asset, index) => 
      sum + asset.expectedReturn * weights[index], 0
    )
    
    // 단순화된 포트폴리오 변동성 계산 (상관계수 고려하지 않음)
    const volatility = Math.sqrt(
      assets.reduce((sum, asset, index) => 
        sum + Math.pow(asset.volatility * weights[index], 2), 0
      )
    )
    
    // 샤프 비율 (무위험 수익률 3% 가정)
    const riskFreeRate = 3.0
    const sharpeRatio = (expectedReturn - riskFreeRate) / volatility
    
    // 시장 베타 (단순화)
    const marketWeight = weights[0] + weights[1] // 국내 주식 비중
    const beta = 0.3 + marketWeight * 0.7 // 0.3 ~ 1.0 범위
    
    // 최대 손실률 (VaR) 추정
    const var95 = expectedReturn - 1.65 * volatility
    const maxDrawdown = Math.abs(var95) * 1.5
    
    return {
      expectedReturn,
      volatility,
      sharpeRatio,
      beta,
      maxDrawdown,
      var95
    }
  }

  // 리스크 허용도에 따른 포트폴리오 최적화
  const optimizePortfolio = async () => {
    setIsOptimizing(true)
    
    // 실제로는 Markowitz 최적화 알고리즘을 사용하지만, 여기서는 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    let optimizedAssets: Asset[] = []
    let recommendation = ''
    
    switch (riskTolerance) {
      case 'conservative':
        optimizedAssets = [
          { ...portfolio[0], allocation: 20 }, // 국내 대형주 20%
          { ...portfolio[1], allocation: 10 }, // 국내 중소형주 10%
          { ...portfolio[2], allocation: 20 }, // 미국 주식 20%
          { ...portfolio[3], allocation: 40 }, // 채권 40%
          { ...portfolio[4], allocation: 10 }  // 리츠 10%
        ]
        recommendation = '안정적인 수익을 추구하는 보수적 포트폴리오입니다. 채권 비중을 높여 변동성을 최소화했습니다.'
        break
        
      case 'moderate':
        optimizedAssets = [
          { ...portfolio[0], allocation: 30 }, // 국내 대형주 30%
          { ...portfolio[1], allocation: 15 }, // 국내 중소형주 15%
          { ...portfolio[2], allocation: 30 }, // 미국 주식 30%
          { ...portfolio[3], allocation: 20 }, // 채권 20%
          { ...portfolio[4], allocation: 5 }   // 리츠 5%
        ]
        recommendation = '위험과 수익의 균형을 맞춘 포트폴리오입니다. 주식과 채권을 적절히 배분했습니다.'
        break
        
      case 'aggressive':
        optimizedAssets = [
          { ...portfolio[0], allocation: 35 }, // 국내 대형주 35%
          { ...portfolio[1], allocation: 25 }, // 국내 중소형주 25%
          { ...portfolio[2], allocation: 30 }, // 미국 주식 30%
          { ...portfolio[3], allocation: 5 },  // 채권 5%
          { ...portfolio[4], allocation: 5 }   // 리츠 5%
        ]
        recommendation = '높은 수익을 추구하는 공격적 포트폴리오입니다. 주식 비중을 높여 성장성을 극대화했습니다.'
        break
    }
    
    const metrics = calculatePortfolioMetrics(optimizedAssets)
    
    setOptimizationResult({
      assets: optimizedAssets,
      metrics,
      recommendation,
      riskLevel: riskTolerance
    })
    
    setIsOptimizing(false)
  }

  // 자산 배분 비율 변경
  const handleAllocationChange = (index: number, newAllocation: number) => {
    const updatedPortfolio = [...portfolio]
    updatedPortfolio[index].allocation = Math.max(0, Math.min(100, newAllocation))
    setPortfolio(updatedPortfolio)
  }

  // 현재 포트폴리오 메트릭 계산
  const currentMetrics = calculatePortfolioMetrics(portfolio)
  const totalAllocation = portfolio.reduce((sum, asset) => sum + asset.allocation, 0)

  // 리스크 레벨 색상
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'conservative': return 'text-green-600 dark:text-green-400'
      case 'moderate': return 'text-yellow-600 dark:text-yellow-400'
      case 'aggressive': return 'text-red-600 dark:text-red-400'
      default: return 'text-gray-600 dark:text-gray-400'
    }
  }

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'conservative': return <Shield className="w-5 h-5" />
      case 'moderate': return <Target className="w-5 h-5" />
      case 'aggressive': return <AlertTriangle className="w-5 h-5" />
      default: return null
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-6">
        <PieChart className="w-6 h-6 text-red-600 dark:text-red-400" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">포트폴리오 최적화기</h3>
      </div>

      {/* 투자 설정 */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            총 투자금액 (원)
          </label>
          <input
            type="number"
            value={totalInvestment}
            onChange={(e) => setTotalInvestment(parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="10000000"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            위험 선호도
          </label>
          <select
            value={riskTolerance}
            onChange={(e) => setRiskTolerance(e.target.value as 'conservative' | 'moderate' | 'aggressive')}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="conservative">보수적 (안정형)</option>
            <option value="moderate">중도적 (균형형)</option>
            <option value="aggressive">공격적 (성장형)</option>
          </select>
        </div>
      </div>

      {/* 자산 배분 설정 */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">자산 배분 설정</h4>
        <div className="space-y-4">
          {portfolio.map((asset, index) => (
            <div key={asset.symbol} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white">{asset.name}</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {asset.symbol} | 기대수익률: {asset.expectedReturn}% | 변동성: {asset.volatility}%
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-red-600 dark:text-red-400">
                    {asset.allocation}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {(totalInvestment * asset.allocation / 100).toLocaleString()}원
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={asset.allocation}
                  onChange={(e) => handleAllocationChange(index, parseInt(e.target.value))}
                  className="flex-grow"
                />
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={asset.allocation}
                  onChange={(e) => handleAllocationChange(index, parseInt(e.target.value) || 0)}
                  className="w-16 px-2 py-1 text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">%</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-900 dark:text-white">총 배분:</span>
            <span className={`font-bold ${totalAllocation === 100 ? 'text-green-600' : 'text-red-600'}`}>
              {totalAllocation}%
            </span>
          </div>
          {totalAllocation !== 100 && (
            <p className="text-sm text-red-600 dark:text-red-400 mt-1">
              ⚠️ 총 배분이 100%가 되도록 조정해주세요
            </p>
          )}
        </div>
      </div>

      {/* 현재 포트폴리오 분석 */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">현재 포트폴리오 분석</h4>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h5 className="font-semibold text-gray-900 dark:text-white mb-2">기대수익률</h5>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {currentMetrics.expectedReturn.toFixed(1)}%
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h5 className="font-semibold text-gray-900 dark:text-white mb-2">변동성</h5>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {currentMetrics.volatility.toFixed(1)}%
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h5 className="font-semibold text-gray-900 dark:text-white mb-2">샤프 비율</h5>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {currentMetrics.sharpeRatio.toFixed(2)}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {currentMetrics.sharpeRatio > 1 ? '우수' : currentMetrics.sharpeRatio > 0.5 ? '양호' : '개선필요'}
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h5 className="font-semibold text-gray-900 dark:text-white mb-2">베타</h5>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {currentMetrics.beta.toFixed(2)}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {currentMetrics.beta > 1 ? '시장보다 변동성 높음' : '시장보다 안정적'}
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h5 className="font-semibold text-gray-900 dark:text-white mb-2">VaR (95%)</h5>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {currentMetrics.var95.toFixed(1)}%
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              최악의 경우 손실률
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h5 className="font-semibold text-gray-900 dark:text-white mb-2">최대 손실률</h5>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {currentMetrics.maxDrawdown.toFixed(1)}%
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              과거 최대 하락폭 추정
            </p>
          </div>
        </div>
      </div>

      {/* 최적화 실행 */}
      <button
        onClick={optimizePortfolio}
        disabled={isOptimizing || totalAllocation !== 100}
        className="w-full px-4 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 mb-6"
      >
        {isOptimizing ? '최적화 중...' : '포트폴리오 최적화 실행'}
      </button>

      {/* 최적화 결과 */}
      {optimizationResult && (
        <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">최적화 결과</h4>
          
          <div className="flex items-center gap-4 mb-6">
            <div className={`flex items-center gap-2 text-lg font-semibold ${getRiskColor(optimizationResult.riskLevel)}`}>
              {getRiskIcon(optimizationResult.riskLevel)}
              <span className="uppercase">{optimizationResult.riskLevel} 포트폴리오</span>
            </div>
            <div className="text-lg font-bold text-red-600 dark:text-red-400">
              샤프 비율: {optimizationResult.metrics.sharpeRatio.toFixed(2)}
            </div>
          </div>

          {/* 최적화된 자산 배분 */}
          <div className="mb-6">
            <h5 className="font-semibold text-gray-900 dark:text-white mb-3">권장 자산 배분</h5>
            <div className="grid md:grid-cols-2 gap-4">
              {optimizationResult.assets.map((asset) => (
                <div key={asset.symbol} className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h6 className="font-semibold text-gray-900 dark:text-white">{asset.name}</h6>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{asset.symbol}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-red-600 dark:text-red-400">
                        {asset.allocation}%
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {(totalInvestment * asset.allocation / 100).toLocaleString()}원
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 최적화된 포트폴리오 메트릭 */}
          <div className="mb-6">
            <h5 className="font-semibold text-gray-900 dark:text-white mb-3">예상 성과</h5>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">기대수익률</div>
                <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                  {optimizationResult.metrics.expectedReturn.toFixed(1)}%
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">변동성</div>
                <div className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
                  {optimizationResult.metrics.volatility.toFixed(1)}%
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">VaR (95%)</div>
                <div className="text-xl font-bold text-red-600 dark:text-red-400">
                  {optimizationResult.metrics.var95.toFixed(1)}%
                </div>
              </div>
            </div>
          </div>

          {/* 투자 의견 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h5 className="font-semibold text-gray-900 dark:text-white mb-2">투자 의견</h5>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              {optimizationResult.recommendation}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}