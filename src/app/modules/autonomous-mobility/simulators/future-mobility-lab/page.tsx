'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, Plane, Settings, Play, Pause, RotateCcw, Zap, Car, MapPin, Activity, Clock, Wind, Battery } from 'lucide-react'

interface UAMVehicle {
  id: string
  x: number
  y: number
  z: number
  type: 'passenger' | 'cargo' | 'emergency' | 'taxi'
  speed: number
  direction: number
  batteryLevel: number
  flightPath: {x: number, y: number, z: number}[]
  status: 'takeoff' | 'cruise' | 'landing' | 'charging'
}

interface Vertiport {
  id: string
  x: number
  y: number
  type: 'passenger' | 'cargo' | 'emergency'
  capacity: number
  occupied: number
  chargingStations: number
  weatherStatus: 'clear' | 'windy' | 'stormy'
}

interface HyperloopPod {
  id: string
  position: number // 0-1 along the track
  speed: number
  passengers: number
  capacity: number
  status: 'loading' | 'accelerating' | 'cruise' | 'braking' | 'arrived'
}

interface TrafficDemand {
  time: number
  uamRequests: number
  hyperloopRequests: number
  traditionalTraffic: number
  congestionLevel: number
}

interface FutureMobilityState {
  scenario: 'uam_city' | 'hyperloop_network' | 'integrated_mobility' | 'smart_logistics'
  uamVehicles: UAMVehicle[]
  vertiports: Vertiport[]
  hyperloopPods: HyperloopPod[]
  trafficDemand: TrafficDemand
  weatherConditions: {
    windSpeed: number
    visibility: number
    precipitation: number
  }
  energyConsumption: {
    uam: number
    hyperloop: number
    traditional: number
  }
  emissions: {
    co2Saved: number
    noiseReduction: number
  }
}

