'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Play, Pause, RotateCcw, AlertTriangle, TrendingDown, TrendingUp, Zap, Thermometer, Activity, Gauge, Calendar, Clock } from 'lucide-react'

interface SensorData {
  timestamp: number
  temperature: number
  vibration: number
  pressure: number
  current: number
}

interface EquipmentStatus {
  id: string
  name: string
  health: number
  rul: number // Remaining Useful Life in days
  status: 'healthy' | 'warning' | 'critical'
  lastMaintenance: string
  nextMaintenance: string
  sensorData: SensorData[]
}

export default function PredictiveMaintenanceLabPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [selectedEquipment, setSelectedEquipment] = useState('PUMP_001')
  const [equipment, setEquipment] = useState<EquipmentStatus[]>([
    {
      id: 'PUMP_001',
      name: '순환 펌프 A',
      health: 85,
      rul: 45,
      status: 'healthy',
      lastMaintenance: '2024-06-15',
      nextMaintenance: '2024-09-15',
      sensorData: []
    },
    {
      id: 'MOTOR_002',
      name: '주 구동 모터 B',
      health: 68,
      rul: 28,
      status: 'warning',
      lastMaintenance: '2024-05-20',
      nextMaintenance: '2024-08-20',
      sensorData: []
    },
    {
      id: 'BEARING_003',
      name: '베어링 시스템 C',
      health: 42,
      rul: 12,
      status: 'critical',
      lastMaintenance: '2024-04-10',
      nextMaintenance: '2024-08-05',
      sensorData: []
    },
    {
      id: 'COMPRESSOR_004',
      name: '공기 압축기 D',
      health: 91,
      rul: 67,
      status: 'healthy',
      lastMaintenance: '2024-07-01',
      nextMaintenance: '2024-10-01',
      sensorData: []
    }
  ])

  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (isRunning) {
      interval = setInterval(() => {
        const now = Date.now()
        
        setEquipment(prev => prev.map(eq => {
          const baseTemp = eq.health > 70 ? 45 : eq.health > 50 ? 55 : 65
          const baseVibration = eq.health > 70 ? 1.5 : eq.health > 50 ? 2.5 : 4.0
          const basePressure = eq.health > 70 ? 2.8 : eq.health > 50 ? 3.2 : 3.8
          const baseCurrent = eq.health > 70 ? 12 : eq.health > 50 ? 15 : 18
          
          const newSensorData: SensorData = {
            timestamp: now,
            temperature: baseTemp + (Math.random() - 0.5) * 5,
            vibration: baseVibration + (Math.random() - 0.5) * 1,
            pressure: basePressure + (Math.random() - 0.5) * 0.5,
            current: baseCurrent + (Math.random() - 0.5) * 2
          }
          
          const updatedSensorData = [...eq.sensorData, newSensorData].slice(-20)
          
          // Simulate health degradation
          const healthChange = eq.status === 'critical' ? -0.5 : eq.status === 'warning' ? -0.2 : -0.1
          const newHealth = Math.max(0, eq.health + healthChange)
          const newRul = Math.max(0, eq.rul - 0.1)
          
          let newStatus: 'healthy' | 'warning' | 'critical' = 'healthy'
          if (newHealth < 50) newStatus = 'critical'
          else if (newHealth < 70) newStatus = 'warning'
          
          return {
            ...eq,
            health: Math.round(newHealth * 10) / 10,
            rul: Math.round(newRul * 10) / 10,
            status: newStatus,
            sensorData: updatedSensorData
          }
        }))
      }, 2000)
    }
    
    return () => clearInterval(interval)
  }, [isRunning])

  const selectedEq = equipment.find(eq => eq.id === selectedEquipment)
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30'
      case 'warning': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30'
      case 'critical': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30'
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30'
    }
  }

  const getHealthColor = (health: number) => {
    if (health >= 70) return 'text-green-600'
    if (health >= 50) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getRulColor = (rul: number) => {
    if (rul >= 30) return 'text-green-600'
    if (rul >= 15) return 'text-yellow-600'
    return 'text-red-600'
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
                  setEquipment(prev => prev.map(eq => ({
                    ...eq,
                    health: Math.random() * 40 + 60,
                    rul: Math.random() * 50 + 20,
                    status: 'healthy' as const,
                    sensorData: []
                  })))
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
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Gauge className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">예측 유지보수 실험실</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">센서 데이터 기반 장비 고장 예측과 RUL 분석</p>
            </div>
          </div>
        </div>

        {/* Equipment Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {equipment.map((eq) => (
            <div 
              key={eq.id}
              onClick={() => setSelectedEquipment(eq.id)}
              className={`bg-white dark:bg-gray-800 rounded-xl p-6 border cursor-pointer transition-all hover:shadow-lg ${
                selectedEquipment === eq.id 
                  ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">{eq.name}</h3>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(eq.status)}`}>
                  {eq.status === 'healthy' && '정상'}
                  {eq.status === 'warning' && '주의'}
                  {eq.status === 'critical' && '위험'}
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">건전성</span>
                    <span className={`text-sm font-bold ${getHealthColor(eq.health)}`}>{eq.health}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        eq.health >= 70 ? 'bg-green-500' : eq.health >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${eq.health}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">잔여 수명</span>
                  <span className={`text-sm font-bold ${getRulColor(eq.rul)}`}>{eq.rul}일</span>
                </div>

                <div className="text-xs text-gray-500 dark:text-gray-400">
                  마지막 정비: {eq.lastMaintenance}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Analysis */}
        {selectedEq && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sensor Data */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">실시간 센서 데이터</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Thermometer className="w-5 h-5 text-red-500" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">온도</span>
                    </div>
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {selectedEq.sensorData.length > 0 
                        ? `${selectedEq.sensorData[selectedEq.sensorData.length - 1].temperature.toFixed(1)}°C`
                        : '--°C'
                      }
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      정상 범위: 40-50°C
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-5 h-5 text-blue-500" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">진동</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {selectedEq.sensorData.length > 0 
                        ? `${selectedEq.sensorData[selectedEq.sensorData.length - 1].vibration.toFixed(1)}`
                        : '--'
                      } mm/s
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      정상 범위: 0-2.5 mm/s
                    </div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Gauge className="w-5 h-5 text-green-500" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">압력</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {selectedEq.sensorData.length > 0 
                        ? `${selectedEq.sensorData[selectedEq.sensorData.length - 1].pressure.toFixed(1)}`
                        : '--'
                      } bar
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      정상 범위: 2.5-3.0 bar
                    </div>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-5 h-5 text-yellow-500" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">전류</span>
                    </div>
                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                      {selectedEq.sensorData.length > 0 
                        ? `${selectedEq.sensorData[selectedEq.sensorData.length - 1].current.toFixed(1)}`
                        : '--'
                      } A
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      정상 범위: 10-14 A
                    </div>
                  </div>
                </div>

                {/* Chart Placeholder */}
                <div className="h-48 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">센서 데이터 트렌드 차트</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                      {isRunning ? '데이터 수집 중...' : '시뮬레이션을 시작하세요'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Maintenance Schedule & Predictions */}
            <div className="space-y-6">
              {/* Health Prediction */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">AI 예측 분석</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">현재 건전성</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">LSTM 기반 상태 평가</p>
                    </div>
                    <div className={`text-2xl font-bold ${getHealthColor(selectedEq.health)}`}>
                      {selectedEq.health}%
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">잔여 수명 (RUL)</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">고장까지 예상 시간</p>
                    </div>
                    <div className={`text-2xl font-bold ${getRulColor(selectedEq.rul)}`}>
                      {selectedEq.rul}일
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">고장 확률</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">30일 내 고장 가능성</p>
                    </div>
                    <div className={`text-2xl font-bold ${
                      selectedEq.health >= 70 ? 'text-green-600' : 
                      selectedEq.health >= 50 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {selectedEq.health >= 70 ? '5%' : selectedEq.health >= 50 ? '25%' : '65%'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Maintenance Schedule */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">정비 스케줄</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">마지막 정비</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{selectedEq.lastMaintenance}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <Clock className="w-5 h-5 text-orange-500" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">다음 정비 예정</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{selectedEq.nextMaintenance}</p>
                    </div>
                  </div>

                  {selectedEq.status === 'critical' && (
                    <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                      <div>
                        <h3 className="font-semibold text-red-700 dark:text-red-300">긴급 정비 필요</h3>
                        <p className="text-sm text-red-600 dark:text-red-400">즉시 정비를 권장합니다</p>
                      </div>
                    </div>
                  )}

                  {selectedEq.status === 'warning' && (
                    <div className="flex items-center gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <TrendingDown className="w-5 h-5 text-yellow-500" />
                      <div>
                        <h3 className="font-semibold text-yellow-700 dark:text-yellow-300">정비 계획 수립</h3>
                        <p className="text-sm text-yellow-600 dark:text-yellow-400">2주 내 정비 계획을 수립하세요</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}