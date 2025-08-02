'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Play, Pause, RotateCcw, TrendingUp, AlertTriangle, CheckCircle, Activity, Gauge, Factory, Users, Clock } from 'lucide-react'

interface MachineData {
  id: string
  name: string
  status: 'running' | 'idle' | 'maintenance' | 'error'
  efficiency: number
  temperature: number
  vibration: number
  output: number
  targetOutput: number
}

interface ProductionMetrics {
  totalOutput: number
  efficiency: number
  oee: number
  defectRate: number
  downtime: number
}

export default function ProductionLineMonitorPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [machines, setMachines] = useState<MachineData[]>([
    { id: 'M001', name: '사출 성형기 A', status: 'running', efficiency: 85, temperature: 45, vibration: 2.3, output: 120, targetOutput: 150 },
    { id: 'M002', name: '조립 로봇 B', status: 'running', efficiency: 92, temperature: 38, vibration: 1.8, output: 95, targetOutput: 100 },
    { id: 'M003', name: '포장 시스템 C', status: 'idle', efficiency: 0, temperature: 25, vibration: 0.5, output: 0, targetOutput: 80 },
    { id: 'M004', name: '품질 검사 D', status: 'error', efficiency: 0, temperature: 42, vibration: 3.2, output: 0, targetOutput: 120 },
    { id: 'M005', name: '용접 로봇 E', status: 'maintenance', efficiency: 0, temperature: 55, vibration: 0, output: 0, targetOutput: 90 },
    { id: 'M006', name: '도장 부스 F', status: 'running', efficiency: 78, temperature: 52, vibration: 2.1, output: 85, targetOutput: 110 }
  ])
  
  const [metrics, setMetrics] = useState<ProductionMetrics>({
    totalOutput: 300,
    efficiency: 76,
    oee: 68,
    defectRate: 2.3,
    downtime: 15
  })

  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (isRunning) {
      interval = setInterval(() => {
        setMachines(prev => prev.map(machine => {
          if (machine.status === 'running') {
            const newOutput = Math.min(
              machine.output + Math.random() * 5,
              machine.targetOutput * 1.1
            )
            const newTemp = machine.temperature + (Math.random() - 0.5) * 2
            const newVibration = Math.max(0, machine.vibration + (Math.random() - 0.5) * 0.3)
            const newEfficiency = Math.round((newOutput / machine.targetOutput) * 100)
            
            return {
              ...machine,
              output: Math.round(newOutput),
              temperature: Math.round(newTemp * 10) / 10,
              vibration: Math.round(newVibration * 10) / 10,
              efficiency: Math.min(100, newEfficiency)
            }
          }
          return machine
        }))
        
        setMetrics(prev => ({
          ...prev,
          totalOutput: prev.totalOutput + Math.floor(Math.random() * 10),
          efficiency: Math.round((Math.random() * 15 + 70) * 10) / 10,
          oee: Math.round((Math.random() * 20 + 60) * 10) / 10,
          defectRate: Math.round((Math.random() * 2 + 1) * 10) / 10
        }))
      }, 2000)
    }
    
    return () => clearInterval(interval)
  }, [isRunning])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30'
      case 'idle': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30'
      case 'maintenance': return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30'
      case 'error': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30'
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <CheckCircle className="w-4 h-4" />
      case 'idle': return <Clock className="w-4 h-4" />
      case 'maintenance': return <Users className="w-4 h-4" />
      case 'error': return <AlertTriangle className="w-4 h-4" />
      default: return <Activity className="w-4 h-4" />
    }
  }

  const runningMachines = machines.filter(m => m.status === 'running').length
  const totalMachines = machines.length

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
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
                  isRunning 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isRunning ? '일시정지' : '시작'}
              </button>
              <button
                onClick={() => {
                  setIsRunning(false)
                  setMetrics({
                    totalOutput: 300,
                    efficiency: 76,
                    oee: 68,
                    defectRate: 2.3,
                    downtime: 15
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
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Factory className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">생산 라인 모니터링</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">실시간 생산 라인 상태 모니터링과 KPI 대시보드</p>
            </div>
          </div>
        </div>

        {/* KPI Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">총 생산량</h3>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{metrics.totalOutput.toLocaleString()}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">개/일</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">생산 효율성</h3>
              <Gauge className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{metrics.efficiency}%</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">목표 대비</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">OEE</h3>
              <Activity className="w-5 h-5 text-purple-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{metrics.oee}%</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">종합 설비 효율</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">불량률</h3>
              <AlertTriangle className="w-5 h-5 text-orange-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{metrics.defectRate}%</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">품질 관리</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">가동률</h3>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{runningMachines}/{totalMachines}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">장비 상태</div>
          </div>
        </div>

        {/* Machine Status Grid */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">장비 상태 모니터링</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {machines.map((machine) => (
              <div key={machine.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{machine.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{machine.id}</p>
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(machine.status)}`}>
                    {getStatusIcon(machine.status)}
                    {machine.status === 'running' ? '가동' : 
                     machine.status === 'idle' ? '대기' :
                     machine.status === 'maintenance' ? '정비' : '오류'}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">효율성</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${machine.efficiency}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{machine.efficiency}%</span>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">생산량</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {machine.output} / {machine.targetOutput}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">온도</span>
                    <span className={`text-sm font-medium ${
                      machine.temperature > 50 ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'
                    }`}>
                      {machine.temperature}°C
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">진동</span>
                    <span className={`text-sm font-medium ${
                      machine.vibration > 3 ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'
                    }`}>
                      {machine.vibration} mm/s
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Chart Placeholder */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">실시간 생산 차트</h2>
          <div className="h-64 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">실시간 생산 데이터 차트</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                {isRunning ? '데이터 수집 중...' : '시뮬레이션을 시작하세요'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}