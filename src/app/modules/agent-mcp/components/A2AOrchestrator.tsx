'use client';

import React, { useState, useEffect } from 'react';
import { Users, Brain, MessageCircle, Zap, Target, CheckCircle2, AlertCircle } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  role: string;
  status: 'idle' | 'thinking' | 'working' | 'communicating' | 'done';
  color: string;
  progress: number;
}

interface AgentMessage {
  from: string;
  to: string;
  content: string;
  timestamp: string;
}

export default function A2AOrchestrator() {
  const [agents, setAgents] = useState<Agent[]>([
    { id: 'researcher', name: 'Researcher', role: '정보 수집', status: 'idle', color: 'blue', progress: 0 },
    { id: 'analyzer', name: 'Analyzer', role: '데이터 분석', status: 'idle', color: 'green', progress: 0 },
    { id: 'writer', name: 'Writer', role: '보고서 작성', status: 'idle', color: 'purple', progress: 0 },
    { id: 'reviewer', name: 'Reviewer', role: '품질 검토', status: 'idle', color: 'orange', progress: 0 }
  ]);
  
  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [task, setTask] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState('');

  const startCollaboration = async () => {
    if (!task.trim()) return;
    
    setIsRunning(true);
    setMessages([]);
    setResult('');
    
    // Reset agents
    setAgents(agents.map(a => ({ ...a, status: 'idle', progress: 0 })));
    
    // Simulate multi-agent collaboration
    const workflow = [
      { agentId: 'researcher', duration: 2000, nextAgent: 'analyzer', message: '데이터 수집 완료' },
      { agentId: 'analyzer', duration: 2500, nextAgent: 'writer', message: '분석 결과 전달' },
      { agentId: 'writer', duration: 2000, nextAgent: 'reviewer', message: '초안 작성 완료' },
      { agentId: 'reviewer', duration: 1500, nextAgent: null, message: '검토 완료' }
    ];
    
    for (const step of workflow) {
      // Start agent work
      setAgents(prev => prev.map(a => 
        a.id === step.agentId 
          ? { ...a, status: 'thinking', progress: 0 }
          : a
      ));
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Agent working
      setAgents(prev => prev.map(a => 
        a.id === step.agentId 
          ? { ...a, status: 'working', progress: 50 }
          : a
      ));
      
      await new Promise(resolve => setTimeout(resolve, step.duration / 2));
      
      // Agent communicating
      if (step.nextAgent) {
        setAgents(prev => prev.map(a => 
          a.id === step.agentId 
            ? { ...a, status: 'communicating', progress: 80 }
            : a
        ));
        
        const msg: AgentMessage = {
          from: step.agentId,
          to: step.nextAgent,
          content: step.message,
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, msg]);
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Agent done
      setAgents(prev => prev.map(a => 
        a.id === step.agentId 
          ? { ...a, status: 'done', progress: 100 }
          : a
      ));
    }
    
    // Final result
    setResult(`작업 "${task}" 완료!\n\n협업 결과:\n- 관련 정보 15개 수집\n- 3가지 핵심 인사이트 도출\n- 2페이지 요약 보고서 생성\n- 품질 점수: 95/100`);
    setIsRunning(false);
  };

  const getStatusIcon = (status: Agent['status']) => {
    switch(status) {
      case 'thinking':
        return <Brain className="w-4 h-4 animate-pulse" />;
      case 'working':
        return <Zap className="w-4 h-4 animate-spin" />;
      case 'communicating':
        return <MessageCircle className="w-4 h-4" />;
      case 'done':
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getAgentColor = (color: string, status: Agent['status']) => {
    const opacity = status === 'idle' ? '20' : status === 'done' ? '40' : '30';
    const borderOpacity = status === 'idle' ? '200' : status === 'done' ? '500' : '400';
    
    return {
      bg: `bg-${color}-50 dark:bg-${color}-900/${opacity}`,
      border: `border-${color}-${borderOpacity}`,
      text: `text-${color}-600 dark:text-${color}-400`
    };
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Multi-Agent Collaboration
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          여러 Agent가 협력하여 복잡한 작업을 수행합니다.
        </p>
      </div>

      {/* Task Input */}
      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="협업 작업을 입력하세요... (예: AI 트렌드 리포트 작성)"
            className="flex-1 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={isRunning}
          />
          <button
            onClick={startCollaboration}
            disabled={isRunning || !task.trim()}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isRunning ? '진행 중...' : '시작'}
          </button>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {agents.map(agent => (
          <div
            key={agent.id}
            className={`p-4 rounded-lg border-2 transition-all duration-300 ${
              agent.status !== 'idle' 
                ? `border-${agent.color}-400 shadow-lg` 
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Users className={`w-5 h-5 text-${agent.color}-600 dark:text-${agent.color}-400`} />
                <span className="font-semibold">{agent.name}</span>
              </div>
              {getStatusIcon(agent.status)}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{agent.role}</p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`bg-${agent.color}-500 h-2 rounded-full transition-all duration-500`}
                style={{ width: `${agent.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Communication Log */}
      {messages.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Agent 통신 로그
          </h4>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 space-y-2 max-h-40 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <span className="text-purple-600 dark:text-purple-400 font-medium">
                  {msg.from}
                </span>
                <span className="text-gray-400">→</span>
                <span className="text-purple-600 dark:text-purple-400 font-medium">
                  {msg.to}
                </span>
                <span className="text-gray-600 dark:text-gray-400">:</span>
                <span className="text-gray-700 dark:text-gray-300">{msg.content}</span>
                <span className="text-xs text-gray-500 dark:text-gray-500 ml-auto">
                  {msg.timestamp}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
          <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">
            협업 결과
          </h4>
          <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {result}
          </pre>
        </div>
      )}
    </div>
  );
}