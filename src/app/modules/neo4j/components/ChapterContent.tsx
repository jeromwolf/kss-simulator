'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Code, Database, GitBranch, Zap, Search, Share2, AlertCircle, BookOpen } from 'lucide-react'

// Dynamic imports for simulators
const CypherPlayground = dynamic(() => import('./CypherPlayground'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>
})

interface ChapterContentProps {
  chapterId: string
}

export default function ChapterContent({ chapterId }: ChapterContentProps) {
  const renderChapterContent = () => {
    switch (chapterId) {
      case '01-introduction':
        return <Chapter01Introduction />
      case '02-cypher-basics':
        return <Chapter02CypherBasics />
      case '03-data-modeling':
        return <Chapter03DataModeling />
      case '04-advanced-cypher':
        return <Chapter04AdvancedCypher />
      case '05-graph-algorithms':
        return <Chapter05GraphAlgorithms />
      case '06-integration':
        return <Chapter06Integration />
      case '07-performance':
        return <Chapter07Performance />
      case '08-real-world':
        return <Chapter08RealWorld />
      default:
        return <div>Content not found</div>
    }
  }

  return (
    <div className="prose prose-lg max-w-none dark:prose-invert">
      {renderChapterContent()}
    </div>
  )
}

// Chapter 1: Neo4j와 그래프 데이터베이스 개념
function Chapter01Introduction() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-4 flex items-center gap-2">
          <Database className="w-6 h-6" />
          그래프 데이터베이스란?
        </h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mb-6">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            <strong>그래프 데이터베이스</strong>는 데이터를 노드(Node), 관계(Relationship), 속성(Property)으로 
            표현하는 NoSQL 데이터베이스입니다. 연결된 데이터를 효율적으로 저장하고 탐색할 수 있습니다.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">노드 (Node)</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">엔티티나 객체를 표현 (사람, 제품, 장소)</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">관계 (Relationship)</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">노드 간의 연결과 상호작용</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">속성 (Property)</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">노드와 관계의 세부 정보</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">관계형 DB vs 그래프 DB</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">특징</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">관계형 DB</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">그래프 DB</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">데이터 모델</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">테이블, 행, 열</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">노드, 관계, 속성</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">관계 표현</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">외래 키, JOIN</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">직접적인 관계</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">성능</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">JOIN 증가 시 저하</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">관계 탐색 일정</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">스키마</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">고정 스키마</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">유연한 스키마</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Neo4j의 핵심 특징</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-6">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">ACID 트랜잭션</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• <strong>Atomicity</strong>: 전체 성공 또는 전체 실패</li>
              <li>• <strong>Consistency</strong>: 데이터 일관성 보장</li>
              <li>• <strong>Isolation</strong>: 트랜잭션 격리</li>
              <li>• <strong>Durability</strong>: 영구 저장 보장</li>
            </ul>
          </div>
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-lg p-6">
            <h4 className="font-semibold text-cyan-700 dark:text-cyan-300 mb-3">Native Graph Storage</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• Index-free adjacency</li>
              <li>• 포인터 기반 직접 연결</li>
              <li>• O(1) 관계 탐색</li>
              <li>• 메모리 최적화</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">활용 사례</h3>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold text-gray-900 dark:text-white">추천 시스템</h4>
            <p className="text-gray-600 dark:text-gray-400">
              Netflix, Amazon: 사용자-아이템 관계 분석으로 개인화 추천
            </p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold text-gray-900 dark:text-white">소셜 네트워크</h4>
            <p className="text-gray-600 dark:text-gray-400">
              Facebook, LinkedIn: 친구 관계, 팔로우 네트워크 관리
            </p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold text-gray-900 dark:text-white">금융 사기 탐지</h4>
            <p className="text-gray-600 dark:text-gray-400">
              PayPal, 은행: 거래 패턴 분석으로 이상 거래 실시간 탐지
            </p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold text-gray-900 dark:text-white">지식 그래프</h4>
            <p className="text-gray-600 dark:text-gray-400">
              Google, Microsoft: 엔티티 관계로 검색 품질 향상
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

