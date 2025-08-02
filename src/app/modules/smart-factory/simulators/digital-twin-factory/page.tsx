'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Play, Pause, RotateCcw, Box, Monitor, Zap, Thermometer, Gauge, Activity, Settings, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react'

interface Machine3D {
  id: string
  name: string
  x: number
  y: number
  z: number
  status: 'running' | 'idle' | 'maintenance' | 'error'
  temperature: number
  efficiency: number
  output: number
}

interface FactoryMetrics {
  totalOutput: number
  energyConsumption: number
  efficiency: number
  temperature: number
  activeMachines: number
}

interface Scenario {
  id: string
  name: string
  description: string
  parameters: {
    speed: number
    load: number
    temperature: number
  }
}

export default function DigitalTwinFactoryPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [selectedScenario, setSelectedScenario] = useState('normal')
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('3d')
  const [syncStatus, setSyncStatus] = useState<'connected' | 'disconnected' | 'syncing'>('connected')
  
  const [machines, setMachines] = useState<Machine3D[]>([
    { id: 'M1', name: '사출기 A', x: 2, y: 1, z: 0, status: 'running', temperature: 45, efficiency: 85, output: 120 },
    { id: 'M2', name: '로봇 B', x: 4, y: 1, z: 0, status: 'running', temperature: 38, efficiency: 92, output: 95 },
    { id: 'M3', name: '컨베이어 C', x: 6, y: 1, z: 0, status: 'running', temperature: 25, efficiency: 88, output: 150 },
    { id: 'M4', name: '포장기 D', x: 8, y: 1, z: 0, status: 'idle', temperature: 22, efficiency: 0, output: 0 },
    { id: 'M5', name: '검사기 E', x: 2, y: 3, z: 0, status: 'maintenance', temperature: 28, efficiency: 0, output: 0 },
    { id: 'M6', name: '용접기 F', x: 4, y: 3, z: 0, status: 'error', temperature: 62, efficiency: 0, output: 0 }
  ])

  const [metrics, setMetrics] = useState<FactoryMetrics>({
    totalOutput: 365,
    energyConsumption: 1250,
    efficiency: 78,
    temperature: 34,
    activeMachines: 3
  })

  const scenarios: Scenario[] = [
    {
      id: 'normal',
      name: '정상 운영',
      description: '일반적인 생산 환경',
      parameters: { speed: 1.0, load: 0.8, temperature: 45 }
    },
    {
      id: 'peak',
      name: '피크 생산',
      description: '최대 생산량 모드',
      parameters: { speed: 1.5, load: 1.0, temperature: 55 }
    },
    {
      id: 'maintenance',
      name: '정비 모드',
      description: '일부 장비 정비 상황',
      parameters: { speed: 0.6, load: 0.5, temperature: 35 }
    },
    {
      id: 'emergency',
      name: '비상 상황',
      description: '긴급 정지 시나리오',
      parameters: { speed: 0.2, load: 0.3, temperature: 30 }
    }
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (isRunning) {
      interval = setInterval(() => {
        const scenario = scenarios.find(s => s.id === selectedScenario)!
        
        setMachines(prev => prev.map(machine => {
          if (machine.status === 'running') {
            const speedMultiplier = scenario.parameters.speed
            const newOutput = Math.min(
              machine.output + (Math.random() * 10 * speedMultiplier),
              200
            )
            const newTemp = scenario.parameters.temperature + (Math.random() - 0.5) * 10
            const newEfficiency = Math.min(100, machine.efficiency + (Math.random() - 0.5) * 5)
            
            return {
              ...machine,
              output: Math.round(newOutput),
              temperature: Math.round(newTemp * 10) / 10,
              efficiency: Math.round(newEfficiency)
            }
          }
          return machine
        }))
        
        setMetrics(prev => {
          const runningMachines = machines.filter(m => m.status === 'running').length
          const totalOutputIncrease = runningMachines * scenario.parameters.speed * 5
          
          return {
            totalOutput: prev.totalOutput + Math.floor(totalOutputIncrease),
            energyConsumption: Math.round(1000 + (runningMachines * 200 * scenario.parameters.load)),
            efficiency: Math.round((runningMachines / machines.length) * scenario.parameters.speed * 100),
            temperature: Math.round(scenario.parameters.temperature + (Math.random() - 0.5) * 5),
            activeMachines: runningMachines
          }
        })

        // Simulate sync status changes
        if (Math.random() < 0.1) {
          setSyncStatus('syncing')
          setTimeout(() => setSyncStatus('connected'), 1000)
        }
      }, 2000)
    }
    
    return () => clearInterval(interval)
  }, [isRunning, selectedScenario, machines])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-500'
      case 'idle': return 'bg-yellow-500'
      case 'maintenance': return 'bg-blue-500'
      case 'error': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getMachineEmoji = (name: string) => {
    if (name.includes('사출')) return '🏭'
    if (name.includes('로봇')) return '🤖'
    if (name.includes('컨베이어')) return '📦'
    if (name.includes('포장')) return '📮'
    if (name.includes('검사')) return '🔍'
    if (name.includes('용접')) return '⚡'
    return '⚙️'
  }

  const getSyncStatusIcon = () => {
    switch (syncStatus) {
      case 'connected': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'disconnected': return <AlertTriangle className="w-4 h-4 text-red-500" />
      case 'syncing': return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link 
                href="/modules/smart-factory"
                className="flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Smart Factory로 돌아가기</span>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {getSyncStatusIcon()}
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {syncStatus === 'connected' ? '실시간 동기화' : 
                   syncStatus === 'syncing' ? '동기화 중...' : '연결 끊김'}
                </span>
              </div>
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
                  isRunning 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isRunning ? '시뮬레이션 정지' : '시뮬레이션 시작'}
              </button>
              <button
                onClick={() => {
                  setIsRunning(false)
                  setMachines(prev => prev.map(m => ({ ...m, output: 0, efficiency: Math.random() * 30 + 70 })))
                  setMetrics({
                    totalOutput: 365,
                    energyConsumption: 1250,
                    efficiency: 78,
                    temperature: 34,
                    activeMachines: 3
                  })
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
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
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Box className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">디지털 트윈 팩토리</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">3D 가상 공장과 실시간 시뮬레이션 환경</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* 3D Factory View */}
          <div className="xl:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">가상 공장 레이아웃</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('2d')}
                    className={`px-3 py-1 rounded ${viewMode === '2d' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                  >
                    2D
                  </button>
                  <button
                    onClick={() => setViewMode('3d')}
                    className={`px-3 py-1 rounded ${viewMode === '3d' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                  >
                    3D
                  </button>
                </div>
              </div>

              {/* Factory Layout Grid */}
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 h-96 relative overflow-hidden">
                {/* Grid Background */}
                <div className="absolute inset-0 opacity-20">
                  <svg width="100%" height="100%" className="text-gray-400">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>

                {/* Machines */}
                {machines.map((machine) => (
                  <div
                    key={machine.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                    style={{
                      left: `${machine.x * 12 + 10}%`,
                      top: `${machine.y * 25 + 15}%`,
                    }}
                  >
                    <div className={`relative p-3 rounded-lg border-2 transition-all duration-300 ${
                      machine.status === 'running' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' :
                      machine.status === 'idle' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' :
                      machine.status === 'maintenance' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' :
                      'border-red-500 bg-red-50 dark:bg-red-900/20'
                    } group-hover:scale-110`}>
                      
                      {/* Status Indicator */}
                      <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${getStatusColor(machine.status)} ${
                        machine.status === 'running' ? 'animate-pulse' : ''
                      }`}></div>

                      {/* Machine Icon */}
                      <div className="text-2xl text-center">
                        {getMachineEmoji(machine.name)}
                      </div>
                      
                      {/* Machine Info */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                        <div className="font-semibold">{machine.name}</div>
                        <div>효율: {machine.efficiency}%</div>
                        <div>온도: {machine.temperature}°C</div>
                        <div>생산: {machine.output}/시간</div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Conveyor Lines */}
                <svg className="absolute inset-0 pointer-events-none" width="100%" height="100%">
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                            refX="0" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#6B7280" />
                    </marker>
                  </defs>
                  
                  {/* Production Flow Lines */}
                  <line x1="22%" y1="40%" x2="58%" y2="40%" 
                        stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)"
                        strokeDasharray={isRunning ? "5,5" : "none"}
                        className={isRunning ? "animate-pulse" : ""} />
                  <line x1="70%" y1="40%" x2="98%" y2="40%" 
                        stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)"
                        strokeDasharray={isRunning ? "5,5" : "none"}
                        className={isRunning ? "animate-pulse" : ""} />
                </svg>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg p-3 text-xs">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>가동</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span>대기</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>정비</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>오류</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Real-time Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">총 생산량</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {metrics.totalOutput.toLocaleString()}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">에너지 소비</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {metrics.energyConsumption} kW
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <Gauge className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">효율성</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {metrics.efficiency}%
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <Thermometer className="w-5 h-5 text-red-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">평균 온도</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {metrics.temperature}°C
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <Monitor className="w-5 h-5 text-purple-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">가동 장비</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {metrics.activeMachines}/{machines.length}
                </div>
              </div>
            </div>
          </div>

          {/* Control Panel */}
          <div className="space-y-6">
            {/* Scenario Control */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">시나리오 제어</h2>
              
              <div className="space-y-4">
                {scenarios.map((scenario) => (
                  <button
                    key={scenario.id}
                    onClick={() => setSelectedScenario(scenario.id)}
                    disabled={isRunning}
                    className={`w-full p-3 rounded-lg border text-left transition-all ${
                      selectedScenario === scenario.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    } ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {scenario.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {scenario.description}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                      <span>속도: {(scenario.parameters.speed * 100).toFixed(0)}%</span>
                      <span>부하: {(scenario.parameters.load * 100).toFixed(0)}%</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Machine Status */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">장비 상태</h2>
              
              <div className="space-y-3">
                {machines.map((machine) => (
                  <div key={machine.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(machine.status)}`}></div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {machine.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          효율: {machine.efficiency}%
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {machine.output}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        개/시간
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What-if Analysis */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">What-if 분석</h2>
              
              <div className="space-y-4">
                <button className="w-full p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                  <Settings className="w-4 h-4 inline mr-2" />
                  생산 라인 최적화
                </button>
                
                <button className="w-full p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                  <Zap className="w-4 h-4 inline mr-2" />
                  에너지 효율 시뮬레이션
                </button>
                
                <button className="w-full p-3 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors">
                  <AlertTriangle className="w-4 h-4 inline mr-2" />
                  고장 시나리오 테스트
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}