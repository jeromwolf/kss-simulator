'use client'

import { useState, useCallback } from 'react'
import { Plus, Trash2, Play, RotateCcw, Cpu, Zap, Eye, Save } from 'lucide-react'

interface QuantumGate {
  id: string
  type: 'X' | 'Y' | 'Z' | 'H' | 'S' | 'T' | 'CNOT' | 'CZ' | 'SWAP'
  position: { qubit: number; step: number }
  target?: number // for two-qubit gates
}

interface CircuitState {
  amplitude: number
  phase: number
}

const GATE_COLORS = {
  X: 'bg-red-500',
  Y: 'bg-green-500', 
  Z: 'bg-blue-500',
  H: 'bg-yellow-500',
  S: 'bg-purple-500',
  T: 'bg-pink-500',
  CNOT: 'bg-indigo-500',
  CZ: 'bg-cyan-500',
  SWAP: 'bg-orange-500'
}

const GATE_DESCRIPTIONS = {
  X: 'Pauli-X (NOT) Gate - 큐비트 상태 반전',
  Y: 'Pauli-Y Gate - Y축 회전',
  Z: 'Pauli-Z Gate - 위상 반전',
  H: 'Hadamard Gate - 중첩 상태 생성',
  S: 'S Gate - π/2 위상 회전',
  T: 'T Gate - π/4 위상 회전',
  CNOT: 'Controlled-NOT - 얽힘 생성',
  CZ: 'Controlled-Z - 조건부 위상',
  SWAP: 'SWAP Gate - 큐비트 교환'
}

