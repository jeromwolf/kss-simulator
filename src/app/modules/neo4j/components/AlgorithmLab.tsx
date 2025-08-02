'use client'

import { useState } from 'react'
import { Play, BarChart3, GitBranch, TrendingUp, Users, Route, Zap } from 'lucide-react'

type Algorithm = 'pagerank' | 'shortest-path' | 'community' | 'centrality'

export default function AlgorithmLab() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm>('pagerank')
  const [isRunning, setIsRunning] = useState(false)
  const [results, setResults] = useState<any>(null)

  const algorithms = {
    pagerank: {
      name: 'PageRank',
      icon: TrendingUp,
      description: '노드의 중요도를 계산하는 알고리즘',
      color: 'blue',
      query: `CALL gds.pageRank.stream('myGraph')
YIELD nodeId, score
RETURN gds.util.asNode(nodeId).name AS name, score
ORDER BY score DESC
LIMIT 10`
    },
    'shortest-path': {
      name: '최단 경로',
      icon: Route,
      description: '두 노드 간의 최단 경로 찾기',
      color: 'green',
      query: `MATCH (start:Person {name: 'Alice'}),
      (end:Person {name: 'David'})
CALL gds.shortestPath.dijkstra.stream('myGraph', {
  sourceNode: start,
  targetNode: end
})
YIELD path
RETURN path`
    },
    community: {
      name: '커뮤니티 탐지',
      icon: Users,
      description: '그래프 내 커뮤니티 그룹 발견',
      color: 'purple',
      query: `CALL gds.louvain.stream('myGraph')
YIELD nodeId, communityId
RETURN communityId, 
       collect(gds.util.asNode(nodeId).name) AS members
ORDER BY size(members) DESC`
    },
    centrality: {
      name: '중심성 분석',
      icon: Zap,
      description: '네트워크에서 중요한 노드 식별',
      color: 'orange',
      query: `CALL gds.betweenness.stream('myGraph')
YIELD nodeId, score
RETURN gds.util.asNode(nodeId).name AS name, score
ORDER BY score DESC
LIMIT 10`
    }
  }

  const runAlgorithm = () => {
    setIsRunning(true)
    
    // 시뮬레이션 결과
    setTimeout(() => {
      const mockResults = {
        pagerank: {
          type: 'table',
          headers: ['노드', 'PageRank 점수'],
          data: [
            ['Alice', 0.385],
            ['Bob', 0.342],
            ['TechCorp', 0.298],
            ['Carol', 0.245],
            ['David', 0.189]
          ]
        },
        'shortest-path': {
          type: 'path',
          path: ['Alice', 'Carol', 'Bob', 'David'],
          distance: 3,
          details: 'Alice → KNOWS → Carol → KNOWS → Bob → FOLLOWS → David'
        },
        community: {
          type: 'communities',
          groups: [
            { id: 0, members: ['Alice', 'Bob', 'Carol'], color: '#3b82f6' },
            { id: 1, members: ['David', 'Eve'], color: '#10b981' },
            { id: 2, members: ['TechCorp', 'StartupX'], color: '#f59e0b' }
          ]
        },
        centrality: {
          type: 'chart',
          data: [
            { name: 'Alice', betweenness: 0.67, closeness: 0.83 },
            { name: 'Bob', betweenness: 0.52, closeness: 0.75 },
            { name: 'TechCorp', betweenness: 0.45, closeness: 0.71 },
            { name: 'Carol', betweenness: 0.38, closeness: 0.69 },
            { name: 'David', betweenness: 0.22, closeness: 0.56 }
          ]
        }
      }
      
      setResults(mockResults[selectedAlgorithm])
      setIsRunning(false)
    }, 1500)
  }

  const renderResults = () => {
    if (!results) return null

    switch (results.type) {
      case 'table':
        return (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  {results.headers.map((header: string, i: number) => (
                    <th key={i} className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.data.map((row: any[], i: number) => (
                  <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    {row.map((cell: any, j: number) => (
                      <td key={j} className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                        {typeof cell === 'number' ? cell.toFixed(3) : cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )

      case 'path':
        return (
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">최단 경로 발견!</h4>
            <div className="flex items-center gap-2 mb-4">
              {results.path.map((node: string, i: number) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-white dark:bg-gray-800 rounded-lg border-2 border-green-500">
                    {node}
                  </div>
                  {i < results.path.length - 1 && <span className="text-green-600">→</span>}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              거리: {results.distance} | 경로: {results.details}
            </p>
          </div>
        )

      case 'communities':
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-purple-800 dark:text-purple-200">발견된 커뮤니티</h4>
            {results.groups.map((group: any) => (
              <div key={group.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 border-l-4" 
                   style={{ borderColor: group.color }}>
                <h5 className="font-medium mb-2">커뮤니티 {group.id + 1}</h5>
                <div className="flex flex-wrap gap-2">
                  {group.members.map((member: string) => (
                    <span key={member} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                      {member}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )

      case 'chart':
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-orange-800 dark:text-orange-200">중심성 점수</h4>
            {results.data.map((item: any) => (
              <div key={item.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    B: {item.betweenness.toFixed(2)} | C: {item.closeness.toFixed(2)}
                  </span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full"
                      style={{ width: `${item.betweenness * 100}%` }}
                    />
                  </div>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${item.closeness * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="flex gap-4 text-xs text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 bg-orange-500 rounded"></div>
                Betweenness
              </span>
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                Closeness
              </span>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Algorithm Selection */}
      <div className="grid md:grid-cols-4 gap-4">
        {Object.entries(algorithms).map(([key, algo]) => {
          const Icon = algo.icon
          const isSelected = selectedAlgorithm === key
          
          return (
            <button
              key={key}
              onClick={() => {
                setSelectedAlgorithm(key as Algorithm)
                setResults(null)
              }}
              className={`p-4 rounded-xl border-2 transition-all ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <Icon className={`w-8 h-8 mb-2 ${
                isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'
              }`} />
              <h3 className="font-semibold text-gray-900 dark:text-white">{algo.name}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{algo.description}</p>
            </button>
          )
        })}
      </div>

      {/* Algorithm Details */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
          {algorithms[selectedAlgorithm].name} 알고리즘
        </h3>
        
        {/* Cypher Query */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
            Cypher 쿼리
          </label>
          <pre className="bg-white dark:bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto">
            <code className="text-gray-800 dark:text-gray-200">
              {algorithms[selectedAlgorithm].query}
            </code>
          </pre>
        </div>

        {/* Run Button */}
        <button
          onClick={runAlgorithm}
          disabled={isRunning}
          className={`w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
            isRunning
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isRunning ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              알고리즘 실행 중...
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              알고리즘 실행
            </>
          )}
        </button>
      </div>

      {/* Results */}
      {results && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-semibold text-gray-900 dark:text-white">실행 결과</h3>
          </div>
          {renderResults()}
        </div>
      )}

      {/* Info Box */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
        <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">💡 알고리즘 설명</h4>
        <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
          {selectedAlgorithm === 'pagerank' && (
            <>
              <p>PageRank는 웹 페이지의 중요도를 측정하기 위해 Google이 개발한 알고리즘입니다.</p>
              <p>많은 중요한 노드로부터 연결을 받는 노드일수록 높은 점수를 받습니다.</p>
            </>
          )}
          {selectedAlgorithm === 'shortest-path' && (
            <>
              <p>최단 경로 알고리즘은 두 노드 간의 가장 짧은 경로를 찾습니다.</p>
              <p>Dijkstra, A*, Bellman-Ford 등 다양한 알고리즘이 있습니다.</p>
            </>
          )}
          {selectedAlgorithm === 'community' && (
            <>
              <p>커뮤니티 탐지는 밀접하게 연결된 노드 그룹을 식별합니다.</p>
              <p>Louvain, Label Propagation 등의 알고리즘을 사용합니다.</p>
            </>
          )}
          {selectedAlgorithm === 'centrality' && (
            <>
              <p>중심성 측정은 네트워크에서 노드의 중요도를 계산합니다.</p>
              <p>Betweenness는 경로 통과 빈도, Closeness는 다른 노드와의 평균 거리를 측정합니다.</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}