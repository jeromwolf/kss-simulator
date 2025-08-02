'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Zap, AlertTriangle, TrendingDown, CheckCircle, Code, Database, FileCode, Settings } from 'lucide-react'

interface GasAnalysis {
  original: number
  optimized: number
  savings: number
  percentage: number
  issues: GasIssue[]
  recommendations: string[]
}

interface GasIssue {
  type: 'critical' | 'warning' | 'info'
  line: number
  description: string
  gasCost: number
  solution: string
}

const sampleContracts = {
  inefficient: `// ❌ 비효율적인 컨트랙트
pragma solidity ^0.8.0;

contract InefficientStorage {
    uint8 a;      // Slot 0 (1 byte used, 31 wasted)
    uint256 b;    // Slot 1 (32 bytes)
    uint8 c;      // Slot 2 (1 byte used, 31 wasted)
    address owner;// Slot 3 (20 bytes used, 12 wasted)
    
    uint[] public data;
    mapping(address => uint) balances;
    
    function inefficientLoop() public {
        for(uint i = 0; i < data.length; i++) {  // length 매번 읽기
            data[i] = data[i] * 2;
        }
    }
    
    function publicFunction() public {  // public보다 external이 효율적
        // some logic
    }
    
    function redundantStorage() public {
        balances[msg.sender] = balances[msg.sender] + 1;  // storage 2번 읽기
    }
}`,
  optimized: `// ✅ 최적화된 컨트랙트
pragma solidity ^0.8.0;

contract OptimizedStorage {
    // Variables packed in single slot
    uint8 a;      // Slot 0, byte 0
    uint8 c;      // Slot 0, byte 1
    address owner;// Slot 0, bytes 2-21 (total: 22 bytes in 1 slot)
    uint256 b;    // Slot 1
    
    uint[] public data;
    mapping(address => uint) balances;
    
    function efficientLoop() external {
        uint length = data.length;  // Cache length
        for(uint i = 0; i < length; ++i) {  // Use ++i
            data[i] <<= 1;  // Bitshift instead of multiplication
        }
    }
    
    function externalFunction() external {  // Use external
        // some logic
    }
    
    function optimizedStorage() external {
        uint balance = balances[msg.sender];  // Read once
        balances[msg.sender] = balance + 1;   // Write once
    }
}`
}

