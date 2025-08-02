'use client';

import React, { useState, useEffect } from 'react';
import { 
  Server, Database, FileText, Wrench, MessageSquare,
  ArrowRight, ArrowLeft, CheckCircle, XCircle, Clock,
  Play, RefreshCw, Settings, Globe, Shield, Zap
} from 'lucide-react';

interface MCPMessage {
  id: string;
  type: 'request' | 'response' | 'notification';
  method: string;
  params?: any;
  result?: any;
  from: 'client' | 'server';
  timestamp: number;
}

interface MCPResource {
  uri: string;
  name: string;
  mimeType: string;
  description: string;
}

interface MCPTool {
  name: string;
  description: string;
  inputSchema: {
    type: string;
    properties: Record<string, any>;
  };
}

interface MCPServer {
  id: string;
  name: string;
  status: 'connected' | 'disconnected' | 'connecting';
  resources: MCPResource[];
  tools: MCPTool[];
}

const SAMPLE_SERVERS: MCPServer[] = [
  {
    id: 'database-server',
    name: 'Database Server',
    status: 'disconnected',
    resources: [
      {
        uri: 'database://users',
        name: 'User Database',
        mimeType: 'application/json',
        description: '사용자 정보 데이터베이스'
      },
      {
        uri: 'database://products',
        name: 'Product Catalog',
        mimeType: 'application/json',
        description: '제품 카탈로그 데이터베이스'
      }
    ],
    tools: [
      {
        name: 'query_database',
        description: '데이터베이스 쿼리 실행',
        inputSchema: {
          type: 'object',
          properties: {
            query: { type: 'string', description: 'SQL query' }
          }
        }
      }
    ]
  },
  {
    id: 'file-server',
    name: 'File System Server',
    status: 'disconnected',
    resources: [
      {
        uri: 'file:///documents',
        name: 'Documents',
        mimeType: 'text/plain',
        description: '문서 저장소'
      }
    ],
    tools: [
      {
        name: 'read_file',
        description: '파일 읽기',
        inputSchema: {
          type: 'object',
          properties: {
            path: { type: 'string', description: 'File path' }
          }
        }
      },
      {
        name: 'write_file',
        description: '파일 쓰기',
        inputSchema: {
          type: 'object',
          properties: {
            path: { type: 'string', description: 'File path' },
            content: { type: 'string', description: 'File content' }
          }
        }
      }
    ]
  }
];

