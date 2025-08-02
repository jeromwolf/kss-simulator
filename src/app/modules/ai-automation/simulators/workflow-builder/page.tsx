'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Plus, Trash2, Play, Save, GitBranch, Zap, Database, Brain, Code2, Settings, ChevronRight, Circle, CheckCircle } from 'lucide-react'

interface WorkflowNode {
  id: string
  type: 'trigger' | 'action' | 'condition' | 'output'
  name: string
  config: Record<string, any>
  position: { x: number; y: number }
  connections: string[]
}

const nodeTemplates = {
  trigger: [
    { name: 'GitHub Push', icon: GitBranch, config: { repo: '', branch: 'main' } },
    { name: 'Schedule', icon: Circle, config: { cron: '0 0 * * *' } },
    { name: 'Webhook', icon: Zap, config: { url: '', method: 'POST' } }
  ],
  action: [
    { name: 'Claude Code', icon: Brain, config: { prompt: '', model: 'claude-opus-4' } },
    { name: 'Data Process', icon: Database, config: { query: '', database: '' } },
    { name: 'Code Execute', icon: Code2, config: { language: 'python', code: '' } },
    { name: 'API Call', icon: Zap, config: { endpoint: '', headers: {} } }
  ],
  condition: [
    { name: 'If/Else', icon: GitBranch, config: { condition: '', trueAction: '', falseAction: '' } },
    { name: 'Loop', icon: Circle, config: { iterator: '', items: [] } }
  ],
  output: [
    { name: 'Save to DB', icon: Database, config: { table: '', data: {} } },
    { name: 'Send Email', icon: Zap, config: { to: '', subject: '', body: '' } },
    { name: 'Git Commit', icon: GitBranch, config: { message: '', files: [] } }
  ]
}

