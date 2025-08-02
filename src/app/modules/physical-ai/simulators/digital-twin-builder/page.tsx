'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Play, Pause, RotateCcw, Settings, Monitor, Wifi, Zap, TrendingUp, AlertTriangle } from 'lucide-react'

interface PhysicalDevice {
  id: string
  name: string
  type: 'sensor' | 'actuator' | 'controller'
  status: 'online' | 'offline' | 'error'
  x: number
  y: number
  value: number
  setpoint?: number
  lastUpdate: number
}

interface DataStream {
  timestamp: number
  deviceId: string
  value: number
  quality: 'good' | 'uncertain' | 'bad'
}

interface DigitalTwinState {
  devices: PhysicalDevice[]
  dataStreams: DataStream[]
  isRunning: boolean
  simulationTime: number
  syncLatency: number
  dataQuality: number
}

interface Anomaly {
  id: string
  deviceId: string
  type: 'sensor_drift' | 'actuator_failure' | 'communication_loss'
  severity: 'low' | 'medium' | 'high'
  description: string
  timestamp: number
}

const DEVICE_TYPES = {
  sensor: { color: '#10b981', icon: '📊' },
  actuator: { color: '#3b82f6', icon: '⚙️' },
  controller: { color: '#f59e0b', icon: '🎛️' }
}

