'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, MessageSquare, Play, Settings, RefreshCw,
  ArrowRight, CheckCircle, Clock, Zap, Brain,
  FileText, Code, Database, Globe, Terminal,
  GitBranch, Target, AlertCircle, Sparkles
} from 'lucide-react';

interface AutoGenAgent {
  id: string;
  name: string;
  role: string;
  systemMessage: string;
  capabilities: string[];
  status: 'idle' | 'thinking' | 'executing' | 'reviewing';
  currentTask?: string;
  completedTasks: number;
  color: string;
}

interface Conversation {
  id: string;
  from: string;
  to: string;
  message: string;
  type: 'task' | 'response' | 'review' | 'feedback';
  timestamp: number;
}

interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo?: string;
  status: 'pending' | 'in_progress' | 'review' | 'completed';
  result?: string;
}

const AGENT_TEMPLATES = [
  {
    name: 'Assistant',
    role: 'Primary coordinator',
    systemMessage: 'You coordinate tasks between agents and ensure project completion.',
    capabilities: ['Task Planning', 'Coordination', 'Review'],
    color: 'purple'
  },
  {
    name: 'Coder',
    role: 'Software developer',
    systemMessage: 'You write, review, and optimize code implementations.',
    capabilities: ['Python', 'JavaScript', 'Code Review', 'Debugging'],
    color: 'blue'
  },
  {
    name: 'Critic',
    role: 'Quality assurance',
    systemMessage: 'You review outputs and provide constructive feedback.',
    capabilities: ['Code Review', 'Testing', 'Quality Check'],
    color: 'red'
  },
  {
    name: 'Researcher',
    role: 'Information specialist',
    systemMessage: 'You research and gather information for the team.',
    capabilities: ['Web Search', 'Documentation', 'Analysis'],
    color: 'green'
  },
  {
    name: 'Executor',
    role: 'Task executor',
    systemMessage: 'You execute commands and run scripts.',
    capabilities: ['Shell Commands', 'API Calls', 'File Operations'],
    color: 'orange'
  }
];

const SAMPLE_PROJECTS = [
  {
    id: 'web-app',
    title: 'Web Application 개발',
    description: 'React 기반 대시보드 애플리케이션 구축',
    tasks: [
      { id: 't1', title: '프로젝트 구조 설계', description: '컴포넌트 구조와 라우팅 설계' },
      { id: 't2', title: 'UI 컴포넌트 개발', description: '재사용 가능한 UI 컴포넌트 구현' },
      { id: 't3', title: 'API 통합', description: 'REST API 연동 및 상태 관리' },
      { id: 't4', title: '테스트 작성', description: '단위 테스트 및 통합 테스트' }
    ]
  },
  {
    id: 'data-analysis',
    title: '데이터 분석 파이프라인',
    description: 'Python으로 데이터 수집 및 분석 자동화',
    tasks: [
      { id: 't1', title: '데이터 수집 스크립트', description: 'API에서 데이터 수집' },
      { id: 't2', title: '데이터 정제', description: '데이터 클리닝 및 전처리' },
      { id: 't3', title: '분석 모델 구축', description: '통계 분석 및 시각화' },
      { id: 't4', title: '리포트 생성', description: '자동 리포트 생성 시스템' }
    ]
  }
];