export default function FutureMobilityLabPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [state, setState] = useState<FutureMobilityState>({
    scenario: 'integrated_mobility',
    uamVehicles: [],
    vertiports: [],
    hyperloopPods: [],
    trafficDemand: {
      time: 0,
      uamRequests: 0,
      hyperloopRequests: 0,
      traditionalTraffic: 100,
      congestionLevel: 50
    },
    weatherConditions: {
      windSpeed: 5,
      visibility: 100,
      precipitation: 0
    },
    energyConsumption: {
      uam: 0,
      hyperloop: 0,
      traditional: 100
    },
    emissions: {
      co2Saved: 0,
      noiseReduction: 0
    }
  })
  
  const [settings, setSettings] = useState({
    uamDensity: 0.3,
    hyperloopFrequency: 0.5,
    weatherVariation: true,
    showFlightPaths: true,
    showEnergyFlow: true,
    simulationSpeed: 1.0
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  // 시나리오별 설정
  const scenarios = {
    uam_city: {
      name: 'UAM 스마트시티',
      description: '도심 항공 모빌리티 중심의 교통 체계',
      uamCount: 12,
      vertiportCount: 8
    },
    hyperloop_network: {
      name: '하이퍼루프 네트워크',
      description: '초고속 진공 튜브 교통 시스템',
      podCount: 6,
      stationCount: 4
    },
    integrated_mobility: {
      name: '통합 모빌리티',
      description: 'UAM + 하이퍼루프 + 자율주행 통합 시스템',
      uamCount: 8,
      podCount: 4,
      vertiportCount: 6
    },
    smart_logistics: {
      name: '스마트 물류',
      description: '무인 드론 + 자율차량 통합 물류 시스템',
      uamCount: 15,
      vertiportCount: 4
    }
  }

  // 시나리오 초기화
  useEffect(() => {
    loadScenario(state.scenario)
  }, [state.scenario])

  const loadScenario = (scenarioType: keyof typeof scenarios) => {
    const config = scenarios[scenarioType]
    
    // Vertiport 생성
    const vertiports: Vertiport[] = []
    if ('vertiportCount' in config && config.vertiportCount) {
      for (let i = 0; i < config.vertiportCount; i++) {
        vertiports.push({
          id: `vertiport_${i}`,
          x: (i % 3) * 300 + 150,
          y: Math.floor(i / 3) * 200 + 100,
          type: i === 0 ? 'emergency' : i % 3 === 0 ? 'cargo' : 'passenger',
          capacity: 4,
          occupied: Math.floor(Math.random() * 3),
          chargingStations: 2,
          weatherStatus: 'clear'
        })
      }
    }

    // UAM 차량 생성
    const uamVehicles: UAMVehicle[] = []
    if ('uamCount' in config && config.uamCount) {
      for (let i = 0; i < config.uamCount; i++) {
        const origin = vertiports[Math.floor(Math.random() * vertiports.length)]
        const destination = vertiports[Math.floor(Math.random() * vertiports.length)]
        
        uamVehicles.push({
          id: `uam_${i}`,
          x: origin?.x || Math.random() * 800,
          y: origin?.y || Math.random() * 600,
          z: Math.random() * 200 + 50,
          type: i === 0 ? 'emergency' : ['passenger', 'cargo', 'taxi'][Math.floor(Math.random() * 3)] as any,
          speed: Math.random() * 30 + 20,
          direction: Math.random() * 360,
          batteryLevel: Math.random() * 40 + 60,
          flightPath: destination ? [
            { x: origin?.x || 0, y: origin?.y || 0, z: 50 },
            { x: destination.x, y: destination.y, z: 100 },
            { x: destination.x, y: destination.y, z: 50 }
          ] : [],
          status: ['takeoff', 'cruise', 'landing'][Math.floor(Math.random() * 3)] as any
        })
      }
    }

    // 하이퍼루프 포드 생성
    const hyperloopPods: HyperloopPod[] = []
    if ('podCount' in config && config.podCount) {
      for (let i = 0; i < config.podCount; i++) {
        hyperloopPods.push({
          id: `pod_${i}`,
          position: Math.random(),
          speed: Math.random() * 300 + 200, // km/h
          passengers: Math.floor(Math.random() * 25) + 5,
          capacity: 30,
          status: ['loading', 'accelerating', 'cruise', 'braking'][Math.floor(Math.random() * 4)] as any
        })
      }
    }

    setState(prev => ({
      ...prev,
      scenario: scenarioType,
      uamVehicles,
      vertiports,
      hyperloopPods
    }))
  }

  // UAM 운항 업데이트
  const updateUAMVehicles = () => {
    setState(prev => ({
      ...prev,
      uamVehicles: prev.uamVehicles.map(vehicle => {
        let newX = vehicle.x
        let newY = vehicle.y
        let newZ = vehicle.z
        let newBattery = vehicle.batteryLevel
        let newStatus = vehicle.status

        // 날씨 영향
        const weatherImpact = 1 - (state.weatherConditions.windSpeed / 20)
        const effectiveSpeed = vehicle.speed * weatherImpact

        // 비행 경로 따라 이동
        if (vehicle.flightPath.length > 0) {
          const target = vehicle.flightPath[0]
          const dx = target.x - vehicle.x
          const dy = target.y - vehicle.y
          const dz = target.z - vehicle.z
          const distance = Math.sqrt(dx ** 2 + dy ** 2 + dz ** 2)

          if (distance < 20) {
            // 목표점 도달, 다음 포인트로
            vehicle.flightPath.shift()
            if (vehicle.flightPath.length === 0) {
              newStatus = 'landing'
            }
          } else {
            // 목표점으로 이동
            const moveDistance = effectiveSpeed * 0.1
            newX += (dx / distance) * moveDistance
            newY += (dy / distance) * moveDistance
            newZ += (dz / distance) * moveDistance * 0.5 // 고도 변화는 더 천천히
          }
        } else {
          // 랜덤 이동 (패트롤)
          const angleRad = vehicle.direction * Math.PI / 180
          newX += effectiveSpeed * Math.cos(angleRad) * 0.1
          newY += effectiveSpeed * Math.sin(angleRad) * 0.1
          
          // 경계 처리
          if (newX < 50 || newX > 750) vehicle.direction = 180 - vehicle.direction
          if (newY < 50 || newY > 550) vehicle.direction = -vehicle.direction
        }

        // 배터리 소모
        newBattery -= 0.1
        if (newBattery < 20) {
          newStatus = 'charging'
          // 가장 가까운 버티포트로 이동
          const nearestVertiport = prev.vertiports.reduce((closest, port) => {
            const distToCurrent = Math.sqrt((port.x - newX) ** 2 + (port.y - newY) ** 2)
            const distToClosest = Math.sqrt((closest.x - newX) ** 2 + (closest.y - newY) ** 2)
            return distToCurrent < distToClosest ? port : closest
          })
          
          if (nearestVertiport) {
            vehicle.flightPath = [
              { x: nearestVertiport.x, y: nearestVertiport.y, z: 50 }
            ]
          }
        }

        return {
          ...vehicle,
          x: Math.max(0, Math.min(800, newX)),
          y: Math.max(0, Math.min(600, newY)),
          z: Math.max(30, Math.min(200, newZ)),
          batteryLevel: Math.max(0, newBattery),
          status: newStatus
        }
      })
    }))
  }

  // 하이퍼루프 포드 업데이트
  const updateHyperloopPods = () => {
    setState(prev => ({
      ...prev,
      hyperloopPods: prev.hyperloopPods.map(pod => {
        let newPosition = pod.position
        let newSpeed = pod.speed
        let newStatus = pod.status

        switch (pod.status) {
          case 'loading':
            if (Math.random() < 0.1) newStatus = 'accelerating'
            break
          case 'accelerating':
            newSpeed = Math.min(400, newSpeed + 10)
            newPosition += newSpeed / 1000 * 0.1
            if (newSpeed > 350) newStatus = 'cruise'
            break
          case 'cruise':
            newPosition += newSpeed / 1000 * 0.1
            if (newPosition > 0.8) newStatus = 'braking'
            break
          case 'braking':
            newSpeed = Math.max(20, newSpeed - 15)
            newPosition += newSpeed / 1000 * 0.1
            if (newPosition >= 1.0) {
              newPosition = 0
              newStatus = 'loading'
              newSpeed = 0
            }
            break
        }

        return {
          ...pod,
          position: newPosition,
          speed: newSpeed,
          status: newStatus
        }
      })
    }))
  }

  // 교통 수요 및 환경 데이터 업데이트
  const updateMetrics = () => {
    const hour = (currentTime / 60) % 24
    const rushHourMultiplier = hour >= 7 && hour <= 9 || hour >= 17 && hour <= 19 ? 1.5 : 1.0
    
    setState(prev => {
      const activeUAM = prev.uamVehicles.filter(v => v.status !== 'charging').length
      const activePods = prev.hyperloopPods.filter(p => p.status !== 'loading').length
      
      const uamCapacity = activeUAM * 4 // 평균 승객 수
      const podCapacity = activePods * 25 // 평균 승객 수
      const totalCapacity = uamCapacity + podCapacity
      
      // 기존 교통량 대비 대체 효과
      const traditionalReduction = Math.min(50, totalCapacity / 2)
      const congestionReduction = traditionalReduction * 0.8
      
      return {
        ...prev,
        trafficDemand: {
          time: currentTime,
          uamRequests: Math.floor(activeUAM * rushHourMultiplier),
          hyperloopRequests: Math.floor(activePods * rushHourMultiplier),
          traditionalTraffic: Math.max(50, 100 - traditionalReduction),
          congestionLevel: Math.max(10, 50 - congestionReduction)
        },
        energyConsumption: {
          uam: activeUAM * 2.5, // kWh per vehicle
          hyperloop: activePods * 15, // kWh per pod
          traditional: Math.max(30, 100 - totalCapacity)
        },
        emissions: {
          co2Saved: totalCapacity * 0.5, // kg CO2 saved
          noiseReduction: Math.min(70, activeUAM * 3) // dB reduction
        }
      }
    })
  }

  // 날씨 시뮬레이션
  const updateWeather = () => {
    if (settings.weatherVariation) {
      setState(prev => ({
        ...prev,
        weatherConditions: {
          windSpeed: Math.max(0, Math.min(25, prev.weatherConditions.windSpeed + (Math.random() - 0.5) * 2)),
          visibility: Math.max(20, Math.min(100, prev.weatherConditions.visibility + (Math.random() - 0.5) * 10)),
          precipitation: Math.max(0, Math.min(100, prev.weatherConditions.precipitation + (Math.random() - 0.5) * 5))
        }
      }))
    }
  }

  // Canvas 렌더링
  const renderScene = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // 배경 (스카이라인)
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, '#87ceeb') // 하늘색
    gradient.addColorStop(0.7, '#f0f8ff') // 연한 하늘색
    gradient.addColorStop(1, '#90ee90') // 연한 초록색 (지면)
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // 도시 건물들
    ctx.fillStyle = '#696969'
    for (let i = 0; i < 15; i++) {
      const x = i * 60
      const height = 100 + Math.random() * 200
      ctx.fillRect(x, canvas.height - height, 50, height)
    }

    // 하이퍼루프 트랙 (시나리오에 따라)
    if (state.hyperloopPods.length > 0) {
      ctx.strokeStyle = '#4a5568'
      ctx.lineWidth = 8
      ctx.beginPath()
      ctx.moveTo(50, canvas.height - 50)
      ctx.lineTo(canvas.width - 50, canvas.height - 50)
      ctx.stroke()
      
      // 하이퍼루프 포드
      state.hyperloopPods.forEach(pod => {
        const x = 50 + (canvas.width - 100) * pod.position
        const y = canvas.height - 50
        
        ctx.fillStyle = pod.status === 'cruise' ? '#00bcd4' : '#0288d1'
        ctx.fillRect(x - 15, y - 10, 30, 20)
        
        // 속도 표시
        ctx.fillStyle = '#ffffff'
        ctx.font = '10px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(`${Math.round(pod.speed)} km/h`, x, y - 15)
        
        // 상태 표시
        ctx.fillText(pod.status, x, y + 30)
      })
    }

    // Vertiport
    state.vertiports.forEach(port => {
      // 착륙장
      ctx.fillStyle = port.type === 'emergency' ? '#ff5722' : '#2196f3'
      ctx.beginPath()
      ctx.arc(port.x, port.y, 25, 0, 2 * Math.PI)
      ctx.fill()
      
      // H 마크
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 16px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('H', port.x, port.y + 5)
      
      // 상태 정보
      ctx.fillStyle = '#000000'
      ctx.font = '10px sans-serif'
      ctx.fillText(`${port.occupied}/${port.capacity}`, port.x, port.y + 40)
      
      // 날씨 상태
      const weatherIcon = port.weatherStatus === 'stormy' ? '⛈️' : 
                         port.weatherStatus === 'windy' ? '💨' : '☀️'
      ctx.fillText(weatherIcon, port.x + 30, port.y)
    })

    // UAM 비행체
    state.uamVehicles.forEach(vehicle => {
      ctx.save()
      
      // 고도에 따른 크기 조정
      const altitudeScale = 1 + vehicle.z / 200
      const size = 15 * altitudeScale
      
      ctx.translate(vehicle.x, vehicle.y)
      ctx.rotate(vehicle.direction * Math.PI / 180)
      
      // 그림자 (고도 표현)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
      ctx.fillRect(-size/2, vehicle.z/4, size, size/2)
      
      // 비행체 몸체
      ctx.fillStyle = vehicle.type === 'emergency' ? '#ff5722' :
                      vehicle.type === 'cargo' ? '#ff9800' :
                      vehicle.type === 'taxi' ? '#ffeb3b' : '#2196f3'
      
      // 메인 바디
      ctx.fillRect(-size/2, -size/4, size, size/2)
      
      // 로터 (프로펠러)
      ctx.strokeStyle = 'rgba(100, 100, 100, 0.5)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(-size/3, -size/3, size/4, 0, 2 * Math.PI)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(size/3, -size/3, size/4, 0, 2 * Math.PI)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(-size/3, size/3, size/4, 0, 2 * Math.PI)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(size/3, size/3, size/4, 0, 2 * Math.PI)
      ctx.stroke()
      
      ctx.restore()
      
      // 비행 정보 표시
      ctx.fillStyle = '#000000'
      ctx.font = '9px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(`${Math.round(vehicle.z)}m`, vehicle.x, vehicle.y - 25)
      ctx.fillText(`${Math.round(vehicle.batteryLevel)}%`, vehicle.x, vehicle.y + 35)
      
      // 비행 경로 표시 (설정에 따라)
      if (settings.showFlightPaths && vehicle.flightPath.length > 0) {
        ctx.strokeStyle = 'rgba(33, 150, 243, 0.5)'
        ctx.lineWidth = 2
        ctx.setLineDash([5, 5])
        ctx.beginPath()
        ctx.moveTo(vehicle.x, vehicle.y)
        vehicle.flightPath.forEach(point => {
          ctx.lineTo(point.x, point.y)
        })
        ctx.stroke()
        ctx.setLineDash([])
      }
      
      // 배터리 경고
      if (vehicle.batteryLevel < 30) {
        ctx.fillStyle = '#ff5722'
        ctx.beginPath()
        ctx.arc(vehicle.x + 20, vehicle.y - 20, 5, 0, 2 * Math.PI)
        ctx.fill()
        ctx.fillStyle = '#ffffff'
        ctx.font = '8px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText('!', vehicle.x + 20, vehicle.y - 17)
      }
      
      ctx.textAlign = 'left'
    })

    // 날씨 효과
    if (state.weatherConditions.precipitation > 50) {
      ctx.strokeStyle = 'rgba(100, 150, 200, 0.3)'
      ctx.lineWidth = 1
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width
        const y = (Math.random() * canvas.height + currentTime * 5) % canvas.height
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x + 2, y + 10)
        ctx.stroke()
      }
    }

    // 시간 표시
    ctx.fillStyle = '#000000'
    ctx.font = 'bold 14px sans-serif'
    ctx.fillText(`Time: ${Math.floor(currentTime / 60)}:${(currentTime % 60).toString().padStart(2, '0')}`, 10, 25)
  }

  // 시뮬레이션 루프
  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        updateUAMVehicles()
        updateHyperloopPods()
        updateMetrics()
        updateWeather()
        setCurrentTime(prev => prev + 1 * settings.simulationSpeed)
      }, 1000 / settings.simulationSpeed)
      
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
  }, [isRunning, state, currentTime, settings])

  const startSimulation = () => {
    setIsRunning(true)
  }

  const stopSimulation = () => {
    setIsRunning(false)
  }

  const resetSimulation = () => {
    setIsRunning(false)
    setCurrentTime(0)
    loadScenario(state.scenario)
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
            🚁 미래 모빌리티 실험실
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            UAM, 하이퍼루프, 통합 모빌리티 시스템의 미래 교통 생태계를 시뮬레이션합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Controls */}
          <div className="xl:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                시나리오 설정
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    미래 모빌리티 시나리오
                  </label>
                  <select
                    value={state.scenario}
                    onChange={(e) => setState(prev => ({ ...prev, scenario: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {Object.entries(scenarios).map(([key, scenario]) => (
                      <option key={key} value={key}>{scenario.name}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {scenarios[state.scenario].description}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    UAM 밀도: {(settings.uamDensity * 100).toFixed(0)}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={settings.uamDensity}
                    onChange={(e) => setSettings(prev => ({ ...prev, uamDensity: parseFloat(e.target.value) }))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    시뮬레이션 속도: {settings.simulationSpeed.toFixed(1)}x
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="3.0"
                    step="0.5"
                    value={settings.simulationSpeed}
                    onChange={(e) => setSettings(prev => ({ ...prev, simulationSpeed: parseFloat(e.target.value) }))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={settings.showFlightPaths}
                      onChange={(e) => setSettings(prev => ({ ...prev, showFlightPaths: e.target.checked }))}
                      className="rounded"
                    />
                    <span className="text-gray-900 dark:text-white">비행 경로 표시</span>
                  </label>
                </div>

                <div>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={settings.weatherVariation}
                      onChange={(e) => setSettings(prev => ({ ...prev, weatherVariation: e.target.checked }))}
                      className="rounded"
                    />
                    <span className="text-gray-900 dark:text-white">날씨 변화</span>
                  </label>
                </div>

                <div>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={settings.showEnergyFlow}
                      onChange={(e) => setSettings(prev => ({ ...prev, showEnergyFlow: e.target.checked }))}
                      className="rounded"
                    />
                    <span className="text-gray-900 dark:text-white">에너지 흐름 표시</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Weather Status */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Wind className="w-5 h-5" />
                날씨 상태
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">풍속</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {state.weatherConditions.windSpeed.toFixed(1)} m/s
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">가시거리</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {state.weatherConditions.visibility.toFixed(0)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">강수량</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {state.weatherConditions.precipitation.toFixed(0)}%
                  </span>
                </div>
                
                {/* 날씨 경고 */}
                {state.weatherConditions.windSpeed > 15 && (
                  <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                    <span className="text-yellow-800 dark:text-yellow-200 text-sm">
                      ⚠️ 강풍으로 인한 UAM 운항 제한
                    </span>
                  </div>
                )}
                
                {state.weatherConditions.precipitation > 70 && (
                  <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                    <span className="text-red-800 dark:text-red-200 text-sm">
                      🌧️ 폭우로 인한 비행 금지
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Canvas */}
          <div className="xl:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Plane className="w-5 h-5" />
                미래 모빌리티 시각화
              </h3>
              
              <canvas
                ref={canvasRef}
                width={800}
                height={600}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg"
              />
              
              <div className="mt-4 grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span className="text-gray-600 dark:text-gray-400">승객용 UAM</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded"></div>
                  <span className="text-gray-600 dark:text-gray-400">화물용 UAM</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span className="text-gray-600 dark:text-gray-400">응급용 UAM</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                  <span className="text-gray-600 dark:text-gray-400">택시 UAM</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-cyan-500 rounded"></div>
                  <span className="text-gray-600 dark:text-gray-400">하이퍼루프</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 border-2 border-white rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-400">버티포트</span>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {/* Traffic Demand */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  교통 수요
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">UAM 요청</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {state.trafficDemand.uamRequests}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">하이퍼루프</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {state.trafficDemand.hyperloopRequests}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">기존 교통</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {state.trafficDemand.traditionalTraffic}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">혼잡도</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {state.trafficDemand.congestionLevel.toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Energy Consumption */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Battery className="w-5 h-5" />
                  에너지 소비
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">UAM</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {state.energyConsumption.uam.toFixed(1)} kWh
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">하이퍼루프</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {state.energyConsumption.hyperloop.toFixed(1)} kWh
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">기존 교통</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {state.energyConsumption.traditional.toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">효율성</span>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      +{(100 - state.energyConsumption.traditional).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Environmental Impact */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  환경 영향
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">CO₂ 절약</span>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      {state.emissions.co2Saved.toFixed(1)} kg
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">소음 감소</span>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      -{state.emissions.noiseReduction.toFixed(0)} dB
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">대기질</span>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      +25% 개선
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">도시 공간</span>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      +15% 절약
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}