'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import dynamic from 'next/dynamic'

const NodeEditor = dynamic(() => import('../../components/NodeEditor'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded-lg"></div>
})

export default function NodeEditorPage() {
  return (
    <div className="max-w-7xl mx-auto">
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
          노드/관계 에디터
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          드래그앤드롭으로 그래프 구조를 설계하고 노드와 관계를 직관적으로 생성, 수정, 삭제해보세요.
        </p>
        
        <NodeEditor />
      </div>
    </div>
  )
}