'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Loader } from 'lucide-react';
import { Triple } from '@/components/knowledge-graph/types';

// 새로운 지식그래프 컨테이너를 동적으로 로드
const KnowledgeGraphContainer = dynamic(
  () => import('@/components/knowledge-graph/KnowledgeGraphContainer').then(mod => ({ default: mod.KnowledgeGraphContainer })),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-gray-400 mx-auto mb-4" />
          <p className="text-gray-400">지식그래프 시뮬레이터 로딩중...</p>
        </div>
      </div>
    )
  }
);

// 샘플 데이터
const sampleTriples: Triple[] = [
  { subject: ':지식관리시스템', predicate: ':type', object: ':System' },
  { subject: ':지식관리시스템', predicate: ':hasComponent', object: ':데이터베이스' },
  { subject: ':지식관리시스템', predicate: ':hasComponent', object: ':추론엔진' },
  { subject: ':지식관리시스템', predicate: ':hasComponent', object: ':시각화도구' },
  
  { subject: ':데이터베이스', predicate: ':type', object: ':Component' },
  { subject: ':데이터베이스', predicate: ':stores', object: ':RDF트리플' },
  { subject: ':데이터베이스', predicate: ':hasFeature', object: ':SPARQL지원' },
  
  { subject: ':추론엔진', predicate: ':type', object: ':Component' },
  { subject: ':추론엔진', predicate: ':performs', object: ':추론' },
  { subject: ':추론엔진', predicate: ':uses', object: ':규칙' },
  
  { subject: ':시각화도구', predicate: ':type', object: ':Component' },
  { subject: ':시각화도구', predicate: ':creates', object: ':그래프' },
  { subject: ':시각화도구', predicate: ':supports', object: ':3D렌더링' },
  
  { subject: ':사용자', predicate: ':uses', object: ':지식관리시스템' },
  { subject: ':사용자', predicate: ':hasRole', object: '연구원', type: 'literal' as const },
  { subject: ':사용자', predicate: ':hasName', object: '김철수', type: 'literal' as const },
];

export default function Graph3DPage() {
  const [triples, setTriples] = useState(sampleTriples);

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">3D 지식그래프 시뮬레이터</h1>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              전문적인 지식그래프 편집, 시각화, 분석 도구
            </p>
          </div>
          <button 
            onClick={() => window.close()}
            className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
      
      {/* Full Height Container */}
      <div className="flex-1 relative">
        <KnowledgeGraphContainer 
          initialTriples={triples}
          onTriplesChange={setTriples}
        />
      </div>
    </div>
  );
}