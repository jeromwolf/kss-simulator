'use client';

import React, { useState } from 'react';
import { 
  Brain, Zap, Eye, PlayCircle, RefreshCw, CheckCircle,
  Search, Calculator, FileText, Globe, MessageSquare,
  ChevronRight, AlertCircle, Lightbulb
} from 'lucide-react';

interface ReActStep {
  id: string;
  type: 'thought' | 'action' | 'observation';
  content: string;
  tool?: string;
  timestamp: number;
}

interface Tool {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  execute: (input: string) => Promise<string>;
}

const AVAILABLE_TOOLS: Tool[] = [
  {
    id: 'search',
    name: 'Web Search',
    icon: Search,
    description: '인터넷에서 정보 검색',
    execute: async (query) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return `검색 결과: "${query}"에 대한 최신 정보를 찾았습니다. [예시 데이터]`;
    }
  },
  {
    id: 'calculator',
    name: 'Calculator',
    icon: Calculator,
    description: '수학 계산 수행',
    execute: async (expression) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      try {
        const result = eval(expression.replace(/[^0-9+\-*/().\s]/g, ''));
        return `계산 결과: ${expression} = ${result}`;
      } catch {
        return '계산 오류: 올바른 수식을 입력해주세요';
      }
    }
  },
  {
    id: 'file',
    name: 'File Reader',
    icon: FileText,
    description: '파일 내용 읽기',
    execute: async (filename) => {
      await new Promise(resolve => setTimeout(resolve, 800));
      return `파일 "${filename}" 내용: [샘플 텍스트 데이터]`;
    }
  },
  {
    id: 'api',
    name: 'API Call',
    icon: Globe,
    description: 'API 호출',
    execute: async (endpoint) => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      return `API 응답 (${endpoint}): {"status": "success", "data": {...}}`;
    }
  }
];

const EXAMPLE_QUERIES = [
  "2024년 한국 GDP는 얼마이고, 전년 대비 성장률은?",
  "파이썬으로 피보나치 수열 코드 작성해줘",
  "서울에서 부산까지 거리와 KTX 소요시간은?",
  "AI 스타트업 투자 유치 전략 알려줘"
];

