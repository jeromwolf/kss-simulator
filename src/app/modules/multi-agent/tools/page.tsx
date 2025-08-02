'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import A2AOrchestrator from '../components/A2AOrchestrator';
import CrewAIBuilder from '../components/CrewAIBuilder';
import ConsensusSimulator from '../components/ConsensusSimulator';
import AutoGenSimulator from '../components/AutoGenSimulator';

export default function MultiAgentToolsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Navigation */}
      <div className="mb-8">
        <Link
          href="/modules/multi-agent"
          className="inline-flex items-center text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          멀티 에이전트 시스템으로 돌아가기
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Multi-Agent System Simulators
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          멀티 에이전트 시스템의 핵심 개념을 직접 체험해보세요
        </p>
      </div>

      {/* Simulators */}
      <div className="space-y-8">
        {/* A2A Orchestrator */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            A2A Communication Orchestrator
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Agent 간 통신과 협업 워크플로우를 시뮬레이션합니다
          </p>
          <A2AOrchestrator />
        </div>

        {/* CrewAI Builder */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            CrewAI Team Builder
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            역할 기반 AI 에이전트 팀을 구성하고 작업을 할당합니다
          </p>
          <CrewAIBuilder />
        </div>

        {/* Consensus Simulator */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Distributed Consensus Simulator
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            다양한 합의 알고리즘을 통한 분산 의사결정을 시뮬레이션합니다
          </p>
          <ConsensusSimulator />
        </div>

        {/* AutoGen Simulator */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Microsoft AutoGen Framework
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            AutoGen 프레임워크를 통한 멀티 에이전트 협업을 체험합니다
          </p>
          <AutoGenSimulator />
        </div>
      </div>
    </div>
  );
}