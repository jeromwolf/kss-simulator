'use client'

import { useState } from 'react'
import { SplitSquareHorizontal, Settings, Copy, Check } from 'lucide-react'

interface ChunkingStrategy {
  id: string
  name: string
  description: string
}

const strategies: ChunkingStrategy[] = [
  {
    id: 'fixed-size',
    name: '고정 크기',
    description: '지정된 토큰/문자 수로 균등 분할'
  },
  {
    id: 'sentence',
    name: '문장 단위',
    description: '문장 경계를 기준으로 분할'
  },
  {
    id: 'paragraph',
    name: '단락 단위',
    description: '단락(\\n\\n)을 기준으로 분할'
  },
  {
    id: 'semantic',
    name: '의미 단위',
    description: '의미적으로 연관된 내용끼리 그룹화'
  },
  {
    id: 'sliding-window',
    name: '슬라이딩 윈도우',
    description: '중첩된 청크로 컨텍스트 보존'
  }
]

const sampleText = `인공지능(AI)은 인간의 학습능력, 추론능력, 지각능력을 인공적으로 구현하려는 컴퓨터 과학의 한 분야입니다. 
1950년대부터 시작된 AI 연구는 여러 번의 황금기와 침체기를 거쳐왔습니다.

최근 딥러닝 기술의 발전으로 AI는 놀라운 성과를 보이고 있습니다. 
특히 자연어 처리, 컴퓨터 비전, 음성 인식 분야에서 인간 수준의 성능을 달성했습니다.

대규모 언어 모델(LLM)은 방대한 텍스트 데이터로 학습된 AI 모델입니다. 
GPT, Claude, Gemini 등이 대표적인 예시이며, 이들은 텍스트 생성, 번역, 요약 등 다양한 작업을 수행할 수 있습니다.

그러나 LLM은 할루시네이션, 최신 정보 부족, 추론 한계 등의 문제점을 가지고 있습니다. 
이를 해결하기 위해 RAG(Retrieval-Augmented Generation) 같은 기술이 개발되었습니다.`

export default function ChunkingDemo() {
  const [selectedStrategy, setSelectedStrategy] = useState('fixed-size')
  const [chunkSize, setChunkSize] = useState(100)
  const [overlap, setOverlap] = useState(20)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const performChunking = (text: string, strategy: string): string[] => {
    switch (strategy) {
      case 'fixed-size':
        const chunks: string[] = []
        const words = text.split(' ')
        const wordsPerChunk = Math.ceil(chunkSize / 5) // 평균 5자 per word
        
        for (let i = 0; i < words.length; i += wordsPerChunk) {
          chunks.push(words.slice(i, i + wordsPerChunk).join(' '))
        }
        return chunks

      case 'sentence':
        return text.split(/[.!?]+/).filter(s => s.trim().length > 0).map(s => s.trim() + '.')

      case 'paragraph':
        return text.split('\n\n').filter(p => p.trim().length > 0)

      case 'semantic':
        // 간단한 의미 단위 시뮬레이션 (주제별로 그룹화)
        const paragraphs = text.split('\n\n')
        const semanticChunks: string[] = []
        let currentChunk = ''
        
        paragraphs.forEach((para, index) => {
          if (index % 2 === 0 && currentChunk) {
            semanticChunks.push(currentChunk.trim())
            currentChunk = para
          } else {
            currentChunk += '\n\n' + para
          }
        })
        if (currentChunk) semanticChunks.push(currentChunk.trim())
        return semanticChunks

      case 'sliding-window':
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
        const slidingChunks: string[] = []
        const sentencesPerChunk = 3
        const overlapSentences = 1
        
        for (let i = 0; i < sentences.length; i += (sentencesPerChunk - overlapSentences)) {
          const chunk = sentences
            .slice(i, i + sentencesPerChunk)
            .map(s => s.trim() + '.')
            .join(' ')
          if (chunk) slidingChunks.push(chunk)
        }
        return slidingChunks

      default:
        return [text]
    }
  }

  const chunks = performChunking(sampleText, selectedStrategy)

  const copyChunk = async (chunk: string, index: number) => {
    await navigator.clipboard.writeText(chunk)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Settings className="text-emerald-600 dark:text-emerald-400" size={20} />
          청킹 설정
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              청킹 전략
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {strategies.map(strategy => (
                <button
                  key={strategy.id}
                  onClick={() => setSelectedStrategy(strategy.id)}
                  className={`p-3 rounded-lg border text-sm transition-all ${
                    selectedStrategy === strategy.id
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                      : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:border-gray-400'
                  }`}
                >
                  <div className="font-medium">{strategy.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {strategy.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {selectedStrategy === 'fixed-size' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                청크 크기: {chunkSize}자
              </label>
              <input
                type="range"
                min="50"
                max="300"
                step="10"
                value={chunkSize}
                onChange={(e) => setChunkSize(Number(e.target.value))}
                className="w-full"
              />
            </div>
          )}

          {selectedStrategy === 'sliding-window' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                중첩 크기: {overlap}%
              </label>
              <input
                type="range"
                min="0"
                max="50"
                step="10"
                value={overlap}
                onChange={(e) => setOverlap(Number(e.target.value))}
                className="w-full"
              />
            </div>
          )}
        </div>
      </div>

      {/* Original Text */}
      <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">원본 텍스트</h3>
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap text-sm">
          {sampleText}
        </p>
        <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          총 {sampleText.length}자 | {sampleText.split(' ').length}단어
        </div>
      </div>

      {/* Chunked Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <SplitSquareHorizontal className="text-emerald-600 dark:text-emerald-400" size={20} />
            청킹 결과
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {chunks.length}개 청크 생성됨
          </span>
        </div>

        <div className="grid gap-3">
          {chunks.map((chunk, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  청크 #{index + 1}
                </span>
                <button
                  onClick={() => copyChunk(chunk, index)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  {copiedIndex === index ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-wrap">
                {chunk}
              </p>
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                {chunk.length}자 | {chunk.split(' ').length}단어
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strategy Explanation */}
      <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-6">
        <h4 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-2">
          💡 청킹 전략 선택 가이드
        </h4>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li><strong>고정 크기</strong>: 임베딩 모델의 토큰 제한에 맞출 때</li>
          <li><strong>문장 단위</strong>: 짧고 정확한 답변이 필요할 때</li>
          <li><strong>단락 단위</strong>: 문서 구조가 잘 정리되어 있을 때</li>
          <li><strong>의미 단위</strong>: 주제별로 정보를 그룹화하고 싶을 때</li>
          <li><strong>슬라이딩 윈도우</strong>: 컨텍스트 연속성이 중요할 때</li>
        </ul>
      </div>
    </div>
  )
}