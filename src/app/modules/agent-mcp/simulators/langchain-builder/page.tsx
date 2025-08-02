'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import to avoid SSR issues
const LangChainBuilder = dynamic(
  () => import('../../components/LangChainBuilder'),
  { ssr: false }
);

export default function LangChainBuilderPage() {
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
            LangChain Visual Builder
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            드래그앤드롭으로 Agent Chain을 구성하고 실행합니다
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
          <LangChainBuilder />
        </div>

        <div className="mt-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            LangChain Builder 사용법
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-400">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  컴포넌트 추가하기
                </h3>
                <ol className="list-decimal ml-6 space-y-1 text-sm">
                  <li>왼쪽 패널에서 원하는 컴포넌트를 선택</li>
                  <li>캔버스로 드래그하여 배치</li>
                  <li>여러 컴포넌트를 조합하여 체인 구성</li>
                </ol>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  연결하기
                </h3>
                <ol className="list-decimal ml-6 space-y-1 text-sm">
                  <li>컴포넌트의 출력 포트를 클릭</li>
                  <li>다음 컴포넌트의 입력 포트로 드래그</li>
                  <li>자동으로 데이터 흐름이 연결됨</li>
                </ol>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900 dark:text-white">사용 가능한 컴포넌트:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded">
                  <strong>LLM:</strong> 언어 모델
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                  <strong>Tools:</strong> 검색, 계산기 등
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded">
                  <strong>Memory:</strong> 대화 기억
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/20 p-2 rounded">
                  <strong>Prompt:</strong> 프롬프트 템플릿
                </div>
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <p className="text-sm">
                💡 <strong>팁:</strong> 기본 템플릿을 시작점으로 사용하여 빠르게 체인을 구성할 수 있습니다.
                실행 버튼을 클릭하면 구성한 체인이 실제로 작동하는 것을 확인할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}