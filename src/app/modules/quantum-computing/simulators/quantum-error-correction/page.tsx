'use client'

import { useState, useCallback, useEffect } from 'react'
import { AlertTriangle, Shield, Zap, RotateCcw, Play, Pause, Eye, Settings } from 'lucide-react'

interface QubitState {
  id: number
  state: '0' | '1' | 'error'
  isLogical: boolean
  syndrome?: string
}

interface ErrorCorrectionCode {
  name: string
  description: string
  physicalQubits: number
  logicalQubits: number
  errorThreshold: number
  correctionCapability: string
}

const ERROR_CODES: Record<string, ErrorCorrectionCode> = {
  'repetition': {
    name: '반복 부호 (Repetition Code)',
    description: '3개의 물리적 큐비트로 1개의 논리적 큐비트 보호',
    physicalQubits: 3,
    logicalQubits: 1,
    errorThreshold: 0.33,
    correctionCapability: '단일 비트 플립 오류'
  },
  'steane': {
    name: 'Steane 7-큐비트 부호',
    description: '7개의 물리적 큐비트로 1개의 논리적 큐비트 보호',
    physicalQubits: 7,
    logicalQubits: 1,
    errorThreshold: 0.14,
    correctionCapability: '임의의 단일 큐비트 오류'
  },
  'surface': {
    name: '표면 부호 (Surface Code)',
    description: '9개의 물리적 큐비트로 1개의 논리적 큐비트 보호',
    physicalQubits: 9,
    logicalQubits: 1,
    errorThreshold: 0.11,
    correctionCapability: '국소적인 오류들'
  }
}

interface ErrorEvent {
  time: number
  qubit: number
  errorType: 'bit-flip' | 'phase-flip' | 'both'
  detected: boolean
  corrected: boolean
}

