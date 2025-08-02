'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import to avoid SSR issues
const ReActSimulator = dynamic(
  () => import('../../components/ReActSimulator'),
  { ssr: false }
);

export default function AgentPlaygroundPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/modules/agent-mcp"
            className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Agent-MCP 모듈로 돌아가기
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Agent Playground
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            ReAct 패턴 기반 대화형 에이전트를 실습하고 체험합니다
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
          <ReActSimulator />
        </div>

        <div className="mt-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            ReAct Pattern 설명
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-400">
            <p>
              ReAct (Reasoning + Acting) 패턴은 AI 에이전트가 사고(Thought), 행동(Action), 관찰(Observation)의 
              순환을 통해 복잡한 작업을 수행하는 프레임워크입니다.
            </p>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900 dark:text-white">작동 방식:</h3>
              <ol className="list-decimal ml-6 space-y-1">
                <li><strong>Thought:</strong> 현재 상황을 분석하고 다음 행동을 계획</li>
                <li><strong>Action:</strong> 도구를 선택하고 실행</li>
                <li><strong>Observation:</strong> 실행 결과를 관찰하고 분석</li>
                <li>목표 달성까지 1-3 단계를 반복</li>
              </ol>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <p className="text-sm">
                💡 <strong>팁:</strong> 질문을 입력하면 에이전트가 자동으로 적절한 도구를 선택하여 
                답변을 생성합니다. 각 단계별 사고 과정을 실시간으로 확인할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}