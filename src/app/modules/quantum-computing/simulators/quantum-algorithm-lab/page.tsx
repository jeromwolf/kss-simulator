'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { Play, RotateCcw, Zap, Brain, Clock, TrendingUp } from 'lucide-react'

interface AlgorithmStep {
  step: number
  description: string
  circuit: string[]
  state: string
  measurement?: number[]
}

interface AlgorithmResult {
  success: boolean
  iterations: number
  output: string
  probability: number
}

const ALGORITHMS = {
  'deutsch-jozsa': {
    name: 'Deutsch-Jozsa 알고리즘',
    description: '함수가 상수인지 균형인지 한 번의 호출로 판별',
    qubits: 3,
    steps: [
      {
        step: 1,
        description: '초기 상태: |000⟩',
        circuit: ['|0⟩', '|0⟩', '|0⟩'],
        state: '|000⟩'
      },
      {
        step: 2,
        description: 'Hadamard 게이트로 중첩 상태 생성',
        circuit: ['H|0⟩', 'H|0⟩', '|0⟩'],
        state: '(|00⟩ + |01⟩ + |10⟩ + |11⟩)|0⟩/2'
      },
      {
        step: 3,
        description: 'Oracle 함수 적용',
        circuit: ['H|0⟩', 'H|0⟩', 'Uf|0⟩'],
        state: '±(|00⟩ + |01⟩ + |10⟩ + |11⟩)|f⟩/2'
      },
      {
        step: 4,
        description: '다시 Hadamard 적용',
        circuit: ['H²|0⟩', 'H²|0⟩', 'Uf|0⟩'],
        state: '상수: |00⟩|f⟩, 균형: |xy⟩|f⟩'
      }
    ]
  },
  'grover': {
    name: 'Grover 알고리즘',
    description: '정렬되지 않은 데이터베이스에서 O(√N) 시간에 검색',
    qubits: 2,
    steps: [
      {
        step: 1,
        description: '초기 상태를 중첩으로 준비',
        circuit: ['H|0⟩', 'H|0⟩'],
        state: '(|00⟩ + |01⟩ + |10⟩ + |11⟩)/2'
      },
      {
        step: 2,
        description: 'Oracle: 목표 상태에 위상 반전',
        circuit: ['Oracle', 'Oracle'],
        state: '(|00⟩ + |01⟩ + |10⟩ - |11⟩)/2'
      },
      {
        step: 3,
        description: 'Diffusion: 평균 주위로 반사',
        circuit: ['Diffusion', 'Diffusion'],
        state: '(-|00⟩ - |01⟩ - |10⟩ + |11⟩)/2'
      },
      {
        step: 4,
        description: '반복하여 목표 확률 증폭',
        circuit: ['Grover', 'Grover'],
        state: '목표 상태 |11⟩ 확률 증가'
      }
    ]
  },
  'shor': {
    name: 'Shor 알고리즘',
    description: '큰 수를 효율적으로 소인수분해',
    qubits: 4,
    steps: [
      {
        step: 1,
        description: '입력 레지스터 초기화',
        circuit: ['H|0⟩', 'H|0⟩', '|0⟩', '|0⟩'],
        state: '(|00⟩ + |01⟩ + |10⟩ + |11⟩)|00⟩/2'
      },
      {
        step: 2,
        description: '모듈러 지수함수 계산',
        circuit: ['H|0⟩', 'H|0⟩', 'f(x)', 'f(x)'],
        state: '∑|x⟩|a^x mod N⟩'
      },
      {
        step: 3,
        description: '출력 레지스터 측정',
        circuit: ['H|0⟩', 'H|0⟩', 'Measure', 'Measure'],
        state: '|x⟩가 같은 f(x) 값을 가진 상태들의 중첩'
      },
      {
        step: 4,
        description: 'QFT로 주기 찾기',
        circuit: ['QFT†', 'QFT†', 'Measured', 'Measured'],
        state: '주기 r에 관련된 상태 |k·2ⁿ/r⟩'
      }
    ]
  }
}

