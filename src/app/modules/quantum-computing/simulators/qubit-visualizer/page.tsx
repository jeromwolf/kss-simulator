'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { RotateCcw, Play, Pause, Eye, Zap, Settings } from 'lucide-react'

interface QubitState {
  alpha: number // |0⟩ 계수 (실수부)
  alphaI: number // |0⟩ 계수 (허수부)
  beta: number // |1⟩ 계수 (실수부)
  betaI: number // |1⟩ 계수 (허수부)
}

interface BlochPoint {
  x: number
  y: number
  z: number
  theta: number // 극각
  phi: number // 방위각
}

export default function QubitVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  
  const [qubitState, setQubitState] = useState<QubitState>({
    alpha: 1, alphaI: 0, beta: 0, betaI: 0
  })
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationSpeed, setAnimationSpeed] = useState(0.02)
  const [showProbabilities, setShowProbabilities] = useState(true)
  const [showPhase, setShowPhase] = useState(true)
  const [rotationAxis, setRotationAxis] = useState<'X' | 'Y' | 'Z'>('Z')

  // 블로흐 구면 좌표 계산
  const calculateBlochPoint = useCallback((state: QubitState): BlochPoint => {
    const { alpha, alphaI, beta, betaI } = state
    
    // 정규화
    const norm = Math.sqrt(alpha*alpha + alphaI*alphaI + beta*beta + betaI*betaI)
    const a = alpha / norm
    const aI = alphaI / norm
    const b = beta / norm
    const bI = betaI / norm
    
    // 블로흐 구면 좌표 계산
    const theta = 2 * Math.acos(Math.sqrt(a*a + aI*aI))
    const phi = Math.atan2(bI, b) - Math.atan2(aI, a)
    
    // 카르테시안 좌표
    const x = Math.sin(theta) * Math.cos(phi)
    const y = Math.sin(theta) * Math.sin(phi)
    const z = Math.cos(theta)
    
    return { x, y, z, theta, phi }
  }, [])

  // 양자 게이트 적용
  const applyGate = useCallback((gate: string) => {
    setQubitState(prev => {
      const { alpha, alphaI, beta, betaI } = prev
      
      switch (gate) {
        case 'X': // Pauli-X (NOT)
          return { alpha: beta, alphaI: betaI, beta: alpha, betaI: alphaI }
        
        case 'Y': // Pauli-Y
          return { 
            alpha: -betaI, 
            alphaI: beta, 
            beta: alphaI, 
            betaI: -alpha 
          }
        
        case 'Z': // Pauli-Z
          return { 
            alpha, 
            alphaI, 
            beta: -beta, 
            betaI: -betaI 
          }
        
        case 'H': // Hadamard
          return {
            alpha: (alpha + beta) / Math.sqrt(2),
            alphaI: (alphaI + betaI) / Math.sqrt(2),
            beta: (alpha - beta) / Math.sqrt(2),
            betaI: (alphaI - betaI) / Math.sqrt(2)
          }
        
        case 'S': // S gate (π/2 phase)
          return { 
            alpha, 
            alphaI, 
            beta: -betaI, 
            betaI: beta 
          }
        
        case 'T': // T gate (π/4 phase)
          const cos45 = Math.cos(Math.PI/4)
          const sin45 = Math.sin(Math.PI/4)
          return {
            alpha,
            alphaI,
            beta: beta * cos45 - betaI * sin45,
            betaI: beta * sin45 + betaI * cos45
          }
        
        default:
          return prev
      }
    })
  }, [])

  // 프리셋 상태
  const presetStates = {
    '|0⟩': { alpha: 1, alphaI: 0, beta: 0, betaI: 0 },
    '|1⟩': { alpha: 0, alphaI: 0, beta: 1, betaI: 0 },
    '|+⟩': { alpha: 1/Math.sqrt(2), alphaI: 0, beta: 1/Math.sqrt(2), betaI: 0 },
    '|-⟩': { alpha: 1/Math.sqrt(2), alphaI: 0, beta: -1/Math.sqrt(2), betaI: 0 },
    '|+i⟩': { alpha: 1/Math.sqrt(2), alphaI: 0, beta: 0, betaI: 1/Math.sqrt(2) },
    '|-i⟩': { alpha: 1/Math.sqrt(2), alphaI: 0, beta: 0, betaI: -1/Math.sqrt(2) }
  }

  // 애니메이션 루프
  useEffect(() => {
    if (!isAnimating) return

    const animate = () => {
      setQubitState(prev => {
        const angle = animationSpeed
        const { alpha, alphaI, beta, betaI } = prev
        
        // 회전 행렬 적용
        switch (rotationAxis) {
          case 'X':
            return {
              alpha: alpha * Math.cos(angle/2) + betaI * Math.sin(angle/2),
              alphaI: alphaI * Math.cos(angle/2) - beta * Math.sin(angle/2),
              beta: beta * Math.cos(angle/2) - alphaI * Math.sin(angle/2),
              betaI: betaI * Math.cos(angle/2) + alpha * Math.sin(angle/2)
            }
          
          case 'Y':
            return {
              alpha: alpha * Math.cos(angle/2) - betaI * Math.sin(angle/2),
              alphaI: alphaI * Math.cos(angle/2) + beta * Math.sin(angle/2),
              beta: beta * Math.cos(angle/2) + alphaI * Math.sin(angle/2),
              betaI: betaI * Math.cos(angle/2) - alpha * Math.sin(angle/2)
            }
          
          case 'Z':
          default:
            return {
              alpha: alpha * Math.cos(angle/2) + alphaI * Math.sin(angle/2),
              alphaI: alphaI * Math.cos(angle/2) - alpha * Math.sin(angle/2),
              beta: beta * Math.cos(angle/2) + betaI * Math.sin(angle/2),
              betaI: betaI * Math.cos(angle/2) - beta * Math.sin(angle/2)
            }
        }
      })
      
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isAnimating, animationSpeed, rotationAxis])

  // 블로흐 구면 렌더링
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(canvas.width, canvas.height) * 0.35

    // 캔버스 클리어
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // 블로흐 포인트 계산
    const blochPoint = calculateBlochPoint(qubitState)

    // 구면 그리기
    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    ctx.stroke()

    // 좌표축 그리기
    const axisLength = radius * 1.1
    
    // Z축 (세로)
    ctx.strokeStyle = '#3b82f6'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(centerX, centerY - axisLength)
    ctx.lineTo(centerX, centerY + axisLength)
    ctx.stroke()
    
    // X축 (가로)
    ctx.strokeStyle = '#ef4444'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(centerX - axisLength, centerY)
    ctx.lineTo(centerX + axisLength, centerY)
    ctx.stroke()
    
    // Y축 (대각선, 3D 효과)
    ctx.strokeStyle = '#10b981'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(centerX - axisLength * 0.7, centerY + axisLength * 0.5)
    ctx.lineTo(centerX + axisLength * 0.7, centerY - axisLength * 0.5)
    ctx.stroke()

    // 축 라벨
    ctx.fillStyle = '#374151'
    ctx.font = 'bold 14px Arial'
    ctx.fillText('|0⟩', centerX - 15, centerY - axisLength - 10)
    ctx.fillText('|1⟩', centerX - 15, centerY + axisLength + 25)
    ctx.fillText('X', centerX + axisLength + 10, centerY + 5)
    ctx.fillText('Y', centerX + axisLength * 0.7 + 10, centerY - axisLength * 0.5)
    ctx.fillText('Z', centerX + 10, centerY - axisLength - 10)

    // 경위선 그리기 (옵션)
    ctx.strokeStyle = '#d1d5db'
    ctx.lineWidth = 1
    ctx.setLineDash([5, 5])
    
    // 위도선들
    for (let lat = -60; lat <= 60; lat += 30) {
      const r = radius * Math.sin((90 - Math.abs(lat)) * Math.PI / 180)
      const y = centerY - radius * Math.cos((90 - Math.abs(lat)) * Math.PI / 180) * Math.sign(lat)
      
      ctx.beginPath()
      ctx.arc(centerX, y, r, 0, 2 * Math.PI)
      ctx.stroke()
    }
    
    // 경도선들
    for (let lng = 0; lng < 180; lng += 30) {
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, lng * Math.PI / 180, (lng + 180) * Math.PI / 180)
      ctx.stroke()
    }
    
    ctx.setLineDash([])

    // 큐비트 상태 벡터 그리기
    const pointX = centerX + blochPoint.x * radius
    const pointY = centerY - blochPoint.z * radius // Z를 Y에 매핑 (화면 좌표계)
    
    // 벡터 화살표
    ctx.strokeStyle = '#7c3aed'
    ctx.fillStyle = '#7c3aed'
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(pointX, pointY)
    ctx.stroke()

    // 벡터 끝점
    ctx.beginPath()
    ctx.arc(pointX, pointY, 8, 0, 2 * Math.PI)
    ctx.fill()

    // 화살표 머리
    const angle = Math.atan2(pointY - centerY, pointX - centerX)
    const arrowLength = 15
    ctx.beginPath()
    ctx.moveTo(pointX, pointY)
    ctx.lineTo(
      pointX - arrowLength * Math.cos(angle - Math.PI/6),
      pointY - arrowLength * Math.sin(angle - Math.PI/6)
    )
    ctx.moveTo(pointX, pointY)
    ctx.lineTo(
      pointX - arrowLength * Math.cos(angle + Math.PI/6),
      pointY - arrowLength * Math.sin(angle + Math.PI/6)
    )
    ctx.stroke()

    // 확률 표시 (옵션)
    if (showProbabilities) {
      const prob0 = qubitState.alpha * qubitState.alpha + qubitState.alphaI * qubitState.alphaI
      const prob1 = qubitState.beta * qubitState.beta + qubitState.betaI * qubitState.betaI
      
      ctx.fillStyle = '#1f2937'
      ctx.font = '12px Arial'
      ctx.fillText(`P(|0⟩) = ${(prob0 * 100).toFixed(1)}%`, 10, 30)
      ctx.fillText(`P(|1⟩) = ${(prob1 * 100).toFixed(1)}%`, 10, 50)
    }

  }, [qubitState, showProbabilities, calculateBlochPoint])

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
            <Eye className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">큐비트 상태 시각화</h1>
            <p className="text-xl text-white/90">블로흐 구면에서 큐비트의 양자 상태를 실시간으로 관찰하세요</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Bloch Sphere Visualization */}
        <div className="lg:col-span-2 space-y-6">
          {/* Canvas */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">블로흐 구면</h2>
            
            <div className="flex justify-center">
              <canvas
                ref={canvasRef}
                width={500}
                height={400}
                className="border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700"
              />
            </div>
            
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <p>• 보라색 벡터는 현재 큐비트 상태를 나타냅니다</p>
              <p>• 북극(|0⟩)과 남극(|1⟩) 사이에서 중첩 상태를 확인할 수 있습니다</p>
              <p>• 적도면의 점들은 50:50 중첩 상태입니다</p>
            </div>
          </div>

          {/* State Information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">상태 정보</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* State Vector */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">상태 벡터</h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm">
                  <div className="text-gray-700 dark:text-gray-300">
                    |ψ⟩ = ({qubitState.alpha.toFixed(3)}{qubitState.alphaI >= 0 ? '+' : ''}{qubitState.alphaI.toFixed(3)}i)|0⟩
                  </div>
                  <div className="text-gray-700 dark:text-gray-300 ml-8">
                    + ({qubitState.beta.toFixed(3)}{qubitState.betaI >= 0 ? '+' : ''}{qubitState.betaI.toFixed(3)}i)|1⟩
                  </div>
                </div>
              </div>

              {/* Probabilities */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">측정 확률</h3>
                <div className="space-y-3">
                  {(() => {
                    const prob0 = qubitState.alpha * qubitState.alpha + qubitState.alphaI * qubitState.alphaI
                    const prob1 = qubitState.beta * qubitState.beta + qubitState.betaI * qubitState.betaI
                    return (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700 dark:text-gray-300">P(|0⟩) =</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-3 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-blue-500 transition-all duration-300"
                                style={{ width: `${prob0 * 100}%` }}
                              />
                            </div>
                            <span className="font-mono text-sm w-12">{(prob0 * 100).toFixed(1)}%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700 dark:text-gray-300">P(|1⟩) =</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-3 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-red-500 transition-all duration-300"
                                style={{ width: `${prob1 * 100}%` }}
                              />
                            </div>
                            <span className="font-mono text-sm w-12">{(prob1 * 100).toFixed(1)}%</span>
                          </div>
                        </div>
                      </>
                    )
                  })()}
                </div>
              </div>
            </div>

            {/* Bloch Coordinates */}
            {(() => {
              const blochPoint = calculateBlochPoint(qubitState)
              return (
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">블로흐 좌표</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 dark:text-gray-400">X</div>
                      <div className="font-mono text-lg text-red-600 dark:text-red-400">
                        {blochPoint.x.toFixed(3)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 dark:text-gray-400">Y</div>
                      <div className="font-mono text-lg text-green-600 dark:text-green-400">
                        {blochPoint.y.toFixed(3)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 dark:text-gray-400">Z</div>
                      <div className="font-mono text-lg text-blue-600 dark:text-blue-400">
                        {blochPoint.z.toFixed(3)}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })()}
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          {/* Preset States */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">프리셋 상태</h2>
            
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(presetStates).map(([name, state]) => (
                <button
                  key={name}
                  onClick={() => setQubitState(state)}
                  className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors font-mono text-sm"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* Quantum Gates */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">양자 게이트</h2>
            
            <div className="grid grid-cols-3 gap-2">
              {['X', 'Y', 'Z', 'H', 'S', 'T'].map((gate) => (
                <button
                  key={gate}
                  onClick={() => applyGate(gate)}
                  className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-bold"
                >
                  {gate}
                </button>
              ))}
            </div>
            
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              <p>• <strong>X, Y, Z</strong>: Pauli 게이트</p>
              <p>• <strong>H</strong>: Hadamard (중첩 생성)</p>
              <p>• <strong>S, T</strong>: 위상 게이트</p>
            </div>
          </div>

          {/* Animation Controls */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              애니메이션
            </h2>
            
            <div className="space-y-4">
              {/* Play/Pause */}
              <div className="flex gap-2">
                <button
                  onClick={() => setIsAnimating(!isAnimating)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isAnimating 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isAnimating ? '정지' : '시작'}
                </button>
                
                <button
                  onClick={() => setQubitState(presetStates['|0⟩'])}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  리셋
                </button>
              </div>

              {/* Rotation Axis */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  회전축
                </label>
                <select
                  value={rotationAxis}
                  onChange={(e) => setRotationAxis(e.target.value as 'X' | 'Y' | 'Z')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="X">X축 회전</option>
                  <option value="Y">Y축 회전</option>
                  <option value="Z">Z축 회전</option>
                </select>
              </div>

              {/* Speed Control */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  회전 속도: {(animationSpeed * 50).toFixed(1)}
                </label>
                <input
                  type="range"
                  min="0.005"
                  max="0.1"
                  step="0.005"
                  value={animationSpeed}
                  onChange={(e) => setAnimationSpeed(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Display Options */}
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={showProbabilities}
                    onChange={(e) => setShowProbabilities(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">확률 표시</span>
                </label>
                
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={showPhase}
                    onChange={(e) => setShowPhase(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">위상 정보 표시</span>
                </label>
              </div>
            </div>
          </div>

          {/* Educational Notes */}
          <div className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🎓 학습 포인트</h2>
            
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <p>• <strong>블로흐 구면</strong>: 모든 큐비트 상태를 3D 공간의 점으로 표현</p>
              <p>• <strong>북극(|0⟩)</strong>: 완전히 0 상태</p>
              <p>• <strong>남극(|1⟩)</strong>: 완전히 1 상태</p>
              <p>• <strong>적도</strong>: 50:50 중첩 상태들</p>
              <p>• <strong>위상</strong>: X-Y 평면에서의 회전 각도</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}