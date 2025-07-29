'use client';

import React from 'react';
import Image from 'next/image';
import { Info } from 'lucide-react';
import { ChartCanvas } from './ChartCanvas';

interface ChartExampleProps {
  title: string;
  description: string;
  imageUrl: string;
  notes?: string[];
}

export function ChartExample({ title, description, imageUrl, notes }: ChartExampleProps) {
  // Map imageUrl to chart type
  const getChartType = (url: string) => {
    if (url.includes('candlestick')) return 'candlestick';
    if (url.includes('moving-average')) return 'line';
    if (url.includes('support-resistance')) return 'support-resistance';
    if (url.includes('head-shoulders') || url.includes('triangle') || url.includes('fibonacci')) return 'pattern';
    if (url.includes('macd')) return 'macd';
    if (url.includes('rsi-bollinger')) return 'rsi-bollinger';
    if (url.includes('financial-statement')) return 'financial-statement';
    if (url.includes('valuation')) return 'valuation';
    if (url.includes('portfolio')) return 'portfolio';
    if (url.includes('backtest')) return 'backtest';
    return 'candlestick';
  };
  return (
    <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
      <h4 className="font-semibold text-lg mb-2">{title}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{description}</p>
      
      <div className="relative w-full h-64 md:h-96 mb-4 bg-gray-900 rounded-lg overflow-hidden">
        <ChartCanvas type={getChartType(imageUrl) as any} />
      </div>
      
      {notes && notes.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400">
            <Info className="w-4 h-4" />
            <span>주요 포인트</span>
          </div>
          <ul className="space-y-1">
            {notes.map((note, index) => (
              <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">•</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}