export default function DigitalTwinBuilder() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  
  const [twinState, setTwinState] = useState<DigitalTwinState>({
    devices: [
      { id: 'temp1', name: 'Temperature Sensor 1', type: 'sensor', status: 'online', x: 100, y: 100, value: 25.5, lastUpdate: Date.now() },
      { id: 'temp2', name: 'Temperature Sensor 2', type: 'sensor', status: 'online', x: 300, y: 150, value: 26.2, lastUpdate: Date.now() },
      { id: 'motor1', name: 'Pump Motor', type: 'actuator', status: 'online', x: 200, y: 200, value: 65, setpoint: 70, lastUpdate: Date.now() },
      { id: 'valve1', name: 'Control Valve', type: 'actuator', status: 'online', x: 400, y: 180, value: 45, setpoint: 50, lastUpdate: Date.now() },
      { id: 'plc1', name: 'Main PLC', type: 'controller', status: 'online', x: 250, y: 80, value: 98, lastUpdate: Date.now() },
    ],
    dataStreams: [],
    isRunning: false,
    simulationTime: 0,
    syncLatency: 15,
    dataQuality: 95
  })
  
  const [selectedDevice, setSelectedDevice] = useState<PhysicalDevice | null>(null)
  const [anomalies, setAnomalies] = useState<Anomaly[]>([])
  const [systemMetrics, setSystemMetrics] = useState({
    syncRate: 100,
    dataLoss: 0.5,
    responseTime: 12,
    uptime: 99.8
  })
  const [simulationParams, setSimulationParams] = useState({
    updateFrequency: 1000, // ms
    noiseLevel: 0.1,
    communicationReliability: 0.98,
    anomalyProbability: 0.01
  })

  // 센서 데이터 시뮬레이션
  const simulateDeviceData = useCallback((device: PhysicalDevice, time: number): number => {
    let value = device.value
    
    switch (device.type) {
      case 'sensor':
        // 온도 센서 시뮬레이션 (사인파 + 노이즈)
        if (device.name.includes('Temperature')) {
          const baseTemp = 25
          const dailyCycle = Math.sin(time * 0.0001) * 5
          const noise = (Math.random() - 0.5) * simulationParams.noiseLevel * 2
          value = baseTemp + dailyCycle + noise
        }
        break
        
      case 'actuator':
        // 액추에이터는 setpoint를 향해 서서히 변화
        if (device.setpoint !== undefined) {
          const error = device.setpoint - device.value
          const response = error * 0.1 + (Math.random() - 0.5) * simulationParams.noiseLevel
          value = device.value + response
        }
        break
        
      case 'controller':
        // 컨트롤러는 시스템 부하를 나타냄
        const load = 80 + Math.sin(time * 0.001) * 15 + (Math.random() - 0.5) * 5
        value = Math.max(0, Math.min(100, load))
        break
    }
    
    return Math.round(value * 100) / 100
  }, [simulationParams.noiseLevel])

  // 이상 징후 감지
  const detectAnomalies = useCallback((devices: PhysicalDevice[]) => {
    const newAnomalies: Anomaly[] = []
    
    devices.forEach(device => {
      // 센서 드리프트 감지
      if (device.type === 'sensor' && Math.random() < simulationParams.anomalyProbability) {
        if (device.name.includes('Temperature') && (device.value < 15 || device.value > 40)) {
          newAnomalies.push({
            id: `anomaly_${Date.now()}_${device.id}`,
            deviceId: device.id,
            type: 'sensor_drift',
            severity: device.value < 10 || device.value > 45 ? 'high' : 'medium',
            description: `Temperature reading out of normal range: ${device.value}°C`,
            timestamp: Date.now()
          })
        }
      }
      
      // 액추에이터 실패 감지
      if (device.type === 'actuator' && device.setpoint !== undefined) {
        const error = Math.abs(device.value - device.setpoint)
        if (error > 10 && Math.random() < simulationParams.anomalyProbability * 2) {
          newAnomalies.push({
            id: `anomaly_${Date.now()}_${device.id}`,
            deviceId: device.id,
            type: 'actuator_failure',
            severity: error > 20 ? 'high' : 'medium',
            description: `Actuator not reaching setpoint. Error: ${error.toFixed(1)}`,
            timestamp: Date.now()
          })
        }
      }
      
      // 통신 손실 시뮬레이션
      if (Math.random() > simulationParams.communicationReliability) {
        newAnomalies.push({
          id: `anomaly_${Date.now()}_${device.id}`,
          deviceId: device.id,
          type: 'communication_loss',
          severity: 'low',
          description: `Communication timeout detected`,
          timestamp: Date.now()
        })
      }
    })
    
    setAnomalies(prev => [...prev.slice(-20), ...newAnomalies])
  }, [simulationParams.anomalyProbability, simulationParams.communicationReliability])

  // 시뮬레이션 스텝
  const simulationStep = useCallback(() => {
    if (!twinState.isRunning) return

    const currentTime = Date.now()
    
    setTwinState(prev => {
      const updatedDevices = prev.devices.map(device => ({
        ...device,
        value: simulateDeviceData(device, currentTime),
        lastUpdate: currentTime,
        status: (Math.random() > simulationParams.communicationReliability ? 'error' : 'online') as 'online' | 'offline' | 'error'
      }))
      
      // 새로운 데이터 스트림 추가
      const newDataStreams = updatedDevices.map(device => ({
        timestamp: currentTime,
        deviceId: device.id,
        value: device.value,
        quality: device.status === 'online' ? 'good' : 'bad' as 'good' | 'uncertain' | 'bad'
      }))
      
      // 이상 징후 감지
      detectAnomalies(updatedDevices)
      
      // 시스템 메트릭스 업데이트
      const dataLoss = (1 - simulationParams.communicationReliability) * 100
      const avgResponseTime = 10 + Math.random() * 10
      
      setSystemMetrics(prevMetrics => ({
        syncRate: Math.max(80, 100 - dataLoss),
        dataLoss,
        responseTime: avgResponseTime,
        uptime: Math.max(95, prevMetrics.uptime - dataLoss * 0.1)
      }))
      
      return {
        ...prev,
        devices: updatedDevices,
        dataStreams: [...prev.dataStreams.slice(-200), ...newDataStreams],
        simulationTime: prev.simulationTime + 1,
        syncLatency: 10 + Math.random() * 20,
        dataQuality: Math.max(80, 100 - dataLoss * 2)
      }
    })
  }, [twinState.isRunning, simulateDeviceData, detectAnomalies, simulationParams])

  // 애니메이션 루프
  useEffect(() => {
    if (twinState.isRunning) {
      const interval = setInterval(simulationStep, simulationParams.updateFrequency)
      return () => clearInterval(interval)
    }
  }, [twinState.isRunning, simulationStep, simulationParams.updateFrequency])

  // 캔버스 그리기
  const drawSystem = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    // 캔버스 클리어
    ctx.clearRect(0, 0, width, height)

    // 배경 그리드
    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 1
    for (let i = 0; i < width; i += 20) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, height)
      ctx.stroke()
    }
    for (let i = 0; i < height; i += 20) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(width, i)
      ctx.stroke()
    }

    // 디바이스 간 연결선 그리기
    ctx.strokeStyle = '#94a3b8'
    ctx.lineWidth = 2
    ctx.setLineDash([5, 5])
    
    const plc = twinState.devices.find(d => d.type === 'controller')
    if (plc) {
      twinState.devices.forEach(device => {
        if (device.id !== plc.id) {
          ctx.beginPath()
          ctx.moveTo(plc.x, plc.y)
          ctx.lineTo(device.x, device.y)
          ctx.stroke()
        }
      })
    }
    ctx.setLineDash([])

    // 디바이스 그리기
    twinState.devices.forEach(device => {
      const { color } = DEVICE_TYPES[device.type]
      
      // 상태에 따른 색상 조정
      let fillColor = color
      if (device.status === 'error') {
        fillColor = '#ef4444'
      } else if (device.status === 'offline') {
        fillColor = '#6b7280'
      }

      // 디바이스 원
      ctx.fillStyle = fillColor
      ctx.strokeStyle = device === selectedDevice ? '#1d4ed8' : '#374151'
      ctx.lineWidth = device === selectedDevice ? 4 : 2
      
      ctx.beginPath()
      ctx.arc(device.x, device.y, 20, 0, 2 * Math.PI)
      ctx.fill()
      ctx.stroke()

      // 디바이스 아이콘
      ctx.fillStyle = 'white'
      ctx.font = '16px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(DEVICE_TYPES[device.type].icon, device.x, device.y + 5)

      // 디바이스 이름과 값
      ctx.fillStyle = '#1f2937'
      ctx.font = '12px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(device.name, device.x, device.y - 30)
      
      let valueText = `${device.value}`
      if (device.type === 'sensor' && device.name.includes('Temperature')) {
        valueText += '°C'
      } else if (device.type === 'actuator') {
        valueText += '%'
        if (device.setpoint !== undefined) {
          valueText += ` (→${device.setpoint}%)`
        }
      } else if (device.type === 'controller') {
        valueText += '% CPU'
      }
      
      ctx.fillText(valueText, device.x, device.y + 35)

      // 상태 표시
      if (device.status === 'error') {
        ctx.fillStyle = '#dc2626'
        ctx.font = 'bold 10px Arial'
        ctx.fillText('ERROR', device.x, device.y + 50)
      }
    })

    // 데이터 플로우 애니메이션
    if (twinState.isRunning) {
      const time = Date.now() * 0.001
      twinState.devices.forEach(device => {
        if (device.type !== 'controller') {
          const plc = twinState.devices.find(d => d.type === 'controller')
          if (plc) {
            const progress = (Math.sin(time + device.x * 0.01) + 1) / 2
            const x = device.x + (plc.x - device.x) * progress
            const y = device.y + (plc.y - device.y) * progress
            
            ctx.fillStyle = '#3b82f6'
            ctx.beginPath()
            ctx.arc(x, y, 3, 0, 2 * Math.PI)
            ctx.fill()
          }
        }
      })
    }
  }, [twinState.devices, selectedDevice, twinState.isRunning])

  // 캔버스 업데이트
  useEffect(() => {
    drawSystem()
  }, [drawSystem])

  // 캔버스 클릭 핸들러
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const clickX = event.clientX - rect.left
    const clickY = event.clientY - rect.top

    const clickedDevice = twinState.devices.find(device => {
      const distance = Math.sqrt((device.x - clickX) ** 2 + (device.y - clickY) ** 2)
      return distance <= 25
    })

    setSelectedDevice(clickedDevice || null)
  }

  // 시뮬레이션 제어
  const toggleSimulation = () => {
    setTwinState(prev => ({ ...prev, isRunning: !prev.isRunning }))
  }

  const resetSimulation = () => {
    setTwinState(prev => ({
      ...prev,
      isRunning: false,
      simulationTime: 0,
      dataStreams: []
    }))
    setAnomalies([])
    setSystemMetrics({
      syncRate: 100,
      dataLoss: 0.5,
      responseTime: 12,
      uptime: 99.8
    })
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-600 to-gray-700 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
            <Monitor className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">디지털 트윈 빌더</h1>
            <p className="text-xl text-white/90">CPS 시스템의 디지털 트윈을 구축하고 모니터링하세요</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Visualization */}
        <div className="lg:col-span-2 space-y-6">
          {/* Controls */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">시스템 제어</h2>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={toggleSimulation}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    twinState.isRunning 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {twinState.isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {twinState.isRunning ? '정지' : '시작'}
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

            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {twinState.devices.filter(d => d.status === 'online').length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">온라인 디바이스</div>
              </div>
              
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {systemMetrics.syncRate.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">동기화율</div>
              </div>
              
              <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {twinState.syncLatency.toFixed(0)}ms
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">지연시간</div>
              </div>
              
              <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {twinState.dataQuality.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">데이터 품질</div>
              </div>
            </div>
          </div>

          {/* System Canvas */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">시스템 토폴로지</h2>
            
            <canvas
              ref={canvasRef}
              width={600}
              height={400}
              onClick={handleCanvasClick}
              className="w-full border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 cursor-pointer"
            />
            
            <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded-full" />
                <span className="text-gray-700 dark:text-gray-300">센서 (📊)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full" />
                <span className="text-gray-700 dark:text-gray-300">액추에이터 (⚙️)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded-full" />
                <span className="text-gray-700 dark:text-gray-300">컨트롤러 (🎛️)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="space-y-6">
          {/* Device Details */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              디바이스 상세
            </h2>
            
            {selectedDevice ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{selectedDevice.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">ID: {selectedDevice.id}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">타입:</span>
                    <span className="ml-2 font-mono text-gray-900 dark:text-white capitalize">
                      {selectedDevice.type}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">상태:</span>
                    <span className={`ml-2 font-mono ${
                      selectedDevice.status === 'online' ? 'text-green-600 dark:text-green-400' :
                      selectedDevice.status === 'error' ? 'text-red-600 dark:text-red-400' :
                      'text-gray-600 dark:text-gray-400'
                    }`}>
                      {selectedDevice.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">현재값:</span>
                    <span className="ml-2 font-mono text-gray-900 dark:text-white">
                      {selectedDevice.value}
                    </span>
                  </div>
                  {selectedDevice.setpoint !== undefined && (
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">목표값:</span>
                      <span className="ml-2 font-mono text-blue-600 dark:text-blue-400">
                        {selectedDevice.setpoint}
                      </span>
                    </div>
                  )}
                </div>
                
                {selectedDevice.type === 'actuator' && selectedDevice.setpoint !== undefined && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      설정값: {selectedDevice.setpoint}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={selectedDevice.setpoint}
                      onChange={(e) => {
                        const newSetpoint = Number(e.target.value)
                        setTwinState(prev => ({
                          ...prev,
                          devices: prev.devices.map(d => 
                            d.id === selectedDevice.id ? { ...d, setpoint: newSetpoint } : d
                          )
                        }))
                        setSelectedDevice(prev => prev ? { ...prev, setpoint: newSetpoint } : null)
                      }}
                      className="w-full"
                    />
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                디바이스를 클릭하여 상세 정보를 확인하세요
              </p>
            )}
          </div>

          {/* System Metrics */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              시스템 메트릭스
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">데이터 손실율:</span>
                <span className="font-bold text-red-600 dark:text-red-400">
                  {systemMetrics.dataLoss.toFixed(2)}%
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">응답 시간:</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  {systemMetrics.responseTime.toFixed(1)}ms
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">시스템 가동율:</span>
                <span className="font-bold text-green-600 dark:text-green-400">
                  {systemMetrics.uptime.toFixed(2)}%
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">시뮬레이션 시간:</span>
                <span className="font-mono text-gray-900 dark:text-white">
                  {twinState.simulationTime}s
                </span>
              </div>
            </div>
          </div>

          {/* Anomalies */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              이상 징후
            </h2>
            
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {anomalies.slice(-10).reverse().map((anomaly) => (
                <div key={anomaly.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm font-semibold ${
                      anomaly.severity === 'high' ? 'text-red-600 dark:text-red-400' :
                      anomaly.severity === 'medium' ? 'text-yellow-600 dark:text-yellow-400' :
                      'text-blue-600 dark:text-blue-400'
                    }`}>
                      {anomaly.type.replace('_', ' ').toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(anomaly.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {anomaly.description}
                  </p>
                </div>
              ))}
              {anomalies.length === 0 && (
                <div className="text-center text-gray-500 dark:text-gray-400 py-4">
                  이상 징후가 감지되지 않았습니다
                </div>
              )}
            </div>
          </div>

          {/* Simulation Parameters */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              시뮬레이션 설정
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  업데이트 주기: {simulationParams.updateFrequency}ms
                </label>
                <input
                  type="range"
                  min="100"
                  max="3000"
                  step="100"
                  value={simulationParams.updateFrequency}
                  onChange={(e) => setSimulationParams(prev => ({ 
                    ...prev, 
                    updateFrequency: Number(e.target.value) 
                  }))}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  노이즈 레벨: {simulationParams.noiseLevel.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0.01"
                  max="1.0"
                  step="0.01"
                  value={simulationParams.noiseLevel}
                  onChange={(e) => setSimulationParams(prev => ({ 
                    ...prev, 
                    noiseLevel: Number(e.target.value) 
                  }))}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  통신 신뢰도: {(simulationParams.communicationReliability * 100).toFixed(1)}%
                </label>
                <input
                  type="range"
                  min="0.8"
                  max="1.0"
                  step="0.01"
                  value={simulationParams.communicationReliability}
                  onChange={(e) => setSimulationParams(prev => ({ 
                    ...prev, 
                    communicationReliability: Number(e.target.value) 
                  }))}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🎓 사용법</h2>
            
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <p>• <strong>디바이스 선택:</strong> 캔버스에서 디바이스 클릭</p>
              <p>• <strong>제어:</strong> 액추에이터의 설정값 조정</p>
              <p>• <strong>모니터링:</strong> 실시간 데이터와 이상 징후 확인</p>
              <p>• <strong>파라미터 조정:</strong> 시뮬레이션 환경 변경</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}