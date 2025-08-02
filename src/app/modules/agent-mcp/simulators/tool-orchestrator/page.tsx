'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import to avoid SSR issues
const ToolOrchestrator = dynamic(
  () => import('../../components/ToolOrchestrator'),
  { ssr: false }
);

export default function ToolOrchestratorPage() {
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
            Tool Orchestration Simulator
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            AI Agent의 도구 사용 패턴을 시뮬레이션하고 최적화합니다
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
          <ToolOrchestrator />
        </div>

        <div className="mt-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Tool Orchestration 패턴
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-400">
            <p>
              AI Agent가 복잡한 작업을 수행할 때 여러 도구를 효율적으로 조합하여 사용하는 
              패턴을 학습합니다. 순차적 실행과 병렬 실행을 전략적으로 활용합니다.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  순차적 실행 (Sequential)
                </h3>
                <ul className="list-disc ml-6 space-y-1 text-sm">
                  <li>도구들이 순서대로 실행</li>
                  <li>이전 결과를 다음 도구가 활용</li>
                  <li>의존성이 있는 작업에 적합</li>
                </ul>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  병렬 실행 (Parallel)
                </h3>
                <ul className="list-disc ml-6 space-y-1 text-sm">
                  <li>독립적인 도구들을 동시 실행</li>
                  <li>전체 실행 시간 단축</li>
                  <li>리소스 효율적 활용</li>
                </ul>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900 dark:text-white">사용 가능한 도구들:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-center">
                  🔍 Web Search
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-center">
                  🧮 Calculator
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-center">
                  📊 Data Analyzer
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-center">
                  🌐 Translator
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-center">
                  📝 Summarizer
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-center">
                  📧 Email Sender
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-center">
                  📅 Calendar
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-center">
                  💾 File Manager
                </div>
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <p className="text-sm">
                💡 <strong>팁:</strong> 작업을 추가한 후 실행 모드를 선택하여 도구 오케스트레이션을 
                시작하세요. 각 도구의 실행 시간과 결과를 실시간으로 모니터링할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}