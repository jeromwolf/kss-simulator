'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, Calculator, Database, Globe, FileText, Code, 
  Terminal, Image, Music, Video, Mail, Calendar,
  CheckCircle, XCircle, Clock, AlertCircle, Zap,
  BarChart, TrendingUp, RefreshCw, Play, Pause, ArrowRight
} from 'lucide-react';

// Tool definitions
interface Tool {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  category: 'search' | 'compute' | 'data' | 'api' | 'file' | 'media';
  executionTime: number; // milliseconds
  successRate: number; // percentage
  cost: number; // relative cost 1-5
}

interface ToolExecution {
  toolId: string;
  status: 'pending' | 'running' | 'success' | 'failed';
  startTime: number;
  endTime?: number;
  input?: string;
  output?: string;
  error?: string;
}

interface ExecutionPattern {
  name: string;
  description: string;
  tools: string[];
  type: 'sequential' | 'parallel' | 'conditional' | 'retry';
}

const AVAILABLE_TOOLS: Tool[] = [
  {
    id: 'web-search',
    name: 'Web Search',
    icon: Search,
    description: '인터넷에서 정보 검색',
    category: 'search',
    executionTime: 2000,
    successRate: 95,
    cost: 2
  },
  {
    id: 'calculator',
    name: 'Calculator',
    icon: Calculator,
    description: '수학 계산 수행',
    category: 'compute',
    executionTime: 500,
    successRate: 99,
    cost: 1
  },
  {
    id: 'database',
    name: 'Database Query',
    icon: Database,
    description: '데이터베이스 쿼리 실행',
    category: 'data',
    executionTime: 1500,
    successRate: 90,
    cost: 3
  },
  {
    id: 'api-call',
    name: 'API Call',
    icon: Globe,
    description: '외부 API 호출',
    category: 'api',
    executionTime: 3000,
    successRate: 85,
    cost: 4
  },
  {
    id: 'file-reader',
    name: 'File Reader',
    icon: FileText,
    description: '파일 내용 읽기',
    category: 'file',
    executionTime: 1000,
    successRate: 98,
    cost: 2
  },
  {
    id: 'code-executor',
    name: 'Code Executor',
    icon: Code,
    description: 'Python/JS 코드 실행',
    category: 'compute',
    executionTime: 2500,
    successRate: 88,
    cost: 5
  },
  {
    id: 'image-analyzer',
    name: 'Image Analyzer',
    icon: Image,
    description: '이미지 분석 및 인식',
    category: 'media',
    executionTime: 4000,
    successRate: 92,
    cost: 5
  },
  {
    id: 'data-visualizer',
    name: 'Data Visualizer',
    icon: BarChart,
    description: '데이터 시각화 생성',
    category: 'data',
    executionTime: 2000,
    successRate: 96,
    cost: 3
  }
];

const EXECUTION_PATTERNS: ExecutionPattern[] = [
  {
    name: 'Sequential Chain',
    description: '도구를 순차적으로 실행',
    tools: ['web-search', 'calculator', 'data-visualizer'],
    type: 'sequential'
  },
  {
    name: 'Parallel Processing',
    description: '여러 도구를 동시에 실행',
    tools: ['web-search', 'database', 'api-call'],
    type: 'parallel'
  },
  {
    name: 'Conditional Flow',
    description: '조건에 따라 다른 도구 실행',
    tools: ['web-search', 'code-executor', 'file-reader'],
    type: 'conditional'
  },
  {
    name: 'Retry Pattern',
    description: '실패 시 재시도 로직',
    tools: ['api-call', 'database'],
    type: 'retry'
  }
];

