'use client'

import { useState, useRef, useEffect } from 'react'
import { BarChart3, TrendingUp, TrendingDown, Activity, Eye } from 'lucide-react'

interface ChartData {
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

interface PatternAnalysis {
  pattern: string
  confidence: number
  prediction: 'bullish' | 'bearish' | 'neutral'
  description: string
  signals: string[]
}

interface TechnicalIndicators {
  sma20: number
  sma50: number
  rsi: number
  macd: number
  macdSignal: number
  support: number
  resistance: number
}

export default function ChartAnalyzer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [analysis, setAnalysis] = useState<PatternAnalysis | null>(null)
  const [indicators, setIndicators] = useState<TechnicalIndicators | null>(null)
  const [selectedPattern, setSelectedPattern] = useState<string>('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // 샘플 데이터 생성
  const generateSampleData = () => {
    const data: ChartData[] = []
    let price = 50000
    const today = new Date()
    
    for (let i = 50; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      
      const change = (Math.random() - 0.5) * 2000
      const open = price
      const close = price + change
      const high = Math.max(open, close) + Math.random() * 1000
      const low = Math.min(open, close) - Math.random() * 1000
      const volume = Math.floor(Math.random() * 1000000) + 100000
      
      data.push({
        date: date.toISOString().split('T')[0],
        open,
        high,
        low,
        close,
        volume
      })
      
      price = close
    }
    
    setChartData(data)
    drawChart(data)
  }

  // 캔들스틱 차트 그리기
  const drawChart = (data: ChartData[]) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 캔버스 크기 설정
    const width = canvas.width = 800
    const height = canvas.height = 400
    
    // 배경 초기화
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    if (data.length === 0) return

    const prices = data.flatMap(d => [d.high, d.low])
    const maxPrice = Math.max(...prices)
    const minPrice = Math.min(...prices)
    const priceRange = maxPrice - minPrice
    
    const chartHeight = height - 60
    const chartWidth = width - 60
    const candleWidth = Math.max(2, chartWidth / data.length - 2)

    // 그리드 그리기
    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 1
    
    for (let i = 0; i <= 5; i++) {
      const y = 30 + (chartHeight / 5) * i
      ctx.beginPath()
      ctx.moveTo(30, y)
      ctx.lineTo(width - 30, y)
      ctx.stroke()
    }

    // 캔들스틱 그리기
    data.forEach((candle, index) => {
      const x = 30 + (chartWidth / data.length) * index + candleWidth / 2
      const openY = 30 + ((maxPrice - candle.open) / priceRange) * chartHeight
      const closeY = 30 + ((maxPrice - candle.close) / priceRange) * chartHeight
      const highY = 30 + ((maxPrice - candle.high) / priceRange) * chartHeight
      const lowY = 30 + ((maxPrice - candle.low) / priceRange) * chartHeight

      const isRed = candle.close < candle.open
      
      // 심지 그리기
      ctx.strokeStyle = isRed ? '#dc2626' : '#059669'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(x, highY)
      ctx.lineTo(x, lowY)
      ctx.stroke()

      // 몸통 그리기
      const bodyTop = Math.min(openY, closeY)
      const bodyHeight = Math.abs(closeY - openY)
      
      ctx.fillStyle = isRed ? '#dc2626' : '#059669'
      ctx.fillRect(x - candleWidth / 2, bodyTop, candleWidth, bodyHeight || 1)
    })

    // 이동평균선 그리기 (20일, 50일)
    if (data.length >= 20) {
      drawMovingAverage(ctx, data, 20, '#3b82f6', width, height, maxPrice, minPrice, priceRange, chartHeight, chartWidth)
    }
    if (data.length >= 50) {
      drawMovingAverage(ctx, data, 50, '#f59e0b', width, height, maxPrice, minPrice, priceRange, chartHeight, chartWidth)
    }
  }

