'use client'

import { useState } from 'react'
import { Play, Code, Database, AlertCircle, CheckCircle } from 'lucide-react'

export default function CypherPlayground() {
  const [query, setQuery] = useState(`// 노드 생성 예제
CREATE (alice:Person {name: 'Alice', age: 30})
CREATE (bob:Person {name: 'Bob', age: 25})
CREATE (alice)-[:KNOWS {since: 2020}]->(bob)
RETURN alice, bob`)
  
  const [result, setResult] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [activeTab, setActiveTab] = useState<'create' | 'read' | 'update' | 'delete'>('create')

  const sampleQueries = {
    create: `// 노드와 관계 생성
CREATE (alice:Person {name: 'Alice', age: 30, city: 'Seoul'})
CREATE (bob:Person {name: 'Bob', age: 25, city: 'Busan'})
CREATE (company:Company {name: 'TechCorp', industry: 'IT'})
CREATE (alice)-[:KNOWS {since: 2020}]->(bob)
CREATE (alice)-[:WORKS_AT {position: 'Developer', since: 2019}]->(company)
CREATE (bob)-[:WORKS_AT {position: 'Designer', since: 2021}]->(company)
RETURN alice, bob, company`,
    
    read: `// 패턴 매칭으로 데이터 조회
MATCH (p:Person)-[:WORKS_AT]->(c:Company)
WHERE c.industry = 'IT'
RETURN p.name AS employee, p.city AS location, c.name AS company
ORDER BY p.name`,
    
    update: `// 노드와 관계 속성 수정
MATCH (p:Person {name: 'Alice'})
SET p.age = 31, p.skills = ['Neo4j', 'Cypher', 'GraphQL']

MATCH (p:Person {name: 'Alice'})-[r:WORKS_AT]->(c:Company)
SET r.position = 'Senior Developer'

RETURN p`,
    
    delete: `// 관계와 노드 삭제
// 먼저 관계만 삭제
MATCH (alice:Person {name: 'Alice'})-[r:KNOWS]->(bob:Person {name: 'Bob'})
DELETE r

// 노드와 모든 관계 삭제
MATCH (p:Person {name: 'Test'})
DETACH DELETE p`
  }

  const runQuery = () => {
    setIsRunning(true)
    // 시뮬레이션 결과
    setTimeout(() => {
      const simulatedResults = {
        create: `✅ 성공적으로 생성되었습니다.
- 3개 노드 생성 (alice:Person, bob:Person, company:Company)
- 3개 관계 생성 (KNOWS, WORKS_AT x2)
- 실행 시간: 12ms`,
        
        read: `╔═══════════╦═══════════╦═══════════╗
║ employee  ║ location  ║ company   ║
╠═══════════╬═══════════╬═══════════╣
║ "Alice"   ║ "Seoul"   ║ "TechCorp"║
║ "Bob"     ║ "Busan"   ║ "TechCorp"║
╚═══════════╩═══════════╩═══════════╝
2 rows returned in 8ms`,
        
        update: `✅ 업데이트 완료
- 1개 노드 수정 (age: 31, skills 추가)
- 1개 관계 수정 (position: 'Senior Developer')
- 실행 시간: 5ms`,
        
        delete: `✅ 삭제 완료
- 1개 관계 삭제 (KNOWS)
- 실행 시간: 3ms`
      }
      
      setResult(simulatedResults[activeTab] || '쿼리가 실행되었습니다.')
      setIsRunning(false)
    }, 1000)
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Code className="w-5 h-5" />
          Cypher 플레이그라운드
        </h3>
        <div className="flex gap-2">
          {(['create', 'read', 'update', 'delete'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab)
                setQuery(sampleQueries[tab])
                setResult('')
              }}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {/* Query Editor */}
        <div className="relative">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-48 p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Cypher 쿼리를 입력하세요..."
          />
          <div className="absolute top-2 right-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
              Cypher
            </span>
          </div>
        </div>

        {/* Run Button */}
        <button
          onClick={runQuery}
          disabled={isRunning || !query.trim()}
          className={`w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
            isRunning
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isRunning ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              실행 중...
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              쿼리 실행
            </>
          )}
        </button>

        {/* Results */}
        {result && (
          <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Database className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">실행 결과</span>
            </div>
            <pre className="text-sm text-gray-600 dark:text-gray-400 font-mono whitespace-pre-wrap">
              {result}
            </pre>
          </div>
        )}

        {/* Tips */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-700 dark:text-gray-300">
              <p className="font-medium mb-1">💡 Cypher 팁</p>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• MATCH는 기존 데이터를 검색, CREATE는 새 데이터 생성</li>
                <li>• WHERE 절로 조건 필터링, RETURN으로 결과 반환</li>
                <li>• 관계는 -[:TYPE]-{'>'} 형식으로 표현</li>
                <li>• MERGE는 없으면 생성, 있으면 매칭</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}