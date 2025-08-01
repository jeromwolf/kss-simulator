'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, RefreshCw, Info } from 'lucide-react'

interface TextEmbedding {
  text: string
  x: number
  y: number
  similarity?: number
}

const sampleTexts = [
  '인공지능은 미래 기술입니다',
  'AI는 혁신적인 기술입니다',
  '머신러닝과 딥러닝',
  '자연어 처리 기술',
  '컴퓨터 비전과 이미지 인식',
  '강아지는 귀여운 동물입니다',
  '고양이도 사랑스럽습니다',
  '오늘 날씨가 좋네요',
  '비가 오는 날씨입니다',
  'LLM과 RAG 시스템'
]

// 간단한 임베딩 시뮬레이션 (실제로는 임베딩 모델 사용)
const generateMockEmbedding = (text: string): [number, number] => {
  // 텍스트 특성에 따라 2D 좌표 생성
  let x = 0, y = 0
  
  // AI/기술 관련 키워드
  if (text.includes('인공지능') || text.includes('AI') || text.includes('머신러닝') || text.includes('딥러닝')) {
    x = Math.random() * 100 - 200
    y = Math.random() * 100 - 200
  }
  // 자연어/컴퓨터비전 관련
  else if (text.includes('자연어') || text.includes('컴퓨터 비전') || text.includes('LLM') || text.includes('RAG')) {
    x = Math.random() * 100 + 100
    y = Math.random() * 100 - 200
  }
  // 동물 관련
  else if (text.includes('강아지') || text.includes('고양이') || text.includes('동물')) {
    x = Math.random() * 100 - 200
    y = Math.random() * 100 + 100
  }
  // 날씨 관련
  else if (text.includes('날씨') || text.includes('비')) {
    x = Math.random() * 100 + 100
    y = Math.random() * 100 + 100
  }
  // 기타
  else {
    x = Math.random() * 400 - 200
    y = Math.random() * 400 - 200
  }
  
  return [x, y]
}

// 코사인 유사도 계산 시뮬레이션
const calculateSimilarity = (text1: string, text2: string): number => {
  const words1 = new Set(text1.split(' '))
  const words2 = new Set(text2.split(' '))
  
  const intersection = new Set([...words1].filter(x => words2.has(x)))
  const union = new Set([...words1, ...words2])
  
  return intersection.size / union.size
}

export default function EmbeddingVisualizer() {
  const [embeddings, setEmbeddings] = useState<TextEmbedding[]>([])
  const [queryText, setQueryText] = useState('')
  const [selectedText, setSelectedText] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // 초기 임베딩 생성
    const initialEmbeddings = sampleTexts.map(text => {
      const [x, y] = generateMockEmbedding(text)
      return { text, x, y }
    })
    setEmbeddings(initialEmbeddings)
  }, [])

  useEffect(() => {
    drawEmbeddings()
  }, [embeddings, selectedText, queryText])

  const drawEmbeddings = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 캔버스 초기화
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // 배경 그리드
    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 1
    for (let i = 0; i <= canvas.width; i += 50) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, canvas.height)
      ctx.stroke()
    }
    for (let i = 0; i <= canvas.height; i += 50) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(canvas.width, i)
      ctx.stroke()
    }

    // 중심선
    ctx.strokeStyle = '#9ca3af'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(canvas.width / 2, 0)
    ctx.lineTo(canvas.width / 2, canvas.height)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(0, canvas.height / 2)
    ctx.lineTo(canvas.width, canvas.height / 2)
    ctx.stroke()

    // 임베딩 점들 그리기
    embeddings.forEach(embedding => {
      const x = embedding.x + canvas.width / 2
      const y = embedding.y + canvas.height / 2
      
      // 유사도에 따른 색상
      let color = '#6b7280'
      let size = 6
      
      if (queryText && queryText.length > 2) {
        const similarity = calculateSimilarity(queryText, embedding.text)
        if (similarity > 0.3) {
          color = '#10b981'
          size = 8 + similarity * 10
        } else if (similarity > 0.1) {
          color = '#f59e0b'
          size = 6 + similarity * 5
        }
      }
      
      if (selectedText === embedding.text) {
        color = '#3b82f6'
        size = 12
      }
      
      // 점 그리기
      ctx.beginPath()
      ctx.arc(x, y, size, 0, 2 * Math.PI)
      ctx.fillStyle = color
      ctx.fill()
      
      // 텍스트 레이블
      ctx.fillStyle = '#374151'
      ctx.font = '12px sans-serif'
      ctx.fillText(embedding.text, x + 10, y - 5)
    })
  }

  const handleSearch = () => {
    if (!queryText) return
    
    // 쿼리 텍스트의 임베딩 생성 및 추가
    const [x, y] = generateMockEmbedding(queryText)
    const newEmbedding: TextEmbedding = { text: queryText, x, y }
    
    // 기존 임베딩과의 유사도 계산
    const embeddingsWithSimilarity = embeddings.map(emb => ({
      ...emb,
      similarity: calculateSimilarity(queryText, emb.text)
    }))
    
    setEmbeddings([...embeddingsWithSimilarity, newEmbedding])
  }

  const resetVisualization = () => {
    const initialEmbeddings = sampleTexts.map(text => {
      const [x, y] = generateMockEmbedding(text)
      return { text, x, y }
    })
    setEmbeddings(initialEmbeddings)
    setQueryText('')
    setSelectedText(null)
  }

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="검색할 텍스트를 입력하세요..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
          >
            <Search size={16} />
            검색
          </button>
          <button
            onClick={resetVisualization}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
          >
            <RefreshCw size={16} />
            초기화
          </button>
        </div>
      </div>

      {/* Visualization Canvas */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
          임베딩 공간 시각화
        </h3>
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900"
        />
        
        {/* Legend */}
        <div className="mt-4 flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-500"></div>
            <span className="text-gray-600 dark:text-gray-400">기본</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-gray-600 dark:text-gray-400">낮은 유사도</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
            <span className="text-gray-600 dark:text-gray-400">높은 유사도</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            <span className="text-gray-600 dark:text-gray-400">선택됨</span>
          </div>
        </div>
      </div>

      {/* Text List */}
      <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
          텍스트 목록 (클릭하여 선택)
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          {embeddings.map((embedding, index) => (
            <button
              key={index}
              onClick={() => setSelectedText(embedding.text)}
              className={`p-3 rounded-lg text-left transition-all ${
                selectedText === embedding.text
                  ? 'bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500'
                  : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:border-gray-400'
              }`}
            >
              <div className="font-medium text-gray-900 dark:text-white">
                {embedding.text}
              </div>
              {embedding.similarity !== undefined && (
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  유사도: {(embedding.similarity * 100).toFixed(0)}%
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2 flex items-center gap-2">
          <Info size={20} />
          임베딩의 작동 원리
        </h4>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>• 의미가 비슷한 텍스트는 벡터 공간에서 가까이 위치합니다</li>
          <li>• 실제 임베딩은 수백~수천 차원이지만, 여기서는 2D로 단순화했습니다</li>
          <li>• 검색 시 쿼리와 가장 가까운 벡터들을 찾아 관련 문서를 반환합니다</li>
          <li>• 거리 계산은 주로 코사인 유사도나 유클리드 거리를 사용합니다</li>
        </ul>
      </div>
    </div>
  )
}