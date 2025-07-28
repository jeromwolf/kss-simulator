'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  LineChart, TrendingUp, TrendingDown, Activity,
  Calculator, Brain, AlertTriangle, Target,
  BarChart3, DollarSign, PieChart, Zap,
  Database, Shield, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

interface MarketData {
  ticker: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  per: number;
  pbr: number;
  roe: number;
  eps: number;
  bps: number;
  dividendYield: number;
  beta: number;
  volatility: number;
  rsi: number;
  macd: {
    value: number;
    signal: number;
    histogram: number;
  };
  bollingerBands: {
    upper: number;
    middle: number;
    lower: number;
  };
  priceHistory: PricePoint[];
}

interface PricePoint {
  timestamp: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface PortfolioItem {
  ticker: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  purchaseDate: Date;
}

interface TradingSignal {
  type: 'buy' | 'sell' | 'hold';
  strength: number; // 0-100
  reasons: string[];
  confidence: number; // 0-1
}

// 실제 시장 데이터를 시뮬레이션하는 함수
function generateMarketData(ticker: string): MarketData {
  const basePrice = 50000 + Math.random() * 50000;
  const volatility = 0.02 + Math.random() * 0.03;
  
  // 가격 히스토리 생성 (최근 100일)
  const priceHistory: PricePoint[] = [];
  let currentPrice = basePrice;
  
  for (let i = 99; i >= 0; i--) {
    const change = (Math.random() - 0.5) * volatility * currentPrice;
    currentPrice += change;
    
    const high = currentPrice * (1 + Math.random() * volatility);
    const low = currentPrice * (1 - Math.random() * volatility);
    const open = low + Math.random() * (high - low);
    const close = low + Math.random() * (high - low);
    
    priceHistory.push({
      timestamp: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      open,
      high,
      low,
      close,
      volume: Math.floor(1000000 + Math.random() * 5000000)
    });
  }
  
  const latestPrice = priceHistory[priceHistory.length - 1].close;
  const previousClose = priceHistory[priceHistory.length - 2].close;
  const change = latestPrice - previousClose;
  const changePercent = (change / previousClose) * 100;
  
  // 기술적 지표 계산
  const prices = priceHistory.map(p => p.close);
  const sma20 = prices.slice(-20).reduce((a, b) => a + b, 0) / 20;
  const stdDev = Math.sqrt(
    prices.slice(-20).reduce((sum, price) => sum + Math.pow(price - sma20, 2), 0) / 20
  );
  
  return {
    ticker,
    name: `${ticker} 주식회사`,
    price: latestPrice,
    change,
    changePercent,
    volume: priceHistory[priceHistory.length - 1].volume,
    marketCap: latestPrice * 100000000,
    per: 10 + Math.random() * 20,
    pbr: 0.8 + Math.random() * 2,
    roe: 5 + Math.random() * 20,
    eps: latestPrice / (10 + Math.random() * 20),
    bps: latestPrice / (0.8 + Math.random() * 2),
    dividendYield: Math.random() * 5,
    beta: 0.5 + Math.random() * 1.5,
    volatility: volatility * 100,
    rsi: 30 + Math.random() * 40,
    macd: {
      value: (Math.random() - 0.5) * 100,
      signal: (Math.random() - 0.5) * 80,
      histogram: (Math.random() - 0.5) * 20
    },
    bollingerBands: {
      upper: sma20 + 2 * stdDev,
      middle: sma20,
      lower: sma20 - 2 * stdDev
    },
    priceHistory
  };
}

// AI 기반 매매 신호 생성
function generateTradingSignal(data: MarketData): TradingSignal {
  const signals: { type: 'buy' | 'sell' | 'hold'; score: number; reason: string }[] = [];
  
  // RSI 분석
  if (data.rsi < 30) {
    signals.push({ type: 'buy', score: 20, reason: 'RSI 과매도 구간 (RSI: ' + data.rsi.toFixed(2) + ')' });
  } else if (data.rsi > 70) {
    signals.push({ type: 'sell', score: 20, reason: 'RSI 과매수 구간 (RSI: ' + data.rsi.toFixed(2) + ')' });
  }
  
  // 볼린저 밴드 분석
  if (data.price < data.bollingerBands.lower) {
    signals.push({ type: 'buy', score: 15, reason: '볼린저 밴드 하단 이탈' });
  } else if (data.price > data.bollingerBands.upper) {
    signals.push({ type: 'sell', score: 15, reason: '볼린저 밴드 상단 이탈' });
  }
  
  // MACD 분석
  if (data.macd.histogram > 0 && data.macd.value > data.macd.signal) {
    signals.push({ type: 'buy', score: 25, reason: 'MACD 골든크로스' });
  } else if (data.macd.histogram < 0 && data.macd.value < data.macd.signal) {
    signals.push({ type: 'sell', score: 25, reason: 'MACD 데드크로스' });
  }
  
  // PER 분석
  if (data.per < 10) {
    signals.push({ type: 'buy', score: 20, reason: '저PER (PER: ' + data.per.toFixed(2) + ')' });
  } else if (data.per > 25) {
    signals.push({ type: 'sell', score: 15, reason: '고PER (PER: ' + data.per.toFixed(2) + ')' });
  }
  
  // ROE 분석
  if (data.roe > 15) {
    signals.push({ type: 'buy', score: 15, reason: '높은 ROE (' + data.roe.toFixed(2) + '%)' });
  } else if (data.roe < 5) {
    signals.push({ type: 'sell', score: 10, reason: '낮은 ROE (' + data.roe.toFixed(2) + '%)' });
  }
  
  // 종합 점수 계산
  const buyScore = signals.filter(s => s.type === 'buy').reduce((sum, s) => sum + s.score, 0);
  const sellScore = signals.filter(s => s.type === 'sell').reduce((sum, s) => sum + s.score, 0);
  
  let finalType: 'buy' | 'sell' | 'hold' = 'hold';
  let strength = 0;
  
  if (buyScore > sellScore + 20) {
    finalType = 'buy';
    strength = Math.min(buyScore, 100);
  } else if (sellScore > buyScore + 20) {
    finalType = 'sell';
    strength = Math.min(sellScore, 100);
  } else {
    strength = 50;
  }
  
  return {
    type: finalType,
    strength,
    reasons: signals.map(s => s.reason),
    confidence: strength / 100
  };
}

export function AdvancedSimulator() {
  const [selectedTicker, setSelectedTicker] = useState('삼성전자');
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [cash, setCash] = useState(100000000); // 1억원 시작
  const [tradingSignal, setTradingSignal] = useState<TradingSignal | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  
  const tickers = ['삼성전자', 'SK하이닉스', 'NAVER', '카카오', 'LG화학', '현대차', '기아', 'POSCO홀딩스'];
  
  useEffect(() => {
    // 초기 데이터 로드
    const data = generateMarketData(selectedTicker);
    setMarketData(data);
    setTradingSignal(generateTradingSignal(data));
  }, [selectedTicker]);
  
  useEffect(() => {
    if (isSimulating && marketData) {
      const interval = setInterval(() => {
        // 실시간 가격 업데이트 시뮬레이션
        const newPrice = marketData.price * (1 + (Math.random() - 0.5) * 0.002);
        const updatedData = {
          ...marketData,
          price: newPrice,
          change: newPrice - marketData.price,
          changePercent: ((newPrice - marketData.price) / marketData.price) * 100
        };
        setMarketData(updatedData);
        setTradingSignal(generateTradingSignal(updatedData));
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [isSimulating, marketData]);
  
  const executeTrade = (type: 'buy' | 'sell', quantity: number) => {
    if (!marketData) return;
    
    if (type === 'buy') {
      const cost = marketData.price * quantity;
      const fee = cost * 0.00015; // 0.015% 수수료
      
      if (cash >= cost + fee) {
        setCash(cash - cost - fee);
        
        const existingItem = portfolio.find(item => item.ticker === selectedTicker);
        if (existingItem) {
          // 평균 단가 계산
          const totalQuantity = existingItem.quantity + quantity;
          const avgPrice = (existingItem.avgPrice * existingItem.quantity + marketData.price * quantity) / totalQuantity;
          
          setPortfolio(portfolio.map(item =>
            item.ticker === selectedTicker
              ? { ...item, quantity: totalQuantity, avgPrice, currentPrice: marketData.price }
              : item
          ));
        } else {
          setPortfolio([...portfolio, {
            ticker: selectedTicker,
            quantity,
            avgPrice: marketData.price,
            currentPrice: marketData.price,
            purchaseDate: new Date()
          }]);
        }
      }
    } else {
      const item = portfolio.find(p => p.ticker === selectedTicker);
      if (item && item.quantity >= quantity) {
        const revenue = marketData.price * quantity;
        const fee = revenue * 0.00015;
        const tax = revenue * 0.0023; // 거래세 0.23%
        
        setCash(cash + revenue - fee - tax);
        
        if (item.quantity === quantity) {
          setPortfolio(portfolio.filter(p => p.ticker !== selectedTicker));
        } else {
          setPortfolio(portfolio.map(p =>
            p.ticker === selectedTicker
              ? { ...p, quantity: p.quantity - quantity }
              : p
          ));
        }
      }
    }
  };
  
  const totalAssets = cash + portfolio.reduce((sum, item) => 
    sum + (item.currentPrice * item.quantity), 0
  );
  
  const totalProfitLoss = portfolio.reduce((sum, item) => 
    sum + ((item.currentPrice - item.avgPrice) * item.quantity), 0
  );
  
  const profitLossPercent = (totalProfitLoss / (totalAssets - totalProfitLoss)) * 100;
  
  if (!marketData) return <div>Loading...</div>;
  
  return (
    <div className="space-y-6">
      {/* 종목 선택 및 시뮬레이션 컨트롤 */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <select
              value={selectedTicker}
              onChange={(e) => setSelectedTicker(e.target.value)}
              className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            >
              {tickers.map(ticker => (
                <option key={ticker} value={ticker}>{ticker}</option>
              ))}
            </select>
            
            <button
              onClick={() => setIsSimulating(!isSimulating)}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                isSimulating
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isSimulating ? '시뮬레이션 중지' : '실시간 시뮬레이션 시작'}
            </button>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-gray-500">총 자산</div>
            <div className="text-2xl font-bold">
              ₩{totalAssets.toLocaleString()}
            </div>
            <div className={`text-sm ${totalProfitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalProfitLoss >= 0 ? '+' : ''}{totalProfitLoss.toLocaleString()} 
              ({profitLossPercent >= 0 ? '+' : ''}{profitLossPercent.toFixed(2)}%)
            </div>
          </div>
        </div>
        
        {/* 현재가 정보 */}
        <div className="grid grid-cols-4 gap-4">
          <div>
            <div className="text-sm text-gray-500">현재가</div>
            <div className="text-xl font-bold">₩{marketData.price.toLocaleString()}</div>
            <div className={`text-sm ${marketData.change >= 0 ? 'text-red-600' : 'text-blue-600'}`}>
              {marketData.change >= 0 ? '▲' : '▼'} {Math.abs(marketData.change).toLocaleString()} 
              ({marketData.changePercent >= 0 ? '+' : ''}{marketData.changePercent.toFixed(2)}%)
            </div>
          </div>
          
          <div>
            <div className="text-sm text-gray-500">거래량</div>
            <div className="text-lg font-medium">{marketData.volume.toLocaleString()}</div>
          </div>
          
          <div>
            <div className="text-sm text-gray-500">시가총액</div>
            <div className="text-lg font-medium">₩{(marketData.marketCap / 1000000000000).toFixed(2)}조</div>
          </div>
          
          <div>
            <div className="text-sm text-gray-500">52주 베타</div>
            <div className="text-lg font-medium">{marketData.beta.toFixed(2)}</div>
          </div>
        </div>
      </div>
      
      {/* AI 매매 신호 */}
      {tradingSignal && (
        <div className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-2 ${
          tradingSignal.type === 'buy' ? 'border-green-500' :
          tradingSignal.type === 'sell' ? 'border-red-500' : 'border-gray-300'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Brain className="w-6 h-6 text-purple-600" />
              <h3 className="text-lg font-semibold">AI 매매 신호</h3>
            </div>
            
            <div className={`px-4 py-2 rounded-lg font-bold ${
              tradingSignal.type === 'buy' ? 'bg-green-100 text-green-700' :
              tradingSignal.type === 'sell' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
            }`}>
              {tradingSignal.type === 'buy' ? '매수' :
               tradingSignal.type === 'sell' ? '매도' : '관망'}
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">신호 강도</span>
              <span className="text-sm font-medium">{tradingSignal.strength}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  tradingSignal.type === 'buy' ? 'bg-green-500' :
                  tradingSignal.type === 'sell' ? 'bg-red-500' : 'bg-gray-500'
                }`}
                style={{ width: `${tradingSignal.strength}%` }}
              />
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">분석 근거</h4>
            <ul className="space-y-1">
              {tradingSignal.reasons.map((reason, index) => (
                <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                  <span>•</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      {/* 기술적 지표 */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            기술적 지표
          </h3>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-500">RSI (14)</span>
                <span className="text-sm font-medium">{marketData.rsi.toFixed(2)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full ${
                    marketData.rsi < 30 ? 'bg-green-500' :
                    marketData.rsi > 70 ? 'bg-red-500' : 'bg-gray-500'
                  }`}
                  style={{ width: `${marketData.rsi}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="text-sm text-gray-500 mb-1">MACD</div>
              <div className="text-xs space-y-1">
                <div>MACD: {marketData.macd.value.toFixed(2)}</div>
                <div>Signal: {marketData.macd.signal.toFixed(2)}</div>
                <div className={marketData.macd.histogram > 0 ? 'text-green-600' : 'text-red-600'}>
                  Histogram: {marketData.macd.histogram.toFixed(2)}
                </div>
              </div>
            </div>
            
            <div>
              <div className="text-sm text-gray-500 mb-1">볼린저 밴드</div>
              <div className="text-xs space-y-1">
                <div>상단: ₩{marketData.bollingerBands.upper.toLocaleString()}</div>
                <div>중단: ₩{marketData.bollingerBands.middle.toLocaleString()}</div>
                <div>하단: ₩{marketData.bollingerBands.lower.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-green-600" />
            가치평가 지표
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">PER</span>
              <span className="text-sm font-medium">{marketData.per.toFixed(2)}배</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">PBR</span>
              <span className="text-sm font-medium">{marketData.pbr.toFixed(2)}배</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">ROE</span>
              <span className="text-sm font-medium">{marketData.roe.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">EPS</span>
              <span className="text-sm font-medium">₩{marketData.eps.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">BPS</span>
              <span className="text-sm font-medium">₩{marketData.bps.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">배당수익률</span>
              <span className="text-sm font-medium">{marketData.dividendYield.toFixed(2)}%</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-purple-600" />
            리스크 지표
          </h3>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-500">변동성</span>
                <span className="text-sm font-medium">{marketData.volatility.toFixed(2)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full ${
                    marketData.volatility < 20 ? 'bg-green-500' :
                    marketData.volatility > 40 ? 'bg-red-500' : 'bg-yellow-500'
                  }`}
                  style={{ width: `${Math.min(marketData.volatility * 2, 100)}%` }}
                />
              </div>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">베타</span>
              <span className={`text-sm font-medium ${
                marketData.beta < 1 ? 'text-green-600' :
                marketData.beta > 1.5 ? 'text-red-600' : 'text-yellow-600'
              }`}>
                {marketData.beta.toFixed(2)}
              </span>
            </div>
            
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                <div className="text-xs">
                  <p className="font-medium text-yellow-800 dark:text-yellow-200">리스크 평가</p>
                  <p className="text-yellow-700 dark:text-yellow-300 mt-1">
                    {marketData.volatility > 40 ? '고위험' :
                     marketData.volatility > 20 ? '중간 위험' : '저위험'} 종목
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 매매 패널 */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h3 className="font-semibold mb-4">매매 주문</h3>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium mb-3 text-green-600">매수 주문</h4>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-500">수량</label>
                <input
                  type="number"
                  id="buyQuantity"
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  placeholder="0"
                />
              </div>
              <div>
                <div className="text-sm text-gray-500">예상 금액</div>
                <div className="text-lg font-medium">₩0</div>
              </div>
              <button
                onClick={() => {
                  const quantity = parseInt((document.getElementById('buyQuantity') as HTMLInputElement).value);
                  if (quantity > 0) executeTrade('buy', quantity);
                }}
                className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                매수 주문
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-3 text-red-600">매도 주문</h4>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-500">수량</label>
                <input
                  type="number"
                  id="sellQuantity"
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  placeholder="0"
                />
              </div>
              <div>
                <div className="text-sm text-gray-500">예상 금액</div>
                <div className="text-lg font-medium">₩0</div>
              </div>
              <button
                onClick={() => {
                  const quantity = parseInt((document.getElementById('sellQuantity') as HTMLInputElement).value);
                  if (quantity > 0) executeTrade('sell', quantity);
                }}
                className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                매도 주문
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* 포트폴리오 현황 */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <PieChart className="w-5 h-5 text-orange-600" />
          포트폴리오 현황
        </h3>
        
        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-gray-500">현금</div>
              <div className="font-medium">₩{cash.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-gray-500">주식 평가액</div>
              <div className="font-medium">₩{(totalAssets - cash).toLocaleString()}</div>
            </div>
            <div>
              <div className="text-gray-500">총 수익률</div>
              <div className={`font-medium ${totalProfitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {profitLossPercent >= 0 ? '+' : ''}{profitLossPercent.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>
        
        {portfolio.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="text-left py-2">종목</th>
                  <th className="text-right py-2">수량</th>
                  <th className="text-right py-2">평균단가</th>
                  <th className="text-right py-2">현재가</th>
                  <th className="text-right py-2">평가손익</th>
                  <th className="text-right py-2">수익률</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.map((item, index) => {
                  const profitLoss = (item.currentPrice - item.avgPrice) * item.quantity;
                  const profitLossPercent = ((item.currentPrice - item.avgPrice) / item.avgPrice) * 100;
                  
                  return (
                    <tr key={index} className="border-b dark:border-gray-700">
                      <td className="py-2">{item.ticker}</td>
                      <td className="text-right py-2">{item.quantity.toLocaleString()}</td>
                      <td className="text-right py-2">₩{item.avgPrice.toLocaleString()}</td>
                      <td className="text-right py-2">₩{item.currentPrice.toLocaleString()}</td>
                      <td className={`text-right py-2 ${profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {profitLoss >= 0 ? '+' : ''}₩{profitLoss.toLocaleString()}
                      </td>
                      <td className={`text-right py-2 ${profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {profitLossPercent >= 0 ? '+' : ''}{profitLossPercent.toFixed(2)}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500 py-8">보유 종목이 없습니다</p>
        )}
      </div>
    </div>
  );
}