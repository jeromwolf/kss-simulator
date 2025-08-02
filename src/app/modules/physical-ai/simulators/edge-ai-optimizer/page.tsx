'use client'

import { useState, useEffect, useCallback } from 'react'
import { Cpu, Zap, Download, Upload, BarChart3, Settings, TrendingUp, Monitor } from 'lucide-react'

interface ModelInfo {
  name: string
  originalSize: number
  framework: string
  accuracy: number
  inputShape: string
  outputClasses: number
}

interface OptimizationResult {
  technique: string
  optimizedSize: number
  optimizedAccuracy: number
  compressionRatio: number
  inferenceSpeedUp: number
  memoryReduction: number
  powerReduction: number
}

interface HardwareSpec {
  name: string
  compute: number
  memory: number
  power: number
  price: number
  efficiency: number
}

const SAMPLE_MODELS: ModelInfo[] = [
  {
    name: 'ResNet50',
    originalSize: 102.4,
    framework: 'PyTorch',
    accuracy: 76.2,
    inputShape: '224x224x3',
    outputClasses: 1000
  },
  {
    name: 'MobileNetV3',
    originalSize: 21.6,
    framework: 'TensorFlow',
    accuracy: 72.8,
    inputShape: '224x224x3',
    outputClasses: 1000
  },
  {
    name: 'EfficientNet-B0',
    originalSize: 20.3,
    framework: 'TensorFlow',
    accuracy: 77.1,
    inputShape: '224x224x3',
    outputClasses: 1000
  },
  {
    name: 'YOLOv5s',
    originalSize: 14.1,
    framework: 'PyTorch',
    accuracy: 56.8,
    inputShape: '640x640x3',
    outputClasses: 80
  }
]

const HARDWARE_OPTIONS: HardwareSpec[] = [
  {
    name: 'NVIDIA Jetson Nano',
    compute: 472,
    memory: 4,
    power: 10,
    price: 99,
    efficiency: 47.2
  },
  {
    name: 'NVIDIA Jetson Xavier NX',
    compute: 1300,
    memory: 8,
    power: 15,
    price: 399,
    efficiency: 86.7
  },
  {
    name: 'Google Edge TPU',
    compute: 4000,
    memory: 0,
    power: 2,
    price: 75,
    efficiency: 2000
  },
  {
    name: 'Intel NCS2',
    compute: 1000,
    memory: 0,
    power: 1,
    price: 69,
    efficiency: 1000
  },
  {
    name: 'Raspberry Pi 4',
    compute: 200,
    memory: 8,
    power: 7.6,
    price: 75,
    efficiency: 26.3
  }
]