export default function QuantumAlgorithmLab() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<keyof typeof ALGORITHMS>('deutsch-jozsa')
  const [currentStep, setCurrentStep] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [results, setResults] = useState<AlgorithmResult | null>(null)
  const [executionLog, setExecutionLog] = useState<string[]>([])
  const intervalRef = useRef<NodeJS.Timeout>()

  const algorithm = ALGORITHMS[selectedAlgorithm]

  // 알고리즘 실행
  const runAlgorithm = useCallback(async () => {
    setIsRunning(true)
    setCurrentStep(0)
    setResults(null)
    setExecutionLog([`🚀 ${algorithm.name} 실행 시작...`])

    // 단계별 실행
    for (let i = 0; i < algorithm.steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setCurrentStep(i)
      setExecutionLog(prev => [...prev, `Step ${i + 1}: ${algorithm.steps[i].description}`])
    }

    // 결과 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    let simulatedResult: AlgorithmResult
    
    switch (selectedAlgorithm) {
      case 'deutsch-jozsa':
        simulatedResult = {
          success: Math.random() > 0.1, // 90% 성공률
          iterations: 1,
          output: Math.random() > 0.5 ? '상수 함수' : '균형 함수',
          probability: 1.0
        }
        break
      
      case 'grover':
        const iterations = Math.ceil(Math.PI / 4 * Math.sqrt(4)) // √N iterations
        simulatedResult = {
          success: Math.random() > 0.15, // 85% 성공률
          iterations,
          output: '목표 항목: |11⟩',
          probability: Math.sin((2 * iterations + 1) * Math.PI / 4) ** 2
        }
        break
      
      case 'shor':
        simulatedResult = {
          success: Math.random() > 0.3, // 70% 성공률
          iterations: Math.floor(Math.random() * 10) + 5,
          output: '소인수: 3 × 5 = 15',
          probability: 0.75
        }
        break
      
      default:
        simulatedResult = {
          success: true,
          iterations: 1,
          output: '알고리즘 완료',
          probability: 1.0
        }
    }

    setResults(simulatedResult)
    setExecutionLog(prev => [
      ...prev,
      `✅ 알고리즘 완료!`,
      `결과: ${simulatedResult.output}`,
      `성공 여부: ${simulatedResult.success ? '성공' : '실패'}`,
      `확률: ${(simulatedResult.probability * 100).toFixed(1)}%`
    ])
    
    setIsRunning(false)
  }, [algorithm, selectedAlgorithm])

  // 리셋
  const resetAlgorithm = useCallback(() => {
    setCurrentStep(0)
    setIsRunning(false)
    setResults(null)
    setExecutionLog([])
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }, [])

  // 알고리즘 변경 시 리셋
  useEffect(() => {
    resetAlgorithm()
  }, [selectedAlgorithm, resetAlgorithm])

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
            <Brain className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">양자 알고리즘 실험실</h1>
            <p className="text-xl text-white/90">유명한 양자 알고리즘들을 단계별로 실행하고 분석하세요</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Algorithm Execution */}
        <div className="lg:col-span-2 space-y-6">
          {/* Algorithm Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">알고리즘 선택</h2>
            
            <div className="grid gap-4">
              {Object.entries(ALGORITHMS).map(([key, algo]) => (
                <div
                  key={key}
                  className={`
                    p-4 rounded-lg border-2 cursor-pointer transition-all
                    ${selectedAlgorithm === key 
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                      : 'border-gray-200 dark:border-gray-600 hover:border-purple-300'
                    }
                  `}
                  onClick={() => setSelectedAlgorithm(key as keyof typeof ALGORITHMS)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">{algo.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{algo.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>큐비트: {algo.qubits}개</span>
                        <span>단계: {algo.steps.length}개</span>
                      </div>
                    </div>
                    {selectedAlgorithm === key && (
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={runAlgorithm}
                disabled={isRunning}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isRunning ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    실행 중...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    알고리즘 실행
                  </>
                )}
              </button>
              
              <button
                onClick={resetAlgorithm}
                className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                리셋
              </button>
            </div>
          </div>

          {/* Step Visualization */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">단계별 실행</h2>
            
            <div className="space-y-4">
              {algorithm.steps.map((step, index) => (
                <div
                  key={index}
                  className={`
                    p-4 rounded-lg border transition-all
                    ${index <= currentStep 
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                      : 'border-gray-200 dark:border-gray-600'
                    }
                    ${index === currentStep && isRunning ? 'ring-2 ring-purple-300 animate-pulse' : ''}
                  `}
                >
                  <div className="flex items-start gap-4">
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                      ${index <= currentStep 
                        ? 'bg-purple-500 text-white' 
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                      }
                    `}>
                      {step.step}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{step.description}</h3>
                      <div className="mt-2 grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">회로:</div>
                          <div className="font-mono text-sm bg-gray-100 dark:bg-gray-700 rounded p-2">
                            {step.circuit.join(' → ')}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">상태:</div>
                          <div className="font-mono text-sm bg-gray-100 dark:bg-gray-700 rounded p-2">
                            {step.state}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {index <= currentStep && (
                      <div className="text-green-500">
                        ✓
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Results */}
          {results && (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                실행 결과
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">실행 결과:</span>
                    <span className={`font-bold ${results.success ? 'text-green-600' : 'text-red-600'}`}>
                      {results.success ? '성공' : '실패'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">반복 횟수:</span>
                    <span className="font-bold text-gray-900 dark:text-white">{results.iterations}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">성공 확률:</span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {(results.probability * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
                
                <div>
                  <div className="text-gray-600 dark:text-gray-400 mb-2">출력:</div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="font-mono text-sm text-gray-900 dark:text-white">
                      {results.output}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Algorithm Info */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">알고리즘 정보</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{algorithm.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{algorithm.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{algorithm.qubits}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">큐비트</div>
                </div>
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{algorithm.steps.length}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">단계</div>
                </div>
              </div>
            </div>
          </div>

          {/* Execution Log */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              실행 로그
            </h2>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 max-h-64 overflow-y-auto">
              {executionLog.length > 0 ? (
                <div className="space-y-2">
                  {executionLog.map((log, index) => (
                    <div key={index} className="text-sm font-mono text-gray-700 dark:text-gray-300">
                      <span className="text-gray-500 dark:text-gray-400">[{index + 1}]</span> {log}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
                  알고리즘을 실행하면 로그가 표시됩니다
                </div>
              )}
            </div>
          </div>

          {/* Complexity Analysis */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              복잡도 분석
            </h2>
            
            <div className="space-y-4">
              {selectedAlgorithm === 'deutsch-jozsa' && (
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">시간 복잡도:</div>
                  <div className="font-mono text-lg text-green-600 dark:text-green-400">O(1)</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    고전: O(2^(n-1)+1) → 양자: O(1)
                  </div>
                </div>
              )}
              
              {selectedAlgorithm === 'grover' && (
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">시간 복잡도:</div>
                  <div className="font-mono text-lg text-green-600 dark:text-green-400">O(√N)</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    고전: O(N) → 양자: O(√N)
                  </div>
                </div>
              )}
              
              {selectedAlgorithm === 'shor' && (
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">시간 복잡도:</div>
                  <div className="font-mono text-lg text-green-600 dark:text-green-400">O((log N)³)</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    고전: 지수적 → 양자: 다항식적
                  </div>
                </div>
              )}
              
              <div className="text-xs text-gray-500 dark:text-gray-400">
                💡 양자 우위는 특정 문제에서만 나타납니다
              </div>
            </div>
          </div>

          {/* Quick Guide */}
          <div className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🎓 사용 가이드</h2>
            
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <p>• 알고리즘을 선택하고 "실행" 버튼 클릭</p>
              <p>• 각 단계의 양자 상태 변화 관찰</p>
              <p>• 실행 로그로 세부 과정 확인</p>
              <p>• 복잡도 분석으로 양자 우위 이해</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}