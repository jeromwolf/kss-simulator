'use client';

import React from 'react';
import AgentPlayground from './AgentPlayground';
import MCPServerSimulator from './MCPServerSimulator';
import A2AOrchestrator from './A2AOrchestrator';

interface ChapterContentProps {
  chapterId: string;
}

export default function ChapterContent({ chapterId }: ChapterContentProps) {
  const renderContent = () => {
    switch(chapterId) {
      case '1':
        return <Chapter1Content />;
      case '2':
        return <Chapter2Content />;
      case '3':
        return <Chapter3Content />;
      case '4':
        return <Chapter4Content />;
      case '5':
        return <Chapter5Content />;
      case '6':
        return <Chapter6Content />;
      default:
        return <div>챕터 콘텐츠를 찾을 수 없습니다.</div>;
    }
  };

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {renderContent()}
    </div>
  );
}

// Chapter 1: AI Agent 시스템의 이해
function Chapter1Content() {
  return (
    <div className="space-y-8">
      <section className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Agent vs LLM: 근본적인 차이
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            단순한 LLM은 질문에 대답하는 수동적인 시스템입니다. 하지만 <strong>Agent</strong>는 
            목표를 달성하기 위해 능동적으로 행동하고, 도구를 사용하며, 자율적으로 의사결정을 내립니다.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 my-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">일반 LLM</h3>
              <ul className="space-y-2 text-sm">
                <li>• 단순 질의응답</li>
                <li>• 정적인 컨텍스트</li>
                <li>• 단일 턴 상호작용</li>
                <li>• 외부 도구 사용 불가</li>
              </ul>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4">
              <h3 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">AI Agent</h3>
              <ul className="space-y-2 text-sm">
                <li>• 목표 지향적 행동</li>
                <li>• 동적 컨텍스트 관리</li>
                <li>• 멀티 턴 작업 수행</li>
                <li>• 도구 사용 및 API 호출</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          ReAct 패턴: Reasoning + Acting
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            ReAct는 Agent가 작업을 수행하는 핵심 패턴입니다. 각 단계에서 Agent는:
          </p>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li><strong>Thought (생각)</strong>: 현재 상황을 분석하고 다음 행동을 계획</li>
            <li><strong>Action (행동)</strong>: 도구를 사용하거나 작업을 수행</li>
            <li><strong>Observation (관찰)</strong>: 행동의 결과를 확인</li>
            <li><strong>Repeat</strong>: 목표 달성까지 반복</li>
          </ol>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 mt-4">
            <h4 className="font-semibold mb-2">ReAct 예시</h4>
            <pre className="text-sm bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
{`Thought: 사용자가 서울의 날씨를 물어봤다. 날씨 API를 호출해야 한다.
Action: weather_api.get("Seoul")
Observation: {"temp": 15, "condition": "맑음", "humidity": 60}
Thought: 날씨 정보를 받았다. 사용자에게 친근하게 전달하자.
Action: respond("서울은 현재 15도로 선선하고 맑은 날씨입니다!")`}
            </pre>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          🎮 Agent Playground 시뮬레이터
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          ReAct 패턴을 직접 체험해보세요. Agent가 어떻게 생각하고 행동하는지 실시간으로 확인할 수 있습니다.
        </p>
        <AgentPlayground />
      </section>

      <section className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Tool Use와 Function Calling
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            Agent의 핵심 능력은 도구를 사용하는 것입니다. Function Calling을 통해 Agent는:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>외부 API 호출 (날씨, 검색, 데이터베이스)</li>
            <li>파일 시스템 조작 (읽기, 쓰기, 생성)</li>
            <li>코드 실행 (Python, JavaScript)</li>
            <li>웹 브라우징 및 스크래핑</li>
          </ul>
          
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mt-4">
            <h4 className="font-semibold mb-2">Tool Definition 예시</h4>
            <pre className="text-sm bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
{`{
  "name": "search_web",
  "description": "웹에서 정보를 검색합니다",
  "parameters": {
    "query": {
      "type": "string",
      "description": "검색 쿼리"
    },
    "max_results": {
      "type": "integer",
      "default": 5
    }
  }
}`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}

// Chapter 2: MCP (Model Context Protocol) 심화
function Chapter2Content() {
  return (
    <div className="space-y-8">
      <section className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          MCP란 무엇인가?
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            <strong>Model Context Protocol (MCP)</strong>는 Anthropic이 개발한 오픈 프로토콜로,
            AI 모델과 외부 도구/데이터 소스를 표준화된 방식으로 연결합니다.
          </p>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <h3 className="font-semibold mb-2">MCP의 핵심 컴포넌트</h3>
            <ul className="space-y-2">
              <li>📦 <strong>Resources</strong>: 파일, 데이터베이스, API 등 데이터 소스</li>
              <li>🔧 <strong>Tools</strong>: Agent가 사용할 수 있는 함수와 명령</li>
              <li>💬 <strong>Prompts</strong>: 재사용 가능한 프롬프트 템플릿</li>
              <li>🔄 <strong>Sampling</strong>: LLM과의 상호작용 관리</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          MCP Server 구현
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            MCP Server는 도구와 리소스를 제공하는 백엔드입니다. TypeScript로 간단한 MCP 서버를 구현해봅시다:
          </p>
          
          <pre className="text-sm bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
{`import { Server } from '@modelcontextprotocol/sdk/server';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio';

const server = new Server({
  name: 'my-mcp-server',
  version: '1.0.0',
});

// Tool 등록
server.setRequestHandler('tools/list', async () => ({
  tools: [{
    name: 'calculate',
    description: '수학 계산을 수행합니다',
    inputSchema: {
      type: 'object',
      properties: {
        expression: { type: 'string' }
      }
    }
  }]
}));

// Tool 실행
server.setRequestHandler('tools/call', async (request) => {
  if (request.params.name === 'calculate') {
    const result = eval(request.params.arguments.expression);
    return { content: [{ type: 'text', text: result.toString() }] };
  }
});

// 서버 시작
const transport = new StdioServerTransport();
await server.connect(transport);`}
          </pre>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          🎮 MCP Server 시뮬레이터
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          MCP 서버와 클라이언트 간의 통신을 실시간으로 시각화합니다.
        </p>
        <MCPServerSimulator />
      </section>

      <section className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          MCP 통신 프로토콜
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            MCP는 JSON-RPC 2.0 기반의 양방향 통신을 사용합니다:
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Request</h4>
              <pre className="text-xs bg-gray-900 text-gray-100 p-2 rounded overflow-x-auto">
{`{
  "jsonrpc": "2.0",
  "method": "tools/call",
  "params": {
    "name": "search",
    "arguments": {
      "query": "MCP protocol"
    }
  },
  "id": 1
}`}
              </pre>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Response</h4>
              <pre className="text-xs bg-gray-900 text-gray-100 p-2 rounded overflow-x-auto">
{`{
  "jsonrpc": "2.0",
  "result": {
    "content": [{
      "type": "text",
      "text": "검색 결과..."
    }]
  },
  "id": 1
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Chapter 3: A2A (Agent-to-Agent) 통신
function Chapter3Content() {
  return (
    <div className="space-y-8">
      <section className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Multi-Agent 시스템 아키텍처
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            복잡한 문제를 해결하기 위해 여러 Agent가 협력하는 시스템입니다. 
            각 Agent는 특정 역할과 전문성을 가지고 있으며, 서로 통신하며 작업을 수행합니다.
          </p>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <h3 className="font-semibold mb-3">Multi-Agent 패턴</h3>
            <div className="space-y-3">
              <div>
                <strong>1. Pipeline Pattern</strong>
                <p className="text-sm mt-1">Agent들이 순차적으로 작업을 처리 (A → B → C)</p>
              </div>
              <div>
                <strong>2. Committee Pattern</strong>
                <p className="text-sm mt-1">여러 Agent가 투표를 통해 의사결정</p>
              </div>
              <div>
                <strong>3. Hierarchical Pattern</strong>
                <p className="text-sm mt-1">Manager Agent가 Worker Agent들을 조율</p>
              </div>
              <div>
                <strong>4. Collaborative Pattern</strong>
                <p className="text-sm mt-1">Agent들이 평등하게 협업하며 문제 해결</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Agent 간 통신 프로토콜
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            Agent들이 효과적으로 협업하기 위한 표준화된 메시지 형식:
          </p>
          
          <pre className="text-sm bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
{`interface AgentMessage {
  from: string;        // 발신 Agent ID
  to: string | string[]; // 수신 Agent ID(s)
  type: 'request' | 'response' | 'broadcast';
  content: {
    task: string;      // 작업 설명
    data: any;         // 전달 데이터
    priority: number;  // 우선순위
    deadline?: Date;   // 마감시간
  };
  metadata: {
    timestamp: Date;
    messageId: string;
    correlationId?: string; // 관련 메시지 추적
  };
}`}
          </pre>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          🎮 A2A Orchestrator 시뮬레이터
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          여러 Agent가 협력하여 복잡한 작업을 수행하는 과정을 시각화합니다.
        </p>
        <A2AOrchestrator />
      </section>

      <section className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Consensus 메커니즘
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            여러 Agent가 합의에 도달하는 방법:
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Voting Systems</h4>
              <ul className="text-sm space-y-1">
                <li>• Simple Majority (과반수)</li>
                <li>• Weighted Voting (가중 투표)</li>
                <li>• Consensus Threshold (합의 임계값)</li>
                <li>• Veto Power (거부권)</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Conflict Resolution</h4>
              <ul className="text-sm space-y-1">
                <li>• Priority-based (우선순위 기반)</li>
                <li>• Expertise-based (전문성 기반)</li>
                <li>• Random Selection (무작위 선택)</li>
                <li>• Human Arbitration (인간 중재)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Chapter 4: Agent 개발 실전
function Chapter4Content() {
  return (
    <div className="space-y-8">
      <section className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          LangChain Agent 구현
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            LangChain은 가장 인기 있는 Agent 개발 프레임워크입니다. 
            다양한 도구와 LLM을 쉽게 통합할 수 있습니다.
          </p>
          
          <pre className="text-sm bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
{`from langchain.agents import AgentExecutor, create_react_agent
from langchain.tools import Tool
from langchain_openai import ChatOpenAI

# LLM 초기화
llm = ChatOpenAI(model="gpt-4", temperature=0)

# 도구 정의
tools = [
    Tool(
        name="Calculator",
        func=lambda x: eval(x),
        description="수학 계산을 수행합니다"
    ),
    Tool(
        name="Search",
        func=search_web,
        description="웹에서 정보를 검색합니다"
    )
]

# Agent 생성
agent = create_react_agent(llm, tools, prompt)
agent_executor = AgentExecutor(
    agent=agent,
    tools=tools,
    verbose=True,
    max_iterations=5
)

# 실행
result = agent_executor.invoke({
    "input": "서울 인구의 제곱근은?"
})`}
          </pre>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          AutoGPT 아키텍처 분석
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            AutoGPT는 완전 자율적인 Agent 시스템의 선구자입니다. 주요 컴포넌트:
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Core Components</h4>
              <ul className="text-sm space-y-1">
                <li>🧠 <strong>Planning</strong>: 작업 계획 수립</li>
                <li>💾 <strong>Memory</strong>: 장/단기 기억 관리</li>
                <li>🔧 <strong>Tools</strong>: 도구 실행 엔진</li>
                <li>🔄 <strong>Reflection</strong>: 자기 평가 및 개선</li>
              </ul>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Execution Flow</h4>
              <ol className="text-sm space-y-1">
                <li>1. Goal Setting (목표 설정)</li>
                <li>2. Task Decomposition (작업 분해)</li>
                <li>3. Action Execution (행동 실행)</li>
                <li>4. Result Evaluation (결과 평가)</li>
                <li>5. Plan Adjustment (계획 조정)</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          CrewAI로 팀 에이전트 구성
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            CrewAI는 여러 Agent가 팀으로 협업하는 시스템을 쉽게 구축할 수 있게 해줍니다:
          </p>
          
          <pre className="text-sm bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
{`from crewai import Agent, Task, Crew

# Agent 정의
researcher = Agent(
    role='연구원',
    goal='정확한 정보 수집',
    backstory='데이터 분석 전문가',
    tools=[search_tool, scrape_tool]
)

writer = Agent(
    role='작가',
    goal='명확한 콘텐츠 작성',
    backstory='기술 문서 전문가',
    tools=[write_tool]
)

# Task 정의
research_task = Task(
    description='AI Agent에 대해 조사',
    agent=researcher
)

write_task = Task(
    description='조사 내용을 블로그 포스트로 작성',
    agent=writer
)

# Crew 구성
crew = Crew(
    agents=[researcher, writer],
    tasks=[research_task, write_task],
    verbose=True
)

# 실행
result = crew.kickoff()`}
          </pre>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Custom Agent Framework 설계
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            특정 요구사항에 맞는 커스텀 Agent 프레임워크 설계 원칙:
          </p>
          
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 className="font-semibold mb-2">설계 고려사항</h4>
            <ul className="space-y-2">
              <li>✓ <strong>Modularity</strong>: 컴포넌트 교체 가능성</li>
              <li>✓ <strong>Scalability</strong>: 다중 Agent 지원</li>
              <li>✓ <strong>Observability</strong>: 디버깅과 모니터링</li>
              <li>✓ <strong>Safety</strong>: 안전장치와 제한사항</li>
              <li>✓ <strong>Performance</strong>: 효율적인 리소스 관리</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

// Chapter 5: Agent 오케스트레이션
function Chapter5Content() {
  return (
    <div className="space-y-8">
      <section className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Sequential vs Parallel 실행
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            Agent 작업을 효율적으로 조율하는 두 가지 주요 패턴:
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Sequential Execution</h4>
              <pre className="text-xs bg-gray-900 text-gray-100 p-2 rounded">
{`Agent A → Agent B → Agent C
✅ 간단한 의존성 관리
✅ 예측 가능한 흐름
❌ 느린 전체 실행 시간`}
              </pre>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Parallel Execution</h4>
              <pre className="text-xs bg-gray-900 text-gray-100 p-2 rounded">
{`Agent A ┐
Agent B ├→ Merge
Agent C ┘
✅ 빠른 실행
❌ 복잡한 동기화`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Agent Pipeline 설계
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            복잡한 워크플로우를 위한 파이프라인 설계:
          </p>
          
          <pre className="text-sm bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
{`class AgentPipeline:
    def __init__(self):
        self.stages = []
        self.context = {}
    
    def add_stage(self, agent, condition=None):
        """파이프라인에 Agent 스테이지 추가"""
        self.stages.append({
            'agent': agent,
            'condition': condition
        })
    
    async def execute(self, input_data):
        """파이프라인 실행"""
        result = input_data
        
        for stage in self.stages:
            # 조건 확인
            if stage['condition'] and not stage['condition'](result):
                continue
            
            # Agent 실행
            try:
                result = await stage['agent'].run(result, self.context)
            except Exception as e:
                result = await self.handle_error(e, stage, result)
        
        return result
    
    async def handle_error(self, error, stage, data):
        """에러 처리 및 복구"""
        # Retry logic
        # Fallback agent
        # Error logging
        pass`}
          </pre>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Error Handling과 Retry 전략
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            Agent 시스템의 안정성을 위한 에러 처리 패턴:
          </p>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Retry 전략</h4>
            <ul className="space-y-2 text-sm">
              <li>📈 <strong>Exponential Backoff</strong>: 2^n 초 간격으로 재시도</li>
              <li>🔄 <strong>Circuit Breaker</strong>: 연속 실패 시 차단</li>
              <li>🎯 <strong>Selective Retry</strong>: 특정 에러만 재시도</li>
              <li>🔀 <strong>Fallback Agent</strong>: 대체 Agent로 전환</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Monitoring과 Observability
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            Agent 시스템의 상태를 추적하고 디버깅하기 위한 도구:
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <h5 className="font-semibold text-sm mb-1">Metrics</h5>
              <ul className="text-xs space-y-1">
                <li>• Response Time</li>
                <li>• Success Rate</li>
                <li>• Token Usage</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <h5 className="font-semibold text-sm mb-1">Logging</h5>
              <ul className="text-xs space-y-1">
                <li>• Agent Decisions</li>
                <li>• Tool Calls</li>
                <li>• Error Traces</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <h5 className="font-semibold text-sm mb-1">Tracing</h5>
              <ul className="text-xs space-y-1">
                <li>• Request Flow</li>
                <li>• Agent Chain</li>
                <li>• Latency Analysis</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Chapter 6: 프로덕션 Agent 시스템
function Chapter6Content() {
  return (
    <div className="space-y-8">
      <section className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Agent 배포 아키텍처
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            프로덕션 환경에서 Agent를 안정적으로 운영하기 위한 아키텍처:
          </p>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <h4 className="font-semibold mb-3">배포 컴포넌트</h4>
            <div className="space-y-2">
              <div>🔄 <strong>Load Balancer</strong>: 트래픽 분산</div>
              <div>🐳 <strong>Container Orchestration</strong>: Kubernetes/Docker</div>
              <div>💾 <strong>State Management</strong>: Redis/PostgreSQL</div>
              <div>📊 <strong>Message Queue</strong>: RabbitMQ/Kafka</div>
              <div>📈 <strong>Monitoring</strong>: Prometheus/Grafana</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Scale과 Load Balancing
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            대규모 트래픽을 처리하기 위한 확장 전략:
          </p>
          
          <pre className="text-sm bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
{`# Kubernetes Deployment 예시
apiVersion: apps/v1
kind: Deployment
metadata:
  name: agent-service
spec:
  replicas: 5
  selector:
    matchLabels:
      app: agent
  template:
    metadata:
      labels:
        app: agent
    spec:
      containers:
      - name: agent
        image: myregistry/agent:v1.0
        resources:
          requests:
            memory: "1Gi"
            cpu: "500m"
          limits:
            memory: "2Gi"
            cpu: "1000m"
        env:
        - name: MAX_WORKERS
          value: "10"
        - name: CACHE_ENABLED
          value: "true"`}
          </pre>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Security와 Rate Limiting
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            Agent 시스템 보안을 위한 필수 조치:
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Security Measures</h4>
              <ul className="text-sm space-y-1">
                <li>🔐 API Key Authentication</li>
                <li>🛡️ Input Validation & Sanitization</li>
                <li>🔒 TLS/SSL Encryption</li>
                <li>📝 Audit Logging</li>
                <li>🚫 Prompt Injection Prevention</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Rate Limiting</h4>
              <ul className="text-sm space-y-1">
                <li>⏱️ Requests per minute</li>
                <li>💰 Token-based limits</li>
                <li>👤 User-based quotas</li>
                <li>🔄 Adaptive throttling</li>
                <li>💳 Tier-based access</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Cost 최적화 전략
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            LLM API 비용을 효과적으로 관리하는 방법:
          </p>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <h4 className="font-semibold mb-3">비용 절감 기법</h4>
            <div className="space-y-2">
              <div>
                <strong>1. Caching</strong>
                <p className="text-sm">자주 사용되는 응답을 캐싱하여 API 호출 감소</p>
              </div>
              <div>
                <strong>2. Model Selection</strong>
                <p className="text-sm">작업에 적합한 최소 모델 사용 (GPT-3.5 vs GPT-4)</p>
              </div>
              <div>
                <strong>3. Prompt Optimization</strong>
                <p className="text-sm">프롬프트 길이 최적화로 토큰 사용량 감소</p>
              </div>
              <div>
                <strong>4. Batch Processing</strong>
                <p className="text-sm">여러 요청을 묶어서 처리</p>
              </div>
              <div>
                <strong>5. Fallback Strategy</strong>
                <p className="text-sm">비용이 낮은 대체 솔루션 준비</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          실전 체크리스트
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            프로덕션 배포 전 확인 사항:
          </p>
          
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <ul className="space-y-2">
              <li>☑️ 에러 처리 및 복구 메커니즘 구현</li>
              <li>☑️ 모니터링 및 알림 시스템 설정</li>
              <li>☑️ 보안 취약점 스캔 및 패치</li>
              <li>☑️ 부하 테스트 및 성능 최적화</li>
              <li>☑️ 백업 및 재해 복구 계획</li>
              <li>☑️ API 키 및 시크릿 관리</li>
              <li>☑️ 로깅 및 감사 추적 설정</li>
              <li>☑️ 비용 모니터링 및 알림</li>
              <li>☑️ 사용자 피드백 수집 체계</li>
              <li>☑️ 롤백 계획 및 절차</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}