export default function EdgeAIOptimizer() {
  const [selectedModel, setSelectedModel] = useState<ModelInfo>(SAMPLE_MODELS[0])
  const [selectedHardware, setSelectedHardware] = useState<HardwareSpec>(HARDWARE_OPTIONS[0])
  const [optimizationTechniques, setOptimizationTechniques] = useState({
    quantization: true,
    pruning: false,
    distillation: false,
    tensorrt: false,
    onnx: true
  })
  const [optimizationResults, setOptimizationResults] = useState<OptimizationResult[]>([])
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [benchmarkResults, setBenchmarkResults] = useState({
    originalFPS: 0,
    optimizedFPS: 0,
    originalLatency: 0,
    optimizedLatency: 0,
    originalMemory: 0,
    optimizedMemory: 0
  })

  // 최적화 시뮬레이션
  const runOptimization = useCallback(async () => {
    setIsOptimizing(true)
    
    // 시뮬레이션 지연
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const results: OptimizationResult[] = []
    let currentSize = selectedModel.originalSize
    let currentAccuracy = selectedModel.accuracy
    
    // 양자화
    if (optimizationTechniques.quantization) {
      const compressionRatio = 3.5 + Math.random() * 0.5
      const sizeReduction = currentSize / compressionRatio
      const accuracyLoss = 0.5 + Math.random() * 1.0
      
      results.push({
        technique: 'INT8 Quantization',
        optimizedSize: sizeReduction,
        optimizedAccuracy: currentAccuracy - accuracyLoss,
        compressionRatio,
        inferenceSpeedUp: 2.0 + Math.random() * 1.0,
        memoryReduction: 75 + Math.random() * 10,
        powerReduction: 40 + Math.random() * 15
      })
      
      currentSize = sizeReduction
      currentAccuracy -= accuracyLoss
    }
    
    // 가지치기
    if (optimizationTechniques.pruning) {
      const sparsity = 0.7 + Math.random() * 0.2
      const sizeReduction = currentSize * (1 - sparsity)
      const accuracyLoss = sparsity * 2
      
      results.push({
        technique: 'Structured Pruning',
        optimizedSize: sizeReduction,
        optimizedAccuracy: currentAccuracy - accuracyLoss,
        compressionRatio: currentSize / sizeReduction,
        inferenceSpeedUp: 1.5 + Math.random() * 0.8,
        memoryReduction: sparsity * 100,
        powerReduction: 30 + Math.random() * 10
      })
      
      currentSize = sizeReduction
      currentAccuracy -= accuracyLoss
    }
    
    // 지식 증류
    if (optimizationTechniques.distillation) {
      const compressionRatio = 5 + Math.random() * 3
      const sizeReduction = selectedModel.originalSize / compressionRatio
      const accuracyLoss = 1.5 + Math.random() * 1.5
      
      results.push({
        technique: 'Knowledge Distillation',
        optimizedSize: sizeReduction,
        optimizedAccuracy: selectedModel.accuracy - accuracyLoss,
        compressionRatio,
        inferenceSpeedUp: 3.0 + Math.random() * 2.0,
        memoryReduction: 80 + Math.random() * 15,
        powerReduction: 60 + Math.random() * 20
      })
    }
    
    // TensorRT
    if (optimizationTechniques.tensorrt && selectedHardware.name.includes('NVIDIA')) {
      results.push({
        technique: 'TensorRT Optimization',
        optimizedSize: currentSize * 0.9,
        optimizedAccuracy: currentAccuracy + 0.2,
        compressionRatio: 1.1,
        inferenceSpeedUp: 2.5 + Math.random() * 1.5,
        memoryReduction: 20 + Math.random() * 15,
        powerReduction: 25 + Math.random() * 10
      })
    }
    
    // ONNX 변환
    if (optimizationTechniques.onnx) {
      results.push({
        technique: 'ONNX Runtime',
        optimizedSize: currentSize * 0.95,
        optimizedAccuracy: currentAccuracy,
        compressionRatio: 1.05,
        inferenceSpeedUp: 1.2 + Math.random() * 0.5,
        memoryReduction: 10 + Math.random() * 10,
        powerReduction: 15 + Math.random() * 10
      })
    }
    
    setOptimizationResults(results)
    
    // 벤치마크 결과 계산
    const totalSpeedUp = results.reduce((acc, r) => acc * r.inferenceSpeedUp, 1)
    const totalMemoryReduction = Math.min(90, results.reduce((acc, r) => acc + r.memoryReduction, 0))
    
    const baseFPS = selectedHardware.compute / (selectedModel.originalSize * 10)
    const baseLatency = 1000 / baseFPS
    const baseMemory = selectedModel.originalSize * 2
    
    setBenchmarkResults({
      originalFPS: baseFPS,
      optimizedFPS: baseFPS * totalSpeedUp,
      originalLatency: baseLatency,
      optimizedLatency: baseLatency / totalSpeedUp,
      originalMemory: baseMemory,
      optimizedMemory: baseMemory * (1 - totalMemoryReduction / 100)
    })
    
    setIsOptimizing(false)
  }, [selectedModel, selectedHardware, optimizationTechniques])

  // 하드웨어 효율성 계산
  const calculateEfficiency = (hardware: HardwareSpec, modelSize: number) => {
    const computePerDollar = hardware.compute / hardware.price
    const computePerWatt = hardware.compute / hardware.power
    const memoryFit = hardware.memory > 0 ? Math.min(1, hardware.memory / (modelSize * 2)) : 1
    
    return (computePerDollar * 0.3 + computePerWatt * 0.4 + memoryFit * 0.3) * 100
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-600 to-gray-700 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
            <Cpu className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Edge AI 최적화 도구</h1>
            <p className="text-xl text-white/90">AI 모델을 엣지 디바이스에 최적화하고 성능을 분석하세요</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Configuration */}
        <div className="lg:col-span-1 space-y-6">
          {/* Model Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Monitor className="w-5 h-5" />
              모델 선택
            </h2>
            
            <div className="space-y-4">
              <select
                value={selectedModel.name}
                onChange={(e) => {
                  const model = SAMPLE_MODELS.find(m => m.name === e.target.value)
                  if (model) setSelectedModel(model)
                }}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {SAMPLE_MODELS.map(model => (
                  <option key={model.name} value={model.name}>{model.name}</option>
                ))}
              </select>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">크기:</span>
                  <span className="font-mono text-gray-900 dark:text-white">{selectedModel.originalSize} MB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">정확도:</span>
                  <span className="font-mono text-gray-900 dark:text-white">{selectedModel.accuracy}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">입력:</span>
                  <span className="font-mono text-gray-900 dark:text-white">{selectedModel.inputShape}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">클래스:</span>
                  <span className="font-mono text-gray-900 dark:text-white">{selectedModel.outputClasses}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hardware Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Cpu className="w-5 h-5" />
              하드웨어 선택
            </h2>
            
            <div className="space-y-4">
              <select
                value={selectedHardware.name}
                onChange={(e) => {
                  const hardware = HARDWARE_OPTIONS.find(h => h.name === e.target.value)
                  if (hardware) setSelectedHardware(hardware)
                }}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {HARDWARE_OPTIONS.map(hardware => (
                  <option key={hardware.name} value={hardware.name}>{hardware.name}</option>
                ))}
              </select>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">연산력:</span>
                  <span className="font-mono text-gray-900 dark:text-white">{selectedHardware.compute} GFLOPS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">메모리:</span>
                  <span className="font-mono text-gray-900 dark:text-white">
                    {selectedHardware.memory > 0 ? `${selectedHardware.memory} GB` : 'External'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">전력:</span>
                  <span className="font-mono text-gray-900 dark:text-white">{selectedHardware.power} W</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">가격:</span>
                  <span className="font-mono text-gray-900 dark:text-white">${selectedHardware.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">효율성:</span>
                  <span className="font-mono text-green-600 dark:text-green-400">
                    {calculateEfficiency(selectedHardware, selectedModel.originalSize).toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Optimization Techniques */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              최적화 기법
            </h2>
            
            <div className="space-y-3">
              {Object.entries(optimizationTechniques).map(([technique, enabled]) => (
                <label key={technique} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(e) => setOptimizationTechniques(prev => ({
                      ...prev,
                      [technique]: e.target.checked
                    }))}
                    className="rounded"
                  />
                  <span className="text-gray-700 dark:text-gray-300">
                    {technique === 'quantization' && 'INT8 양자화'}
                    {technique === 'pruning' && '구조적 가지치기'}
                    {technique === 'distillation' && '지식 증류'}
                    {technique === 'tensorrt' && 'TensorRT 최적화'}
                    {technique === 'onnx' && 'ONNX Runtime'}
                  </span>
                </label>
              ))}
            </div>

            <button
              onClick={runOptimization}
              disabled={isOptimizing}
              className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors"
            >
              {isOptimizing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  최적화 중...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  최적화 실행
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-6">
          {/* Optimization Results */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              최적화 결과
            </h2>
            
            {optimizationResults.length > 0 ? (
              <div className="space-y-4">
                {optimizationResults.map((result, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-3">{result.technique}</h3>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {result.compressionRatio.toFixed(1)}x
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">압축 비율</div>
                      </div>
                      
                      <div className="text-center p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {result.inferenceSpeedUp.toFixed(1)}x
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">속도 향상</div>
                      </div>
                      
                      <div className="text-center p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                          {result.optimizedAccuracy.toFixed(1)}%
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">정확도</div>
                      </div>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">크기:</span>
                        <span className="font-mono text-gray-900 dark:text-white">
                          {result.optimizedSize.toFixed(1)} MB
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">메모리:</span>
                        <span className="font-mono text-gray-900 dark:text-white">
                          -{result.memoryReduction.toFixed(0)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">전력:</span>
                        <span className="font-mono text-gray-900 dark:text-white">
                          -{result.powerReduction.toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                최적화를 실행하여 결과를 확인하세요
              </div>
            )}
          </div>

          {/* Performance Comparison */}
          {benchmarkResults.originalFPS > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                성능 비교
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">추론 속도</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">원본:</span>
                      <span className="font-mono text-gray-900 dark:text-white">
                        {benchmarkResults.originalFPS.toFixed(1)} FPS
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">최적화:</span>
                      <span className="font-mono text-green-600 dark:text-green-400">
                        {benchmarkResults.optimizedFPS.toFixed(1)} FPS
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                        style={{ 
                          width: `${Math.min(100, (benchmarkResults.optimizedFPS / benchmarkResults.originalFPS) * 50)}%` 
                        }}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">지연 시간</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">원본:</span>
                      <span className="font-mono text-gray-900 dark:text-white">
                        {benchmarkResults.originalLatency.toFixed(1)} ms
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">최적화:</span>
                      <span className="font-mono text-green-600 dark:text-green-400">
                        {benchmarkResults.optimizedLatency.toFixed(1)} ms
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                        style={{ 
                          width: `${100 - Math.min(90, (benchmarkResults.optimizedLatency / benchmarkResults.originalLatency) * 100)}%` 
                        }}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">메모리 사용량</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">원본:</span>
                      <span className="font-mono text-gray-900 dark:text-white">
                        {benchmarkResults.originalMemory.toFixed(1)} MB
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">최적화:</span>
                      <span className="font-mono text-green-600 dark:text-green-400">
                        {benchmarkResults.optimizedMemory.toFixed(1)} MB
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full transition-all duration-1000"
                        style={{ 
                          width: `${100 - Math.min(90, (benchmarkResults.optimizedMemory / benchmarkResults.originalMemory) * 100)}%` 
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Hardware Recommendations */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 하드웨어 추천</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {HARDWARE_OPTIONS.map(hardware => {
                const efficiency = calculateEfficiency(hardware, selectedModel.originalSize)
                return (
                  <div 
                    key={hardware.name}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      hardware.name === selectedHardware.name
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{hardware.name}</h3>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600 dark:text-green-400">
                          {efficiency.toFixed(0)}
                        </div>
                        <div className="text-xs text-gray-500">효율성</div>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <div className="flex justify-between">
                        <span>연산/가격:</span>
                        <span>{(hardware.compute / hardware.price).toFixed(1)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>연산/전력:</span>
                        <span>{(hardware.compute / hardware.power).toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}