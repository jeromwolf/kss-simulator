'use client';

import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';

interface StockData {
  name: string;
  price: number;
  eps: number; // 주당순이익
  per: number;
  industry: string;
  evaluation: 'undervalued' | 'fair' | 'overvalued';
}

const sampleStocks: StockData[] = [
  { name: '삼성전자', price: 70000, eps: 5000, per: 14, industry: '반도체', evaluation: 'fair' },
  { name: '카카오', price: 50000, eps: 1666, per: 30, industry: 'IT서비스', evaluation: 'overvalued' },
  { name: 'LG화학', price: 400000, eps: 50000, per: 8, industry: '화학', evaluation: 'undervalued' },
  { name: '셀트리온', price: 180000, eps: 4500, per: 40, industry: '바이오', evaluation: 'fair' }
];

const industryRanges: Record<string, { min: number; max: number }> = {
  '반도체': { min: 8, max: 15 },
  'IT서비스': { min: 15, max: 25 },
  '화학': { min: 6, max: 12 },
  '바이오': { min: 20, max: 40 }
};

export const PERCalculator: React.FC = () => {
  const [selectedStock, setSelectedStock] = useState<StockData>(sampleStocks[0]);
  const [customPrice, setCustomPrice] = useState<number>(70000);
  const [customEPS, setCustomEPS] = useState<number>(5000);
  const [calculatedPER, setCalculatedPER] = useState<number>(14);
  const [evaluation, setEvaluation] = useState<string>('적정');

  // PER 계산 및 평가
  useEffect(() => {
    const per = Math.round((customPrice / customEPS) * 10) / 10;
    setCalculatedPER(per);
    
    const range = industryRanges[selectedStock.industry];
    if (per < range.min) {
      setEvaluation('저평가 (매수 검토)');
    } else if (per > range.max) {
      setEvaluation('고평가 (주의 필요)');
    } else {
      setEvaluation('적정 평가');
    }
  }, [customPrice, customEPS, selectedStock.industry]);

  const getEvaluationColor = (evalText: string) => {
    if (evalText.includes('저평가')) return 'text-green-600 bg-green-100 dark:bg-green-900/20';
    if (evalText.includes('고평가')) return 'text-red-600 bg-red-100 dark:bg-red-900/20';
    return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
  };

  const getEvaluationIcon = (evalText: string) => {
    if (evalText.includes('저평가')) return <TrendingUp className="w-4 h-4" />;
    if (evalText.includes('고평가')) return <TrendingDown className="w-4 h-4" />;
    return <CheckCircle className="w-4 h-4" />;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2 mb-2">
          <Calculator className="w-6 h-6 text-blue-500" />
          PER 실전 계산기
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          실제 종목으로 PER을 계산하고 투자 판단을 내려보세요
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 종목 선택 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <h3 className="font-semibold mb-4">📈 종목 선택</h3>
          <div className="grid grid-cols-2 gap-2">
            {sampleStocks.map((stock) => (
              <button
                key={stock.name}
                onClick={() => {
                  setSelectedStock(stock);
                  setCustomPrice(stock.price);
                  setCustomEPS(stock.eps);
                }}
                className={`p-3 rounded-lg border transition-colors ${
                  selectedStock.name === stock.name
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <div className="text-sm font-medium">{stock.name}</div>
                <div className="text-xs text-gray-500">PER {stock.per}배</div>
              </button>
            ))}
          </div>
        </div>

        {/* PER 계산 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <h3 className="font-semibold mb-4">🧮 PER 계산</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">주가 (원)</label>
              <input
                type="number"
                value={customPrice}
                onChange={(e) => setCustomPrice(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                placeholder="주가를 입력하세요"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">주당순이익 (원)</label>
              <input
                type="number"
                value={customEPS}
                onChange={(e) => setCustomEPS(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                placeholder="주당순이익을 입력하세요"
              />
            </div>

            <div className="border-t pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  PER {calculatedPER.toFixed(1)}배
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {customPrice.toLocaleString()}원 ÷ {customEPS.toLocaleString()}원
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 평가 결과 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
        <h3 className="font-semibold mb-4">📊 투자 판단</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 현재 평가 */}
          <div className={`p-4 rounded-lg ${getEvaluationColor(evaluation)}`}>
            <div className="flex items-center gap-2 mb-2">
              {getEvaluationIcon(evaluation)}
              <span className="font-medium">현재 평가</span>
            </div>
            <div className="text-lg font-bold">{evaluation}</div>
          </div>

          {/* 업종 기준 */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-yellow-500" />
              <span className="font-medium">업종 기준</span>
            </div>
            <div className="text-sm">
              <div className="font-medium">{selectedStock.industry}</div>
              <div className="text-gray-600 dark:text-gray-400">
                적정 PER: {industryRanges[selectedStock.industry].min}-{industryRanges[selectedStock.industry].max}배
              </div>
            </div>
          </div>

          {/* 비교 분석 */}
          <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-indigo-500" />
              <span className="font-medium">시장 비교</span>
            </div>
            <div className="text-sm">
              <div>코스피 평균: 12.5배</div>
              <div>코스닥 평균: 18.2배</div>
            </div>
          </div>
        </div>
      </div>

      {/* 교육 내용 */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6">
        <h3 className="font-semibold mb-4">💡 PER 실전 투자 꿀팁</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-green-600 mb-2">✅ 이럴 때 좋아요</h4>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300">
              <li>• 동일 업종 기업들 비교할 때</li>
              <li>• 과거 PER과 현재 비교할 때</li>
              <li>• 시장 전체와 비교할 때</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-red-600 mb-2">❌ 이럴 때 주의하세요</h4>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300">
              <li>• 적자 기업 (EPS가 음수)</li>
              <li>• 일회성 이익이 큰 기업</li>
              <li>• 업종이 다른 기업끼리 비교</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};