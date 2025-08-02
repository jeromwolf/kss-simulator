'use client'

import { useState } from 'react'
import { Upload, FileJson, ChevronRight, Database, Loader2, Check, AlertCircle, FileText } from 'lucide-react'

type ImportStep = 'upload' | 'mapping' | 'preview' | 'import'
type FileType = 'csv' | 'json'

interface ParsedData {
  headers?: string[]
  rows: any[]
  type: FileType
}

export default function ImportWizard() {
  const [currentStep, setCurrentStep] = useState<ImportStep>('upload')
  const [fileType, setFileType] = useState<FileType>('csv')
  const [parsedData, setParsedData] = useState<ParsedData | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [mappingConfig, setMappingConfig] = useState({
    nodeLabel: '',
    nodeProperty: '',
    relationshipType: '',
    sourceProperty: '',
    targetProperty: ''
  })

  const steps = [
    { id: 'upload', name: '파일 업로드', icon: Upload },
    { id: 'mapping', name: '매핑 설정', icon: Database },
    { id: 'preview', name: '미리보기', icon: FileJson },
    { id: 'import', name: '임포트', icon: Check }
  ]

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsProcessing(true)
    
    // 파일 타입 감지
    const type = file.name.endsWith('.json') ? 'json' : 'csv'
    setFileType(type)

    // 시뮬레이션: 파일 파싱
    setTimeout(() => {
      if (type === 'csv') {
        setParsedData({
          type: 'csv',
          headers: ['id', 'name', 'age', 'city', 'relationship'],
          rows: [
            { id: 1, name: 'Alice', age: 30, city: 'Seoul', relationship: 'Bob' },
            { id: 2, name: 'Bob', age: 25, city: 'Busan', relationship: 'Carol' },
            { id: 3, name: 'Carol', age: 28, city: 'Daegu', relationship: 'Alice' },
            { id: 4, name: 'David', age: 32, city: 'Seoul', relationship: 'Eve' },
            { id: 5, name: 'Eve', age: 27, city: 'Incheon', relationship: 'Alice' }
          ]
        })
      } else {
        setParsedData({
          type: 'json',
          rows: [
            { type: 'node', label: 'Person', properties: { name: 'Alice', age: 30 } },
            { type: 'node', label: 'Person', properties: { name: 'Bob', age: 25 } },
            { type: 'relationship', from: 'Alice', to: 'Bob', relationshipType: 'KNOWS' }
          ]
        })
      }
      setIsProcessing(false)
      setCurrentStep('mapping')
    }, 1000)
  }

  const handleMapping = () => {
    if (!mappingConfig.nodeLabel) {
      alert('노드 레이블을 선택해주세요')
      return
    }
    setCurrentStep('preview')
  }

  const handleImport = () => {
    setIsProcessing(true)
    
    // 시뮬레이션: 임포트 프로세스
    setTimeout(() => {
      setIsProcessing(false)
      setCurrentStep('import')
    }, 2000)
  }

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => {
        const Icon = step.icon
        const isActive = steps.findIndex(s => s.id === currentStep) >= index
        const isCompleted = steps.findIndex(s => s.id === currentStep) > index
        
        return (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
              }`}>
                {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
              </div>
              <span className={`ml-2 text-sm ${
                isActive ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500'
              }`}>
                {step.name}
              </span>
            </div>
            {index < steps.length - 1 && (
              <ChevronRight className="w-5 h-5 mx-4 text-gray-400" />
            )}
          </div>
        )
      })}
    </div>
  )

  const renderUploadStep = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-8">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        데이터 파일 업로드
      </h3>
      
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
        <div className="flex justify-center gap-8 mb-6">
          <div className="text-center">
            <FileText className="w-16 h-16 text-green-500 mx-auto mb-2" />
            <span className="text-sm text-gray-600 dark:text-gray-400">CSV 파일</span>
          </div>
          <div className="text-center">
            <FileJson className="w-16 h-16 text-blue-500 mx-auto mb-2" />
            <span className="text-sm text-gray-600 dark:text-gray-400">JSON 파일</span>
          </div>
        </div>
        
        <input
          type="file"
          accept=".csv,.json"
          onChange={handleFileUpload}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
        >
          <Upload className="w-5 h-5" />
          파일 선택
        </label>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          또는 파일을 여기에 드래그앤드롭하세요
        </p>
      </div>

      {isProcessing && (
        <div className="flex items-center justify-center mt-6">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600 dark:text-gray-400">파일 처리 중...</span>
        </div>
      )}
    </div>
  )

  const renderMappingStep = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-8">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        데이터 매핑 설정
      </h3>
      
      {fileType === 'csv' && parsedData?.headers && (
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">노드 설정</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  노드 레이블
                </label>
                <input
                  type="text"
                  value={mappingConfig.nodeLabel}
                  onChange={(e) => setMappingConfig({...mappingConfig, nodeLabel: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  placeholder="예: Person"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  ID 속성
                </label>
                <select
                  value={mappingConfig.nodeProperty}
                  onChange={(e) => setMappingConfig({...mappingConfig, nodeProperty: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="">선택하세요</option>
                  {parsedData.headers.map(header => (
                    <option key={header} value={header}>{header}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">관계 설정</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  관계 타입
                </label>
                <input
                  type="text"
                  value={mappingConfig.relationshipType}
                  onChange={(e) => setMappingConfig({...mappingConfig, relationshipType: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  placeholder="예: KNOWS"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  소스 속성
                </label>
                <select
                  value={mappingConfig.sourceProperty}
                  onChange={(e) => setMappingConfig({...mappingConfig, sourceProperty: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="">선택하세요</option>
                  {parsedData.headers.map(header => (
                    <option key={header} value={header}>{header}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  타겟 속성
                </label>
                <select
                  value={mappingConfig.targetProperty}
                  onChange={(e) => setMappingConfig({...mappingConfig, targetProperty: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="">선택하세요</option>
                  {parsedData.headers.map(header => (
                    <option key={header} value={header}>{header}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={handleMapping}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            다음 단계: 미리보기
          </button>
        </div>
      )}
    </div>
  )

  const renderPreviewStep = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-8">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        생성될 그래프 미리보기
      </h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
            노드 ({parsedData?.rows.length || 0}개)
          </h4>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 max-h-64 overflow-y-auto">
            {parsedData?.rows.slice(0, 3).map((row, i) => (
              <div key={i} className="mb-2 p-2 bg-white dark:bg-gray-800 rounded">
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                  {mappingConfig.nodeLabel || 'Node'}
                </span>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {Object.entries(row).slice(0, 3).map(([k, v]) => (
                    <span key={k} className="mr-3">{k}: {String(v)}</span>
                  ))}
                </div>
              </div>
            ))}
            {(parsedData?.rows.length || 0) > 3 && (
              <p className="text-sm text-gray-500 text-center mt-2">
                ... 그 외 {(parsedData?.rows.length || 0) - 3}개
              </p>
            )}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
            생성될 Cypher 쿼리
          </h4>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto">
            <code>{`// 노드 생성
CREATE (n:${mappingConfig.nodeLabel || 'Node'} {
  ${parsedData?.headers?.slice(0, 3).map(h => `${h}: row.${h}`).join(',\n  ')}
})

// 관계 생성  
MATCH (a:${mappingConfig.nodeLabel || 'Node'}),
      (b:${mappingConfig.nodeLabel || 'Node'})
WHERE a.${mappingConfig.sourceProperty || 'id'} = b.${mappingConfig.targetProperty || 'id'}
CREATE (a)-[:${mappingConfig.relationshipType || 'RELATED'}]->(b)`}</code>
          </pre>
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={() => setCurrentStep('mapping')}
          className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          이전 단계
        </button>
        <button
          onClick={handleImport}
          disabled={isProcessing}
          className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              임포트 중...
            </>
          ) : (
            <>
              <Database className="w-5 h-5" />
              데이터 임포트 시작
            </>
          )}
        </button>
      </div>
    </div>
  )

  const renderImportComplete = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center">
      <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check className="w-10 h-10 text-green-600 dark:text-green-400" />
      </div>
      
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
        임포트 완료!
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        데이터가 성공적으로 Neo4j 그래프 데이터베이스로 임포트되었습니다.
      </p>

      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mb-6">
        <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-4">임포트 결과</h4>
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {parsedData?.rows.length || 0}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">노드 생성됨</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {Math.floor((parsedData?.rows.length || 0) * 0.8)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">관계 생성됨</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {parsedData?.headers?.length || 0}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">속성 매핑됨</div>
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          setCurrentStep('upload')
          setParsedData(null)
          setMappingConfig({
            nodeLabel: '',
            nodeProperty: '',
            relationshipType: '',
            sourceProperty: '',
            targetProperty: ''
          })
        }}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        새로운 데이터 임포트
      </button>
    </div>
  )

  return (
    <div className="space-y-6">
      {renderStepIndicator()}
      
      {currentStep === 'upload' && renderUploadStep()}
      {currentStep === 'mapping' && renderMappingStep()}
      {currentStep === 'preview' && renderPreviewStep()}
      {currentStep === 'import' && renderImportComplete()}

      {/* Info Box */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div className="text-sm text-gray-700 dark:text-gray-300">
            <p className="font-medium mb-1">임포트 마법사 안내</p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
              <li>CSV 또는 JSON 형식의 데이터를 지원합니다</li>
              <li>대용량 파일은 배치 처리로 나누어 임포트됩니다</li>
              <li>중복 데이터는 자동으로 감지되어 머지됩니다</li>
              <li>임포트 전 미리보기에서 생성될 그래프를 확인하세요</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}