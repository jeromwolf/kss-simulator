'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import CypherPlayground from '../../components/CypherPlayground'

export default function CypherPlaygroundPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <Link
          href="/modules/neo4j"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Neo4j 모듈로 돌아가기
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Cypher 쿼리 플레이그라운드
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          실시간으로 Cypher 쿼리를 작성하고 실행하여 Neo4j의 강력한 그래프 쿼리 언어를 체험해보세요.
        </p>
        
        <CypherPlayground />
      </div>
    </div>
  )
}