  // 이동평균선 그리기
  const drawMovingAverage = (
    ctx: CanvasRenderingContext2D,
    data: ChartData[],
    period: number,
    color: string,
    width: number,
    height: number,
    maxPrice: number,
    minPrice: number,
    priceRange: number,
    chartHeight: number,
    chartWidth: number
  ) => {
    ctx.strokeStyle = color
    ctx.lineWidth = 2
    ctx.beginPath()

    for (let i = period - 1; i < data.length; i++) {
      const sum = data.slice(i - period + 1, i + 1).reduce((acc, d) => acc + d.close, 0)
      const avg = sum / period
      const x = 30 + (chartWidth / data.length) * i + (chartWidth / data.length) / 2
      const y = 30 + ((maxPrice - avg) / priceRange) * chartHeight

      if (i === period - 1) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.stroke()
  }

  // 기술적 지표 계산
  const calculateIndicators = (data: ChartData[]): TechnicalIndicators => {
    const closes = data.map(d => d.close)
    const highs = data.map(d => d.high)
    const lows = data.map(d => d.low)

    // 이동평균
    const sma20 = closes.slice(-20).reduce((a, b) => a + b, 0) / 20
    const sma50 = closes.slice(-50).reduce((a, b) => a + b, 0) / Math.min(50, closes.length)

    // RSI 계산 (단순화)
    const gains = []
    const losses = []
    for (let i = 1; i < Math.min(15, closes.length); i++) {
      const change = closes[closes.length - i] - closes[closes.length - i - 1]
      if (change > 0) gains.push(change)
      else losses.push(Math.abs(change))
    }
    const avgGain = gains.reduce((a, b) => a + b, 0) / gains.length || 0
    const avgLoss = losses.reduce((a, b) => a + b, 0) / losses.length || 1
    const rsi = 100 - (100 / (1 + (avgGain / avgLoss)))

    // MACD (단순화)
    const ema12 = closes.slice(-12).reduce((a, b) => a + b, 0) / 12
    const ema26 = closes.slice(-26).reduce((a, b) => a + b, 0) / Math.min(26, closes.length)
    const macd = ema12 - ema26
    const macdSignal = macd * 0.9 // 단순화된 시그널

    // 지지/저항 수준
    const recentHighs = highs.slice(-20)
    const recentLows = lows.slice(-20)
    const resistance = Math.max(...recentHighs)
    const support = Math.min(...recentLows)

    return {
      sma20,
      sma50,
      rsi,
      macd,
      macdSignal,
      support,
      resistance
    }
  }

  // 패턴 분석
  const analyzePattern = async () => {
    if (chartData.length === 0) return

    setIsAnalyzing(true)
    
    // 실제로는 AI 모델이나 복잡한 알고리즘을 사용하지만, 여기서는 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 2000))

    const patterns = [
      {
        pattern: '상승 삼각형',
        confidence: 78,
        prediction: 'bullish' as const,
        description: '고점은 수평선을 형성하고 저점은 상승하는 패턴으로 상승 돌파 가능성이 높습니다.',
        signals: ['거래량 증가', '저점 상승', '고점 수평 저항']
      },
      {
        pattern: '하락 쐐기',
        confidence: 65,
        prediction: 'bearish' as const,
        description: '고점과 저점이 모두 하락하지만 저점의 하락폭이 더 큰 패턴입니다.',
        signals: ['거래량 감소', '모멘텀 약화', '추세선 수렴']
      },
      {
        pattern: '더블탑',
        confidence: 83,
        prediction: 'bearish' as const,
        description: '두 번의 고점이 비슷한 수준에서 형성되어 하락 반전 신호를 보입니다.',
        signals: ['두 번째 고점에서 거래량 감소', '목선 지지선 이탈', 'RSI 다이버전스']
      }
    ]

    const randomPattern = patterns[Math.floor(Math.random() * patterns.length)]
    setAnalysis(randomPattern)
    setIndicators(calculateIndicators(chartData))
    setIsAnalyzing(false)
  }

  // 컴포넌트 마운트 시 샘플 데이터 생성
  useEffect(() => {
    generateSampleData()
  }, [])

  const getPredictionColor = (prediction: string) => {
    switch (prediction) {
      case 'bullish': return 'text-emerald-600 dark:text-emerald-400'
      case 'bearish': return 'text-red-600 dark:text-red-400'
      case 'neutral': return 'text-yellow-600 dark:text-yellow-400'
      default: return 'text-gray-600 dark:text-gray-400'
    }
  }

  const getPredictionIcon = (prediction: string) => {
    switch (prediction) {
      case 'bullish': return <TrendingUp className="w-5 h-5" />
      case 'bearish': return <TrendingDown className="w-5 h-5" />
      case 'neutral': return <Activity className="w-5 h-5" />
      default: return null
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="w-6 h-6 text-red-600 dark:text-red-400" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">차트 패턴 분석기</h3>
      </div>

      {/* 차트 영역 */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold text-gray-900 dark:text-white">실시간 차트</h4>
          <div className="flex gap-2">
            <button
              onClick={generateSampleData}
              className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              새 데이터
            </button>
            <button
              onClick={analyzePattern}
              disabled={isAnalyzing}
              className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                {isAnalyzing ? '분석 중...' : '패턴 분석'}
              </div>
            </button>
          </div>
        </div>
        
        <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
          <canvas
            ref={canvasRef}
            className="w-full h-auto max-w-full"
            style={{ maxHeight: '400px' }}
          />
        </div>
        
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-3 h-1 bg-blue-500"></div>
            <span>20일 이동평균</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-1 bg-yellow-500"></div>
            <span>50일 이동평균</span>
          </div>
        </div>
      </div>

      {/* 기술적 지표 */}
      {indicators && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">기술적 지표</h4>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 dark:text-white mb-1">20일 이평</h5>
              <div className="text-lg font-bold text-red-600 dark:text-red-400">
                {indicators.sma20.toLocaleString()}원
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 dark:text-white mb-1">50일 이평</h5>
              <div className="text-lg font-bold text-red-600 dark:text-red-400">
                {indicators.sma50.toLocaleString()}원
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 dark:text-white mb-1">RSI</h5>
              <div className={`text-lg font-bold ${
                indicators.rsi > 70 ? 'text-red-600' : 
                indicators.rsi < 30 ? 'text-emerald-600' : 
                'text-yellow-600'
              }`}>
                {indicators.rsi.toFixed(1)}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {indicators.rsi > 70 ? '과매수' : indicators.rsi < 30 ? '과매도' : '중립'}
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 dark:text-white mb-1">MACD</h5>
              <div className={`text-lg font-bold ${
                indicators.macd > indicators.macdSignal ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {indicators.macd.toFixed(0)}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {indicators.macd > indicators.macdSignal ? '상승' : '하락'}
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 dark:text-white mb-1">지지선</h5>
              <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                {indicators.support.toLocaleString()}원
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 dark:text-white mb-1">저항선</h5>
              <div className="text-lg font-bold text-red-600 dark:text-red-400">
                {indicators.resistance.toLocaleString()}원
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 패턴 분석 결과 */}
      {analysis && (
        <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">패턴 분석 결과</h4>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {analysis.pattern}
            </div>
            <div className={`flex items-center gap-2 text-lg font-semibold ${getPredictionColor(analysis.prediction)}`}>
              {getPredictionIcon(analysis.prediction)}
              <span className="uppercase">{analysis.prediction}</span>
            </div>
            <div className="text-lg font-bold text-gray-600 dark:text-gray-400">
              신뢰도: {analysis.confidence}%
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
            <h5 className="font-semibold text-gray-900 dark:text-white mb-2">분석 내용</h5>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              {analysis.description}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h5 className="font-semibold text-gray-900 dark:text-white mb-2">주요 신호</h5>
            <ul className="space-y-1">
              {analysis.signals.map((signal, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  {signal}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}