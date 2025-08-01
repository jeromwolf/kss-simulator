import { Module } from '@/types/module'

export const ragModule: Module = {
  id: 'rag',
  name: 'RAG (Retrieval-Augmented Generation)',
  nameKo: 'RAG 검색 증강 생성',
  description: '문서 기반 AI 시스템 구축의 모든 것',
  version: '1.0.0',
  difficulty: 'intermediate',
  estimatedHours: 12,
  icon: '🔍',
  color: '#10b981',
  
  prerequisites: ['llm-basics'],
  
  chapters: [
    {
      id: '01-what-is-rag',
      title: 'RAG란 무엇인가?',
      description: 'LLM의 한계와 RAG의 필요성',
      estimatedMinutes: 30,
      keywords: ['RAG', 'hallucination', 'retrieval', 'knowledge-base'],
      learningObjectives: [
        'LLM의 한계점 이해 (할루시네이션, 최신 정보 부족)',
        'RAG의 핵심 개념과 작동 원리',
        'RAG vs Fine-tuning 비교',
        '실제 RAG 시스템 사례 분석'
      ]
    },
    {
      id: '02-document-processing',
      title: '문서 처리와 청킹',
      description: '효과적인 문서 분할 전략',
      estimatedMinutes: 45,
      keywords: ['chunking', 'preprocessing', 'parsing', 'text-splitting'],
      learningObjectives: [
        '다양한 문서 형식 처리 (PDF, Word, HTML)',
        '청킹 전략 (고정 크기, 의미 단위, 중첩)',
        '메타데이터 보존과 활용',
        '전처리 최적화 기법'
      ]
    },
    {
      id: '03-embeddings',
      title: '임베딩과 벡터화',
      description: '텍스트를 벡터로 변환하는 과정',
      estimatedMinutes: 40,
      keywords: ['embeddings', 'vector', 'similarity', 'dimension'],
      learningObjectives: [
        '임베딩 모델 선택 기준',
        '벡터 차원과 성능의 관계',
        '다국어 임베딩 처리',
        '임베딩 최적화 기법'
      ]
    },
    {
      id: '04-vector-search',
      title: '벡터 검색과 데이터베이스',
      description: '효율적인 유사도 검색 구현',
      estimatedMinutes: 50,
      keywords: ['vector-db', 'similarity-search', 'indexing', 'retrieval'],
      learningObjectives: [
        '벡터 데이터베이스 비교 (Pinecone, Weaviate, Chroma)',
        '인덱싱 알고리즘 이해',
        '하이브리드 검색 (벡터 + 키워드)',
        '검색 성능 최적화'
      ]
    },
    {
      id: '05-answer-generation',
      title: '답변 생성과 프롬프트 엔지니어링',
      description: '검색 결과를 활용한 고품질 답변 생성',
      estimatedMinutes: 35,
      keywords: ['generation', 'prompt', 'context', 'relevance'],
      learningObjectives: [
        'RAG 프롬프트 템플릿 설계',
        '컨텍스트 길이 관리',
        '답변 품질 향상 기법',
        '소스 인용과 투명성'
      ]
    },
    {
      id: '06-advanced-rag',
      title: '고급 RAG 기법',
      description: '성능 향상을 위한 최신 기술',
      estimatedMinutes: 60,
      keywords: ['multi-hop', 'reranking', 'hybrid', 'evaluation'],
      learningObjectives: [
        'Multi-hop reasoning',
        'Reranking 전략',
        'RAG 시스템 평가 지표',
        '실시간 업데이트 아키텍처'
      ]
    }
  ],
  
  simulators: [
    {
      id: 'document-processor',
      name: '문서 처리 시뮬레이터',
      description: 'PDF, Word 문서를 청킹하고 전처리하는 과정 체험',
      component: 'DocumentProcessor'
    },
    {
      id: 'embedding-explorer',
      name: '임베딩 탐색기',
      description: '텍스트가 벡터로 변환되는 과정을 3D로 시각화',
      component: 'EmbeddingExplorer'
    },
    {
      id: 'vector-search-demo',
      name: '벡터 검색 데모',
      description: '유사도 검색이 어떻게 작동하는지 실시간 체험',
      component: 'VectorSearchDemo'
    },
    {
      id: 'rag-playground',
      name: 'RAG 플레이그라운드',
      description: '전체 RAG 파이프라인을 직접 구축하고 테스트',
      component: 'RAGPlayground'
    }
  ],
  
  tools: [
    {
      id: 'rag-builder',
      name: 'RAG 시스템 빌더',
      description: '드래그앤드롭으로 RAG 파이프라인 구축',
      url: '/modules/rag/tools/builder'
    }
  ]
}