/**
 * Attention Visualizer Component
 * Interactive visualization of attention mechanisms
 */

'use client';

import React, { useState } from 'react';
import { Eye, Layers, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SimulatorProps } from '../../types';

export function AttentionVisualizer({ className, onComplete }: SimulatorProps) {
  const [selectedHead, setSelectedHead] = useState(0);
  const [selectedLayer, setSelectedLayer] = useState(0);
  
  // Sample data for visualization
  const tokens = ['나는', '학교에', '간다'];
  const numHeads = 4;
  const numLayers = 2;
  
  // Generate sample attention weights (normally these would come from a real model)
  const generateAttentionWeights = (head: number, layer: number) => {
    return tokens.map((_, i) => 
      tokens.map((_, j) => {
        // Simulate different attention patterns for different heads
        if (head === 0) {
          // Attend to self
          return i === j ? 0.8 : 0.1;
        } else if (head === 1) {
          // Attend to previous
          return j === i - 1 ? 0.7 : j === i ? 0.2 : 0.05;
        } else if (head === 2) {
          // Attend to next
          return j === i + 1 ? 0.7 : j === i ? 0.2 : 0.05;
        } else {
          // Uniform attention
          return 0.33;
        }
      })
    );
  };
  
  const attentionWeights = generateAttentionWeights(selectedHead, selectedLayer);
  
  const getOpacity = (weight: number) => {
    return Math.max(0.1, Math.min(1, weight));
  };
  
  const getColor = (weight: number) => {
    const intensity = Math.round(weight * 255);
    return `rgba(139, 92, 246, ${getOpacity(weight)})`; // Purple with varying opacity
  };

  return (
    <div className={cn("bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700", className)}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Eye className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          Attention 시각화
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          토큰 간의 attention 가중치를 시각적으로 확인해보세요
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Controls */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Layers className="inline w-4 h-4 mr-1" />
              레이어 선택
            </label>
            <select
              value={selectedLayer}
              onChange={(e) => setSelectedLayer(Number(e.target.value))}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              {Array.from({ length: numLayers }, (_, i) => (
                <option key={i} value={i}>Layer {i + 1}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Zap className="inline w-4 h-4 mr-1" />
              헤드 선택
            </label>
            <select
              value={selectedHead}
              onChange={(e) => setSelectedHead(Number(e.target.value))}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              {Array.from({ length: numHeads }, (_, i) => (
                <option key={i} value={i}>Head {i + 1}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Attention Matrix */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Attention Matrix
          </h4>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="w-20"></th>
                  {tokens.map((token, i) => (
                    <th key={i} className="text-sm font-medium text-gray-600 dark:text-gray-400 p-2">
                      {token}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tokens.map((token, i) => (
                  <tr key={i}>
                    <td className="text-sm font-medium text-gray-600 dark:text-gray-400 p-2">
                      {token}
                    </td>
                    {attentionWeights[i].map((weight, j) => (
                      <td key={j} className="p-2">
                        <div
                          className="w-12 h-12 rounded-lg flex items-center justify-center text-xs font-medium"
                          style={{ backgroundColor: getColor(weight) }}
                        >
                          {weight.toFixed(2)}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Visualization */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Attention Flow
          </h4>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
            <div className="flex justify-around items-center">
              {tokens.map((token, i) => (
                <div key={i} className="text-center">
                  <div className="mb-4 px-4 py-2 bg-purple-100 dark:bg-purple-900 rounded-lg font-medium text-purple-700 dark:text-purple-300">
                    {token}
                  </div>
                  <div className="space-y-1">
                    {tokens.map((_, j) => {
                      const weight = attentionWeights[i][j];
                      return (
                        <div
                          key={j}
                          className="h-1 rounded-full transition-all"
                          style={{
                            backgroundColor: getColor(weight),
                            width: `${weight * 100}px`
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
          <h4 className="text-sm font-medium text-purple-900 dark:text-purple-100 mb-2">
            Attention 패턴 설명
          </h4>
          <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
            <li>• <strong>Head 1:</strong> Self-attention (자기 자신에 주목)</li>
            <li>• <strong>Head 2:</strong> Backward attention (이전 토큰에 주목)</li>
            <li>• <strong>Head 3:</strong> Forward attention (다음 토큰에 주목)</li>
            <li>• <strong>Head 4:</strong> Uniform attention (균등하게 주목)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}