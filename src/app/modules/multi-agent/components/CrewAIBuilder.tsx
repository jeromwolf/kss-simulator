'use client';

import React, { useState } from 'react';
import { 
  Users, Brain, Target, Settings, Play, Plus, Trash2,
  ChevronRight, Briefcase, CheckCircle, XCircle, RefreshCw,
  Zap, FileText, Search, Code, MessageSquare, Globe
} from 'lucide-react';

// Types
interface Agent {
  id: string;
  name: string;
  role: string;
  goal: string;
  backstory: string;
  tools: string[];
  llm?: string;
  temperature?: number;
}

interface Task {
  id: string;
  description: string;
  expectedOutput: string;
  agent: string;
  tools: string[];
  dependencies: string[];
}

interface CrewConfig {
  name: string;
  agents: Agent[];
  tasks: Task[];
  process: 'sequential' | 'hierarchical' | 'parallel';
  verbose: boolean;
}

// Available tools
const AVAILABLE_TOOLS = [
  { id: 'search', name: 'Web Search', icon: Search },
  { id: 'code', name: 'Code Executor', icon: Code },
  { id: 'file', name: 'File Reader', icon: FileText },
  { id: 'api', name: 'API Caller', icon: Globe },
  { id: 'chat', name: 'Chat Interface', icon: MessageSquare }
];

// Available LLMs
const AVAILABLE_LLMS = [
  'gpt-4-turbo',
  'gpt-3.5-turbo',
  'claude-3-opus',
  'claude-3-sonnet',
  'gemini-pro'
];

