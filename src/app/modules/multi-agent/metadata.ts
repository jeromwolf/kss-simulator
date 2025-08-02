export interface Chapter {
  id: string;
  number: number;
  title: string;
  description: string;
  duration: string;
  topics: string[];
}

export interface Tool {
  name: string;
  description: string;
  path: string;
}

export const multiAgentMetadata = {
  id: 'multi-agent',
  title: '멀티 에이전트 시스템',
  description: 'AI 에이전트 간 협업과 통신, 오케스트레이션을 통한 복잡한 문제 해결',
  icon: 'Users',
  color: 'orange',
  level: 'advanced',
  duration: '8시간',
  chapters: [
    {
      id: 'intro-multi-agent',
      number: 1,
      title: '멀티 에이전트 시스템 개요',
      duration: '1시간 30분',
      description: '멀티 에이전트 시스템의 기본 개념과 아키텍처',
      topics: [
        '에이전트 시스템의 진화',
        '분산 AI 아키텍처',
        '협업적 문제 해결',
        '에이전트 간 상호작용 모델'
      ]
    },
    {
      id: 'a2a-communication',
      number: 2,
      title: 'A2A (Agent to Agent) 통신',
      duration: '1시간 30분',
      description: '에이전트 간 효율적인 통신 프로토콜과 메시지 전달',
      topics: [
        'A2A 프로토콜 설계',
        '메시지 큐와 이벤트 버스',
        '동기/비동기 통신 패턴',
        '에이전트 디스커버리'
      ]
    },
    {
      id: 'crewai-framework',
      number: 3,
      title: 'CrewAI 프레임워크',
      duration: '1시간 30분',
      description: 'CrewAI를 활용한 에이전트 팀 구성과 작업 분배',
      topics: [
        'CrewAI 아키텍처',
        '역할 기반 에이전트 설계',
        '태스크 체인과 워크플로우',
        '메모리와 컨텍스트 공유'
      ]
    },
    {
      id: 'autogen-systems',
      number: 4,
      title: 'AutoGen 멀티 에이전트',
      duration: '1시간 30분',
      description: 'Microsoft AutoGen을 활용한 대화형 에이전트 시스템',
      topics: [
        'AutoGen 프레임워크',
        '대화형 에이전트 설계',
        '코드 실행과 도구 사용',
        '인간-AI 협업 워크플로우'
      ]
    },
    {
      id: 'consensus-algorithms',
      number: 5,
      title: '합의 알고리즘과 조정',
      duration: '1시간',
      description: '분산 에이전트 시스템의 의사결정과 합의 메커니즘',
      topics: [
        '분산 합의 알고리즘',
        '투표와 경매 메커니즘',
        '충돌 해결 전략',
        '리더 선출과 조정'
      ]
    },
    {
      id: 'orchestration-patterns',
      number: 6,
      title: '오케스트레이션 패턴',
      duration: '1시간',
      description: '대규모 에이전트 시스템의 관리와 모니터링',
      topics: [
        '오케스트레이터 아키텍처',
        '워크플로우 엔진',
        '모니터링과 관측성',
        '성능 최적화와 스케일링'
      ]
    }
  ],
  prerequisites: [
    'LLM 기본 이해',
    'Python 프로그래밍',
    '분산 시스템 기초'
  ],
  learningOutcomes: [
    '멀티 에이전트 시스템 설계 능력',
    'CrewAI와 AutoGen 활용 능력',
    '에이전트 간 통신 프로토콜 구현',
    '복잡한 워크플로우 오케스트레이션'
  ],
  tools: [
    {
      name: 'A2A Orchestrator',
      description: '에이전트 간 통신과 작업 분배 시뮬레이터',
      path: '/modules/multi-agent/tools/a2a-orchestrator'
    },
    {
      name: 'CrewAI Builder',
      description: '역할 기반 에이전트 팀 구성 도구',
      path: '/modules/multi-agent/tools/crewai-builder'
    },
    {
      name: 'Consensus Simulator',
      description: '분산 합의 알고리즘 시각화 도구',
      path: '/modules/multi-agent/tools/consensus-simulator'
    }
  ]
};