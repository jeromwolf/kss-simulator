'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import A2AOrchestrator from '../../components/A2AOrchestrator';

export default function A2AOrchestratorPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/modules/multi-agent"
            className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            멀티 에이전트 시스템으로 돌아가기
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            A2A Orchestrator
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            에이전트 간 통신과 작업 분배를 시각화하는 시뮬레이터
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Agent-to-Agent 협업 시뮬레이션
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              여러 AI 에이전트가 서로 통신하며 복잡한 작업을 분담하여 수행하는 과정을 시뮬레이션합니다.
              각 에이전트는 고유한 역할을 가지며, 작업 결과를 다음 에이전트에게 전달합니다.
            </p>
            <A2AOrchestrator />
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              시뮬레이션 설명
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  에이전트 역할
                </h3>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400 font-medium">Researcher:</span>
                    <span>관련 정보를 수집하고 데이터를 검색합니다.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400 font-medium">Analyzer:</span>
                    <span>수집된 데이터를 분석하고 인사이트를 도출합니다.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 dark:text-purple-400 font-medium">Writer:</span>
                    <span>분석 결과를 바탕으로 보고서를 작성합니다.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 dark:text-orange-400 font-medium">Reviewer:</span>
                    <span>최종 결과물의 품질을 검토하고 개선합니다.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  워크플로우 단계
                </h3>
                <ol className="space-y-2 ml-4 list-decimal">
                  <li>작업 요청이 입력되면 Researcher가 정보 수집을 시작합니다.</li>
                  <li>수집된 데이터는 Analyzer에게 전달되어 분석됩니다.</li>
                  <li>분석 결과를 바탕으로 Writer가 보고서를 작성합니다.</li>
                  <li>Reviewer가 최종 검토를 수행하고 결과를 출력합니다.</li>
                </ol>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  통신 프로토콜
                </h3>
                <p>
                  각 에이전트는 메시지 큐를 통해 비동기적으로 통신하며, 
                  작업 상태와 진행도를 실시간으로 업데이트합니다.
                  에이전트 간 메시지 전달은 로그에 기록되어 추적 가능합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}