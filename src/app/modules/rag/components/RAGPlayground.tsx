'use client'

import { useState } from 'react'
import { 
  FileText, Upload, Search, Database, Sparkles, Settings, 
  Play, CheckCircle, AlertCircle, Loader2, ChevronRight,
  Split, Hash, Brain, Zap
} from 'lucide-react'

interface PipelineStep {
  id: string
  name: string
  icon: any
  status: 'idle' | 'processing' | 'completed' | 'error'
  result?: any
}

const initialSteps: PipelineStep[] = [
  { id: 'upload', name: '문서 업로드', icon: Upload, status: 'idle' },
  { id: 'chunk', name: '문서 청킹', icon: Split, status: 'idle' },
  { id: 'embed', name: '임베딩 생성', icon: Hash, status: 'idle' },
  { id: 'index', name: '벡터 인덱싱', icon: Database, status: 'idle' },
  { id: 'search', name: '유사도 검색', icon: Search, status: 'idle' },
  { id: 'generate', name: '답변 생성', icon: Sparkles, status: 'idle' },
]

export default function RAGPlayground() {
  const [steps, setSteps] = useState<PipelineStep[]>(initialSteps)
  const [isRunning, setIsRunning] = useState(false)
  const [query, setQuery] = useState('')
  const [uploadedText, setUploadedText] = useState('')
  const [finalAnswer, setFinalAnswer] = useState('')
  
  // Pipeline 설정
  const [chunkSize, setChunkSize] = useState(200)
  const [topK, setTopK] = useState(3)
  const [embeddingModel, setEmbeddingModel] = useState('openai')
  const [llmModel, setLLMModel] = useState('gpt-4')

  // 샘플 문서
  const sampleDocument = `RAG(Retrieval-Augmented Generation)는 대규모 언어 모델의 한계를 극복하기 위한 혁신적인 접근 방식입니다. 
기존 LLM은 학습 데이터에만 의존하여 할루시네이션이나 최신 정보 부족 문제가 있었습니다.

RAG는 외부 지식 베이스에서 관련 정보를 검색하여 LLM의 컨텍스트로 제공합니다. 
이를 통해 더 정확하고 신뢰할 수 있는 답변을 생성할 수 있습니다.

RAG 파이프라인은 다음과 같은 단계로 구성됩니다:
1. 문서를 적절한 크기로 분할(청킹)
2. 각 청크를 벡터로 변환(임베딩)
3. 벡터를 데이터베이스에 저장(인덱싱)
4. 사용자 쿼리와 유사한 청크 검색
5. 검색된 정보를 바탕으로 답변 생성

이러한 접근 방식은 실시간 정보 업데이트, 소스 추적, 도메인 특화 지식 활용 등의 장점을 제공합니다.`

  const runPipeline = async () => {
    if (!uploadedText || !query) {
      alert('문서와 질문을 모두 입력해주세요!')
      return
    }

    setIsRunning(true)
    setFinalAnswer('')
    
    // 각 단계별 시뮬레이션
    for (let i = 0; i < steps.length; i++) {
      // 현재 단계 처리 중
      setSteps(prev => prev.map((step, idx) => ({
        ...step,
        status: idx === i ? 'processing' : idx < i ? 'completed' : 'idle'
      })))

      // 각 단계별 처리 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000))

      // 단계별 결과 생성
      let result: any = null
      switch (steps[i].id) {
        case 'upload':
          result = { size: uploadedText.length, type: 'text/plain' }
          break
        case 'chunk':
          const chunks = Math.ceil(uploadedText.length / chunkSize)
          result = { chunks, avgSize: chunkSize }
          break
        case 'embed':
          result = { model: embeddingModel, dimensions: 1536 }
          break
        case 'index':
          result = { indexed: true, database: 'vector-db' }
          break
        case 'search':
          result = { found: topK, relevance: 0.92 }
          break
        case 'generate':
          result = generateAnswer()
          setFinalAnswer(result)
          break
      }

      // 현재 단계 완료
      setSteps(prev => prev.map((step, idx) => ({
        ...step,
        status: idx <= i ? 'completed' : 'idle',
        result: idx === i ? result : step.result
      })))
    }

    setIsRunning(false)
  }

  const generateAnswer = () => {
    // 간단한 답변 생성 시뮬레이션
    const answers: { [key: string]: string } = {
      'RAG': 'RAG(Retrieval-Augmented Generation)는 외부 지식 베이스에서 관련 정보를 검색하여 LLM의 컨텍스트로 제공하는 기술입니다. 이를 통해 더 정확하고 신뢰할 수 있는 답변을 생성할 수 있습니다.',
      '장점': 'RAG의 주요 장점은 실시간 정보 업데이트, 소스 추적 가능, 도메인 특화 지식 활용, 할루시네이션 감소 등이 있습니다.',
      '파이프라인': 'RAG 파이프라인은 문서 청킹 → 임베딩 생성 → 벡터 인덱싱 → 유사도 검색 → 답변 생성의 5단계로 구성됩니다.',
      '단계': 'RAG는 5가지 주요 단계로 구성됩니다: 1) 문서 분할, 2) 벡터 변환, 3) 데이터베이스 저장, 4) 유사 문서 검색, 5) 답변 생성',
    }

    // 쿼리에 따른 답변 선택
    for (const [keyword, answer] of Object.entries(answers)) {
      if (query.toLowerCase().includes(keyword.toLowerCase())) {
        return answer
      }
    }

    return 'RAG 시스템을 통해 귀하의 질문에 대한 답변을 생성했습니다. 검색된 문서를 기반으로 가장 관련성 높은 정보를 제공합니다.'
  }

  const resetPipeline = () => {
    setSteps(initialSteps)
    setFinalAnswer('')
  }

  return (
    <div className="space-y-6">
      {/* 설정 패널 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Settings className="text-emerald-600 dark:text-emerald-400" size={20} />
          파이프라인 설정
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              청크 크기: {chunkSize}자
            </label>
            <input
              type="range"
              min="100"
              max="500"
              step="50"
              value={chunkSize}
              onChange={(e) => setChunkSize(Number(e.target.value))}
              className="w-full"
              disabled={isRunning}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              검색 결과 수: {topK}개
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={topK}
              onChange={(e) => setTopK(Number(e.target.value))}
              className="w-full"
              disabled={isRunning}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              임베딩 모델
            </label>
            <select
              value={embeddingModel}
              onChange={(e) => setEmbeddingModel(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
              disabled={isRunning}
            >
              <option value="openai">OpenAI text-embedding-3</option>
              <option value="cohere">Cohere embed-v3</option>
              <option value="bge">BGE-M3</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              LLM 모델
            </label>
            <select
              value={llmModel}
              onChange={(e) => setLLMModel(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
              disabled={isRunning}
            >
              <option value="gpt-4">GPT-4</option>
              <option value="claude-3">Claude 3</option>
              <option value="gemini-pro">Gemini Pro</option>
            </select>
          </div>
        </div>
      </div>

      {/* 입력 영역 */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* 문서 입력 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <FileText className="text-emerald-600 dark:text-emerald-400" size={20} />
            문서 입력
          </h3>
          <textarea
            value={uploadedText}
            onChange={(e) => setUploadedText(e.target.value)}
            placeholder="RAG 시스템에 저장할 문서를 입력하세요..."
            className="w-full h-40 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
            disabled={isRunning}
          />
          <button
            onClick={() => setUploadedText(sampleDocument)}
            className="mt-2 text-sm text-emerald-600 dark:text-emerald-400 hover:underline"
            disabled={isRunning}
          >
            샘플 문서 사용
          </button>
        </div>

        {/* 질문 입력 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Brain className="text-emerald-600 dark:text-emerald-400" size={20} />
            질문 입력
          </h3>
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="예: RAG란 무엇인가요? RAG의 장점은?"
            className="w-full h-40 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
            disabled={isRunning}
          />
          <div className="mt-2 space-x-2">
            <button
              onClick={() => setQuery('RAG란 무엇인가요?')}
              className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline"
              disabled={isRunning}
            >
              예시 1
            </button>
            <button
              onClick={() => setQuery('RAG의 주요 장점은?')}
              className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline"
              disabled={isRunning}
            >
              예시 2
            </button>
            <button
              onClick={() => setQuery('RAG 파이프라인의 단계는?')}
              className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline"
              disabled={isRunning}
            >
              예시 3
            </button>
          </div>
        </div>
      </div>

      {/* 파이프라인 시각화 */}
      <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-gray-800/50 dark:to-gray-900/50 rounded-lg p-8">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Zap className="text-emerald-600 dark:text-emerald-400" size={20} />
          RAG 파이프라인
        </h3>
        
        <div className="flex items-center justify-between gap-2 mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex-1">
              <div className={`
                relative bg-white dark:bg-gray-800 rounded-lg p-4 text-center transition-all
                ${step.status === 'processing' ? 'ring-2 ring-emerald-500 scale-105' : ''}
                ${step.status === 'completed' ? 'ring-2 ring-green-500' : ''}
                ${step.status === 'error' ? 'ring-2 ring-red-500' : ''}
              `}>
                <div className="flex justify-center mb-2">
                  {step.status === 'idle' && <step.icon className="w-8 h-8 text-gray-400" />}
                  {step.status === 'processing' && <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />}
                  {step.status === 'completed' && <CheckCircle className="w-8 h-8 text-green-500" />}
                  {step.status === 'error' && <AlertCircle className="w-8 h-8 text-red-500" />}
                </div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {step.name}
                </div>
                {step.result && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {typeof step.result === 'object' ? 
                      Object.entries(step.result).map(([k, v]) => `${k}: ${v}`).join(', ') 
                      : step.result
                    }
                  </div>
                )}
              </div>
              {index < steps.length - 1 && (
                <ChevronRight className="absolute -right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={runPipeline}
            disabled={isRunning || !uploadedText || !query}
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isRunning ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                파이프라인 실행 중...
              </>
            ) : (
              <>
                <Play size={20} />
                파이프라인 실행
              </>
            )}
          </button>
          
          <button
            onClick={resetPipeline}
            disabled={isRunning}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
          >
            초기화
          </button>
        </div>
      </div>

      {/* 최종 답변 */}
      {finalAnswer && (
        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-6">
          <h3 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-3 flex items-center gap-2">
            <Sparkles size={20} />
            생성된 답변
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            {finalAnswer}
          </p>
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            <p>• 사용된 모델: {llmModel}</p>
            <p>• 검색된 청크: {topK}개</p>
            <p>• 임베딩 모델: {embeddingModel}</p>
          </div>
        </div>
      )}
    </div>
  )
}