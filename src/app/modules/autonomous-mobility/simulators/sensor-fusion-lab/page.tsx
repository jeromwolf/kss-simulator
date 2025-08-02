'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, Eye, Radar, Camera, Settings, Play, Pause, RotateCcw, Zap, Target, Activity } from 'lucide-react'

interface SensorData {
  lidar: {
    points: Array<{x: number, y: number, z: number, intensity: number}>
    range: number
    accuracy: number
  }
  camera: {
    objects: Array<{type: string, confidence: number, bbox: {x: number, y: number, w: number, h: number}}>
    resolution: string
    fps: number
  }
  radar: {
    targets: Array<{distance: number, velocity: number, angle: number, rcs: number}>
    frequency: number
    range: number
  }
}

interface FusedOutput {
  detectedObjects: Array<{
    id: string
    type: string
    position: {x: number, y: number, z: number}
    velocity: {x: number, y: number}
    confidence: number
    source: string[]
  }>
  timestamp: number
}

export default function SensorFusionLabPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [sensorData, setSensorData] = useState<SensorData>({
    lidar: { points: [], range: 100, accuracy: 95 },
    camera: { objects: [], resolution: '1920x1080', fps: 30 },
    radar: { targets: [], frequency: 77, range: 200 }
  })
  const [fusedOutput, setFusedOutput] = useState<FusedOutput>({
    detectedObjects: [],
    timestamp: Date.now()
  })
  const [settings, setSettings] = useState({
    lidarEnabled: true,
    cameraEnabled: true,
    radarEnabled: true,
    fusionAlgorithm: 'kalman' as 'kalman' | 'particle' | 'neural',
    confidenceThreshold: 0.7
  })
  
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  // 시뮬레이션 스텝
  const simulationSteps = [
    'Raw Sensor Data Acquisition',
    'Data Preprocessing & Filtering', 
    'Feature Extraction',
    'Sensor Calibration & Alignment',
    'Data Association & Tracking',
    'Fusion Algorithm Processing',
    'Confidence Calculation',
    'Output Generation'
  ]

  // 가상 센서 데이터 생성
  const generateSensorData = () => {
    const newSensorData: SensorData = {
      lidar: {
        points: Array.from({length: 1000}, () => ({
          x: (Math.random() - 0.5) * 200,
          y: (Math.random() - 0.5) * 200, 
          z: Math.random() * 10,
          intensity: Math.random() * 255
        })),
        range: 100 + Math.random() * 50,
        accuracy: 90 + Math.random() * 10
      },
      camera: {
        objects: [
          { type: 'car', confidence: 0.95, bbox: {x: 100, y: 80, w: 150, h: 80} },
          { type: 'pedestrian', confidence: 0.87, bbox: {x: 300, y: 120, w: 40, h: 100} },
          { type: 'bicycle', confidence: 0.73, bbox: {x: 500, y: 100, w: 60, h: 60} }
        ],
        resolution: '1920x1080',
        fps: 30
      },
      radar: {
        targets: [
          { distance: 45.2, velocity: -15.8, angle: 12, rcs: 8.5 },
          { distance: 78.1, velocity: -8.2, angle: -5, rcs: 2.1 },
          { distance: 125.6, velocity: 0, angle: 0, rcs: 12.3 }
        ],
        frequency: 77,
        range: 200
      }
    }
    
    setSensorData(newSensorData)
    
    // 센서 퓨전 처리
    processSensorFusion(newSensorData)
  }

  // 센서 퓨전 알고리즘
  const processSensorFusion = (data: SensorData) => {
    const fusedObjects: FusedOutput['detectedObjects'] = []
    
    // 카메라 객체와 다른 센서 데이터 매칭
    data.camera.objects.forEach((obj, idx) => {
      const sources = ['camera']
      let confidence = obj.confidence
      
      // LiDAR 포인트클라우드와 매칭
      if (settings.lidarEnabled && data.lidar.points.length > 0) {
        sources.push('lidar')
        confidence = Math.min(1.0, confidence + 0.1)
      }
      
      // 레이더 타겟과 매칭  
      if (settings.radarEnabled && data.radar.targets[idx]) {
        sources.push('radar')
        confidence = Math.min(1.0, confidence + 0.05)
      }
      
      if (confidence >= settings.confidenceThreshold) {
        fusedObjects.push({
          id: `obj_${idx}`,
          type: obj.type,
          position: {
            x: obj.bbox.x + obj.bbox.w/2,
            y: obj.bbox.y + obj.bbox.h/2,
            z: 0
          },
          velocity: data.radar.targets[idx] ? 
            { x: data.radar.targets[idx].velocity * Math.cos(data.radar.targets[idx].angle * Math.PI/180),
              y: data.radar.targets[idx].velocity * Math.sin(data.radar.targets[idx].angle * Math.PI/180) } :
            { x: 0, y: 0 },
          confidence,
          source: sources
        })
      }
    })
    
    setFusedOutput({
      detectedObjects: fusedObjects,
      timestamp: Date.now()
    })
  }

  // 3D 시각화 렌더링
  const render3DScene = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // 배경 그리드
    ctx.strokeStyle = '#374151'
    ctx.lineWidth = 1
    for (let i = 0; i <= canvas.width; i += 20) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, canvas.height)
      ctx.stroke()
    }
    for (let i = 0; i <= canvas.height; i += 20) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(canvas.width, i)
      ctx.stroke()
    }
    
    // LiDAR 포인트클라우드
    if (settings.lidarEnabled) {
      ctx.fillStyle = '#10b981'
      sensorData.lidar.points.slice(0, 100).forEach(point => {
        const x = canvas.width/2 + point.x * 2
        const y = canvas.height/2 + point.y * 2
        if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
          ctx.fillRect(x, y, 2, 2)
        }
      })
    }
    
    // 카메라 객체 감지 결과
    if (settings.cameraEnabled) {
      ctx.strokeStyle = '#3b82f6'
      ctx.lineWidth = 2
      sensorData.camera.objects.forEach(obj => {
        ctx.strokeRect(obj.bbox.x, obj.bbox.y, obj.bbox.w, obj.bbox.h)
        ctx.fillStyle = '#3b82f6'
        ctx.font = '12px sans-serif'
        ctx.fillText(`${obj.type} (${(obj.confidence*100).toFixed(1)}%)`, 
                    obj.bbox.x, obj.bbox.y - 5)
      })
    }
    
    // 레이더 타겟
    if (settings.radarEnabled) {
      ctx.fillStyle = '#f59e0b'
      sensorData.radar.targets.forEach((target, idx) => {
        const angle = target.angle * Math.PI / 180
        const x = canvas.width/2 + target.distance * Math.cos(angle) * 2
        const y = canvas.height/2 + target.distance * Math.sin(angle) * 2
        
        ctx.beginPath()
        ctx.arc(x, y, 6, 0, 2 * Math.PI)
        ctx.fill()
        
        ctx.fillStyle = '#f59e0b'
        ctx.font = '10px sans-serif'
        ctx.fillText(`${target.velocity.toFixed(1)} m/s`, x + 10, y)
      })
    }
    
    // 퓨전 결과
    ctx.strokeStyle = '#ef4444'
    ctx.lineWidth = 3
    fusedOutput.detectedObjects.forEach(obj => {
      ctx.strokeRect(obj.position.x - 20, obj.position.y - 20, 40, 40)
      ctx.fillStyle = '#ef4444'
      ctx.font = '14px sans-serif'
      ctx.fillText(`FUSED: ${obj.type}`, obj.position.x - 15, obj.position.y - 25)
    })
  }

  // 시뮬레이션 실행
  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        generateSensorData()
        setCurrentStep(prev => (prev + 1) % simulationSteps.length)
      }, 1000)
      
      const animate = () => {
        render3DScene()
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
  }, [isRunning, settings, sensorData, fusedOutput])

  const startSimulation = () => {
    setIsRunning(true)
    generateSensorData()
  }

  const stopSimulation = () => {
    setIsRunning(false)
  }

  const resetSimulation = () => {
    setIsRunning(false)
    setCurrentStep(0)
    setSensorData({
      lidar: { points: [], range: 100, accuracy: 95 },
      camera: { objects: [], resolution: '1920x1080', fps: 30 },
      radar: { targets: [], frequency: 77, range: 200 }
    })
    setFusedOutput({ detectedObjects: [], timestamp: Date.now() })
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
            🧪 센서 퓨전 실험실
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            LiDAR, 카메라, 레이더 센서 데이터를 실시간으로 융합하여 정확한 환경 인식을 구현합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Sensor Controls */}
          <div className="xl:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                센서 설정
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={settings.lidarEnabled}
                      onChange={(e) => setSettings(prev => ({...prev, lidarEnabled: e.target.checked}))}
                      className="rounded"
                    />
                    <Eye className="w-5 h-5 text-green-500" />
                    <span className="text-gray-900 dark:text-white">LiDAR</span>
                  </label>
                  {settings.lidarEnabled && (
                    <div className="ml-8 mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <div>Range: {sensorData.lidar.range.toFixed(1)}m</div>
                      <div>Points: {sensorData.lidar.points.length}</div>
                      <div>Accuracy: {sensorData.lidar.accuracy.toFixed(1)}%</div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={settings.cameraEnabled}
                      onChange={(e) => setSettings(prev => ({...prev, cameraEnabled: e.target.checked}))}
                      className="rounded"
                    />
                    <Camera className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-900 dark:text-white">카메라</span>
                  </label>
                  {settings.cameraEnabled && (
                    <div className="ml-8 mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <div>Resolution: {sensorData.camera.resolution}</div>
                      <div>FPS: {sensorData.camera.fps}</div>
                      <div>Objects: {sensorData.camera.objects.length}</div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={settings.radarEnabled}
                      onChange={(e) => setSettings(prev => ({...prev, radarEnabled: e.target.checked}))}
                      className="rounded"
                    />
                    <Radar className="w-5 h-5 text-yellow-500" />
                    <span className="text-gray-900 dark:text-white">레이더</span>
                  </label>
                  {settings.radarEnabled && (
                    <div className="ml-8 mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <div>Frequency: {sensorData.radar.frequency} GHz</div>
                      <div>Range: {sensorData.radar.range}m</div>
                      <div>Targets: {sensorData.radar.targets.length}</div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    퓨전 알고리즘
                  </label>
                  <select
                    value={settings.fusionAlgorithm}
                    onChange={(e) => setSettings(prev => ({...prev, fusionAlgorithm: e.target.value as any}))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="kalman">Kalman Filter</option>
                    <option value="particle">Particle Filter</option>
                    <option value="neural">Neural Fusion</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    신뢰도 임계값: {settings.confidenceThreshold}
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="1.0"
                    step="0.1"
                    value={settings.confidenceThreshold}
                    onChange={(e) => setSettings(prev => ({...prev, confidenceThreshold: parseFloat(e.target.value)}))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Processing Steps */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5" />
                처리 단계
              </h3>
              
              <div className="space-y-2">
                {simulationSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg text-sm ${
                      idx === currentStep 
                        ? 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-200 font-medium'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {idx + 1}. {step}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Canvas */}
          <div className="xl:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" />
                센서 퓨전 시각화
              </h3>
              
              <canvas
                ref={canvasRef}
                width={800}
                height={600}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-900"
              />
              
              <div className="mt-4 flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span className="text-gray-600 dark:text-gray-400">LiDAR 포인트</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 border-2 border-blue-500 rounded"></div>
                  <span className="text-gray-600 dark:text-gray-400">카메라 객체</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-400">레이더 타겟</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 border-2 border-red-500 rounded"></div>
                  <span className="text-gray-600 dark:text-gray-400">퓨전 결과</span>
                </div>
              </div>
            </div>

            {/* Fusion Results */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                퓨전 결과
              </h3>
              
              <div className="space-y-3">
                {fusedOutput.detectedObjects.map((obj, idx) => (
                  <div key={obj.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white">{obj.type}</span>
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                          (신뢰도: {(obj.confidence * 100).toFixed(1)}%)
                        </span>
                      </div>
                      <div className="flex gap-1">
                        {obj.source.map(src => (
                          <span key={src} className={`px-2 py-1 text-xs rounded-full ${
                            src === 'lidar' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                            src === 'camera' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                          }`}>
                            {src}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      위치: ({obj.position.x.toFixed(1)}, {obj.position.y.toFixed(1)})
                      {obj.velocity.x !== 0 || obj.velocity.y !== 0 ? 
                        ` | 속도: (${obj.velocity.x.toFixed(1)}, ${obj.velocity.y.toFixed(1)}) m/s` : ''}
                    </div>
                  </div>
                ))}
                {fusedOutput.detectedObjects.length === 0 && (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                    시뮬레이션을 시작하여 센서 퓨전 결과를 확인하세요.
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