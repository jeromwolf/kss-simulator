'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ConsensusSimulator from '../../components/ConsensusSimulator';

export default function ConsensusSimulatorPage() {
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
            Distributed Consensus Simulator
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            다양한 합의 알고리즘을 통한 분산 의사결정 과정을 시뮬레이션합니다
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
          <ConsensusSimulator />
        </div>
      </div>
    </div>
  );
}