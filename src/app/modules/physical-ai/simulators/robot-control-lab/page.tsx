'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Play, Pause, RotateCcw, Target, Settings, Zap, Eye, Brain } from 'lucide-react'

interface RobotJoint {
  id: number
  name: string
  angle: number
  target: number
  min: number
  max: number
  velocity: number
}

interface Position3D {
  x: number
  y: number
  z: number
}

interface RobotState {
  joints: RobotJoint[]
  endEffectorPos: Position3D
  targetPos: Position3D
  isMoving: boolean
}

export default function RobotControlLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  
  const [robotState, setRobotState] = useState<RobotState>({
    joints: [
      { id: 0, name: 'Base', angle: 0, target: 0, min: -180, max: 180, velocity: 0 },
      { id: 1, name: 'Shoulder', angle: 90, target: 90, min: -90, max: 90, velocity: 0 },
      { id: 2, name: 'Elbow', angle: -45, target: -45, min: -135, max: 45, velocity: 0 },
      { id: 3, name: 'Wrist', angle: 0, target: 0, min: -90, max: 90, velocity: 0 },
    ],
    endEffectorPos: { x: 0, y: 0, z: 0 },
    targetPos: { x: 200, y: 100, z: 50 },
    isMoving: false
  })
  
  const [controlMode, setControlMode] = useState<'manual' | 'ik'>('manual')
  const [pidParams, setPidParams] = useState({ kp: 2.0, ki: 0.1, kd: 0.5 })
  const [isSimulating, setIsSimulating] = useState(false)
  const [trajectory, setTrajectory] = useState<Position3D[]>([])

  // 순방향 운동학 계산
  const forwardKinematics = useCallback((joints: RobotJoint[]): Position3D => {
    const [base, shoulder, elbow, wrist] = joints.map(j => j.angle * Math.PI / 180)
    
    // 단순화된 4DOF 로봇 팔 모델
    const L1 = 100 // 첫 번째 링크 길이
    const L2 = 100 // 두 번째 링크 길이
    const L3 = 80  // 세 번째 링크 길이
    
    // 각 조인트의 위치 계산
    const x = Math.cos(base) * (
      L1 * Math.cos(shoulder) + 
      L2 * Math.cos(shoulder + elbow) + 
      L3 * Math.cos(shoulder + elbow + wrist)
    )
    
    const y = Math.sin(base) * (
      L1 * Math.cos(shoulder) + 
      L2 * Math.cos(shoulder + elbow) + 
      L3 * Math.cos(shoulder + elbow + wrist)
    )
    
    const z = L1 * Math.sin(shoulder) + 
             L2 * Math.sin(shoulder + elbow) + 
             L3 * Math.sin(shoulder + elbow + wrist)
    
    return { x, y, z }
  }, [])

  // 역방향 운동학 (간소화된 버전)
  const inverseKinematics = useCallback((target: Position3D): number[] => {
    const { x, y, z } = target
    
    // 간단한 해석적 IK (실제로는 더 복잡함)
    const base = Math.atan2(y, x) * 180 / Math.PI
    const r = Math.sqrt(x*x + y*y)
    
    // 2D 평면에서의 IK
    const L1 = 100, L2 = 100, L3 = 80
    const targetR = Math.sqrt(r*r + z*z)
    
    // 코사인 법칙 사용
    const cosElbow = (L1*L1 + L2*L2 - targetR*targetR) / (2*L1*L2)
    const elbow = -Math.acos(Math.max(-1, Math.min(1, cosElbow))) * 180 / Math.PI
    
    const alpha = Math.atan2(z, r)
    const beta = Math.acos((L1*L1 + targetR*targetR - L2*L2) / (2*L1*targetR))
    const shoulder = (alpha + beta) * 180 / Math.PI
    
    const wrist = 0 // 간단화
    
    return [base, shoulder, elbow, wrist]
  }, [])

  // PID 제어기
  const pidControl = useCallback((current: number, target: number, dt: number) => {
    const error = target - current
    const { kp, ki, kd } = pidParams
    
    // 간단한 PID (적분과 미분항은 실제로는 누적이 필요)
    const output = kp * error + ki * error * dt + kd * error / dt
    
    return Math.max(-5, Math.min(5, output)) // 속도 제한
  }, [pidParams])

  // 시뮬레이션 스텝
  const simulationStep = useCallback(() => {
    if (!isSimulating) return

    setRobotState(prev => {
      const newJoints = prev.joints.map(joint => {
        const velocity = pidControl(joint.angle, joint.target, 0.016) // 60fps
        const newAngle = joint.angle + velocity * 0.016
        
        return {
          ...joint,
          angle: Math.max(joint.min, Math.min(joint.max, newAngle)),
          velocity
        }
      })
      
      const newEndEffectorPos = forwardKinematics(newJoints)
      
      // 궤적 기록
      setTrajectory(prev => [...prev.slice(-100), newEndEffectorPos])
      
      const isMoving = newJoints.some(j => Math.abs(j.angle - j.target) > 0.1)
      
      return {
        ...prev,
        joints: newJoints,
        endEffectorPos: newEndEffectorPos,
        isMoving
      }
    })
  }, [isSimulating, pidControl, forwardKinematics])

  // 애니메이션 루프
  useEffect(() => {
    const animate = () => {
      simulationStep()
      drawRobot()
      animationRef.current = requestAnimationFrame(animate)
    }

    if (isSimulating) {
      animate()
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isSimulating, simulationStep])

  // 로봇 그리기
  const drawRobot = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const scale = 0.8

    // 캔버스 클리어
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // 배경 그리드
    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 1
    for (let i = 0; i < canvas.width; i += 20) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, canvas.height)
      ctx.stroke()
    }
    for (let i = 0; i < canvas.height; i += 20) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(canvas.width, i)
      ctx.stroke()
    }

    // 로봇 관절과 링크 그리기
    const joints = robotState.joints
    const angles = joints.map(j => j.angle * Math.PI / 180)
    
    const L1 = 100, L2 = 100, L3 = 80
    
    // 관절 위치 계산
    const basePos = { x: centerX, y: centerY }
    
    const shoulder = {
      x: centerX + L1 * Math.cos(angles[1]) * scale,
      y: centerY - L1 * Math.sin(angles[1]) * scale
    }
    
    const elbow = {
      x: shoulder.x + L2 * Math.cos(angles[1] + angles[2]) * scale,
      y: shoulder.y - L2 * Math.sin(angles[1] + angles[2]) * scale
    }
    
    const wrist = {
      x: elbow.x + L3 * Math.cos(angles[1] + angles[2] + angles[3]) * scale,
      y: elbow.y - L3 * Math.sin(angles[1] + angles[2] + angles[3]) * scale
    }

    // 링크 그리기
    ctx.strokeStyle = '#374151'
    ctx.lineWidth = 8
    ctx.lineCap = 'round'
    
    // Base to Shoulder
    ctx.beginPath()
    ctx.moveTo(basePos.x, basePos.y)
    ctx.lineTo(shoulder.x, shoulder.y)
    ctx.stroke()
    
    // Shoulder to Elbow
    ctx.beginPath()
    ctx.moveTo(shoulder.x, shoulder.y)
    ctx.lineTo(elbow.x, elbow.y)
    ctx.stroke()
    
    // Elbow to Wrist
    ctx.beginPath()
    ctx.moveTo(elbow.x, elbow.y)
    ctx.lineTo(wrist.x, wrist.y)
    ctx.stroke()

    // 관절 그리기
    const drawJoint = (pos: {x: number, y: number}, color: string, size: number) => {
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(pos.x, pos.y, size, 0, 2 * Math.PI)
      ctx.fill()
      ctx.strokeStyle = '#1f2937'
      ctx.lineWidth = 2
      ctx.stroke()
    }

    drawJoint(basePos, '#ef4444', 12)
    drawJoint(shoulder, '#3b82f6', 10)
    drawJoint(elbow, '#10b981', 10)
    drawJoint(wrist, '#f59e0b', 8)

    // 목표 위치 그리기
    const targetScreen = {
      x: centerX + robotState.targetPos.x * scale * 0.8,
      y: centerY - robotState.targetPos.z * scale * 0.8
    }
    
    ctx.strokeStyle = '#dc2626'
    ctx.lineWidth = 3
    ctx.setLineDash([5, 5])
    ctx.beginPath()
    ctx.arc(targetScreen.x, targetScreen.y, 15, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.setLineDash([])

    // 궤적 그리기
    if (trajectory.length > 1) {
      ctx.strokeStyle = '#8b5cf6'
      ctx.lineWidth = 2
      ctx.beginPath()
      
      trajectory.forEach((pos, index) => {
        const screenX = centerX + pos.x * scale * 0.8
        const screenY = centerY - pos.z * scale * 0.8
        
        if (index === 0) {
          ctx.moveTo(screenX, screenY)
        } else {
          ctx.lineTo(screenX, screenY)
        }
      })
      
      ctx.stroke()
    }

    // 현재 end-effector 위치
    ctx.fillStyle = '#8b5cf6'
    ctx.beginPath()
    ctx.arc(wrist.x, wrist.y, 6, 0, 2 * Math.PI)
    ctx.fill()
  }, [robotState, trajectory])

  // 관절 각도 변경
  const updateJointAngle = (jointId: number, angle: number) => {
    setRobotState(prev => ({
      ...prev,
      joints: prev.joints.map(joint => 
        joint.id === jointId ? { ...joint, target: angle } : joint
      )
    }))
  }

  // IK 모드에서 목표 위치 설정
  const setTargetPosition = (pos: Position3D) => {
    setRobotState(prev => ({ ...prev, targetPos: pos }))
    
    if (controlMode === 'ik') {
      const jointAngles = inverseKinematics(pos)
      setRobotState(prev => ({
        ...prev,
        joints: prev.joints.map((joint, i) => ({
          ...joint,
          target: jointAngles[i] || joint.target
        }))
      }))
    }
  }

  // 리셋
  const resetRobot = () => {
    setRobotState(prev => ({
      ...prev,
      joints: prev.joints.map(joint => ({ ...joint, angle: 0, target: 0, velocity: 0 })),
      targetPos: { x: 200, y: 100, z: 50 },
      isMoving: false
    }))
    setTrajectory([])
  }

  // 캔버스 클릭 핸들러
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const clickX = event.clientX - rect.left
    const clickY = event.clientY - rect.top

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const scale = 0.8

    // 클릭 위치를 로봇 좌표계로 변환
    const robotX = (clickX - centerX) / (scale * 0.8)
    const robotZ = -(clickY - centerY) / (scale * 0.8)
    
    setTargetPosition({ x: robotX, y: robotState.targetPos.y, z: robotZ })
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-600 to-gray-700 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
            <Brain className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">로봇 제어 실험실</h1>
            <p className="text-xl text-white/90">로봇 팔의 순방향/역방향 운동학과 PID 제어를 실습하세요</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Robot Visualization */}
        <div className="lg:col-span-2 space-y-6">
          {/* Control Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">제어 패널</h2>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400">제어 모드:</label>
                  <select
                    value={controlMode}
                    onChange={(e) => setControlMode(e.target.value as 'manual' | 'ik')}
                    className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  >
                    <option value="manual">수동 제어</option>
                    <option value="ik">역운동학 제어</option>
                  </select>
                </div>
                
                <button
                  onClick={() => setIsSimulating(!isSimulating)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isSimulating 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {isSimulating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isSimulating ? '정지' : '시작'}
                </button>
                
                <button
                  onClick={resetRobot}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  리셋
                </button>
              </div>
            </div>

            {controlMode === 'manual' && (
              <div className="grid md:grid-cols-2 gap-4">
                {robotState.joints.map((joint) => (
                  <div key={joint.id} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {joint.name}: {joint.target.toFixed(1)}°
                    </label>
                    <input
                      type="range"
                      min={joint.min}
                      max={joint.max}
                      value={joint.target}
                      onChange={(e) => updateJointAngle(joint.id, Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>{joint.min}°</span>
                      <span>{joint.max}°</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {controlMode === 'ik' && (
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    X: {robotState.targetPos.x.toFixed(1)}
                  </label>
                  <input
                    type="range"
                    min="-200"
                    max="200"
                    value={robotState.targetPos.x}
                    onChange={(e) => setTargetPosition({
                      ...robotState.targetPos,
                      x: Number(e.target.value)
                    })}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Y: {robotState.targetPos.y.toFixed(1)}
                  </label>
                  <input
                    type="range"
                    min="-200"
                    max="200"
                    value={robotState.targetPos.y}
                    onChange={(e) => setTargetPosition({
                      ...robotState.targetPos,
                      y: Number(e.target.value)
                    })}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Z: {robotState.targetPos.z.toFixed(1)}
                  </label>
                  <input
                    type="range"
                    min="-100"
                    max="200"
                    value={robotState.targetPos.z}
                    onChange={(e) => setTargetPosition({
                      ...robotState.targetPos,
                      z: Number(e.target.value)
                    })}
                    className="w-full"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Robot Canvas */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">로봇 시각화</h2>
            
            <canvas
              ref={canvasRef}
              width={600}
              height={400}
              onClick={handleCanvasClick}
              className="w-full border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 cursor-crosshair"
            />
            
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <p>• 캔버스를 클릭하여 목표 위치를 설정하세요 (IK 모드에서)</p>
              <p>• 빨간 점선 원: 목표 위치</p>
              <p>• 보라색 선: End-effector 궤적</p>
              <p>• 색깔별 관절: 빨강(Base), 파랑(Shoulder), 초록(Elbow), 주황(Wrist)</p>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="space-y-6">
          {/* Robot Status */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              로봇 상태
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">End-Effector 위치</h3>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="text-center p-2 bg-red-50 dark:bg-red-900/20 rounded">
                    <div className="text-red-600 dark:text-red-400 font-mono">
                      {robotState.endEffectorPos.x.toFixed(1)}
                    </div>
                    <div className="text-gray-500 text-xs">X</div>
                  </div>
                  <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
                    <div className="text-green-600 dark:text-green-400 font-mono">
                      {robotState.endEffectorPos.y.toFixed(1)}
                    </div>
                    <div className="text-gray-500 text-xs">Y</div>
                  </div>
                  <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                    <div className="text-blue-600 dark:text-blue-400 font-mono">
                      {robotState.endEffectorPos.z.toFixed(1)}
                    </div>
                    <div className="text-gray-500 text-xs">Z</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">관절 상태</h3>
                <div className="space-y-2">
                  {robotState.joints.map((joint) => (
                    <div key={joint.id} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">{joint.name}:</span>
                      <div className="flex gap-2">
                        <span className="font-mono text-gray-900 dark:text-white">
                          {joint.angle.toFixed(1)}°
                        </span>
                        <span className="text-gray-500">→</span>
                        <span className="font-mono text-blue-600 dark:text-blue-400">
                          {joint.target.toFixed(1)}°
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">상태:</span>
                <span className={`font-semibold ${
                  robotState.isMoving 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {robotState.isMoving ? '이동 중' : '정지'}
                </span>
              </div>
            </div>
          </div>

          {/* PID Parameters */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              PID 파라미터
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Kp (비례): {pidParams.kp.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="5.0"
                  step="0.1"
                  value={pidParams.kp}
                  onChange={(e) => setPidParams(prev => ({ ...prev, kp: Number(e.target.value) }))}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Ki (적분): {pidParams.ki.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0.0"
                  max="1.0"
                  step="0.01"
                  value={pidParams.ki}
                  onChange={(e) => setPidParams(prev => ({ ...prev, ki: Number(e.target.value) }))}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Kd (미분): {pidParams.kd.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0.0"
                  max="2.0"
                  step="0.01"
                  value={pidParams.kd}
                  onChange={(e) => setPidParams(prev => ({ ...prev, kd: Number(e.target.value) }))}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Presets */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              프리셋 동작
            </h2>
            
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setTargetPosition({ x: 150, y: 0, z: 100 })}
                className="px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors text-sm"
              >
                위쪽
              </button>
              <button
                onClick={() => setTargetPosition({ x: 180, y: 0, z: 0 })}
                className="px-3 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors text-sm"
              >
                정면
              </button>
              <button
                onClick={() => setTargetPosition({ x: 100, y: 100, z: 50 })}
                className="px-3 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors text-sm"
              >
                오른쪽
              </button>
              <button
                onClick={() => setTargetPosition({ x: 100, y: -100, z: 50 })}
                className="px-3 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors text-sm"
              >
                왼쪽
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🎓 사용법</h2>
            
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <p>• <strong>수동 제어:</strong> 슬라이더로 각 관절 직접 제어</p>
              <p>• <strong>역운동학:</strong> 목표 위치 설정시 자동으로 관절 각도 계산</p>
              <p>• <strong>PID 조정:</strong> 제어 성능 튜닝</p>
              <p>• <strong>캔버스 클릭:</strong> 새로운 목표 위치 설정</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}