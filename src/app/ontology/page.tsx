'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function OntologyRedirect() {
  const router = useRouter()
  
  useEffect(() => {
    router.push('/modules/ontology')
  }, [router])
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">새로운 온톨로지 모듈로 이동 중...</p>
      </div>
    </div>
  )
}