export default function AutoGenSimulator() {
  const [agents, setAgents] = useState<AutoGenAgent[]>([]);
  const [selectedProject, setSelectedProject] = useState(SAMPLE_PROJECTS[0]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [groupChatMode, setGroupChatMode] = useState(true);

  // Initialize agents
  useEffect(() => {
    const initialAgents: AutoGenAgent[] = AGENT_TEMPLATES.slice(0, 3).map((template, index) => ({
      id: `agent-${index}`,
      name: template.name,
      role: template.role,
      systemMessage: template.systemMessage,
      capabilities: template.capabilities,
      status: 'idle',
      completedTasks: 0,
      color: template.color
    }));
    setAgents(initialAgents);
  }, []);

  // Initialize tasks
  useEffect(() => {
    const initialTasks: Task[] = selectedProject.tasks.map(t => ({
      ...t,
      status: 'pending'
    }));
    setTasks(initialTasks);
  }, [selectedProject]);

  // Add agent
  const addAgent = (template: typeof AGENT_TEMPLATES[0]) => {
    if (agents.length >= 5) return;
    
    const newAgent: AutoGenAgent = {
      id: `agent-${agents.length}`,
      name: template.name,
      role: template.role,
      systemMessage: template.systemMessage,
      capabilities: template.capabilities,
      status: 'idle',
      completedTasks: 0,
      color: template.color
    };
    setAgents([...agents, newAgent]);
  };

  // Remove agent
  const removeAgent = (agentId: string) => {
    setAgents(agents.filter(a => a.id !== agentId));
  };

  // Run simulation
  const runSimulation = async () => {
    setIsRunning(true);
    setConversations([]);
    setCurrentStep(0);

    // Reset agents
    setAgents(prev => prev.map(a => ({ ...a, status: 'idle', currentTask: undefined })));
    
    // Reset tasks
    setTasks(prev => prev.map(t => ({ ...t, status: 'pending', assignedTo: undefined, result: undefined })));

    // Simulate task execution
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      setCurrentStep(i + 1);

      // Assistant assigns task
      const assistant = agents.find(a => a.name === 'Assistant');
      if (assistant) {
        setAgents(prev => prev.map(a => 
          a.id === assistant.id ? { ...a, status: 'thinking' } : a
        ));

        const assignMessage: Conversation = {
          id: `conv-${Date.now()}-1`,
          from: assistant.name,
          to: 'Group',
          message: `다음 작업을 시작합니다: ${task.title}\n설명: ${task.description}`,
          type: 'task',
          timestamp: Date.now()
        };
        setConversations(prev => [...prev, assignMessage]);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // Assign to appropriate agent
      const coder = agents.find(a => a.name === 'Coder');
      const researcher = agents.find(a => a.name === 'Researcher');
      const assignedAgent = task.title.includes('개발') || task.title.includes('구현') ? coder : researcher;

      if (assignedAgent) {
        // Update task status
        setTasks(prev => prev.map(t => 
          t.id === task.id ? { ...t, status: 'in_progress', assignedTo: assignedAgent.name } : t
        ));

        // Update agent status
        setAgents(prev => prev.map(a => 
          a.id === assignedAgent.id 
            ? { ...a, status: 'executing', currentTask: task.title }
            : a.id === assistant?.id 
              ? { ...a, status: 'idle' }
              : a
        ));

        // Agent working message
        const workMessage: Conversation = {
          id: `conv-${Date.now()}-2`,
          from: assignedAgent.name,
          to: 'Group',
          message: `작업 중: ${task.title}\n진행 상황: 구현 중...`,
          type: 'response',
          timestamp: Date.now()
        };
        setConversations(prev => [...prev, workMessage]);
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Complete task
        const result = `${task.title} 완료:\n- 주요 기능 구현\n- 테스트 통과\n- 문서화 완료`;
        
        const completeMessage: Conversation = {
          id: `conv-${Date.now()}-3`,
          from: assignedAgent.name,
          to: 'Group',
          message: result,
          type: 'response',
          timestamp: Date.now()
        };
        setConversations(prev => [...prev, completeMessage]);

        // Critic reviews
        const critic = agents.find(a => a.name === 'Critic');
        if (critic) {
          setAgents(prev => prev.map(a => 
            a.id === critic.id 
              ? { ...a, status: 'reviewing' }
              : a.id === assignedAgent.id
                ? { ...a, status: 'idle', currentTask: undefined, completedTasks: a.completedTasks + 1 }
                : a
          ));

          await new Promise(resolve => setTimeout(resolve, 1000));

          const reviewMessage: Conversation = {
            id: `conv-${Date.now()}-4`,
            from: critic.name,
            to: assignedAgent.name,
            message: `코드 리뷰 완료:\n✅ 구조가 깔끔합니다\n✅ 성능 최적화 잘됨\n💡 추가 개선사항: 에러 처리 강화 권장`,
            type: 'review',
            timestamp: Date.now()
          };
          setConversations(prev => [...prev, reviewMessage]);

          setAgents(prev => prev.map(a => 
            a.id === critic.id ? { ...a, status: 'idle' } : a
          ));
        }

        // Update task to completed
        setTasks(prev => prev.map(t => 
          t.id === task.id ? { ...t, status: 'completed', result } : t
        ));

        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    // Final summary
    const assistant = agents.find(a => a.name === 'Assistant');
    if (assistant) {
      const summaryMessage: Conversation = {
        id: `conv-${Date.now()}-5`,
        from: assistant.name,
        to: 'Group',
        message: `프로젝트 완료! 🎉\n- 총 ${tasks.length}개 작업 완료\n- 모든 테스트 통과\n- 배포 준비 완료`,
        type: 'feedback',
        timestamp: Date.now()
      };
      setConversations(prev => [...prev, summaryMessage]);
    }

    setIsRunning(false);
    setCurrentStep(0);
  };

  // Reset simulation
  const resetSimulation = () => {
    setConversations([]);
    setCurrentStep(0);
    setAgents(prev => prev.map(a => ({ 
      ...a, 
      status: 'idle', 
      currentTask: undefined,
      completedTasks: 0
    })));
    setTasks(prev => prev.map(t => ({ 
      ...t, 
      status: 'pending', 
      assignedTo: undefined, 
      result: undefined 
    })));
  };

  const getStatusColor = (status: AutoGenAgent['status']) => {
    switch(status) {
      case 'thinking': return 'text-yellow-600 dark:text-yellow-400';
      case 'executing': return 'text-blue-600 dark:text-blue-400';
      case 'reviewing': return 'text-purple-600 dark:text-purple-400';
      default: return 'text-gray-400';
    }
  };

  const getTaskStatusIcon = (status: Task['status']) => {
    switch(status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />;
      case 'in_progress': return <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-pulse" />;
      case 'review': return <Brain className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          AutoGen Multi-Agent Simulator
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Microsoft AutoGen 프레임워크를 통한 멀티 에이전트 협업 시뮬레이션
        </p>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Configuration Panel */}
        <div className="col-span-3 space-y-4">
          {/* Project Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Project Selection
            </h4>
            <select
              value={selectedProject.id}
              onChange={(e) => {
                const project = SAMPLE_PROJECTS.find(p => p.id === e.target.value);
                if (project) setSelectedProject(project);
              }}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
              disabled={isRunning}
            >
              {SAMPLE_PROJECTS.map(project => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
              {selectedProject.description}
            </p>
          </div>

          {/* Agent Management */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Agent Team ({agents.length}/5)
            </h4>
            <div className="space-y-2">
              {agents.map(agent => (
                <div key={agent.id} className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {agent.name}
                    </span>
                    <button
                      onClick={() => removeAgent(agent.id)}
                      disabled={isRunning}
                      className="text-xs text-red-600 dark:text-red-400 hover:text-red-700 disabled:opacity-50"
                    >
                      Remove
                    </button>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {agent.role}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className={`text-xs ${getStatusColor(agent.status)}`}>
                      {agent.status === 'idle' ? 'Ready' : agent.status}
                    </span>
                    {agent.currentTask && (
                      <span className="text-xs text-gray-500">
                        • {agent.currentTask}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Add Agent */}
            {agents.length < 5 && (
              <div className="mt-3">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Add Agent:</p>
                <div className="grid grid-cols-2 gap-1">
                  {AGENT_TEMPLATES.filter(t => !agents.find(a => a.name === t.name)).map(template => (
                    <button
                      key={template.name}
                      onClick={() => addAgent(template)}
                      disabled={isRunning}
                      className="text-xs px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                      + {template.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Settings
            </h4>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={groupChatMode}
                onChange={(e) => setGroupChatMode(e.target.checked)}
                disabled={isRunning}
                className="rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Group Chat Mode
              </span>
            </label>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              에이전트들이 그룹 채팅으로 협업
            </p>
          </div>

          {/* Control Buttons */}
          <div className="flex gap-2">
            <button
              onClick={runSimulation}
              disabled={isRunning || agents.length < 2}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isRunning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Start
                </>
              )}
            </button>
            <button
              onClick={resetSimulation}
              disabled={isRunning}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Task Progress */}
        <div className="col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 h-full">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Task Progress ({tasks.filter(t => t.status === 'completed').length}/{tasks.length})
            </h4>
            <div className="space-y-2">
              {tasks.map((task, idx) => (
                <div
                  key={task.id}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    currentStep === idx + 1
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                      : task.status === 'completed'
                        ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20'
                        : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {task.title}
                    </span>
                    {getTaskStatusIcon(task.status)}
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {task.description}
                  </p>
                  {task.assignedTo && (
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      Assigned to: {task.assignedTo}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Conversation Log */}
        <div className="col-span-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 h-full">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {groupChatMode ? 'Group Chat' : 'Agent Communication'}
              </h4>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-500">
                  {conversations.length} messages
                </span>
              </div>
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {conversations.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    에이전트 대화가 여기에 표시됩니다
                  </p>
                </div>
              ) : (
                conversations.map(conv => (
                  <div
                    key={conv.id}
                    className={`p-3 rounded-lg ${
                      conv.type === 'task'
                        ? 'bg-purple-50 dark:bg-purple-900/20'
                        : conv.type === 'review'
                          ? 'bg-orange-50 dark:bg-orange-900/20'
                          : conv.type === 'feedback'
                            ? 'bg-green-50 dark:bg-green-900/20'
                            : 'bg-blue-50 dark:bg-blue-900/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Users className={`w-4 h-4 ${
                          conv.type === 'task' ? 'text-purple-600 dark:text-purple-400' :
                          conv.type === 'review' ? 'text-orange-600 dark:text-orange-400' :
                          conv.type === 'feedback' ? 'text-green-600 dark:text-green-400' :
                          'text-blue-600 dark:text-blue-400'
                        }`} />
                        <span className="text-xs font-semibold text-gray-900 dark:text-white">
                          {conv.from}
                        </span>
                        <ArrowRight className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {conv.to}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(conv.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {conv.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* AutoGen Features */}
      <div className="mt-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5" />
          <div className="text-xs text-green-700 dark:text-green-300 space-y-1">
            <p><strong>Microsoft AutoGen</strong> 주요 기능:</p>
            <ul className="space-y-1 ml-4">
              <li>• <strong>Conversable Agents:</strong> 자연스러운 대화형 에이전트</li>
              <li>• <strong>Group Chat:</strong> 다중 에이전트 그룹 채팅</li>
              <li>• <strong>Code Execution:</strong> 안전한 코드 실행 환경</li>
              <li>• <strong>Human-in-the-loop:</strong> 인간 개입 지원</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}