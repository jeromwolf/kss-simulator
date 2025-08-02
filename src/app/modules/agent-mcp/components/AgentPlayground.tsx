'use client';

import React, { useState } from 'react';
import { Send, Bot, User, Zap, Clock, CheckCircle } from 'lucide-react';

interface AgentStep {
  type: 'thought' | 'action' | 'observation' | 'response';
  content: string;
  timestamp: string;
}

export default function AgentPlayground() {
  const [input, setInput] = useState('');
  const [steps, setSteps] = useState<AgentStep[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const simulateAgent = async () => {
    if (!input.trim()) return;
    
    setIsProcessing(true);
    setSteps([]);
    
    // Simulate ReAct pattern
    const simulationSteps: AgentStep[] = [];
    
    // Step 1: Thought
    await new Promise(resolve => setTimeout(resolve, 500));
    simulationSteps.push({
      type: 'thought',
      content: `사용자가 "${input}"에 대해 물어봤습니다. 이를 처리하기 위해 어떤 도구가 필요한지 분석합니다.`,
      timestamp: new Date().toLocaleTimeString()
    });
    setSteps([...simulationSteps]);
    
    // Step 2: Action
    await new Promise(resolve => setTimeout(resolve, 800));
    simulationSteps.push({
      type: 'action',
      content: `search_tool.query("${input}")를 실행합니다.`,
      timestamp: new Date().toLocaleTimeString()
    });
    setSteps([...simulationSteps]);
    
    // Step 3: Observation
    await new Promise(resolve => setTimeout(resolve, 600));
    simulationSteps.push({
      type: 'observation',
      content: `검색 결과: 관련 정보를 찾았습니다. 데이터를 분석하고 정리합니다.`,
      timestamp: new Date().toLocaleTimeString()
    });
    setSteps([...simulationSteps]);
    
    // Step 4: Response
    await new Promise(resolve => setTimeout(resolve, 400));
    simulationSteps.push({
      type: 'response',
      content: `${input}에 대한 답변: 이것은 시뮬레이션된 Agent 응답입니다. 실제로는 검색 결과와 추론을 결합하여 더 정확한 답변을 제공합니다.`,
      timestamp: new Date().toLocaleTimeString()
    });
    setSteps([...simulationSteps]);
    
    setIsProcessing(false);
    setInput('');
  };

  const getStepIcon = (type: AgentStep['type']) => {
    switch(type) {
      case 'thought':
        return <Bot className="w-5 h-5" />;
      case 'action':
        return <Zap className="w-5 h-5" />;
      case 'observation':
        return <Clock className="w-5 h-5" />;
      case 'response':
        return <CheckCircle className="w-5 h-5" />;
    }
  };

  const getStepColor = (type: AgentStep['type']) => {
    switch(type) {
      case 'thought':
        return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30';
      case 'action':
        return 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30';
      case 'observation':
        return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30';
      case 'response':
        return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30';
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          ReAct Pattern Simulator
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Agent가 어떻게 생각하고, 행동하고, 관찰하고, 응답하는지 실시간으로 확인하세요.
        </p>
      </div>

      {/* Input */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !isProcessing && simulateAgent()}
          placeholder="Agent에게 질문해보세요... (예: 서울의 날씨는 어때?)"
          className="flex-1 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          disabled={isProcessing}
        />
        <button
          onClick={simulateAgent}
          disabled={isProcessing || !input.trim()}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

      {/* Steps Display */}
      <div className="space-y-3 min-h-[300px]">
        {steps.length === 0 && !isProcessing && (
          <div className="text-center text-gray-500 dark:text-gray-400 py-12">
            질문을 입력하면 Agent의 사고 과정을 볼 수 있습니다
          </div>
        )}
        
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 p-4 rounded-lg ${getStepColor(step.type)} 
                       animate-fadeIn transition-all duration-300`}
          >
            <div className="mt-1">
              {getStepIcon(step.type)}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold capitalize">{step.type}</span>
                <span className="text-xs opacity-60">{step.timestamp}</span>
              </div>
              <p className="text-sm">{step.content}</p>
            </div>
          </div>
        ))}
        
        {isProcessing && steps.length < 4 && (
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-purple-500 border-t-transparent"></div>
            <span className="text-sm">Agent가 처리 중입니다...</span>
          </div>
        )}
      </div>

      {/* Available Tools */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          사용 가능한 도구
        </h4>
        <div className="flex flex-wrap gap-2">
          {['search_tool', 'calculator', 'weather_api', 'database_query', 'file_reader'].map(tool => (
            <span
              key={tool}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded-full text-gray-600 dark:text-gray-400"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}