'use client';

import React, { useState, useEffect } from 'react';
import { Server, Send, Database, Wrench as Tool, MessageSquare, ArrowRight, Zap } from 'lucide-react';

interface Message {
  id: string;
  type: 'request' | 'response';
  from: 'client' | 'server';
  method?: string;
  content: any;
  timestamp: string;
}

export default function MCPServerSimulator() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMethod, setSelectedMethod] = useState('tools/list');
  const [isConnected, setIsConnected] = useState(false);
  const [serverState, setServerState] = useState({
    tools: 3,
    resources: 2,
    prompts: 5
  });

  const methods = [
    { id: 'tools/list', name: 'List Tools', icon: Tool },
    { id: 'tools/call', name: 'Call Tool', icon: Zap },
    { id: 'resources/list', name: 'List Resources', icon: Database },
    { id: 'prompts/list', name: 'List Prompts', icon: MessageSquare },
  ];

  const simulateConnection = () => {
    setIsConnected(true);
    const connectMessage: Message = {
      id: Date.now().toString(),
      type: 'response',
      from: 'server',
      content: {
        name: 'mcp-demo-server',
        version: '1.0.0',
        capabilities: ['tools', 'resources', 'prompts']
      },
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages([connectMessage]);
  };

  const sendRequest = () => {
    if (!isConnected) return;

    // Create request
    const request: Message = {
      id: Date.now().toString(),
      type: 'request',
      from: 'client',
      method: selectedMethod,
      content: {
        jsonrpc: '2.0',
        method: selectedMethod,
        params: {},
        id: Date.now()
      },
      timestamp: new Date().toLocaleTimeString()
    };
    
    setMessages(prev => [...prev, request]);

    // Simulate server response
    setTimeout(() => {
      let responseContent: any = {};
      
      switch(selectedMethod) {
        case 'tools/list':
          responseContent = {
            tools: [
              { name: 'calculator', description: '수학 계산 도구' },
              { name: 'search', description: '웹 검색 도구' },
              { name: 'database', description: '데이터베이스 쿼리' }
            ]
          };
          break;
        case 'tools/call':
          responseContent = {
            result: 'Tool executed successfully',
            output: { data: 'Sample output data' }
          };
          break;
        case 'resources/list':
          responseContent = {
            resources: [
              { uri: 'file:///data/users.json', type: 'file' },
              { uri: 'postgres://db/products', type: 'database' }
            ]
          };
          break;
        case 'prompts/list':
          responseContent = {
            prompts: [
              { name: 'analyze_data', description: '데이터 분석 프롬프트' },
              { name: 'summarize', description: '요약 프롬프트' }
            ]
          };
          break;
      }

      const response: Message = {
        id: (Date.now() + 1).toString(),
        type: 'response',
        from: 'server',
        content: {
          jsonrpc: '2.0',
          result: responseContent,
          id: Date.now()
        },
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages(prev => [...prev, response]);
    }, 800);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          MCP Server Communication
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          MCP 서버와 클라이언트 간의 JSON-RPC 통신을 시각화합니다.
        </p>
      </div>

      {/* Connection Status */}
      <div className="mb-6">
        {!isConnected ? (
          <button
            onClick={simulateConnection}
            className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            MCP Server 연결
          </button>
        ) : (
          <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-700 dark:text-green-400 font-medium">
                Connected to mcp-demo-server
              </span>
            </div>
            <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span>Tools: {serverState.tools}</span>
              <span>Resources: {serverState.resources}</span>
              <span>Prompts: {serverState.prompts}</span>
            </div>
          </div>
        )}
      </div>

      {isConnected && (
        <>
          {/* Method Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Method
            </label>
            <div className="grid grid-cols-2 gap-2">
              {methods.map(method => {
                const Icon = method.icon;
                return (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                      selectedMethod === method.id
                        ? 'bg-purple-600 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{method.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Send Button */}
          <button
            onClick={sendRequest}
            className="w-full mb-6 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            Send Request
          </button>
        </>
      )}

      {/* Messages */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            서버에 연결하여 통신을 시작하세요
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.from === 'client' ? 'justify-start' : 'justify-end'
              } animate-fadeIn`}
            >
              {message.from === 'client' && (
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
              )}
              
              <div className={`flex-1 max-w-lg ${
                message.from === 'client' 
                  ? 'bg-blue-50 dark:bg-blue-900/20' 
                  : 'bg-purple-50 dark:bg-purple-900/20'
              } rounded-lg p-4`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm">
                    {message.from === 'client' ? 'Client' : 'Server'}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {message.timestamp}
                  </span>
                </div>
                {message.method && (
                  <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                    Method: {message.method}
                  </div>
                )}
                <pre className="text-xs bg-gray-900 text-gray-100 p-2 rounded overflow-x-auto">
                  {JSON.stringify(message.content, null, 2)}
                </pre>
              </div>
              
              {message.from === 'server' && (
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <Server className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}