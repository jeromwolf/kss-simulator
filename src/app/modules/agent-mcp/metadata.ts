export interface Chapter {
  id: string;
  title: string;
  description: string;
  duration: string;
  objectives: string[];
}

export interface Simulator {
  id: string;
  name: string;
  description: string;
  component: string;
}

export const MODULE_METADATA = {
  id: 'agent-mcp',
  name: 'AI Agent & MCP',
  description: 'AI 에이전트 개발과 Model Context Protocol 마스터하기',
  icon: '🤖',
  color: 'purple', // Purple 테마 - AI 에이전트를 상징
  version: '1.0.0',
  totalDuration: '10시간',
  level: 'Intermediate',
  prerequisites: ['LLM 기초', 'API 통신 기본'],
};

export const CHAPTERS: Chapter[] = [
  {
    id: '1',
    title: 'AI Agent 시스템의 이해',
    description: 'Agent의 개념, 구조, 그리고 ReAct 패턴부터 Tool Use까지',
    duration: '90분',
    objectives: [
      'Agent와 단순 LLM의 차이점 이해',
      'ReAct (Reasoning + Acting) 패턴 학습',
      'Tool Use와 Function Calling 메커니즘',
      'Agent 메모리와 상태 관리'
    ]
  },
  {
    id: '2',
    title: 'LangChain으로 Agent 구현',
    description: 'LangChain 프레임워크를 활용한 실전 Agent 개발',
    duration: '120분',
    objectives: [
      'LangChain 아키텍처 이해',
      'Tools와 Chains 구성',
      'Memory와 Callbacks 활용',
      'Custom Agent 개발'
    ]
  },
  {
    id: '3',
    title: 'Agent 고급 패턴',
    description: 'Plan-and-Execute, Self-Reflection 등 고급 Agent 패턴',
    duration: '90분',
    objectives: [
      'Plan-and-Execute Agent',
      'Self-Reflection 패턴',
      'Error Recovery 전략',
      'Agent 성능 최적화'
    ]
  },
  {
    id: '4',
    title: 'MCP (Model Context Protocol) 기초',
    description: 'Anthropic의 MCP 프로토콜 이해와 구조',
    duration: '75분',
    objectives: [
      'MCP 아키텍처와 핵심 개념',
      'Resources, Tools, Prompts 이해',
      'MCP vs 기존 통합 방식 비교',
      'MCP 생태계와 확장성'
    ]
  },
  {
    id: '5',
    title: 'MCP Server 개발',
    description: 'TypeScript/Python으로 MCP Server 구현하기',
    duration: '120분',
    objectives: [
      'MCP Server 구조 설계',
      'Tool 정의와 구현',
      'Resource 관리',
      'Error Handling과 Validation'
    ]
  },
  {
    id: '6',
    title: 'MCP Client 통합',
    description: 'Claude Desktop과 커스텀 클라이언트에서 MCP 활용',
    duration: '90분',
    objectives: [
      'Claude Desktop MCP 설정',
      'Custom Client 구현',
      'Server-Client 통신 최적화',
      'Security와 Authentication'
    ]
  },
  {
    id: '7',
    title: 'Agent + MCP 통합 아키텍처',
    description: 'Agent와 MCP를 결합한 강력한 시스템 구축',
    duration: '105분',
    objectives: [
      'Agent에 MCP 통합하기',
      'Tool Orchestration',
      'Context Management',
      'Hybrid Architecture 설계'
    ]
  },
  {
    id: '8',
    title: '프로덕션 배포와 모니터링',
    description: '실제 서비스를 위한 Agent-MCP 시스템 운영',
    duration: '90분',
    objectives: [
      '컨테이너화와 오케스트레이션',
      '로깅과 모니터링 설정',
      '성능 튜닝과 최적화',
      'Cost 관리 전략'
    ]
  }
];

export const SIMULATORS: Simulator[] = [
  {
    id: 'agent-playground',
    name: 'Agent Playground',
    description: 'ReAct 패턴 기반 대화형 에이전트 실습',
    component: 'AgentPlayground'
  },
  {
    id: 'langchain-builder',
    name: 'LangChain Builder', 
    description: '드래그앤드롭으로 Agent Chain 구성하기',
    component: 'LangChainBuilder'
  },
  {
    id: 'mcp-server',
    name: 'MCP Server 시뮬레이터',
    description: 'MCP 서버-클라이언트 통신 시각화',
    component: 'MCPServerSimulator'
  },
  {
    id: 'tool-orchestrator',
    name: 'Tool Orchestrator',
    description: 'Agent의 도구 사용 패턴 시뮬레이션',
    component: 'ToolOrchestrator'
  }
];