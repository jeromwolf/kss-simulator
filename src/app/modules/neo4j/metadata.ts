import { Module, Chapter } from '@/types/module'

export const neo4jModule: Module = {
  id: 'neo4j',
  name: 'Neo4j Knowledge Graph',
  nameKo: 'Neo4j 지식 그래프',
  description: '그래프 데이터베이스로 모든 지식을 연결하는 통합 지식 허브',
  version: '1.0.0',
  difficulty: 'intermediate',
  estimatedHours: 25,
  icon: '🔗',
  color: '#018bff',
  
  prerequisites: ['basic-database', 'sql-fundamentals'],
  
  chapters: [
    {
      id: '01-introduction',
      title: 'Neo4j와 그래프 데이터베이스 개념',
      description: '그래프 데이터베이스의 핵심 개념과 Neo4j 특징',
      estimatedMinutes: 60,
      keywords: ['graph-database', 'node', 'relationship', 'property', 'label'],
      learningObjectives: [
        '그래프 데이터베이스 vs 관계형 데이터베이스',
        '노드, 관계, 속성의 개념 이해',
        'Neo4j의 독특한 장점과 사용 사례',
        'ACID 트랜잭션과 일관성 보장',
        '그래프 이론 기초 지식'
      ]
    },
    {
      id: '02-cypher-basics',
      title: 'Cypher 쿼리 언어 기초',
      description: '그래프 패턴 매칭을 위한 Cypher 언어 마스터',
      estimatedMinutes: 90,
      keywords: ['cypher', 'match', 'create', 'where', 'return', 'pattern'],
      learningObjectives: [
        'Cypher 문법과 기본 구조',
        'MATCH, CREATE, MERGE 패턴',
        'WHERE 절과 필터링',
        'WITH를 이용한 쿼리 체이닝',
        '집계 함수와 그룹화',
        'ORDER BY와 LIMIT'
      ]
    },
    {
      id: '03-data-modeling',
      title: '그래프 데이터 모델링',
      description: '효과적인 그래프 스키마 설계와 모델링 패턴',
      estimatedMinutes: 75,
      keywords: ['modeling', 'schema', 'design-patterns', 'normalization', 'denormalization'],
      learningObjectives: [
        '그래프 모델링 원칙과 베스트 프랙티스',
        '노드 vs 관계 선택 기준',
        '레이블과 속성 설계',
        '시간 기반 데이터 모델링',
        '계층 구조와 네트워크 모델링',
        '다대다 관계 최적화'
      ]
    },
    {
      id: '04-advanced-cypher',
      title: 'Cypher 고급 기능',
      description: '복잡한 쿼리와 성능 최적화 기법',
      estimatedMinutes: 80,
      keywords: ['apoc', 'profile', 'explain', 'index', 'constraint', 'optimization'],
      learningObjectives: [
        'APOC 프로시저 활용',
        'UNWIND와 리스트 처리',
        'CALL과 서브쿼리',
        '동적 Cypher 생성',
        'PROFILE/EXPLAIN으로 쿼리 분석',
        '트랜잭션 제어와 배치 처리'
      ]
    },
    {
      id: '05-graph-algorithms',
      title: '그래프 알고리즘과 분석',
      description: 'Neo4j Graph Data Science로 고급 분석 수행',
      estimatedMinutes: 100,
      keywords: ['pagerank', 'community-detection', 'shortest-path', 'centrality', 'similarity'],
      learningObjectives: [
        'PageRank와 중요도 분석',
        'Community Detection (Louvain, Label Propagation)',
        '최단 경로 알고리즘 (Dijkstra, A*)',
        '중심성 측정 (Betweenness, Closeness)',
        '유사도 알고리즘 (Jaccard, Cosine)',
        '그래프 임베딩과 ML 통합'
      ]
    },
    {
      id: '06-integration',
      title: 'KSS 도메인 통합',
      description: 'Ontology, LLM, Stock 데이터를 Neo4j로 통합',
      estimatedMinutes: 85,
      keywords: ['integration', 'ontology', 'llm', 'rag', 'knowledge-graph'],
      learningObjectives: [
        'RDF/OWL을 Neo4j로 임포트',
        'LLM 임베딩을 그래프에 저장',
        'RAG를 위한 벡터 인덱스 통합',
        '주식 데이터 관계 모델링',
        '실시간 스트림 처리 (Kafka 연동)',
        'GraphQL API 구축'
      ]
    },
    {
      id: '07-performance',
      title: '성능 최적화와 운영',
      description: '대규모 그래프 처리와 프로덕션 운영',
      estimatedMinutes: 70,
      keywords: ['index', 'sharding', 'cluster', 'backup', 'monitoring'],
      learningObjectives: [
        '인덱스 전략과 제약조건',
        '쿼리 성능 튜닝',
        '메모리 관리와 캐싱',
        'Neo4j 클러스터 구성',
        '백업과 복구 전략',
        '모니터링과 로깅'
      ]
    },
    {
      id: '08-real-world',
      title: '실전 프로젝트',
      description: '지식 그래프 구축 실습 프로젝트',
      estimatedMinutes: 120,
      keywords: ['project', 'knowledge-graph', 'recommendation', 'fraud-detection', 'network-analysis'],
      learningObjectives: [
        '추천 시스템 구축',
        '사기 탐지 네트워크 분석',
        '소셜 네트워크 분석',
        '지식 그래프 Q&A 시스템',
        '실시간 이상 탐지',
        'AI 파이프라인 통합'
      ]
    }
  ],
  
  simulators: [
    {
      id: 'cypher-playground',
      name: 'Cypher 쿼리 플레이그라운드',
      description: '실시간으로 Cypher 쿼리를 실행하고 결과를 시각화',
      component: 'CypherPlayground'
    },
    {
      id: 'graph-visualizer',
      name: '3D 그래프 시각화',
      description: '대화형 3D 그래프로 데이터 탐색',
      component: 'GraphVisualizer'
    },
    {
      id: 'node-editor',
      name: '노드/관계 에디터',
      description: '드래그앤드롭으로 그래프 구조 설계',
      component: 'NodeEditor'
    },
    {
      id: 'algorithm-lab',
      name: '알고리즘 실험실',
      description: '그래프 알고리즘을 실시간으로 실행하고 분석',
      component: 'AlgorithmLab'
    },
    {
      id: 'import-wizard',
      name: '데이터 임포트 마법사',
      description: 'CSV, JSON, RDF 데이터를 Neo4j로 변환',
      component: 'ImportWizard'
    }
  ],
  
  tools: [
    {
      id: 'cypher-playground',
      name: 'Cypher 플레이그라운드',
      description: 'Cypher 쿼리 실습 환경',
      url: '/modules/neo4j/simulators/cypher-playground'
    },
    {
      id: 'graph-visualizer',
      name: '그래프 시각화',
      description: '3D 그래프 탐색 도구',
      url: '/modules/neo4j/simulators/graph-visualizer'
    },
    {
      id: 'algorithm-lab',
      name: '알고리즘 실험실',
      description: '그래프 알고리즘 분석',
      url: '/modules/neo4j/simulators/algorithm-lab'
    }
  ]
}

export const getChapter = (chapterId: string): Chapter | undefined => {
  return neo4jModule.chapters.find(chapter => chapter.id === chapterId)
}

export const getNextChapter = (currentChapterId: string): Chapter | undefined => {
  const currentIndex = neo4jModule.chapters.findIndex(ch => ch.id === currentChapterId)
  return currentIndex < neo4jModule.chapters.length - 1 ? neo4jModule.chapters[currentIndex + 1] : undefined
}

export const getPrevChapter = (currentChapterId: string): Chapter | undefined => {
  const currentIndex = neo4jModule.chapters.findIndex(ch => ch.id === currentChapterId)
  return currentIndex > 0 ? neo4jModule.chapters[currentIndex - 1] : undefined
}