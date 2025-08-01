'use client'

import { useState, useEffect } from 'react'
import { Search, Database, Zap, BarChart3, Info, Target, ArrowRight } from 'lucide-react'

interface Document {
  id: string
  title: string
  content: string
  embedding?: number[]
  score?: number
}

interface SearchResult {
  document: Document
  score: number
  highlighted?: string
}

// 샘플 문서 데이터베이스
const documentDatabase: Document[] = [
  {
    id: '1',
    title: 'RAG 시스템 개요',
    content: 'RAG(Retrieval-Augmented Generation)는 대규모 언어 모델의 한계를 극복하기 위해 외부 지식을 활용하는 기술입니다. 검색과 생성을 결합하여 더 정확한 답변을 제공합니다.'
  },
  {
    id: '2',
    title: '벡터 데이터베이스의 이해',
    content: '벡터 데이터베이스는 고차원 벡터를 효율적으로 저장하고 검색하는 특수한 데이터베이스입니다. 유사도 검색에 최적화되어 있으며, Pinecone, Weaviate, Chroma 등이 대표적입니다.'
  },
  {
    id: '3',
    title: '임베딩 모델 선택 가이드',
    content: '임베딩 모델은 텍스트를 벡터로 변환하는 역할을 합니다. OpenAI의 text-embedding-3, Cohere의 embed-v3, 오픈소스 BGE-M3 등 다양한 선택지가 있습니다.'
  },
  {
    id: '4',
    title: '하이브리드 검색 전략',
    content: '하이브리드 검색은 벡터 검색과 키워드 검색을 결합한 방식입니다. 벡터 검색의 의미적 이해와 키워드 검색의 정확성을 모두 활용할 수 있습니다.'
  },
  {
    id: '5',
    title: '청킹 최적화 기법',
    content: '효과적인 청킹은 RAG 성능의 핵심입니다. 고정 크기, 의미 단위, 슬라이딩 윈도우 등 다양한 전략을 상황에 맞게 선택해야 합니다.'
  },
  {
    id: '6',
    title: 'LLM 프롬프트 엔지니어링',
    content: 'LLM에게 검색된 컨텍스트를 효과적으로 전달하는 프롬프트 설계가 중요합니다. 시스템 프롬프트, 컨텍스트 순서, 메타데이터 활용 등을 고려해야 합니다.'
  },
  {
    id: '7',
    title: 'RAG 평가 지표',
    content: 'RAG 시스템의 성능은 정확도, 관련성, 완전성, 일관성 등으로 평가합니다. RAGAS 프레임워크를 사용하면 체계적인 평가가 가능합니다.'
  },
  {
    id: '8',
    title: '실시간 업데이트 아키텍처',
    content: '지식 베이스의 실시간 업데이트를 위해서는 증분 인덱싱, 버전 관리, 캐시 무효화 등의 전략이 필요합니다.'
  }
]

// 간단한 벡터 유사도 계산 (실제로는 임베딩 모델 사용)
const calculateRelevanceScore = (query: string, content: string): number => {
  const queryWords = query.toLowerCase().split(' ')
  const contentWords = content.toLowerCase().split(' ')
  
  let matchCount = 0
  queryWords.forEach(qWord => {
    contentWords.forEach(cWord => {
      if (cWord.includes(qWord) || qWord.includes(cWord)) {
        matchCount++
      }
    })
  })
  
  return Math.min(matchCount / queryWords.length, 1)
}

// 검색 알고리즘 시뮬레이션
const performSearch = (
  query: string, 
  method: 'vector' | 'keyword' | 'hybrid',
  topK: number
): SearchResult[] => {
  if (!query.trim()) return []
  
  let results: SearchResult[] = []
  
  if (method === 'vector' || method === 'hybrid') {
    // 벡터 검색 시뮬레이션
    results = documentDatabase.map(doc => ({
      document: doc,
      score: calculateRelevanceScore(query, doc.content + ' ' + doc.title)
    }))
  }
  
  if (method === 'keyword') {
    // 키워드 검색 시뮬레이션
    const queryWords = query.toLowerCase().split(' ')
    results = documentDatabase
      .filter(doc => {
        const text = (doc.title + ' ' + doc.content).toLowerCase()
        return queryWords.some(word => text.includes(word))
      })
      .map(doc => ({
        document: doc,
        score: 0.5 + Math.random() * 0.5 // 시뮬레이션을 위한 랜덤 스코어
      }))
  }
  
  if (method === 'hybrid') {
    // 하이브리드: 벡터 + 키워드 점수 조합
    const keywordResults = performSearch(query, 'keyword', topK)
    results = results.map(result => {
      const kwResult = keywordResults.find(kw => kw.document.id === result.document.id)
      return {
        ...result,
        score: result.score * 0.7 + (kwResult?.score || 0) * 0.3
      }
    })
  }
  
  // 점수 기준 정렬 및 상위 K개 선택
  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map(result => ({
      ...result,
      highlighted: highlightMatches(result.document.content, query)
    }))
}

