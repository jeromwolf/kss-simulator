'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, Radio, Settings, Play, Pause, RotateCcw, Wifi, Car, MapPin, Activity, Zap, AlertTriangle, Clock } from 'lucide-react'

interface Vehicle {
  id: string
  x: number
  y: number
  speed: number
  direction: number
  type: 'passenger' | 'emergency' | 'bus' | 'truck'
  v2xEnabled: boolean
  messages: V2XMessage[]
  color: string
}

interface Infrastructure {
  id: string
  x: number
  y: number
  type: 'traffic_light' | 'rsu' | 'camera' | 'sensor'
  range: number
  status: 'active' | 'inactive' | 'maintenance'
  data: any
}

interface V2XMessage {
  id: string
  from: string
  to: string
  type: 'BSM' | 'SPaT' | 'MAP' | 'CAM' | 'DENM' | 'CPM'
  priority: 'low' | 'medium' | 'high' | 'emergency'
  content: string
  timestamp: number
  range: number
}

interface EmergencyScenario {
  id: string
  type: 'accident' | 'emergency_vehicle' | 'road_work' | 'weather'
  x: number
  y: number
  active: boolean
  duration: number
}

export default function V2XNetworkSimPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [scenario, setScenario] = useState<'urban' | 'highway' | 'intersection' | 'emergency'>('urban')
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [infrastructure, setInfrastructure] = useState<Infrastructure[]>([])
  const [messages, setMessages] = useState<V2XMessage[]>([])
  const [emergencyScenario, setEmergencyScenario] = useState<EmergencyScenario | null>(null)
  const [settings, setSettings] = useState({
    vehicleCount: 15,
    v2xPenetration: 0.8, // V2X 장착률
    networkLatency: 10,   // ms
    messageFrequency: 10, // Hz
    transmissionRange: 300, // meters
    showMessages: true,
    showCoverage: true
  })
  const [networkStats, setNetworkStats] = useState({
    totalMessages: 0,
    successRate: 0,
    avgLatency: 0,
    collisionPrevented: 0,
    congestionReduced: 0
  })
  
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  // 시나리오별 설정
  const scenarios = {
    urban: {
      name: '도심 교통',
      description: 'V2I 통신으로 스마트 신호등 제어',
      vehicleCount: 12,
      infrastructureTypes: ['traffic_light', 'rsu', 'camera']
    },
    highway: {
      name: '고속도로',
      description: 'V2V 통신으로 군집주행 및 차선변경',
      vehicleCount: 20,
      infrastructureTypes: ['rsu', 'sensor']
    },
    intersection: {
      name: '교차로',
      description: 'SPaT 메시지로 신호 정보 공유',
      vehicleCount: 8,
      infrastructureTypes: ['traffic_light', 'camera', 'sensor']
    },
    emergency: {
      name: '응급상황',
      description: 'DENM 메시지로 위험 상황 전파',
      vehicleCount: 15,
      infrastructureTypes: ['traffic_light', 'rsu', 'camera', 'sensor']
    }
  }

  // V2X 메시지 타입별 색상
  const messageColors = {
    BSM: '#3b82f6',   // Basic Safety Message - 파란색
    SPaT: '#10b981',  // Signal Phase and Timing - 초록색
    MAP: '#f59e0b',   // Map Data - 노란색
    CAM: '#8b5cf6',   // Cooperative Awareness Message - 보라색
    DENM: '#ef4444',  // Decentralized Environmental Notification Message - 빨간색
    CPM: '#06b6d4'    // Collective Perception Message - 청록색
  }

  // 초기 시나리오 로드
  useEffect(() => {
    loadScenario(scenario)
  }, [scenario])

  const loadScenario = (scenarioType: keyof typeof scenarios) => {
    const scenarioConfig = scenarios[scenarioType]
    
    // 차량 생성
    const newVehicles: Vehicle[] = []
    for (let i = 0; i < scenarioConfig.vehicleCount; i++) {
      const types: Vehicle['type'][] = ['passenger', 'passenger', 'passenger', 'bus', 'truck']
      const type = types[Math.floor(Math.random() * types.length)]
      
      newVehicles.push({
        id: `vehicle_${i}`,
        x: Math.random() * 700 + 50,
        y: Math.random() * 500 + 50,
        speed: Math.random() * 20 + 10,
        direction: Math.random() * 360,
        type,
        v2xEnabled: Math.random() < settings.v2xPenetration,
        messages: [],
        color: type === 'emergency' ? '#ef4444' : 
               type === 'bus' ? '#10b981' :
               type === 'truck' ? '#f59e0b' : '#3b82f6'
      })
    }

    // 인프라 생성
    const newInfrastructure: Infrastructure[] = []
    scenarioConfig.infrastructureTypes.forEach((type, idx) => {
      newInfrastructure.push({
        id: `infra_${idx}`,
        x: (idx + 1) * (800 / (scenarioConfig.infrastructureTypes.length + 1)),
        y: 200 + Math.random() * 200,
        type: type as Infrastructure['type'],
        range: type === 'traffic_light' ? 150 : 300,
        status: 'active',
        data: type === 'traffic_light' ? { phase: 'green', timing: 30 } : {}
      })
    })

    setVehicles(newVehicles)
    setInfrastructure(newInfrastructure)
    setMessages([])
    setEmergencyScenario(null)
  }

  // V2X 메시지 생성
  const generateV2XMessages = () => {
    const newMessages: V2XMessage[] = []
    
    vehicles.forEach(vehicle => {
      if (!vehicle.v2xEnabled) return
      
      // BSM (Basic Safety Message) - 모든 차량이 주기적으로 송신
      if (Math.random() < 0.8) {
        newMessages.push({
          id: `msg_${Date.now()}_${vehicle.id}`,
          from: vehicle.id,
          to: 'broadcast',
          type: 'BSM',
          priority: 'medium',
          content: `Position: (${vehicle.x.toFixed(0)}, ${vehicle.y.toFixed(0)}), Speed: ${vehicle.speed.toFixed(1)} m/s`,
          timestamp: Date.now(),
          range: settings.transmissionRange
        })
      }

      // CAM (Cooperative Awareness Message) - 협력 인식
      const nearbyVehicles = vehicles.filter(v => 
        v.id !== vehicle.id && 
        Math.sqrt((v.x - vehicle.x) ** 2 + (v.y - vehicle.y) ** 2) < 100
      )
      
      if (nearbyVehicles.length > 0 && Math.random() < 0.3) {
        newMessages.push({
          id: `cam_${Date.now()}_${vehicle.id}`,
          from: vehicle.id,
          to: 'broadcast',
          type: 'CAM',
          priority: 'medium',
          content: `Nearby vehicles detected: ${nearbyVehicles.length}`,
          timestamp: Date.now(),
          range: settings.transmissionRange
        })
      }
    })

    // 인프라에서 보내는 메시지
    infrastructure.forEach(infra => {
      if (infra.status !== 'active') return
      
      if (infra.type === 'traffic_light' && Math.random() < 0.5) {
        newMessages.push({
          id: `spat_${Date.now()}_${infra.id}`,
          from: infra.id,
          to: 'broadcast',
          type: 'SPaT',
          priority: 'high',
          content: `Traffic light: ${infra.data.phase}, Time remaining: ${infra.data.timing}s`,
          timestamp: Date.now(),
          range: infra.range
        })
      }

      if (infra.type === 'rsu' && Math.random() < 0.3) {
        newMessages.push({
          id: `map_${Date.now()}_${infra.id}`,
          from: infra.id,
          to: 'broadcast',
          type: 'MAP',
          priority: 'low',
          content: 'Road topology and geometry data',
          timestamp: Date.now(),
          range: infra.range
        })
      }
    })

    // 응급 상황 메시지
    if (emergencyScenario?.active) {
      newMessages.push({
        id: `denm_${Date.now()}_emergency`,
        from: 'emergency_system',
        to: 'broadcast',
        type: 'DENM',
        priority: 'emergency',
        content: `Emergency: ${emergencyScenario.type} at (${emergencyScenario.x}, ${emergencyScenario.y})`,
        timestamp: Date.now(),
        range: 500
      })
    }

    setMessages(prev => [...prev, ...newMessages].slice(-100)) // 최근 100개만 유지
    
    // 통계 업데이트
    setNetworkStats(prev => ({
      ...prev,
      totalMessages: prev.totalMessages + newMessages.length,
      successRate: Math.random() * 10 + 90, // 시뮬레이션
      avgLatency: settings.networkLatency + Math.random() * 5
    }))
  }

  // 차량 이동 업데이트
  const updateVehicles = () => {
    setVehicles(prev => prev.map(vehicle => {
      let newX = vehicle.x
      let newY = vehicle.y
      let newDirection = vehicle.direction
      let newSpeed = vehicle.speed

      // V2X 메시지에 따른 행동 조정
      if (vehicle.v2xEnabled) {
        // 신호등 정보 확인
        const nearbyTrafficLights = infrastructure.filter(infra => 
          infra.type === 'traffic_light' &&
          Math.sqrt((infra.x - vehicle.x) ** 2 + (infra.y - vehicle.y) ** 2) < infra.range
        )

        if (nearbyTrafficLights.length > 0) {
          const light = nearbyTrafficLights[0]
          if (light.data.phase === 'red' && 
              Math.sqrt((light.x - vehicle.x) ** 2 + (light.y - vehicle.y) ** 2) < 50) {
            newSpeed = Math.max(0, newSpeed - 2) // 감속
          }
        }

        // 응급 차량 우선권
        if (emergencyScenario?.active && vehicle.type !== 'emergency') {
          const distanceToEmergency = Math.sqrt(
            (emergencyScenario.x - vehicle.x) ** 2 + 
            (emergencyScenario.y - vehicle.y) ** 2
          )
          if (distanceToEmergency < 100) {
            // 응급 차량을 위해 비켜주기
            newDirection += Math.random() * 90 - 45
            newSpeed = Math.max(5, newSpeed - 5)
          }
        }

        // 충돌 회피
        const nearbyVehicles = vehicles.filter(v => 
          v.id !== vehicle.id && 
          Math.sqrt((v.x - vehicle.x) ** 2 + (v.y - vehicle.y) ** 2) < 30
        )
        if (nearbyVehicles.length > 0) {
          newSpeed = Math.max(0, newSpeed - 3)
          newDirection += (Math.random() - 0.5) * 30
        }
      }

      // 위치 업데이트
      const radDirection = newDirection * Math.PI / 180
      newX += newSpeed * Math.cos(radDirection) * 0.1
      newY += newSpeed * Math.sin(radDirection) * 0.1

      // 경계 처리
      if (newX < 0 || newX > 800) newDirection = 180 - newDirection
      if (newY < 0 || newY > 600) newDirection = -newDirection
      
      newX = Math.max(0, Math.min(800, newX))
      newY = Math.max(0, Math.min(600, newY))

      return {
        ...vehicle,
        x: newX,
        y: newY,
        direction: newDirection,
        speed: newSpeed
      }
    }))
  }

  // 인프라 상태 업데이트
  const updateInfrastructure = () => {
    setInfrastructure(prev => prev.map(infra => {
      if (infra.type === 'traffic_light') {
        const newTiming = infra.data.timing - 1
        if (newTiming <= 0) {
          const phases = ['green', 'yellow', 'red']
          const currentIndex = phases.indexOf(infra.data.phase)
          const nextPhase = phases[(currentIndex + 1) % phases.length]
          const nextTiming = nextPhase === 'yellow' ? 5 : 30
          
          return {
            ...infra,
            data: { phase: nextPhase, timing: nextTiming }
          }
        } else {
          return {
            ...infra,
            data: { ...infra.data, timing: newTiming }
          }
        }
      }
      return infra
    }))
  }

  // 응급 상황 생성
  const triggerEmergencyScenario = () => {
    const emergencyTypes: EmergencyScenario['type'][] = ['accident', 'emergency_vehicle', 'road_work', 'weather']
    const type = emergencyTypes[Math.floor(Math.random() * emergencyTypes.length)]
    
    setEmergencyScenario({
      id: `emergency_${Date.now()}`,
      type,
      x: Math.random() * 600 + 100,
      y: Math.random() * 400 + 100,
      active: true,
      duration: 30 // 30초
    })

    // 응급 차량 추가 (응급 상황인 경우)
    if (type === 'emergency_vehicle') {
      const emergencyVehicle: Vehicle = {
        id: 'emergency_vehicle',
        x: 50,
        y: 300,
        speed: 25,
        direction: 0,
        type: 'emergency',
        v2xEnabled: true,
        messages: [],
        color: '#ef4444'
      }
      setVehicles(prev => [...prev, emergencyVehicle])
    }
  }

  // 시뮬레이션 루프
  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        updateVehicles()
        updateInfrastructure()
        generateV2XMessages()
        
        // 응급 상황 지속 시간 감소
        if (emergencyScenario) {
          setEmergencyScenario(prev => {
            if (!prev) return null
            const newDuration = prev.duration - 1
            if (newDuration <= 0) {
              // 응급 차량 제거
              setVehicles(v => v.filter(vehicle => vehicle.id !== 'emergency_vehicle'))
              return null
            }
            return { ...prev, duration: newDuration }
          })
        }
      }, 1000)
      
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
  }, [isRunning, vehicles, infrastructure, messages, emergencyScenario, settings])

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
    
    // 도로 라인
    ctx.strokeStyle = '#ffffff'
    ctx.lineWidth = 2
    ctx.setLineDash([15, 15])
    
    // 수평 도로
    for (let y = 150; y < canvas.height; y += 150) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }
    
    // 수직 도로
    for (let x = 200; x < canvas.width; x += 200) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }
    ctx.setLineDash([])

    // 통신 범위 표시 (설정에 따라)
    if (settings.showCoverage) {
      infrastructure.forEach(infra => {
        if (infra.status === 'active') {
          ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)'
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.arc(infra.x, infra.y, infra.range * 0.5, 0, 2 * Math.PI) // 스케일 조정
          ctx.stroke()
        }
      })
    }

    // V2X 메시지 시각화
    if (settings.showMessages) {
      const recentMessages = messages.filter(msg => Date.now() - msg.timestamp < 3000)
      recentMessages.forEach(msg => {
        const sender = vehicles.find(v => v.id === msg.from) || 
                      infrastructure.find(i => i.id === msg.from)
        if (!sender) return

        ctx.strokeStyle = messageColors[msg.type] + '60'
        ctx.lineWidth = msg.priority === 'emergency' ? 4 : 2
        ctx.beginPath()
        ctx.arc(sender.x, sender.y, msg.range * 0.3, 0, 2 * Math.PI)
        ctx.stroke()

        // 메시지 우선순위 표시
        if (msg.priority === 'emergency') {
          ctx.fillStyle = messageColors[msg.type]
          ctx.beginPath()
          ctx.arc(sender.x, sender.y, 5, 0, 2 * Math.PI)
          ctx.fill()
        }
      })
    }

    // 인프라 렌더링
    infrastructure.forEach(infra => {
      const size = 20
      
      ctx.fillStyle = infra.status === 'active' ? '#10b981' : '#6b7280'
      
      if (infra.type === 'traffic_light') {
        ctx.fillRect(infra.x - size/2, infra.y - size/2, size, size)
        
        // 신호등 상태 표시
        const lightColor = infra.data.phase === 'green' ? '#10b981' :
                          infra.data.phase === 'yellow' ? '#f59e0b' : '#ef4444'
        ctx.fillStyle = lightColor
        ctx.beginPath()
        ctx.arc(infra.x, infra.y, 8, 0, 2 * Math.PI)
        ctx.fill()
        
        // 타이머 표시
        ctx.fillStyle = '#ffffff'
        ctx.font = '10px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(infra.data.timing.toString(), infra.x, infra.y + 3)
      } else {
        ctx.beginPath()
        ctx.arc(infra.x, infra.y, size/2, 0, 2 * Math.PI)
        ctx.fill()
        
        // 타입 표시
        ctx.fillStyle = '#ffffff'
        ctx.font = '8px sans-serif'
        ctx.textAlign = 'center'
        const typeLabel = infra.type === 'rsu' ? 'RSU' :
                         infra.type === 'camera' ? 'CAM' : 'SNS'
        ctx.fillText(typeLabel, infra.x, infra.y + 2)
      }
      
      ctx.textAlign = 'left'
    })

    // 차량 렌더링
    vehicles.forEach(vehicle => {
      ctx.save()
      ctx.translate(vehicle.x, vehicle.y)
      ctx.rotate(vehicle.direction * Math.PI / 180)
      
      // 차량 몸체
      const width = vehicle.type === 'truck' ? 25 : vehicle.type === 'bus' ? 30 : 20
      const height = 12
      
      ctx.fillStyle = vehicle.color
      ctx.fillRect(-width/2, -height/2, width, height)
      
      // V2X 장착 표시
      if (vehicle.v2xEnabled) {
        ctx.strokeStyle = '#10b981'
        ctx.lineWidth = 2
        ctx.strokeRect(-width/2, -height/2, width, height)
        
        // V2X 안테나
        ctx.fillStyle = '#10b981'
        ctx.fillRect(-2, -height/2 - 5, 4, 5)
      }
      
      // 응급 차량 표시
      if (vehicle.type === 'emergency') {
        ctx.fillStyle = '#ffffff'
        ctx.font = 'bold 8px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText('E', 0, 2)
      }
      
      ctx.restore()
      
      // 속도 표시
      ctx.fillStyle = '#ffffff'
      ctx.font = '8px sans-serif'
      ctx.fillText(`${vehicle.speed.toFixed(0)}`, vehicle.x - 10, vehicle.y - 15)
    })

    // 응급 상황 표시
    if (emergencyScenario?.active) {
      ctx.fillStyle = 'rgba(239, 68, 68, 0.3)'
      ctx.beginPath()
      ctx.arc(emergencyScenario.x, emergencyScenario.y, 50, 0, 2 * Math.PI)
      ctx.fill()
      
      ctx.fillStyle = '#ef4444'
      ctx.font = 'bold 12px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('⚠️', emergencyScenario.x, emergencyScenario.y)
      ctx.fillText(emergencyScenario.type.toUpperCase(), emergencyScenario.x, emergencyScenario.y + 15)
      ctx.fillText(`${emergencyScenario.duration}s`, emergencyScenario.x, emergencyScenario.y + 30)
      
      ctx.textAlign = 'left'
    }
  }

  const startSimulation = () => {
    setIsRunning(true)
  }

  const stopSimulation = () => {
    setIsRunning(false)
  }

  const resetSimulation = () => {
    setIsRunning(false)
    loadScenario(scenario)
    setNetworkStats({
      totalMessages: 0,
      successRate: 0,
      avgLatency: 0,
      collisionPrevented: 0,
      congestionReduced: 0
    })
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
              <button
                onClick={triggerEmergencyScenario}
                disabled={!!emergencyScenario}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                <AlertTriangle className="w-4 h-4" />
                응급상황
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            📡 V2X 네트워크 시뮬레이터
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Vehicle-to-Everything 통신과 스마트 인프라 연동을 실시간으로 시뮬레이션합니다.
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
                    onChange={(e) => setScenario(e.target.value as any)}
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
                    V2X 장착률: {(settings.v2xPenetration * 100).toFixed(0)}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={settings.v2xPenetration}
                    onChange={(e) => setSettings(prev => ({ ...prev, v2xPenetration: parseFloat(e.target.value) }))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    네트워크 지연: {settings.networkLatency}ms
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={settings.networkLatency}
                    onChange={(e) => setSettings(prev => ({ ...prev, networkLatency: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    전송 범위: {settings.transmissionRange}m
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="500"
                    value={settings.transmissionRange}
                    onChange={(e) => setSettings(prev => ({ ...prev, transmissionRange: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={settings.showMessages}
                      onChange={(e) => setSettings(prev => ({ ...prev, showMessages: e.target.checked }))}
                      className="rounded"
                    />
                    <span className="text-gray-900 dark:text-white">메시지 시각화</span>
                  </label>
                </div>

                <div>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={settings.showCoverage}
                      onChange={(e) => setSettings(prev => ({ ...prev, showCoverage: e.target.checked }))}
                      className="rounded"
                    />
                    <span className="text-gray-900 dark:text-white">통신 범위 표시</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Network Statistics */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5" />
                네트워크 통계
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">총 메시지</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {networkStats.totalMessages}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">성공률</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {networkStats.successRate.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">평균 지연</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {networkStats.avgLatency.toFixed(1)}ms
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">V2X 차량</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {vehicles.filter(v => v.v2xEnabled).length} / {vehicles.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">활성 인프라</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {infrastructure.filter(i => i.status === 'active').length}
                  </span>
                </div>
              </div>
            </div>

            {/* Message Types */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Radio className="w-5 h-5" />
                메시지 타입
              </h3>
              
              <div className="space-y-2">
                {Object.entries(messageColors).map(([type, color]) => (
                  <div key={type} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded"
                        style={{ backgroundColor: color }}
                      ></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{type}</span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {messages.filter(m => m.type === type).length}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Canvas */}
          <div className="xl:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Wifi className="w-5 h-5" />
                V2X 네트워크 시각화
              </h3>
              
              <canvas
                ref={canvasRef}
                width={800}
                height={600}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg"
              />
              
              <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span className="text-gray-600 dark:text-gray-400">승용차</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span className="text-gray-600 dark:text-gray-400">버스</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                  <span className="text-gray-600 dark:text-gray-400">트럭</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span className="text-gray-600 dark:text-gray-400">응급차량</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 border-2 border-green-600 rounded"></div>
                  <span className="text-gray-600 dark:text-gray-400">V2X 장착</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                💡 실시간 V2V, V2I, V2P 통신을 통한 협력적 지능형 교통 시스템을 체험하세요.
              </p>
            </div>

            {/* Recent Messages */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                최근 메시지
              </h3>
              
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {messages.slice(-10).reverse().map((message, idx) => (
                  <div key={message.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: messageColors[message.type] }}
                        ></div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {message.type}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          message.priority === 'emergency' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                          message.priority === 'high' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300'
                        }`}>
                          {message.priority}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      From: {message.from} → To: {message.to}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {message.content}
                    </p>
                  </div>
                ))}
                {messages.length === 0 && (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-4">
                    시뮬레이션을 시작하여 V2X 메시지를 확인하세요.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}