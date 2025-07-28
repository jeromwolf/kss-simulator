'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Loader } from 'lucide-react';

// Three.js는 클라이언트 사이드에서만 실행되어야 함
const Graph3D = dynamic(
  () => import('@/components/3d-graph/Graph3D').then(mod => ({ default: mod.Graph3D })),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-[600px] flex items-center justify-center bg-gray-900 rounded-lg">
        <Loader className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    )
  }
);

// 샘플 데이터
const sampleTriples = [
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
  { subject: ':사용자', predicate: ':hasRole', object: '연구원', type: 'literal' },
  { subject: ':사용자', predicate: ':hasName', object: '김철수', type: 'literal' },
];

export default function Graph3DPage() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [triples] = useState(sampleTriples);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">3D 지식 그래프 시각화</h1>
          <p className="text-gray-600 dark:text-gray-400">
            지식 그래프를 3차원 공간에서 탐색하고 상호작용하세요.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 3D 그래프 */}
          <div className="lg:col-span-3">
            <div className="h-[600px]">
              <Graph3D 
                triples={triples}
                selectedNode={selectedNode}
                onNodeSelect={setSelectedNode}
              />
            </div>
          </div>

          {/* 사이드 패널 */}
          <div className="space-y-4">
            {/* 선택된 노드 정보 */}
            {selectedNode && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                <h3 className="font-semibold mb-3">선택된 노드</h3>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="text-gray-500">ID:</span>
                    <span className="ml-2 font-mono">{selectedNode}</span>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold mb-2">관련 트리플</h4>
                    <div className="space-y-1 text-xs">
                      {triples
                        .filter(t => t.subject === selectedNode || t.object === selectedNode)
                        .map((t, i) => (
                          <div key={i} className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                            <span className="text-blue-600 dark:text-blue-400">{t.subject}</span>
                            <span className="mx-1 text-gray-500">→</span>
                            <span className="text-green-600 dark:text-green-400">{t.predicate}</span>
                            <span className="mx-1 text-gray-500">→</span>
                            <span className={t.type === 'literal' ? 'text-orange-600 dark:text-orange-400' : 'text-blue-600 dark:text-blue-400'}>
                              {t.object}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 통계 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
              <h3 className="font-semibold mb-3">그래프 통계</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">전체 노드:</span>
                  <span>{new Set([...triples.map(t => t.subject), ...triples.map(t => t.object)]).size}개</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">전체 엣지:</span>
                  <span>{triples.length}개</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">리소스:</span>
                  <span className="text-green-600">
                    {new Set([...triples.map(t => t.subject), ...triples.filter(t => t.type !== 'literal').map(t => t.object)]).size}개
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">리터럴:</span>
                  <span className="text-orange-600">
                    {triples.filter(t => t.type === 'literal').length}개
                  </span>
                </div>
              </div>
            </div>

            {/* 컨트롤 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
              <h3 className="font-semibold mb-3">컨트롤</h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p>🖱️ 좌클릭 + 드래그: 회전</p>
                <p>🖱️ 우클릭 + 드래그: 이동</p>
                <p>🖱️ 스크롤: 확대/축소</p>
                <p>🖱️ 노드 클릭: 선택</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}