export default function CrewAIBuilder() {
  const [crew, setCrew] = useState<CrewConfig>({
    name: 'Research Crew',
    agents: [],
    tasks: [],
    process: 'sequential',
    verbose: true
  });

  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [executionLog, setExecutionLog] = useState<string[]>([]);

  // Add new agent
  const addAgent = () => {
    const newAgent: Agent = {
      id: `agent-${Date.now()}`,
      name: `Agent ${crew.agents.length + 1}`,
      role: 'Specialist',
      goal: 'Complete assigned tasks',
      backstory: 'Experienced professional',
      tools: [],
      llm: 'gpt-3.5-turbo',
      temperature: 0.7
    };
    setCrew({ ...crew, agents: [...crew.agents, newAgent] });
  };

  // Update agent
  const updateAgent = (agentId: string, updates: Partial<Agent>) => {
    setCrew({
      ...crew,
      agents: crew.agents.map(a => 
        a.id === agentId ? { ...a, ...updates } : a
      )
    });
  };

  // Delete agent
  const deleteAgent = (agentId: string) => {
    setCrew({
      ...crew,
      agents: crew.agents.filter(a => a.id !== agentId),
      tasks: crew.tasks.map(t => ({
        ...t,
        agent: t.agent === agentId ? '' : t.agent
      }))
    });
  };

  // Add new task
  const addTask = () => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      description: 'New task description',
      expectedOutput: 'Expected output',
      agent: crew.agents[0]?.id || '',
      tools: [],
      dependencies: []
    };
    setCrew({ ...crew, tasks: [...crew.tasks, newTask] });
  };

  // Update task
  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setCrew({
      ...crew,
      tasks: crew.tasks.map(t => 
        t.id === taskId ? { ...t, ...updates } : t
      )
    });
  };

  // Delete task
  const deleteTask = (taskId: string) => {
    setCrew({
      ...crew,
      tasks: crew.tasks.filter(t => t.id !== taskId)
    });
  };

  // Run crew simulation
  const runCrew = async () => {
    setIsRunning(true);
    setExecutionLog([]);
    
    const log = (message: string) => {
      setExecutionLog(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
    };

    log('🚀 Starting CrewAI execution...');
    log(`Process type: ${crew.process}`);
    log(`Agents: ${crew.agents.length}, Tasks: ${crew.tasks.length}`);

    // Simulate task execution
    for (const task of crew.tasks) {
      const agent = crew.agents.find(a => a.id === task.agent);
      if (!agent) continue;

      log(`\n📋 Task: ${task.description}`);
      log(`👤 Assigned to: ${agent.name} (${agent.role})`);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      log(`🤔 ${agent.name} is thinking...`);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (task.tools.length > 0) {
        log(`🔧 Using tools: ${task.tools.join(', ')}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      log(`✅ Task completed: ${task.expectedOutput}`);
    }

    log('\n🎉 Crew execution completed successfully!');
    setIsRunning(false);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          CrewAI Team Builder
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          역할 기반 AI 에이전트 팀을 구성하고 작업을 할당하세요
        </p>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Agents Panel */}
        <div className="col-span-5 space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Agents ({crew.agents.length})
              </h4>
              <button
                onClick={addAgent}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
              >
                <Plus className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              </button>
            </div>
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {crew.agents.length === 0 ? (
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center py-4">
                  No agents yet. Click + to add one.
                </p>
              ) : (
                crew.agents.map(agent => (
                  <div
                    key={agent.id}
                    onClick={() => setSelectedAgent(agent.id === selectedAgent ? null : agent.id)}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedAgent === agent.id
                        ? 'bg-orange-50 dark:bg-orange-900/30 border-2 border-orange-500'
                        : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                          <input
                            type="text"
                            value={agent.name}
                            onChange={(e) => updateAgent(agent.id, { name: e.target.value })}
                            className="text-sm font-medium bg-transparent border-none outline-none flex-1"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                        <input
                          type="text"
                          value={agent.role}
                          onChange={(e) => updateAgent(agent.id, { role: e.target.value })}
                          className="text-xs text-gray-600 dark:text-gray-400 bg-transparent border-none outline-none w-full mt-1"
                          placeholder="Role"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <div className="flex flex-wrap gap-1 mt-2">
                          {agent.tools.map(toolId => {
                            const tool = AVAILABLE_TOOLS.find(t => t.id === toolId);
                            return tool ? (
                              <span key={toolId} className="text-xs px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                                {tool.name}
                              </span>
                            ) : null;
                          })}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteAgent(agent.id);
                        }}
                        className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"
                      >
                        <Trash2 className="w-3 h-3 text-red-500" />
                      </button>
                    </div>
                    
                    {selectedAgent === agent.id && (
                      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600 space-y-2">
                        <div>
                          <label className="text-xs text-gray-600 dark:text-gray-400">Goal</label>
                          <textarea
                            value={agent.goal}
                            onChange={(e) => updateAgent(agent.id, { goal: e.target.value })}
                            className="w-full text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded p-2"
                            rows={2}
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-600 dark:text-gray-400">LLM Model</label>
                          <select
                            value={agent.llm}
                            onChange={(e) => updateAgent(agent.id, { llm: e.target.value })}
                            className="w-full text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded p-2"
                          >
                            {AVAILABLE_LLMS.map(llm => (
                              <option key={llm} value={llm}>{llm}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="text-xs text-gray-600 dark:text-gray-400">Tools</label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {AVAILABLE_TOOLS.map(tool => {
                              const isSelected = agent.tools.includes(tool.id);
                              return (
                                <button
                                  key={tool.id}
                                  onClick={() => {
                                    const newTools = isSelected
                                      ? agent.tools.filter(t => t !== tool.id)
                                      : [...agent.tools, tool.id];
                                    updateAgent(agent.id, { tools: newTools });
                                  }}
                                  className={`text-xs px-2 py-1 rounded transition-colors ${
                                    isSelected
                                      ? 'bg-orange-600 text-white'
                                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                  }`}
                                >
                                  {tool.name}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Process Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Process Settings
            </h4>
            <div className="space-y-2">
              {(['sequential', 'hierarchical', 'parallel'] as const).map(process => (
                <button
                  key={process}
                  onClick={() => setCrew({ ...crew, process })}
                  className={`w-full text-left p-2 rounded-lg transition-colors ${
                    crew.process === process
                      ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                      : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  <div className="font-medium text-sm capitalize">{process}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {process === 'sequential' && '순차적으로 작업 실행'}
                    {process === 'hierarchical' && '계층 구조로 작업 관리'}
                    {process === 'parallel' && '병렬로 작업 실행'}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tasks Panel */}
        <div className="col-span-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 h-full">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Tasks ({crew.tasks.length})
              </h4>
              <button
                onClick={addTask}
                disabled={crew.agents.length === 0}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              </button>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {crew.tasks.length === 0 ? (
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center py-4">
                  {crew.agents.length === 0 
                    ? 'Add agents first'
                    : 'No tasks yet. Click + to add one.'}
                </p>
              ) : (
                crew.tasks.map((task, index) => {
                  const agent = crew.agents.find(a => a.id === task.agent);
                  return (
                    <div key={task.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-gray-500">#{index + 1}</span>
                          <Target className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                        </div>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"
                        >
                          <Trash2 className="w-3 h-3 text-red-500" />
                        </button>
                      </div>
                      
                      <textarea
                        value={task.description}
                        onChange={(e) => updateTask(task.id, { description: e.target.value })}
                        className="w-full text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded p-2 mb-2"
                        placeholder="Task description"
                        rows={2}
                      />
                      
                      <select
                        value={task.agent}
                        onChange={(e) => updateTask(task.id, { agent: e.target.value })}
                        className="w-full text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded p-2 mb-2"
                      >
                        <option value="">Select agent</option>
                        {crew.agents.map(a => (
                          <option key={a.id} value={a.id}>{a.name}</option>
                        ))}
                      </select>
                      
                      {agent && (
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          Assigned to: {agent.name}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Run Button */}
            <button
              onClick={runCrew}
              disabled={isRunning || crew.agents.length === 0 || crew.tasks.length === 0}
              className="w-full mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isRunning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Running Crew...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Run Crew
                </>
              )}
            </button>
          </div>
        </div>

        {/* Execution Log */}
        <div className="col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 h-full">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Execution Log
            </h4>
            <div className="h-96 overflow-y-auto space-y-1">
              {executionLog.length === 0 ? (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Configure your crew and click Run to see execution logs
                </p>
              ) : (
                executionLog.map((log, idx) => (
                  <p key={idx} className="text-xs text-gray-600 dark:text-gray-300 font-mono">
                    {log}
                  </p>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
        <div className="flex items-start gap-2">
          <Briefcase className="w-4 h-4 text-orange-600 dark:text-orange-400 mt-0.5" />
          <div className="text-xs text-orange-700 dark:text-orange-300 space-y-1">
            <p>• 에이전트를 추가하고 역할과 목표를 설정하세요</p>
            <p>• 각 에이전트에게 도구를 할당하여 능력을 부여하세요</p>
            <p>• 작업을 생성하고 적절한 에이전트에게 할당하세요</p>
            <p>• Run Crew를 클릭하여 팀 작업을 시뮬레이션하세요</p>
          </div>
        </div>
      </div>
    </div>
  );
}