export default function MCPProtocolSimulator() {
  const [servers, setServers] = useState<MCPServer[]>(SAMPLE_SERVERS);
  const [selectedServer, setSelectedServer] = useState<MCPServer | null>(null);
  const [messages, setMessages] = useState<MCPMessage[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentOperation, setCurrentOperation] = useState<string>('');

  // Connect to server
  const connectToServer = async (server: MCPServer) => {
    setIsSimulating(true);
    setCurrentOperation(`Connecting to ${server.name}...`);
    
    // Update server status
    setServers(prev => prev.map(s => 
      s.id === server.id ? { ...s, status: 'connecting' as const } : s
    ));

    // Send initialize request
    const initRequest: MCPMessage = {
      id: `msg-${Date.now()}`,
      type: 'request',
      method: 'initialize',
      params: {
        protocolVersion: '1.0.0',
        capabilities: {}
      },
      from: 'client',
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, initRequest]);

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Server response
    const initResponse: MCPMessage = {
      id: `msg-${Date.now()}`,
      type: 'response',
      method: 'initialize',
      result: {
        protocolVersion: '1.0.0',
        serverName: server.name,
        capabilities: {
          resources: true,
          tools: true
        }
      },
      from: 'server',
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, initResponse]);

    // Update server status
    setServers(prev => prev.map(s => 
      s.id === server.id ? { ...s, status: 'connected' as const } : s
    ));
    setSelectedServer(server);
    setCurrentOperation('');
    setIsSimulating(false);
  };

  // List resources
  const listResources = async () => {
    if (!selectedServer) return;

    setIsSimulating(true);
    setCurrentOperation('Listing resources...');

    const request: MCPMessage = {
      id: `msg-${Date.now()}`,
      type: 'request',
      method: 'resources/list',
      from: 'client',
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, request]);

    await new Promise(resolve => setTimeout(resolve, 800));

    const response: MCPMessage = {
      id: `msg-${Date.now()}`,
      type: 'response',
      method: 'resources/list',
      result: {
        resources: selectedServer.resources
      },
      from: 'server',
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, response]);

    setCurrentOperation('');
    setIsSimulating(false);
  };

  // List tools
  const listTools = async () => {
    if (!selectedServer) return;

    setIsSimulating(true);
    setCurrentOperation('Listing tools...');

    const request: MCPMessage = {
      id: `msg-${Date.now()}`,
      type: 'request',
      method: 'tools/list',
      from: 'client',
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, request]);

    await new Promise(resolve => setTimeout(resolve, 800));

    const response: MCPMessage = {
      id: `msg-${Date.now()}`,
      type: 'response',
      method: 'tools/list',
      result: {
        tools: selectedServer.tools
      },
      from: 'server',
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, response]);

    setCurrentOperation('');
    setIsSimulating(false);
  };

  // Call tool
  const callTool = async (tool: MCPTool) => {
    if (!selectedServer) return;

    setIsSimulating(true);
    setCurrentOperation(`Executing ${tool.name}...`);

    const request: MCPMessage = {
      id: `msg-${Date.now()}`,
      type: 'request',
      method: 'tools/call',
      params: {
        name: tool.name,
        arguments: tool.name === 'query_database' 
          ? { query: 'SELECT * FROM users LIMIT 10' }
          : { path: '/documents/example.txt' }
      },
      from: 'client',
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, request]);

    await new Promise(resolve => setTimeout(resolve, 1200));

    const response: MCPMessage = {
      id: `msg-${Date.now()}`,
      type: 'response',
      method: 'tools/call',
      result: {
        content: tool.name === 'query_database'
          ? '[{"id": 1, "name": "Alice"}, {"id": 2, "name": "Bob"}]'
          : 'File content: Example text data...'
      },
      from: 'server',
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, response]);

    setCurrentOperation('');
    setIsSimulating(false);
  };

  // Disconnect
  const disconnect = () => {
    if (!selectedServer) return;

    setServers(prev => prev.map(s => 
      s.id === selectedServer.id ? { ...s, status: 'disconnected' as const } : s
    ));
    setSelectedServer(null);
    setMessages([]);
  };

  const getStatusColor = (status: MCPServer['status']) => {
    switch(status) {
      case 'connected': return 'text-green-600 dark:text-green-400';
      case 'connecting': return 'text-yellow-600 dark:text-yellow-400';
      case 'disconnected': return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: MCPServer['status']) => {
    switch(status) {
      case 'connected': return <CheckCircle className="w-4 h-4" />;
      case 'connecting': return <Clock className="w-4 h-4 animate-pulse" />;
      case 'disconnected': return <XCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          MCP Protocol Communication Simulator
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Model Context Protocol의 Client-Server 통신을 실시간으로 시뮬레이션합니다
        </p>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Server List */}
        <div className="col-span-3 space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              MCP Servers
            </h4>
            <div className="space-y-2">
              {servers.map(server => (
                <div
                  key={server.id}
                  className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                    selectedServer?.id === server.id
                      ? 'bg-cyan-50 dark:bg-cyan-900/30 border-cyan-500'
                      : 'bg-gray-50 dark:bg-gray-700 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                  onClick={() => server.status === 'disconnected' && connectToServer(server)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Server className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {server.name}
                      </span>
                    </div>
                    <div className={getStatusColor(server.status)}>
                      {getStatusIcon(server.status)}
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    <p>{server.resources.length} resources</p>
                    <p>{server.tools.length} tools</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Server Details */}
          {selectedServer && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Server Actions
              </h4>
              <div className="space-y-2">
                <button
                  onClick={listResources}
                  disabled={isSimulating}
                  className="w-full px-3 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50 transition-colors text-sm flex items-center justify-center gap-2"
                >
                  <Database className="w-4 h-4" />
                  List Resources
                </button>
                <button
                  onClick={listTools}
                  disabled={isSimulating}
                  className="w-full px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors text-sm flex items-center justify-center gap-2"
                >
                  <Wrench className="w-4 h-4" />
                  List Tools
                </button>
                <button
                  onClick={disconnect}
                  disabled={isSimulating}
                  className="w-full px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors text-sm"
                >
                  Disconnect
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Communication View */}
        <div className="col-span-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 h-full">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Protocol Messages
              </h4>
              {currentOperation && (
                <span className="text-xs text-cyan-600 dark:text-cyan-400 flex items-center gap-2">
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  {currentOperation}
                </span>
              )}
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {messages.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    서버에 연결하여 통신을 시작하세요
                  </p>
                </div>
              ) : (
                messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`p-3 rounded-lg ${
                      msg.from === 'client'
                        ? 'bg-blue-50 dark:bg-blue-900/20 ml-8'
                        : 'bg-green-50 dark:bg-green-900/20 mr-8'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        {msg.from === 'client' ? (
                          <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        ) : (
                          <Server className="w-4 h-4 text-green-600 dark:text-green-400" />
                        )}
                        <span className="text-xs font-semibold text-gray-900 dark:text-white">
                          {msg.from === 'client' ? 'Client' : 'Server'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {msg.type}
                        </span>
                      </div>
                      {msg.from === 'client' ? (
                        <ArrowRight className="w-4 h-4 text-blue-400" />
                      ) : (
                        <ArrowLeft className="w-4 h-4 text-green-400" />
                      )}
                    </div>
                    <div className="text-xs font-mono text-gray-700 dark:text-gray-300">
                      <p><strong>Method:</strong> {msg.method}</p>
                      {msg.params && (
                        <details className="mt-1">
                          <summary className="cursor-pointer text-gray-600 dark:text-gray-400">Parameters</summary>
                          <pre className="mt-1 p-2 bg-gray-100 dark:bg-gray-900 rounded overflow-x-auto">
                            {JSON.stringify(msg.params, null, 2)}
                          </pre>
                        </details>
                      )}
                      {msg.result && (
                        <details className="mt-1">
                          <summary className="cursor-pointer text-gray-600 dark:text-gray-400">Result</summary>
                          <pre className="mt-1 p-2 bg-gray-100 dark:bg-gray-900 rounded overflow-x-auto">
                            {JSON.stringify(msg.result, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Resources & Tools */}
        <div className="col-span-3 space-y-4">
          {selectedServer && (
            <>
              {/* Resources */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Resources
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {selectedServer.resources.map(resource => (
                    <div key={resource.uri} className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                        <span className="text-xs font-medium text-gray-900 dark:text-white">
                          {resource.name}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {resource.uri}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Available Tools
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {selectedServer.tools.map(tool => (
                    <div
                      key={tool.name}
                      className="p-2 bg-gray-50 dark:bg-gray-700 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      onClick={() => callTool(tool)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Zap className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                          <span className="text-xs font-medium text-gray-900 dark:text-white">
                            {tool.name}
                          </span>
                        </div>
                        <Play className="w-3 h-3 text-gray-400" />
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {tool.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Protocol Info */}
      <div className="mt-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <Shield className="w-4 h-4 text-cyan-600 dark:text-cyan-400 mt-0.5" />
          <div className="text-xs text-cyan-700 dark:text-cyan-300 space-y-1">
            <p><strong>Model Context Protocol (MCP)</strong>는 LLM과 외부 시스템 간의 표준화된 통신 프로토콜입니다.</p>
            <ul className="space-y-1 ml-4">
              <li>• <strong>Resources:</strong> 데이터와 파일에 대한 접근 제공</li>
              <li>• <strong>Tools:</strong> 실행 가능한 함수와 명령어</li>
              <li>• <strong>Prompts:</strong> 재사용 가능한 프롬프트 템플릿</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}