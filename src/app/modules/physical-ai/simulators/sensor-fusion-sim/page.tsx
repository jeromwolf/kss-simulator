'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Play, Pause, RotateCcw, Wifi, Eye, Zap, Settings, TrendingUp } from 'lucide-react'

interface SensorData {
  timestamp: number
  lidar: { x: number; y: number; confidence: number }[]
  camera: { x: number; y: number; class: string; confidence: number }[]
  radar: { x: number; y: number; velocity: number; rcs: number }[]
  gps: { lat: number; lng: number; accuracy: number }
  imu: { ax: number; ay: number; az: number; gx: number; gy: number; gz: number }
}

interface FusedObject {
  id: string
  x: number
  y: number
  vx: number
  vy: number
  class: string
  confidence: number
  covariance: number[][]
}

interface KalmanFilter {
  state: number[]
  covariance: number[][]
  processNoise: number[][]
  measurementNoise: number[][]
}

export default function SensorFusionSimulator() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  
  const [isRunning, setIsRunning] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [sensorData, setSensorData] = useState<SensorData[]>([])
  const [fusedObjects, setFusedObjects] = useState<FusedObject[]>([])
  const [selectedSensors, setSelectedSensors] = useState({
    lidar: true,
    camera: true,
    radar: true,
    gps: true,
    imu: true
  })
  const [fusionParameters, setFusionParameters] = useState({
    processNoise: 0.1,
    measurementNoise: 0.05,
    associationThreshold: 2.0,
    confidenceWeight: 0.3
  })
  const [statistics, setStatistics] = useState({
    detectedObjects: 0,
    fusionAccuracy: 0,
    processingTime: 0,
    falsePositives: 0
  })

  // 센서 데이터 생성
  const generateSensorData = useCallback((time: number): SensorData => {
    const objects = [
      { x: 50 + Math.sin(time * 0.01) * 20, y: 100, class: 'car', id: 'obj1' },
      { x: 150 + Math.cos(time * 0.015) * 15, y: 80, class: 'pedestrian', id: 'obj2' },
      { x: 200, y: 120 + Math.sin(time * 0.02) * 10, class: 'bicycle', id: 'obj3' }
    ]

    // LiDAR 데이터 (높은 정확도, 낮은 노이즈)
    const lidar = objects.map(obj => ({
      x: obj.x + (Math.random() - 0.5) * 2,
      y: obj.y + (Math.random() - 0.5) * 2,
      confidence: 0.9 + Math.random() * 0.1
    }))

    // 카메라 데이터 (클래스 정보 포함, 중간 정확도)
    const camera = objects.map(obj => ({
      x: obj.x + (Math.random() - 0.5) * 5,
      y: obj.y + (Math.random() - 0.5) * 5,
      class: obj.class,
      confidence: 0.7 + Math.random() * 0.2
    }))

    // 레이더 데이터 (속도 정보 포함, 거친 위치)
    const radar = objects.map(obj => ({
      x: obj.x + (Math.random() - 0.5) * 8,
      y: obj.y + (Math.random() - 0.5) * 8,
      velocity: Math.random() * 30 - 15,
      rcs: Math.random() * 10 + 5
    }))

    // GPS 데이터
    const gps = {
      lat: 37.5665 + (Math.random() - 0.5) * 0.001,
      lng: 126.9780 + (Math.random() - 0.5) * 0.001,
      accuracy: 2 + Math.random() * 3
    }

    // IMU 데이터
    const imu = {
      ax: (Math.random() - 0.5) * 2,
      ay: (Math.random() - 0.5) * 2,
      az: 9.8 + (Math.random() - 0.5) * 0.5,
      gx: (Math.random() - 0.5) * 0.1,
      gy: (Math.random() - 0.5) * 0.1,
      gz: (Math.random() - 0.5) * 0.1
    }

    return { timestamp: time, lidar, camera, radar, gps, imu }
  }, [])

  // 칼만 필터 구현
  const createKalmanFilter = useCallback((initialX: number, initialY: number): KalmanFilter => {
    return {
      state: [initialX, initialY, 0, 0], // [x, y, vx, vy]
      covariance: [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
      ],
      processNoise: [
        [0.1, 0, 0, 0],
        [0, 0.1, 0, 0],
        [0, 0, 0.1, 0],
        [0, 0, 0, 0.1]
      ],
      measurementNoise: [
        [0.5, 0],
        [0, 0.5]
      ]
    }
  }, [])

  // 매트릭스 연산 헬퍼 함수들
  const matrixMultiply = (a: number[][], b: number[][]): number[][] => {
    const result = Array(a.length).fill(0).map(() => Array(b[0].length).fill(0))
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < b[0].length; j++) {
        for (let k = 0; k < b.length; k++) {
          result[i][j] += a[i][k] * b[k][j]
        }
      }
    }
    return result
  }

  const matrixAdd = (a: number[][], b: number[][]): number[][] => {
    return a.map((row, i) => row.map((val, j) => val + b[i][j]))
  }

  const matrixInverse = (matrix: number[][]): number[][] => {
    // 2x2 매트릭스 역행렬 (간소화)
    if (matrix.length === 2) {
      const det = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]
      return [
        [matrix[1][1] / det, -matrix[0][1] / det],
        [-matrix[1][0] / det, matrix[0][0] / det]
      ]
    }
    return matrix // 간소화
  }

  // 센서 융합 수행
  const performSensorFusion = useCallback((data: SensorData): FusedObject[] => {
    const startTime = Date.now()
    const fused: FusedObject[] = []

    // 각 센서에서 감지된 객체들을 결합
    const allDetections: any[] = []

    if (selectedSensors.lidar) {
      data.lidar.forEach((det, i) => {
        allDetections.push({
          x: det.x, y: det.y, confidence: det.confidence,
          source: 'lidar', class: 'unknown', id: `lidar_${i}`
        })
      })
    }

    if (selectedSensors.camera) {
      data.camera.forEach((det, i) => {
        allDetections.push({
          x: det.x, y: det.y, confidence: det.confidence,
          source: 'camera', class: det.class, id: `camera_${i}`
        })
      })
    }

    if (selectedSensors.radar) {
      data.radar.forEach((det, i) => {
        allDetections.push({
          x: det.x, y: det.y, confidence: 0.6,
          source: 'radar', class: 'unknown', id: `radar_${i}`,
          velocity: det.velocity
        })
      })
    }

    // 연관성 기반 클러스터링
    const clusters: any[][] = []
    
    allDetections.forEach(detection => {
      let assigned = false
      
      for (const cluster of clusters) {
        const avgX = cluster.reduce((sum, d) => sum + d.x, 0) / cluster.length
        const avgY = cluster.reduce((sum, d) => sum + d.y, 0) / cluster.length
        const distance = Math.sqrt((detection.x - avgX) ** 2 + (detection.y - avgY) ** 2)
        
        if (distance < fusionParameters.associationThreshold) {
          cluster.push(detection)
          assigned = true
          break
        }
      }
      
      if (!assigned) {
        clusters.push([detection])
      }
    })

    // 각 클러스터를 하나의 융합된 객체로 변환
    clusters.forEach((cluster, index) => {
      if (cluster.length === 0) return

      // 가중 평균으로 위치 계산
      let totalWeight = 0
      let weightedX = 0
      let weightedY = 0
      let bestClass = 'unknown'
      let maxClassConfidence = 0

      cluster.forEach(detection => {
        const weight = detection.confidence
        totalWeight += weight
        weightedX += detection.x * weight
        weightedY += detection.y * weight

        if (detection.class !== 'unknown' && detection.confidence > maxClassConfidence) {
          bestClass = detection.class
          maxClassConfidence = detection.confidence
        }
      })

      const fusedX = weightedX / totalWeight
      const fusedY = weightedY / totalWeight
      const fusedConfidence = Math.min(0.95, totalWeight / cluster.length)

      // 공분산 계산 (간소화)
      const covariance = [
        [fusionParameters.measurementNoise, 0],
        [0, fusionParameters.measurementNoise]
      ]

      fused.push({
        id: `fused_${index}`,
        x: fusedX,
        y: fusedY,
        vx: 0, // 간소화
        vy: 0,
        class: bestClass,
        confidence: fusedConfidence,
        covariance
      })
    })

    const processingTime = Date.now() - startTime

    // 통계 업데이트
    setStatistics(prev => ({
      detectedObjects: fused.length,
      fusionAccuracy: Math.min(0.99, 0.7 + fused.length * 0.05),
      processingTime,
      falsePositives: Math.max(0, allDetections.length - fused.length)
    }))

    return fused
  }, [selectedSensors, fusionParameters])

  // 시뮬레이션 스텝
  const simulationStep = useCallback(() => {
    if (!isRunning) return

    const newTime = currentTime + 1
    setCurrentTime(newTime)

    const newSensorData = generateSensorData(newTime)
    setSensorData(prev => [...prev.slice(-50), newSensorData])

    const newFusedObjects = performSensorFusion(newSensorData)
    setFusedObjects(newFusedObjects)
  }, [isRunning, currentTime, generateSensorData, performSensorFusion])

  // 애니메이션 루프
  useEffect(() => {
    const animate = () => {
      simulationStep()
      drawVisualization()
      animationRef.current = requestAnimationFrame(animate)
    }

    if (isRunning) {
      const interval = setInterval(simulationStep, 100) // 10Hz
      return () => clearInterval(interval)
    }
  }, [isRunning, simulationStep])

  // 시각화 그리기
  const drawVisualization = useCallback(() => {
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

    if (sensorData.length === 0) return

    const latestData = sensorData[sensorData.length - 1]

    // 센서별 원시 데이터 그리기
    if (selectedSensors.lidar) {
      ctx.fillStyle = '#10b981'
      latestData.lidar.forEach(point => {
        ctx.beginPath()
        ctx.arc(point.x * 2, point.y * 2, 3, 0, 2 * Math.PI)
        ctx.fill()
      })
    }

    if (selectedSensors.camera) {
      ctx.fillStyle = '#3b82f6'
      latestData.camera.forEach(point => {
        ctx.fillRect(point.x * 2 - 2, point.y * 2 - 2, 4, 4)
      })
    }

    if (selectedSensors.radar) {
      ctx.fillStyle = '#f59e0b'
      latestData.radar.forEach(point => {
        ctx.beginPath()
        ctx.arc(point.x * 2, point.y * 2, 2, 0, 2 * Math.PI)
        ctx.fill()
      })
    }

    // 융합된 객체 그리기
    fusedObjects.forEach(obj => {
      const x = obj.x * 2
      const y = obj.y * 2

      // 신뢰도에 따른 크기와 색상
      const size = 5 + obj.confidence * 10
      const alpha = 0.3 + obj.confidence * 0.7

      ctx.fillStyle = `rgba(139, 92, 246, ${alpha})`
      ctx.strokeStyle = '#8b5cf6'
      ctx.lineWidth = 2

      ctx.beginPath()
      ctx.arc(x, y, size, 0, 2 * Math.PI)
      ctx.fill()
      ctx.stroke()

      // 클래스 라벨
      if (obj.class !== 'unknown') {
        ctx.fillStyle = '#1f2937'
        ctx.font = '12px Arial'
        ctx.fillText(obj.class, x + size + 5, y - 5)
      }

      // 신뢰도 표시
      ctx.fillStyle = '#6b7280'
      ctx.font = '10px Arial'
      ctx.fillText(`${(obj.confidence * 100).toFixed(0)}%`, x + size + 5, y + 10)
    })

    // 범례
    const legendY = 20
    if (selectedSensors.lidar) {
      ctx.fillStyle = '#10b981'
      ctx.beginPath()
      ctx.arc(20, legendY, 3, 0, 2 * Math.PI)
      ctx.fill()
      ctx.fillStyle = '#1f2937'
      ctx.font = '12px Arial'
      ctx.fillText('LiDAR', 30, legendY + 4)
    }

    if (selectedSensors.camera) {
      ctx.fillStyle = '#3b82f6'
      ctx.fillRect(15, legendY + 25, 6, 6)
      ctx.fillStyle = '#1f2937'
      ctx.fillText('Camera', 30, legendY + 30)
    }

    if (selectedSensors.radar) {
      ctx.fillStyle = '#f59e0b'
      ctx.beginPath()
      ctx.arc(20, legendY + 50, 2, 0, 2 * Math.PI)
      ctx.fill()
      ctx.fillStyle = '#1f2937'
      ctx.fillText('Radar', 30, legendY + 54)
    }

    ctx.fillStyle = '#8b5cf6'
    ctx.beginPath()
    ctx.arc(20, legendY + 75, 8, 0, 2 * Math.PI)
    ctx.fill()
    ctx.fillStyle = '#1f2937'
    ctx.fillText('Fused', 35, legendY + 80)
  }, [sensorData, fusedObjects, selectedSensors])

  // 리셋
  const resetSimulation = () => {
    setIsRunning(false)
    setCurrentTime(0)
    setSensorData([])
    setFusedObjects([])
    setStatistics({
      detectedObjects: 0,
      fusionAccuracy: 0,
      processingTime: 0,
      falsePositives: 0
    })
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-600 to-gray-700 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
            <Wifi className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">센서 융합 시뮬레이터</h1>
            <p className="text-xl text-white/90">다중 센서 데이터를 융합하여 정확한 환경 인식을 구현하세요</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Visualization */}
        <div className="lg:col-span-2 space-y-6">
          {/* Controls */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">제어 패널</h2>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isRunning 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isRunning ? '정지' : '시작'}
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

            {/* Sensor Selection */}
            <div className="mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">활성 센서</h3>
              <div className="flex gap-4">
                {Object.entries(selectedSensors).map(([sensor, enabled]) => (
                  <label key={sensor} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={enabled}
                      onChange={(e) => setSelectedSensors(prev => ({
                        ...prev,
                        [sensor]: e.target.checked
                      }))}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                      {sensor}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">센서 데이터 시각화</h2>
            
            <canvas
              ref={canvasRef}
              width={600}
              height={400}
              className="w-full border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700"
            />
            
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <p>• 초록 점: LiDAR 데이터 (높은 정확도)</p>
              <p>• 파란 사각형: 카메라 데이터 (클래스 정보 포함)</p>
              <p>• 주황 점: 레이더 데이터 (속도 정보 포함)</p>
              <p>• 보라색 원: 융합된 객체 (크기는 신뢰도 비례)</p>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="space-y-6">
          {/* Statistics */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              융합 통계
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">감지된 객체:</span>
                <span className="font-bold text-gray-900 dark:text-white">{statistics.detectedObjects}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">융합 정확도:</span>
                <span className="font-bold text-green-600 dark:text-green-400">
                  {(statistics.fusionAccuracy * 100).toFixed(1)}%
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">처리 시간:</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  {statistics.processingTime}ms
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">거짓 양성:</span>
                <span className="font-bold text-red-600 dark:text-red-400">
                  {statistics.falsePositives}
                </span>
              </div>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  시뮬레이션 시간: {currentTime}s
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  데이터 포인트: {sensorData.length}
                </div>
              </div>
            </div>
          </div>

          {/* Fusion Parameters */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              융합 파라미터
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  프로세스 노이즈: {fusionParameters.processNoise.toFixed(3)}
                </label>
                <input
                  type="range"
                  min="0.01"
                  max="0.5"
                  step="0.01"
                  value={fusionParameters.processNoise}
                  onChange={(e) => setFusionParameters(prev => ({ 
                    ...prev, 
                    processNoise: Number(e.target.value) 
                  }))}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  측정 노이즈: {fusionParameters.measurementNoise.toFixed(3)}
                </label>
                <input
                  type="range"
                  min="0.01"
                  max="0.2"
                  step="0.01"
                  value={fusionParameters.measurementNoise}
                  onChange={(e) => setFusionParameters(prev => ({ 
                    ...prev, 
                    measurementNoise: Number(e.target.value) 
                  }))}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  연관 임계값: {fusionParameters.associationThreshold.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="5.0"
                  step="0.1"
                  value={fusionParameters.associationThreshold}
                  onChange={(e) => setFusionParameters(prev => ({ 
                    ...prev, 
                    associationThreshold: Number(e.target.value) 
                  }))}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  신뢰도 가중치: {fusionParameters.confidenceWeight.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="0.9"
                  step="0.05"
                  value={fusionParameters.confidenceWeight}
                  onChange={(e) => setFusionParameters(prev => ({ 
                    ...prev, 
                    confidenceWeight: Number(e.target.value) 
                  }))}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Detected Objects */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              감지된 객체
            </h2>
            
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {fusedObjects.map((obj, index) => (
                <div key={obj.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm">
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {obj.class !== 'unknown' ? obj.class : `Object ${index + 1}`}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">
                      ({obj.x.toFixed(1)}, {obj.y.toFixed(1)})
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-purple-600 dark:text-purple-400">
                      {(obj.confidence * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>
              ))}
              {fusedObjects.length === 0 && (
                <div className="text-center text-gray-500 dark:text-gray-400 py-4">
                  감지된 객체가 없습니다
                </div>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🎓 사용법</h2>
            
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <p>• <strong>센서 선택:</strong> 체크박스로 사용할 센서 선택</p>
              <p>• <strong>파라미터 조정:</strong> 융합 성능 튜닝</p>
              <p>• <strong>실시간 모니터링:</strong> 통계와 객체 목록 확인</p>
              <p>• <strong>칼만 필터:</strong> 노이즈 제거와 상태 추정</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}