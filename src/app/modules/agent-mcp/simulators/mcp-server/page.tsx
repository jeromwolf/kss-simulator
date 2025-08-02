'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import to avoid SSR issues
const MCPProtocolSimulator = dynamic(
  () => import('../../components/MCPProtocolSimulator'),
  { ssr: false }
);

export default function MCPServerPage() {
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
            MCP Protocol Simulator
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Model Context Protocol의 서버-클라이언트 통신을 시각화합니다
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
          <MCPProtocolSimulator />
        </div>

        <div className="mt-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            MCP (Model Context Protocol) 이해하기
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-400">
            <p>
              MCP는 LLM과 외부 시스템 간의 표준화된 통신 프로토콜입니다. 
              이를 통해 AI 모델이 다양한 도구와 리소스에 안전하게 접근할 수 있습니다.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Resources
                </h3>
                <p className="text-sm">
                  파일, 데이터베이스, API 등 외부 리소스에 대한 접근 제공
                </p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Tools
                </h3>
                <p className="text-sm">
                  실행 가능한 함수와 명령어를 통한 작업 수행
                </p>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Prompts
                </h3>
                <p className="text-sm">
                  재사용 가능한 프롬프트 템플릿 관리
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900 dark:text-white">시뮬레이터 사용법:</h3>
              <ol className="list-decimal ml-6 space-y-1">
                <li>왼쪽 패널에서 MCP 서버를 선택하여 연결</li>
                <li>연결된 서버의 리소스와 도구 목록 확인</li>
                <li>도구를 클릭하여 실행하고 결과 확인</li>
                <li>중앙 패널에서 실시간 통신 메시지 모니터링</li>
              </ol>
            </div>

            <div className="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-lg">
              <p className="text-sm">
                💡 <strong>팁:</strong> Database Server와 File System Server를 연결하여 
                다양한 리소스 접근 패턴을 실습할 수 있습니다. 각 메시지의 상세 내용을 
                클릭하면 전체 페이로드를 확인할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}