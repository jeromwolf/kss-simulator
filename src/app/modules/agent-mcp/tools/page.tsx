'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import LangChainBuilder from '../components/LangChainBuilder';
import ToolOrchestrator from '../components/ToolOrchestrator';
import AgentPlayground from '../components/AgentPlayground';
import MCPServerSimulator from '../components/MCPServerSimulator';
import ReActSimulator from '../components/ReActSimulator';
import MCPProtocolSimulator from '../components/MCPProtocolSimulator';

export default function AgentMCPToolsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Navigation */}
      <div className="mb-8">
        <Link
          href="/modules/agent-mcp"
          className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          AI Agent & MCP 모듈로 돌아가기
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Agent & MCP Simulators
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          AI Agent와 MCP의 핵심 개념을 직접 체험해보세요
        </p>
      </div>

      {/* Simulators */}
      <div className="space-y-8">
        {/* LangChain Builder */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            LangChain Visual Builder
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            드래그앤드롭으로 Agent Chain을 구성하고 실행해보세요
          </p>
          <LangChainBuilder />
        </div>

        {/* Tool Orchestrator */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Tool Orchestration Simulator
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Agent의 도구 사용 패턴을 시뮬레이션하고 최적화합니다
          </p>
          <ToolOrchestrator />
        </div>

        {/* ReAct Pattern Simulator */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            ReAct Pattern Simulator
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Thought → Action → Observation 사이클을 통한 Agent의 문제 해결 과정을 시각화합니다
          </p>
          <ReActSimulator />
        </div>

        {/* MCP Protocol Simulator */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            MCP Protocol Communication
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Model Context Protocol의 Client-Server 통신을 실시간으로 시뮬레이션합니다
          </p>
          <MCPProtocolSimulator />
        </div>

        {/* Agent Playground */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Agent Playground
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            AI Agent의 다양한 기능을 실험해보세요
          </p>
          <AgentPlayground />
        </div>

        {/* MCP Server Simulator */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            MCP Server Manager
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            MCP 서버를 관리하고 리소스를 탐색합니다
          </p>
          <MCPServerSimulator />
        </div>
      </div>
    </div>
  );
}