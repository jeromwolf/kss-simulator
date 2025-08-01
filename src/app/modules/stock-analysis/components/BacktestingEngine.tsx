'use client'

import { useState, useRef, useEffect } from 'react'
import { Activity, Play, BarChart3, TrendingUp, TrendingDown, DollarSign } from 'lucide-react'

interface Trade {
  date: string
  type: 'buy' | 'sell'
  price: number
  quantity: number
  reason: string
}

interface PerformanceMetrics {
  totalReturn: number
  annualizedReturn: number
  volatility: number
  sharpeRatio: number
  maxDrawdown: number
  winRate: number
  profitFactor: number
  totalTrades: number
}

interface BacktestResult {
  trades: Trade[]
  equity: { date: string; value: number }[]
  metrics: PerformanceMetrics
  benchmarkReturn: number
}

interface Strategy {
  id: string
  name: string
  description: string
  parameters: { [key: string]: number }
}

export default function BacktestingEngine() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedStrategy, setSelectedStrategy] = useState<string>('sma-crossover')
  const [backtestPeriod, setBacktestPeriod] = useState('1y')
  const [initialCapital, setInitialCapital] = useState(10000000) // 1천만원
  const [result, setResult] = useState<BacktestResult | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)

  // 백테스팅 전략들
  const strategies: Strategy[] = [
    {
      id: 'sma-crossover',
      name: '이동평균 크로스오버',
      description: '단기 이동평균이 장기 이동평균을 상향/하향 돌파할 때 매수/매도',
      parameters: { shortPeriod: 20, longPeriod: 50 }
    },
    {
      id: 'rsi-oversold',
      name: 'RSI 과매도/과매수',
      description: 'RSI 지표를 활용한 역추세 전략',
      parameters: { period: 14, oversold: 30, overbought: 70 }
    },
    {
      id: 'bollinger-bands',
      name: '볼린저 밴드',
      description: '볼린저 밴드 상/하한선 돌파 시점 포착',
      parameters: { period: 20, standardDev: 2 }
    },
    {
      id: 'momentum',
      name: '모멘텀 전략',
      description: '가격 모멘텀을 이용한 추세 추종 전략',
      parameters: { lookback: 12, threshold: 5 }
    }
  ]

  // 가격 데이터 생성 (시뮬레이션)
  const generatePriceData = (periods: number) => {
    const data = []
    let price = 50000
    const startDate = new Date()
    startDate.setFullYear(startDate.getFullYear() - 1)

    for (let i = 0; i < periods; i++) {
      const date = new Date(startDate)
      date.setDate(date.getDate() + i)
      
      // 랜덤 워크 + 트렌드
      const trend = Math.sin(i / 50) * 0.001
      const volatility = (Math.random() - 0.5) * 0.03
      price *= (1 + trend + volatility)
      
      data.push({
        date: date.toISOString().split('T')[0],
        price: Math.round(price)
      })
    }
    
    return data
  }

  // 이동평균 계산
  const calculateSMA = (prices: number[], period: number): number[] => {
    const sma = []
    for (let i = 0; i < prices.length; i++) {
      if (i < period - 1) {
        sma.push(0)
      } else {
        const sum = prices.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0)
        sma.push(sum / period)
      }
    }
    return sma
  }

  // RSI 계산
  const calculateRSI = (prices: number[], period: number): number[] => {
    const rsi = []
    const gains = []
    const losses = []
    
    for (let i = 1; i < prices.length; i++) {
      const change = prices[i] - prices[i - 1]
      gains.push(change > 0 ? change : 0)
      losses.push(change < 0 ? -change : 0)
    }
    
    for (let i = 0; i < gains.length; i++) {
      if (i < period - 1) {
        rsi.push(50)
      } else {
        const avgGain = gains.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0) / period
        const avgLoss = losses.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0) / period
        const rs = avgGain / (avgLoss || 1)
        rsi.push(100 - (100 / (1 + rs)))
      }
    }
    
    return [50, ...rsi] // 첫 번째 값 추가
  }

  // 백테스팅 실행
  const runBacktest = async () => {
    setIsRunning(true)
    setProgress(0)
    
    const periods = backtestPeriod === '1y' ? 252 : backtestPeriod === '2y' ? 504 : 126
    const priceData = generatePriceData(periods)
    const prices = priceData.map(d => d.price)
    
    const trades: Trade[] = []
    const equity: { date: string; value: number }[] = []
    
    let capital = initialCapital
    let position = 0 // 보유 주식 수
    let positionValue = 0
    
    // 전략별 로직
    let indicators: any = {}
    const strategy = strategies.find(s => s.id === selectedStrategy)!
    
    switch (selectedStrategy) {
      case 'sma-crossover':
        const shortSMA = calculateSMA(prices, strategy.parameters.shortPeriod)
        const longSMA = calculateSMA(prices, strategy.parameters.longPeriod)
        indicators = { shortSMA, longSMA }
        break
      
      case 'rsi-oversold':
        const rsi = calculateRSI(prices, strategy.parameters.period)
        indicators = { rsi }
        break
        
      default:
        indicators = {}
    }
    
    // 백테스팅 실행
    for (let i = 1; i < priceData.length; i++) {
      const currentPrice = prices[i]
      const prevPrice = prices[i - 1]
      
      // 진행률 업데이트
      setProgress(Math.round((i / priceData.length) * 100))
      await new Promise(resolve => setTimeout(resolve, 10))
      
      let shouldBuy = false
      let shouldSell = false
      let reason = ''
      
      // 전략별 신호 생성
      switch (selectedStrategy) {
        case 'sma-crossover':
          if (indicators.shortSMA[i] > indicators.longSMA[i] && 
              indicators.shortSMA[i - 1] <= indicators.longSMA[i - 1]) {
            shouldBuy = true
            reason = '단기 이평선이 장기 이평선을 상향 돌파'
          } else if (indicators.shortSMA[i] < indicators.longSMA[i] && 
                     indicators.shortSMA[i - 1] >= indicators.longSMA[i - 1]) {
            shouldSell = true
            reason = '단기 이평선이 장기 이평선을 하향 돌파'
          }
          break
          
        case 'rsi-oversold':
          if (indicators.rsi[i] < strategy.parameters.oversold && position === 0) {
            shouldBuy = true
            reason = `RSI ${indicators.rsi[i].toFixed(1)} 과매도 구간 진입`
          } else if (indicators.rsi[i] > strategy.parameters.overbought && position > 0) {
            shouldSell = true
            reason = `RSI ${indicators.rsi[i].toFixed(1)} 과매수 구간 진입`
          }
          break
      }
      
      // 매수 실행
      if (shouldBuy && position === 0 && capital > currentPrice) {
        const quantity = Math.floor(capital * 0.95 / currentPrice) // 95% 투자
        position = quantity
        capital -= quantity * currentPrice
        
        trades.push({
          date: priceData[i].date,
          type: 'buy',
          price: currentPrice,
          quantity,
          reason
        })
      }
      
      // 매도 실행
      if (shouldSell && position > 0) {
        capital += position * currentPrice
        
        trades.push({
          date: priceData[i].date,
          type: 'sell',
          price: currentPrice,
          quantity: position,
          reason
        })
        
        position = 0
      }
      
      // 포트폴리오 가치 계산
      positionValue = position * currentPrice
      const totalValue = capital + positionValue
      
      equity.push({
        date: priceData[i].date,
        value: totalValue
      })
    }
    
    // 마지막에 포지션이 남아있다면 정리
    if (position > 0) {
      capital += position * prices[prices.length - 1]
      position = 0
    }
    
    // 성과 지표 계산
    const finalValue = capital
    const totalReturn = ((finalValue - initialCapital) / initialCapital) * 100
    const annualizedReturn = Math.pow(finalValue / initialCapital, 252 / periods) - 1
    
    // 변동성 계산
    const returns = equity.slice(1).map((e, i) => (e.value - equity[i].value) / equity[i].value)
    const avgReturn = returns.reduce((a, b) => a + b, 0) / returns.length
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / returns.length
    const volatility = Math.sqrt(variance * 252) * 100
    
    // 샤프 비율
    const riskFreeRate = 0.03
    const sharpeRatio = (annualizedReturn - riskFreeRate) / (volatility / 100)
    
    // 최대 낙폭
    let maxValue = initialCapital
    let maxDrawdown = 0
    equity.forEach(e => {
      maxValue = Math.max(maxValue, e.value)
      const drawdown = (maxValue - e.value) / maxValue * 100
      maxDrawdown = Math.max(maxDrawdown, drawdown)
    })
    
    // 승률 계산
    const profitTrades = trades.filter((trade, i) => {
      if (trade.type === 'sell' && i > 0) {
        const buyTrade = trades[i - 1]
        return trade.price > buyTrade.price
      }
      return false
    })
    const winRate = trades.length > 0 ? (profitTrades.length / (trades.length / 2)) * 100 : 0
    
    // 수익 팩터
    const profits = profitTrades.reduce((sum, trade, i) => {
      const buyTrade = trades.find(t => t.type === 'buy' && t.date < trade.date)
      if (buyTrade) {
        return sum + (trade.price - buyTrade.price) * trade.quantity
      }
      return sum
    }, 0)
    
    const losses = trades.filter(trade => trade.type === 'sell').reduce((sum, trade, i) => {
      const buyTrade = trades.find(t => t.type === 'buy' && t.date < trade.date)
      if (buyTrade && trade.price < buyTrade.price) {
        return sum + Math.abs((trade.price - buyTrade.price) * trade.quantity)
      }
      return sum
    }, 0)
    
    const profitFactor = losses > 0 ? profits / losses : profits > 0 ? 10 : 1
    
    // 벤치마크 수익률 (Buy & Hold)
    const benchmarkReturn = ((prices[prices.length - 1] - prices[0]) / prices[0]) * 100
    
    const metrics: PerformanceMetrics = {
      totalReturn,
      annualizedReturn: annualizedReturn * 100,
      volatility,
      sharpeRatio,
      maxDrawdown,
      winRate,
      profitFactor,
      totalTrades: trades.length
    }
    
    setResult({
      trades,
      equity,
      metrics,
      benchmarkReturn
    })
    
    setIsRunning(false)
    setProgress(100)
    
    // 차트 그리기
    setTimeout(() => drawChart(priceData, equity), 100)
  }

  // 차트 그리기
  const drawChart = (priceData: any[], equity: any[]) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width = 800
    const height = canvas.height = 300
    
    // 배경
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)
    
    if (equity.length === 0) return
    
    const maxValue = Math.max(...equity.map(e => e.value))
    const minValue = Math.min(...equity.map(e => e.value))
    const valueRange = maxValue - minValue
    
    const chartHeight = height - 60
    const chartWidth = width - 60
    
    // 그리드
    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 1
    for (let i = 0; i <= 5; i++) {
      const y = 30 + (chartHeight / 5) * i
      ctx.beginPath()
      ctx.moveTo(30, y)
      ctx.lineTo(width - 30, y)
      ctx.stroke()
    }
    
    // 포트폴리오 가치 라인
    ctx.strokeStyle = '#dc2626'
    ctx.lineWidth = 3
    ctx.beginPath()
    
    equity.forEach((point, index) => {
      const x = 30 + (chartWidth / equity.length) * index
      const y = 30 + ((maxValue - point.value) / valueRange) * chartHeight
      
      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.stroke()
    
    // 벤치마크 라인 (Buy & Hold)
    ctx.strokeStyle = '#6b7280'
    ctx.lineWidth = 2
    ctx.setLineDash([5, 5])
    ctx.beginPath()
    
    const initialPrice = priceData[0].price
    priceData.forEach((point, index) => {
      const benchmarkValue = initialCapital * (point.price / initialPrice)
      const x = 30 + (chartWidth / priceData.length) * index
      const y = 30 + ((maxValue - benchmarkValue) / valueRange) * chartHeight
      
      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.stroke()
    ctx.setLineDash([])
    
    // 매매 신호 표시
    if (result) {
      result.trades.forEach(trade => {
        const tradeIndex = equity.findIndex(e => e.date === trade.date)
        if (tradeIndex >= 0) {
          const x = 30 + (chartWidth / equity.length) * tradeIndex
          const y = 30 + ((maxValue - equity[tradeIndex].value) / valueRange) * chartHeight
          
          ctx.fillStyle = trade.type === 'buy' ? '#10b981' : '#ef4444'
          ctx.beginPath()
          ctx.arc(x, y, 4, 0, Math.PI * 2)
          ctx.fill()
        }
      })
    }
  }

  const getMetricColor = (value: number, type: 'return' | 'ratio' | 'percent') => {
    if (type === 'return' || type === 'percent') {
      return value > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
    }
    if (type === 'ratio') {
      return value > 1 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
    }
    return 'text-gray-600 dark:text-gray-400'
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-6 h-6 text-red-600 dark:text-red-400" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">백테스팅 엔진</h3>
      </div>

      {/* 설정 영역 */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            투자 전략
          </label>
          <select
            value={selectedStrategy}
            onChange={(e) => setSelectedStrategy(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {strategies.map(strategy => (
              <option key={strategy.id} value={strategy.id}>
                {strategy.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            백테스팅 기간
          </label>
          <select
            value={backtestPeriod}
            onChange={(e) => setBacktestPeriod(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="6m">6개월</option>
            <option value="1y">1년</option>
            <option value="2y">2년</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            초기 자본 (원)
          </label>
          <input
            type="number"
            value={initialCapital}
            onChange={(e) => setInitialCapital(parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="10000000"
          />
        </div>
      </div>

      {/* 선택된 전략 설명 */}
      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
          {strategies.find(s => s.id === selectedStrategy)?.name}
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {strategies.find(s => s.id === selectedStrategy)?.description}
        </p>
      </div>

      {/* 실행 버튼 */}
      <button
        onClick={runBacktest}
        disabled={isRunning}
        className="w-full px-4 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 mb-6"
      >
        <div className="flex items-center justify-center gap-2">
          <Play className="w-4 h-4" />
          {isRunning ? `백테스팅 실행 중... ${progress}%` : '백테스팅 시작'}
        </div>
      </button>

      {/* 진행률 바 */}
      {isRunning && (
        <div className="mb-6">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-red-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* 결과 차트 */}
      {result && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">포트폴리오 성과</h4>
          <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
            <canvas
              ref={canvasRef}
              className="w-full h-auto max-w-full"
              style={{ maxHeight: '300px' }}
            />
          </div>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-3 h-1 bg-red-600"></div>
              <span>전략 수익률</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-1 bg-gray-500 opacity-60" style={{ backgroundImage: 'repeating-linear-gradient(to right, transparent, transparent 3px, #6b7280 3px, #6b7280 6px)' }}></div>
              <span>벤치마크 (Buy & Hold)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span>매수</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>매도</span>
            </div>
          </div>
        </div>
      )}

      {/* 성과 지표 */}
      {result && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">성과 분석</h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 dark:text-white mb-2">총 수익률</h5>
              <div className={`text-2xl font-bold ${getMetricColor(result.metrics.totalReturn, 'return')}`}>
                {result.metrics.totalReturn.toFixed(1)}%
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                vs 벤치마크: {result.benchmarkReturn.toFixed(1)}%
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 dark:text-white mb-2">연환산 수익률</h5>
              <div className={`text-2xl font-bold ${getMetricColor(result.metrics.annualizedReturn, 'return')}`}>
                {result.metrics.annualizedReturn.toFixed(1)}%
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 dark:text-white mb-2">변동성</h5>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {result.metrics.volatility.toFixed(1)}%
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 dark:text-white mb-2">샤프 비율</h5>
              <div className={`text-2xl font-bold ${getMetricColor(result.metrics.sharpeRatio, 'ratio')}`}>
                {result.metrics.sharpeRatio.toFixed(2)}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {result.metrics.sharpeRatio > 1 ? '우수' : result.metrics.sharpeRatio > 0.5 ? '양호' : '개선필요'}
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 dark:text-white mb-2">최대 낙폭</h5>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                -{result.metrics.maxDrawdown.toFixed(1)}%
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 dark:text-white mb-2">승률</h5>
              <div className={`text-2xl font-bold ${getMetricColor(result.metrics.winRate - 50, 'percent')}`}>
                {result.metrics.winRate.toFixed(1)}%
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 dark:text-white mb-2">수익 팩터</h5>
              <div className={`text-2xl font-bold ${getMetricColor(result.metrics.profitFactor, 'ratio')}`}>
                {result.metrics.profitFactor.toFixed(2)}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {result.metrics.profitFactor > 1.5 ? '우수' : result.metrics.profitFactor > 1 ? '양호' : '개선필요'}
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 dark:text-white mb-2">총 거래 횟수</h5>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {result.metrics.totalTrades}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 거래 내역 */}
      {result && result.trades.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
            거래 내역 ({result.trades.length}건)
          </h4>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 max-h-64 overflow-y-auto">
            <div className="space-y-2">
              {result.trades.slice(-10).map((trade, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-600 last:border-b-0">
                  <div className="flex items-center gap-3">
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      trade.type === 'buy' 
                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                    }`}>
                      {trade.type === 'buy' ? '매수' : '매도'}
                    </div>
                    <div className="text-sm">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {trade.quantity.toLocaleString()}주 @ {trade.price.toLocaleString()}원
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        {trade.date} | {trade.reason}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {(trade.quantity * trade.price).toLocaleString()}원
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}