export default function GasOptimizerPage() {
  const [code, setCode] = useState(sampleContracts.inefficient)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<GasAnalysis | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<'inefficient' | 'optimized'>('inefficient')
  const [gasPrice, setGasPrice] = useState(30) // Gwei
  const [ethPrice, setEthPrice] = useState(3800) // USD

  const analyzeContract = () => {
    setIsAnalyzing(true)
    
    setTimeout(() => {
      const issues: GasIssue[] = []
      const recommendations: string[] = []
      
      // Pattern detection
      if (code.includes('uint8') && code.includes('uint256') && code.includes('uint8')) {
        issues.push({
          type: 'critical',
          line: 4,
          description: 'Storage 변수 패킹 미적용',
          gasCost: 20000,
          solution: '작은 타입 변수들을 연속으로 배치하여 하나의 슬롯에 패킹'
        })
      }
      
      if (code.includes('data.length') && code.includes('for')) {
        issues.push({
          type: 'warning',
          line: 11,
          description: '루프에서 배열 길이 반복 접근',
          gasCost: 2100,
          solution: '배열 길이를 로컬 변수에 캐싱'
        })
      }
      
      if (code.includes('i++')) {
        issues.push({
          type: 'info',
          line: 11,
          description: 'i++ 대신 ++i 사용 권장',
          gasCost: 5,
          solution: '++i는 임시 변수를 생성하지 않아 더 효율적'
        })
      }
      
      if (code.includes('* 2')) {
        issues.push({
          type: 'info',
          line: 12,
          description: '곱셈 대신 비트 시프트 사용 가능',
          gasCost: 3,
          solution: '<< 1 사용으로 gas 절약'
        })
      }
      
      if (code.includes('function publicFunction() public')) {
        issues.push({
          type: 'warning',
          line: 15,
          description: 'public 대신 external 사용 가능',
          gasCost: 100,
          solution: '외부에서만 호출되는 함수는 external 사용'
        })
      }
      
      if (code.includes('balances[msg.sender]') && code.match(/balances\[msg\.sender\]/g)?.length! > 1) {
        issues.push({
          type: 'critical',
          line: 19,
          description: 'Storage 변수 중복 접근',
          gasCost: 2100,
          solution: '로컬 변수에 저장 후 사용'
        })
      }
      
      // Calculate gas costs
      const originalGas = 150000 + issues.reduce((sum, issue) => sum + issue.gasCost, 0)
      const optimizedGas = 100000
      const savings = originalGas - optimizedGas
      
      // Add recommendations
      if (issues.some(i => i.type === 'critical')) {
        recommendations.push('Storage 최적화가 가장 큰 절감 효과를 가져옵니다')
      }
      recommendations.push('Solidity 0.8.19+ 버전 사용을 권장합니다')
      recommendations.push('OpenZeppelin 라이브러리 활용으로 검증된 패턴 사용')
      recommendations.push('Hardhat gas-reporter로 실제 gas 사용량 측정')
      
      setAnalysis({
        original: originalGas,
        optimized: optimizedGas,
        savings,
        percentage: Math.round((savings / originalGas) * 100),
        issues,
        recommendations
      })
      
      setIsAnalyzing(false)
    }, 2000)
  }

  const loadTemplate = (template: 'inefficient' | 'optimized') => {
    setCode(sampleContracts[template])
    setSelectedTemplate(template)
    setAnalysis(null)
  }

  const calculateCost = (gas: number) => {
    const ethCost = (gas * gasPrice) / 1000000000
    const usdCost = ethCost * ethPrice
    return { eth: ethCost.toFixed(6), usd: usdCost.toFixed(2) }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-cyan-50 dark:from-gray-900 dark:via-indigo-900/10 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link
          href="/modules/web3"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Web3 & Blockchain으로 돌아가기
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Gas 최적화 도구
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  스마트 컨트랙트 Gas 사용량 분석 및 최적화
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Gas Price:</span>
                <input
                  type="number"
                  value={gasPrice}
                  onChange={(e) => setGasPrice(parseInt(e.target.value))}
                  className="ml-2 w-16 px-2 py-1 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                />
                <span className="ml-1 text-gray-600 dark:text-gray-400">Gwei</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">ETH:</span>
                <span className="ml-2 font-semibold text-gray-900 dark:text-white">${ethPrice}</span>
              </div>
            </div>
          </div>

          {/* Template Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              예제 컨트랙트
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => loadTemplate('inefficient')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedTemplate === 'inefficient'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900/30'
                }`}
              >
                ❌ 비효율적 코드
              </button>
              <button
                onClick={() => loadTemplate('optimized')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedTemplate === 'optimized'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/30'
                }`}
              >
                ✅ 최적화된 코드
              </button>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Code Editor */}
            <div className="col-span-7">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-1">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-t-lg px-4 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      contract.sol
                    </span>
                  </div>
                  <button
                    onClick={analyzeContract}
                    disabled={isAnalyzing}
                    className="px-4 py-1 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Zap className="w-4 h-4" />
                    {isAnalyzing ? '분석 중...' : 'Gas 분석'}
                  </button>
                </div>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-96 p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-mono text-sm resize-none focus:outline-none"
                  spellCheck={false}
                />
              </div>
            </div>

            {/* Analysis Results */}
            <div className="col-span-5 space-y-4">
              {analysis && (
                <>
                  {/* Gas Summary */}
                  <div className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-xl p-6">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4">Gas 분석 결과</h3>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                        <div className="text-xs text-gray-600 dark:text-gray-400">현재 Gas</div>
                        <div className="text-xl font-bold text-red-600 dark:text-red-400">
                          {analysis.original.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          ${calculateCost(analysis.original).usd}
                        </div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                        <div className="text-xs text-gray-600 dark:text-gray-400">최적화 후</div>
                        <div className="text-xl font-bold text-green-600 dark:text-green-400">
                          {analysis.optimized.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          ${calculateCost(analysis.optimized).usd}
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-3 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold text-green-800 dark:text-green-400">
                          총 절감량
                        </div>
                        <div className="text-2xl font-bold text-green-800 dark:text-green-400">
                          {analysis.percentage}% 절감
                        </div>
                      </div>
                      <TrendingDown className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                  </div>

                  {/* Issues */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4">발견된 이슈</h3>
                    
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {analysis.issues.map((issue, idx) => (
                        <div
                          key={idx}
                          className={`p-3 rounded-lg border ${
                            issue.type === 'critical'
                              ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700'
                              : issue.type === 'warning'
                              ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700'
                              : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700'
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            {issue.type === 'critical' ? (
                              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                            ) : issue.type === 'warning' ? (
                              <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                            ) : (
                              <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                            )}
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                  Line {issue.line}: {issue.description}
                                </span>
                                <span className="text-xs text-gray-600 dark:text-gray-400">
                                  {issue.gasCost} gas
                                </span>
                              </div>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                💡 {issue.solution}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-3">추천 사항</h3>
                    <ul className="space-y-2">
                      {analysis.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              {!analysis && (
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 text-center">
                  <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    컨트랙트 코드를 입력하고 'Gas 분석' 버튼을 클릭하세요
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Gas Optimization Tips */}
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            💡 Gas 최적화 베스트 프랙티스
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                <Database className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                Storage 최적화
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• 변수 패킹으로 슬롯 절약</li>
                <li>• 불필요한 storage 접근 최소화</li>
                <li>• Memory 변수 활용</li>
                <li>• Mapping vs Array 선택</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                <Code className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                코드 패턴
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Short-circuit 조건문</li>
                <li>• Unchecked 블록 활용</li>
                <li>• 비트 연산자 사용</li>
                <li>• 이벤트 로그 활용</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                <Settings className="w-5 h-5 text-red-600 dark:text-red-400" />
                함수 최적화
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• External vs Public</li>
                <li>• View/Pure 함수 활용</li>
                <li>• Modifier 최적화</li>
                <li>• Batch 연산 구현</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}