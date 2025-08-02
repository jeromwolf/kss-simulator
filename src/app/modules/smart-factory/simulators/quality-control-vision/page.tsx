'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Play, Pause, RotateCcw, Camera, AlertTriangle, CheckCircle, XCircle, Eye, Upload, Settings, BarChart3 } from 'lucide-react'

interface DefectType {
  id: string
  name: string
  color: string
  count: number
}

interface InspectionResult {
  id: string
  timestamp: number
  image: string
  result: 'pass' | 'fail'
  defects: DefectType[]
  confidence: number
  processingTime: number
}

interface QualityMetrics {
  totalInspected: number
  passRate: number
  defectRate: number
  avgConfidence: number
  avgProcessingTime: number
}

export default function QualityControlVisionPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [selectedModel, setSelectedModel] = useState('yolo-v8')
  const [sensitivity, setSensitivity] = useState(0.7)
  const [inspectionResults, setInspectionResults] = useState<InspectionResult[]>([])
  const [currentImage, setCurrentImage] = useState<string | null>(null)
  
  const [metrics, setMetrics] = useState<QualityMetrics>({
    totalInspected: 0,
    passRate: 95.8,
    defectRate: 4.2,
    avgConfidence: 92.5,
    avgProcessingTime: 150
  })

  const defectTypes: DefectType[] = [
    { id: 'scratch', name: '스크래치', color: 'bg-red-500', count: 0 },
    { id: 'dent', name: '찌그러짐', color: 'bg-orange-500', count: 0 },
    { id: 'discoloration', name: '변색', color: 'bg-yellow-500', count: 0 },
    { id: 'crack', name: '균열', color: 'bg-purple-500', count: 0 },
    { id: 'contamination', name: '오염', color: 'bg-green-500', count: 0 }
  ]

  const models = [
    { id: 'yolo-v8', name: 'YOLO v8', accuracy: '95.2%', speed: '120ms' },
    { id: 'faster-rcnn', name: 'Faster R-CNN', accuracy: '97.1%', speed: '380ms' },
    { id: 'efficientdet', name: 'EfficientDet', accuracy: '94.8%', speed: '200ms' },
    { id: 'detectron2', name: 'Detectron2', accuracy: '96.5%', speed: '310ms' }
  ]

  // Mock images for demonstration
  const sampleImages = [
    '🔧', '⚙️', '🔩', '🔩', '⚡', '🔧', '⚙️', '🔩'
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (isRunning) {
      interval = setInterval(() => {
        const now = Date.now()
        const randomImage = sampleImages[Math.floor(Math.random() * sampleImages.length)]
        const hasDefect = Math.random() < (1 - sensitivity)
        const defectCount = hasDefect ? Math.floor(Math.random() * 3) + 1 : 0
        
        const selectedDefects: DefectType[] = []
        if (hasDefect) {
          for (let i = 0; i < defectCount; i++) {
            const randomDefect = defectTypes[Math.floor(Math.random() * defectTypes.length)]
            if (!selectedDefects.find(d => d.id === randomDefect.id)) {
              selectedDefects.push({ ...randomDefect, count: 1 })
            }
          }
        }

        const newResult: InspectionResult = {
          id: `INS_${now}`,
          timestamp: now,
          image: randomImage,
          result: hasDefect ? 'fail' : 'pass',
          defects: selectedDefects,
          confidence: Math.random() * 20 + 80,
          processingTime: selectedModel === 'yolo-v8' ? Math.random() * 50 + 100 :
                         selectedModel === 'faster-rcnn' ? Math.random() * 100 + 330 :
                         selectedModel === 'efficientdet' ? Math.random() * 50 + 175 :
                         Math.random() * 80 + 270
        }

        setCurrentImage(randomImage)
        setInspectionResults(prev => [newResult, ...prev].slice(0, 20))
        
        setMetrics(prev => {
          const newTotal = prev.totalInspected + 1
          const newPassRate = ((prev.passRate * prev.totalInspected / 100) + (hasDefect ? 0 : 1)) / newTotal * 100
          
          return {
            totalInspected: newTotal,
            passRate: Math.round(newPassRate * 10) / 10,
            defectRate: Math.round((100 - newPassRate) * 10) / 10,
            avgConfidence: Math.round((prev.avgConfidence + newResult.confidence) / 2 * 10) / 10,
            avgProcessingTime: Math.round((prev.avgProcessingTime + newResult.processingTime) / 2)
          }
        })
      }, 3000)
    }
    
    return () => clearInterval(interval)
  }, [isRunning, selectedModel, sensitivity])

  const recentResults = inspectionResults.slice(0, 8)
  const passCount = inspectionResults.filter(r => r.result === 'pass').length
  const failCount = inspectionResults.filter(r => r.result === 'fail').length

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
                {isRunning ? '검사 중지' : '검사 시작'}
              </button>
              <button
                onClick={() => {
                  setIsRunning(false)
                  setInspectionResults([])
                  setCurrentImage(null)
                  setMetrics({
                    totalInspected: 0,
                    passRate: 95.8,
                    defectRate: 4.2,
                    avgConfidence: 92.5,
                    avgProcessingTime: 150
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
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">품질 관리 비전 시스템</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">AI 기반 자동 품질 검사와 결함 분류</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Vision System */}
          <div className="lg:col-span-2 space-y-6">
            {/* Camera View */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">실시간 비전 검사</h2>
                <div className="flex items-center gap-2">
                  <Camera className={`w-5 h-5 ${isRunning ? 'text-green-500' : 'text-gray-400'}`} />
                  <span className={`text-sm font-medium ${isRunning ? 'text-green-600' : 'text-gray-500'}`}>
                    {isRunning ? '검사 중' : '대기'}
                  </span>
                </div>
              </div>

              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg h-96 flex items-center justify-center mb-6">
                {currentImage ? (
                  <div className="text-center">
                    <div className="text-8xl mb-4">{currentImage}</div>
                    <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                      제품 검사 중...
                    </div>
                    {isRunning && (
                      <div className="mt-4">
                        <div className="w-16 h-1 bg-blue-500 rounded-full animate-pulse mx-auto"></div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center">
                    <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">카메라 대기 중</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                      검사를 시작하려면 '검사 시작' 버튼을 클릭하세요
                    </p>
                  </div>
                )}
              </div>

              {/* Recent Results */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">최근 검사 결과</h3>
                <div className="grid grid-cols-4 gap-3">
                  {recentResults.map((result) => (
                    <div
                      key={result.id}
                      className={`relative p-4 rounded-lg border-2 ${
                        result.result === 'pass' 
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                          : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-3xl mb-2">{result.image}</div>
                        <div className={`flex items-center justify-center gap-1 text-xs font-medium ${
                          result.result === 'pass' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {result.result === 'pass' ? (
                            <CheckCircle className="w-3 h-3" />
                          ) : (
                            <XCircle className="w-3 h-3" />
                          )}
                          {result.result === 'pass' ? '합격' : '불합격'}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {result.confidence.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quality Metrics */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">품질 지표</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {metrics.totalInspected}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">총 검사 수</div>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {metrics.passRate}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">합격률</div>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                    {metrics.defectRate}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">불량률</div>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {metrics.avgProcessingTime}ms
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">처리 시간</div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">합격 / 불합격</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {passCount} / {failCount}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(passCount / (passCount + failCount)) * 100 || 0}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">평균 신뢰도</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {metrics.avgConfidence}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${metrics.avgConfidence}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Control Panel */}
          <div className="space-y-6">
            {/* Model Selection */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">AI 모델 설정</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    검출 모델
                  </label>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    disabled={isRunning}
                  >
                    {models.map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.name} (정확도: {model.accuracy})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    민감도: {(sensitivity * 100).toFixed(0)}%
                  </label>
                  <input
                    type="range"
                    min="0.3"
                    max="0.9"
                    step="0.1"
                    value={sensitivity}
                    onChange={(e) => setSensitivity(parseFloat(e.target.value))}
                    className="w-full"
                    disabled={isRunning}
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>낮음</span>
                    <span>높음</span>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">모델 정보</h3>
                  {models.map((model) => (
                    model.id === selectedModel && (
                      <div key={model.id} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">정확도</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{model.accuracy}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">처리 속도</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{model.speed}</span>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
            </div>

            {/* Defect Statistics */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">결함 유형 분석</h2>
              
              <div className="space-y-4">
                {defectTypes.map((defect) => {
                  const count = inspectionResults.reduce((acc, result) => 
                    acc + result.defects.filter(d => d.id === defect.id).length, 0
                  )
                  
                  return (
                    <div key={defect.id} className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded ${defect.color}`}></div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {defect.name}
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {count}건
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 mt-1">
                          <div 
                            className={`h-1 rounded-full ${defect.color} transition-all duration-300`}
                            style={{ width: `${inspectionResults.length > 0 ? (count / inspectionResults.length) * 100 : 0}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {inspectionResults.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <BarChart3 className="w-12 h-12 mx-auto mb-4" />
                  <p>검사 데이터가 없습니다</p>
                  <p className="text-sm mt-2">검사를 시작하면 결함 통계가 표시됩니다</p>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">빠른 작업</h2>
              
              <div className="space-y-3">
                <button
                  className="w-full flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  disabled={isRunning}
                >
                  <Upload className="w-4 h-4" />
                  이미지 업로드
                </button>
                
                <button
                  className="w-full flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  disabled={isRunning}
                >
                  <Settings className="w-4 h-4" />
                  고급 설정
                </button>
                
                <button
                  className="w-full flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <BarChart3 className="w-4 h-4" />
                  보고서 내보내기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}