export default function WorkflowBuilderPage() {
  const [nodes, setNodes] = useState<WorkflowNode[]>([])
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [executionLog, setExecutionLog] = useState<string[]>([])
  const [draggedNode, setDraggedNode] = useState<{ type: string; name: string } | null>(null)

  const addNode = (type: string, name: string, position: { x: number; y: number }) => {
    const template = nodeTemplates[type as keyof typeof nodeTemplates]?.find(t => t.name === name)
    if (!template) return

    const newNode: WorkflowNode = {
      id: `node_${Date.now()}`,
      type: type as WorkflowNode['type'],
      name,
      config: { ...template.config },
      position,
      connections: []
    }
    setNodes([...nodes, newNode])
  }

  const deleteNode = (nodeId: string) => {
    setNodes(nodes.filter(n => n.id !== nodeId))
    // Clean up connections
    setNodes(prev => prev.map(node => ({
      ...node,
      connections: node.connections.filter(c => c !== nodeId)
    })))
    if (selectedNode?.id === nodeId) {
      setSelectedNode(null)
    }
  }

  const connectNodes = (fromId: string, toId: string) => {
    setNodes(prev => prev.map(node => 
      node.id === fromId 
        ? { ...node, connections: [...node.connections, toId] }
        : node
    ))
  }

  const updateNodeConfig = (nodeId: string, config: Record<string, any>) => {
    setNodes(prev => prev.map(node =>
      node.id === nodeId ? { ...node, config } : node
    ))
  }

  const runWorkflow = async () => {
    setIsRunning(true)
    setExecutionLog([])
    
    // Find trigger node
    const triggerNode = nodes.find(n => n.type === 'trigger')
    if (!triggerNode) {
      setExecutionLog(['❌ 워크플로우에 트리거가 없습니다'])
      setIsRunning(false)
      return
    }

    setExecutionLog(prev => [...prev, `🚀 워크플로우 시작: ${triggerNode.name}`])

    // Simulate execution
    const executeNode = async (node: WorkflowNode, depth = 0) => {
      const indent = '  '.repeat(depth)
      setExecutionLog(prev => [...prev, `${indent}▶️ ${node.name} 실행 중...`])
      
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setExecutionLog(prev => [...prev, `${indent}✅ ${node.name} 완료`])
      
      // Execute connected nodes
      for (const connectionId of node.connections) {
        const nextNode = nodes.find(n => n.id === connectionId)
        if (nextNode) {
          await executeNode(nextNode, depth + 1)
        }
      }
    }

    await executeNode(triggerNode)
    setExecutionLog(prev => [...prev, '🎉 워크플로우 완료!'])
    setIsRunning(false)
  }

  const saveWorkflow = () => {
    const workflow = {
      nodes,
      createdAt: new Date().toISOString()
    }
    const blob = new Blob([JSON.stringify(workflow, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'workflow.json'
    a.click()
  }

  const handleDragStart = (type: string, name: string) => {
    setDraggedNode({ type, name })
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (!draggedNode) return

    const rect = e.currentTarget.getBoundingClientRect()
    const position = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
    
    addNode(draggedNode.type, draggedNode.name, position)
    setDraggedNode(null)
  }

  const getNodeIcon = (node: WorkflowNode) => {
    const templates = nodeTemplates[node.type as keyof typeof nodeTemplates]
    const template = templates?.find(t => t.name === node.name)
    return template?.icon || Circle
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/10 dark:to-gray-900">
      <div className="max-w-full mx-auto px-4 py-8">
        <Link
          href="/modules/ai-automation"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          AI 자동화 도구로 돌아가기
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                <GitBranch className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  워크플로우 빌더
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  드래그앤드롭으로 AI 자동화 워크플로우를 설계하세요
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={saveWorkflow}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                저장
              </button>
              <button
                onClick={runWorkflow}
                disabled={isRunning || nodes.length === 0}
                className="px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:from-violet-700 hover:to-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isRunning ? (
                  <>
                    <Circle className="w-4 h-4 animate-spin" />
                    실행 중...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    실행
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4">
            {/* Node Palette */}
            <div className="col-span-3 space-y-4">
              <h3 className="font-bold text-gray-900 dark:text-white">노드 팔레트</h3>
              
              {Object.entries(nodeTemplates).map(([type, templates]) => (
                <div key={type} className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 capitalize">
                    {type === 'trigger' ? '트리거' : 
                     type === 'action' ? '액션' :
                     type === 'condition' ? '조건' : '출력'}
                  </h4>
                  <div className="space-y-1">
                    {templates.map(template => {
                      const Icon = template.icon
                      return (
                        <div
                          key={template.name}
                          draggable
                          onDragStart={() => handleDragStart(type, template.name)}
                          className="p-2 bg-gray-50 dark:bg-gray-900 rounded-lg cursor-move hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors flex items-center gap-2"
                        >
                          <Icon className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {template.name}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Canvas */}
            <div className="col-span-6">
              <div
                className="relative h-96 bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 overflow-hidden"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {nodes.length === 0 ? (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    노드를 드래그하여 워크플로우를 시작하세요
                  </div>
                ) : (
                  <>
                    {/* Render connections */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      {nodes.map(node => 
                        node.connections.map(targetId => {
                          const targetNode = nodes.find(n => n.id === targetId)
                          if (!targetNode) return null
                          
                          return (
                            <line
                              key={`${node.id}-${targetId}`}
                              x1={node.position.x + 60}
                              y1={node.position.y + 20}
                              x2={targetNode.position.x + 60}
                              y2={targetNode.position.y + 20}
                              stroke="rgb(139, 92, 246)"
                              strokeWidth="2"
                              markerEnd="url(#arrowhead)"
                            />
                          )
                        })
                      )}
                      <defs>
                        <marker
                          id="arrowhead"
                          markerWidth="10"
                          markerHeight="7"
                          refX="9"
                          refY="3.5"
                          orient="auto"
                        >
                          <polygon
                            points="0 0, 10 3.5, 0 7"
                            fill="rgb(139, 92, 246)"
                          />
                        </marker>
                      </defs>
                    </svg>
                    
                    {/* Render nodes */}
                    {nodes.map(node => {
                      const Icon = getNodeIcon(node)
                      return (
                        <div
                          key={node.id}
                          className={`absolute w-32 bg-white dark:bg-gray-800 rounded-lg p-2 border-2 cursor-pointer transition-all ${
                            selectedNode?.id === node.id
                              ? 'border-violet-500 shadow-lg'
                              : 'border-gray-300 dark:border-gray-600 hover:border-violet-400'
                          }`}
                          style={{
                            left: node.position.x,
                            top: node.position.y
                          }}
                          onClick={() => setSelectedNode(node)}
                        >
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">
                              {node.name}
                            </span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteNode(node.id)
                            }}
                            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      )
                    })}
                  </>
                )}
              </div>
            </div>

            {/* Properties Panel */}
            <div className="col-span-3 space-y-4">
              <h3 className="font-bold text-gray-900 dark:text-white">속성</h3>
              
              {selectedNode ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      노드 타입
                    </label>
                    <div className="px-3 py-2 bg-gray-100 dark:bg-gray-900 rounded-lg text-sm text-gray-600 dark:text-gray-400">
                      {selectedNode.type}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      노드 이름
                    </label>
                    <div className="px-3 py-2 bg-gray-100 dark:bg-gray-900 rounded-lg text-sm text-gray-600 dark:text-gray-400">
                      {selectedNode.name}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      설정
                    </label>
                    {Object.entries(selectedNode.config).map(([key, value]) => (
                      <div key={key}>
                        <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                          {key}
                        </label>
                        <input
                          type="text"
                          value={typeof value === 'object' ? JSON.stringify(value) : value}
                          onChange={(e) => {
                            const newConfig = { ...selectedNode.config }
                            try {
                              newConfig[key] = JSON.parse(e.target.value)
                            } catch {
                              newConfig[key] = e.target.value
                            }
                            updateNodeConfig(selectedNode.id, newConfig)
                          }}
                          className="w-full px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />
                      </div>
                    ))}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      연결
                    </label>
                    <select
                      onChange={(e) => {
                        if (e.target.value) {
                          connectNodes(selectedNode.id, e.target.value)
                          e.target.value = ''
                        }
                      }}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                    >
                      <option value="">노드 선택...</option>
                      {nodes
                        .filter(n => n.id !== selectedNode.id && !selectedNode.connections.includes(n.id))
                        .map(node => (
                          <option key={node.id} value={node.id}>
                            {node.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              ) : (
                <div className="text-gray-400 text-sm">
                  노드를 선택하여 속성을 편집하세요
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Execution Log */}
        {executionLog.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">실행 로그</h3>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 font-mono text-sm space-y-1 max-h-64 overflow-y-auto">
              {executionLog.map((log, idx) => (
                <div key={idx} className="text-gray-700 dark:text-gray-300">
                  {log}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="mt-8 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            💡 워크플로우 자동화 팁
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3">
                트리거 설정
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• GitHub 이벤트로 CI/CD 자동화</li>
                <li>• 스케줄로 정기 작업 실행</li>
                <li>• Webhook으로 외부 연동</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3">
                액션 체이닝
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Claude Code로 코드 생성</li>
                <li>• 데이터 처리 및 변환</li>
                <li>• API 호출로 서비스 연동</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3">
                조건부 로직
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• If/Else로 분기 처리</li>
                <li>• Loop로 반복 작업</li>
                <li>• 에러 핸들링 추가</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}