function ReActSimulator() {
  const [query, setQuery] = useState('');
  const [steps, setSteps] = useState<ReActStep[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState<'thought' | 'action' | 'observation' | null>(null);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [iterations, setIterations] = useState(0);
  const [maxIterations] = useState(5);

  const simulateReAct = async () => {
    if (!query.trim()) return;

    setIsRunning(true);
    setSteps([]);
    setIterations(0);

    // Initial thought
    await addThought(`사용자 질문 분석: "${query}". 이 질문에 답하기 위해 필요한 정보를 수집해야 합니다.`);

    // Simulate ReAct loop
    for (let i = 0; i < maxIterations; i++) {
      setIterations(i + 1);

      // Thought phase
      const thoughtContent = generateThought(query, i);
      await addThought(thoughtContent);

      // Determine if we need more information
      if (i === 2) {
        // Final thought
        await addThought("충분한 정보를 수집했습니다. 최종 답변을 생성합니다.");
        break;
      }

      // Action phase
      const tool = selectTool(i);
      const actionContent = `${tool.name} 도구를 사용하여 정보 수집`;
      await addAction(actionContent, tool);

      // Observation phase
      const result = await tool.execute(query);
      await addObservation(result);

      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Final answer
    await addThought("✨ 최종 답변: 요청하신 정보를 종합하여 답변드리겠습니다. [상세한 답변 내용]");
    
    setIsRunning(false);
    setCurrentStep(null);
  };

  const generateThought = (query: string, iteration: number): string => {
    const thoughts = [
      "먼저 관련 정보를 웹에서 검색해야 합니다.",
      "검색 결과를 바탕으로 추가 계산이 필요합니다.",
      "더 구체적인 정보를 위해 API를 호출해야 합니다."
    ];
    return thoughts[iteration] || "추가 정보 수집이 필요합니다.";
  };

  const selectTool = (iteration: number): Tool => {
    const toolOrder = [AVAILABLE_TOOLS[0], AVAILABLE_TOOLS[1], AVAILABLE_TOOLS[3]];
    return toolOrder[iteration] || AVAILABLE_TOOLS[0];
  };

  const addThought = async (content: string) => {
    setCurrentStep('thought');
    const step: ReActStep = {
      id: `step-${Date.now()}`,
      type: 'thought',
      content,
      timestamp: Date.now()
    };
    setSteps(prev => [...prev, step]);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const addAction = async (content: string, tool: Tool) => {
    setCurrentStep('action');
    setSelectedTool(tool);
    const step: ReActStep = {
      id: `step-${Date.now()}`,
      type: 'action',
      content,
      tool: tool.name,
      timestamp: Date.now()
    };
    setSteps(prev => [...prev, step]);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const addObservation = async (content: string) => {
    setCurrentStep('observation');
    const step: ReActStep = {
      id: `step-${Date.now()}`,
      type: 'observation',
      content,
      timestamp: Date.now()
    };
    setSteps(prev => [...prev, step]);
    setSelectedTool(null);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const getStepIcon = (type: ReActStep['type']) => {
    switch(type) {
      case 'thought': return <Brain className="w-5 h-5" />;
      case 'action': return <Zap className="w-5 h-5" />;
      case 'observation': return <Eye className="w-5 h-5" />;
    }
  };

  const getStepColor = (type: ReActStep['type']) => {
    switch(type) {
      case 'thought': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-700';
      case 'action': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700';
      case 'observation': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700';
    }
  };

  const reset = () => {
    setQuery('');
    setSteps([]);
    setIterations(0);
    setCurrentStep(null);
    setSelectedTool(null);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          ReAct Pattern Simulator
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Thought → Action → Observation 사이클을 통한 Agent의 문제 해결 과정을 시각화합니다
        </p>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Input & Controls */}
        <div className="col-span-4 space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Query Input
            </h4>
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Agent에게 질문을 입력하세요..."
              className="w-full h-24 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              disabled={isRunning}
            />
            
            <div className="mt-3 space-y-2">
              <p className="text-xs text-gray-600 dark:text-gray-400">예시 질문:</p>
              {EXAMPLE_QUERIES.map((example, idx) => (
                <button
                  key={idx}
                  onClick={() => setQuery(example)}
                  disabled={isRunning}
                  className="w-full text-left text-xs p-2 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors disabled:opacity-50"
                >
                  {example}
                </button>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={simulateReAct}
                disabled={isRunning || !query.trim()}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {isRunning ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    실행 중...
                  </>
                ) : (
                  <>
                    <PlayCircle className="w-4 h-4" />
                    실행
                  </>
                )}
              </button>
              <button
                onClick={reset}
                disabled={isRunning}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors"
              >
                초기화
              </button>
            </div>

            {isRunning && (
              <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-purple-700 dark:text-purple-300">
                    Iteration: {iterations}/{maxIterations}
                  </span>
                  <span className="text-purple-600 dark:text-purple-400 capitalize">
                    {currentStep || 'initializing'}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Available Tools */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Available Tools
            </h4>
            <div className="space-y-2">
              {AVAILABLE_TOOLS.map(tool => {
                const Icon = tool.icon;
                const isActive = selectedTool?.id === tool.id;
                return (
                  <div
                    key={tool.id}
                    className={`p-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-500'
                        : 'bg-gray-50 dark:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${
                        isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'
                      }`} />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {tool.name}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {tool.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ReAct Steps Visualization */}
        <div className="col-span-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 h-full">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              ReAct Execution Flow
            </h4>
            
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {steps.length === 0 ? (
                <div className="text-center py-12">
                  <Lightbulb className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    질문을 입력하고 실행 버튼을 눌러<br />
                    ReAct 패턴의 동작을 확인하세요
                  </p>
                </div>
              ) : (
                steps.map((step, index) => (
                  <div key={step.id} className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStepColor(step.type)} border-2`}>
                        {getStepIcon(step.type)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white capitalize">
                          {step.type}
                        </span>
                        {step.tool && (
                          <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full">
                            {step.tool}
                          </span>
                        )}
                        <span className="text-xs text-gray-500 dark:text-gray-500">
                          Step {index + 1}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {step.content}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    )}
                  </div>
                ))
              )}
              
              {steps.length > 0 && steps[steps.length - 1].content.includes('최종 답변') && (
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-2 border-green-300 dark:border-green-700">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span className="font-semibold text-green-700 dark:text-green-300">
                      작업 완료
                    </span>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    ReAct 패턴을 통해 {iterations}번의 반복으로 답변을 생성했습니다.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pattern Explanation */}
      <div className="mt-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-purple-600 dark:text-purple-400 mt-0.5" />
          <div className="text-xs text-purple-700 dark:text-purple-300 space-y-1">
            <p><strong>ReAct (Reasoning + Acting)</strong>는 Agent가 문제를 해결하는 핵심 패턴입니다:</p>
            <ul className="space-y-1 ml-4">
              <li>• <strong>Thought:</strong> 현재 상황을 분석하고 다음 행동을 계획</li>
              <li>• <strong>Action:</strong> 필요한 도구를 선택하고 실행</li>
              <li>• <strong>Observation:</strong> 행동 결과를 관찰하고 평가</li>
            </ul>
            <p>이 사이클을 반복하여 복잡한 문제를 단계적으로 해결합니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReActSimulator;