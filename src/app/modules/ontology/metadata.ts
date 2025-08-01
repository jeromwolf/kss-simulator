import { Module } from '@/types/module'

export const ontologyModule: Module = {
  id: 'ontology',
  name: 'Ontology & Knowledge Graphs',
  nameKo: '온톨로지와 지식 그래프',
  description: '지식을 체계적으로 표현하고 추론하는 온톨로지의 이론과 실습을 통해 시맨틱 웹의 핵심 기술을 마스터합니다.',
  version: '1.0.0',
  difficulty: 'intermediate' as const,
  estimatedHours: 16,
  icon: '🔗',
  color: '#3b82f6',
  prerequisites: [],
  chapters: [
    {
      id: 'intro',
      title: '시작하기',
      description: '온톨로지 학습의 첫걸음',
      estimatedMinutes: 30,
      keywords: ['온톨로지', '지식그래프', '시작'],
      learningObjectives: ['온톨로지의 개념 이해', '학습 과정 파악']
    },
    {
      id: 'chapter01',
      title: '온톨로지란 무엇인가?',
      description: '온톨로지의 개념과 필요성을 이해합니다',
      estimatedMinutes: 45,
      keywords: ['온톨로지', '개념', '정의', '철학']
    },
    {
      id: 'chapter02',
      title: '온톨로지의 핵심 개념',
      description: '클래스, 속성, 인스턴스 등 핵심 구성요소를 학습합니다',
      estimatedMinutes: 60,
      keywords: ['클래스', '속성', '인스턴스', '관계']
    },
    {
      id: 'chapter03',
      title: '시맨틱 웹과 온톨로지',
      description: '웹의 진화와 온톨로지의 역할을 알아봅니다',
      estimatedMinutes: 45,
      keywords: ['시맨틱웹', 'Web3.0', 'LOD']
    },
    {
      id: 'chapter04',
      title: 'RDF: 지식 표현의 기초',
      description: 'Resource Description Framework의 기본 개념과 트리플 구조를 학습합니다',
      estimatedMinutes: 60,
      keywords: ['RDF', '트리플', 'URI', 'Turtle']
    },
    {
      id: 'chapter05',
      title: 'RDFS: 스키마와 계층구조',
      description: 'RDF Schema를 통한 어휘 정의와 계층 구조 표현을 익힙니다',
      estimatedMinutes: 60,
      keywords: ['RDFS', '스키마', 'subClassOf', 'domain/range']
    },
    {
      id: 'chapter06',
      title: 'OWL: 표현력 있는 온톨로지',
      description: 'Web Ontology Language의 다양한 표현력을 활용합니다',
      estimatedMinutes: 90,
      keywords: ['OWL', 'DL', '추론', '공리']
    },
    {
      id: 'chapter07',
      title: 'SPARQL: 온톨로지 질의',
      description: '온톨로지 데이터를 효과적으로 검색하는 SPARQL을 마스터합니다',
      estimatedMinutes: 75,
      keywords: ['SPARQL', '쿼리', 'SELECT', 'CONSTRUCT']
    },
    {
      id: 'chapter08',
      title: 'Protégé 마스터하기',
      description: '온톨로지 개발 도구 Protégé 사용법을 익힙니다',
      estimatedMinutes: 60,
      keywords: ['Protégé', '도구', '편집기', 'Reasoner']
    },
    {
      id: 'chapter09',
      title: '온톨로지 설계 방법론',
      description: '체계적인 온톨로지 개발 방법론을 학습합니다',
      estimatedMinutes: 60,
      keywords: ['방법론', 'METHONTOLOGY', '설계', '모델링']
    },
    {
      id: 'chapter10',
      title: '패턴과 모범 사례',
      description: '온톨로지 설계 패턴과 best practice를 익힙니다',
      estimatedMinutes: 60,
      keywords: ['패턴', 'ODPs', '모범사례', '재사용']
    },
    {
      id: 'chapter11',
      title: '금융 온톨로지: 주식 시장',
      description: '주식 시장 도메인의 온톨로지를 구축합니다',
      estimatedMinutes: 90,
      keywords: ['금융', '주식', 'FIBO', '실전']
    },
    {
      id: 'chapter12',
      title: '뉴스 온톨로지: 지식 그래프',
      description: '뉴스 데이터를 활용한 지식 그래프를 구축합니다',
      estimatedMinutes: 90,
      keywords: ['뉴스', '지식그래프', 'NLP', '관계추출']
    },
    {
      id: 'chapter13',
      title: '통합 프로젝트: 주식-뉴스 연계',
      description: '금융과 뉴스 온톨로지를 통합한 실전 프로젝트',
      estimatedMinutes: 120,
      keywords: ['통합', '프로젝트', '추론', '시각화']
    },
    {
      id: 'chapter14',
      title: 'AI와 온톨로지',
      description: 'AI 시대의 온톨로지 활용과 가능성을 탐구합니다',
      estimatedMinutes: 60,
      keywords: ['AI', 'LLM', 'Knowledge-Grounded', 'Neuro-Symbolic']
    },
    {
      id: 'chapter15',
      title: '산업별 활용사례',
      description: '다양한 산업에서의 온톨로지 활용 사례를 살펴봅니다',
      estimatedMinutes: 60,
      keywords: ['의료', '제조', 'IoT', '사례']
    },
    {
      id: 'chapter16',
      title: '미래 전망과 도전과제',
      description: '온톨로지 기술의 미래와 해결해야 할 과제들',
      estimatedMinutes: 45,
      keywords: ['미래', '트렌드', '도전과제', '전망']
    }
  ],
  simulators: [
    {
      id: 'rdf-editor',
      name: 'RDF Triple Editor',
      description: 'RDF 트리플을 시각적으로 생성하고 편집하는 도구',
      component: 'RDFTripleEditor'
    },
    {
      id: 'knowledge-graph',
      name: '3D Knowledge Graph',
      description: '지식 그래프를 3차원으로 시각화하고 탐색하는 도구',
      component: 'KnowledgeGraphContainer'
    },
    {
      id: 'sparql-playground',
      name: 'SPARQL Query Playground',
      description: 'SPARQL 쿼리를 실습하고 결과를 확인하는 환경',
      component: 'SparqlPlayground'
    },
    {
      id: 'inference-engine',
      name: '추론 엔진 시뮬레이터',
      description: '온톨로지 추론 과정을 단계별로 시각화',
      component: 'InferenceEngine'
    }
  ],
  tools: [
    {
      id: 'rdf-editor',
      name: 'RDF Editor',
      description: 'RDF 트리플 편집 도구',
      url: '/rdf-editor'
    },
    {
      id: '3d-graph',
      name: '3D Knowledge Graph',
      description: '3D 지식 그래프 시각화',
      url: '/3d-graph'
    },
    {
      id: 'sparql-playground',
      name: 'SPARQL Playground',
      description: 'SPARQL 쿼리 실습',
      url: '/sparql-playground'
    }
  ]
}