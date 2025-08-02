'use client';

import React from 'react';
import { Users, Network, MessageSquare, Zap, Brain, Target, Settings, GitBranch, Layers, Activity } from 'lucide-react';

interface ChapterContentProps {
  chapterId: string;
}

export default function ChapterContent({ chapterId }: ChapterContentProps) {
  const renderContent = () => {
    switch(chapterId) {
      case 'intro-multi-agent':
        return (
          <div className="space-y-8">
            {/* 멀티 에이전트 시스템 개요 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                멀티 에이전트 시스템의 핵심 개념
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  멀티 에이전트 시스템(MAS)은 <strong>여러 개의 자율적인 에이전트가 협력하여 복잡한 문제를 해결</strong>하는 
                  분산 인공지능 시스템입니다. 각 에이전트는 독립적인 의사결정 능력을 가지며, 
                  다른 에이전트와 통신하고 협력하여 단일 에이전트로는 불가능한 작업을 수행합니다.
                </p>
              </div>
            </section>

            <section className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                왜 멀티 에이전트인가?
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">단일 에이전트의 한계</h4>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li>• 복잡한 문제의 단일 처리 부담</li>
                    <li>• 제한된 전문성과 관점</li>
                    <li>• 병목 현상과 확장성 문제</li>
                    <li>• 단일 실패 지점(SPOF)</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">멀티 에이전트의 강점</h4>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li>• 작업 분할과 병렬 처리</li>
                    <li>• 전문화된 역할 분담</li>
                    <li>• 높은 확장성과 유연성</li>
                    <li>• 내결함성과 견고성</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                멀티 에이전트 아키텍처 패턴
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <Network className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Centralized</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    중앙 조정자가 모든 에이전트를 관리하는 구조
                  </p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <GitBranch className="w-8 h-8 text-green-600 dark:text-green-400 mb-2" />
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Decentralized</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    에이전트가 자율적으로 협력하는 P2P 구조
                  </p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                  <Layers className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-2" />
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Hierarchical</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    계층적 조직 구조로 운영되는 시스템
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                💡 실전 예시: 스마트 물류 시스템
              </h3>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center flex-shrink-0">1</span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Inventory Agent</p>
                      <p className="text-gray-600 dark:text-gray-400">재고 수준 모니터링 및 보충 요청</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center flex-shrink-0">2</span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Route Agent</p>
                      <p className="text-gray-600 dark:text-gray-400">최적 배송 경로 계산 및 조정</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center flex-shrink-0">3</span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Vehicle Agent</p>
                      <p className="text-gray-600 dark:text-gray-400">차량 상태 관리 및 배송 실행</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center flex-shrink-0">4</span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Customer Agent</p>
                      <p className="text-gray-600 dark:text-gray-400">고객 요구사항 처리 및 상태 업데이트</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );

      case 'a2a-communication':
        return (
          <div className="space-y-8">
            {/* A2A 통신 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Agent-to-Agent Communication Protocol
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  A2A 통신은 에이전트 간 <strong>정보 교환, 작업 조정, 협력적 문제 해결</strong>을 가능하게 하는 
                  핵심 메커니즘입니다. 효율적인 통신 프로토콜은 시스템의 성능과 확장성을 결정합니다.
                </p>
              </div>
            </section>

            <section className="bg-cyan-50 dark:bg-cyan-900/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                통신 패턴과 프로토콜
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-3">동기식 통신</h4>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                      <p className="font-medium">Request-Response</p>
                      <p className="text-gray-600 dark:text-gray-400">직접적인 질의응답 패턴</p>
                    </div>
                    <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                      <p className="font-medium">RPC (Remote Procedure Call)</p>
                      <p className="text-gray-600 dark:text-gray-400">원격 함수 호출 방식</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-3">비동기식 통신</h4>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                      <p className="font-medium">Publish-Subscribe</p>
                      <p className="text-gray-600 dark:text-gray-400">이벤트 기반 메시징</p>
                    </div>
                    <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                      <p className="font-medium">Message Queue</p>
                      <p className="text-gray-600 dark:text-gray-400">큐를 통한 비동기 처리</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                메시지 포맷과 프로토콜
              </h3>
              <div className="bg-gray-900 rounded-xl p-6 text-white">
                <pre className="overflow-x-auto">
                  <code className="text-sm">{`// FIPA ACL (Agent Communication Language) 예시
{
  "performative": "REQUEST",
  "sender": "agent-1@system",
  "receiver": "agent-2@system",
  "content": {
    "action": "analyze_data",
    "params": {
      "dataset": "sales_2024",
      "metrics": ["revenue", "growth"]
    }
  },
  "language": "JSON",
  "protocol": "fipa-request",
  "conversation-id": "conv-123",
  "reply-with": "req-456",
  "timestamp": "2024-01-15T10:30:00Z"
}`}</code>
                </pre>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                통신 신뢰성과 보안
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">메시지 보장</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• At-most-once</li>
                    <li>• At-least-once</li>
                    <li>• Exactly-once</li>
                  </ul>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">인증/인가</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Agent 신원 확인</li>
                    <li>• 권한 검증</li>
                    <li>• 암호화 통신</li>
                  </ul>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">장애 처리</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Timeout 관리</li>
                    <li>• Retry 전략</li>
                    <li>• Fallback 메커니즘</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        );

      case 'crewai-framework':
        return (
          <div className="space-y-8">
            {/* CrewAI 프레임워크 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                CrewAI: 역할 기반 에이전트 오케스트레이션
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  CrewAI는 <strong>인간 조직의 협업 방식을 모방</strong>하여 AI 에이전트들이 
                  팀으로 작업할 수 있게 하는 프레임워크입니다. 각 에이전트는 명확한 역할, 목표, 배경을 가지고 
                  협력하여 복잡한 작업을 수행합니다.
                </p>
              </div>
            </section>

            <section className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                CrewAI 핵심 컴포넌트
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <h4 className="font-semibold text-gray-900 dark:text-white">Agent</h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      특정 역할과 전문성을 가진 AI 워커
                    </p>
                    <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-700 rounded text-xs">
                      <code>role, goal, backstory, tools, llm</code>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <h4 className="font-semibold text-gray-900 dark:text-white">Task</h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      에이전트가 수행할 구체적인 작업
                    </p>
                    <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-700 rounded text-xs">
                      <code>description, expected_output, agent</code>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Network className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <h4 className="font-semibold text-gray-900 dark:text-white">Crew</h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      에이전트 팀과 작업 워크플로우
                    </p>
                    <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-700 rounded text-xs">
                      <code>agents, tasks, process, verbose</code>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Settings className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <h4 className="font-semibold text-gray-900 dark:text-white">Process</h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      작업 실행 방식과 순서
                    </p>
                    <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-700 rounded text-xs">
                      <code>sequential, hierarchical, parallel</code>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                CrewAI 실전 코드
              </h3>
              <div className="bg-gray-900 rounded-xl p-6 text-white">
                <pre className="overflow-x-auto">
                  <code className="text-sm">{`from crewai import Agent, Task, Crew, Process

# 1. 에이전트 정의
researcher = Agent(
    role='Senior Research Analyst',
    goal='Find accurate information about {topic}',
    backstory='Expert researcher with 10 years experience',
    tools=[search_tool, web_scraper],
    verbose=True
)

writer = Agent(
    role='Content Writer',
    goal='Create engaging content based on research',
    backstory='Professional writer specializing in tech',
    tools=[writing_tool],
    verbose=True
)

editor = Agent(
    role='Editor',
    goal='Ensure high quality and accuracy',
    backstory='Meticulous editor with attention to detail',
    verbose=True
)

# 2. 작업 정의
research_task = Task(
    description='Research latest trends in {topic}',
    expected_output='Comprehensive research report',
    agent=researcher
)

writing_task = Task(
    description='Write article based on research',
    expected_output='1000-word article',
    agent=writer
)

editing_task = Task(
    description='Edit and polish the article',
    expected_output='Final polished article',
    agent=editor
)

# 3. Crew 구성 및 실행
crew = Crew(
    agents=[researcher, writer, editor],
    tasks=[research_task, writing_task, editing_task],
    process=Process.sequential,
    verbose=True
)

result = crew.kickoff(inputs={'topic': 'AI Agents'})`}</code>
                </pre>
              </div>
            </section>

            <section className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                💼 실전 사례: 마케팅 캠페인 Crew
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">Market Analyst</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    시장 조사 및 타겟 고객 분석
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">Creative Director</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    캠페인 컨셉 및 크리에이티브 개발
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">Campaign Manager</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    캠페인 실행 계획 및 일정 관리
                  </p>
                </div>
              </div>
            </section>
          </div>
        );

      case 'autogen-systems':
        return (
          <div className="space-y-8">
            {/* AutoGen 멀티 에이전트 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Microsoft AutoGen: 대화형 멀티 에이전트
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  AutoGen은 <strong>대화를 통해 협력하는 AI 에이전트</strong>를 구축하는 Microsoft의 프레임워크입니다. 
                  인간과 AI, AI와 AI 간의 자연스러운 대화를 통해 복잡한 작업을 수행합니다.
                </p>
              </div>
            </section>

            <section className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                AutoGen의 핵심 특징
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2" />
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">대화형 인터페이스</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    자연어 대화를 통한 에이전트 간 협업
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2" />
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">코드 실행 능력</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Python 코드를 직접 작성하고 실행
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <Users className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2" />
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Human-in-the-loop</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    필요시 인간의 개입과 피드백 지원
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2" />
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">유연한 워크플로우</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    동적으로 변경 가능한 대화 흐름
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                AutoGen Agent 타입
              </h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">AssistantAgent</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    LLM 기반 대화형 에이전트, 코드 작성 및 문제 해결
                  </p>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">UserProxyAgent</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    인간 사용자를 대표하거나 코드 실행을 담당
                  </p>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">GroupChatManager</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    여러 에이전트의 그룹 대화를 관리하고 조정
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                AutoGen 코드 예시
              </h3>
              <div className="bg-gray-900 rounded-xl p-6 text-white">
                <pre className="overflow-x-auto">
                  <code className="text-sm">{`import autogen

# Configuration
config_list = [{
    "model": "gpt-4",
    "api_key": "your-api-key"
}]

# Create agents
assistant = autogen.AssistantAgent(
    name="assistant",
    llm_config={"config_list": config_list}
)

user_proxy = autogen.UserProxyAgent(
    name="user_proxy",
    code_execution_config={"work_dir": "coding"},
    human_input_mode="NEVER",
    max_consecutive_auto_reply=10
)

critic = autogen.AssistantAgent(
    name="critic",
    system_message="You are a code reviewer.",
    llm_config={"config_list": config_list}
)

# Group chat
groupchat = autogen.GroupChat(
    agents=[assistant, user_proxy, critic],
    messages=[],
    max_round=20
)

manager = autogen.GroupChatManager(
    groupchat=groupchat,
    llm_config={"config_list": config_list}
)

# Start conversation
user_proxy.initiate_chat(
    manager,
    message="Create a Python function to calculate fibonacci"
)`}</code>
                </pre>
              </div>
            </section>
          </div>
        );

      case 'consensus-algorithms':
        return (
          <div className="space-y-8">
            {/* 합의 알고리즘 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                분산 합의 알고리즘
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  멀티 에이전트 시스템에서 <strong>합의(Consensus)</strong>는 분산된 에이전트들이 
                  공통의 결정에 도달하는 과정입니다. 중앙 조정자 없이도 일관된 의사결정을 가능하게 합니다.
                </p>
              </div>
            </section>

            <section className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                주요 합의 알고리즘
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <h4 className="font-semibold text-green-600 dark:text-green-400 mb-3">Voting Mechanisms</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                      <strong>Majority Vote:</strong> 과반수 득표
                    </li>
                    <li className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                      <strong>Weighted Vote:</strong> 가중치 투표
                    </li>
                    <li className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                      <strong>Ranked Choice:</strong> 선호도 순위
                    </li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <h4 className="font-semibold text-green-600 dark:text-green-400 mb-3">Byzantine Consensus</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                      <strong>PBFT:</strong> Practical Byzantine Fault Tolerance
                    </li>
                    <li className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                      <strong>Raft:</strong> 리더 기반 합의
                    </li>
                    <li className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                      <strong>Paxos:</strong> 분산 합의 프로토콜
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                경매 기반 조정 메커니즘
              </h3>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                    <h4 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-2">English Auction</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      가격이 점진적으로 상승하는 공개 경매
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                    <h4 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-2">Dutch Auction</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      높은 가격에서 시작해 하락하는 경매
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                    <h4 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-2">Vickrey Auction</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      비공개 입찰, 차순위 가격 지불
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                🎯 실전: 분산 자원 할당
              </h3>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  클라우드 컴퓨팅 자원 할당 시나리오
                </h4>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-600 dark:text-gray-400">
                    여러 에이전트가 제한된 컴퓨팅 자원(CPU, 메모리, 스토리지)을 경쟁
                  </p>
                  <div className="grid md:grid-cols-2 gap-2 mt-3">
                    <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                      <strong>문제:</strong> 자원 경쟁과 공정성
                    </div>
                    <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                      <strong>해결:</strong> 경매 메커니즘 적용
                    </div>
                    <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                      <strong>최적화:</strong> 전체 시스템 효율
                    </div>
                    <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                      <strong>공정성:</strong> 비례 할당 보장
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );

      case 'orchestration-patterns':
        return (
          <div className="space-y-8">
            {/* 오케스트레이션 패턴 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                대규모 에이전트 시스템 오케스트레이션
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  오케스트레이션은 <strong>수십에서 수천 개의 에이전트를 효율적으로 관리</strong>하고 
                  조정하는 기술입니다. 복잡한 워크플로우, 자원 관리, 모니터링을 포함합니다.
                </p>
              </div>
            </section>

            <section className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                오케스트레이션 아키텍처
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <Activity className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mb-2" />
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Orchestrator 컴포넌트</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li>• Task Scheduler</li>
                    <li>• Resource Manager</li>
                    <li>• Load Balancer</li>
                    <li>• Health Monitor</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <Settings className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mb-2" />
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">관리 기능</h4>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li>• Agent Lifecycle Management</li>
                    <li>• Configuration Management</li>
                    <li>• Version Control</li>
                    <li>• Rollback Mechanism</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                확장성 패턴
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Horizontal Scaling</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    에이전트 인스턴스 수를 동적으로 증감
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Sharding</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    작업을 논리적 그룹으로 분할 처리
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Federation</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    독립적인 클러스터 간 연합 구성
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                모니터링과 관측성
              </h3>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">247</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Active Agents</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">98.5%</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">1.2s</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Avg Response</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">12K</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Messages/min</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                🚀 Enterprise 사례: 금융 거래 시스템
              </h3>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <strong>Market Data Agents:</strong> 실시간 시장 데이터 수집 (500+ agents)
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                    <strong>Analysis Agents:</strong> 기술적/기본적 분석 수행 (200+ agents)
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                    <strong>Trading Agents:</strong> 자동 매매 실행 (100+ agents)
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                    <strong>Risk Agents:</strong> 리스크 모니터링 및 관리 (50+ agents)
                  </div>
                </div>
              </div>
            </section>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">챕터 콘텐츠를 불러올 수 없습니다.</p>
          </div>
        );
    }
  };

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {renderContent()}
    </div>
  );
}