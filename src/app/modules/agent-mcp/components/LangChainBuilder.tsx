'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, Brain, Database, Globe, FileText, Search, Calculator, 
  Code, MessageSquare, Zap, Link2, Trash2, Play, Settings,
  ArrowRight, Sparkles, Cpu, HelpCircle
} from 'lucide-react';

// Node types for the chain
type NodeType = 'llm' | 'tool' | 'memory' | 'prompt' | 'chain' | 'output';

interface ChainNode {
  id: string;
  type: NodeType;
  name: string;
  icon: React.ElementType;
  config: Record<string, any>;
  position: { x: number; y: number };
  inputs: string[];
  outputs: string[];
}

interface Connection {
  from: string;
  to: string;
  id: string;
}

// Available components to drag
const AVAILABLE_COMPONENTS = [
  { type: 'llm' as NodeType, name: 'LLM', icon: Brain, color: 'purple' },
  { type: 'tool' as NodeType, name: 'Web Search', icon: Search, color: 'blue' },
  { type: 'tool' as NodeType, name: 'Calculator', icon: Calculator, color: 'green' },
  { type: 'tool' as NodeType, name: 'Database', icon: Database, color: 'yellow' },
  { type: 'tool' as NodeType, name: 'File Reader', icon: FileText, color: 'gray' },
  { type: 'memory' as NodeType, name: 'Memory', icon: Cpu, color: 'pink' },
  { type: 'prompt' as NodeType, name: 'Prompt Template', icon: MessageSquare, color: 'indigo' },
  { type: 'chain' as NodeType, name: 'Sub Chain', icon: Link2, color: 'orange' },
];

