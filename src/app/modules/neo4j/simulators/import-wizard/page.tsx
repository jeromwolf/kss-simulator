'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import dynamic from 'next/dynamic'

const ImportWizard = dynamic(() => import('../../components/ImportWizard'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded-lg"></div>
})

export default function ImportWizardPage() {
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
          데이터 임포트 마법사
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          CSV, JSON 데이터를 Neo4j 그래프 데이터베이스로 쉽게 변환하고 임포트하세요.
        </p>
        
        <ImportWizard />
      </div>
    </div>
  )
}