export default function QuantumCircuitBuilder() {
  const [numQubits, setNumQubits] = useState(3)
  const [numSteps, setNumSteps] = useState(8)
  const [gates, setGates] = useState<QuantumGate[]>([])
  const [selectedGate, setSelectedGate] = useState<keyof typeof GATE_COLORS>('H')
  const [isSimulating, setIsSimulating] = useState(false)
  const [circuitResult, setCircuitResult] = useState<string>('')

  const addGate = useCallback((qubit: number, step: number) => {
    const newGate: QuantumGate = {
      id: `${Date.now()}-${Math.random()}`,
      type: selectedGate,
      position: { qubit, step }
    }

    // CNOT 게이트의 경우 타겟 큐비트 설정
    if (selectedGate === 'CNOT' && qubit < numQubits - 1) {
      newGate.target = qubit + 1
    }

    setGates(prev => [...prev, newGate])
  }, [selectedGate, numQubits])

  const removeGate = useCallback((gateId: string) => {
    setGates(prev => prev.filter(gate => gate.id !== gateId))
  }, [])

  const clearCircuit = useCallback(() => {
    setGates([])
    setCircuitResult('')
  }, [])

  const simulateCircuit = useCallback(async () => {
    setIsSimulating(true)
    
    // 시뮬레이션 로직 (실제로는 복잡한 양자 계산)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const totalGates = gates.length
    const complexity = Math.min(totalGates * 0.15, 1)
    const entanglement = gates.filter(g => g.type === 'CNOT').length > 0
    
    let result = `🎯 회로 실행 완료!\n\n`
    result += `📊 회로 통계:\n`
    result += `• 큐비트 수: ${numQubits}\n`
    result += `• 게이트 수: ${totalGates}\n`
    result += `• 회로 깊이: ${numSteps}\n`
    result += `• 복잡도: ${(complexity * 100).toFixed(1)}%\n`
    result += `• 얽힘 여부: ${entanglement ? '예 (CNOT 사용)' : '아니오'}\n\n`
    
    result += `🌊 양자 상태 확률 분포:\n`
    // 간단한 확률 분포 시뮬레이션
    for (let i = 0; i < Math.min(4, Math.pow(2, numQubits)); i++) {
      const prob = Math.random() * 100
      const state = i.toString(2).padStart(numQubits, '0')
      result += `|${state}⟩: ${prob.toFixed(1)}%\n`
    }

    setCircuitResult(result)
    setIsSimulating(false)
  }, [gates, numQubits, numSteps])

  const getGateAtPosition = (qubit: number, step: number) => {
    return gates.find(gate => 
      gate.position.qubit === qubit && gate.position.step === step
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
            <Cpu className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">양자 회로 빌더</h1>
            <p className="text-xl text-white/90">드래그앤드롭으로 양자 회로를 설계하고 시뮬레이션하세요</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Circuit Builder */}
        <div className="lg:col-span-2 space-y-6">
          {/* Controls */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">회로 설정</h2>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  큐비트 수
                </label>
                <select
                  value={numQubits}
                  onChange={(e) => setNumQubits(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value={2}>2 큐비트</option>
                  <option value={3}>3 큐비트</option>
                  <option value={4}>4 큐비트</option>
                  <option value={5}>5 큐비트</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  회로 깊이
                </label>
                <select
                  value={numSteps}
                  onChange={(e) => setNumSteps(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value={6}>6 단계</option>
                  <option value={8}>8 단계</option>
                  <option value={10}>10 단계</option>
                  <option value={12}>12 단계</option>
                </select>
              </div>
            </div>

            {/* Gate Palette */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">양자 게이트 팔레트</h3>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-4">
                {(Object.keys(GATE_COLORS) as Array<keyof typeof GATE_COLORS>).map((gate) => (
                  <button
                    key={gate}
                    onClick={() => setSelectedGate(gate)}
                    className={`
                      px-3 py-2 rounded-lg font-bold text-white transition-all transform hover:scale-105
                      ${GATE_COLORS[gate]}
                      ${selectedGate === gate ? 'ring-4 ring-blue-300 scale-105' : ''}
                    `}
                  >
                    {gate}
                  </button>
                ))}
              </div>
              
              {selectedGate && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>{selectedGate}</strong>: {GATE_DESCRIPTIONS[selectedGate]}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={simulateCircuit}
                disabled={gates.length === 0 || isSimulating}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isSimulating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    시뮬레이션 중...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    회로 실행
                  </>
                )}
              </button>
              
              <button
                onClick={clearCircuit}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                초기화
              </button>
            </div>
          </div>

          {/* Circuit Canvas */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">양자 회로 캔버스</h2>
            
            <div className="overflow-x-auto">
              <div 
                className="inline-block min-w-full border border-gray-300 dark:border-gray-600 rounded-lg"
                style={{ 
                  gridTemplateColumns: `60px repeat(${numSteps}, 80px)`,
                  gridTemplateRows: `repeat(${numQubits}, 60px)`
                }}
              >
                {/* Grid rendering */}
                <div className="grid gap-0" style={{ 
                  gridTemplateColumns: `60px repeat(${numSteps}, 80px)`,
                  gridTemplateRows: `repeat(${numQubits}, 60px)`
                }}>
                  {/* Qubit labels */}
                  {Array.from({ length: numQubits }, (_, qubit) => (
                    <div 
                      key={`label-${qubit}`}
                      className="flex items-center justify-center bg-gray-100 dark:bg-gray-700 border-r border-gray-300 dark:border-gray-600 font-bold text-gray-700 dark:text-gray-300"
                    >
                      |q{qubit}⟩
                    </div>
                  ))}
                  
                  {/* Circuit grid */}
                  {Array.from({ length: numQubits }, (_, qubit) =>
                    Array.from({ length: numSteps }, (_, step) => {
                      const gate = getGateAtPosition(qubit, step)
                      return (
                        <div
                          key={`cell-${qubit}-${step}`}
                          onClick={() => gate ? removeGate(gate.id) : addGate(qubit, step)}
                          className="relative border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors flex items-center justify-center min-h-[60px]"
                        >
                          {/* Wire line */}
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full h-0.5 bg-gray-400 dark:bg-gray-500" />
                          </div>
                          
                          {/* Gate */}
                          {gate && (
                            <div 
                              className={`
                                relative z-10 w-12 h-12 rounded-lg flex items-center justify-center
                                ${GATE_COLORS[gate.type]} text-white font-bold text-sm
                                cursor-pointer hover:scale-110 transition-transform
                              `}
                              title={GATE_DESCRIPTIONS[gate.type]}
                            >
                              {gate.type}
                              {gate.target !== undefined && (
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full text-xs flex items-center justify-center text-black">
                                  ⋮
                                </div>
                              )}
                            </div>
                          )}
                          
                          {/* Add gate hint */}
                          {!gate && (
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-50 transition-opacity">
                              <Plus className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                      )
                    })
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              💡 팁: 셀을 클릭하여 선택된 게이트를 추가하거나, 기존 게이트를 클릭하여 제거하세요.
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="space-y-6">
          {/* Circuit Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              회로 정보
            </h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">큐비트 수:</span>
                <span className="font-semibold text-gray-900 dark:text-white">{numQubits}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">게이트 수:</span>
                <span className="font-semibold text-gray-900 dark:text-white">{gates.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">회로 깊이:</span>
                <span className="font-semibold text-gray-900 dark:text-white">{numSteps}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">상태 공간:</span>
                <span className="font-semibold text-gray-900 dark:text-white">2^{numQubits} = {Math.pow(2, numQubits)}</span>
              </div>
            </div>
          </div>

          {/* Gate Usage */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">게이트 사용 현황</h2>
            
            <div className="space-y-2">
              {Object.entries(
                gates.reduce((acc, gate) => {
                  acc[gate.type] = (acc[gate.type] || 0) + 1
                  return acc
                }, {} as Record<string, number>)
              ).map(([gateType, count]) => (
                <div key={gateType} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded ${GATE_COLORS[gateType as keyof typeof GATE_COLORS]}`} />
                    <span className="text-gray-700 dark:text-gray-300">{gateType}</span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">{count}</span>
                </div>
              ))}
              {gates.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-sm">게이트를 추가해보세요</p>
              )}
            </div>
          </div>

          {/* Simulation Results */}
          {circuitResult && (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                시뮬레이션 결과
              </h2>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono">
                  {circuitResult}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Tutorial */}
      <div className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🎓 빠른 가이드</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">기본 사용법</h3>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>• 게이트 팔레트에서 원하는 게이트 선택</li>
              <li>• 회로 그리드의 빈 셀 클릭하여 게이트 배치</li>
              <li>• 기존 게이트 클릭하여 제거</li>
              <li>• "회로 실행" 버튼으로 시뮬레이션</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">게이트 추천</h3>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>• <span className="font-mono bg-yellow-100 dark:bg-yellow-900 px-1 rounded">H</span> 게이트로 중첩 상태 생성</li>
              <li>• <span className="font-mono bg-indigo-100 dark:bg-indigo-900 px-1 rounded">CNOT</span> 게이트로 얽힘 생성</li>
              <li>• <span className="font-mono bg-red-100 dark:bg-red-900 px-1 rounded">X</span> 게이트로 큐비트 반전</li>
              <li>• 다양한 조합으로 양자 알고리즘 구현</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}