export default function LangChainBuilder() {
  const [nodes, setNodes] = useState<ChainNode[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [executionLog, setExecutionLog] = useState<string[]>([]);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [draggedNode, setDraggedNode] = useState<NodeType | null>(null);

  // Handle drag start from component palette
  const handleDragStart = (type: NodeType, name: string, icon: React.ElementType) => {
    setDraggedNode(type);
  };

  // Handle drop on canvas
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedNode || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const component = AVAILABLE_COMPONENTS.find(c => c.type === draggedNode);
    if (!component) return;

    const newNode: ChainNode = {
      id: `node-${Date.now()}`,
      type: draggedNode,
      name: component.name,
      icon: component.icon,
      config: {},
      position: { x, y },
      inputs: draggedNode === 'prompt' ? [] : ['input'],
      outputs: ['output']
    };

    setNodes([...nodes, newNode]);
    setDraggedNode(null);
  };

  // Handle node click
  const handleNodeClick = (nodeId: string) => {
    if (isConnecting && connectingFrom && connectingFrom !== nodeId) {
      // Create connection
      const newConnection: Connection = {
        id: `conn-${Date.now()}`,
        from: connectingFrom,
        to: nodeId
      };
      setConnections([...connections, newConnection]);
      setIsConnecting(false);
      setConnectingFrom(null);
    } else if (isConnecting && connectingFrom === nodeId) {
      // Cancel connection
      setIsConnecting(false);
      setConnectingFrom(null);
    } else {
      setSelectedNode(nodeId === selectedNode ? null : nodeId);
    }
  };

  // Start connection mode
  const startConnection = (nodeId: string) => {
    setIsConnecting(true);
    setConnectingFrom(nodeId);
  };

  // Delete node
  const deleteNode = (nodeId: string) => {
    setNodes(nodes.filter(n => n.id !== nodeId));
    setConnections(connections.filter(c => c.from !== nodeId && c.to !== nodeId));
    setSelectedNode(null);
  };

  // Run the chain
  const runChain = async () => {
    setIsRunning(true);
    setExecutionLog([]);
    
    const log = (message: string) => {
      setExecutionLog(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
    };

    log('🚀 Starting LangChain execution...');
    
    // Find start node (prompt or first node)
    const startNode = nodes.find(n => n.type === 'prompt') || nodes[0];
    if (!startNode) {
      log('❌ No nodes to execute');
      setIsRunning(false);
      return;
    }

    log(`📝 Starting with: ${startNode.name}`);
    
    // Simulate execution through the chain
    for (const node of nodes) {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      switch (node.type) {
        case 'prompt':
          log(`💭 Preparing prompt template...`);
          break;
        case 'llm':
          log(`🧠 Processing with LLM...`);
          await new Promise(resolve => setTimeout(resolve, 1500));
          log(`✅ LLM response generated`);
          break;
        case 'tool':
          log(`🔧 Executing tool: ${node.name}`);
          await new Promise(resolve => setTimeout(resolve, 1000));
          log(`✅ Tool execution complete`);
          break;
        case 'memory':
          log(`💾 Storing in memory...`);
          break;
        case 'chain':
          log(`🔗 Running sub-chain...`);
          await new Promise(resolve => setTimeout(resolve, 1200));
          log(`✅ Sub-chain complete`);
          break;
      }
    }
    
    log('✨ Chain execution completed successfully!');
    setIsRunning(false);
  };

  // Draw connections
  const renderConnections = () => {
    return connections.map(conn => {
      const fromNode = nodes.find(n => n.id === conn.from);
      const toNode = nodes.find(n => n.id === conn.to);
      if (!fromNode || !toNode) return null;

      return (
        <svg
          key={conn.id}
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 1 }}
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3, 0 6"
                fill="rgb(147 51 234)"
              />
            </marker>
          </defs>
          <line
            x1={fromNode.position.x + 60}
            y1={fromNode.position.y + 30}
            x2={toNode.position.x + 60}
            y2={toNode.position.y + 30}
            stroke="rgb(147 51 234)"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
          />
        </svg>
      );
    });
  };

  const getNodeColor = (type: NodeType) => {
    const colors = {
      llm: 'from-purple-500 to-purple-600',
      tool: 'from-blue-500 to-blue-600',
      memory: 'from-pink-500 to-pink-600',
      prompt: 'from-indigo-500 to-indigo-600',
      chain: 'from-orange-500 to-orange-600',
      output: 'from-green-500 to-green-600'
    };
    return colors[type] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          LangChain Visual Builder
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          드래그앤드롭으로 Agent Chain을 구성하고 실행해보세요
        </p>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Component Palette */}
        <div className="col-span-3 bg-white dark:bg-gray-800 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Components
          </h4>
          <div className="space-y-2">
            {AVAILABLE_COMPONENTS.map((comp, idx) => {
              const Icon = comp.icon;
              return (
                <div
                  key={idx}
                  draggable
                  onDragStart={() => handleDragStart(comp.type, comp.name, comp.icon)}
                  className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-move hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className={`p-1.5 bg-${comp.color}-100 dark:bg-${comp.color}-900/30 rounded`}>
                    <Icon className={`w-4 h-4 text-${comp.color}-600 dark:text-${comp.color}-400`} />
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{comp.name}</span>
                </div>
              );
            })}
          </div>

          {/* Controls */}
          <div className="mt-6 space-y-2">
            <button
              onClick={runChain}
              disabled={isRunning || nodes.length === 0}
              className="w-full px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4" />
              {isRunning ? 'Running...' : 'Run Chain'}
            </button>
            <button
              onClick={() => {
                setNodes([]);
                setConnections([]);
                setExecutionLog([]);
              }}
              className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Clear Canvas
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div className="col-span-6">
          <div
            ref={canvasRef}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="relative h-[500px] bg-white dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600"
          >
            {nodes.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <Sparkles className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-sm">컴포넌트를 드래그해서 놓으세요</p>
                </div>
              </div>
            )}

            {/* Render connections */}
            {renderConnections()}

            {/* Render nodes */}
            {nodes.map(node => {
              const Icon = node.icon;
              return (
                <div
                  key={node.id}
                  className={`absolute w-32 p-3 rounded-lg shadow-lg cursor-pointer transition-all ${
                    selectedNode === node.id 
                      ? 'ring-2 ring-purple-500 shadow-xl' 
                      : 'hover:shadow-xl'
                  } ${
                    connectingFrom === node.id
                      ? 'ring-2 ring-blue-500 animate-pulse'
                      : ''
                  }`}
                  style={{
                    left: node.position.x,
                    top: node.position.y,
                    zIndex: selectedNode === node.id ? 10 : 2
                  }}
                  onClick={() => handleNodeClick(node.id)}
                >
                  <div className={`bg-gradient-to-br ${getNodeColor(node.type)} rounded-lg p-2`}>
                    <div className="flex items-center justify-between text-white">
                      <Icon className="w-5 h-5" />
                      <div className="flex gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            startConnection(node.id);
                          }}
                          className="p-1 hover:bg-white/20 rounded"
                        >
                          <Link2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNode(node.id);
                          }}
                          className="p-1 hover:bg-white/20 rounded"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-white mt-1 truncate">{node.name}</p>
                  </div>
                </div>
              );
            })}

            {/* Connection Mode Indicator */}
            {isConnecting && (
              <div className="absolute top-2 right-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm animate-pulse">
                연결 모드: 대상 노드를 클릭하세요
              </div>
            )}
          </div>
        </div>

        {/* Execution Log */}
        <div className="col-span-3 bg-white dark:bg-gray-800 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Execution Log
          </h4>
          <div className="h-[450px] overflow-y-auto space-y-1">
            {executionLog.length === 0 ? (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                체인을 실행하면 로그가 표시됩니다
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

      {/* Instructions */}
      <div className="mt-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
        <div className="flex items-start gap-2">
          <HelpCircle className="w-4 h-4 text-purple-600 dark:text-purple-400 mt-0.5" />
          <div className="text-xs text-purple-700 dark:text-purple-300 space-y-1">
            <p>• 왼쪽 패널에서 컴포넌트를 드래그하여 캔버스에 놓으세요</p>
            <p>• 노드의 🔗 버튼을 클릭하고 다른 노드를 클릭하여 연결하세요</p>
            <p>• Run Chain을 클릭하여 실행 과정을 시뮬레이션하세요</p>
          </div>
        </div>
      </div>
    </div>
  );
}