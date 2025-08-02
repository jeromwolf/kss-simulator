'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, Car, Settings, Play, Pause, RotateCcw, MapPin, Zap, AlertTriangle, Navigation, Clock } from 'lucide-react'

interface Vehicle {
  id: string
  x: number
  y: number
  angle: number
  speed: number
  type: 'ego' | 'traffic'
  color: string
  path?: {x: number, y: number}[]
}

interface Obstacle {
  id: string
  x: number
  y: number
  width: number
  height: number
  type: 'static' | 'dynamic'
  speed?: number
  direction?: number
}

interface SimulationState {
  vehicles: Vehicle[]
  obstacles: Obstacle[]
  egoVehicle: Vehicle
  targetPoint: {x: number, y: number}
  collisionDetected: boolean
  currentManeuver: string
  autonomyLevel: number
}

export default function AutonomousDrivingSimPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [scenario, setScenario] = useState<'highway' | 'urban' | 'parking' | 'intersection'>('urban')
  const [autonomyLevel, setAutonomyLevel] = useState(4) // SAE Level
  const [simulation, setSimulation] = useState<SimulationState>({
    vehicles: [],
    obstacles: [],
    egoVehicle: { id: 'ego', x: 100, y: 300, angle: 0, speed: 0, type: 'ego', color: '#ef4444' },
    targetPoint: { x: 700, y: 300 },
    collisionDetected: false,
    currentManeuver: 'Lane Following',
    autonomyLevel: 4
  })
  const [performance, setPerformance] = useState({
    averageSpeed: 0,
    collisions: 0,
    emergencyBrakes: 0,
    laneChanges: 0,
    efficiency: 100
  })
  
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  // 시나리오별 설정
  const scenarios = {
    highway: {
      name: '고속도로 주행',
      description: '고속 주행 및 차선 변경',
      vehicles: [
        { id: 'v1', x: 200, y: 250, angle: 0, speed: 25, type: 'traffic', color: '#3b82f6' },
        { id: 'v2', x: 300, y: 350, angle: 0, speed: 30, type: 'traffic', color: '#10b981' },
        { id: 'v3', x: 500, y: 250, angle: 0, speed: 20, type: 'traffic', color: '#f59e0b' }
      ],
      obstacles: []
    },
    urban: {
      name: '도심 주행',
      description: '복잡한 도심 환경 내비게이션',
      vehicles: [
        { id: 'v1', x: 250, y: 280, angle: 90, speed: 15, type: 'traffic', color: '#3b82f6' },
        { id: 'v2', x: 400, y: 320, angle: 0, speed: 12, type: 'traffic', color: '#10b981' }
      ],
      obstacles: [
        { id: 'building1', x: 200, y: 100, width: 100, height: 100, type: 'static' },
        { id: 'building2', x: 400, y: 100, width: 120, height: 100, type: 'static' },
        { id: 'pedestrian', x: 350, y: 350, width: 20, height: 20, type: 'dynamic', speed: 2, direction: 180 }
      ]
    },
    parking: {
      name: '자동 주차',
      description: '평행 및 수직 주차 시뮬레이션',
      vehicles: [
        { id: 'parked1', x: 300, y: 200, angle: 0, speed: 0, type: 'traffic', color: '#6b7280' },
        { id: 'parked2', x: 400, y: 200, angle: 0, speed: 0, type: 'traffic', color: '#6b7280' }
      ],
      obstacles: [
        { id: 'parkingSpace', x: 350, y: 200, width: 50, height: 100, type: 'static' }
      ]
    },
    intersection: {
      name: '교차로 통과',
      description: '신호등과 우선순위 판단',
      vehicles: [
        { id: 'approaching', x: 300, y: 100, angle: 90, speed: 10, type: 'traffic', color: '#3b82f6' },
        { id: 'crossing', x: 500, y: 300, angle: 180, speed: 12, type: 'traffic', color: '#10b981' }
      ],
      obstacles: [
        { id: 'trafficLight', x: 375, y: 275, width: 10, height: 30, type: 'static' }
      ]
    }
  }

  // 자율주행 알고리즘 시뮬레이션
  const updateAutonomousVehicle = (ego: Vehicle, obstacles: Obstacle[], vehicles: Vehicle[]) => {
    const newEgo = { ...ego }
    let maneuver = 'Lane Following'
    let collisionRisk = false

    // 충돌 감지
    const detectionRange = 50
    const nearbyObstacles = obstacles.filter(obs => 
      Math.sqrt((obs.x - ego.x) ** 2 + (obs.y - ego.y) ** 2) < detectionRange
    )
    const nearbyVehicles = vehicles.filter(v => 
      Math.sqrt((v.x - ego.x) ** 2 + (v.y - ego.y) ** 2) < detectionRange
    )

    if (nearbyObstacles.length > 0 || nearbyVehicles.length > 0) {
      collisionRisk = true
      maneuver = 'Emergency Braking'
      newEgo.speed = Math.max(0, newEgo.speed - 2)
    } else {
      // 목표점으로 향하는 경로 계획
      const dx = simulation.targetPoint.x - ego.x
      const dy = simulation.targetPoint.y - ego.y
      const distance = Math.sqrt(dx ** 2 + dy ** 2)
      
      if (distance > 20) {
        const targetAngle = Math.atan2(dy, dx) * 180 / Math.PI
        const angleDiff = targetAngle - ego.angle
        
        // 각도 조정
        if (Math.abs(angleDiff) > 5) {
          newEgo.angle += Math.sign(angleDiff) * 2
          maneuver = 'Steering'
        }
        
        // 속도 조정
        const targetSpeed = Math.min(25, distance / 10)
        if (newEgo.speed < targetSpeed) {
          newEgo.speed = Math.min(targetSpeed, newEgo.speed + 1)
          maneuver = 'Accelerating'
        } else if (newEgo.speed > targetSpeed) {
          newEgo.speed = Math.max(targetSpeed, newEgo.speed - 1)
          maneuver = 'Decelerating'
        }
      } else {
        newEgo.speed = Math.max(0, newEgo.speed - 1)
        maneuver = 'Arrived'
      }
    }

    // 위치 업데이트
    const angleRad = newEgo.angle * Math.PI / 180
    newEgo.x += newEgo.speed * Math.cos(angleRad) * 0.1
    newEgo.y += newEgo.speed * Math.sin(angleRad) * 0.1

    return { vehicle: newEgo, maneuver, collisionRisk }
  }

  // 교통 차량 업데이트
  const updateTrafficVehicles = (vehicles: Vehicle[]) => {
    return vehicles.map(vehicle => {
      const newVehicle = { ...vehicle }
      
      if (vehicle.type === 'traffic' && vehicle.speed > 0) {
        const angleRad = vehicle.angle * Math.PI / 180
        newVehicle.x += vehicle.speed * Math.cos(angleRad) * 0.1
        newVehicle.y += vehicle.speed * Math.sin(angleRad) * 0.1
        
        // 화면 경계 처리
        if (newVehicle.x > 800) newVehicle.x = -50
        if (newVehicle.x < -50) newVehicle.x = 800
        if (newVehicle.y > 600) newVehicle.y = -50
        if (newVehicle.y < -50) newVehicle.y = 600
      }
      
      return newVehicle
    })
  }

  // 동적 장애물 업데이트
  const updateDynamicObstacles = (obstacles: Obstacle[]) => {
    return obstacles.map(obstacle => {
      if (obstacle.type === 'dynamic' && obstacle.speed && obstacle.direction !== undefined) {
        const newObstacle = { ...obstacle }
        const angleRad = obstacle.direction * Math.PI / 180
        newObstacle.x += obstacle.speed * Math.cos(angleRad)
        newObstacle.y += obstacle.speed * Math.sin(angleRad)
        
        // 경계 반사
        if (newObstacle.x <= 0 || newObstacle.x >= 800) {
          newObstacle.direction = 180 - (newObstacle.direction || 0)
        }
        if (newObstacle.y <= 0 || newObstacle.y >= 600) {
          newObstacle.direction = -(newObstacle.direction || 0)
        }
        
        return newObstacle
      }
      return obstacle
    })
  }

  // Canvas 렌더링
  const renderScene = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // 도로 배경
    ctx.fillStyle = '#374151'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // 차선 표시
    ctx.strokeStyle = '#ffffff'
    ctx.lineWidth = 2
    ctx.setLineDash([20, 20])
    for (let y = 150; y < canvas.height; y += 100) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }
    ctx.setLineDash([])
    
    // 장애물 렌더링
    simulation.obstacles.forEach(obstacle => {
      if (obstacle.type === 'static') {
        ctx.fillStyle = '#6b7280'
      } else {
        ctx.fillStyle = '#f59e0b'
      }
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height)
      
      if (obstacle.type === 'dynamic') {
        ctx.fillStyle = '#ffffff'
        ctx.font = '12px sans-serif'
        ctx.fillText('PED', obstacle.x, obstacle.y - 5)
      }
    })
    
    // 차량 렌더링
    const allVehicles = [...simulation.vehicles, simulation.egoVehicle]
    allVehicles.forEach(vehicle => {
      ctx.save()
      ctx.translate(vehicle.x, vehicle.y)
      ctx.rotate(vehicle.angle * Math.PI / 180)
      
      ctx.fillStyle = vehicle.color
      ctx.fillRect(-15, -8, 30, 16)
      
      // 자율주행 차량 표시
      if (vehicle.type === 'ego') {
        ctx.strokeStyle = '#ffffff'
        ctx.lineWidth = 2
        ctx.strokeRect(-15, -8, 30, 16)
        
        // 센서 범위 표시
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.3)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(0, 0, 50, 0, 2 * Math.PI)
        ctx.stroke()
      }
      
      ctx.restore()
      
      // 속도 표시
      ctx.fillStyle = '#ffffff'
      ctx.font = '10px sans-serif'
      ctx.fillText(`${vehicle.speed.toFixed(1)} m/s`, vehicle.x - 15, vehicle.y - 20)
    })
    
    // 목표점 표시
    ctx.fillStyle = '#10b981'
    ctx.beginPath()
    ctx.arc(simulation.targetPoint.x, simulation.targetPoint.y, 10, 0, 2 * Math.PI)
    ctx.fill()
    ctx.fillStyle = '#ffffff'
    ctx.font = '12px sans-serif'
    ctx.fillText('TARGET', simulation.targetPoint.x - 20, simulation.targetPoint.y - 15)
    
    // 충돌 경고
    if (simulation.collisionDetected) {
      ctx.fillStyle = 'rgba(239, 68, 68, 0.5)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 24px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('COLLISION DETECTED!', canvas.width / 2, canvas.height / 2)
      ctx.textAlign = 'left'
    }
  }

  // 시뮬레이션 루프
  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setSimulation(prev => {
          const autonomousResult = updateAutonomousVehicle(
            prev.egoVehicle, 
            prev.obstacles, 
            prev.vehicles
          )
          
          const updatedVehicles = updateTrafficVehicles(prev.vehicles)
          const updatedObstacles = updateDynamicObstacles(prev.obstacles)
          
          return {
            ...prev,
            egoVehicle: autonomousResult.vehicle,
            vehicles: updatedVehicles,
            obstacles: updatedObstacles,
            collisionDetected: autonomousResult.collisionRisk,
            currentManeuver: autonomousResult.maneuver
          }
        })
        
        // 성능 지표 업데이트
        setPerformance(prev => ({
          ...prev,
          averageSpeed: simulation.egoVehicle.speed,
          efficiency: Math.max(0, prev.efficiency - (simulation.collisionDetected ? 10 : 0))
        }))
      }, 100)
      
      const animate = () => {
        renderScene()
        animationRef.current = requestAnimationFrame(animate)
      }
      animate()
      
      return () => {
        clearInterval(interval)
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    }
  }, [isRunning, simulation])

  const startSimulation = () => {
    setIsRunning(true)
    loadScenario(scenario)
  }

  const stopSimulation = () => {
    setIsRunning(false)
  }

  const resetSimulation = () => {
    setIsRunning(false)
    loadScenario(scenario)
    setPerformance({
      averageSpeed: 0,
      collisions: 0,
      emergencyBrakes: 0,
      laneChanges: 0,
      efficiency: 100
    })
  }

  const loadScenario = (scenarioType: keyof typeof scenarios) => {
    const scenarioData = scenarios[scenarioType]
    setSimulation(prev => ({
      ...prev,
      vehicles: scenarioData.vehicles as Vehicle[],
      obstacles: scenarioData.obstacles as Obstacle[],
      egoVehicle: { ...prev.egoVehicle, x: 100, y: 300, angle: 0, speed: 0 },
      collisionDetected: false,
      currentManeuver: 'Initializing'
    }))
  }

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    
    setSimulation(prev => ({
      ...prev,
      targetPoint: { x, y }
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link 
                href="/modules/autonomous-mobility"
                className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>자율주행 모듈로 돌아가기</span>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={startSimulation}
                disabled={isRunning}
                className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50"
              >
                <Play className="w-4 h-4" />
                시작
              </button>
              <button
                onClick={stopSimulation}
                disabled={!isRunning}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50"
              >
                <Pause className="w-4 h-4" />
                정지
              </button>
              <button
                onClick={resetSimulation}
                className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                <RotateCcw className="w-4 h-4" />
                리셋
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            🚗 자율주행 시뮬레이터
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            CARLA 기반 가상 환경에서 자율주행 알고리즘을 테스트하고 성능을 평가합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Controls */}
          <div className="xl:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                시뮬레이션 설정
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    시나리오
                  </label>
                  <select
                    value={scenario}
                    onChange={(e) => {
                      setScenario(e.target.value as any)
                      loadScenario(e.target.value as any)
                    }}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {Object.entries(scenarios).map(([key, scenario]) => (
                      <option key={key} value={key}>{scenario.name}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {scenarios[scenario].description}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    자율주행 레벨: SAE Level {autonomyLevel}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    value={autonomyLevel}
                    onChange={(e) => setAutonomyLevel(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {autonomyLevel === 0 && "수동 운전"}
                    {autonomyLevel === 1 && "운전자 보조"}
                    {autonomyLevel === 2 && "부분 자동화"}
                    {autonomyLevel === 3 && "조건부 자동화"}
                    {autonomyLevel === 4 && "고도 자동화"}
                    {autonomyLevel === 5 && "완전 자동화"}
                  </div>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Car className="w-5 h-5" />
                차량 상태
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">현재 동작</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {simulation.currentManeuver}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">속도</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {simulation.egoVehicle.speed.toFixed(1)} m/s
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">위치</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    ({simulation.egoVehicle.x.toFixed(0)}, {simulation.egoVehicle.y.toFixed(0)})
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">방향</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {simulation.egoVehicle.angle.toFixed(0)}°
                  </span>
                </div>
                
                {simulation.collisionDetected && (
                  <div className="flex items-center gap-2 p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                    <span className="text-sm text-red-800 dark:text-red-200">충돌 위험 감지</span>
                  </div>
                )}
              </div>
            </div>

            {/* Performance */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                성능 지표
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">평균 속도</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {performance.averageSpeed.toFixed(1)} m/s
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">충돌 횟수</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {performance.collisions}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">급제동</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {performance.emergencyBrakes}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">효율성</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {performance.efficiency.toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Canvas */}
          <div className="xl:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Navigation className="w-5 h-5" />
                시뮬레이션 환경
              </h3>
              
              <canvas
                ref={canvasRef}
                width={800}
                height={600}
                onClick={handleCanvasClick}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg cursor-crosshair"
              />
              
              <div className="mt-4 flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span className="text-gray-600 dark:text-gray-400">자율주행 차량</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span className="text-gray-600 dark:text-gray-400">교통 차량</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-500 rounded"></div>
                  <span className="text-gray-600 dark:text-gray-400">정적 장애물</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                  <span className="text-gray-600 dark:text-gray-400">동적 장애물</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-400">목표점</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                💡 캔버스를 클릭하여 목표점을 설정하세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}