// Chapter 2: Cypher 쿼리 언어 기초
function Chapter02CypherBasics() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-4 flex items-center gap-2">
          <Code className="w-6 h-6" />
          Cypher 쿼리 언어
        </h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mb-6">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Cypher는 Neo4j의 선언적 그래프 쿼리 언어입니다. SQL과 유사하지만 그래프 패턴을 직관적으로 표현합니다.
          </p>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">기본 패턴</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">노드 패턴</h4>
            <pre className="bg-white dark:bg-gray-900 p-3 rounded text-sm overflow-x-auto">
              <code>{`// 노드 표현
()                          // 익명 노드
(n)                         // 변수명 n
(:Person)                   // Person 레이블
(p:Person)                  // 변수 p, Person 레이블
(p:Person {name: 'Alice'})  // 속성 포함`}</code>
            </pre>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">관계 패턴</h4>
            <pre className="bg-white dark:bg-gray-900 p-3 rounded text-sm overflow-x-auto">
              <code>{`// 관계 표현
-->                         // 방향성 관계
-[]-                       // 양방향 관계
-[:KNOWS]->                // KNOWS 타입
-[r:KNOWS]->               // 변수 r
-[:KNOWS {since: 2020}]->  // 속성 포함`}</code>
            </pre>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">패턴 조합</h4>
            <pre className="bg-white dark:bg-gray-900 p-3 rounded text-sm overflow-x-auto">
              <code>{`// 전체 패턴
(alice:Person {name: 'Alice'})-[:KNOWS]->(bob:Person {name: 'Bob'})

// 체인 패턴
(alice)-[:KNOWS]->(bob)-[:WORKS_AT]->(company:Company)`}</code>
            </pre>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">CRUD 작업</h3>
        <div className="space-y-4">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">CREATE - 생성</h4>
            <pre className="bg-white dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
              <code>{`// 노드 생성
CREATE (p:Person {name: 'Alice', age: 30})

// 관계 생성
MATCH (a:Person {name: 'Alice'}), (b:Person {name: 'Bob'})
CREATE (a)-[:KNOWS {since: 2020}]->(b)

// 전체 패턴 생성
CREATE (alice:Person {name: 'Alice'})-[:KNOWS]->(bob:Person {name: 'Bob'})`}</code>
            </pre>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">MATCH - 조회</h4>
            <pre className="bg-white dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
              <code>{`// 모든 Person 노드
MATCH (p:Person)
RETURN p

// 특정 조건
MATCH (p:Person {name: 'Alice'})
RETURN p.name, p.age

// 관계 패턴
MATCH (p1:Person)-[:KNOWS]->(p2:Person)
RETURN p1.name, p2.name`}</code>
            </pre>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-2">SET - 수정</h4>
            <pre className="bg-white dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
              <code>{`// 속성 수정
MATCH (p:Person {name: 'Alice'})
SET p.age = 31

// 여러 속성
MATCH (p:Person {name: 'Alice'})
SET p.age = 31, p.city = 'Seoul'

// 레이블 추가
MATCH (p:Person {name: 'Alice'})
SET p:Developer`}</code>
            </pre>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
            <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">DELETE - 삭제</h4>
            <pre className="bg-white dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
              <code>{`// 노드 삭제
MATCH (p:Person {name: 'Alice'})
DELETE p

// 관계 삭제
MATCH (a:Person)-[r:KNOWS]->(b:Person)
DELETE r

// 노드와 관계 모두 삭제
MATCH (p:Person {name: 'Alice'})
DETACH DELETE p`}</code>
            </pre>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Cypher 실습</h3>
        <CypherPlayground />
      </section>
    </div>
  )
}

// Chapter 3: 그래프 데이터 모델링
function Chapter03DataModeling() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-4">
          그래프 데이터 모델링
        </h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            효과적인 그래프 모델링은 성능과 유지보수성의 핵심입니다.
          </p>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">모델링 원칙</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
            <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">노드로 표현</h4>
            <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
              <li>• 독립적으로 존재하는 엔티티</li>
              <li>• 여러 속성을 가진 객체</li>
              <li>• 다른 엔티티와 관계를 맺는 대상</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
            <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">관계로 표현</h4>
            <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
              <li>• 노드 간의 상호작용</li>
              <li>• 동작이나 이벤트</li>
              <li>• 시간적 연결</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">실전 모델링 예제</h3>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h4 className="font-semibold mb-3">소셜 네트워크 모델</h4>
          <pre className="bg-white dark:bg-gray-900 p-4 rounded text-sm overflow-x-auto">
            <code>{`// 사용자와 게시물
(:User {id, name, email})-[:POSTED]->(:Post {id, content, timestamp})
(:User)-[:FOLLOWS]->(:User)
(:User)-[:LIKES]->(:Post)
(:Post)-[:TAGGED]->(:Hashtag {name})

// 친구 추천 쿼리
MATCH (user:User {name: 'Alice'})-[:FOLLOWS]->(friend)-[:FOLLOWS]->(suggestion)
WHERE NOT (user)-[:FOLLOWS]->(suggestion)
AND user <> suggestion
RETURN suggestion, COUNT(*) as mutualFriends
ORDER BY mutualFriends DESC`}</code>
          </pre>
        </div>
      </section>
    </div>
  )
}

// Placeholder for remaining chapters
function Chapter04AdvancedCypher() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-4">
        Cypher 고급 기능
      </h2>
      <p className="text-gray-600 dark:text-gray-400">
        APOC, 서브쿼리, 성능 최적화 등 고급 Cypher 기능을 학습합니다.
      </p>
    </div>
  )
}

function Chapter05GraphAlgorithms() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-4">
        그래프 알고리즘과 분석
      </h2>
      <p className="text-gray-600 dark:text-gray-400">
        PageRank, Community Detection, 최단 경로 등 그래프 알고리즘을 실습합니다.
      </p>
    </div>
  )
}

function Chapter06Integration() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-4">
        KSS 도메인 통합
      </h2>
      <p className="text-gray-600 dark:text-gray-400">
        온톨로지, LLM, RAG 데이터를 Neo4j로 통합하는 방법을 학습합니다.
      </p>
    </div>
  )
}

function Chapter07Performance() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-4">
        성능 최적화와 운영
      </h2>
      <p className="text-gray-600 dark:text-gray-400">
        인덱스 전략, 쿼리 튜닝, 클러스터 구성 등을 다룹니다.
      </p>
    </div>
  )
}

function Chapter08RealWorld() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-4">
        실전 프로젝트
      </h2>
      <p className="text-gray-600 dark:text-gray-400">
        추천 시스템, 사기 탐지, 지식 그래프 구축 프로젝트를 진행합니다.
      </p>
    </div>
  )
}