export default function QuantumErrorCorrection() {
  const [selectedCode, setSelectedCode] = useState<keyof typeof ERROR_CODES>('repetition')
  const [qubits, setQubits] = useState<QubitState[]>([])
  const [errorRate, setErrorRate] = useState(0.1)
  const [isRunning, setIsRunning] = useState(false)
  const [errorHistory, setErrorHistory] = useState<ErrorEvent[]>([])
  const [syndrome, setSyndrome] = useState<string>('')
  const [detectionStats, setDetectionStats] = useState({
    totalErrors: 0,
    detectedErrors: 0,
    correctedErrors: 0,
    failedCorrections: 0
  })
  const [showSyndromes, setShowSyndromes] = useState(true)

  const code = ERROR_CODES[selectedCode]

  // 큐비트 초기화
  useEffect(() => {
    const newQubits: QubitState[] = []
    for (let i = 0; i < code.physicalQubits; i++) {
      newQubits.push({
        id: i,
        state: '0',
        isLogical: selectedCode === 'repetition' ? true : (i === 0), // 간단화
        syndrome: ''
      })
    }
    setQubits(newQubits)
    setErrorHistory([])
    setSyndrome('')
    setDetectionStats({
      totalErrors: 0,
      detectedErrors: 0,
      correctedErrors: 0,
      failedCorrections: 0
    })
  }, [selectedCode, code.physicalQubits])

  // 오류 주입
  const injectError = useCallback(() => {
    if (Math.random() > errorRate) return

    const errorQubit = Math.floor(Math.random() * qubits.length)
    const errorType = Math.random() > 0.8 ? 'both' : (Math.random() > 0.5 ? 'bit-flip' : 'phase-flip')
    
    setQubits(prev => prev.map(qubit => 
      qubit.id === errorQubit 
        ? { ...qubit, state: 'error' }
        : qubit
    ))

    const newError: ErrorEvent = {
      time: Date.now(),
      qubit: errorQubit,
      errorType,
      detected: false,
      corrected: false
    }

    setErrorHistory(prev => [...prev.slice(-20), newError])
    setDetectionStats(prev => ({ ...prev, totalErrors: prev.totalErrors + 1 }))

    return newError
  }, [errorRate, qubits.length])

  // 증후군 측정
  const measureSyndrome = useCallback(() => {
    const errorQubits = qubits.filter(q => q.state === 'error').map(q => q.id)
    
    let syndromeValue = ''
    let detected = false

    switch (selectedCode) {
      case 'repetition':
        // 3-큐비트 반복 부호의 증후군
        const parity1 = (qubits[0]?.state === 'error' ? 1 : 0) ^ (qubits[1]?.state === 'error' ? 1 : 0)
        const parity2 = (qubits[1]?.state === 'error' ? 1 : 0) ^ (qubits[2]?.state === 'error' ? 1 : 0)
        syndromeValue = `${parity1}${parity2}`
        detected = syndromeValue !== '00'
        break

      case 'steane':
        // 7-큐비트 Steane 부호 (간소화된 증후군)
        const x_syndrome = errorQubits.filter(q => q < 4).length % 2
        const z_syndrome = errorQubits.filter(q => q >= 4).length % 2
        syndromeValue = `X:${x_syndrome} Z:${z_syndrome}`
        detected = x_syndrome !== 0 || z_syndrome !== 0
        break

      case 'surface':
        // 표면 부호 (간소화된 증후군)
        const stabilizers = [
          [0, 1, 3, 4], // X-stabilizer
          [1, 2, 4, 5], // X-stabilizer
          [3, 4, 6, 7], // X-stabilizer
          [4, 5, 7, 8]  // X-stabilizer
        ]
        const syndromes = stabilizers.map(stab => 
          stab.filter(q => errorQubits.includes(q)).length % 2
        )
        syndromeValue = syndromes.join('')
        detected = syndromes.some(s => s !== 0)
        break
    }

    setSyndrome(syndromeValue)
    
    if (detected) {
      setDetectionStats(prev => ({ ...prev, detectedErrors: prev.detectedErrors + 1 }))
      
      // 증후군을 기반으로 오류 수정 시도
      const correctionSuccess = attemptCorrection(syndromeValue, errorQubits)
      
      if (correctionSuccess) {
        setDetectionStats(prev => ({ ...prev, correctedErrors: prev.correctedErrors + 1 }))
      } else {
        setDetectionStats(prev => ({ ...prev, failedCorrections: prev.failedCorrections + 1 }))
      }
    }

    return { syndromeValue, detected }
  }, [qubits, selectedCode])

  // 오류 수정 시도
  const attemptCorrection = useCallback((syndrome: string, errorQubits: number[]) => {
    if (errorQubits.length === 0) return true

    let correctionSuccess = false

    switch (selectedCode) {
      case 'repetition':
        if (syndrome === '10') {
          // 첫 번째 큐비트 오류
          correctionSuccess = errorQubits.includes(0)
        } else if (syndrome === '11') {
          // 두 번째 큐비트 오류
          correctionSuccess = errorQubits.includes(1)
        } else if (syndrome === '01') {
          // 세 번째 큐비트 오류
          correctionSuccess = errorQubits.includes(2)
        }
        break

      case 'steane':
      case 'surface':
        // 간소화: 단일 오류는 90% 확률로 수정 성공
        correctionSuccess = errorQubits.length === 1 && Math.random() > 0.1
        break
    }

    if (correctionSuccess) {
      setQubits(prev => prev.map(qubit => 
        errorQubits.includes(qubit.id) 
          ? { ...qubit, state: '0' }
          : qubit
      ))
    }

    return correctionSuccess
  }, [selectedCode])

  // 자동 시뮬레이션
  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      const error = injectError()
      setTimeout(() => {
        measureSyndrome()
      }, 500)
    }, 2000)

    return () => clearInterval(interval)
  }, [isRunning, injectError, measureSyndrome])

  // 수동 오류 주입
  const manualInjectError = useCallback(() => {
    const error = injectError()
    if (error) {
      setTimeout(() => {
        measureSyndrome()
      }, 1000)
    }
  }, [injectError, measureSyndrome])

  // 리셋
  const resetSimulation = useCallback(() => {
    setIsRunning(false)
    setErrorHistory([])
    setSyndrome('')
    setDetectionStats({
      totalErrors: 0,
      detectedErrors: 0,
      correctedErrors: 0,
      failedCorrections: 0
    })
    setQubits(prev => prev.map(qubit => ({ ...qubit, state: '0' })))
  }, [])

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
            <Shield className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">양자 오류 정정 시뮬레이터</h1>
            <p className="text-xl text-white/90">양자 오류 정정 부호의 동작 원리를 실험하고 분석하세요</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Simulation */}
        <div className="lg:col-span-2 space-y-6">
          {/* Code Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">오류 정정 부호 선택</h2>
            
            <div className="grid gap-4 mb-6">
              {Object.entries(ERROR_CODES).map(([key, codeInfo]) => (
                <div
                  key={key}
                  className={`
                    p-4 rounded-lg border-2 cursor-pointer transition-all
                    ${selectedCode === key 
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                      : 'border-gray-200 dark:border-gray-600 hover:border-purple-300'
                    }
                  `}
                  onClick={() => setSelectedCode(key as keyof typeof ERROR_CODES)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">{codeInfo.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{codeInfo.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>물리 큐비트: {codeInfo.physicalQubits}</span>
                        <span>논리 큐비트: {codeInfo.logicalQubits}</span>
                        <span>임계값: {(codeInfo.errorThreshold * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                    {selectedCode === key && (
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  오류율: {(errorRate * 100).toFixed(1)}%
                </label>
                <input
                  type="range"
                  min="0.01"
                  max="0.5"
                  step="0.01"
                  value={errorRate}
                  onChange={(e) => setErrorRate(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div className="flex items-end gap-2">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isRunning 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isRunning ? '정지' : '시작'}
                </button>
                
                <button
                  onClick={manualInjectError}
                  disabled={isRunning}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-400 transition-colors"
                >
                  <Zap className="w-4 h-4" />
                  오류 주입
                </button>
                
                <button
                  onClick={resetSimulation}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  리셋
                </button>
              </div>
            </div>
          </div>

          {/* Qubit Visualization */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">큐비트 상태</h2>
            
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-6">
              {qubits.map((qubit) => (
                <div
                  key={qubit.id}
                  className={`
                    relative w-16 h-16 rounded-lg border-2 flex items-center justify-center font-bold text-lg transition-all
                    ${qubit.state === 'error' 
                      ? 'border-red-500 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 animate-pulse' 
                      : qubit.isLogical
                        ? 'border-purple-500 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                        : 'border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }
                  `}
                >
                  {qubit.state === 'error' ? (
                    <AlertTriangle className="w-6 h-6" />
                  ) : (
                    `|${qubit.state}⟩`
                  )}
                  
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 dark:text-gray-400">
                    Q{qubit.id}
                  </div>
                  
                  {qubit.isLogical && (
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-bold">L</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-100 dark:bg-purple-900/30 border border-purple-500 rounded" />
                  <span>논리적 큐비트</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded" />
                  <span>보조 큐비트</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-100 dark:bg-red-900/30 border border-red-500 rounded" />
                  <span>오류 상태</span>
                </div>
              </div>
            </div>
          </div>

          {/* Syndrome Measurement */}
          {showSyndromes && syndrome && (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5" />
                증후군 측정 결과
              </h2>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">측정된 증후군:</div>
                    <div className="font-mono text-lg text-purple-600 dark:text-purple-400">
                      {syndrome}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">해석:</div>
                    <div className="text-sm text-gray-900 dark:text-white">
                      {syndrome === '00' || syndrome === 'X:0 Z:0' || syndrome === '0000' 
                        ? '오류 없음 또는 정정 완료' 
                        : '오류 탐지됨 - 정정 프로세스 실행'
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error History */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">오류 이벤트 기록</h2>
            
            <div className="max-h-64 overflow-y-auto">
              {errorHistory.length > 0 ? (
                <div className="space-y-2">
                  {errorHistory.slice(-10).reverse().map((event, index) => (
                    <div key={event.time} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          event.corrected ? 'bg-green-500' : event.detected ? 'bg-yellow-500' : 'bg-red-500'
                        }`} />
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            큐비트 Q{event.qubit}에서 {event.errorType} 오류
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {event.corrected ? '정정 완료' : event.detected ? '탐지됨' : '미탐지'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(event.time).toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  오류 이벤트가 없습니다
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Statistics */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">통계</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">총 오류:</span>
                <span className="font-bold text-gray-900 dark:text-white">{detectionStats.totalErrors}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">탐지된 오류:</span>
                <span className="font-bold text-yellow-600 dark:text-yellow-400">{detectionStats.detectedErrors}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">정정된 오류:</span>
                <span className="font-bold text-green-600 dark:text-green-400">{detectionStats.correctedErrors}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">정정 실패:</span>
                <span className="font-bold text-red-600 dark:text-red-400">{detectionStats.failedCorrections}</span>
              </div>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">탐지율:</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    {detectionStats.totalErrors > 0 
                      ? `${((detectionStats.detectedErrors / detectionStats.totalErrors) * 100).toFixed(1)}%`
                      : '0%'
                    }
                  </span>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <span className="text-gray-600 dark:text-gray-400">정정 성공률:</span>
                  <span className="font-bold text-green-600 dark:text-green-400">
                    {detectionStats.detectedErrors > 0 
                      ? `${((detectionStats.correctedErrors / detectionStats.detectedErrors) * 100).toFixed(1)}%`
                      : '0%'
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Code Information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">부호 정보</h2>
            
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">선택된 부호:</div>
                <div className="font-semibold text-gray-900 dark:text-white">{code.name}</div>
              </div>
              
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">정정 능력:</div>
                <div className="text-sm text-gray-900 dark:text-white">{code.correctionCapability}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{code.physicalQubits}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">물리 큐비트</div>
                </div>
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{code.logicalQubits}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">논리 큐비트</div>
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">오류 임계값:</div>
                <div className="text-lg font-bold text-red-600 dark:text-red-400">
                  {(code.errorThreshold * 100).toFixed(0)}%
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  이 값 이하에서 효과적인 보호
                </div>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              설정
            </h2>
            
            <div className="space-y-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showSyndromes}
                  onChange={(e) => setShowSyndromes(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">증후군 표시</span>
              </label>
            </div>
          </div>

          {/* Educational Notes */}
          <div className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🎓 학습 포인트</h2>
            
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <p>• <strong>증후군</strong>: 오류 위치를 알려주는 측정 결과</p>
              <p>• <strong>논리적 큐비트</strong>: 실제 정보를 저장하는 큐비트</p>
              <p>• <strong>보조 큐비트</strong>: 오류 탐지를 위한 도우미 큐비트</p>
              <p>• <strong>임계값</strong>: 오류율이 이보다 낮아야 효과적</p>
              <p>• <strong>디코히어런스</strong>: 양자 정보 손실의 주요 원인</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}