export default function ToolOrchestrator() {
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [executions, setExecutions] = useState<ToolExecution[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedPattern, setSelectedPattern] = useState<ExecutionPattern | null>(null);
  const [userQuery, setUserQuery] = useState('');
  const [metrics, setMetrics] = useState({
    totalExecutions: 0,
    successRate: 0,
    avgTime: 0,
    totalCost: 0
  });
  const [executionMode, setExecutionMode] = useState<'sequential' | 'parallel'>('sequential');

  // Execute tools based on pattern
  const executeTools = async () => {
    if (selectedTools.length === 0) return;
    
    setIsRunning(true);
    setExecutions([]);
    
    // Create initial executions
    const initialExecutions: ToolExecution[] = selectedTools.map(toolId => ({
      toolId,
      status: 'pending',
      startTime: Date.now(),
      input: userQuery
    }));
    setExecutions(initialExecutions);

    if (executionMode === 'sequential') {
      // Sequential execution
      for (let i = 0; i < selectedTools.length; i++) {
        const toolId = selectedTools[i];
        const tool = AVAILABLE_TOOLS.find(t => t.id === toolId);
        if (!tool) continue;

        // Start execution
        setExecutions(prev => prev.map(e => 
          e.toolId === toolId 
            ? { ...e, status: 'running', startTime: Date.now() }
            : e
        ));

        // Simulate execution
        await new Promise(resolve => setTimeout(resolve, tool.executionTime));

        // Determine success/failure
        const success = Math.random() * 100 < tool.successRate;
        
        setExecutions(prev => prev.map(e => 
          e.toolId === toolId 
            ? {
                ...e, 
                status: success ? 'success' : 'failed',
                endTime: Date.now(),
                output: success ? `Result from ${tool.name}` : undefined,
                error: success ? undefined : 'Execution failed'
              }
            : e
        ));

        // If failed and retry pattern, retry once
        if (!success && selectedPattern?.type === 'retry') {
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const retrySuccess = Math.random() * 100 < tool.successRate;
          setExecutions(prev => prev.map(e => 
            e.toolId === toolId 
              ? {
                  ...e, 
                  status: retrySuccess ? 'success' : 'failed',
                  endTime: Date.now(),
                  output: retrySuccess ? `Result from ${tool.name} (retry)` : undefined,
                  error: retrySuccess ? undefined : 'Execution failed after retry'
                }
              : e
          ));
        }
      }
    } else {
      // Parallel execution
      const promises = selectedTools.map(async (toolId) => {
        const tool = AVAILABLE_TOOLS.find(t => t.id === toolId);
        if (!tool) return;

        setExecutions(prev => prev.map(e => 
          e.toolId === toolId 
            ? { ...e, status: 'running', startTime: Date.now() }
            : e
        ));

        await new Promise(resolve => setTimeout(resolve, tool.executionTime));

        const success = Math.random() * 100 < tool.successRate;
        
        setExecutions(prev => prev.map(e => 
          e.toolId === toolId 
            ? {
                ...e, 
                status: success ? 'success' : 'failed',
                endTime: Date.now(),
                output: success ? `Result from ${tool.name}` : undefined,
                error: success ? undefined : 'Execution failed'
              }
            : e
        ));
      });

      await Promise.all(promises);
    }

    // Update metrics
    updateMetrics();
    setIsRunning(false);
  };

  // Update metrics after execution
  const updateMetrics = () => {
    const successCount = executions.filter(e => e.status === 'success').length;
    const totalTime = executions.reduce((sum, e) => {
      if (e.endTime) {
        return sum + (e.endTime - e.startTime);
      }
      return sum;
    }, 0);
    
    const totalCost = selectedTools.reduce((sum, toolId) => {
      const tool = AVAILABLE_TOOLS.find(t => t.id === toolId);
      return sum + (tool?.cost || 0);
    }, 0);

    setMetrics({
      totalExecutions: executions.length,
      successRate: executions.length > 0 ? (successCount / executions.length) * 100 : 0,
      avgTime: executions.length > 0 ? totalTime / executions.length : 0,
      totalCost
    });
  };

  // Toggle tool selection
  const toggleTool = (toolId: string) => {
    if (selectedTools.includes(toolId)) {
      setSelectedTools(selectedTools.filter(id => id !== toolId));
    } else {
      setSelectedTools([...selectedTools, toolId]);
    }
  };

  // Apply pattern
  const applyPattern = (pattern: ExecutionPattern) => {
    setSelectedPattern(pattern);
    setSelectedTools(pattern.tools);
    setExecutionMode(pattern.type === 'parallel' ? 'parallel' : 'sequential');
  };

  const getStatusIcon = (status: ToolExecution['status']) => {
    switch(status) {
      case 'pending': return <Clock className="w-4 h-4 text-gray-400" />;
      case 'running': return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed': return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getCategoryColor = (category: Tool['category']) => {
    const colors = {
      search: 'blue',
      compute: 'purple',
      data: 'green',
      api: 'yellow',
      file: 'gray',
      media: 'pink'
    };
    return colors[category] || 'gray';
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Tool Orchestration Simulator
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Agent의 도구 사용 패턴을 시뮬레이션하고 최적화하세요
        </p>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Tool Selection */}
        <div className="col-span-4 space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Available Tools
            </h4>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {AVAILABLE_TOOLS.map(tool => {
                const Icon = tool.icon;
                const color = getCategoryColor(tool.category);
                const isSelected = selectedTools.includes(tool.id);
                
                return (
                  <div
                    key={tool.id}
                    onClick={() => toggleTool(tool.id)}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      isSelected 
                        ? 'bg-purple-50 dark:bg-purple-900/30 border-2 border-purple-500' 
                        : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 bg-${color}-100 dark:bg-${color}-900/30 rounded-lg`}>
                        <Icon className={`w-5 h-5 text-${color}-600 dark:text-${color}-400`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900 dark:text-white text-sm">
                            {tool.name}
                          </span>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-gray-500">⚡ {tool.executionTime}ms</span>
                            <span className="text-gray-500">💰 {tool.cost}</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {tool.description}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="text-xs text-gray-500">
                            Success: {tool.successRate}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Execution Patterns */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Execution Patterns
            </h4>
            <div className="space-y-2">
              {EXECUTION_PATTERNS.map(pattern => (
                <button
                  key={pattern.name}
                  onClick={() => applyPattern(pattern)}
                  className={`w-full text-left p-2 rounded-lg transition-colors ${
                    selectedPattern?.name === pattern.name
                      ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                      : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  <div className="font-medium text-sm">{pattern.name}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {pattern.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Execution View */}
        <div className="col-span-5">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 h-full">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Execution Pipeline
              </h4>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setExecutionMode('sequential')}
                  className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                    executionMode === 'sequential'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Sequential
                </button>
                <button
                  onClick={() => setExecutionMode('parallel')}
                  className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                    executionMode === 'parallel'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Parallel
                </button>
              </div>
            </div>

            {/* Query Input */}
            <div className="mb-4">
              <input
                type="text"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                placeholder="Enter your query..."
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Selected Tools Pipeline */}
            <div className="space-y-2 mb-4 min-h-[200px]">
              {selectedTools.length === 0 ? (
                <div className="text-center text-gray-400 py-8">
                  <Zap className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-sm">도구를 선택하거나 패턴을 적용하세요</p>
                </div>
              ) : (
                selectedTools.map((toolId, index) => {
                  const tool = AVAILABLE_TOOLS.find(t => t.id === toolId);
                  const execution = executions.find(e => e.toolId === toolId);
                  if (!tool) return null;
                  
                  const Icon = tool.icon;
                  return (
                    <div key={toolId} className="flex items-center gap-2">
                      <div className="flex-1 flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <Icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {tool.name}
                        </span>
                        {execution && getStatusIcon(execution.status)}
                      </div>
                      {executionMode === 'sequential' && index < selectedTools.length - 1 && (
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Execute Button */}
            <button
              onClick={executeTools}
              disabled={isRunning || selectedTools.length === 0}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isRunning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Executing...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Execute Tools
                </>
              )}
            </button>
          </div>
        </div>

        {/* Metrics & Results */}
        <div className="col-span-3 space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Execution Metrics
            </h4>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600 dark:text-gray-400">Success Rate</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {metrics.successRate.toFixed(1)}%
                  </span>
                </div>
                <div className="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all"
                    style={{ width: `${metrics.successRate}%` }}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600 dark:text-gray-400">Avg Time</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {metrics.avgTime.toFixed(0)}ms
                </span>
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600 dark:text-gray-400">Total Cost</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {'💰'.repeat(Math.min(metrics.totalCost, 5))} {metrics.totalCost}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600 dark:text-gray-400">Executions</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {metrics.totalExecutions}
                </span>
              </div>
            </div>
          </div>

          {/* Execution Results */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Results
            </h4>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {executions.length === 0 ? (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  실행 결과가 여기에 표시됩니다
                </p>
              ) : (
                executions.map((exec, idx) => {
                  const tool = AVAILABLE_TOOLS.find(t => t.id === exec.toolId);
                  return (
                    <div key={idx} className="p-2 bg-gray-50 dark:bg-gray-700 rounded text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {tool?.name}
                        </span>
                        {getStatusIcon(exec.status)}
                      </div>
                      {exec.output && (
                        <p className="text-green-600 dark:text-green-400">{exec.output}</p>
                      )}
                      {exec.error && (
                        <p className="text-red-600 dark:text-red-400">{exec.error}</p>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}