// 매칭된 부분 하이라이트
const highlightMatches = (text: string, query: string): string => {
  const words = query.split(' ')
  let highlighted = text
  
  words.forEach(word => {
    const regex = new RegExp(`(${word})`, 'gi')
    highlighted = highlighted.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800">$1</mark>')
  })
  
  return highlighted
}

export default function VectorSearchDemo() {
  const [query, setQuery] = useState('')
  const [searchMethod, setSearchMethod] = useState<'vector' | 'keyword' | 'hybrid'>('vector')
  const [topK, setTopK] = useState(3)
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchTime, setSearchTime] = useState(0)

  const handleSearch = async () => {
    if (!query.trim()) return
    
    setIsSearching(true)
    const startTime = performance.now()
    
    // 검색 시뮬레이션 (실제로는 더 오래 걸림)
    setTimeout(() => {
      const searchResults = performSearch(query, searchMethod, topK)
      setResults(searchResults)
      setSearchTime(performance.now() - startTime)
      setIsSearching(false)
    }, 500)
  }

  return (
    <div className="space-y-6">
      {/* Search Configuration */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Database className="text-emerald-600 dark:text-emerald-400" size={20} />
          검색 설정
        </h3>
        
        <div className="space-y-4">
          {/* Search Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              검색 방법
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['vector', 'keyword', 'hybrid'] as const).map(method => (
                <button
                  key={method}
                  onClick={() => setSearchMethod(method)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    searchMethod === method
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {method === 'vector' && '벡터 검색'}
                  {method === 'keyword' && '키워드 검색'}
                  {method === 'hybrid' && '하이브리드'}
                </button>
              ))}
            </div>
          </div>

          {/* Top K */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              상위 K개 결과: {topK}
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={topK}
              onChange={(e) => setTopK(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Search Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              검색 쿼리
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="예: RAG 시스템, 벡터 검색, 임베딩..."
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isSearching ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    검색 중...
                  </>
                ) : (
                  <>
                    <Search size={16} />
                    검색
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Process Visualization */}
      {query && (
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-gray-800/50 dark:to-gray-900/50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Zap className="text-emerald-600 dark:text-emerald-400" size={20} />
            검색 프로세스
          </h3>
          
          <div className="flex items-center justify-between gap-4 text-sm">
            <div className="text-center">
              <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center mb-2">
                <Search className="text-emerald-600" size={20} />
              </div>
              <div className="font-medium">쿼리</div>
              <div className="text-gray-600 dark:text-gray-400">{query}</div>
            </div>
            
            <ArrowRight className="text-gray-400" size={20} />
            
            <div className="text-center">
              <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center mb-2">
                <Target className="text-emerald-600" size={20} />
              </div>
              <div className="font-medium">임베딩</div>
              <div className="text-gray-600 dark:text-gray-400">벡터 변환</div>
            </div>
            
            <ArrowRight className="text-gray-400" size={20} />
            
            <div className="text-center">
              <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center mb-2">
                <Database className="text-emerald-600" size={20} />
              </div>
              <div className="font-medium">검색</div>
              <div className="text-gray-600 dark:text-gray-400">{searchMethod}</div>
            </div>
            
            <ArrowRight className="text-gray-400" size={20} />
            
            <div className="text-center">
              <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center mb-2">
                <BarChart3 className="text-emerald-600" size={20} />
              </div>
              <div className="font-medium">순위</div>
              <div className="text-gray-600 dark:text-gray-400">Top {topK}</div>
            </div>
          </div>
        </div>
      )}

      {/* Search Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              검색 결과 ({results.length}개)
            </h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              검색 시간: {searchTime.toFixed(0)}ms
            </span>
          </div>
          
          <div className="space-y-3">
            {results.map((result, index) => (
              <div
                key={result.document.id}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                      #{index + 1}
                    </span>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {result.document.title}
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span>문서 ID: {result.document.id}</span>
                        <span>관련도: {(result.score * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Score Visualization */}
                  <div className="w-24">
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-emerald-600 h-2 rounded-full transition-all"
                        style={{ width: `${result.score * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
                
                <p 
                  className="text-gray-700 dark:text-gray-300 text-sm"
                  dangerouslySetInnerHTML={{ __html: result.highlighted || result.document.content }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2 flex items-center gap-2">
          <Info size={20} />
          벡터 검색의 장점
        </h4>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>• <strong>의미적 유사성</strong>: 동의어나 관련 개념도 찾아냅니다</li>
          <li>• <strong>언어 독립적</strong>: 다국어 검색이 가능합니다</li>
          <li>• <strong>오타 허용</strong>: 정확한 매칭이 아니어도 관련 문서를 찾습니다</li>
          <li>• <strong>컨텍스트 이해</strong>: 문맥을 고려한 검색이 가능합니다</li>
        </ul>
      </div>
    </div>
  )
}